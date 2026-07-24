# BCSPL Website V2.2.0

Production-ready source package for the Buy Commodity website and Admin panel.

V2.2.0 is cumulative: it retains all V2.1.4 password recovery, Users & Access,
role and audit functionality, and adds a unified Catalogue & Pricing Master with
editable HTML import review plus Home-page product pricing search.

## Start here

Read `V2.2.0_DEPLOYMENT_GUIDE.md` before deployment.

## Main V2.2.0 components

- `admin.html` — Admin dashboard, Users & Access and Catalogue & Pricing Master.
- `js/v2.2-catalogue-master.js` — unified Excel export/import, validation and HTML review.
- `supabase/migrations/20260724_v2_2_0_catalogue_pricing_master.sql` — Category ordering,
  audit table and transactional master-import RPC.
- `js/v2.2-home-search.js` — Home search results grouped by Product with pricing.
- `templates/BCSPL_Catalogue_Pricing_Master_Template_V2.2.0.xlsx` — offline blank template.
- `V2.2.0_CHANGELOG.txt` — complete release summary.

## Important deployment sequence

1. Back up/export current data.
2. Confirm V2.1.4 migration, reset redirect and Edge Function are deployed.
3. Confirm the earlier ordering helper migration is present.
4. Run the V2.2.0 SQL migration.
5. Upload the complete website source.
6. Hard-refresh and complete the regression/smoke tests in the deployment guide.

Never place a Supabase service-role key in browser JavaScript.
