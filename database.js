/* ============================================================
   TELVIQO DATABASE
   Website Data Management System
   ============================================================ */

"use strict";


/* ============================================================
   DATABASE CONFIGURATION
   ============================================================ */

const TELVIQO_DATABASE_CONFIG = {
    storageKey: "telviqo_database_v1",
    databaseVersion: 1
};


/* ============================================================
   UTILITIES
   ============================================================ */

function telviqoClone(value) {
    return JSON.parse(
        JSON.stringify(value)
    );
}


function telviqoCreateID(prefix = "item") {
    const randomPart =
        Math.random()
            .toString(36)
            .slice(2, 9)
            .toUpperCase();

    const timePart =
        Date.now()
            .toString(36)
            .toUpperCase();

    return (
        prefix +
        "-" +
        timePart +
        "-" +
        randomPart
    );
}


function telviqoCreateRequestID() {
    const number =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return "TEL-" + number;
}


function telviqoCurrentDate() {
    return new Date().toISOString();
}


function telviqoSafeString(value) {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value);
}


function telviqoSafeBoolean(
    value,
    defaultValue = false
) {
    if (
        value === undefined ||
        value === null
    ) {
        return defaultValue;
    }

    return Boolean(value);
}


function telviqoSafeNumber(
    value,
    defaultValue = 0
) {
    const number =
        Number(value);

    if (
        Number.isNaN(number)
    ) {
        return defaultValue;
    }

    return number;
}


/* ============================================================
   DEFAULT DATABASE
   ============================================================ */

const TELVIQO_DEFAULT_DATABASE = {

    version:
        TELVIQO_DATABASE_CONFIG
            .databaseVersion,


    /* ========================================================
       WEBSITE CONTENT
       ======================================================== */

    content: {

        heroEyebrow:
            "DEVICE REPAIR · ANTELOPE, CALIFORNIA",

        heroTitle:
            "Technology repair built from real experience.",

        heroDescription:
            "TELVIQO is my independent technology repair project. I repair phones and tablets, work with customer devices, and continue building experience toward opening my own technology business in the future.",

        heroPrimaryButton:
            "Request a Quote",

        heroSecondaryButton:
            "View My Work",


        aboutLabel:
            "ABOUT ME",

        aboutTitle:
            "Building my future one device at a time.",

        aboutText:
            "My name is Danylo Taran. I am building TELVIQO from Antelope, California. I started working with phones and technology because I wanted to learn how devices work and develop real repair experience.\n\nI have already worked on more than 30 devices. I repair phones and tablets and provide device unlocking services when the customer is authorized to request service for the device.\n\nTELVIQO is currently home-based. My goal is to keep learning, earning, and building experience so that as I work toward opening my own technology business.",

        ownerCardTitle:
            "Danylo Taran",

        ownerCardRole:
            "Founder / Owner",

        ownerCardAge:
            "",

        ownerCardLocation:
            "Antelope, California",

        ownerCardFuture:
            "Future CEO / Owner",


        servicesLabel:
            "SERVICES",

        servicesTitle:
            "Technology services",

        servicesDescription:
            "Device repair and technology services based on the work I currently provide through TELVIQO.",


        projectsLabel:
            "MY WORK",

        projectsTitle:
            "Real devices. Real repair work.",

        projectsDescription:
            "A collection of devices and repair projects I have personally worked on.",


        reviewsLabel:
            "CUSTOMER REVIEWS",

        reviewsTitle:
            "What customers say",

        reviewsDescription:
            "Reviews submitted by customers who have interacted with TELVIQO.",


        quoteLabel:
            "REQUEST A QUOTE",

        quoteTitle:
            "Tell me about your device.",

        quoteDescription:
            "Send information about your device and the problem. I will review your request and contact you about the next step.",

        reviewFormHeading:
            "Worked with TELVIQO?",

        reviewFormDescription:
            "Leave a review about your experience. Your feedback may appear publicly on the TELVIQO website.",

        quoteProcessStep1:
            "Send your device information.",

        quoteProcessStep2:
            "I review the problem.",

        quoteProcessStep3:
            "I contact you about the request.",

        serviceAreaTitle:
            "SERVICE AREA",

        serviceAreaLocation:
            "Antelope, California",

        serviceAreaDescription:
            "TELVIQO currently operates as a home-based independent service.",

        contactLabel:
            "CONTACT",

        contactHeading:
            "Follow the TELVIQO journey.",

        contactDescription:
            "Follow my technology and repair work or contact me about your device.",

        maintenanceMessages: {
            en: "TELVIQO is currently undergoing maintenance.\n\nWe apologize for the wait. We are improving the website and will be back online soon.\n\nThank you for your patience.\n\nTELVIQO",
            ru: "На сайте TELVIQO ведутся технические работы.\n\nПриносим извинения за ожидание. Мы улучшаем сайт и скоро снова будем онлайн.\n\nСпасибо за ваше терпение.\n\nTELVIQO",
            uk: "На сайті TELVIQO проводяться технічні роботи.\n\nПерепрошуємо за очікування. Ми покращуємо сайт і незабаром знову будемо онлайн.\n\nДякуємо за ваше терпіння.\n\nTELVIQO",
            ro: "Site-ul TELVIQO este momentan în mentenanță.\n\nNe cerem scuze pentru așteptare. Îmbunătățim site-ul și vom reveni online în curând.\n\nVă mulțumim pentru răbdare.\n\nTELVIQO"
        },

        paymentLabel:
            "PAYMENT",

        paymentTitle:
            "Pay with Cash App",

        paymentDescription:
            "Cash App payment is available for approved TELVIQO services. Confirm the service and payment amount before sending payment.",


        footerText:
            "TELVIQO · Independent technology repair project · Antelope, California",

        translations: {
            en: {},
            ru: {},
            uk: {},
            ro: {}
        }
    },


    /* ========================================================
       BUSINESS SETTINGS
       ======================================================== */

    settings: {

        businessName:
            "TELVIQO",

        businessType:
            "Independent Technology Repair",

        ownerName:
            "Danylo Taran",

        ownerTitle:
            "Founder / Owner",

        futureTitle:
            "Future CEO / Owner",

        age:
            15,

        location:
            "Antelope, California",

        repairedDevices:
            30,

        homeBased:
            true,

        acceptingRequests:
            true
    },


    /* ========================================================
       SOCIAL LINKS
       ======================================================== */

    socialLinks: {

        tiktok:
            "https://www.tiktok.com/@ifixbase",

        instagram:
            "https://www.instagram.com/ifixbaseusa",

        email:
            "",

        cashApp:
            ""
    },


    /* ========================================================
       LANGUAGE SETTINGS
       ======================================================== */

    maintenance: {
        enabled: false,
        messages: {
            en: "TELVIQO is currently undergoing maintenance.\n\nWe apologize for the wait. We are improving the website and will be back online soon.\n\nThank you for your patience.\n\nTELVIQO",
            ru: "На сайте TELVIQO ведутся технические работы.\n\nПриносим извинения за ожидание. Мы улучшаем сайт и скоро снова будем онлайн.\n\nСпасибо за ваше терпение.\n\nTELVIQO",
            uk: "На сайті TELVIQO проводяться технічні роботи.\n\nПерепрошуємо за очікування. Ми покращуємо сайт і незабаром знову будемо онлайн.\n\nДякуємо за ваше терпіння.\n\nTELVIQO",
            ro: "Site-ul TELVIQO este momentan în mentenanță.\n\nNe cerem scuze pentru așteptare. Îmbunătățim site-ul și vom reveni online în curând.\n\nVă mulțumim pentru răbdare.\n\nTELVIQO"
        }
    },

    languageSettings: {
        currentLanguage: "en"
    },

    /* ========================================================
       LANGUAGES
       ======================================================== */

    languages: [

        {
            id:
                "english",

            name:
                "English",

            nativeName:
                "English",

            active:
                true
        },

        {
            id:
                "ukrainian",

            name:
                "Ukrainian",

            nativeName:
                "Український",

            active:
                true
        },

        {
            id:
                "russian",

            name:
                "Russian",

            nativeName:
                "Русский",

            active:
                true
        },

        {
            id:
                "romanian",

            name:
                "Romanian",

            nativeName:
                "Română",

            active:
                true
        }

    ],


    /* ========================================================
       SERVICES
       ======================================================== */

    services: [

        {
            id:
                "service-phone-repair",

            title:
                "Phone Repair",

            description:
                "Repair services for supported smartphones based on the device model and problem.",

            buttonText:
                "Request a Quote",

            active:
                true,

            createdAt:
                "2026-07-05T00:00:00.000Z",

            updatedAt:
                "2026-07-05T00:00:00.000Z"
        },

        {
            id:
                "service-tablet-repair",

            title:
                "Tablet Repair",

            description:
                "Repair services for supported tablets and iPads based on the device and repair needed.",

            buttonText:
                "Request a Quote",

            active:
                true,

            createdAt:
                "2026-07-05T00:00:00.000Z",

            updatedAt:
                "2026-07-05T00:00:00.000Z"
        },

        {
            id:
                "service-device-unlocking",

            title:
                "Device Unlocking",

            description:
                "Unlocking assistance for eligible phones and tablets when the customer is authorized to request service for the device.",

            buttonText:
                "Request a Quote",

            active:
                true,

            createdAt:
                "2026-07-05T00:00:00.000Z",

            updatedAt:
                "2026-07-05T00:00:00.000Z"
        },

        {
            id:
                "service-device-diagnostics",

            title:
                "Device Diagnostics",

            description:
                "Device inspection and problem evaluation to better understand what repair may be needed.",

            buttonText:
                "Request a Quote",

            active:
                true,

            createdAt:
                "2026-07-05T00:00:00.000Z",

            updatedAt:
                "2026-07-05T00:00:00.000Z"
        }

    ],


    /* ========================================================
       PROJECTS
       ======================================================== */

    projects: [],


    /* ========================================================
       REVIEWS
       ======================================================== */

    reviews: [],


    /* ========================================================
       QUOTE REQUESTS
       ======================================================== */

    requests: [],


    /* ========================================================
       ACTIVITY
       ======================================================== */

    activity: [

        {
            id:
                "activity-database-created",

            message:
                "TELVIQO website database created.",

            createdAt:
                "2026-07-05T00:00:00.000Z"
        }

    ]
};


