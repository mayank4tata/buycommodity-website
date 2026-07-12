-- RC13-ORD-003: transactional ordering for existing persisted order fields.
-- Idempotent function deployment. Run the companion backup/rollback script first.

create or replace function public.bcspl_required_positive_integer_v1(p_value jsonb, p_label text)
returns integer
language plpgsql
immutable
set search_path = pg_catalog, public
as $$
declare
    v_text text := trim(both '"' from coalesce(p_value::text, ''));
    v_number numeric;
begin
    if v_text = '' or v_text = 'null' then
        raise exception '% is required.', p_label;
    end if;
    begin
        v_number := v_text::numeric;
    exception when others then
        raise exception '% must be a positive whole number.', p_label;
    end;
    if v_number < 1 or trunc(v_number) <> v_number then
        raise exception '% must be a positive whole number.', p_label;
    end if;
    return v_number::integer;
end;
$$;

create or replace function public.bcspl_assert_admin_v1()
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
    if auth.uid() is null or not public.is_admin() then
        raise exception 'Administrator authorization is required.' using errcode = '42501';
    end if;
end;
$$;

create or replace function public.bcspl_normalize_product_order_v1(p_order_kind text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
    v_row record;
    v_position integer := 0;
begin
    if p_order_kind = 'home' then
        for v_row in select product_id from public.products where show_on_home=true order by home_display_order,lower(product_name),product_id loop
            v_position := v_position + 1;
            update public.products set home_display_order=v_position where product_id=v_row.product_id and home_display_order is distinct from v_position;
        end loop;
    elsif p_order_kind = 'prices' then
        for v_row in select product_id from public.products where show_on_prices_enquiry=true order by prices_enquiry_display_order,lower(product_name),product_id loop
            v_position := v_position + 1;
            update public.products set prices_enquiry_display_order=v_position where product_id=v_row.product_id and prices_enquiry_display_order is distinct from v_position;
        end loop;
    else
        raise exception 'Unsupported Product order kind.';
    end if;
end;
$$;

create or replace function public.admin_apply_ordered_changes_v1(
    p_module text,
    p_upserts jsonb default '[]'::jsonb,
    p_deletes jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
    v_item jsonb;
    v_id uuid;
    v_old_parent uuid;
    v_new_parent uuid;
    v_old_order integer;
    v_new_order integer;
    v_max integer;
    v_exists boolean;
    v_old_home boolean;
    v_old_prices boolean;
    v_new_home boolean;
    v_new_prices boolean;
    v_old_home_order integer;
    v_old_prices_order integer;
    v_shift_id uuid;
begin
    perform public.bcspl_assert_admin_v1();
    if p_module not in ('segments', 'products', 'grades', 'pricing', 'recipients') then
        raise exception 'Unsupported ordered module.';
    end if;
    if jsonb_typeof(coalesce(p_upserts, '[]'::jsonb)) <> 'array'
       or jsonb_typeof(coalesce(p_deletes, '[]'::jsonb)) <> 'array' then
        raise exception 'Ordered changes must be JSON arrays.';
    end if;

    if p_module = 'segments' then
        perform pg_advisory_xact_lock(hashtextextended('rc13-order:segments', 0));
        perform 1 from public.product_segments for update;
        with ranked as (
            select segment_id, row_number() over (order by display_order, lower(segment_name), segment_id)::integer n
            from public.product_segments
        )
        update public.product_segments s set display_order = r.n from ranked r where r.segment_id = s.segment_id;

        for v_item in select value from jsonb_array_elements(coalesce(p_deletes, '[]'::jsonb)) loop
            delete from public.product_segments where segment_id = trim(both '"' from v_item::text)::uuid;
        end loop;
        with ranked as (
            select segment_id, row_number() over (order by display_order, lower(segment_name), segment_id)::integer n
            from public.product_segments
        ) update public.product_segments s set display_order = r.n from ranked r where r.segment_id = s.segment_id;

        for v_item in select value from jsonb_array_elements(coalesce(p_upserts, '[]'::jsonb)) loop
            v_new_order := public.bcspl_required_positive_integer_v1(v_item->'display_order', 'Display Order');
            if nullif(trim(v_item->>'segment_name'), '') is null then raise exception 'Segment Name is required.'; end if;
            v_id := nullif(v_item->>'segment_id', '')::uuid;
            if exists(select 1 from public.product_segments where lower(trim(segment_name))=lower(trim(v_item->>'segment_name')) and segment_id is distinct from v_id) then raise exception 'Segment with the same name already exists.'; end if;
            select display_order into v_old_order from public.product_segments where segment_id = v_id;
            v_exists := found;
            select count(*) + (case when v_exists then 0 else 1 end) into v_max from public.product_segments;
            v_new_order := least(v_new_order, greatest(v_max, 1));
            if v_exists then
                if v_new_order < v_old_order then
                    update public.product_segments set display_order = display_order + 1 where display_order >= v_new_order and display_order < v_old_order and segment_id <> v_id;
                elsif v_new_order > v_old_order then
                    update public.product_segments set display_order = display_order - 1 where display_order > v_old_order and display_order <= v_new_order and segment_id <> v_id;
                end if;
                update public.product_segments set segment_name=trim(v_item->>'segment_name'), description=trim(coalesce(v_item->>'description','')),
                    segment_photo_image_id=nullif(v_item->>'segment_photo_image_id','')::uuid, segment_icon_image_id=nullif(v_item->>'segment_icon_image_id','')::uuid,
                    display_order=v_new_order, active=coalesce((v_item->>'active')::boolean,true) where segment_id=v_id;
            else
                update public.product_segments set display_order=display_order+1 where display_order >= v_new_order;
                insert into public.product_segments(segment_name,description,segment_photo_image_id,segment_icon_image_id,display_order,active)
                values(trim(v_item->>'segment_name'),trim(coalesce(v_item->>'description','')),nullif(v_item->>'segment_photo_image_id','')::uuid,
                    nullif(v_item->>'segment_icon_image_id','')::uuid,v_new_order,coalesce((v_item->>'active')::boolean,true));
            end if;
        end loop;

    elsif p_module = 'grades' then
        perform pg_advisory_xact_lock(hashtextextended('rc13-order:grades', 0));
        for v_item in select value from jsonb_array_elements(coalesce(p_deletes, '[]'::jsonb)) loop
            v_id := trim(both '"' from v_item::text)::uuid;
            select product_id into v_old_parent from public.grade_master where grade_id=v_id for update;
            if found then perform pg_advisory_xact_lock(hashtextextended('rc13-order:grades:' || v_old_parent::text, 0)); end if;
            delete from public.grade_master where grade_id=v_id;
            with ranked as (select grade_id,row_number() over(order by display_order,lower(grade_name),grade_id)::integer n from public.grade_master where product_id=v_old_parent)
            update public.grade_master g set display_order=r.n from ranked r where g.grade_id=r.grade_id;
        end loop;
        for v_item in select value from jsonb_array_elements(coalesce(p_upserts, '[]'::jsonb)) loop
            v_new_order:=public.bcspl_required_positive_integer_v1(v_item->'display_order','Display Order');
            v_new_parent:=nullif(v_item->>'product_id','')::uuid;
            if v_new_parent is null then raise exception 'Product is required.'; end if;
            if nullif(trim(v_item->>'grade_name'),'') is null then raise exception 'Grade Name is required.'; end if;
            v_id:=nullif(v_item->>'grade_id','')::uuid;
            if exists(select 1 from public.grade_master where product_id=v_new_parent and lower(trim(grade_name))=lower(trim(v_item->>'grade_name')) and grade_id is distinct from v_id) then raise exception 'Grade Name already exists for the selected Product.'; end if;
            select product_id,display_order into v_old_parent,v_old_order from public.grade_master where grade_id=v_id for update;
            v_exists:=found;
            if v_exists and v_old_parent<>v_new_parent then
                if v_old_parent::text < v_new_parent::text then
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:grades:' || v_old_parent::text, 0));
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:grades:' || v_new_parent::text, 0));
                else
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:grades:' || v_new_parent::text, 0));
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:grades:' || v_old_parent::text, 0));
                end if;
            else
                perform pg_advisory_xact_lock(hashtextextended('rc13-order:grades:' || v_new_parent::text, 0));
            end if;
            if v_exists then
                with ranked as (select grade_id,row_number() over(order by display_order,lower(grade_name),grade_id)::integer n from public.grade_master where product_id=v_old_parent)
                update public.grade_master g set display_order=r.n from ranked r where g.grade_id=r.grade_id;
                select display_order into v_old_order from public.grade_master where grade_id=v_id;
            end if;
            with ranked as (select grade_id,row_number() over(order by display_order,lower(grade_name),grade_id)::integer n from public.grade_master where product_id=v_new_parent)
            update public.grade_master g set display_order=r.n from ranked r where g.grade_id=r.grade_id;
            select count(*)+(case when v_exists and v_old_parent=v_new_parent then 0 else 1 end) into v_max from public.grade_master where product_id=v_new_parent;
            v_new_order:=least(v_new_order,greatest(v_max,1));
            if v_exists and v_old_parent=v_new_parent then
                if v_new_order<v_old_order then update public.grade_master set display_order=display_order+1 where product_id=v_new_parent and grade_id<>v_id and display_order>=v_new_order and display_order<v_old_order;
                elsif v_new_order>v_old_order then update public.grade_master set display_order=display_order-1 where product_id=v_new_parent and grade_id<>v_id and display_order>v_old_order and display_order<=v_new_order; end if;
                update public.grade_master set grade_name=trim(v_item->>'grade_name'),display_order=v_new_order,active=coalesce((v_item->>'active')::boolean,true) where grade_id=v_id;
            elsif v_exists then
                if exists(select 1 from public.product_pricing where grade_id=v_id) then raise exception 'Cannot move a Grade to another Product while Product Pricing references it.'; end if;
                with ranked as (select grade_id,row_number() over(order by display_order,lower(grade_name),grade_id)::integer n from public.grade_master where product_id=v_old_parent)
                update public.grade_master g set display_order=r.n from ranked r where g.grade_id=r.grade_id;
                update public.grade_master set display_order=display_order+1 where product_id=v_new_parent and display_order>=v_new_order;
                update public.grade_master set product_id=v_new_parent,grade_name=trim(v_item->>'grade_name'),display_order=v_new_order,active=coalesce((v_item->>'active')::boolean,true) where grade_id=v_id;
                with ranked as (select grade_id,row_number() over(order by display_order,lower(grade_name),grade_id)::integer n from public.grade_master where product_id=v_old_parent)
                update public.grade_master g set display_order=r.n from ranked r where g.grade_id=r.grade_id;
            else
                update public.grade_master set display_order=display_order+1 where product_id=v_new_parent and display_order>=v_new_order;
                insert into public.grade_master(product_id,grade_name,display_order,active) values(v_new_parent,trim(v_item->>'grade_name'),v_new_order,coalesce((v_item->>'active')::boolean,true));
            end if;
        end loop;

    elsif p_module = 'pricing' then
        perform pg_advisory_xact_lock(hashtextextended('rc13-order:pricing', 0));
        for v_item in select value from jsonb_array_elements(coalesce(p_deletes,'[]'::jsonb)) loop
            v_id:=trim(both '"' from v_item::text)::uuid;
            select product_id into v_old_parent from public.product_pricing where pricing_id=v_id for update;
            if found then perform pg_advisory_xact_lock(hashtextextended('rc13-order:pricing:' || v_old_parent::text, 0)); end if;
            delete from public.product_pricing where pricing_id=v_id;
            with ranked as (select pp.pricing_id,row_number() over(order by pp.display_order,lower(g.grade_name),lower(coalesce(pp.specification,'')),lower(coalesce(pp.size_thickness,'')),pp.pricing_id)::integer n from public.product_pricing pp join public.grade_master g on g.grade_id=pp.grade_id where pp.product_id=v_old_parent)
            update public.product_pricing p set display_order=r.n from ranked r where p.pricing_id=r.pricing_id;
        end loop;
        for v_item in select value from jsonb_array_elements(coalesce(p_upserts,'[]'::jsonb)) loop
            v_new_order:=public.bcspl_required_positive_integer_v1(v_item->'display_order','Display Order');
            v_new_parent:=nullif(v_item->>'product_id','')::uuid;
            if v_new_parent is null or nullif(v_item->>'grade_id','') is null then raise exception 'Product and Grade are required.'; end if;
            if not exists(select 1 from public.grade_master where grade_id=(v_item->>'grade_id')::uuid and product_id=v_new_parent and active=true) then raise exception 'Select an active Grade assigned to the selected Product.'; end if;
            if coalesce(nullif(v_item->>'rate_display',''),'price_on_request')='show_price' and (nullif(v_item->>'rate','') is null or nullif(trim(v_item->>'unit'),'') is null or nullif(v_item->>'price_validity_days','') is null) then raise exception 'Rate, Unit and Price Validity are required for live prices.'; end if;
            v_id:=nullif(v_item->>'pricing_id','')::uuid;
            select product_id,display_order into v_old_parent,v_old_order from public.product_pricing where pricing_id=v_id for update;
            v_exists:=found;
            if v_exists and v_old_parent<>v_new_parent then
                if v_old_parent::text < v_new_parent::text then
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:pricing:' || v_old_parent::text, 0));
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:pricing:' || v_new_parent::text, 0));
                else
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:pricing:' || v_new_parent::text, 0));
                    perform pg_advisory_xact_lock(hashtextextended('rc13-order:pricing:' || v_old_parent::text, 0));
                end if;
            else
                perform pg_advisory_xact_lock(hashtextextended('rc13-order:pricing:' || v_new_parent::text, 0));
            end if;
            if v_exists then
                with ranked as (select pp.pricing_id,row_number() over(order by pp.display_order,lower(g.grade_name),lower(coalesce(pp.specification,'')),lower(coalesce(pp.size_thickness,'')),pp.pricing_id)::integer n from public.product_pricing pp join public.grade_master g on g.grade_id=pp.grade_id where pp.product_id=v_old_parent)
                update public.product_pricing p set display_order=r.n from ranked r where p.pricing_id=r.pricing_id;
                select display_order into v_old_order from public.product_pricing where pricing_id=v_id;
            end if;
            with ranked as (select pp.pricing_id,row_number() over(order by pp.display_order,lower(g.grade_name),lower(coalesce(pp.specification,'')),lower(coalesce(pp.size_thickness,'')),pp.pricing_id)::integer n from public.product_pricing pp join public.grade_master g on g.grade_id=pp.grade_id where pp.product_id=v_new_parent)
            update public.product_pricing p set display_order=r.n from ranked r where p.pricing_id=r.pricing_id;
            select count(*)+(case when v_exists and v_old_parent=v_new_parent then 0 else 1 end) into v_max from public.product_pricing where product_id=v_new_parent;
            v_new_order:=least(v_new_order,greatest(v_max,1));
            if v_exists and v_old_parent=v_new_parent then
                if v_new_order<v_old_order then update public.product_pricing set display_order=display_order+1 where product_id=v_new_parent and pricing_id<>v_id and display_order>=v_new_order and display_order<v_old_order;
                elsif v_new_order>v_old_order then update public.product_pricing set display_order=display_order-1 where product_id=v_new_parent and pricing_id<>v_id and display_order>v_old_order and display_order<=v_new_order; end if;
                update public.product_pricing set grade_id=(v_item->>'grade_id')::uuid,specification=trim(coalesce(v_item->>'specification','')),size_thickness=trim(coalesce(v_item->>'size_thickness','')),unit=nullif(trim(v_item->>'unit'),''),rate=nullif(v_item->>'rate','')::numeric,rate_display=coalesce(nullif(v_item->>'rate_display',''),'price_on_request'),price_validity_days=nullif(v_item->>'price_validity_days','')::integer,rate_updated_on=nullif(v_item->>'rate_updated_on','')::date,remarks=trim(coalesce(v_item->>'remarks','')),display_order=v_new_order,active=coalesce((v_item->>'active')::boolean,true) where pricing_id=v_id;
            else
                if v_exists then with ranked as (select pricing_id,row_number() over(order by display_order,pricing_id)::integer n from public.product_pricing where product_id=v_old_parent) update public.product_pricing p set display_order=r.n from ranked r where p.pricing_id=r.pricing_id; end if;
                update public.product_pricing set display_order=display_order+1 where product_id=v_new_parent and display_order>=v_new_order;
                if v_exists then
                    update public.product_pricing set product_id=v_new_parent,grade_id=(v_item->>'grade_id')::uuid,specification=trim(coalesce(v_item->>'specification','')),size_thickness=trim(coalesce(v_item->>'size_thickness','')),unit=nullif(trim(v_item->>'unit'),''),rate=nullif(v_item->>'rate','')::numeric,rate_display=coalesce(nullif(v_item->>'rate_display',''),'price_on_request'),price_validity_days=nullif(v_item->>'price_validity_days','')::integer,rate_updated_on=nullif(v_item->>'rate_updated_on','')::date,remarks=trim(coalesce(v_item->>'remarks','')),display_order=v_new_order,active=coalesce((v_item->>'active')::boolean,true) where pricing_id=v_id;
                    with ranked as (select pricing_id,row_number() over(order by display_order,pricing_id)::integer n from public.product_pricing where product_id=v_old_parent)
                    update public.product_pricing p set display_order=r.n from ranked r where p.pricing_id=r.pricing_id;
                else
                    insert into public.product_pricing(pricing_id,product_id,grade_id,specification,size_thickness,unit,rate,rate_display,price_validity_days,rate_updated_on,remarks,display_order,active)
                    values(gen_random_uuid(),v_new_parent,(v_item->>'grade_id')::uuid,trim(coalesce(v_item->>'specification','')),trim(coalesce(v_item->>'size_thickness','')),nullif(trim(v_item->>'unit'),''),nullif(v_item->>'rate','')::numeric,coalesce(nullif(v_item->>'rate_display',''),'price_on_request'),nullif(v_item->>'price_validity_days','')::integer,nullif(v_item->>'rate_updated_on','')::date,trim(coalesce(v_item->>'remarks','')),v_new_order,coalesce((v_item->>'active')::boolean,true));
                end if;
            end if;
        end loop;

    elsif p_module = 'recipients' then
        perform pg_advisory_xact_lock(hashtextextended('rc13-order:recipients', 0));
        perform 1 from public.enquiry_email_recipients for update;
        with ranked as (select id,row_number() over(order by display_order,lower(email),id)::integer n from public.enquiry_email_recipients)
        update public.enquiry_email_recipients e set display_order=r.n from ranked r where e.id=r.id;
        for v_item in select value from jsonb_array_elements(coalesce(p_deletes,'[]'::jsonb)) loop delete from public.enquiry_email_recipients where id=trim(both '"' from v_item::text)::uuid; end loop;
        with ranked as (select id,row_number() over(order by display_order,lower(email),id)::integer n from public.enquiry_email_recipients)
        update public.enquiry_email_recipients e set display_order=r.n from ranked r where e.id=r.id;
        for v_item in select value from jsonb_array_elements(coalesce(p_upserts,'[]'::jsonb)) loop
            v_new_order:=public.bcspl_required_positive_integer_v1(v_item->'display_order','Display Order');
            if nullif(trim(v_item->>'email'),'') is null then raise exception 'Email is required.'; end if;
            v_id:=nullif(v_item->>'id','')::uuid;
            select display_order into v_old_order from public.enquiry_email_recipients where id=v_id; v_exists:=found;
            select count(*)+(case when v_exists then 0 else 1 end) into v_max from public.enquiry_email_recipients; v_new_order:=least(v_new_order,greatest(v_max,1));
            if v_exists then
                if v_new_order<v_old_order then update public.enquiry_email_recipients set display_order=display_order+1 where id<>v_id and display_order>=v_new_order and display_order<v_old_order;
                elsif v_new_order>v_old_order then update public.enquiry_email_recipients set display_order=display_order-1 where id<>v_id and display_order>v_old_order and display_order<=v_new_order; end if;
                update public.enquiry_email_recipients set display_name=trim(coalesce(v_item->>'display_name','')),email=lower(trim(v_item->>'email')),display_order=v_new_order,active=coalesce((v_item->>'active')::boolean,true),updated_at=now() where id=v_id;
            else
                update public.enquiry_email_recipients set display_order=display_order+1 where display_order>=v_new_order;
                insert into public.enquiry_email_recipients(display_name,email,display_order,active) values(trim(coalesce(v_item->>'display_name','')),lower(trim(v_item->>'email')),v_new_order,coalesce((v_item->>'active')::boolean,true));
            end if;
        end loop;

    else -- products: two independent global participation sequences
        perform pg_advisory_xact_lock(hashtextextended('rc13-order:products', 0));
        perform 1 from public.products for update;
        perform public.bcspl_normalize_product_order_v1('home');
        perform public.bcspl_normalize_product_order_v1('prices');
        for v_item in select value from jsonb_array_elements(coalesce(p_deletes,'[]'::jsonb)) loop delete from public.products where product_id=trim(both '"' from v_item::text)::uuid; end loop;
        perform public.bcspl_normalize_product_order_v1('home');
        perform public.bcspl_normalize_product_order_v1('prices');
        -- Apply rows leaving ordered Product sets before rows entering them. This makes
        -- a single transactional save support replacing a full Home tile in one batch.
        for v_item in
            select value
            from jsonb_array_elements(coalesce(p_upserts,'[]'::jsonb))
            order by coalesce((value->>'show_on_home')::boolean,false),
                     coalesce((value->>'show_on_prices_enquiry')::boolean,false)
        loop
            if nullif(trim(v_item->>'segment_id'),'') is null or nullif(trim(v_item->>'category_id'),'') is null or nullif(trim(v_item->>'product_name'),'') is null then raise exception 'Product Segment, Product Category and Product Name are required.'; end if;
            v_new_home:=coalesce((v_item->>'show_on_home')::boolean,false); v_new_prices:=coalesce((v_item->>'show_on_prices_enquiry')::boolean,false);
            if v_new_home and not v_new_prices then raise exception 'A product shown below Home Search must also be visible on Prices & Enquiry.'; end if;
            if v_new_home then v_new_order:=public.bcspl_required_positive_integer_v1(v_item->'home_display_order','Home Tile Position'); if v_new_order>8 then raise exception 'Home Tile Position must be between 1 and 8.'; end if; end if;
            if v_new_prices then perform public.bcspl_required_positive_integer_v1(v_item->'prices_enquiry_display_order','Prices & Enquiry Display Order'); end if;
            v_id:=nullif(v_item->>'product_id','')::uuid;
            if exists(select 1 from public.products where segment_id=(v_item->>'segment_id')::uuid and category_id=(v_item->>'category_id')::uuid and lower(trim(product_name))=lower(trim(v_item->>'product_name')) and product_id is distinct from v_id) then raise exception 'Product with the same name already exists in this category.'; end if;
            select show_on_home,show_on_prices_enquiry,home_display_order,prices_enquiry_display_order into v_old_home,v_old_prices,v_old_home_order,v_old_prices_order from public.products where product_id=v_id; v_exists:=found;
            if not v_exists then v_id:=coalesce(v_id,gen_random_uuid()); insert into public.products(product_id,segment_id,category_id,product_name,description,product_photo_image_id,show_on_home,home_display_order,show_on_prices_enquiry,prices_enquiry_display_order,active) values(v_id,(v_item->>'segment_id')::uuid,(v_item->>'category_id')::uuid,trim(v_item->>'product_name'),trim(coalesce(v_item->>'description','')),nullif(v_item->>'product_photo_image_id','')::uuid,false,null,false,null,coalesce((v_item->>'active')::boolean,true)); v_old_home:=false;v_old_prices:=false; end if;
            update public.products set segment_id=(v_item->>'segment_id')::uuid,category_id=(v_item->>'category_id')::uuid,product_name=trim(v_item->>'product_name'),description=trim(coalesce(v_item->>'description','')),product_photo_image_id=nullif(v_item->>'product_photo_image_id','')::uuid,active=coalesce((v_item->>'active')::boolean,true) where product_id=v_id;
            if v_old_home then update public.products set show_on_home=false,home_display_order=null where product_id=v_id; perform public.bcspl_normalize_product_order_v1('home'); end if;
            if v_new_home then
                if not v_old_home and (select count(*) from public.products where show_on_home=true)>=8 then raise exception 'A maximum of eight Home shortcut products is supported.'; end if;
                v_new_order:=public.bcspl_required_positive_integer_v1(v_item->'home_display_order','Home Tile Position'); select count(*)+1 into v_max from public.products where show_on_home=true; v_new_order:=least(v_new_order,least(v_max,8));
                for v_shift_id in select product_id from public.products where show_on_home=true and home_display_order>=v_new_order order by home_display_order desc loop update public.products set home_display_order=home_display_order+1 where product_id=v_shift_id; end loop;
                update public.products set show_on_home=true,home_display_order=v_new_order where product_id=v_id;
            end if;
            if v_old_prices then update public.products set show_on_prices_enquiry=false,prices_enquiry_display_order=null where product_id=v_id; perform public.bcspl_normalize_product_order_v1('prices'); end if;
            if v_new_prices then
                v_new_order:=public.bcspl_required_positive_integer_v1(v_item->'prices_enquiry_display_order','Prices & Enquiry Display Order'); select count(*)+1 into v_max from public.products where show_on_prices_enquiry=true; v_new_order:=least(v_new_order,v_max);
                for v_shift_id in select product_id from public.products where show_on_prices_enquiry=true and prices_enquiry_display_order>=v_new_order order by prices_enquiry_display_order desc loop update public.products set prices_enquiry_display_order=prices_enquiry_display_order+1 where product_id=v_shift_id; end loop;
                update public.products set show_on_prices_enquiry=true,prices_enquiry_display_order=v_new_order where product_id=v_id;
            end if;
        end loop;
    end if;

    return jsonb_build_object('module',p_module,'upserts',jsonb_array_length(coalesce(p_upserts,'[]'::jsonb)),'deletes',jsonb_array_length(coalesce(p_deletes,'[]'::jsonb)),'success',true);
end;
$$;

revoke all on function public.bcspl_required_positive_integer_v1(jsonb,text) from public;
revoke all on function public.bcspl_assert_admin_v1() from public;
revoke all on function public.bcspl_normalize_product_order_v1(text) from public;
revoke all on function public.admin_apply_ordered_changes_v1(text,jsonb,jsonb) from public;
grant execute on function public.admin_apply_ordered_changes_v1(text,jsonb,jsonb) to authenticated;
