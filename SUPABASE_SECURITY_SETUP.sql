-- ============================================================================
-- BCSPL WEBSITE: SUPABASE SECURITY SETUP (PRODUCTION, IDEMPOTENT)
-- ============================================================================
-- This migration:
-- 1) Enables RLS on required tables
-- 2) Removes existing policies (safe to re-run)
-- 3) Recreates secure policies using public.is_admin()
-- 4) Applies storage policies for bucket: bcspl-images
--
-- IMPORTANT:
-- - V2.1.4 deployments must also run supabase/migrations/20260724_v2_1_4_admin_access.sql
-- - V2.2.0 deployments must also run supabase/migrations/20260724_v2_2_0_catalogue_pricing_master.sql
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
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'admin';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Carry forward the legacy auth_id field where an older installation still has it.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'admin_users' AND column_name = 'auth_id'
  ) THEN
    EXECUTE 'UPDATE public.admin_users SET user_id = auth_id WHERE user_id IS NULL';
  END IF;
END
$$;

-- Authorization helpers are included so this file remains self-contained.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND active = true AND role = 'super_admin'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

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

-- Drop bcspl-images-specific storage policies (name-based + expression-based).
DROP POLICY IF EXISTS "bcspl_images_select_public" ON storage.objects;
DROP POLICY IF EXISTS "bcspl_images_insert_admin" ON storage.objects;
DROP POLICY IF EXISTS "bcspl_images_update_admin" ON storage.objects;
DROP POLICY IF EXISTS "bcspl_images_delete_admin" ON storage.objects;

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
        COALESCE(qual, '') ILIKE '%bcspl-images%'
        OR COALESCE(with_check, '') ILIKE '%bcspl-images%'
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
USING (active = true);

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
-- and allow Super Admins to read all admin rows.
CREATE POLICY "admin_users_select_admin"
ON public.admin_users
FOR SELECT
USING (user_id = auth.uid() OR public.is_super_admin());

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
-- 7. STORAGE POLICIES (storage.objects, bucket: bcspl-images)
-- ============================================================================
-- Anonymous/public: SELECT only.
CREATE POLICY "bcspl_images_select_public"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'bcspl-images');

-- Authenticated admins: INSERT / UPDATE / DELETE.
CREATE POLICY "bcspl_images_insert_admin"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'bcspl-images'
  AND public.is_admin()
);

CREATE POLICY "bcspl_images_update_admin"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'bcspl-images'
  AND public.is_admin()
)
WITH CHECK (
  bucket_id = 'bcspl-images'
  AND public.is_admin()
);

CREATE POLICY "bcspl_images_delete_admin"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'bcspl-images'
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
