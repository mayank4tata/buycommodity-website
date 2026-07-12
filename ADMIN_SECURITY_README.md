# BCSPL Admin Panel - Supabase Security Setup Guide

## Overview
This admin panel uses Supabase for:
- **Authentication**: Email/password auth + admin_users table verification
- **Authorization**: Row Level Security (RLS) policies
- **Storage**: product-images bucket with public read + admin write access
- **Database**: Secure operations on products, categories, settings

---

## 1. AUTHENTICATION FLOW

### Current Implementation
1. User enters email and password on login page
2. System signs in user with Supabase Auth
3. System queries `admin_users` table to verify:
   - User email exists in admin_users
   - User's `is_active` field is `true`
4. If both checks pass → Show dashboard
5. If either fails → Sign out and show error

### Code Location
- File: `js/app.js`
- Function: `admin()`
- Helper: `isActiveAdmin(session)`

### Required Setup in Supabase
1. `admin_users` table must exist with columns:
   - `id` (UUID, primary key)
   - `auth_id` (UUID, foreign key to auth.users)
   - `email` (TEXT)
   - `is_active` (BOOLEAN, default: true)
   - `created_at` (TIMESTAMP)

2. Admin users must be registered in two places:
   - **Supabase Auth**: Create account in Authentication > Users
   - **admin_users table**: Insert row with email and auth_id

---

## 2. ROW LEVEL SECURITY (RLS)

### What is RLS?
RLS enforces database policies at the row level. Each query only returns/modifies rows the user is authorized to access.

### Policies Required

#### Products Table (`public.products`)
- **SELECT (Public)**: Anyone can read `is_active = true` products
- **SELECT (Admin)**: Authenticated admins can read all products
- **INSERT/UPDATE/DELETE (Admin)**: Only active admins can modify
- Condition: `auth.uid()` must exist in `admin_users` with `is_active=true`

#### Product Categories (`public.product_categories`)
- **SELECT (Public)**: Anyone can read `active = true` categories
- **SELECT (Admin)**: Authenticated admins can read all categories
- **INSERT/UPDATE/DELETE (Admin)**: Only active admins can modify
- Condition: `auth.uid()` must exist in `admin_users` with `is_active=true`

#### Site Settings (`public.site_settings`)
- **SELECT/UPDATE (Admin)**: Only active admins can read/write settings
- Condition: `auth.uid()` must exist in `admin_users` with `is_active=true`

#### Admin Users (`public.admin_users`)
- **SELECT**: Admins can only read their own record
- **INSERT/UPDATE/DELETE**: All denied (manage in Supabase console only)

### How to Enable RLS

1. **In Supabase Dashboard**:
   - Go to SQL Editor
   - Copy all SQL from `SUPABASE_SECURITY_SETUP.sql`
   - Run the entire script
   - Verify policies are created

2. **Expected Result**:
   - Each table shows "RLS Enabled: true"
   - Each table lists 4-5 policies

3. **Verification Query**:
```sql
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('products', 'product_categories', 'site_settings', 'admin_users');
```

Expected output: All should show `rowsecurity = true`

---

## 3. STORAGE BUCKET SECURITY

### Product-Images Bucket Configuration

