/* ============================================================
   TELVIQO AUTH
   Admin authentication system
   ============================================================ */

"use strict";


/* ============================================================
   AUTH CONFIG
   ============================================================ */

const TELVIQO_AUTH_CONFIG = {
    loginPage: "login.html",
    adminPage: "admin.html",
    websitePage: "index.html",
    sessionDuration:
        1000 * 60 * 60 * 24 * 7,

    supabaseUrl:
        window.TELVIQO_SUPABASE_URL || "",

    supabaseAnonKey:
        window.TELVIQO_SUPABASE_ANON_KEY || ""
};


/* ============================================================
   AUTH STATE
   ============================================================ */

let TELVIQO_AUTH_STATE = {
    initialized: false,
    authenticated: false,
    session: null,
    user: null,
    loading: false
};

let authClient = null;
let authMessageTimer = null;
let authInitializationPromise = null;
let authRedirectInProgress = false;


/* ============================================================
   HELPERS
   ============================================================ */

function authGet(selector) {
    return document.querySelector(selector);
}


function authGetAll(selector) {
    return Array.from(
        document.querySelectorAll(selector)
    );
}


function getSupabaseClient() {
    if (!TELVIQO_AUTH_CONFIG.supabaseUrl || !TELVIQO_AUTH_CONFIG.supabaseAnonKey) {
        return null;
    }

    if (!authClient) {
        if (!window.supabase || typeof window.supabase.createClient !== "function") {
            return null;
        }

        authClient = window.supabase.createClient(
            TELVIQO_AUTH_CONFIG.supabaseUrl,
            TELVIQO_AUTH_CONFIG.supabaseAnonKey,
            {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    detectSessionInUrl: false
                }
            }
        );
    }

    return authClient;
}


function setAuthState(session, user) {
    const normalizedSession = {
        id: session?.access_token ? "supabase_" + (user?.id || "session") : null,
        authenticated: Boolean(session?.access_token && user),
        username: user?.email || user?.user_metadata?.full_name || "Admin",
        email: user?.email || null,
        createdAt: Date.now(),
        expiresAt: session?.expires_at
            ? session.expires_at * 1000
            : Date.now() + TELVIQO_AUTH_CONFIG.sessionDuration,
        providerSession: session
    };

    TELVIQO_AUTH_STATE = {
        initialized: true,
        authenticated: normalizedSession.authenticated,
        session: normalizedSession,
        user: user || null,
        loading: false
    };

    authInitializationPromise = Promise.resolve(
        normalizedSession.authenticated
    );

    return TELVIQO_AUTH_STATE;
}


function clearAuthSession() {
    TELVIQO_AUTH_STATE = {
        initialized: true,
        authenticated: false,
        session: null,
        user: null,
        loading: false
    };

    authInitializationPromise = Promise.resolve(false);
}


/* ============================================================
   SESSION STORAGE
   ============================================================ */

function getAuthSession() {
    return TELVIQO_AUTH_STATE.session;
}


function saveAuthSession(session) {
    if (!session) {
        clearAuthSession();
        return;
    }

    TELVIQO_AUTH_STATE = {
        ...TELVIQO_AUTH_STATE,
        session: session,
        authenticated: Boolean(session && session.authenticated)
    };
}


/* ============================================================
   AUTHENTICATION
   ============================================================ */

async function authenticateAdmin(username, password) {
    const cleanUsername = String(username || "").trim();
    const cleanPassword = String(password || "");

    if (!cleanUsername || !cleanPassword) {
        return {
            success: false,
            message: "Enter your username and password."
        };
    }

    const client = getSupabaseClient();

    if (!client) {
        return {
            success: false,
            message: "Authentication is not configured. Add your Supabase URL and anon key."
        };
    }

    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: cleanUsername,
            password: cleanPassword
        });

        if (error) {
            return {
                success: false,
                message: error.message || "Incorrect username or password."
            };
        }

        if (!data?.user) {
            return {
                success: false,
                message: "Authentication failed."
            };
        }

        const nextState = setAuthState(data.session, data.user);

        window.dispatchEvent(
            new CustomEvent("telviqo:login", {
                detail: {
                    username: data.user.email || cleanUsername
                }
            })
        );

        return {
            success: true,
            session: nextState.session
        };
    } catch (error) {
        console.error("TELVIQO auth sign-in error:", error);

        return {
            success: false,
            message: "Authentication service is unavailable. Please try again later."
        };
    }
}