/* ============================================================
   DATABASE STATE
   ============================================================ */

let TELVIQO_DATABASE =
    loadTELVIQODatabase();


/* ============================================================
   LOAD DATABASE
   ============================================================ */

function loadTELVIQODatabase() {
    try {
        const storedDatabase =
            window.localStorage.getItem(
                TELVIQO_DATABASE_CONFIG
                    .storageKey
            );

        if (!storedDatabase) {
            const newDatabase =
                telviqoClone(
                    TELVIQO_DEFAULT_DATABASE
                );

            window.localStorage.setItem(
                TELVIQO_DATABASE_CONFIG
                    .storageKey,

                JSON.stringify(
                    newDatabase
                )
            );

            return newDatabase;
        }

        const parsedDatabase =
            JSON.parse(
                storedDatabase
            );

        return normalizeTELVIQODatabase(
            parsedDatabase
        );

    } catch (error) {

        console.error(
            "TELVIQO database could not be loaded.",
            error
        );

        return telviqoClone(
            TELVIQO_DEFAULT_DATABASE
        );
    }
}


/* ============================================================
   NORMALIZE DATABASE
   ============================================================ */

function normalizeTELVIQODatabase(database) {
    const defaults =
        telviqoClone(
            TELVIQO_DEFAULT_DATABASE
        );

    if (
        !database ||
        typeof database !== "object"
    ) {
        return defaults;
    }

    const normalized = {

        version:
            TELVIQO_DATABASE_CONFIG
                .databaseVersion,

        content: {
            ...defaults.content,
            ...(database.content || {})
        },

        settings: {
            ...defaults.settings,
            ...(database.settings || {})
        },

        socialLinks: {
            ...defaults.socialLinks,
            ...(database.socialLinks || {})
        },

        maintenance: {
            ...defaults.maintenance,
            ...(database.maintenance || {})
        },

        languageSettings: {
            ...defaults.languageSettings,
            ...(database.languageSettings || {})
        },

        languages:
            Array.isArray(database.languages)
                ? database.languages
                : defaults.languages,

        services:
            Array.isArray(database.services)
                ? database.services
                : defaults.services,

        projects:
            Array.isArray(database.projects)
                ? database.projects
                : [],

        reviews:
            Array.isArray(database.reviews)
                ? database.reviews
                : [],

        requests:
            Array.isArray(database.requests)
                ? database.requests
                : [],

        activity:
            Array.isArray(database.activity)
                ? database.activity
                : defaults.activity
    };

    try {
        window.localStorage.setItem(
            TELVIQO_DATABASE_CONFIG
                .storageKey,

            JSON.stringify(
                normalized
            )
        );
    } catch (error) {
        console.error(
            "Normalized TELVIQO database could not be saved.",
            error
        );
    }

    return normalized;
}