#### Bucket Setup
1. Go to Supabase Dashboard > Storage
2. Create bucket named: `product-images`
3. Set to **Private** initially (we'll add policies)

#### Policies (in Storage > product-images > Policies)

**Policy 1: Public Read**
- Type: `SELECT`
- Target: `Authenticated and Anonymous users`
- MIME Types: `image/*`
- Condition: Leave blank for public access
- SQL: `(bucket_id = 'product-images')`

**Policy 2: Admin Upload**
- Type: `INSERT`
- Target: `Authenticated users`
- MIME Types: `image/*` (5MB limit)
- Condition: `public.is_admin()`
- SQL: `(bucket_id = 'product-images' AND auth.uid() IS NOT NULL AND public.is_admin())`

**Policy 3: Admin Update**
- Type: `UPDATE`
- Target: `Authenticated users`
- Condition: `public.is_admin()`
- SQL: `(bucket_id = 'product-images' AND auth.uid() IS NOT NULL AND public.is_admin())`

**Policy 4: Admin Delete**
- Type: `DELETE`
- Target: `Authenticated users`
- Condition: `public.is_admin()`
- SQL: `(bucket_id = 'product-images' AND auth.uid() IS NOT NULL AND public.is_admin())`

#### Result
- ✅ Public users can read all product images
- ✅ Only authenticated admins can upload new images
- ✅ Only authenticated admins can delete images
- ❌ Non-admin users cannot upload/modify

---

## 4. APPLICATION SECURITY FEATURES

### Products Module
- **Load**: Only fetches products where `is_active=true` (unless admin)
- **Create**: New products with auto-generated `product_id` (BCS-P-XXXX)
- **Update**: Existing products verified in database
- **Delete**: Requires confirmation + Supabase delete operation
- **Batch Import**: Excel import validates, imports, and reports errors

### Excel Import Security
- ✅ Requires authenticated session
- ✅ Only active admins can import
- ✅ Validates all rows before import
- ✅ Continues on individual row failures
- ✅ Reports all failed rows with reasons

### Image Upload Security
- ✅ Function: `uploadProductImage(file)`
- ✅ Requires authenticated session
- ✅ Validates file type (must be image/*)
- ✅ Enforces 5MB file size limit
- ✅ Generates unique filename with timestamp
- ✅ Returns public URL for product_url field
- ✅ RLS policy prevents non-admin upload

### Settings Security
- ✅ Only one site_settings record allowed
- ✅ Only admins can view/modify
- ✅ Cached in memory after first load

---

## 5. TESTING THE SETUP

### Verify Authentication
1. Open admin panel
2. Try login with non-admin email → Should be rejected
3. Try login with admin email but wrong password → Should be rejected
4. Try login with correct admin email/password → Should show dashboard

### Verify RLS - Products
1. As **public user** (not logged in):
   - Public site should show `is_active=true` products
   - Should NOT show inactive products

2. As **admin user** (logged in):
   - Admin panel should show all products
   - Can create, edit, delete products
   - Changes immediately reflected

### Verify RLS - Categories
1. As **public user**:
   - Products page should show active categories only

2. As **admin user**:
   - Can create, edit, delete categories
   - Both active and inactive categories visible

### Verify Storage
1. As **admin user**:
   - Can upload images to product-images bucket
   - Can get public URLs for images

2. As **public user**:
   - Can view/download images from public URLs
   - Cannot upload or delete images

---

## 6. TROUBLESHOOTING

### Login Not Working
**Problem**: "This account is not authorized to access the admin panel"

**Solution**:
1. Check user exists in Supabase Auth (Authentication > Users)
2. Check user exists in `admin_users` table:
   ```sql
   SELECT * FROM public.admin_users
   WHERE email = 'your-email@example.com';
   ```
3. Check `is_active` field is `true`
4. Check `auth_id` matches the ID from auth.users table

### Products Not Showing
**Problem**: Admin panel shows no products

**Solution**:
1. Check RLS is enabled on products table
2. Check admin user's auth_id is correct in admin_users table
3. Run SQL query to test is_admin():
   ```sql
   SELECT public.is_admin();
   ```
   (Should return true if logged in as admin)

### Import Failing
**Problem**: Excel import fails with "Could not save to Supabase"

**Solution**:
1. Ensure you're logged in as admin
2. Check RLS policy allows INSERT on products table
3. Check browser console for specific Supabase error
4. Verify admin_users table has your user as active

### Images Won't Upload
**Problem**: Image upload fails

**Solution**:
1. Check product-images bucket exists and is private
2. Check storage policies are set correctly
3. Check file size is < 5MB
4. Check file is valid image format
5. Check admin_users table has is_active=true for current user

---

## 7. ADMIN USER MANAGEMENT

### Add New Admin User
1. In Supabase Dashboard > Authentication > Users:
   - Click "Create user"
   - Enter email and password
   - Click "Create user"

2. In Supabase Dashboard > SQL Editor:
   ```sql
   INSERT INTO public.admin_users (auth_id, email, is_active)
   VALUES (
     'AUTH_ID_FROM_STEP_1',
     'new-admin@buycommodity.in',
     true
   );
   ```

### Disable Admin User
```sql
UPDATE public.admin_users
SET is_active = false
WHERE email = 'admin-to-disable@buycommodity.in';
```

### Remove Admin User
1. First disable them (set is_active = false)
2. Delete from admin_users table:
   ```sql
   DELETE FROM public.admin_users
   WHERE email = 'admin-to-remove@buycommodity.in';
   ```
3. Optionally delete from auth.users in Supabase console

---

## 8. SECURITY BEST PRACTICES

✅ **DO**:
- Keep admin passwords strong and unique
- Add only trusted users to admin_users table
- Regularly audit admin_users table for inactive admins
- Use is_active flag to disable instead of deleting
- Review storage bucket access regularly
- Monitor auth logs for suspicious login attempts

❌ **DON'T**:
- Share admin credentials
- Use same password for multiple services
- Commit Supabase keys to version control
- Disable RLS policies without understanding impact
- Store sensitive data in product image filenames
- Allow non-admin uploads to product-images bucket

---

## 9. COMPLIANCE & AUDIT

### Audit Trails
- ✅ Supabase logs all auth events (login, logout, errors)
- ✅ Database tracks all writes via `updated_at` timestamps
- ✅ Storage logs all uploads/deletions

### Check Auth Logs
1. Supabase Dashboard > Authentication > Logs
2. Search for login attempts, failures, sign-ups

### Check Database Logs
1. Supabase Dashboard > Database > Query Performance
2. Review recent queries for admin operations

---

## 10. NEXT STEPS

1. **Run SQL Migration**: Execute `SUPABASE_SECURITY_SETUP.sql` in Supabase SQL Editor
2. **Configure Storage**: Set up product-images bucket policies as above
3. **Test Authentication**: Verify login/logout works
4. **Test RLS**: Verify products are secure
5. **Monitor**: Watch logs for issues
6. **Train**: Document admin procedures for your team

---

## Questions or Issues?

If you encounter any issues:
1. Check browser console for JavaScript errors
2. Check Supabase dashboard for auth/RLS issues
3. Run verification queries from SUPABASE_SECURITY_SETUP.sql
4. Review logs in Supabase dashboard
5. Verify admin_users table has correct data

---

**Last Updated**: 2026-07-10  
**Security Level**: Production-Ready  
**Maintenance**: Review admin_users table weekly  
