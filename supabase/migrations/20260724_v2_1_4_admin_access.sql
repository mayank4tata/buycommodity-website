-- ============================================================================
-- BCSPL WEBSITE V2.1.4 - ADMIN ACCESS, ROLES AND AUDIT
-- Run once in Supabase SQL Editor before deploying the V2.1.4 website files.
-- This migration is designed to be safe on the existing V2.1.3 database.
-- ============================================================================

BEGIN;

-- 1. Admin profile table / columns ------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'admin',
  active boolean NOT NULL DEFAULT true,
  invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  invited_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role text DEFAULT 'admin';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS invited_by uuid;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS invited_at timestamptz;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Copy legacy values where older column names still exist.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'admin_users' AND column_name = 'auth_id'
  ) THEN
    EXECUTE 'UPDATE public.admin_users SET user_id = auth_id WHERE user_id IS NULL';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'admin_users' AND column_name = 'is_active'
  ) THEN
    EXECUTE 'UPDATE public.admin_users SET active = COALESCE(is_active, active, true)';
  END IF;
END
$$;

-- Backfill email and defaults from Auth where possible.
UPDATE public.admin_users au
SET email = lower(u.email)
FROM auth.users u
WHERE au.user_id = u.id
  AND (au.email IS NULL OR btrim(au.email) = '');

UPDATE public.admin_users SET email = lower(btrim(email)) WHERE email IS NOT NULL;
UPDATE public.admin_users SET role = 'admin' WHERE role IS NULL OR role NOT IN ('admin', 'super_admin');
UPDATE public.admin_users SET active = true WHERE active IS NULL;
UPDATE public.admin_users SET created_at = now() WHERE created_at IS NULL;
UPDATE public.admin_users SET updated_at = now() WHERE updated_at IS NULL;

-- Ensure at least one existing active administrator can manage users after rollout.
DO $$
DECLARE
  bootstrap_user uuid;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.admin_users WHERE active = true AND role = 'super_admin'
  ) THEN
    SELECT user_id INTO bootstrap_user
    FROM public.admin_users
    WHERE active = true AND user_id IS NOT NULL
    ORDER BY created_at NULLS LAST, user_id
    LIMIT 1;

    IF bootstrap_user IS NOT NULL THEN
      UPDATE public.admin_users SET role = 'super_admin', updated_at = now() WHERE user_id = bootstrap_user;
    END IF;
  END IF;
END
$$;

-- Constraints/indexes are added only when the data allows them.
CREATE UNIQUE INDEX IF NOT EXISTS admin_users_user_id_uidx ON public.admin_users(user_id) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS admin_users_email_lower_uidx ON public.admin_users(lower(email)) WHERE email IS NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'admin_users_role_check' AND conrelid = 'public.admin_users'::regclass) THEN
    ALTER TABLE public.admin_users
      ADD CONSTRAINT admin_users_role_check CHECK (role IN ('admin', 'super_admin'));
  END IF;
END
$$;

-- 2. Updated-at trigger ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_admin_users_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.email = lower(btrim(NEW.email));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER trg_admin_users_updated_at
BEFORE INSERT OR UPDATE ON public.admin_users
FOR EACH ROW EXECUTE FUNCTION public.set_admin_users_updated_at();

-- 3. Authorization helpers ------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.active = true
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
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.active = true
      AND au.role = 'super_admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

-- 4. Access audit ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_access_audit (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  target_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_access_audit_created_idx ON public.admin_access_audit(created_at DESC);
CREATE INDEX IF NOT EXISTS admin_access_audit_target_idx ON public.admin_access_audit(target_user_id, created_at DESC);

-- 5. RLS: profile rows are readable by self or Super Admin; browser writes denied.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_access_audit ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_users_select_admin" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_select_self_or_super_admin" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_insert_deny" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_update_deny" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_delete_deny" ON public.admin_users;

CREATE POLICY "admin_users_select_self_or_super_admin"
ON public.admin_users
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_super_admin());

CREATE POLICY "admin_users_insert_deny"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "admin_users_update_deny"
ON public.admin_users
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "admin_users_delete_deny"
ON public.admin_users
FOR DELETE
TO authenticated
USING (false);

DROP POLICY IF EXISTS "admin_access_audit_select_super_admin" ON public.admin_access_audit;
CREATE POLICY "admin_access_audit_select_super_admin"
ON public.admin_access_audit
FOR SELECT
TO authenticated
USING (public.is_super_admin());

GRANT SELECT ON public.admin_users TO authenticated;
GRANT SELECT ON public.admin_access_audit TO authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.admin_users FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.admin_access_audit FROM anon, authenticated;

COMMIT;

-- Verification after commit:
-- SELECT user_id, email, full_name, role, active FROM public.admin_users ORDER BY created_at;
-- SELECT public.is_admin(), public.is_super_admin(); -- run while authenticated to test session context