/* ============================================================
   SAVE DATABASE
   ============================================================ */

function saveTELVIQODatabase(
    collection = "database"
) {
    try {
        window.localStorage.setItem(
            TELVIQO_DATABASE_CONFIG
                .storageKey,

            JSON.stringify(
                TELVIQO_DATABASE
            )
        );

        dispatchTELVIQODatabaseUpdate(
            collection
        );

        return true;

    } catch (error) {

        console.error(
            "TELVIQO database could not be saved.",
            error
        );

        if (
            error.name === "QuotaExceededError"
        ) {
            window.alert(
                "TELVIQO storage is full. Your project photos may be too large. Download a backup before removing data."
            );
        }

        return false;
    }
}


/* ============================================================
   DATABASE UPDATE EVENT
   ============================================================ */

function dispatchTELVIQODatabaseUpdate(
    collection
) {
    window.dispatchEvent(
        new CustomEvent(
            "database:update",

            {
                detail: {
                    collection:
                        collection,

                    updatedAt:
                        telviqoCurrentDate()
                }
            }
        )
    );
}


/* ============================================================
   ACTIVITY
   ============================================================ */

function addTELVIQOActivity(message) {
    const activityItem = {

        id:
            telviqoCreateID(
                "activity"
            ),

        message:
            telviqoSafeString(
                message
            ),

        createdAt:
            telviqoCurrentDate()
    };

    TELVIQO_DATABASE
        .activity
        .unshift(
            activityItem
        );

    TELVIQO_DATABASE.activity =
        TELVIQO_DATABASE
            .activity
            .slice(
                0,
                100
            );
}


function getTELVIQOActivity(
    maximum = 20
) {
    return telviqoClone(
        TELVIQO_DATABASE
            .activity
            .slice(
                0,
                maximum
            )
    );
}


/* ============================================================
   CONTENT
   ============================================================ */

function getTELVIQOContent(language = null) {
    const baseContent = telviqoClone(TELVIQO_DATABASE.content || {});
    const translations = baseContent.translations || {};

    if (!language) {
        delete baseContent.translations;
        return baseContent;
    }

    const normalizedLanguage = String(language).toLowerCase();
    const languageOverrides = translations[normalizedLanguage] || {};

    delete baseContent.translations;

    return {
        ...baseContent,
        ...languageOverrides
    };
}


function updateTELVIQOContent(updates, language = null) {
    if (
        !updates ||
        typeof updates !== "object"
    ) {
        return false;
    }

    if (language) {
        const normalizedLanguage = String(language).toLowerCase();
        const existingTranslations = telviqoClone(TELVIQO_DATABASE.content?.translations || {});
        const languageValues = existingTranslations[normalizedLanguage] || {};

        TELVIQO_DATABASE.content = {
            ...TELVIQO_DATABASE.content,
            translations: {
                ...existingTranslations,
                [normalizedLanguage]: {
                    ...languageValues,
                    ...updates
                }
            }
        };
    } else {
        TELVIQO_DATABASE.content = {
            ...TELVIQO_DATABASE.content,
            ...updates
        };
    }

    addTELVIQOActivity(
        "Website content updated."
    );

    return saveTELVIQODatabase(
        "content"
    );
}


/* ============================================================
   SETTINGS
   ============================================================ */

function getTELVIQOSettings() {
    return telviqoClone(
        TELVIQO_DATABASE.settings
    );
}


function updateTELVIQOSettings(updates) {
    if (
        !updates ||
        typeof updates !== "object"
    ) {
        return false;
    }

    TELVIQO_DATABASE.settings = {
        ...TELVIQO_DATABASE.settings,
        ...updates
    };

    addTELVIQOActivity(
        "Business settings updated."
    );

    return saveTELVIQODatabase(
        "settings"
    );
}


/* ============================================================
   MAINTENANCE SETTINGS
   ============================================================ */

function getTELVIQOMaintenanceSettings() {
    const maintenance = TELVIQO_DATABASE.maintenance || {};
    const defaults = telviqoClone(TELVIQO_DEFAULT_DATABASE.maintenance);

    return {
        ...defaults,
        ...maintenance,
        messages: {
            ...defaults.messages,
            ...(maintenance.messages || {})
        }
    };
}


function updateTELVIQOMaintenanceSettings(updates) {
    if (!updates || typeof updates !== "object") {
        return false;
    }

    TELVIQO_DATABASE.maintenance = {
        ...getTELVIQOMaintenanceSettings(),
        ...updates,
        messages: {
            ...getTELVIQOMaintenanceSettings().messages,
            ...((updates.messages || {}) || {})
        }
    };

    addTELVIQOActivity("Maintenance mode updated.");

    return saveTELVIQODatabase("maintenance");
}


/* ============================================================
   LANGUAGE SETTINGS
   ============================================================ */

function getTELVIQOLanguageSettings() {
    return {
        currentLanguage: "en",
        ...(TELVIQO_DATABASE.languageSettings || {})
    };
}


function updateTELVIQOLanguageSettings(updates) {
    if (!updates || typeof updates !== "object") {
        return false;
    }

    TELVIQO_DATABASE.languageSettings = {
        ...getTELVIQOLanguageSettings(),
        ...updates
    };

    addTELVIQOActivity("Website language updated.");

    return saveTELVIQODatabase("languageSettings");
}


/* ============================================================
   SOCIAL LINKS
   ============================================================ */

function getTELVIQOSocialLinks() {
    return telviqoClone(
        TELVIQO_DATABASE.socialLinks
    );
}


function updateTELVIQOSocialLinks(
    updates
) {
    if (
        !updates ||
        typeof updates !== "object"
    ) {
        return false;
    }

    TELVIQO_DATABASE.socialLinks = {
        ...TELVIQO_DATABASE.socialLinks,
        ...updates
    };

    addTELVIQOActivity(
        "Social links and contact information updated."
    );

    return saveTELVIQODatabase(
        "socialLinks"
    );
}


/* ============================================================
   LANGUAGES
   ============================================================ */

