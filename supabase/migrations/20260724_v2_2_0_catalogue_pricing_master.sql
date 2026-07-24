-- BCSPL Website V2.2.0
-- Unified Catalogue & Pricing Master, category ordering and transactional bulk import.
-- Run after V2.1.4 migrations and 20260712_rc13_ord_003_transactional_ordering.sql.

begin;

alter table public.product_categories
    add column if not exists display_order integer;

with ranked as (
    select category_id,
           row_number() over (partition by segment_id order by coalesce(display_order, 2147483647), lower(category_name), category_id)::integer as new_order
    from public.product_categories
)
update public.product_categories c
set display_order = r.new_order
from ranked r
where r.category_id = c.category_id
  and c.display_order is distinct from r.new_order;

alter table public.product_categories
    alter column display_order set default 1;

update public.product_categories set display_order = 1 where display_order is null or display_order < 1;

alter table public.product_categories
    alter column display_order set not null;

create table if not exists public.catalogue_import_audit (
    audit_id uuid primary key default gen_random_uuid(),
    imported_by uuid not null,
    imported_at timestamptz not null default now(),
    rows_received integer not null default 0,
    rows_processed integer not null default 0,
    segments_created integer not null default 0,
    categories_created integer not null default 0,
    products_created integer not null default 0,
    grades_created integer not null default 0,
    pricing_created integer not null default 0,
    pricing_updated integer not null default 0,
    pricing_deleted integer not null default 0,
    result jsonb not null default '{}'::jsonb
);

alter table public.catalogue_import_audit enable row level security;

drop policy if exists "catalogue_import_audit_select_admin" on public.catalogue_import_audit;
create policy "catalogue_import_audit_select_admin"
on public.catalogue_import_audit
for select
using (public.is_admin());

