/* ============================================================
   TELVIQO ADMIN PANEL
   New Admin Controller
   Built for the current admin.html
   ============================================================ */

"use strict";


/* ============================================================
   CONFIGURATION
   ============================================================ */

const TELVIQO_ADMIN_CONFIG = {
    websitePage: "index.html",
    loginPage: "login.html",
    imageMaximumSize: 5 * 1024 * 1024,

    allowedImageTypes: [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]
};


/* ============================================================
   ADMIN STATE
   ============================================================ */

const TELVIQO_ADMIN_STATE = {
    currentSection: "dashboard",
    editingProjectID: null,
    editingServiceID: null,
    selectedProjectImage: "",
    selectedContentLanguage: "en",
    initialized: false
};


/* ============================================================
   DOM HELPERS
   ============================================================ */

function adminGet(selector) {
    return document.querySelector(selector);
}


function adminGetAll(selector) {
    return Array.from(
        document.querySelectorAll(selector)
    );
}


function adminText(element, value) {
    if (!element) {
        return;
    }

    element.textContent = value;
}


function adminHTML(element, value) {
    if (!element) {
        return;
    }

    element.innerHTML = value;
}


function adminEscapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ============================================================
   DATABASE
   ============================================================ */

function getAdminDatabase() {
    if (!window.TELVIQO_DB) {
        console.error(
            "TELVIQO_DB is not available. Check database.js."
        );

        showAdminToast(
            "Database is not loaded.",
            "error"
        );

        return null;
    }

    return window.TELVIQO_DB;
}


/* ============================================================
   AUTHENTICATION
   ============================================================ */

async function verifyAdminAuthentication() {
    if (!window.TELVIQO_AUTH) {
        console.warn(
            "TELVIQO_AUTH is not loaded."
        );

        return true;
    }

    if (
        typeof window.TELVIQO_AUTH.isAuthenticated !==
        "function"
    ) {
        return true;
    }

    if (
        typeof window.TELVIQO_AUTH.waitForAuthentication ===
        "function"
    ) {
        const authenticated =
            await window.TELVIQO_AUTH.waitForAuthentication();

        if (!authenticated) {
            window.location.replace(
                TELVIQO_ADMIN_CONFIG.loginPage
            );

            return false;
        }

        return true;
    }

    const authenticated =
        window.TELVIQO_AUTH.isAuthenticated();

    if (!authenticated) {
        window.location.replace(
            TELVIQO_ADMIN_CONFIG.loginPage
        );

        return false;
    }

    return true;
}


/* ============================================================
   TOAST
   ============================================================ */

let adminToastTimer = null;


function showAdminToast(
    message,
    type = "success"
) {
    const toast = adminGet("#adminToast");

    if (!toast) {
        return;
    }

    if (adminToastTimer) {
        window.clearTimeout(
            adminToastTimer
        );
    }

    toast.className =
        "admin-toast " + type;

    adminText(
        toast,
        message
    );

    window.requestAnimationFrame(
        function () {
            toast.classList.add(
                "active"
            );
        }
    );

    adminToastTimer =
        window.setTimeout(
            function () {
                toast.classList.remove(
                    "active"
                );
            },
            3200
        );
}


/* ============================================================
   DATE FORMAT
   ============================================================ */

function adminFormatDate(value) {
    if (!value) {
        return "—";
    }

    try {
        return new Intl.DateTimeFormat(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        ).format(
            new Date(value)
        );
    } catch (error) {
        return "—";
    }
}


/* ============================================================
   DATABASE METHOD HELPER
   ============================================================ */

function adminDatabaseMethod(
    database,
    methodName,
    fallback
) {
    if (
        !database ||
        typeof database[methodName] !== "function"
    ) {
        return fallback;
    }

    try {
        return database[methodName]();
    } catch (error) {
        console.error(
            "Database method failed:",
            methodName,
            error
        );

        return fallback;
    }
}


/* ============================================================
   NAVIGATION
   ============================================================ */

function openAdminSection(sectionName) {
    TELVIQO_ADMIN_STATE.currentSection =
        sectionName;

    adminGetAll(
        "[data-admin-section]"
    ).forEach(
        function (section) {
            const active =
                section.dataset.adminSection ===
                sectionName;

            section.classList.toggle(
                "active",
                active
            );
        }
    );

    adminGetAll(
        "[data-admin-nav]"
    ).forEach(
        function (button) {
            const active =
                button.dataset.adminNav ===
                sectionName;

            button.classList.toggle(
                "active",
                active
            );
        }
    );

    closeAdminMobileMenu();

    refreshCurrentSection();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function initializeAdminNavigation() {
    adminGetAll(
        "[data-admin-nav]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    openAdminSection(
                        button.dataset.adminNav
                    );
                }
            );
        }
    );

    adminGetAll(
        "[data-open-admin-section]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    openAdminSection(
                        button.dataset
                            .openAdminSection
                    );
                }
            );
        }
    );
}


/* ============================================================
   MOBILE MENU
   ============================================================ */

function getAdminSidebar() {
    return adminGet(
        ".admin-sidebar"
    );
}


function openAdminMobileMenu() {
    const sidebar =
        getAdminSidebar();

    if (!sidebar) {
        return;
    }

    sidebar.classList.add(
        "mobile-open"
    );
}


function closeAdminMobileMenu() {
    const sidebar =
        getAdminSidebar();

    if (!sidebar) {
        return;
    }

    sidebar.classList.remove(
        "mobile-open"
    );
}


function toggleAdminMobileMenu() {
    const sidebar =
        getAdminSidebar();

    if (!sidebar) {
        return;
    }

    sidebar.classList.toggle(
        "mobile-open"
    );
}


function initializeAdminMobileMenu() {
    const button =
        adminGet("[data-admin-menu]");

    if (!button) {
        return;
    }

    const header =
        adminGet(".admin-mobile-header");

    let lastScrollTop = 0;

    function updateMobileHeaderVisibility() {
        if (
            window.innerWidth > 820 ||
            !header
        ) {
            return;
        }

        const currentScrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            0;

        const shouldHide =
            currentScrollTop > 8 &&
            currentScrollTop > lastScrollTop;

        header.classList.toggle(
            "is-hidden",
            shouldHide
        );

        lastScrollTop =
            currentScrollTop <= 0
                ? 0
                : currentScrollTop;
    }

    button.addEventListener(
        "click",
        toggleAdminMobileMenu
    );

    window.addEventListener(
        "scroll",
        updateMobileHeaderVisibility,
        {
            passive: true
        }
    );

    window.addEventListener(
        "resize",
        updateMobileHeaderVisibility
    );

    updateMobileHeaderVisibility();

    document.addEventListener(
        "click",
        function (event) {
            const sidebar =
                getAdminSidebar();

            if (!sidebar) {
                return;
            }

            if (
                window.innerWidth > 820 ||
                !sidebar.classList.contains(
                    "mobile-open"
                )
            ) {
                return;
            }

            const clickedMenu =
                event.target.closest(
                    "[data-admin-menu]"
                );

            const clickedSidebar =
                event.target.closest(
                    ".admin-sidebar"
                );

            if (
                !clickedMenu &&
                !clickedSidebar
            ) {
                closeAdminMobileMenu();
            }
        }
    );
}