function getTELVIQOLanguages(
    includeInactive = false
) {
    const languages =
        TELVIQO_DATABASE.languages;

    const filteredLanguages =
        includeInactive
            ? languages
            : languages.filter(
                function (language) {
                    return (
                        language.active !== false
                    );
                }
            );

    return telviqoClone(
        filteredLanguages
    );
}


function updateTELVIQOLanguages(
    languages
) {
    if (
        !Array.isArray(languages)
    ) {
        return false;
    }

    TELVIQO_DATABASE.languages =
        telviqoClone(
            languages
        );

    addTELVIQOActivity(
        "Customer languages updated."
    );

    return saveTELVIQODatabase(
        "languages"
    );
}


/* ============================================================
   SERVICES
   ============================================================ */

function getTELVIQOServices(
    includeInactive = false
) {
    const services =
        TELVIQO_DATABASE.services;

    const filteredServices =
        includeInactive
            ? services
            : services.filter(
                function (service) {
                    return (
                        service.active !== false
                    );
                }
            );

    return telviqoClone(
        filteredServices
    );
}


function getTELVIQOService(id) {
    const service =
        TELVIQO_DATABASE
            .services
            .find(
                function (item) {
                    return item.id === id;
                }
            );

    if (!service) {
        return null;
    }

    return telviqoClone(
        service
    );
}


function createTELVIQOService(data) {
    if (
        !data ||
        typeof data !== "object"
    ) {
        return null;
    }

    const service = {

        id:
            telviqoCreateID(
                "service"
            ),

        title:
            telviqoSafeString(
                data.title
            ),

        description:
            telviqoSafeString(
                data.description
            ),

        buttonText:
            telviqoSafeString(
                data.buttonText ||
                "Request a Quote"
            ),

        active:
            telviqoSafeBoolean(
                data.active,
                true
            ),

        createdAt:
            telviqoCurrentDate(),

        updatedAt:
            telviqoCurrentDate()
    };

    TELVIQO_DATABASE
        .services
        .push(
            service
        );

    addTELVIQOActivity(
        'Service "' +
        service.title +
        '" added.'
    );

    saveTELVIQODatabase(
        "services"
    );

    return telviqoClone(
        service
    );
}


function updateTELVIQOService(
    id,
    updates
) {
    const index =
        TELVIQO_DATABASE
            .services
            .findIndex(
                function (service) {
                    return service.id === id;
                }
            );

    if (index === -1) {
        return false;
    }

    TELVIQO_DATABASE
        .services[index] = {

            ...TELVIQO_DATABASE
                .services[index],

            ...updates,

            id:
                TELVIQO_DATABASE
                    .services[index]
                    .id,

            updatedAt:
                telviqoCurrentDate()
        };

    addTELVIQOActivity(
        'Service "' +
        TELVIQO_DATABASE
            .services[index]
            .title +
        '" updated.'
    );

    return saveTELVIQODatabase(
        "services"
    );
}


function deleteTELVIQOService(id) {
    const service =
        TELVIQO_DATABASE
            .services
            .find(
                function (item) {
                    return item.id === id;
                }
            );

    if (!service) {
        return false;
    }

    TELVIQO_DATABASE.services =
        TELVIQO_DATABASE
            .services
            .filter(
                function (item) {
                    return item.id !== id;
                }
            );

    addTELVIQOActivity(
        'Service "' +
        service.title +
        '" deleted.'
    );

    return saveTELVIQODatabase(
        "services"
    );
}


/* ============================================================
   PROJECTS / MY WORK
   EACH PROJECT STORES ITS OWN IMAGE
   ============================================================ */

function getTELVIQOProjects(
    includeHidden = false
) {
    const projects =
        TELVIQO_DATABASE.projects;

    const filteredProjects =
        includeHidden
            ? projects
            : projects.filter(
                function (project) {
                    return (
                        project.visible !== false
                    );
                }
            );

    return telviqoClone(
        filteredProjects
    );
}


function getTELVIQOProject(id) {
    const project =
        TELVIQO_DATABASE
            .projects
            .find(
                function (item) {
                    return item.id === id;
                }
            );

    if (!project) {
        return null;
    }

    return telviqoClone(
        project
    );
}


function createTELVIQOProject(data) {
    if (
        !data ||
        typeof data !== "object"
    ) {
        return null;
    }

    const project = {

        id:
            telviqoCreateID(
                "project"
            ),

        title:
            telviqoSafeString(
                data.title
            ),

        device:
            telviqoSafeString(
                data.device
            ),

        service:
            telviqoSafeString(
                data.service
            ),

        description:
            telviqoSafeString(
                data.description
            ),

        image:
            telviqoSafeString(
                data.image
            ),

        imageAlt:
            telviqoSafeString(
                data.title ||
                data.device ||
                "TELVIQO repair project"
            ),

        visible:
            telviqoSafeBoolean(
                data.visible,
                true
            ),

        createdAt:
            telviqoCurrentDate(),

        updatedAt:
            telviqoCurrentDate()
    };

    TELVIQO_DATABASE
        .projects
        .unshift(
            project
        );

    addTELVIQOActivity(
        'Project "' +
        project.title +
        '" added to My Work.'
    );

    saveTELVIQODatabase(
        "projects"
    );

    return telviqoClone(
        project
    );
}


function updateTELVIQOProject(
    id,
    updates
) {
    const index =
        TELVIQO_DATABASE
            .projects
            .findIndex(
                function (project) {
                    return project.id === id;
                }
            );

    if (index === -1) {
        return false;
    }

    const currentProject =
        TELVIQO_DATABASE
            .projects[index];

    TELVIQO_DATABASE
        .projects[index] = {

            ...currentProject,

            ...updates,

            id:
                currentProject.id,

            image:
                updates.image !== undefined
                    ? telviqoSafeString(
                        updates.image
                    )
                    : currentProject.image,

            imageAlt:
                telviqoSafeString(
                    updates.title ||
                    currentProject.title ||
                    updates.device ||
                    currentProject.device ||
                    "TELVIQO repair project"
                ),

            updatedAt:
                telviqoCurrentDate()
        };

    addTELVIQOActivity(
        'Project "' +
        TELVIQO_DATABASE
            .projects[index]
            .title +
        '" updated.'
    );

    return saveTELVIQODatabase(
        "projects"
    );
}


