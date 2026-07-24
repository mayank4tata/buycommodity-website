# BCSPL Admin Security — V2.1.4

## Authentication model

BCSPL Admin uses Supabase email/password authentication. A successful Auth login is permitted into the dashboard only when a matching row exists in `public.admin_users` with:

- `user_id = auth.users.id`
- `active = true`
- `role` equal to `admin` or `super_admin`

The browser uses the Supabase publishable/anonymous key only. User invitation, Auth-user listing and other administrative Auth operations run through the authenticated `manage-admin-users` Edge Function using the server-side service-role key.

## Roles

### Admin

Can access the catalogue, pricing, image, enquiry, recipient, settings and import/export modules. Cannot view or manage administrator accounts.

### Super Admin

Has normal Admin access plus the Users & Access module. Can invite users, change roles, resend access links, send password-reset emails, disable accounts and reactivate accounts.

The server prevents a Super Admin from disabling or demoting their own account and prevents removal of the final active Super Admin.

## Password recovery

The Admin Login page calls `resetPasswordForEmail()` and redirects the email link to `admin-reset-password.html`. The reset page establishes the recovery session and calls `updateUser({ password })` after password validation.

The login page always displays a generic successful recovery message and does not confirm whether an account exists for the entered email.

## Invitation flow

1. A Super Admin enters the new user's name, email and role.
2. The browser calls the `manage-admin-users` Edge Function with the signed-in user's access token.
3. The function validates the caller using Supabase Auth and confirms an active `super_admin` row.
4. The function sends an invitation through Supabase Auth and creates the matching `public.admin_users` row.
5. The invited user opens `admin-reset-password.html`, chooses a password and signs in.

## Database fields

`public.admin_users` uses the following current field names:

- `user_id`
- `email`
- `full_name`
- `role`
- `active`
- `invited_by`
- `invited_at`
- `created_at`
- `updated_at`

Legacy documentation referring to `auth_id` or `is_active` is obsolete.

## RLS and authorization helpers

`public.is_admin()` returns true only for an active administrator matching `auth.uid()`.

`public.is_super_admin()` returns true only for an active administrator with role `super_admin`.

Browser-based insert, update and delete operations on `admin_users` remain denied. The Edge Function uses the service-role client after checking the caller's Super Admin status.

## Audit history

Sensitive user-management operations are written to `public.admin_access_audit`, including:

- `USER_INVITED`
- `INVITATION_RESENT`
- `RESET_EMAIL_SENT`
- `ROLE_CHANGED`
- `USER_DISABLED`
- `USER_REACTIVATED`

## Required deployment items

- Run `supabase/migrations/20260724_v2_1_4_admin_access.sql`.
- Configure the password reset URL in Supabase Auth.
- Deploy `supabase/functions/manage-admin-users` with JWT verification enabled.
- Upload the V2.1.4 static website files.

See `V2.1.4_DEPLOYMENT_GUIDE.md` for the deployment sequence and test checklist.