/* ============================================================
   STATS
   ============================================================ */

function setAdminStat(name, value) {
    adminGetAll(
        `[data-admin-stat="${name}"]`
    ).forEach(
        function (element) {
            adminText(
                element,
                value
            );
        }
    );
}


/* ============================================================
   DASHBOARD
   ============================================================ */

function renderDashboard() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    const projects =
        typeof database.getProjects ===
        "function"
            ? database.getProjects(true)
            : [];

    const reviews =
        typeof database.getReviews ===
        "function"
            ? database.getReviews(true)
            : [];

    const requests =
        typeof database.getRequests ===
        "function"
            ? database.getRequests()
            : [];

    const newRequests =
        requests.filter(
            function (request) {
                return request.status === "new";
            }
        );

    setAdminStat(
        "projects",
        projects.length
    );

    setAdminStat(
        "reviews",
        reviews.length
    );

    setAdminStat(
        "requests",
        requests.length
    );

    setAdminStat(
        "newRequests",
        newRequests.length
    );

    renderRecentActivity();
    renderRecentRequests();
}


/* ============================================================
   RECENT ACTIVITY
   ============================================================ */

function renderRecentActivity() {
    const container =
        adminGet("#recentActivity");

    if (!container) {
        return;
    }

    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    const activity =
        typeof database.getActivity ===
        "function"
            ? database.getActivity(8)
            : [];

    if (!activity.length) {
        adminHTML(
            container,
            `
                <div class="admin-empty-state">
                    No activity yet.
                    Your TELVIQO activity will appear here.
                </div>
            `
        );

        return;
    }

    adminHTML(
        container,
        activity
            .map(
                function (item) {
                    return `
                        <div class="admin-activity-item">

                            <div class="admin-activity-icon">
                                T
                            </div>

                            <div class="admin-activity-content">

                                <strong>
                                    ${adminEscapeHTML(
                                        item.message ||
                                        "TELVIQO updated"
                                    )}
                                </strong>

                                <span>
                                    ${adminFormatDate(
                                        item.createdAt
                                    )}
                                </span>

                            </div>

                        </div>
                    `;
                }
            )
            .join("")
    );
}


/* ============================================================
   RECENT REQUESTS
   ============================================================ */

function renderRecentRequests() {
    const container =
        adminGet("#recentRequests");

    if (!container) {
        return;
    }

    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    const requests =
        typeof database.getRequests ===
        "function"
            ? database
                .getRequests()
                .slice(0, 5)
            : [];

    if (!requests.length) {
        adminHTML(
            container,
            `
                <div class="admin-empty-state">
                    No quote requests yet.
                    New customer requests will appear here.
                </div>
            `
        );

        return;
    }

    adminHTML(
        container,
        requests
            .map(
                function (request) {
                    return `
                        <div class="admin-recent-request">

                            <div class="admin-activity-icon">
                                ↗
                            </div>

                            <div class="admin-recent-request-content">

                                <strong>
                                    ${adminEscapeHTML(
                                        request.customerName ||
                                        "Customer"
                                    )}
                                </strong>

                                <span>
                                    ${adminEscapeHTML(
                                        request.deviceModel ||
                                        request.deviceType ||
                                        "Device"
                                    )}
                                    ·
                                    ${adminFormatDate(
                                        request.createdAt
                                    )}
                                </span>

                            </div>

                            <button
                                class="admin-small-button"
                                type="button"
                                data-request-open="${adminEscapeHTML(
                                    request.id
                                )}"
                            >
                                Open
                            </button>

                        </div>
                    `;
                }
            )
            .join("")
    );

    initializeRequestOpenButtons();
}


/* ============================================================
   WEBSITE CONTENT
   ============================================================ */

function renderContentEditor() {
    const database =
        getAdminDatabase();

    if (
        !database ||
        typeof database.getContent !==
        "function"
    ) {
        return;
    }

    const content =
        database.getContent(TELVIQO_ADMIN_STATE.selectedContentLanguage) || {};

    adminGetAll(
        "[data-content-field]"
    ).forEach(
        function (field) {
            const key =
                field.dataset.contentField;

            field.value =
                content[key] ?? "";
        }
    );

    adminGetAll(".admin-language-tab").forEach(function (button) {
        const active = button.dataset.contentLanguage === TELVIQO_ADMIN_STATE.selectedContentLanguage;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
    });
}


function saveWebsiteContent() {
    const database =
        getAdminDatabase();

    if (
        !database ||
        typeof database.updateSiteContent !==
        "function"
    ) {
        showAdminToast(
            "Content database method is missing.",
            "error"
        );

        return;
    }

    const updates = {};

    adminGetAll(
        "[data-content-field]"
    ).forEach(
        function (field) {
            updates[
                field.dataset.contentField
            ] = field.value;
        }
    );

    database.updateSiteContent(updates, TELVIQO_ADMIN_STATE.selectedContentLanguage);

    showAdminToast(
        "Website content saved."
    );

    refreshAllAdminData();
}


function initializeContentEditor() {
    adminGetAll(
        "[data-save-content]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                saveWebsiteContent
            );
        }
    );

    adminGetAll(".admin-language-tab").forEach(function (button) {
        button.addEventListener("click", function () {
            TELVIQO_ADMIN_STATE.selectedContentLanguage = button.dataset.contentLanguage || "en";
            renderContentEditor();
        });
    });
}


/* ============================================================
   SETTINGS
   ============================================================ */

function renderSettings() {
    const database =
        getAdminDatabase();

    if (
        !database ||
        typeof database.getSettings !==
        "function"
    ) {
        return;
    }

    const settings =
        database.getSettings() || {};

    adminGetAll(
        "[data-setting-field]"
    ).forEach(
        function (field) {
            const key =
                field.dataset.settingField;

            const value =
                settings[key];

            if (
                field.type === "checkbox"
            ) {
                field.checked =
                    Boolean(value);
            } else if (
                field.tagName === "SELECT"
            ) {
                field.value =
                    value ? "true" : "false";
            } else {
                field.value =
                    value ?? "";
            }
        }
    );
}