function deleteTELVIQOProject(id) {
    const project =
        TELVIQO_DATABASE
            .projects
            .find(
                function (item) {
                    return item.id === id;
                }
            );

    if (!project) {
        return false;
    }

    TELVIQO_DATABASE.projects =
        TELVIQO_DATABASE
            .projects
            .filter(
                function (item) {
                    return item.id !== id;
                }
            );

    addTELVIQOActivity(
        'Project "' +
        project.title +
        '" deleted.'
    );

    return saveTELVIQODatabase(
        "projects"
    );
}


/* ============================================================
   REVIEWS
   ============================================================ */

let TELVIQO_REVIEW_SYNC_IN_PROGRESS = false;


function getSupabaseReviewsTable() {
    return (
        window.TELVIQO_REVIEWS_TABLE ||
        "reviews"
    );
}


function normalizeTELVIQOReview(record) {
    if (!record || typeof record !== "object") {
        return null;
    }

    const hidden = telviqoSafeBoolean(
        record.hidden,
        telviqoSafeBoolean(
            record.visible === false,
            false
        )
    );

    const name = telviqoSafeString(
        record.customer_name ||
        record.customerName ||
        record.name
    ).trim() || "Anonymous";

    const message = telviqoSafeString(
        record.review_text ||
        record.reviewText ||
        record.message
    ).trim();

    return {
        id: telviqoSafeString(
            record.id
        ).trim() || telviqoCreateID("review"),

        name: name,

        message: message,

        rating: Math.max(
            1,
            Math.min(
                5,
                telviqoSafeNumber(
                    record.rating,
                    5
                )
            )
        ),

        verified: telviqoSafeBoolean(
            record.verified,
            false
        ),

        visible: !hidden,

        hidden: hidden,

        createdAt: record.created_at ||
            record.createdAt ||
            telviqoCurrentDate(),

        updatedAt: record.updated_at ||
            record.updatedAt ||
            telviqoCurrentDate()
    };
}


function mergeTELVIQOReviewsFromSupabase(rows) {
    const normalized =
        (rows || [])
            .map(normalizeTELVIQOReview)
            .filter(Boolean);

    const merged = [...TELVIQO_DATABASE.reviews];
    const byID = new Map();

    merged.forEach(function (review) {
        byID.set(review.id, review);
    });

    normalized.forEach(function (review) {
        byID.set(review.id, review);
    });

    TELVIQO_DATABASE.reviews =
        Array.from(byID.values()).sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    saveTELVIQODatabase("reviews");

    window.dispatchEvent(
        new CustomEvent("database:update", {
            detail: {
                collection: "reviews"
            }
        })
    );
}


async function syncTELVIQOReviewsFromSupabase() {
    const client = getSupabaseQuoteRequestsClient();

    if (!client) {
        console.error("TELVIQO review load failed: Supabase client is not configured.");
        return;
    }

    const tableName = getSupabaseReviewsTable();

    const sessionReady = await ensureSupabaseSession(client);

    if (!sessionReady) {
        console.warn("TELVIQO review load skipped because Supabase auth is unavailable.");
        return;
    }

    const { data, error } = await client
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("TELVIQO review load failed for table " + tableName + ":", error);
        return;
    }

    mergeTELVIQOReviewsFromSupabase(data || []);
}


function getTELVIQOReviews(
    includeHidden = false
) {
    if (!TELVIQO_REVIEW_SYNC_IN_PROGRESS && getSupabaseQuoteRequestsClient()) {
        TELVIQO_REVIEW_SYNC_IN_PROGRESS = true;

        syncTELVIQOReviewsFromSupabase().finally(function () {
            TELVIQO_REVIEW_SYNC_IN_PROGRESS = false;
        });
    }

    const reviews = TELVIQO_DATABASE.reviews;

    const filteredReviews =
        includeHidden
            ? reviews
            : reviews.filter(function (review) {
                return review.visible !== false;
            });

    return telviqoClone(filteredReviews);
}


async function createTELVIQOReview(data) {
    if (!data || typeof data !== "object") {
        return null;
    }

    const name = telviqoSafeString(data.name).trim() || "Anonymous";
    const message = telviqoSafeString(data.message).trim();
    const rating = Math.max(
        1,
        Math.min(
            5,
            telviqoSafeNumber(data.rating, 5)
        )
    );


    const review = {
        id: telviqoCreateID("review"),
        name: name,
        rating: rating,
        message: message,
        verified: telviqoSafeBoolean(data.verified, false),
        visible: telviqoSafeBoolean(data.visible, true),
        createdAt: telviqoCurrentDate(),
        updatedAt: telviqoCurrentDate()
    };

    const client = getSupabaseQuoteRequestsClient();
    let savedReview = null;

    if (client) {
        const payload = {
            id: review.id,
            customer_name: review.name,
            rating: review.rating,
            review_text: review.message || null,
            verified: review.verified,
            hidden: !review.visible,
            created_at: review.createdAt,
            updated_at: review.updatedAt
        };

        const tableName = getSupabaseReviewsTable();

        const sessionReady = await ensureSupabaseSession(client);

        if (!sessionReady) {
            console.warn("TELVIQO review insert skipped because Supabase auth is unavailable.");
            return null;
        }

        const { data: insertedRow, error } = await client
            .from(tableName)
            .insert(payload)
            .select("*")
            .single();

        if (error) {
            console.error("TELVIQO review insert failed for table " + tableName + ":", error, payload);
            return null;
        }

        savedReview = normalizeTELVIQOReview(insertedRow || payload);
    } else {
        console.warn("TELVIQO review insert skipped because Supabase is unavailable.");
        return null;
    }

    if (!savedReview) {
        savedReview = normalizeTELVIQOReview(review);
    }

    if (!savedReview) {
        return null;
    }

    TELVIQO_DATABASE.reviews.unshift(savedReview);

    addTELVIQOActivity("New customer review received.");

    saveTELVIQODatabase("reviews");

    window.dispatchEvent(
        new CustomEvent("database:update", {
            detail: {
                collection: "reviews"
            }
        })
    );

    return telviqoClone(savedReview);
}


function updateTELVIQOReview(
    id,
    updates
) {
    const index =
        TELVIQO_DATABASE
            .reviews
            .findIndex(
                function (review) {
                    return review.id === id;
                }
            );

    if (index === -1) {
        return false;
    }

    TELVIQO_DATABASE
        .reviews[index] = {

            ...TELVIQO_DATABASE
                .reviews[index],

            ...updates,

            id:
                TELVIQO_DATABASE
                    .reviews[index]
                    .id,

            updatedAt:
                telviqoCurrentDate()
        };

    addTELVIQOActivity(
        "Customer review updated."
    );

    return saveTELVIQODatabase(
        "reviews"
    );
}


