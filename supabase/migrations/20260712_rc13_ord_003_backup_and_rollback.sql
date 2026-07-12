-- RC13-ORD-003 pre-deployment backup and rollback aid.
-- Run the BACKUP section before deploying the transactional ordering migration.

create table if not exists public.rc13_ord_003_order_backup (
    entity text not null,
    record_id uuid not null,
    parent_id uuid,
    order_kind text not null,
    order_value integer,
    captured_at timestamptz not null default now(),
    primary key (entity, record_id, order_kind)
);
alter table public.rc13_ord_003_order_backup enable row level security;
revoke all on table public.rc13_ord_003_order_backup from anon, authenticated;

insert into public.rc13_ord_003_order_backup(entity,record_id,parent_id,order_kind,order_value)
select 'segment',segment_id,null,'display_order',display_order from public.product_segments
on conflict do nothing;
insert into public.rc13_ord_003_order_backup(entity,record_id,parent_id,order_kind,order_value)
select 'product',product_id,null,'home_display_order',home_display_order from public.products
on conflict do nothing;
insert into public.rc13_ord_003_order_backup(entity,record_id,parent_id,order_kind,order_value)
select 'product',product_id,null,'prices_enquiry_display_order',prices_enquiry_display_order from public.products
on conflict do nothing;
insert into public.rc13_ord_003_order_backup(entity,record_id,parent_id,order_kind,order_value)
select 'grade',grade_id,product_id,'display_order',display_order from public.grade_master
on conflict do nothing;
insert into public.rc13_ord_003_order_backup(entity,record_id,parent_id,order_kind,order_value)
select 'pricing',pricing_id,product_id,'display_order',display_order from public.product_pricing
on conflict do nothing;
insert into public.rc13_ord_003_order_backup(entity,record_id,parent_id,order_kind,order_value)
select 'recipient',id,null,'display_order',display_order from public.enquiry_email_recipients
on conflict do nothing;

-- ROLLBACK (run only after explicit approval):
-- update public.product_segments t set display_order=b.order_value from public.rc13_ord_003_order_backup b where b.entity='segment' and b.order_kind='display_order' and b.record_id=t.segment_id;
-- update public.products t set home_display_order=b.order_value from public.rc13_ord_003_order_backup b where b.entity='product' and b.order_kind='home_display_order' and b.record_id=t.product_id;
-- update public.products t set prices_enquiry_display_order=b.order_value from public.rc13_ord_003_order_backup b where b.entity='product' and b.order_kind='prices_enquiry_display_order' and b.record_id=t.product_id;
-- update public.grade_master t set display_order=b.order_value from public.rc13_ord_003_order_backup b where b.entity='grade' and b.order_kind='display_order' and b.record_id=t.grade_id;
-- update public.product_pricing t set display_order=b.order_value from public.rc13_ord_003_order_backup b where b.entity='pricing' and b.order_kind='display_order' and b.record_id=t.pricing_id;
-- update public.enquiry_email_recipients t set display_order=b.order_value from public.rc13_ord_003_order_backup b where b.entity='recipient' and b.order_kind='display_order' and b.record_id=t.id;
-- drop function if exists public.admin_apply_ordered_changes_v1(text,jsonb,jsonb);
-- drop function if exists public.bcspl_assert_admin_v1();
-- drop function if exists public.bcspl_required_positive_integer_v1(jsonb,text);