function saveSettings() {
    const database =
        getAdminDatabase();

    if (
        !database ||
        typeof database.updateBusinessSettings !==
        "function"
    ) {
        showAdminToast(
            "Settings database method is missing.",
            "error"
        );

        return;
    }

    const updates = {};

    adminGetAll(
        "[data-setting-field]"
    ).forEach(
        function (field) {
            const key =
                field.dataset.settingField;

            if (
                field.type === "checkbox"
            ) {
                updates[key] =
                    field.checked;
            } else if (
                field.type === "number"
            ) {
                updates[key] =
                    Number(field.value);
            } else if (
                field.tagName === "SELECT"
            ) {
                updates[key] =
                    field.value === "true";
            } else {
                updates[key] =
                    field.value.trim();
            }
        }
    );

    database.updateBusinessSettings(updates);

    showAdminToast(
        "Business settings saved."
    );

    refreshAllAdminData();
}


function initializeSettings() {
    adminGetAll(
        "[data-save-settings]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                saveSettings
            );
        }
    );
}


/* ============================================================
   SOCIAL LINKS
   ============================================================ */

function renderSocialLinks() {
    const database =
        getAdminDatabase();

    if (
        !database ||
        typeof database.getSocialLinks !==
        "function"
    ) {
        return;
    }

    const links =
        database.getSocialLinks() || {};

    adminGetAll(
        "[data-social-field]"
    ).forEach(
        function (field) {
            const key =
                field.dataset.socialField;

            field.value =
                links[key] ?? "";
        }
    );
}


function saveSocialLinks() {
    const database =
        getAdminDatabase();

    if (
        !database ||
        typeof database.updateSocialLinks !==
        "function"
    ) {
        showAdminToast(
            "Social database method is missing.",
            "error"
        );

        return;
    }

    const updates = {};

    adminGetAll(
        "[data-social-field]"
    ).forEach(
        function (field) {
            const value = field.value.trim();
            updates[
                field.dataset.socialField
            ] = field.dataset.socialField === "cashApp"
                ? normalizeCashAppValue(value)
                : value;
        }
    );

    database.updateSocialLinks(updates);

    showAdminToast(
        "Social links and Cash App saved."
    );
    refreshAllAdminData();
}


function normalizeCashAppValue(value) {
    const raw = String(value || "").trim();

    if (!raw) {
        return "";
    }

    if (/^https?:\/\//i.test(raw)) {
        return raw;
    }

    if (raw.startsWith("$")) {
        return "https://cash.app/$/" + raw.replace(/^\$/, "");
    }

    return "https://cash.app/$/" + raw;
}


function initializeSocialLinks() {
    adminGetAll(
        "[data-save-social]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                saveSocialLinks
            );
        }
    );
}


/* ============================================================
   SERVICES
   ============================================================ */

function renderServices() {
    const container =
        adminGet("#adminServicesList");

    if (!container) {
        return;
    }

    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    const services =
        typeof database.getServices ===
        "function"
            ? database.getServices(true)
            : [];

    if (!services.length) {
        adminHTML(
            container,
            `
                <div class="admin-empty-state">
                    No services yet.
                    Click Add Service to create your first service.
                </div>
            `
        );

        return;
    }

    adminHTML(
        container,
        services
            .map(
                function (service) {
                    const active =
                        service.active !== false;

                    return `
                        <article class="admin-list-item">

                            <div class="admin-list-item-content">

                                <span class="admin-status ${
                                    active
                                        ? "admin-status-active"
                                        : "admin-status-hidden"
                                }">
                                    ${
                                        active
                                            ? "ACTIVE"
                                            : "HIDDEN"
                                    }
                                </span>

                                <strong>
                                    ${adminEscapeHTML(
                                        service.title
                                    )}
                                </strong>

                                <p>
                                    ${adminEscapeHTML(
                                        service.description
                                    )}
                                </p>

                            </div>

                            <div class="admin-list-item-actions">

                                <button
                                    class="admin-small-button"
                                    type="button"
                                    data-edit-service="${adminEscapeHTML(
                                        service.id
                                    )}"
                                >
                                    Edit
                                </button>

                                <button
                                    class="admin-small-button"
                                    type="button"
                                    data-toggle-service="${adminEscapeHTML(
                                        service.id
                                    )}"
                                >
                                    ${
                                        active
                                            ? "Hide"
                                            : "Show"
                                    }
                                </button>

                                <button
                                    class="admin-small-button admin-small-button-danger"
                                    type="button"
                                    data-delete-service="${adminEscapeHTML(
                                        service.id
                                    )}"
                                >
                                    Delete
                                </button>

                            </div>

                        </article>
                    `;
                }
            )
            .join("")
    );

    initializeServiceButtons();
}


function clearServiceForm() {
    TELVIQO_ADMIN_STATE.editingServiceID =
        null;

    const form =
        adminGet("#serviceForm");

    if (form) {
        form.reset();
    }

    const buttonText =
        adminGet("#serviceButtonText");

    if (buttonText) {
        buttonText.value =
            "Request a Quote";
    }

    const active =
        adminGet("#serviceActive");

    if (active) {
        active.checked = true;
    }
}


function initializeServiceButtons() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    adminGetAll(
        "[data-edit-service]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        typeof database.getService !==
                        "function"
                    ) {
                        return;
                    }

                    const service =
                        database.getService(
                            button.dataset.editService
                        );

                    if (!service) {
                        return;
                    }

                    TELVIQO_ADMIN_STATE
                        .editingServiceID =
                        service.id;

                    const title =
                        adminGet("#serviceTitle");

                    const description =
                        adminGet(
                            "#serviceDescription"
                        );

                    const buttonText =
                        adminGet(
                            "#serviceButtonText"
                        );

                    const active =
                        adminGet("#serviceActive");

                    if (title) {
                        title.value =
                            service.title || "";
                    }

                    if (description) {
                        description.value =
                            service.description || "";
                    }

                    if (buttonText) {
                        buttonText.value =
                            service.buttonText ||
                            "Request a Quote";
                    }

                    if (active) {
                        active.checked =
                            service.active !== false;
                    }

                    openAdminModal(
                        "serviceModal"
                    );
                }
            );
        }
    );

    adminGetAll(
        "[data-toggle-service]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        typeof database.getService !==
                            "function" ||
                        typeof database.updateService !==
                            "function"
                    ) {
                        return;
                    }

                    const service =
                        database.getService(
                            button.dataset.toggleService
                        );

                    if (!service) {
                        return;
                    }

                    database.updateService(
                        service.id,
                        {
                            active:
                                service.active === false
                        }
                    );

                    renderServices();
                    renderDashboard();

                    showAdminToast(
                        "Service updated."
                    );
                }
            );
        }
    );

    adminGetAll(
        "[data-delete-service]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    const confirmed =
                        window.confirm(
                            "Delete this service?"
                        );

                    if (!confirmed) {
                        return;
                    }

                    if (
                        typeof database.deleteService ===
                        "function"
                    ) {
                        database.deleteService(
                            button.dataset.deleteService
                        );
                    }

                    renderServices();
                    renderDashboard();

                    showAdminToast(
                        "Service deleted."
                    );
                }
            );
        }
    );
}