async function deleteTELVIQOReview(id) {
    const client = getSupabaseQuoteRequestsClient();

    if (client) {
        const tableName = getSupabaseReviewsTable();

        const { error } = await client
            .from(tableName)
            .delete()
            .eq("id", id);

        if (error) {
            console.error("TELVIQO review delete failed:", error);
            return false;
        }
    }

    TELVIQO_DATABASE.reviews =
        TELVIQO_DATABASE.reviews.filter(function (review) {
            return review.id !== id;
        });

    addTELVIQOActivity(
        "Customer review deleted."
    );

    saveTELVIQODatabase("reviews");

    return true;
}

/* ============================================================
   QUOTE REQUESTS
   ============================================================ */

let TELVIQO_REQUEST_SYNC_IN_PROGRESS = false;


function getSupabaseQuoteRequestsTable() {
    return (
        window.TELVIQO_QUOTE_REQUESTS_TABLE ||
        "quote_requests"
    );
}


function getSupabaseQuoteRequestsClient() {
    if (
        typeof window === "undefined" ||
        !window.TELVIQO_SUPABASE_URL ||
        !window.TELVIQO_SUPABASE_ANON_KEY
    ) {
        return null;
    }

    if (!window.supabase || typeof window.supabase.createClient !== "function") {
        return null;
    }

    if (!window.TELVIQO_SUPABASE_CLIENT) {
        window.TELVIQO_SUPABASE_CLIENT =
            window.supabase.createClient(
                window.TELVIQO_SUPABASE_URL,
                window.TELVIQO_SUPABASE_ANON_KEY,
                {
                    auth: {
                        persistSession: false,
                        autoRefreshToken: false
                    }
                }
            );
    }

    return window.TELVIQO_SUPABASE_CLIENT;
}


async function ensureSupabaseSession(client) {
    if (!client) {
        return false;
    }

    try {
        const { data: { session } = {}, error: sessionError } = await client.auth.getSession();

        if (sessionError) {
            console.warn("TELVIQO Supabase session lookup failed:", sessionError);
        }

        if (session) {
            return true;
        }

        const { error: signInError } = await client.auth.signInAnonymously();

        if (signInError) {
            console.warn("TELVIQO Supabase anonymous sign-in failed:", signInError);
            return false;
        }

        return true;
    } catch (error) {
        console.warn("TELVIQO Supabase auth setup failed:", error);
        return false;
    }
}


function normalizeTELVIQORequest(record) {
    if (!record || typeof record !== "object") {
        return null;
    }

    const requestNumber = telviqoSafeString(
        record.request_number ||
        record.requestNumber ||
        record.request_id ||
        record.requestId ||
        record.id
    ).trim();

    return {
        id: telviqoSafeString(
            record.id ||
            record.request_id ||
            record.requestId
        ).trim() ||
            telviqoCreateRequestID(),

        requestNumber: requestNumber || telviqoCreateRequestID(),

        customerName:
            telviqoSafeString(
                record.customer_name ||
                record.customerName
            ).trim(),

        email:
            record.email === null ||
            record.email === undefined
                ? null
                : telviqoSafeString(
                    record.email
                ).trim() || null,

        phone:
            telviqoSafeString(
                record.phone ||
                record.phone_number ||
                record.phoneNumber
            ).trim(),

        deviceType:
            telviqoSafeString(
                record.device_type ||
                record.deviceType
            ).trim(),

        deviceModel:
            telviqoSafeString(
                record.device_model ||
                record.deviceModel
            ).trim(),

        service:
            telviqoSafeString(
                record.service
            ).trim(),

        preferredLanguage:
            telviqoSafeString(
                record.preferred_language ||
                record.preferredLanguage
            ).trim(),

        problemDescription:
            telviqoSafeString(
                record.problem_description ||
                record.problemDescription
            ).trim(),

        authorizedDevice:
            telviqoSafeBoolean(
                record.authorized_device ||
                record.authorizedDevice,
                false
            ),

        status:
            telviqoSafeString(
                record.status
            ).trim() || "new",

        adminNotes:
            telviqoSafeString(
                record.admin_notes ||
                record.adminNotes
            ).trim(),

        createdAt:
            record.created_at ||
            record.createdAt ||
            telviqoCurrentDate(),

        updatedAt:
            record.updated_at ||
            record.updatedAt ||
            telviqoCurrentDate()
    };
}


function mergeTELVIQORequestsFromSupabase(rows) {
    const normalized =
        (rows || [])
            .map(normalizeTELVIQORequest)
            .filter(Boolean);

    const merged =
        [...TELVIQO_DATABASE.requests];

    const byID = new Map();

    merged.forEach(
        function (request) {
            byID.set(
                request.id,
                request
            );
        }
    );

    normalized.forEach(
        function (request) {
            byID.set(
                request.id,
                request
            );
        }
    );

    TELVIQO_DATABASE.requests =
        Array.from(byID.values()).sort(
            function (a, b) {
                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );
            }
        );

    saveTELVIQODatabase(
        "requests"
    );

    window.dispatchEvent(
        new CustomEvent(
            "database:update",
            {
                detail: {
                    collection: "requests"
                }
            }
        )
    );
}


async function syncTELVIQORequestsFromSupabase() {
    const client =
        getSupabaseQuoteRequestsClient();

    if (!client) {
        console.error(
            "TELVIQO quote request load failed: Supabase client is not configured."
        );

        return;
    }

    const tableName =
        getSupabaseQuoteRequestsTable();

    const sessionReady = await ensureSupabaseSession(client);

    if (!sessionReady) {
        console.warn("TELVIQO quote request load skipped because Supabase auth is unavailable.");
        return;
    }

    const { data, error } =
        await client
            .from(tableName)
            .select("*")
            .order("created_at", { ascending: false });

    if (error) {
        console.error(
            "TELVIQO quote request load failed for table " +
            tableName + ":",
            error
        );

        return;
    }

    mergeTELVIQORequestsFromSupabase(
        data || []
    );
}


function getTELVIQORequests() {
    if (
        !TELVIQO_REQUEST_SYNC_IN_PROGRESS &&
        getSupabaseQuoteRequestsClient()
    ) {
        TELVIQO_REQUEST_SYNC_IN_PROGRESS =
            true;

        syncTELVIQORequestsFromSupabase()
            .finally(
                function () {
                    TELVIQO_REQUEST_SYNC_IN_PROGRESS =
                        false;
                }
            );
    }

    const requests =
        [...TELVIQO_DATABASE.requests]
            .sort(
                function (a, b) {
                    return (
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                    );
                }
            );

    return telviqoClone(
        requests
    );
}


