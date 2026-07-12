# BCSPL submit-enquiry — Microsoft Graph Update

This package replaces the Resend email code with Microsoft Graph.

## What stays the same

- The function name remains `submit-enquiry`.
- JWT verification remains OFF because the public website calls the function.
- Enquiries are saved before email is attempted.
- Active recipients still come from `enquiry_email_recipients` in Supabase.
- If no active recipient exists, `site_settings.enquiry_email` is used as a fallback.

## What changes

- Internal HTML notifications are sent from `enquiry@buycommodity.in` through Microsoft Graph.
- Reply-To is set to the customer's email when supplied, so an employee can reply from their own Outlook mailbox directly to the customer.
- The customer receives an HTML acknowledgement when an email address is supplied.
- The acknowledgement shows the contact mobile and email from `site_settings`.

## Required Supabase secrets

Create these four secrets under Supabase Edge Functions → Secrets:

- `MS_TENANT_ID` — Microsoft Directory (tenant) ID
- `MS_CLIENT_ID` — Microsoft Application (client) ID
- `MS_CLIENT_SECRET` — the client-secret Value copied from Microsoft Entra
- `MICROSOFT_SENDER_EMAIL` — `enquiry@buycommodity.in`

Do not share these values in chat and do not put them into HTML or JavaScript files.

## Replace and redeploy in the Supabase browser editor

1. Open Supabase → Edge Functions → `submit-enquiry`.
2. Open the function code editor.
3. Open this package's `supabase/functions/submit-enquiry/index.ts` on your laptop.
4. Copy the complete file.
5. In the Supabase editor, select all existing code and paste the new code.
6. Deploy the function again.
7. Confirm JWT verification remains OFF.

## Site Settings used in customer acknowledgement

The function reads:

- `company_name`
- `mobile_1`, otherwise `mobile_2`, otherwise `whatsapp`
- `email`
- `website`

Enter the team mobile number you want customers to see in Site Settings before final testing.

## Important Microsoft security step

The Microsoft Graph app currently has application-level `Mail.Send`. Before production go-live, restrict it to the `enquiry@buycommodity.in` mailbox using Exchange Online Application RBAC. This can be done after the first successful test.