function initializeServiceForm() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    adminGetAll(
        "[data-new-service]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    clearServiceForm();

                    openAdminModal(
                        "serviceModal"
                    );
                }
            );
        }
    );

    const form =
        adminGet("#serviceForm");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const title =
                adminGet("#serviceTitle")
                    ?.value
                    .trim();

            const description =
                adminGet(
                    "#serviceDescription"
                )
                    ?.value
                    .trim();

            const buttonText =
                adminGet(
                    "#serviceButtonText"
                )
                    ?.value
                    .trim();

            const active =
                adminGet("#serviceActive")
                    ?.checked;

            if (
                !title ||
                !description
            ) {
                showAdminToast(
                    "Add service title and description.",
                    "error"
                );

                return;
            }

            const data = {
                title,
                description,
                buttonText:
                    buttonText ||
                    "Request a Quote",
                active
            };

            if (
                TELVIQO_ADMIN_STATE
                    .editingServiceID
            ) {
                if (
                    typeof database.updateService ===
                    "function"
                ) {
                    database.updateService(
                        TELVIQO_ADMIN_STATE
                            .editingServiceID,
                        data
                    );
                }
            } else {
                if (
                    typeof database.createService ===
                    "function"
                ) {
                    database.createService(
                        data
                    );
                }
            }

            closeAdminModal(
                "serviceModal"
            );

            clearServiceForm();
            renderServices();
            renderDashboard();

            showAdminToast(
                "Service saved."
            );
        }
    );
}


/* ============================================================
   PROJECT IMAGE
   ============================================================ */

function processProjectImage(file) {
    return new Promise(
        function (resolve, reject) {
            if (!file) {
                resolve("");
                return;
            }

            if (
                !TELVIQO_ADMIN_CONFIG
                    .allowedImageTypes
                    .includes(file.type)
            ) {
                reject(
                    new Error(
                        "Use JPG, PNG or WEBP."
                    )
                );

                return;
            }

            if (
                file.size >
                TELVIQO_ADMIN_CONFIG
                    .imageMaximumSize
            ) {
                reject(
                    new Error(
                        "Image must be under 5 MB."
                    )
                );

                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                function () {
                    resolve(
                        reader.result
                    );
                };

            reader.onerror =
                function () {
                    reject(
                        new Error(
                            "Could not read image."
                        )
                    );
                };

            reader.readAsDataURL(file);
        }
    );
}


function updateProjectImagePreview(image) {
    const preview =
        adminGet(
            "#projectImagePreview"
        );

    if (!preview) {
        return;
    }

    if (!image) {
        adminHTML(
            preview,
            `
                <div class="admin-image-placeholder">
                    Select a project image
                </div>
            `
        );

        return;
    }

    adminHTML(
        preview,
        `
            <img
                src="${image}"
                alt="TELVIQO project preview"
            >
        `
    );
}


/* ============================================================
   PROJECTS
   ============================================================ */

function renderProjects() {
    const container =
        adminGet("#adminProjectsList");

    if (!container) {
        return;
    }

    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    const projects =
        typeof database.getProjects ===
        "function"
            ? database.getProjects(true)
            : [];

    if (!projects.length) {
        adminHTML(
            container,
            `
                <div class="admin-empty-state">
                    No projects yet.
                    Add your real TELVIQO repair work.
                </div>
            `
        );

        return;
    }

    adminHTML(
        container,
        projects
            .map(
                function (project) {
                    const visible =
                        project.visible !== false;

                    return `
                        <article class="admin-project-card">

                            <div class="admin-project-card-image">

                                ${
                                    project.image
                                        ? `
                                            <img
                                                src="${project.image}"
                                                alt="${adminEscapeHTML(
                                                    project.title ||
                                                    project.device ||
                                                    "TELVIQO repair"
                                                )}"
                                            >
                                        `
                                        : `
                                            <div class="admin-project-card-placeholder">
                                                No project photo
                                            </div>
                                        `
                                }

                            </div>

                            <div class="admin-project-card-body">

                                <span>
                                    ${adminEscapeHTML(
                                        project.service ||
                                        "TELVIQO REPAIR"
                                    )}
                                </span>

                                <h3>
                                    ${adminEscapeHTML(
                                        project.title
                                    )}
                                </h3>

                                <p>
                                    ${adminEscapeHTML(
                                        project.description ||
                                        project.device ||
                                        ""
                                    )}
                                </p>

                                <div class="admin-project-card-actions">

                                    <button
                                        class="admin-small-button"
                                        type="button"
                                        data-edit-project="${adminEscapeHTML(
                                            project.id
                                        )}"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        class="admin-small-button"
                                        type="button"
                                        data-toggle-project="${adminEscapeHTML(
                                            project.id
                                        )}"
                                    >
                                        ${
                                            visible
                                                ? "Hide"
                                                : "Show"
                                        }
                                    </button>

                                    <button
                                        class="admin-small-button admin-small-button-danger"
                                        type="button"
                                        data-delete-project="${adminEscapeHTML(
                                            project.id
                                        )}"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </article>
                    `;
                }
            )
            .join("")
    );

    initializeProjectButtons();
}


function clearProjectForm() {
    TELVIQO_ADMIN_STATE.editingProjectID =
        null;

    TELVIQO_ADMIN_STATE.selectedProjectImage =
        "";

    const form =
        adminGet("#projectForm");

    if (form) {
        form.reset();
    }

    const visible =
        adminGet("#projectVisible");

    if (visible) {
        visible.checked = true;
    }

    const imageInput =
        adminGet("#projectImage");

    if (imageInput) {
        imageInput.value = "";
    }

    updateProjectImagePreview("");
}