function getTELVIQORequest(id) {
    const request =
        TELVIQO_DATABASE
            .requests
            .find(
                function (item) {
                    return item.id === id;
                }
            );

    if (!request) {
        return null;
    }

    return telviqoClone(
        request
    );
}


async function createTELVIQORequest(data) {
    if (
        !data ||
        typeof data !== "object"
    ) {
        return null;
    }

    const customerName =
        telviqoSafeString(
            data.customerName
        ).trim();

    const deviceType =
        telviqoSafeString(
            data.deviceType
        ).trim();

    const deviceModel =
        telviqoSafeString(
            data.deviceModel
        ).trim();

    const problemDescription =
        telviqoSafeString(
            data.problemDescription
        ).trim();

    if (
        !customerName ||
        !deviceType ||
        !deviceModel ||
        !problemDescription
    ) {
        return null;
    }

    const requestNumber = telviqoCreateRequestID();

    const request = {

        id: requestNumber,

        requestNumber: requestNumber,

        customerName:
            customerName,

        email:
            telviqoSafeString(
                data.email
            ).trim(),

        phone:
            telviqoSafeString(
                data.phone
            ).trim(),

        deviceType:
            deviceType,

        deviceModel:
            deviceModel,

        service:
            telviqoSafeString(
                data.service
            ).trim(),

        preferredLanguage:
            telviqoSafeString(
                data.preferredLanguage
            ).trim(),

        problemDescription:
            problemDescription,

        authorizedDevice:
            telviqoSafeBoolean(
                data.authorizedDevice,
                false
            ),

        status:
            "new",

        adminNotes:
            "",

        createdAt:
            telviqoCurrentDate(),

        updatedAt:
            telviqoCurrentDate()
    };

    const client =
        getSupabaseQuoteRequestsClient();

    let savedRequest = null;

    if (client) {
        const payload = {
            id: request.id,
            request_number: request.requestNumber,
            customer_name: request.customerName,
            phone_number: request.phone,
            device_type: request.deviceType,
            device_model: request.deviceModel,
            service: request.service,
            problem_description: request.problemDescription,
            status: request.status,
            created_at: request.createdAt,
            updated_at: request.updatedAt
        };

        const tableName =
            getSupabaseQuoteRequestsTable();

        const sessionReady = await ensureSupabaseSession(client);

        if (!sessionReady) {
            console.warn("TELVIQO quote request insert skipped because Supabase auth is unavailable.");
            return null;
        }

        const { data, error } =
            await client
                .from(tableName)
                .insert(payload)
                .select("*")
                .single();

        if (error) {
            console.error(
                "TELVIQO quote insert failed for table " +
                tableName + ":",
                error,
                payload
            );
            return null;
        }

        savedRequest =
            normalizeTELVIQORequest(
                data || payload
            );
    } else {
        console.warn(
            "TELVIQO quote request insert skipped because Supabase is unavailable."
        );
        return null;
    }

    if (!savedRequest) {
        savedRequest = normalizeTELVIQORequest(request);
    }

    if (!savedRequest) {
        return null;
    }

    TELVIQO_DATABASE
        .requests
        .unshift(
            savedRequest
        );

    addTELVIQOActivity(
        "New quote request " +
        savedRequest.id +
        " received."
    );

    saveTELVIQODatabase(
        "requests"
    );

    window.dispatchEvent(
        new CustomEvent(
            "database:update",
            {
                detail: {
                    collection: "requests"
                }
            }
        )
    );

    return telviqoClone(
        savedRequest
    );
}


async function updateTELVIQORequest(id, updates) {
    const index = TELVIQO_DATABASE.requests.findIndex(function (request) {
        return request.id === id;
    });

    if (index === -1) {
        return false;
    }

    const client = getSupabaseQuoteRequestsClient();

    if (!client) {
        console.error("TELVIQO quote update failed: Supabase is unavailable.");
        return false;
    }

    const sessionReady = await ensureSupabaseSession(client);

    if (!sessionReady) {
        console.error("TELVIQO quote update failed: Supabase auth is unavailable.");
        return false;
    }

    const updatedAt = telviqoCurrentDate();

    const payload = {
        updated_at: updatedAt
    };

    if (Object.prototype.hasOwnProperty.call(updates, "status")) {
        payload.status = updates.status;
    }

    if (Object.prototype.hasOwnProperty.call(updates, "adminNotes")) {
        payload.admin_notes = updates.adminNotes;
    }

    const { data, error } = await client
        .from(getSupabaseQuoteRequestsTable())
        .update(payload)
        .eq("id", id)
        .select("*")
        .single();

    if (error) {
        console.error("TELVIQO quote update failed:", error, payload);
        return false;
    }

    const savedRequest = normalizeTELVIQORequest(data);

    if (!savedRequest) {
        console.error("TELVIQO quote update failed: no updated request returned.");
        return false;
    }

    TELVIQO_DATABASE.requests[index] = savedRequest;

    addTELVIQOActivity(
        "Quote request " + id + " updated."
    );

    saveTELVIQODatabase("requests");

    window.dispatchEvent(
        new CustomEvent("database:update", {
            detail: {
                collection: "requests"
            }
        })
    );

    return true;
}


async function deleteTELVIQORequest(id) {
    const client = getSupabaseQuoteRequestsClient();

    if (!client) {
        console.error("TELVIQO quote delete failed: Supabase is unavailable.");
        return false;
    }

    const sessionReady = await ensureSupabaseSession(client);

    if (!sessionReady) {
        console.error("TELVIQO quote delete failed: Supabase auth is unavailable.");
        return false;
    }

    const { error } = await client
        .from(getSupabaseQuoteRequestsTable())
        .delete()
        .eq("id", id);

    if (error) {
        console.error("TELVIQO quote delete failed:", error);
        return false;
    }

    TELVIQO_DATABASE.requests =
        TELVIQO_DATABASE.requests.filter(function (request) {
            return request.id !== id;
        });

    addTELVIQOActivity(
        "Quote request " + id + " deleted."
    );

    saveTELVIQODatabase("requests");

    window.dispatchEvent(
        new CustomEvent("database:update", {
            detail: {
                collection: "requests"
            }
        })
    );

    return true;
}


