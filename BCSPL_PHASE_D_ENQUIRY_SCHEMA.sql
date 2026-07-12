-- BCSPL PHASE D - CUSTOMER ENQUIRY, MULTIPLE PRODUCTS AND EMAIL RECIPIENTS
-- Run in Supabase SQL Editor before deploying the submit-enquiry Edge Function.

begin;

create extension if not exists pgcrypto;

alter table public.enquiries
    add column if not exists source_page text;

alter table public.enquiry_products
    add column if not exists specification_snapshot text;

create table if not exists public.enquiry_email_recipients (
    id uuid primary key default gen_random_uuid(),
    display_name text,
    email text not null,
    display_order integer not null default 1,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint enquiry_email_recipients_email_not_blank check (length(trim(email)) > 3),
    constraint enquiry_email_recipients_display_order_positive check (display_order > 0)
);

create unique index if not exists enquiry_email_recipients_email_ci_unique
    on public.enquiry_email_recipients (lower(trim(email)));

create index if not exists enquiry_email_recipients_active_sort_idx
    on public.enquiry_email_recipients (active, display_order, email);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists set_enquiry_email_recipients_updated_at on public.enquiry_email_recipients;
create trigger set_enquiry_email_recipients_updated_at
before update on public.enquiry_email_recipients
for each row execute function public.set_updated_at();

alter table public.enquiry_email_recipients enable row level security;

drop policy if exists enquiry_recipients_select_admin on public.enquiry_email_recipients;
drop policy if exists enquiry_recipients_insert_admin on public.enquiry_email_recipients;
drop policy if exists enquiry_recipients_update_admin on public.enquiry_email_recipients;
drop policy if exists enquiry_recipients_delete_admin on public.enquiry_email_recipients;

create policy enquiry_recipients_select_admin
on public.enquiry_email_recipients
for select to authenticated
using (public.is_admin());

create policy enquiry_recipients_insert_admin
on public.enquiry_email_recipients
for insert to authenticated
with check (public.is_admin());

create policy enquiry_recipients_update_admin
on public.enquiry_email_recipients
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy enquiry_recipients_delete_admin
on public.enquiry_email_recipients
for delete to authenticated
using (public.is_admin());

-- Atomic enquiry creation. The Edge Function calls this with the service role.
create or replace function public.submit_website_enquiry(enquiry_payload jsonb)
returns table (id uuid, enquiry_reference text)
language plpgsql
security definer
set search_path = public
as $$
declare
    new_enquiry_id uuid;
    new_reference text;
    product_item jsonb;
    product_row record;
    requested_product_id uuid;
    requested_quantity numeric;
    requested_unit text;
begin
    if nullif(trim(enquiry_payload->>'customer_name'), '') is null then
        raise exception 'Customer name is required.';
    end if;
    if nullif(trim(enquiry_payload->>'mobile'), '') is null then
        raise exception 'Mobile number is required.';
    end if;
    if jsonb_typeof(enquiry_payload->'products') <> 'array'
       or jsonb_array_length(enquiry_payload->'products') = 0 then
        raise exception 'At least one product is required.';
    end if;

    insert into public.enquiries (
        customer_name,
        company_name,
        mobile,
        email,
        city,
        requirement_details,
        message,
        source_page,
        status,
        email_notification_status
    ) values (
        trim(enquiry_payload->>'customer_name'),
        nullif(trim(enquiry_payload->>'company_name'), ''),
        trim(enquiry_payload->>'mobile'),
        nullif(trim(enquiry_payload->>'email'), ''),
        nullif(trim(enquiry_payload->>'city'), ''),
        nullif(trim(enquiry_payload->>'requirement_details'), ''),
        nullif(trim(enquiry_payload->>'message'), ''),
        nullif(trim(enquiry_payload->>'source_page'), ''),
        'new',
        'pending'
    )
    returning enquiries.id, enquiries.enquiry_reference
    into new_enquiry_id, new_reference;

    for product_item in select value from jsonb_array_elements(enquiry_payload->'products')
    loop
        begin
            requested_product_id := (product_item->>'product_id')::uuid;
        exception when others then
            raise exception 'Invalid product identifier.';
        end;

        select
            p.id,
            p.grade,
            p.specification,
            p.size_thickness,
            p.unit,
            pc.category_name
        into product_row
        from public.products p
        join public.product_categories pc on pc.id = p.category_id
        where p.id = requested_product_id
          and p.active = true
          and pc.active = true;

        if not found then
            raise exception 'A selected product is no longer available.';
        end if;

        requested_quantity := null;
        if nullif(trim(product_item->>'quantity'), '') is not null then
            requested_quantity := (product_item->>'quantity')::numeric;
            if requested_quantity <= 0 then
                raise exception 'Quantity must be greater than zero.';
            end if;
        end if;

        requested_unit := coalesce(nullif(trim(product_item->>'unit'), ''), product_row.unit);

        insert into public.enquiry_products (
            enquiry_id,
            product_id,
            product_category_snapshot,
            grade_snapshot,
            specification_snapshot,
            size_thickness_snapshot,
            quantity,
            unit
        ) values (
            new_enquiry_id,
            product_row.id,
            product_row.category_name,
            product_row.grade,
            product_row.specification,
            product_row.size_thickness,
            requested_quantity,
            requested_unit
        );
    end loop;

    return query select new_enquiry_id, new_reference;
end;
$$;

revoke all on function public.submit_website_enquiry(jsonb) from public;
revoke all on function public.submit_website_enquiry(jsonb) from anon;
revoke all on function public.submit_website_enquiry(jsonb) from authenticated;
grant execute on function public.submit_website_enquiry(jsonb) to service_role;

commit;