function initializeProjectButtons() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    adminGetAll(
        "[data-edit-project]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        typeof database.getProject !==
                        "function"
                    ) {
                        return;
                    }

                    const project =
                        database.getProject(
                            button.dataset.editProject
                        );

                    if (!project) {
                        return;
                    }

                    TELVIQO_ADMIN_STATE
                        .editingProjectID =
                        project.id;

                    TELVIQO_ADMIN_STATE
                        .selectedProjectImage =
                        project.image || "";

                    const title =
                        adminGet("#projectTitle");

                    const device =
                        adminGet("#projectDevice");

                    const service =
                        adminGet("#projectService");

                    const description =
                        adminGet(
                            "#projectDescription"
                        );

                    const visible =
                        adminGet("#projectVisible");

                    if (title) {
                        title.value =
                            project.title || "";
                    }

                    if (device) {
                        device.value =
                            project.device || "";
                    }

                    if (service) {
                        service.value =
                            project.service || "";
                    }

                    if (description) {
                        description.value =
                            project.description || "";
                    }

                    if (visible) {
                        visible.checked =
                            project.visible !== false;
                    }

                    updateProjectImagePreview(
                        project.image || ""
                    );

                    openAdminModal(
                        "projectModal"
                    );
                }
            );
        }
    );

    adminGetAll(
        "[data-toggle-project]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        typeof database.getProject !==
                            "function" ||
                        typeof database.updateProject !==
                            "function"
                    ) {
                        return;
                    }

                    const project =
                        database.getProject(
                            button.dataset.toggleProject
                        );

                    if (!project) {
                        return;
                    }

                    database.updateProject(
                        project.id,
                        {
                            visible:
                                project.visible === false
                        }
                    );

                    renderProjects();
                    renderDashboard();

                    showAdminToast(
                        "Project updated."
                    );
                }
            );
        }
    );

    adminGetAll(
        "[data-delete-project]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    const confirmed =
                        window.confirm(
                            "Delete this project and its photo?"
                        );

                    if (!confirmed) {
                        return;
                    }

                    if (
                        typeof database.deleteProject ===
                        "function"
                    ) {
                        database.deleteProject(
                            button.dataset.deleteProject
                        );
                    }

                    renderProjects();
                    renderDashboard();

                    showAdminToast(
                        "Project deleted."
                    );
                }
            );
        }
    );
}


function initializeProjectForm() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    adminGetAll(
        "[data-new-project]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    clearProjectForm();

                    openAdminModal(
                        "projectModal"
                    );
                }
            );
        }
    );

    const imageInput =
        adminGet("#projectImage");

    if (imageInput) {
        imageInput.addEventListener(
            "change",
            async function () {
                const file =
                    imageInput.files?.[0];

                if (!file) {
                    return;
                }

                try {
                    const image =
                        await processProjectImage(
                            file
                        );

                    TELVIQO_ADMIN_STATE
                        .selectedProjectImage =
                        image;

                    updateProjectImagePreview(
                        image
                    );
                } catch (error) {
                    imageInput.value = "";

                    showAdminToast(
                        error.message,
                        "error"
                    );
                }
            }
        );
    }

    const form =
        adminGet("#projectForm");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const projectData = {
                title:
                    adminGet("#projectTitle")
                        ?.value
                        .trim(),

                device:
                    adminGet("#projectDevice")
                        ?.value
                        .trim(),

                service:
                    adminGet("#projectService")
                        ?.value
                        .trim(),

                description:
                    adminGet(
                        "#projectDescription"
                    )
                        ?.value
                        .trim(),

                image:
                    TELVIQO_ADMIN_STATE
                        .selectedProjectImage,

                visible:
                    adminGet("#projectVisible")
                        ?.checked
            };

            if (
                !projectData.title ||
                !projectData.device
            ) {
                showAdminToast(
                    "Add project title and device.",
                    "error"
                );

                return;
            }

            if (
                TELVIQO_ADMIN_STATE
                    .editingProjectID
            ) {
                if (
                    typeof database.updateProject ===
                    "function"
                ) {
                    database.updateProject(
                        TELVIQO_ADMIN_STATE
                            .editingProjectID,
                        projectData
                    );
                }
            } else {
                if (
                    typeof database.createProject ===
                    "function"
                ) {
                    database.createProject(
                        projectData
                    );
                }
            }

            closeAdminModal(
                "projectModal"
            );

            clearProjectForm();
            renderProjects();
            renderDashboard();

            showAdminToast(
                "Project saved."
            );
        }
    );
}


/* ============================================================
   REVIEWS
   ============================================================ */

function renderAdminReviews() {
    const container =
        adminGet("#adminReviewsList");

    if (!container) {
        return;
    }

    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    const reviews =
        typeof database.getReviews ===
        "function"
            ? database.getReviews(true)
            : [];

    if (!reviews.length) {
        adminHTML(
            container,
            `
                <div class="admin-empty-state">
                    No customer reviews yet.
                    Reviews submitted on TELVIQO will appear here.
                </div>
            `
        );

        return;
    }

    adminHTML(
        container,
        reviews
            .map(
                function (review) {
                    const rating =
                        Math.max(
                            1,
                            Math.min(
                                5,
                                Number(review.rating) ||
                                5
                            )
                        );

                    const visible =
                        review.visible !== false;

                    return `
                        <article class="admin-review-card">

                            <div class="admin-review-card-top">

                                <div class="admin-review-card-name">

                                    <strong>
                                        ${adminEscapeHTML(
                                            review.name ||
                                            "Customer"
                                        )}
                                    </strong>

                                    <span>
                                        ${adminFormatDate(
                                            review.createdAt
                                        )}
                                    </span>

                                </div>

                                <div class="admin-review-stars">
                                    ${"★".repeat(rating)}
                                </div>

                            </div>

                            <p>
                                ${adminEscapeHTML(
                                    review.message ||
                                    ""
                                )}
                            </p>

                            <div class="admin-review-actions">

                                <span class="admin-status ${
                                    visible
                                        ? "admin-status-active"
                                        : "admin-status-hidden"
                                }">
                                    ${
                                        visible
                                            ? "VISIBLE"
                                            : "HIDDEN"
                                    }
                                </span>

                                ${
                                    review.verified
                                        ? `
                                            <span class="admin-status admin-status-active">
                                                VERIFIED
                                            </span>
                                        `
                                        : ""
                                }

                                <button
                                    class="admin-small-button"
                                    type="button"
                                    data-toggle-review="${adminEscapeHTML(
                                        review.id
                                    )}"
                                >
                                    ${
                                        visible
                                            ? "Hide"
                                            : "Show"
                                    }
                                </button>

                                <button
                                    class="admin-small-button"
                                    type="button"
                                    data-verify-review="${adminEscapeHTML(
                                        review.id
                                    )}"
                                >
                                    ${
                                        review.verified
                                            ? "Unverify"
                                            : "Verify"
                                    }
                                </button>

                                <button
                                    class="admin-small-button admin-small-button-danger"
                                    type="button"
                                    data-delete-review="${adminEscapeHTML(
                                        review.id
                                    )}"
                                >
                                    Delete
                                </button>

                            </div>

                        </article>
                    `;
                }
            )
            .join("")
    );

    initializeReviewAdminButtons();
}


