-- ============================================================================
-- BCSPL WEBSITE: SUPABASE SECURITY SETUP (PRODUCTION, IDEMPOTENT)
-- ============================================================================
-- This migration:
-- 1) Enables RLS on required tables
-- 2) Removes existing policies (safe to re-run)
-- 3) Recreates secure policies using public.is_admin()
-- 4) Applies storage policies for bucket: product-images
--
-- IMPORTANT:
-- - Uses public.is_admin() everywhere for admin authorization
-- - Does NOT use auth_id
-- - Keeps public website behavior intact
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. ENABLE RLS
-- ============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. DROP EXISTING POLICIES (IDEMPOTENT CLEANUP)
-- ============================================================================
-- Drop every policy on app tables so this migration can be re-run safely.
DO $$
DECLARE
  p RECORD;
BEGIN
  FOR p IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('products', 'product_categories', 'site_settings', 'admin_users')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', p.policyname, p.schemaname, p.tablename);
  END LOOP;
END
$$;

-- Drop product-images-specific storage policies (name-based + expression-based).
DROP POLICY IF EXISTS "product_images_select_public" ON storage.objects;
DROP POLICY IF EXISTS "product_images_insert_admin" ON storage.objects;
DROP POLICY IF EXISTS "product_images_update_admin" ON storage.objects;
DROP POLICY IF EXISTS "product_images_delete_admin" ON storage.objects;

DO $$
DECLARE
  p RECORD;
BEGIN
  FOR p IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND (
        COALESCE(qual, '') ILIKE '%product-images%'
        OR COALESCE(with_check, '') ILIKE '%product-images%'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', p.policyname, p.schemaname, p.tablename);
  END LOOP;
END
$$;

-- ============================================================================
-- 3. PRODUCTS POLICIES
-- ============================================================================
-- Anonymous/public: can read only active products.
CREATE POLICY "products_select_public"
ON public.products
FOR SELECT
USING (is_active = true);

-- Admin: can read all products.
CREATE POLICY "products_select_admin"
ON public.products
FOR SELECT
USING (public.is_admin());

-- Admin-only writes.
CREATE POLICY "products_insert_admin"
ON public.products
FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "products_update_admin"
ON public.products
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "products_delete_admin"
ON public.products
FOR DELETE
USING (public.is_admin());

-- ============================================================================
-- 4. PRODUCT CATEGORIES POLICIES
-- ============================================================================
-- Anonymous/public: can read only active categories.
CREATE POLICY "categories_select_public"
ON public.product_categories
FOR SELECT
USING (active = true);

-- Admin: can read all categories.
CREATE POLICY "categories_select_admin"
ON public.product_categories
FOR SELECT
USING (public.is_admin());

-- Admin-only writes.
CREATE POLICY "categories_insert_admin"
ON public.product_categories
FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "categories_update_admin"
ON public.product_categories
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "categories_delete_admin"
ON public.product_categories
FOR DELETE
USING (public.is_admin());

-- ============================================================================
-- 5. SITE SETTINGS POLICIES
-- ============================================================================
-- Public website requires anonymous/public read access.
CREATE POLICY "settings_select_public"
ON public.site_settings
FOR SELECT
USING (true);

-- Admin-only writes.
CREATE POLICY "settings_insert_admin"
ON public.site_settings
FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "settings_update_admin"
ON public.site_settings
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "settings_delete_admin"
ON public.site_settings
FOR DELETE
USING (public.is_admin());

-- ============================================================================
-- 6. ADMIN_USERS POLICIES
-- ============================================================================
-- Allow users to read their own admin row (for login bootstrap),
-- and allow admins to read all admin rows.
CREATE POLICY "admin_users_select_admin"
ON public.admin_users
FOR SELECT
USING (user_id = auth.uid() OR public.is_admin());

-- Prevent writes through client app paths.
CREATE POLICY "admin_users_insert_deny"
ON public.admin_users
FOR INSERT
WITH CHECK (false);

CREATE POLICY "admin_users_update_deny"
ON public.admin_users
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "admin_users_delete_deny"
ON public.admin_users
FOR DELETE
USING (false);

-- ============================================================================
-- 7. STORAGE POLICIES (storage.objects, bucket: product-images)
-- ============================================================================
-- Anonymous/public: SELECT only.
CREATE POLICY "product_images_select_public"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

-- Authenticated admins: INSERT / UPDATE / DELETE.
CREATE POLICY "product_images_insert_admin"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND public.is_admin()
);

CREATE POLICY "product_images_update_admin"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND public.is_admin()
)
WITH CHECK (
  bucket_id = 'product-images'
  AND public.is_admin()
);

CREATE POLICY "product_images_delete_admin"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND public.is_admin()
);

COMMIT;

-- ============================================================================
-- OPTIONAL VERIFICATION (run manually)
-- ============================================================================
-- SELECT schemaname, tablename, policyname
-- FROM pg_policies
-- WHERE (schemaname = 'public' AND tablename IN ('products', 'product_categories', 'site_settings', 'admin_users'))
--    OR (schemaname = 'storage' AND tablename = 'objects')
-- ORDER BY schemaname, tablename, policyname;