create or replace function public.admin_import_catalogue_master_v2(p_rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
    v_item jsonb;
    v_excel_row text;
    v_action text;
    v_audit_id uuid;
    v_segment_id uuid;
    v_category_id uuid;
    v_product_id uuid;
    v_grade_id uuid;
    v_pricing_id uuid;
    v_match_count integer;
    v_has_category boolean;
    v_has_product boolean;
    v_has_grade boolean;
    v_has_pricing boolean;
    v_rows_processed integer := 0;
    v_segments_created integer := 0;
    v_categories_created integer := 0;
    v_products_created integer := 0;
    v_grades_created integer := 0;
    v_pricing_created integer := 0;
    v_pricing_updated integer := 0;
    v_pricing_deleted integer := 0;
    v_show_prices boolean;
    v_show_home boolean;
    v_product_order integer;
    v_home_order integer;
    v_rate_display text;
    v_rate numeric;
    v_unit text;
    v_validity integer;
    v_rate_date date;
    v_pricing_order integer;
    v_conflict_order integer;
    v_conflict_parent uuid;
    v_conflict_names text;
begin
    perform public.bcspl_assert_admin_v1();

    if jsonb_typeof(coalesce(p_rows, '[]'::jsonb)) <> 'array' then
        raise exception 'Catalogue import rows must be supplied as a JSON array.';
    end if;
    if jsonb_array_length(coalesce(p_rows, '[]'::jsonb)) = 0 then
        raise exception 'No catalogue changes were supplied.';
    end if;

    -- Move affected persisted orders out of the normal range first. This permits safe
    -- swaps such as Home Position 1 ↔ 2 inside the same transaction.
    with ids as (
        select distinct nullif(value->>'segment_id', '')::uuid as id
        from jsonb_array_elements(p_rows)
        where coalesce(value->>'action', 'upsert') = 'upsert' and nullif(value->>'segment_id', '') is not null
    ), numbered as (
        select id, row_number() over (order by id)::integer as rn from ids where id is not null
    )
    update public.product_segments s set display_order = 1000000 + n.rn
    from numbered n where s.segment_id = n.id;

    with ids as (
        select distinct nullif(value->>'category_id', '')::uuid as id
        from jsonb_array_elements(p_rows)
        where coalesce(value->>'action', 'upsert') = 'upsert' and nullif(value->>'category_id', '') is not null
    ), numbered as (
        select id, row_number() over (order by id)::integer as rn from ids where id is not null
    )
    update public.product_categories c set display_order = 1000000 + n.rn
    from numbered n where c.category_id = n.id;

    with ids as (
        select distinct nullif(value->>'product_id', '')::uuid as id
        from jsonb_array_elements(p_rows)
        where coalesce(value->>'action', 'upsert') = 'upsert' and nullif(value->>'product_id', '') is not null
    )
    update public.products p
       set show_on_home = false,
           home_display_order = null,
           show_on_prices_enquiry = false,
           prices_enquiry_display_order = null
    from ids where p.product_id = ids.id;

    with ids as (
        select distinct nullif(value->>'grade_id', '')::uuid as id
        from jsonb_array_elements(p_rows)
        where coalesce(value->>'action', 'upsert') = 'upsert' and nullif(value->>'grade_id', '') is not null
    ), numbered as (
        select id, row_number() over (order by id)::integer as rn from ids where id is not null
    )
    update public.grade_master g set display_order = 1000000 + n.rn
    from numbered n where g.grade_id = n.id;

    with ids as (
        select distinct nullif(value->>'pricing_id', '')::uuid as id
        from jsonb_array_elements(p_rows)
        where coalesce(value->>'action', 'upsert') = 'upsert' and nullif(value->>'pricing_id', '') is not null
    ), numbered as (
        select id, row_number() over (order by id)::integer as rn from ids where id is not null
    )
    update public.product_pricing p set display_order = 1000000 + n.rn
    from numbered n where p.pricing_id = n.id;

    for v_item in select value from jsonb_array_elements(p_rows)
    loop
        v_excel_row := coalesce(nullif(v_item->>'excel_row', ''), '?');
        v_action := lower(coalesce(nullif(v_item->>'action', ''), 'upsert'));

        if v_action = 'ignore' then
            continue;
        end if;

        if v_action = 'delete' then
            v_pricing_id := nullif(v_item->>'pricing_id', '')::uuid;
            if v_pricing_id is null then
                raise exception 'Excel row %: Delete requires an existing Pricing ID. Remove a new row from the upload instead.', v_excel_row;
            end if;
            delete from public.product_pricing where pricing_id = v_pricing_id;
            if not found then
                raise exception 'Excel row %: the Pricing ID selected for deletion no longer exists. Download a fresh Current Master.', v_excel_row;
            end if;
            v_pricing_deleted := v_pricing_deleted + 1;
            v_rows_processed := v_rows_processed + 1;
            continue;
        end if;

        if v_action <> 'upsert' then
            raise exception 'Excel row %: unsupported Action "%". Use Upsert, Delete or Ignore.', v_excel_row, v_action;
        end if;

        -- Segment
        if nullif(trim(v_item->>'segment_name'), '') is null then
            raise exception 'Excel row %: Segment Name is required.', v_excel_row;
        end if;
        perform public.bcspl_required_positive_integer_v1(v_item->'segment_display_order', 'Segment Display Order');
        v_segment_id := nullif(v_item->>'segment_id', '')::uuid;
        if v_segment_id is not null then
            perform 1 from public.product_segments where segment_id = v_segment_id for update;
            if not found then
                raise exception 'Excel row %: the hidden Segment ID does not exist. Download a fresh Current Master or clear the hidden ID.', v_excel_row;
            end if;
        else
            select count(*), (array_agg(segment_id order by segment_id))[1] into v_match_count, v_segment_id
            from public.product_segments where lower(trim(segment_name)) = lower(trim(v_item->>'segment_name'));
            if v_match_count > 1 then
                raise exception 'Excel row %: more than one Segment matches "%". Keep the hidden Segment ID from the Current Master.', v_excel_row, v_item->>'segment_name';
            end if;
        end if;
        if v_segment_id is null then
            insert into public.product_segments(segment_name, description, segment_photo_image_id, segment_icon_image_id, display_order, active)
            values(trim(v_item->>'segment_name'), '', nullif(v_item->>'segment_photo_image_id', '')::uuid, nullif(v_item->>'segment_icon_image_id', '')::uuid,
                   (v_item->>'segment_display_order')::integer, coalesce((v_item->>'segment_active')::boolean, true))
            returning segment_id into v_segment_id;
            v_segments_created := v_segments_created + 1;
        else
            if exists(select 1 from public.product_segments where lower(trim(segment_name)) = lower(trim(v_item->>'segment_name')) and segment_id <> v_segment_id) then
                raise exception 'Excel row %: another Segment already uses the name "%".', v_excel_row, v_item->>'segment_name';
            end if;
            update public.product_segments
               set segment_name = trim(v_item->>'segment_name'),
                   segment_photo_image_id = coalesce(nullif(v_item->>'segment_photo_image_id', '')::uuid, segment_photo_image_id),
                   segment_icon_image_id = coalesce(nullif(v_item->>'segment_icon_image_id', '')::uuid, segment_icon_image_id),
                   display_order = (v_item->>'segment_display_order')::integer,
                   active = coalesce((v_item->>'segment_active')::boolean, true)
             where segment_id = v_segment_id;
        end if;

        v_has_category := nullif(trim(v_item->>'category_name'), '') is not null or nullif(v_item->>'category_id', '') is not null;
        v_has_product := nullif(trim(v_item->>'product_name'), '') is not null or nullif(v_item->>'product_id', '') is not null;
        v_has_grade := nullif(trim(v_item->>'grade_name'), '') is not null or nullif(v_item->>'grade_id', '') is not null;
        v_has_pricing := nullif(v_item->>'pricing_id', '') is not null
            or v_item->'pricing_display_order' is not null and v_item->'pricing_display_order' <> 'null'::jsonb
            or nullif(trim(v_item->>'specification'), '') is not null
            or nullif(trim(v_item->>'size_thickness'), '') is not null
            or nullif(trim(v_item->>'unit'), '') is not null
            or v_item->'rate' is not null and v_item->'rate' <> 'null'::jsonb
            or nullif(trim(v_item->>'remarks'), '') is not null;

        if v_has_product or v_has_grade or v_has_pricing then v_has_category := true; end if;
        if v_has_grade or v_has_pricing then v_has_product := true; end if;
        if v_has_pricing then v_has_grade := true; end if;

        -- Category
        if v_has_category then
            if nullif(trim(v_item->>'category_name'), '') is null then
                raise exception 'Excel row %: Category Name is required for this Product/Grade/Pricing row.', v_excel_row;
            end if;
            perform public.bcspl_required_positive_integer_v1(v_item->'category_display_order', 'Category Display Order');
            v_category_id := nullif(v_item->>'category_id', '')::uuid;
            if v_category_id is not null then
                perform 1 from public.product_categories where category_id = v_category_id and segment_id = v_segment_id for update;
                if not found then
                    raise exception 'Excel row %: the hidden Category ID does not belong to Segment "%".', v_excel_row, v_item->>'segment_name';
                end if;
            else
                select count(*), (array_agg(category_id order by category_id))[1] into v_match_count, v_category_id
                from public.product_categories
                where segment_id = v_segment_id and lower(trim(category_name)) = lower(trim(v_item->>'category_name'));
                if v_match_count > 1 then
                    raise exception 'Excel row %: more than one Category matches "%" in Segment "%".', v_excel_row, v_item->>'category_name', v_item->>'segment_name';
                end if;
            end if;
            if v_category_id is null then
                insert into public.product_categories(segment_id, category_name, display_order, active)
                values(v_segment_id, trim(v_item->>'category_name'), (v_item->>'category_display_order')::integer, coalesce((v_item->>'category_active')::boolean, true))
                returning category_id into v_category_id;
                v_categories_created := v_categories_created + 1;
            else
                if exists(select 1 from public.product_categories where segment_id = v_segment_id and lower(trim(category_name)) = lower(trim(v_item->>'category_name')) and category_id <> v_category_id) then
                    raise exception 'Excel row %: another Category already uses the name "%" in this Segment.', v_excel_row, v_item->>'category_name';
                end if;
                update public.product_categories
                   set segment_id = v_segment_id,
                       category_name = trim(v_item->>'category_name'),
                       display_order = (v_item->>'category_display_order')::integer,
                       active = coalesce((v_item->>'category_active')::boolean, true)
                 where category_id = v_category_id;
            end if;
        else
            v_category_id := null;
        end if;

        -- Product
        if v_has_product then
            if nullif(trim(v_item->>'product_name'), '') is null then
                raise exception 'Excel row %: Product Name is required for this Grade/Pricing row.', v_excel_row;
            end if;
            v_show_prices := coalesce((v_item->>'show_on_prices_enquiry')::boolean, true);
            v_show_home := coalesce((v_item->>'show_on_home')::boolean, false);
            if v_show_home and not v_show_prices then
                raise exception 'Excel row %: a Product shown below Home Search must also be shown on Prices & Enquiry.', v_excel_row;
            end if;
            if v_show_prices then
                v_product_order := public.bcspl_required_positive_integer_v1(v_item->'product_display_order', 'Product Display Order');
            else
                v_product_order := null;
            end if;
            if v_show_home then
                v_home_order := public.bcspl_required_positive_integer_v1(v_item->'home_display_order', 'Home Tile Position');
                if v_home_order > 8 then raise exception 'Excel row %: Home Tile Position must be between 1 and 8.', v_excel_row; end if;
            else
                v_home_order := null;
            end if;
            v_product_id := nullif(v_item->>'product_id', '')::uuid;
            if v_product_id is not null then
                perform 1 from public.products where product_id = v_product_id and category_id = v_category_id for update;
                if not found then
                    raise exception 'Excel row %: the hidden Product ID does not belong to Category "%".', v_excel_row, v_item->>'category_name';
                end if;
            else
                select count(*), (array_agg(product_id order by product_id))[1] into v_match_count, v_product_id
                from public.products where category_id = v_category_id and lower(trim(product_name)) = lower(trim(v_item->>'product_name'));
                if v_match_count > 1 then
                    raise exception 'Excel row %: more than one Product matches "%" in Category "%".', v_excel_row, v_item->>'product_name', v_item->>'category_name';
                end if;
            end if;
            if v_product_id is null then
                insert into public.products(segment_id, category_id, product_name, description, product_photo_image_id, show_on_home, home_display_order, show_on_prices_enquiry, prices_enquiry_display_order, active)
                values(v_segment_id, v_category_id, trim(v_item->>'product_name'), trim(coalesce(v_item->>'product_description', '')),
                       nullif(v_item->>'product_photo_image_id', '')::uuid, v_show_home, v_home_order, v_show_prices, v_product_order,
                       coalesce((v_item->>'product_active')::boolean, true))
                returning product_id into v_product_id;
                v_products_created := v_products_created + 1;
            else
                if exists(select 1 from public.products where category_id = v_category_id and lower(trim(product_name)) = lower(trim(v_item->>'product_name')) and product_id <> v_product_id) then
                    raise exception 'Excel row %: another Product already uses the name "%" in this Category.', v_excel_row, v_item->>'product_name';
                end if;
                update public.products
                   set segment_id = v_segment_id,
                       category_id = v_category_id,
                       product_name = trim(v_item->>'product_name'),
                       description = trim(coalesce(v_item->>'product_description', '')),
                       product_photo_image_id = coalesce(nullif(v_item->>'product_photo_image_id', '')::uuid, product_photo_image_id),
                       show_on_home = v_show_home,
                       home_display_order = v_home_order,
                       show_on_prices_enquiry = v_show_prices,
                       prices_enquiry_display_order = v_product_order,
                       active = coalesce((v_item->>'product_active')::boolean, true)
                 where product_id = v_product_id;
            end if;
        else
            v_product_id := null;
        end if;

        -- Grade
        if v_has_grade then
            if nullif(trim(v_item->>'grade_name'), '') is null then
                raise exception 'Excel row %: Grade Name is required for this Pricing row.', v_excel_row;
            end if;
            perform public.bcspl_required_positive_integer_v1(v_item->'grade_display_order', 'Grade Display Order');
            v_grade_id := nullif(v_item->>'grade_id', '')::uuid;
            if v_grade_id is not null then
                perform 1 from public.grade_master where grade_id = v_grade_id and product_id = v_product_id for update;
                if not found then
                    raise exception 'Excel row %: the hidden Grade ID does not belong to Product "%".', v_excel_row, v_item->>'product_name';
                end if;
            else
                select count(*), (array_agg(grade_id order by grade_id))[1] into v_match_count, v_grade_id
                from public.grade_master where product_id = v_product_id and lower(trim(grade_name)) = lower(trim(v_item->>'grade_name'));
                if v_match_count > 1 then
                    raise exception 'Excel row %: more than one Grade matches "%" for Product "%".', v_excel_row, v_item->>'grade_name', v_item->>'product_name';
                end if;
            end if;
            if v_grade_id is null then
                insert into public.grade_master(product_id, grade_name, display_order, active)
                values(v_product_id, trim(v_item->>'grade_name'), (v_item->>'grade_display_order')::integer, coalesce((v_item->>'grade_active')::boolean, true))
                returning grade_id into v_grade_id;
                v_grades_created := v_grades_created + 1;
            else
                if exists(select 1 from public.grade_master where product_id = v_product_id and lower(trim(grade_name)) = lower(trim(v_item->>'grade_name')) and grade_id <> v_grade_id) then
                    raise exception 'Excel row %: another Grade already uses the name "%" for this Product.', v_excel_row, v_item->>'grade_name';
                end if;
                update public.grade_master
                   set product_id = v_product_id,
                       grade_name = trim(v_item->>'grade_name'),
                       display_order = (v_item->>'grade_display_order')::integer,
                       active = coalesce((v_item->>'grade_active')::boolean, true)
                 where grade_id = v_grade_id;
            end if;
        else
            v_grade_id := null;
        end if;

        -- Pricing
        if v_has_pricing then
            v_pricing_order := public.bcspl_required_positive_integer_v1(v_item->'pricing_display_order', 'Pricing Display Order');
            v_rate_display := coalesce(nullif(v_item->>'rate_display', ''), 'price_on_request');
            if v_rate_display not in ('show_price', 'price_on_request', 'coming_soon', 'out_of_stock') then
                raise exception 'Excel row %: Price Display is invalid.', v_excel_row;
            end if;
            v_rate := nullif(v_item->>'rate', '')::numeric;
            v_unit := nullif(trim(v_item->>'unit'), '');
            v_validity := coalesce(nullif(v_item->>'price_validity_days', '')::integer, 1);
            if v_validity < 1 then raise exception 'Excel row %: Price Validity Days must be a positive whole number.', v_excel_row; end if;
            v_rate_date := coalesce(nullif(v_item->>'rate_updated_on', '')::date, current_date);
            if v_rate_display = 'show_price' and (v_rate is null or v_unit is null) then
                raise exception 'Excel row %: Show Price requires both Rate and Unit.', v_excel_row;
            end if;
            v_pricing_id := nullif(v_item->>'pricing_id', '')::uuid;
            if v_pricing_id is not null then
                perform 1 from public.product_pricing where pricing_id = v_pricing_id for update;
                if not found then
                    raise exception 'Excel row %: the hidden Pricing ID no longer exists. Download a fresh Current Master.', v_excel_row;
                end if;
            else
                select count(*), (array_agg(pricing_id order by pricing_id))[1] into v_match_count, v_pricing_id
                from public.product_pricing
                where product_id = v_product_id and grade_id = v_grade_id
                  and lower(trim(coalesce(specification, ''))) = lower(trim(coalesce(v_item->>'specification', '')))
                  and lower(trim(coalesce(size_thickness, ''))) = lower(trim(coalesce(v_item->>'size_thickness', '')))
                  and lower(trim(coalesce(unit, ''))) = lower(trim(coalesce(v_item->>'unit', '')));
                if v_match_count > 1 then
                    raise exception 'Excel row %: more than one Pricing row matches this Product, Grade, Specification, Size and Unit. Preserve the hidden Pricing ID from the Current Master.', v_excel_row;
                end if;
            end if;
            if v_pricing_id is null then
                insert into public.product_pricing(product_id, grade_id, specification, size_thickness, unit, rate, rate_display, price_validity_days, rate_updated_on, remarks, display_order, active)
                values(v_product_id, v_grade_id, trim(coalesce(v_item->>'specification', '')), trim(coalesce(v_item->>'size_thickness', '')), v_unit, v_rate,
                       v_rate_display, v_validity, v_rate_date, trim(coalesce(v_item->>'remarks', '')), v_pricing_order,
                       coalesce((v_item->>'pricing_active')::boolean, true))
                returning pricing_id into v_pricing_id;
                v_pricing_created := v_pricing_created + 1;
            else
                update public.product_pricing
                   set product_id = v_product_id,
                       grade_id = v_grade_id,
                       specification = trim(coalesce(v_item->>'specification', '')),
                       size_thickness = trim(coalesce(v_item->>'size_thickness', '')),
                       unit = v_unit,
                       rate = v_rate,
                       rate_display = v_rate_display,
                       price_validity_days = v_validity,
                       rate_updated_on = v_rate_date,
                       remarks = trim(coalesce(v_item->>'remarks', '')),
                       display_order = v_pricing_order,
                       active = coalesce((v_item->>'pricing_active')::boolean, true)
                 where pricing_id = v_pricing_id;
                v_pricing_updated := v_pricing_updated + 1;
            end if;
        end if;

        v_rows_processed := v_rows_processed + 1;
    end loop;

    -- Reject ambiguous display orders before committing. Lower numbers appear first,
    -- therefore every active record in the same display scope must have its own slot.
    select display_order, string_agg(segment_name, ', ' order by lower(segment_name))
      into v_conflict_order, v_conflict_names
      from public.product_segments
     where active = true
     group by display_order
    having count(*) > 1
     order by display_order
     limit 1;
    if found then
        raise exception 'Segment Display Order % is assigned to more than one active Segment: %. Enter different positive whole numbers.', v_conflict_order, v_conflict_names;
    end if;

    select segment_id, display_order, string_agg(category_name, ', ' order by lower(category_name))
      into v_conflict_parent, v_conflict_order, v_conflict_names
      from public.product_categories
     where active = true
     group by segment_id, display_order
    having count(*) > 1
     order by segment_id, display_order
     limit 1;
    if found then
        raise exception 'Category Display Order % is assigned to more than one active Category within the same Segment: %. Enter different positive whole numbers.', v_conflict_order, v_conflict_names;
    end if;

    select prices_enquiry_display_order, string_agg(product_name, ', ' order by lower(product_name))
      into v_conflict_order, v_conflict_names
      from public.products
     where active = true and show_on_prices_enquiry = true
     group by prices_enquiry_display_order
    having count(*) > 1
     order by prices_enquiry_display_order
     limit 1;
    if found then
        raise exception 'Product Display Order % is assigned to more than one active Prices & Enquiry Product: %. Enter different positive whole numbers.', v_conflict_order, v_conflict_names;
    end if;

    select home_display_order, string_agg(product_name, ', ' order by lower(product_name))
      into v_conflict_order, v_conflict_names
      from public.products
     where active = true and show_on_home = true
     group by home_display_order
    having count(*) > 1
     order by home_display_order
     limit 1;
    if found then
        raise exception 'Home Tile Position % is assigned to more than one active Product: %. Enter different positions from 1 to 8.', v_conflict_order, v_conflict_names;
    end if;

    select product_id, display_order, string_agg(grade_name, ', ' order by lower(grade_name))
      into v_conflict_parent, v_conflict_order, v_conflict_names
      from public.grade_master
     where active = true
     group by product_id, display_order
    having count(*) > 1
     order by product_id, display_order
     limit 1;
    if found then
        raise exception 'Grade Display Order % is assigned to more than one active Grade within the same Product: %. Enter different positive whole numbers.', v_conflict_order, v_conflict_names;
    end if;

    select product_id, display_order,
           string_agg(concat_ws(' / ', nullif(grade_id::text, ''), nullif(specification, ''), nullif(size_thickness, '')), ', ' order by pricing_id)
      into v_conflict_parent, v_conflict_order, v_conflict_names
      from public.product_pricing
     where active = true
     group by product_id, display_order
    having count(*) > 1
     order by product_id, display_order
     limit 1;
    if found then
        raise exception 'Pricing Display Order % is assigned to more than one active Price row within the same Product: %. Enter different positive whole numbers.', v_conflict_order, v_conflict_names;
    end if;

    insert into public.catalogue_import_audit(
        imported_by, rows_received, rows_processed, segments_created, categories_created, products_created,
        grades_created, pricing_created, pricing_updated, pricing_deleted, result
    ) values (
        auth.uid(), jsonb_array_length(p_rows), v_rows_processed, v_segments_created, v_categories_created, v_products_created,
        v_grades_created, v_pricing_created, v_pricing_updated, v_pricing_deleted,
        jsonb_build_object('version', '2.2.0', 'success', true)
    ) returning audit_id into v_audit_id;

    return jsonb_build_object(
        'success', true,
        'version', '2.2.0',
        'audit_id', v_audit_id,
        'rows_received', jsonb_array_length(p_rows),
        'rows_processed', v_rows_processed,
        'segments_created', v_segments_created,
        'categories_created', v_categories_created,
        'products_created', v_products_created,
        'grades_created', v_grades_created,
        'pricing_created', v_pricing_created,
        'pricing_updated', v_pricing_updated,
        'pricing_deleted', v_pricing_deleted
    );
end;
$$;

grant execute on function public.admin_import_catalogue_master_v2(jsonb) to authenticated;
revoke execute on function public.admin_import_catalogue_master_v2(jsonb) from anon;

commit;