function initializeReviewAdminButtons() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    function findReview(id) {
        if (
            typeof database.getReviews !==
            "function"
        ) {
            return null;
        }

        return database
            .getReviews(true)
            .find(
                function (review) {
                    return review.id === id;
                }
            );
    }

    adminGetAll(
        "[data-toggle-review]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                async function () {
                    const id =
                        button.dataset.toggleReview;

                    const review =
                        findReview(id);

                    if (!review) {
                        return;
                    }

                    if (
                        typeof database.updateReview ===
                        "function"
                    ) {
                        await database.updateReview(
                            id,
                            {
                                visible:
                                    review.visible === false
                            }
                        );
                    }

                    refreshAllAdminData();
                    showAdminToast(
                        "Review visibility updated."
                    );
                }
            );
        }
    );

    adminGetAll(
        "[data-verify-review]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                async function () {
                    const id =
                        button.dataset.verifyReview;

                    const review =
                        findReview(id);

                    if (!review) {
                        return;
                    }

                    if (
                        typeof database.updateReview ===
                        "function"
                    ) {
                        await database.updateReview(
                            id,
                            {
                                verified:
                                    !review.verified
                            }
                        );
                    }

                    refreshAllAdminData();
                    showAdminToast(
                        "Review verification updated."
                    );
                }
            );
        }
    );

    adminGetAll(
        "[data-delete-review]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                async function () {
                    const confirmed =
                        window.confirm(
                            "Delete this review?"
                        );

                    if (!confirmed) {
                        return;
                    }

                    if (
                        typeof database.deleteReview ===
                        "function"
                    ) {
                        await database.deleteReview(
                            button.dataset.deleteReview
                        );
                    }

                    refreshAllAdminData();
                    showAdminToast(
                        "Review deleted."
                    );
                }
            );
        }
    );
}


/* ============================================================
   REQUESTS
   ============================================================ */

function renderRequests() {
    const container =
        adminGet("#adminRequestsList");

    if (!container) {
        return;
    }

    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    const requests =
        typeof database.getRequests ===
        "function"
            ? database.getRequests()
            : [];

    if (!requests.length) {
        adminHTML(
            container,
            `
                <div class="admin-empty-state">
                    No quote requests yet.
                    Customer requests will appear here.
                </div>
            `
        );

        return;
    }

    adminHTML(
        container,
        requests
            .map(
                function (request) {
                    return `
                        <article class="admin-request-card">

                            <div class="admin-request-card-main">

                                <div class="admin-request-card-top">

                                    <strong>
                                        ${adminEscapeHTML(
                                            request.customerName ||
                                            "Customer"
                                        )}
                                    </strong>

                                    <span class="admin-status ${
                                        request.status === "new"
                                            ? "admin-status-new"
                                            : request.status === "completed"
                                                ? "admin-status-complete"
                                                : "admin-status-hidden"
                                    }">
                                        ${adminEscapeHTML(
                                            request.status ||
                                            "new"
                                        )}
                                    </span>

                                </div>

                                <div class="admin-request-card-grid">

                                    ${createRequestInformation(
                                        "REQUEST",
                                        request.id
                                    )}

                                    ${createRequestInformation(
                                        "DEVICE",
                                        request.deviceModel ||
                                        request.deviceType
                                    )}

                                    ${createRequestInformation(
                                        "PHONE",
                                        request.phone
                                    )}

                                    ${createRequestInformation(
                                        "LANGUAGE",
                                        request.preferredLanguage
                                    )}

                                    ${createRequestInformation(
                                        "SERVICE",
                                        request.service
                                    )}

                                    ${createRequestInformation(
                                        "DATE",
                                        adminFormatDate(
                                            request.createdAt
                                        )
                                    )}

                                </div>

                            </div>

                            <div class="admin-request-card-actions">

                                <button
                                    class="admin-primary-button"
                                    type="button"
                                    data-request-open="${adminEscapeHTML(
                                        request.id
                                    )}"
                                >
                                    Open Request
                                </button>

                            </div>

                        </article>
                    `;
                }
            )
            .join("")
    );

    initializeRequestOpenButtons();
}


function createRequestInformation(
    label,
    value
) {
    return `
        <div class="admin-request-information">

            <span>
                ${adminEscapeHTML(label)}
            </span>

            <strong>
                ${adminEscapeHTML(
                    value || "—"
                )}
            </strong>

        </div>
    `;
}


function initializeRequestOpenButtons() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    adminGetAll(
        "[data-request-open]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        typeof database.getRequest !==
                        "function"
                    ) {
                        return;
                    }

                    const request =
                        database.getRequest(
                            button.dataset.requestOpen
                        );

                    if (!request) {
                        return;
                    }

                    renderRequestDetails(
                        request
                    );

                    openAdminModal(
                        "requestModal"
                    );
                }
            );
        }
    );
}


function createRequestDetail(
    label,
    value,
    full = false
) {
    return `
        <div class="admin-request-detail ${
            full
                ? "admin-request-detail-full"
                : ""
        }">

            <span>
                ${adminEscapeHTML(label)}
            </span>

            <strong>
                ${adminEscapeHTML(
                    value || "—"
                )}
            </strong>

        </div>
    `;
}


function createRequestStatusOption(
    value,
    label,
    current
) {
    return `
        <option
            value="${adminEscapeHTML(value)}"
            ${
                value === current
                    ? "selected"
                    : ""
            }
        >
            ${adminEscapeHTML(label)}
        </option>
    `;
}