async function refreshSupabaseAuthState(force = false) {
    if (!force && authInitializationPromise) {
        return authInitializationPromise;
    }

    authInitializationPromise = (async function () {
        const client = getSupabaseClient();

        if (!client) {
            clearAuthSession();
            return false;
        }

        try {
            const { data, error } = await client.auth.getSession();

            if (error) {
                clearAuthSession();
                return false;
            }

            if (data?.session?.user) {
                setAuthState(data.session, data.session.user);
                return true;
            }
        } catch (error) {
            console.error("TELVIQO auth session refresh error:", error);
        }

        clearAuthSession();
        return false;
    })();

    return authInitializationPromise;
}


async function waitForAuthentication() {
    return refreshSupabaseAuthState(true);
}


/* ============================================================
   AUTH STATUS
   ============================================================ */

function isAdminAuthenticated() {
    return Boolean(TELVIQO_AUTH_STATE.authenticated);
}


function getAuthenticatedAdmin() {
    const session = getAuthSession();

    if (!session) {
        return null;
    }

    return {
        username: session.username,
        sessionID: session.id,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt
    };
}


/* ============================================================
   LOGOUT
   ============================================================ */

async function logoutAdmin() {
    const client = getSupabaseClient();

    if (client && typeof client.auth.signOut === "function") {
        try {
            await client.auth.signOut();
        } catch (error) {
            console.error("TELVIQO auth sign-out error:", error);
        }
    }

    clearAuthSession();

    window.dispatchEvent(new CustomEvent("telviqo:logout"));
    return true;
}


/* ============================================================
   REQUIRE AUTH
   ============================================================ */

function requireAdminAuthentication() {
    if (isAdminAuthenticated()) {
        return true;
    }

    if (!authRedirectInProgress) {
        authRedirectInProgress = true;
        window.location.replace(TELVIQO_AUTH_CONFIG.loginPage);
    }

    return false;
}


/* ============================================================
   LOGIN MESSAGE
   ============================================================ */

function showAuthMessage(message, type = "error") {
    const messageElement = authGet("#loginMessage");

    if (!messageElement) {
        return;
    }

    messageElement.textContent = message;
    messageElement.className = "login-message " + type + " active";

    if (authMessageTimer) {
        window.clearTimeout(authMessageTimer);
    }

    authMessageTimer = window.setTimeout(function () {
        messageElement.classList.remove("active");
    }, 4000);
}


/* ============================================================
   LOGIN BUTTON STATE
   ============================================================ */

function setLoginButtonLoading(loading) {
    const button = authGet("#loginSubmit");

    if (!button) {
        return;
    }

    button.disabled = Boolean(loading);

    if (loading) {
        button.dataset.originalText = button.textContent;
        button.textContent = "Signing in...";
    } else {
        button.textContent = button.dataset.originalText || "Sign In";
    }
}


/* ============================================================
   LOGIN FORM
   ============================================================ */

