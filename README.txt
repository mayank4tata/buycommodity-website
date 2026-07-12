BCSPL Website v1.0 Release Candidate 1

Scope:
- Public company and product catalogue website
- Admin-managed Super Product Categories, Product Categories, Grade Master and exact Product listings
- Bulk product/rate import and export
- Customer enquiry form with multiple products, quantity and unit
- Supabase database and admin authentication
- Microsoft Graph HTML email notifications

Main files:
- index.html
- products.html
- enquiry.html
- admin.html
- js/app.js
- js/supabase.js
- css/style.css
- assets/
- supabase/functions/submit-enquiry/index.ts

Important:
- Product and admin data are stored in Supabase, not browser localStorage.
- The submit-enquiry Edge Function uses Microsoft Graph.
- Required Supabase secrets:
  MS_TENANT_ID
  MS_CLIENT_ID
  MS_CLIENT_SECRET
  MICROSOFT_SENDER_EMAIL=enquiry@buycommodity.in
- JWT verification for submit-enquiry must remain OFF because the form is public.
- Active enquiry recipients are maintained in the admin panel.

Testing:
Open this folder in VS Code and start Live Server from index.html or admin.html.
See MICROSOFT_GRAPH_DEPLOYMENT_GUIDE.md for backend configuration.
