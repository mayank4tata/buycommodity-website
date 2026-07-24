import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const allowedRoles = new Set(["admin", "super_admin"]);

function safeRedirect(requested: unknown, mode: "invite" | "recovery") {
  const configuredOrigin = String(Deno.env.get("ADMIN_SITE_URL") || "https://www.buycommodity.in").replace(/\/$/, "");
  const fallback = new URL(`${configuredOrigin}/admin-reset-password.html`);
  fallback.searchParams.set("mode", mode);

  try {
    const candidate = new URL(String(requested || fallback.href));
    const allowedHosts = new Set(["www.buycommodity.in", "buycommodity.in", "localhost", "127.0.0.1"]);
    if (!["http:", "https:"].includes(candidate.protocol)) return fallback.href;
    if (!allowedHosts.has(candidate.hostname)) return fallback.href;
    if (!candidate.pathname.endsWith("/admin-reset-password.html")) return fallback.href;
    candidate.searchParams.set("mode", mode);
    candidate.hash = "";
    return candidate.href;
  } catch {
    return fallback.href;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed." }, 405);

  const url = Deno.env.get("SUPABASE_URL") || "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const authorization = req.headers.get("Authorization") || "";

  if (!url || !anonKey || !serviceKey) return json({ success: false, error: "Server authentication is not configured." }, 500);
  if (!authorization.startsWith("Bearer ")) return json({ success: false, error: "Administrator authentication is required." }, 401);

  const userClient = createClient(url, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  const serviceClient = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  const mailClient = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  try {
    const { data: callerData, error: callerError } = await userClient.auth.getUser();
    const caller = callerData?.user;
    if (callerError || !caller) return json({ success: false, error: "Your administrator session is invalid or has expired." }, 401);

    const { data: callerAdmin, error: callerAdminError } = await serviceClient
      .from("admin_users")
      .select("user_id,email,full_name,role,active")
      .eq("user_id", caller.id)
      .maybeSingle();
    if (callerAdminError) throw callerAdminError;
    if (!callerAdmin || callerAdmin.active === false || callerAdmin.role !== "super_admin") {
      return json({ success: false, error: "Super Admin access is required." }, 403);
    }

    const payload = await req.json().catch(() => ({}));
    const action = String(payload?.action || "").trim().toLowerCase();

    const audit = async (eventType: string, targetUserId: string | null, details: Record<string, unknown> = {}) => {
      const { error } = await serviceClient.from("admin_access_audit").insert({
        actor_user_id: caller.id,
        target_user_id: targetUserId,
        event_type: eventType,
        details,
      });
      if (error) console.error("Admin audit insert failed:", error.message);
    };

    if (action === "list") {
      const [{ data: adminRows, error: adminRowsError }, authResult] = await Promise.all([
        serviceClient.from("admin_users").select("user_id,email,full_name,role,active,invited_by,invited_at,created_at,updated_at").order("created_at", { ascending: true }),
        serviceClient.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      ]);
      if (adminRowsError) throw adminRowsError;
      if (authResult.error) throw authResult.error;

      const authUsers = new Map((authResult.data?.users || []).map((user) => [user.id, user]));
      const users = (adminRows || []).map((row) => {
        const authUser = authUsers.get(row.user_id);
        return {
          ...row,
          email: row.email || authUser?.email || "",
          full_name: row.full_name || String(authUser?.user_metadata?.full_name || ""),
          email_confirmed_at: authUser?.email_confirmed_at || authUser?.confirmed_at || null,
          last_sign_in_at: authUser?.last_sign_in_at || null,
          auth_created_at: authUser?.created_at || null,
        };
      });
      return json({ success: true, users });
    }

    if (action === "invite") {
      const email = String(payload?.email || "").trim().toLowerCase();
      const fullName = String(payload?.full_name || "").trim().slice(0, 120);
      const role = String(payload?.role || "admin").trim().toLowerCase();
      const redirectTo = safeRedirect(payload?.redirect_to, "invite");

      if (!validEmail(email)) return json({ success: false, error: "A valid email address is required." }, 400);
      if (!fullName) return json({ success: false, error: "Full name is required." }, 400);
      if (!allowedRoles.has(role)) return json({ success: false, error: "The selected administrator role is invalid." }, 400);

      const { data: existingAdmin, error: existingAdminError } = await serviceClient
        .from("admin_users")
        .select("user_id")
        .ilike("email", email)
        .maybeSingle();
      if (existingAdminError) throw existingAdminError;
      if (existingAdmin) return json({ success: false, error: "This email is already registered as an administrator." }, 409);

      const authUsersResult = await serviceClient.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (authUsersResult.error) throw authUsersResult.error;
      const existingAuthUser = (authUsersResult.data?.users || []).find((user) => String(user.email || "").toLowerCase() === email);

      let invitedUser = existingAuthUser || null;
      let newlyCreated = false;
      if (!invitedUser) {
        const inviteResult = await serviceClient.auth.admin.inviteUserByEmail(email, {
          redirectTo,
          data: { full_name: fullName },
        });
        if (inviteResult.error || !inviteResult.data?.user) throw inviteResult.error || new Error("Invitation could not be created.");
        invitedUser = inviteResult.data.user;
        newlyCreated = true;
      } else {
        const metadataResult = await serviceClient.auth.admin.updateUserById(invitedUser.id, {
          user_metadata: { ...(invitedUser.user_metadata || {}), full_name: fullName },
        });
        if (metadataResult.error) throw metadataResult.error;
      }

      const { error: profileError } = await serviceClient.from("admin_users").insert({
        user_id: invitedUser.id,
        email,
        full_name: fullName,
        role,
        active: true,
        invited_by: caller.id,
        invited_at: new Date().toISOString(),
      });
      if (profileError) {
        if (newlyCreated) await serviceClient.auth.admin.deleteUser(invitedUser.id).catch(() => undefined);
        throw profileError;
      }

      if (existingAuthUser) {
        const resetResult = await mailClient.auth.resetPasswordForEmail(email, { redirectTo });
        if (resetResult.error) console.error("Existing-user reset email failed:", resetResult.error.message);
      }

      await audit("USER_INVITED", invitedUser.id, { email, full_name: fullName, role, existing_auth_user: Boolean(existingAuthUser) });
      return json({ success: true, user_id: invitedUser.id });
    }

    const targetUserId = String(payload?.user_id || "").trim();
    if (!validUuid(targetUserId)) return json({ success: false, error: "A valid administrator user is required." }, 400);

    const { data: target, error: targetError } = await serviceClient
      .from("admin_users")
      .select("user_id,email,full_name,role,active")
      .eq("user_id", targetUserId)
      .maybeSingle();
    if (targetError) throw targetError;
    if (!target) return json({ success: false, error: "Administrator user not found." }, 404);

    if (action === "set_role") {
      const role = String(payload?.role || "").trim().toLowerCase();
      if (!allowedRoles.has(role)) return json({ success: false, error: "The selected administrator role is invalid." }, 400);
      if (targetUserId === caller.id && role !== "super_admin") {
        return json({ success: false, error: "You cannot remove your own Super Admin access." }, 400);
      }
      if (target.role === "super_admin" && role !== "super_admin") {
        const { count, error: countError } = await serviceClient
          .from("admin_users")
          .select("user_id", { count: "exact", head: true })
          .eq("role", "super_admin")
          .eq("active", true);
        if (countError) throw countError;
        if (Number(count || 0) <= 1) return json({ success: false, error: "At least one active Super Admin must remain." }, 400);
      }
      const { error } = await serviceClient.from("admin_users").update({ role }).eq("user_id", targetUserId);
      if (error) throw error;
      await audit("ROLE_CHANGED", targetUserId, { previous_role: target.role, role, email: target.email });
      return json({ success: true });
    }

    if (action === "set_active") {
      const active = payload?.active === true;
      if (targetUserId === caller.id && !active) return json({ success: false, error: "You cannot disable your own administrator account." }, 400);
      if (target.role === "super_admin" && target.active !== false && !active) {
        const { count, error: countError } = await serviceClient
          .from("admin_users")
          .select("user_id", { count: "exact", head: true })
          .eq("role", "super_admin")
          .eq("active", true);
        if (countError) throw countError;
        if (Number(count || 0) <= 1) return json({ success: false, error: "At least one active Super Admin must remain." }, 400);
      }
      const { error } = await serviceClient.from("admin_users").update({ active }).eq("user_id", targetUserId);
      if (error) throw error;
      await audit(active ? "USER_REACTIVATED" : "USER_DISABLED", targetUserId, { email: target.email });
      return json({ success: true });
    }

    if (action === "resend_invite") {
      const redirectTo = safeRedirect(payload?.redirect_to, "invite");
      const resendResult = await mailClient.auth.resend({
        type: "signup",
        email: target.email,
        options: { emailRedirectTo: redirectTo },
      });
      let delivery = "signup";
      if (resendResult.error) {
        const recoveryResult = await mailClient.auth.resetPasswordForEmail(target.email, { redirectTo });
        if (recoveryResult.error) throw resendResult.error;
        delivery = "recovery";
      }
      const { error: updateError } = await serviceClient.from("admin_users").update({ invited_at: new Date().toISOString() }).eq("user_id", targetUserId);
      if (updateError) throw updateError;
      await audit("INVITATION_RESENT", targetUserId, { email: target.email, delivery });
      return json({ success: true, delivery });
    }

    if (action === "send_reset") {
      const redirectTo = safeRedirect(payload?.redirect_to, "recovery");
      const result = await mailClient.auth.resetPasswordForEmail(target.email, { redirectTo });
      if (result.error) throw result.error;
      await audit("RESET_EMAIL_SENT", targetUserId, { email: target.email });
      return json({ success: true });
    }

    return json({ success: false, error: "Unsupported user-management action." }, 400);
  } catch (error) {
    console.error("manage-admin-users failed:", error);
    const message = error instanceof Error ? error.message : "The user-management request failed.";
    return json({ success: false, error: message }, 500);
  }
});