function initializeLoginForm() {
    const form = authGet("#loginForm");

    if (!form) {
        return;
    }

    refreshSupabaseAuthState().then(function (authenticated) {
        if (authenticated && !authRedirectInProgress) {
            authRedirectInProgress = true;
            window.location.replace(TELVIQO_AUTH_CONFIG.adminPage);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const usernameInput = authGet("#loginUsername");
        const passwordInput = authGet("#loginPassword");

        const username = usernameInput?.value.trim() || "";
        const password = passwordInput?.value || "";

        if (!username || !password) {
            showAuthMessage("Enter your username and password.");
            return;
        }

        setLoginButtonLoading(true);

        authenticateAdmin(username, password).then(function (result) {
            if (!result.success) {
                setLoginButtonLoading(false);
                showAuthMessage(result.message);

                if (passwordInput) {
                    passwordInput.value = "";
                    passwordInput.focus();
                }

                return;
            }

            showAuthMessage("Welcome to TELVIQO Admin.", "success");

            window.setTimeout(function () {
                if (!authRedirectInProgress) {
                    authRedirectInProgress = true;
                    window.location.replace(TELVIQO_AUTH_CONFIG.adminPage);
                }
            }, 400);
        });
    });
}


/* ============================================================
   PASSWORD VISIBILITY
   ============================================================ */

function initializePasswordVisibility() {
    authGetAll("[data-toggle-password]").forEach(function (button) {
        button.addEventListener("click", function () {
            const targetID = button.dataset.togglePassword;
            const input = document.getElementById(targetID);

            if (!input) {
                return;
            }

            const passwordVisible = input.type === "text";
            input.type = passwordVisible ? "password" : "text";

            button.setAttribute(
                "aria-label",
                passwordVisible ? "Show password" : "Hide password"
            );

            button.textContent = passwordVisible ? "Show" : "Hide";
        });
    });
}


/* ============================================================
   LOGIN INPUT EFFECTS
   ============================================================ */

function initializeLoginInputs() {
    authGetAll(".login-field input").forEach(function (input) {
        input.addEventListener("input", function () {
            input.classList.remove("login-input-error");
        });
    });
}


/* ============================================================
   AUTH PAGE DETECTION
   ============================================================ */

function getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    return page || "index.html";
}


function initializeAuthPageProtection() {
    const currentPage = getCurrentPageName();

    if (currentPage === TELVIQO_AUTH_CONFIG.adminPage) {
        return refreshSupabaseAuthState().then(function (authenticated) {
            if (!authenticated && !authRedirectInProgress) {
                authRedirectInProgress = true;
                window.location.replace(TELVIQO_AUTH_CONFIG.loginPage);
            }
        });
    }

    if (currentPage === TELVIQO_AUTH_CONFIG.loginPage) {
        return refreshSupabaseAuthState().then(function (authenticated) {
            if (authenticated && !authRedirectInProgress) {
                authRedirectInProgress = true;
                window.location.replace(TELVIQO_AUTH_CONFIG.adminPage);
            }
        });
    }

    return Promise.resolve(false);
}


function initializeSupabaseAuthListener() {
    const client = getSupabaseClient();

    if (!client || typeof client.auth.onAuthStateChange !== "function") {
        return;
    }

    client.auth.onAuthStateChange(function (event, session) {
        if (event === "SIGNED_IN" && session?.user) {
            setAuthState(session, session.user);
        } else if (event === "SIGNED_OUT") {
            clearAuthSession();
        }
    });
}


/* ============================================================
   AUTH INITIALIZATION
   ============================================================ */

function initializeTELVIQOAuth() {
    initializeAuthPageProtection();
    initializeLoginForm();
    initializePasswordVisibility();
    initializeLoginInputs();
    initializeSupabaseAuthListener();
    refreshSupabaseAuthState();

    console.log("TELVIQO authentication initialized.");
}


/* ============================================================
   GLOBAL AUTH API
   ============================================================ */

window.TELVIQO_AUTH = {
    login: authenticateAdmin,
    logout: logoutAdmin,
    isAuthenticated: isAdminAuthenticated,
    getAdmin: getAuthenticatedAdmin,
    getSession: getAuthSession,
    requireAuthentication: requireAdminAuthentication,
    waitForAuthentication: waitForAuthentication
};


/* ============================================================
   START AUTH
   ============================================================ */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTELVIQOAuth);
} else {
    initializeTELVIQOAuth();
}
