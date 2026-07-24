(function initAdminPasswordPage() {
    const form = document.getElementById("resetPasswordForm");
    const stateBox = document.getElementById("resetPasswordState");
    const title = document.getElementById("resetPasswordTitle");
    const intro = document.getElementById("resetPasswordIntro");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const updateButton = document.getElementById("updatePasswordBtn");
    const mode = new URLSearchParams(window.location.search).get("mode") || "recovery";
    let validSession = null;
    let completed = false;

    if (mode === "invite") {
        title.textContent = "Create Your Admin Password";
        intro.textContent = "Your BCSPL administrator invitation is ready. Set a secure password to activate your sign-in.";
    }

    function showState(message, type = "") {
        stateBox.textContent = message;
        stateBox.className = `reset-password-state${type ? ` ${type}` : ""}`;
    }

    function showForm(session) {
        if (completed || !session?.user) return;
        validSession = session;
        showState(`Secure link verified for ${session.user.email || "your administrator account"}.`, "success");
        form.hidden = false;
        newPassword.focus();
    }

    async function resolveSession() {
        try {
            const params = new URLSearchParams(window.location.search);
            const authCode = params.get("code");
            let { data: { session }, error } = await supabaseClient.auth.getSession();
            if ((!session || error) && authCode) {
                const exchanged = await supabaseClient.auth.exchangeCodeForSession(authCode);
                if (exchanged.error) throw exchanged.error;
                session = exchanged.data.session;
            }
            if (session) {
                showForm(session);
                return;
            }
            window.setTimeout(async () => {
                const retry = await supabaseClient.auth.getSession();
                if (retry.data.session) showForm(retry.data.session);
                else if (!completed) showState("This password link is invalid or has expired. Request a new link from the Admin Login page.", "error");
            }, 700);
        } catch (error) {
            console.error("Password link validation failed:", error);
            showState("This password link is invalid or has expired. Request a new link from the Admin Login page.", "error");
        }
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (["PASSWORD_RECOVERY", "SIGNED_IN", "USER_UPDATED"].includes(event) && session) {
            window.setTimeout(() => showForm(session), 0);
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const password = newPassword.value;
        const confirmation = confirmPassword.value;
        const strongEnough = password.length >= 10 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);

        if (!validSession) {
            showState("Your secure session is not available. Please request a new password link.", "error");
            return;
        }
        if (!strongEnough) {
            showState("Use at least 10 characters with uppercase, lowercase and a number.", "error");
            return;
        }
        if (password !== confirmation) {
            showState("The two passwords do not match.", "error");
            return;
        }

        updateButton.disabled = true;
        updateButton.textContent = "Updating...";
        try {
            const { error } = await supabaseClient.auth.updateUser({ password });
            if (error) throw error;
            completed = true;
            form.hidden = true;
            showState("Your password has been updated successfully. You can now sign in to the Admin Panel.", "success");
            await supabaseClient.auth.signOut({ scope: "local" });
        } catch (error) {
            console.error("Password update failed:", error);
            showState(error?.message || "The password could not be updated. Request a new link and try again.", "error");
        } finally {
            updateButton.disabled = false;
            updateButton.textContent = "Update Password";
        }
    });

    resolveSession();
})();