/* ============================================================
   EXPORT DATABASE
   ============================================================ */

function exportTELVIQODatabase() {
    return telviqoClone(
        TELVIQO_DATABASE
    );
}


/* ============================================================
   DOWNLOAD BACKUP
   ============================================================ */

function downloadTELVIQOBackup() {
    const database =
        exportTELVIQODatabase();

    const json =
        JSON.stringify(
            database,
            null,
            4
        );

    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const link =
        document.createElement(
            "a"
        );

    const date =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            );

    link.href =
        url;

    link.download =
        "TELVIQO-backup-" +
        date +
        ".json";

    document.body.appendChild(
        link
    );

    link.click();

    link.remove();

    window.setTimeout(
        function () {
            URL.revokeObjectURL(
                url
            );
        },
        1000
    );
}


/* ============================================================
   IMPORT DATABASE
   ============================================================ */

function importTELVIQODatabase(data) {
    if (
        !data ||
        typeof data !== "object"
    ) {
        throw new Error(
            "Invalid TELVIQO database."
        );
    }

    const normalized =
        normalizeTELVIQODatabase(
            data
        );

    TELVIQO_DATABASE =
        normalized;

    addTELVIQOActivity(
        "TELVIQO backup imported."
    );

    saveTELVIQODatabase(
        "database"
    );

    return true;
}


/* ============================================================
   RESET WEBSITE CONTENT
   Projects, reviews and requests are preserved
   ============================================================ */

function resetTELVIQOWebsiteContent() {
    TELVIQO_DATABASE.content =
        telviqoClone(
            TELVIQO_DEFAULT_DATABASE
                .content
        );

    TELVIQO_DATABASE.settings =
        telviqoClone(
            TELVIQO_DEFAULT_DATABASE
                .settings
        );

    TELVIQO_DATABASE.socialLinks =
        telviqoClone(
            TELVIQO_DEFAULT_DATABASE
                .socialLinks
        );

    TELVIQO_DATABASE.languages =
        telviqoClone(
            TELVIQO_DEFAULT_DATABASE
                .languages
        );

    TELVIQO_DATABASE.services =
        telviqoClone(
            TELVIQO_DEFAULT_DATABASE
                .services
        );

    addTELVIQOActivity(
        "Website content reset to TELVIQO defaults."
    );

    return saveTELVIQODatabase(
        "database"
    );
}


/* ============================================================
   COMPLETE DATABASE RESET
   Developer API only
   ============================================================ */

function resetEntireTELVIQODatabase() {
    TELVIQO_DATABASE =
        telviqoClone(
            TELVIQO_DEFAULT_DATABASE
        );

    return saveTELVIQODatabase(
        "database"
    );
}


/* ============================================================
   DATABASE INFORMATION
   ============================================================ */

function getTELVIQODatabaseInformation() {
    return {

        version:
            TELVIQO_DATABASE.version,

        projects:
            TELVIQO_DATABASE
                .projects
                .length,

        reviews:
            TELVIQO_DATABASE
                .reviews
                .length,

        requests:
            TELVIQO_DATABASE
                .requests
                .length,

        services:
            TELVIQO_DATABASE
                .services
                .length,

        languages:
            TELVIQO_DATABASE
                .languages
                .length,

        storageKey:
            TELVIQO_DATABASE_CONFIG
                .storageKey
    };
}


/* ============================================================
   PUBLIC DATABASE API
   ============================================================ */

window.TELVIQO_DB = {

    /* CONTENT */

    getContent:
        getTELVIQOContent,

    updateContent:
        updateTELVIQOContent,


    /* SETTINGS */

    getSettings:
        getTELVIQOSettings,

    updateSettings:
        updateTELVIQOSettings,

    getBusinessSettings:
        getTELVIQOSettings,

    updateBusinessSettings:
        updateTELVIQOSettings,

    getSiteContent:
        getTELVIQOContent,

    updateSiteContent:
        updateTELVIQOContent,

    getMaintenanceSettings:
        getTELVIQOMaintenanceSettings,

    updateMaintenanceSettings:
        updateTELVIQOMaintenanceSettings,

    getLanguageSettings:
        getTELVIQOLanguageSettings,

    updateLanguageSettings:
        updateTELVIQOLanguageSettings,


    /* SOCIAL */

    getSocialLinks:
        getTELVIQOSocialLinks,

    updateSocialLinks:
        updateTELVIQOSocialLinks,


    /* LANGUAGES */

    getLanguages:
        getTELVIQOLanguages,

    updateLanguages:
        updateTELVIQOLanguages,


    /* SERVICES */

    getServices:
        getTELVIQOServices,

    getService:
        getTELVIQOService,

    createService:
        createTELVIQOService,

    updateService:
        updateTELVIQOService,

    deleteService:
        deleteTELVIQOService,


    /* PROJECTS */

    getProjects:
        getTELVIQOProjects,

    getProject:
        getTELVIQOProject,

    createProject:
        createTELVIQOProject,

    updateProject:
        updateTELVIQOProject,

    deleteProject:
        deleteTELVIQOProject,


    /* REVIEWS */

    getReviews:
        getTELVIQOReviews,

    createReview:
        createTELVIQOReview,

    updateReview:
        updateTELVIQOReview,

    deleteReview:
        deleteTELVIQOReview,


    /* REQUESTS */

    getRequests:
        getTELVIQORequests,

    getRequest:
        getTELVIQORequest,

    createRequest:
        createTELVIQORequest,

    updateRequest:
        updateTELVIQORequest,

    deleteRequest:
        deleteTELVIQORequest,


    /* ACTIVITY */

    getActivity:
        getTELVIQOActivity,


    /* BACKUP */

    exportDatabase:
        exportTELVIQODatabase,

    downloadBackup:
        downloadTELVIQOBackup,

    importDatabase:
        importTELVIQODatabase,


    /* RESET */

    resetWebsiteContent:
        resetTELVIQOWebsiteContent,

    resetEntireDatabase:
        resetEntireTELVIQODatabase,


    /* INFORMATION */

    getDatabaseInformation:
        getTELVIQODatabaseInformation
};


/* ============================================================
   DATABASE READY
   ============================================================ */

console.log(
    "%cTELVIQO DATABASE",
    [
        "font-size:20px",
        "font-weight:900",
        "color:#4d8dff"
    ].join(";")
);


console.log(
    "TELVIQO Database loaded.",
    getTELVIQODatabaseInformation()
);