function renderRequestDetails(request) {
    const container =
        adminGet("#requestDetails");

    if (!container) {
        return;
    }

    adminHTML(
        container,
        `
            <div class="admin-request-details">

                ${createRequestDetail(
                    "Request ID",
                    request.id
                )}

                ${createRequestDetail(
                    "Created",
                    adminFormatDate(
                        request.createdAt
                    )
                )}

                ${createRequestDetail(
                    "Customer Name",
                    request.customerName
                )}

                ${createRequestDetail(
                    "Phone Number",
                    request.phone
                )}

                ${createRequestDetail(
                    "Email",
                    request.email
                )}

                ${createRequestDetail(
                    "Preferred Language",
                    request.preferredLanguage
                )}

                ${createRequestDetail(
                    "Device Type",
                    request.deviceType
                )}

                ${createRequestDetail(
                    "Device Model",
                    request.deviceModel
                )}

                ${createRequestDetail(
                    "Service",
                    request.service
                )}

                ${createRequestDetail(
                    "Authorized Device",
                    request.authorizedDevice
                        ? "Yes"
                        : "No"
                )}

                <div class="admin-request-detail admin-request-detail-full">

                    <span>
                        PROBLEM DESCRIPTION
                    </span>

                    <p>
                        ${adminEscapeHTML(
                            request.problemDescription ||
                            "No description provided."
                        )}
                    </p>

                </div>

                <label class="admin-field admin-request-detail-full">

                    <span>
                        Request Status
                    </span>

                    <select id="requestStatus">

                        ${createRequestStatusOption(
                            "new",
                            "New",
                            request.status
                        )}

                        ${createRequestStatusOption(
                            "contacted",
                            "Contacted",
                            request.status
                        )}

                        ${createRequestStatusOption(
                            "accepted",
                            "Accepted",
                            request.status
                        )}

                        ${createRequestStatusOption(
                            "in_progress",
                            "In Progress",
                            request.status
                        )}

                        ${createRequestStatusOption(
                            "completed",
                            "Completed",
                            request.status
                        )}

                        ${createRequestStatusOption(
                            "declined",
                            "Declined",
                            request.status
                        )}

                    </select>

                </label>

                <label class="admin-field admin-request-detail-full">

                    <span>
                        Private Admin Notes
                    </span>

                    <textarea
                        id="requestAdminNotes"
                        rows="6"
                    >${adminEscapeHTML(
                        request.adminNotes || ""
                    )}</textarea>

                </label>

                <div class="admin-request-detail-actions">

                    <button
                        class="admin-primary-button"
                        type="button"
                        data-save-request="${adminEscapeHTML(
                            request.id
                        )}"
                    >
                        Save Request
                    </button>

                    <button
                        class="admin-danger-button"
                        type="button"
                        data-delete-request="${adminEscapeHTML(
                            request.id
                        )}"
                    >
                        Delete Request
                    </button>

                </div>

            </div>
        `
    );

    initializeRequestDetailButtons();
}


function initializeRequestDetailButtons() {
    const database = getAdminDatabase();

    if (!database) {
        return;
    }

    const saveButton = adminGet("[data-save-request]");

    if (saveButton) {
        saveButton.addEventListener(
            "click",
            async function () {
                if (typeof database.updateRequest !== "function") {
                    console.error("TELVIQO request update function is unavailable.");
                    showAdminToast("Could not save request.");
                    return;
                }

                saveButton.disabled = true;

                try {
                    const success = await database.updateRequest(
                        saveButton.dataset.saveRequest,
                        {
                            status: adminGet("#requestStatus")?.value,
                            adminNotes: adminGet("#requestAdminNotes")?.value || ""
                        }
                    );

                    if (!success) {
                        console.error("TELVIQO request update returned failure.");
                        showAdminToast("Could not save request.");
                        return;
                    }

                    closeAdminModal("requestModal");
                    refreshAllAdminData();
                    showAdminToast("Request saved.");
                } catch (error) {
                    console.error("TELVIQO request update failed:", error);
                    showAdminToast("Could not save request.");
                } finally {
                    saveButton.disabled = false;
                }
            }
        );
    }

    const deleteButton = adminGet("[data-delete-request]");

    if (deleteButton) {
        deleteButton.addEventListener(
            "click",
            async function () {
                const confirmed = window.confirm(
                    "Delete this quote request?"
                );

                if (!confirmed) {
                    return;
                }

                if (typeof database.deleteRequest !== "function") {
                    console.error("TELVIQO request delete function is unavailable.");
                    showAdminToast("Could not delete request.");
                    return;
                }

                deleteButton.disabled = true;

                try {
                    const success = await database.deleteRequest(
                        deleteButton.dataset.deleteRequest
                    );

                    if (!success) {
                        console.error("TELVIQO request delete returned failure.");
                        showAdminToast("Could not delete request.");
                        return;
                    }

                    closeAdminModal("requestModal");
                    refreshAllAdminData();
                    showAdminToast("Request deleted.");
                } catch (error) {
                    console.error("TELVIQO request delete failed:", error);
                    showAdminToast("Could not delete request.");
                } finally {
                    deleteButton.disabled = false;
                }
            }
        );
    }
}


/* ============================================================
   LANGUAGES
   ============================================================ */

function renderLanguages() {
    const container =
        adminGet("#adminLanguagesList");

    if (!container) {
        return;
    }

    const database =
        getAdminDatabase();

    if (
        !database ||
        typeof database.getLanguages !==
        "function"
    ) {
        return;
    }

    const languages =
        database.getLanguages(true) || [];

    if (!languages.length) {
        adminHTML(
            container,
            `
                <div class="admin-empty-state">
                    No languages found.
                </div>
            `
        );

        return;
    }

    adminHTML(
        container,
        languages
            .map(
                function (language) {
                    return `
                        <label class="admin-language-item">

                            <div>

                                <strong>
                                    ${adminEscapeHTML(
                                        language.nativeName ||
                                        language.name
                                    )}
                                </strong>

                                <span>
                                    ${adminEscapeHTML(
                                        language.name
                                    )}
                                </span>

                            </div>

                            <input
                                type="checkbox"
                                data-language-toggle="${adminEscapeHTML(
                                    language.id
                                )}"
                                ${
                                    language.active
                                        ? "checked"
                                        : ""
                                }
                            >

                        </label>
                    `;
                }
            )
            .join("")
    );

    adminGetAll(
        "[data-language-toggle]"
    ).forEach(
        function (input) {
            input.addEventListener(
                "change",
                function () {
                    const updatedLanguages =
                        languages.map(
                            function (language) {
                                if (
                                    language.id ===
                                    input.dataset
                                        .languageToggle
                                ) {
                                    return {
                                        ...language,
                                        active:
                                            input.checked
                                    };
                                }

                                return language;
                            }
                        );

                    if (
                        typeof database.updateLanguages ===
                        "function"
                    ) {
                        database.updateLanguages(
                            updatedLanguages
                        );
                    }

                    showAdminToast(
                        "Languages updated."
                    );
                }
            );
        }
    );
}


/* ============================================================
   BACKUP
   ============================================================ */

function initializeBackupSystem() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    adminGetAll(
        "[data-download-backup]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        typeof database.downloadBackup ===
                        "function"
                    ) {
                        database.downloadBackup();

                        showAdminToast(
                            "Backup downloaded."
                        );
                    }
                }
            );
        }
    );

    adminGetAll(
        "[data-import-backup]"
    ).forEach(
        function (input) {
            input.addEventListener(
                "change",
                function () {
                    const file =
                        input.files?.[0];

                    if (!file) {
                        return;
                    }

                    const reader =
                        new FileReader();

                    reader.onload =
                        function () {
                            try {
                                const data =
                                    JSON.parse(
                                        reader.result
                                    );

                                if (
                                    typeof database.importDatabase ===
                                    "function"
                                ) {
                                    database.importDatabase(
                                        data
                                    );
                                }

                                refreshAllAdminData();

                                showAdminToast(
                                    "Backup imported."
                                );
                            } catch (error) {
                                showAdminToast(
                                    "Invalid backup file.",
                                    "error"
                                );
                            }

                            input.value = "";
                        };

                    reader.readAsText(file);
                }
            );
        }
    );
}


/* ============================================================
   RESET
   ============================================================ */

function initializeResetSystem() {
    const database =
        getAdminDatabase();

    if (!database) {
        return;
    }

    adminGetAll(
        "[data-reset-content]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    const firstConfirm =
                        window.confirm(
                            "Reset TELVIQO website content to default?"
                        );

                    if (!firstConfirm) {
                        return;
                    }

                    const secondConfirm =
                        window.confirm(
                            "Are you sure? Your edited website text and settings may be replaced."
                        );

                    if (!secondConfirm) {
                        return;
                    }

                    if (
                        typeof database.resetWebsiteContent ===
                        "function"
                    ) {
                        database.resetWebsiteContent();
                    }

                    refreshAllAdminData();

                    showAdminToast(
                        "Website content reset."
                    );
                }
            );
        }
    );
}


/* ============================================================
   MODALS
   ============================================================ */

function openAdminModal(modalID) {
    const modal =
        document.getElementById(
            modalID
        );

    if (!modal) {
        return;
    }

    modal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";
}


function closeAdminModal(modalID) {
    const modal =
        document.getElementById(
            modalID
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    if (
        !adminGet(".admin-modal.active")
    ) {
        document.body.style.overflow =
            "";
    }
}


function initializeAdminModals() {
    adminGetAll(
        "[data-close-admin-modal]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    const modal =
                        button.closest(
                            ".admin-modal"
                        );

                    if (!modal) {
                        return;
                    }

                    closeAdminModal(
                        modal.id
                    );
                }
            );
        }
    );

    adminGetAll(
        ".admin-modal-overlay"
    ).forEach(
        function (overlay) {
            overlay.addEventListener(
                "click",
                function () {
                    const modal =
                        overlay.closest(
                            ".admin-modal"
                        );

                    if (modal) {
                        closeAdminModal(
                            modal.id
                        );
                    }
                }
            );
        }
    );

    document.addEventListener(
        "keydown",
        function (event) {
            if (event.key !== "Escape") {
                return;
            }

            const modal =
                adminGet(
                    ".admin-modal.active"
                );

            if (modal) {
                closeAdminModal(
                    modal.id
                );
            }

            closeAdminMobileMenu();
        }
    );
}


/* ============================================================
   WEBSITE PREVIEW
   ============================================================ */

function initializeWebsitePreview() {
    adminGetAll(
        "[data-view-website]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    window.open(
                        TELVIQO_ADMIN_CONFIG
                            .websitePage,
                        "_blank",
                        "noopener,noreferrer"
                    );
                }
            );
        }
    );
}


/* ============================================================
   LOGOUT
   ============================================================ */

function initializeAdminLogout() {
    adminGetAll(
        "[data-admin-logout]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        window.TELVIQO_AUTH &&
                        typeof window
                            .TELVIQO_AUTH
                            .logout === "function"
                    ) {
                        window
                            .TELVIQO_AUTH
                            .logout();
                    }

                    window.location.href =
                        TELVIQO_ADMIN_CONFIG
                            .websitePage;
                }
            );
        }
    );
}


/* ============================================================
   LIVE DATABASE UPDATES
   ============================================================ */

function initializeDatabaseLiveUpdates() {
    window.addEventListener(
        "database:update",
        function (event) {
            const collection =
                event.detail?.collection;

            switch (collection) {
                case "projects":
                    renderProjects();
                    break;

                case "services":
                    renderServices();
                    break;

                case "reviews":
                    renderAdminReviews();
                    break;

                case "requests":
                    renderRequests();
                    break;

                case "content":
                    renderContentEditor();
                    break;

                case "settings":
                    renderSettings();
                    break;

                case "socialLinks":
                    renderSocialLinks();
                    break;

                case "languages":
                    renderLanguages();
                    break;

                case "activity":
                    renderRecentActivity();
                    break;
            }

            renderDashboard();
        }
    );

    window.addEventListener(
        "storage",
        function () {
            refreshAllAdminData();
        }
    );
}


/* ============================================================
   CURRENT SECTION
   ============================================================ */

function refreshCurrentSection() {
    switch (
        TELVIQO_ADMIN_STATE.currentSection
    ) {
        case "dashboard":
            renderDashboard();
            break;

        case "content":
            renderContentEditor();
            break;

        case "services":
            renderServices();
            break;

        case "projects":
            renderProjects();
            break;

        case "reviews":
            renderAdminReviews();
            break;

        case "requests":
            renderRequests();
            break;

        case "settings":
            renderSettings();
            renderSocialLinks();
            renderLanguages();
            break;

        default:
            renderDashboard();
    }
}


/* ============================================================
   REFRESH EVERYTHING
   ============================================================ */

function refreshAllAdminData() {
    renderDashboard();
    renderContentEditor();
    renderSettings();
    renderSocialLinks();
    renderServices();
    renderProjects();
    renderAdminReviews();
    renderRequests();
    renderLanguages();
}


/* ============================================================
   INITIALIZE
   ============================================================ */

async function initializeTELVIQOAdmin() {
    if (
        TELVIQO_ADMIN_STATE.initialized
    ) {
        return;
    }

    const authenticated =
        await verifyAdminAuthentication();

    if (!authenticated) {
        return;
    }

    TELVIQO_ADMIN_STATE.initialized =
        true;

    initializeAdminNavigation();
    initializeAdminMobileMenu();
    initializeContentEditor();
    initializeSettings();
    initializeSocialLinks();
    initializeServiceForm();
    initializeProjectForm();
    initializeAdminModals();
    initializeBackupSystem();
    initializeResetSystem();
    initializeWebsitePreview();
    initializeAdminLogout();
    initializeDatabaseLiveUpdates();

    refreshAllAdminData();

    openAdminSection(
        "dashboard"
    );

    console.log(
        "%cTELVIQO ADMIN",
        [
            "font-size:20px",
            "font-weight:900",
            "color:#4d8dff"
        ].join(";")
    );

    console.log(
        "TELVIQO Admin Panel initialized."
    );
}


/* ============================================================
   GLOBAL ADMIN API
   ============================================================ */

window.TELVIQO_ADMIN = {
    openSection: openAdminSection,
    refresh: refreshAllAdminData,
    renderProjects: renderProjects,
    renderReviews: renderAdminReviews,
    renderRequests: renderRequests,
    renderServices: renderServices,
    showToast: showAdminToast,
    openModal: openAdminModal,
    closeModal: closeAdminModal
};


/* ============================================================
   START TELVIQO ADMIN
   ============================================================ */

if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initializeTELVIQOAdmin
    );
} else {
    initializeTELVIQOAdmin();
}