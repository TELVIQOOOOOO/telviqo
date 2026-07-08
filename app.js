/* ============================================================
   TELVIQO WEBSITE APPLICATION
   Main public website controller
   ============================================================ */

"use strict";


/* ============================================================
   APPLICATION CONFIGURATION
   ============================================================ */

const TELVIQO_APP_CONFIG = {
    adminPage: "admin.html",
    loginPage: "login.html",

    selectors: {
        navigation: "[data-site-navigation]",
        mobileMenuButton: "[data-mobile-menu]",
        mobileMenu: "[data-mobile-navigation]",
        mobileMenuClose: "[data-mobile-menu-close]",
        servicesContainer: "#servicesList",
        projectsContainer: "#projectsList",
        reviewsContainer: "#reviewsList",
        quoteForm: "#quoteForm",
        reviewForm: "#reviewForm",
        cashAppButtons: "[data-cash-app]",
        adminButtons: "[data-admin-login]",
        toast: "#websiteToast"
    }
};


/* ============================================================
   APPLICATION STATE
   ============================================================ */

const TELVIQO_APP_STATE = {
    initialized: false,
    mobileMenuOpen: false,
    quoteSubmitting: false,
    reviewSubmitting: false,
    language: "en"
};


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const TELVIQO_TRANSLATIONS = {
    en: {
        nav: {
            about: "About",
            services: "Services",
            work: "My Work",
            reviews: "Reviews",
            contact: "Contact",
            quote: "Request a Quote",
            admin: "Admin",
            home: "Home",
            startRepair: "Start a Repair Request",
            homeLabel: "TELVIQO Home",
            mobileMenuOpen: "Open navigation",
            mobileMenuClose: "Close navigation",
            languagePicker: "Select website language"
        },
        mobileNav: {
            home: "Home",
            about: "About Me",
            services: "Services",
            work: "My Work",
            reviews: "Reviews",
            quote: "Request a Quote",
            contact: "Contact"
        },
        hero: {
            actionPrimary: "Request a Quote",
            actionSecondary: "View My Work",
            statusAccepting: "Accepting Requests",
            statusClosed: "Requests Temporarily Closed",
            location: "Antelope, California",
            statsDevices: "DEVICES WORKED ON",
            statsLanguages: "LANGUAGES",

            experience: "EXPERIENCE",
            founder: "FOUNDER",

            scroll: "SCROLL"
        },
        about: {
            profile: "FOUNDER PROFILE",
            age: "AGE",
            location: "LOCATION",
            current: "CURRENT",
            future: "FUTURE",
            goal: "MY GOAL",
            signature: "FOUNDER / OWNER — TELVIQO",
            homeBased: "Home-based"
        },
        experience: {
            phone: "PHONE REPAIR",
            tablet: "TABLET REPAIR",
            diagnostics: "DEVICE DIAGNOSTICS",
            technology: "TECHNOLOGY",
            telviqo: "TELVIQO"
        },
        reviews: {
            introLabel: "YOUR EXPERIENCE",
            introHeading: "Worked with TELVIQO?",
            introDescription: "Leave a review about your experience. Your feedback may appear publicly on the TELVIQO website."
        },
        review: {
            nameLabel: "NAME (OPTIONAL)",
            ratingLabel: "RATING",
            messageLabel: "YOUR REVIEW",
            submit: "Submit Review",
            placeholderName: "Your name",
            placeholderMessage: "Tell people about your experience...",
            ratingPlaceholder: "Choose a rating",
            rating5: "★★★★★ — Excellent",
            rating4: "★★★★ — Very Good",
            rating3: "★★★ — Good",
            rating2: "★★ — Fair",
            rating1: "★ — Poor"
        },
        quote: {
            customerName: "CUSTOMER NAME *",
            phone: "PHONE NUMBER",
            deviceType: "DEVICE TYPE *",
            deviceModel: "DEVICE MODEL *",
            service: "SERVICE",
            problem: "PROBLEM DESCRIPTION *",
            authorization: "I confirm that I own this device or I am authorized by the owner to request service for it.",
            submit: "Send Quote Request",
            privacy: "Do not submit passwords, passcodes, Apple ID passwords or other private account credentials in this form.",
            deviceTypePlaceholder: "Choose device type",
            servicePlaceholder: "Choose a service",
            customerNamePlaceholder: "Your full name",
            phonePlaceholder: "Phone number",
            deviceModelPlaceholder: "Example: iPhone 13",
            problemPlaceholder: "Describe what is wrong with your device...",
            deviceTypePhone: "Phone",
            deviceTypeTablet: "Tablet",
            deviceTypeSmartwatch: "Smartwatch",
            deviceTypeLaptop: "Laptop",
            deviceTypeOther: "Other",
            serviceDeviceRepair: "Device Repair",
            serviceScreenReplacement: "Screen Replacement",
            serviceBatteryService: "Battery Service",
            serviceDeviceDiagnostics: "Device Diagnostics",
            serviceDeviceSetup: "Device Setup",
            serviceOther: "Other",
            header: "TELVIQO REQUEST",
            subheader: "Device Information",
            step1: "Send your device information.",
            step2: "I review the problem.",
            step3: "I contact you about the request.",
            serviceAreaLabel: "SERVICE AREA",
            serviceAreaLocation: "Antelope, California",
            serviceAreaDescription: "TELVIQO currently operates as a home-based independent service.",
            successTitle: "REQUEST RECEIVED",
            successBody: "Your TELVIQO request has been saved. Your request number is:",
            successFooter: "I will review your device information and contact you using the information you provided."
        },
        payment: {
            label: "PAYMENT",
            title: "Pay with Cash App",
            description: "Cash App payment is available for approved TELVIQO services. Confirm the service and payment amount before sending payment.",
            warningTitle: "IMPORTANT",
            warningBody: "Please confirm your repair and payment amount with TELVIQO before sending money.",
            methodLabel: "PAYMENT METHOD",
            methodTitle: "Cash App",
            methodDescription: "Securely continue to the TELVIQO Cash App payment link.",
            button: "Pay with Cash App",
            note: "Only send payment after your service and amount have been confirmed."
        },
        contact: {
            heading: "Follow the TELVIQO journey.",
            description: "Follow my technology and repair work or contact me about your device.",
            social: "SOCIAL",
            contact: "CONTACT",
            email: "Email",
            tikTok: "TikTok",
            instagram: "Instagram"
        },
        footer: {
            website: "Website",
            contact: "Contact",
            telviqo: "TELVIQO",
            admin: "Admin Panel",
            copyright: "All rights reserved.",
            subtext: "Independent home-based device repair in Antelope, California."
        },
        maintenance: {
            title: "TELVIQO is currently undergoing maintenance.",
            body: "We apologize for the wait. We are improving the website and will be back online soon.",
            thanks: "Thank you for your patience."
        },
        notifications: {
            reviewSuccess: "Thank you! Your review was submitted.",
            reviewError: "Could not submit your review. Please try again.",
            quoteSuccess: "Your TELVIQO quote request was sent.",
            quoteError: "Could not send your request. Please try again.",
            reviewLength: "Please write a little more about your experience.",
            reviewRating: "Please choose a rating.",
            quoteName: "Please enter your name.",
            quoteDevice: "Tell me what device you have.",
            quoteProblem: "Please describe the device problem.",
            quoteAuthorization: "Please confirm that you own or are authorized to repair this device.",
            requestClosed: "TELVIQO is not accepting new requests right now.",
            cashAppUnavailable: "Cash App payment link is not available yet.",
            cashAppOpening: "Opening Cash App payment..."
        }
    },
    ru: {
        nav: {
            about: "О нас",
            services: "Услуги",
            work: "Мои работы",
            reviews: "Отзывы",
            contact: "Контакты",
            quote: "Запросить цену",
            admin: "Админ",
            home: "Главная",
            startRepair: "Начать запрос"
        },
        mobileNav: {
            home: "Главная",
            about: "Обо мне",
            services: "Услуги",
            work: "Мои работы",
            reviews: "Отзывы",
            quote: "Запросить цену",
            contact: "Контакты"
        },
        hero: {
            actionPrimary: "Запросить цену",
            actionSecondary: "Посмотреть работы",
            statusAccepting: "Принимаю запросы",
            statusClosed: "Запросы временно закрыты",
            location: "Антелоуп, Калифорния",
            statsDevices: "УСТРОЙСТВ В РАБОТЕ",
            statsLanguages: "ЯЗЫКИ",

            experience: "ОПЫТ",
            founder: "ОСНОВАТЕЛЬ",

            scroll: "ПРОКРУТКА"
        },
        about: {
            profile: "ПРОФИЛЬ ОСНОВАТЕЛЯ",
            age: "ВОЗРАСТ",
            location: "МЕСТОПОЛОЖЕНИЕ",
            current: "СЕЙЧАС",
            future: "БУДУЩЕЕ",
            goal: "МОЯ ЦЕЛЬ",
            signature: "ОСНОВАТЕЛЬ / ВЛАДЕЛЕЦ — TELVIQO",
            homeBased: "Домашний бизнес"
        },
        experience: {
            phone: "РЕМОНТ ТЕЛЕФОНОВ",
            tablet: "РЕМОНТ ПЛАНШЕТОВ",
            diagnostics: "ДИАГНОСТИКА УСТРОЙСТВ",
            technology: "ТЕХНОЛОГИИ",
            telviqo: "TELVIQO"
        },
        reviews: {
            introLabel: "ВАШ ОПЫТ",
            introHeading: "Работали с TELVIQO?",
            introDescription: "Оставьте отзыв о своём опыте. Ваш отзыв может появиться на сайте TELVIQO."
        },
        review: {
            nameLabel: "ИМЯ (НЕОБЯЗАТЕЛЬНО)",
            ratingLabel: "ОЦЕНКА",
            messageLabel: "ВАШ ОТЗЫВ",
            submit: "Отправить отзыв",
            placeholderName: "Ваше имя",
            placeholderMessage: "Расскажите о своём опыте...",
            ratingPlaceholder: "Выберите оценку",
            rating5: "★★★★★ — Отлично",
            rating4: "★★★★ — Очень хорошо",
            rating3: "★★★ — Хорошо",
            rating2: "★★ — Нормально",
            rating1: "★ — Плохо"
        },
        quote: {
            customerName: "ИМЯ КЛИЕНТА *",
            phone: "НОМЕР ТЕЛЕФОНА",
            deviceType: "ТИП УСТРОЙСТВА *",
            deviceModel: "МОДЕЛЬ УСТРОЙСТВА *",
            service: "УСЛУГА",
            problem: "ОПИСАНИЕ ПРОБЛЕМЫ *",
            authorization: "Подтверждаю, что являюсь владельцем этого устройства или уполномочен владельцем на запрос услуги.",
            submit: "Отправить запрос",
            privacy: "Не отправляйте пароли, коды доступа, пароли Apple ID или другие личные данные.",
            deviceTypePlaceholder: "Выберите тип устройства",
            servicePlaceholder: "Выберите услугу",
            customerNamePlaceholder: "Ваше полное имя",
            phonePlaceholder: "Номер телефона",
            deviceModelPlaceholder: "Например: iPhone 13",
            problemPlaceholder: "Опишите проблему с устройством...",
            deviceTypePhone: "Телефон",
            deviceTypeTablet: "Планшет",
            deviceTypeSmartwatch: "Смарт-часы",
            deviceTypeLaptop: "Ноутбук",
            deviceTypeOther: "Другое",
            serviceDeviceRepair: "Ремонт устройства",
            serviceScreenReplacement: "Замена экрана",
            serviceBatteryService: "Замена батареи",
            serviceDeviceDiagnostics: "Диагностика устройства",
            serviceDeviceSetup: "Настройка устройства",
            serviceOther: "Другое",
            header: "ЗАПРОС TELVIQO",
            subheader: "Информация об устройстве",
            step1: "Отправьте информацию об устройстве.",
            step2: "Я проверяю проблему.",
            step3: "Я свяжусь с вами по запросу.",
            successTitle: "ЗАПРОС ПОЛУЧЕН",
            successBody: "Ваш запрос TELVIQO сохранён. Ваш номер запроса:",
            successFooter: "Я рассмотрю информацию об устройстве и свяжусь с вами, используя указанные данные."
        },
        payment: {
            label: "ОПЛАТА",
            title: "Оплатить через Cash App",
            description: "Оплата через Cash App доступна для одобренных услуг TELVIQO. Подтвердите услугу и сумму перед оплатой.",
            warningTitle: "ВАЖНО",
            warningBody: "Пожалуйста, подтвердите ремонт и сумму оплаты с TELVIQO перед отправкой денег.",
            methodLabel: "СПОСОБ ОПЛАТЫ",
            methodTitle: "Cash App",
            methodDescription: "Перейдите по ссылке Cash App TELVIQO.",
            button: "Оплатить через Cash App",
            note: "Отправляйте оплату только после подтверждения услуги и суммы."
        },
        contact: {
            heading: "Следите за TELVIQO.",
            description: "Следите за моей работой и устройствами или свяжитесь со мной.",
            social: "СОЦСЕТИ",
            contact: "КОНТАКТ",
            email: "Email",
            tikTok: "TikTok",
            instagram: "Instagram"
        },
        footer: {
            website: "Сайт",
            contact: "Контакты",
            telviqo: "TELVIQO",
            admin: "Панель администратора",
            copyright: "Все права защищены.",
            subtext: "Независимый домашний ремонт устройств в Антелоуп, Калифорния."
        },
        maintenance: {
            title: "TELVIQO в настоящее время проходит техническое обслуживание.",
            body: "Приносим извинения за ожидание. Мы улучшаем сайт и скоро снова будем онлайн.",
            thanks: "Спасибо за ваше терпение."
        },
        notifications: {
            reviewSuccess: "Спасибо! Ваш отзыв отправлен.",
            reviewError: "Не удалось отправить отзыв. Попробуйте ещё раз.",
            quoteSuccess: "Ваш запрос в TELVIQO отправлен.",
            quoteError: "Не удалось отправить запрос. Попробуйте ещё раз.",
            reviewLength: "Пожалуйста, напишите чуть подробнее о своём опыте.",
            reviewRating: "Пожалуйста, выберите оценку.",
            quoteName: "Пожалуйста, введите ваше имя.",
            quoteDevice: "Расскажите, какое у вас устройство.",
            quoteProblem: "Пожалуйста, опишите проблему устройства.",
            quoteAuthorization: "Пожалуйста, подтвердите, что вы владелец устройства или уполномочены на ремонт."
        }
    },
    uk: {
        nav: {
            about: "Про мене",
            services: "Послуги",
            work: "Мої роботи",
            reviews: "Відгуки",
            contact: "Контакти",
            quote: "Запитати ціну",
            admin: "Адмін",
            home: "Головна",
            startRepair: "Розпочати запит"
        },
        mobileNav: {
            home: "Головна",
            about: "Про мене",
            services: "Послуги",
            work: "Мої роботи",
            reviews: "Відгуки",
            quote: "Запитати ціну",
            contact: "Контакти"
        },
        hero: {
            actionPrimary: "Запитати ціну",
            actionSecondary: "Подивитися роботи",
            statusAccepting: "Приймаю запити",
            statusClosed: "Запити тимчасово закриті",
            location: "Антелоуп, Каліфорнія",
            statsDevices: "ПРИСТРОЇВ У РОБОТІ",
            statsLanguages: "МОВИ",

            experience: "ДОСВІД",
            founder: "ЗАСНОВНИК",

            scroll: "ПРОКРУТКА"
        },
        about: {
            profile: "ПРОФІЛЬ ЗАСНОВНИКА",
            age: "ВІК",
            location: "МІСЦЕ",
            current: "ЗАРАЗ",
            future: "МАЙБУТНЄ",
            goal: "МОЯ МЕТА",
            signature: "ЗАСНОВНИК / ВЛАСНИК — TELVIQO",
            homeBased: "Домашній бізнес"
        },
        experience: {
            phone: "РЕМОНТ ТЕЛЕФОНІВ",
            tablet: "РЕМОНТ ПЛАНШЕТІВ",
            diagnostics: "ДІАГНОСТИКА ПРИСТРОЇВ",
            technology: "ТЕХНОЛОГІЇ",
            telviqo: "TELVIQO"
        },
        reviews: {
            introLabel: "ВАШ ДОСВІД",
            introHeading: "Працювали з TELVIQO?",
            introDescription: "Залиште відгук про свій досвід. Ваш відгук може з'явитися на сайті TELVIQO."
        },
        review: {
            nameLabel: "ІМ'Я (НЕОБОВ'ЯЗКОВО)",
            ratingLabel: "ОЦІНКА",
            messageLabel: "ВАШ ВІДГУК",
            submit: "Надіслати відгук",
            placeholderName: "Ваше ім'я",
            placeholderMessage: "Розкажіть про свій досвід...",
            ratingPlaceholder: "Оберіть оцінку",
            rating5: "★★★★★ — Відмінно",
            rating4: "★★★★ — Дуже добре",
            rating3: "★★★ — Добре",
            rating2: "★★ — Задовільно",
            rating1: "★ — Погано"
        },
        quote: {
            customerName: "ІМ'Я КЛІЄНТА *",
            phone: "НОМЕР ТЕЛЕФОНУ",
            deviceType: "ТИП ПРИСТРОЮ *",
            deviceModel: "МОДЕЛЬ ПРИСТРОЮ *",
            service: "ПОСЛУГА",
            problem: "ОПИС ПРОБЛЕМИ *",
            authorization: "Підтверджую, що я є власником цього пристрою або уповноважений власником для замовлення послуги.",
            submit: "Надіслати запит",
            privacy: "Не надсилайте паролі, коди доступу, паролі Apple ID або інші особисті дані.",
            deviceTypePlaceholder: "Оберіть тип пристрою",
            servicePlaceholder: "Оберіть послугу",
            customerNamePlaceholder: "Ваше повне ім'я",
            phonePlaceholder: "Номер телефону",
            deviceModelPlaceholder: "Наприклад: iPhone 13",
            problemPlaceholder: "Опишіть проблему з пристроєм...",
            deviceTypePhone: "Телефон",
            deviceTypeTablet: "Планшет",
            deviceTypeSmartwatch: "Смарт-годинник",
            deviceTypeLaptop: "Ноутбук",
            deviceTypeOther: "Інше",
            serviceDeviceRepair: "Ремонт пристрою",
            serviceScreenReplacement: "Заміна екрана",
            serviceBatteryService: "Заміна батареї",
            serviceDeviceDiagnostics: "Діагностика пристрою",
            serviceDeviceSetup: "Налаштування пристрою",
            serviceOther: "Інше",
            header: "ЗАПИТ TELVIQO",
            subheader: "Інформація про пристрій",
            step1: "Надішліть інформацію про пристрій.",
            step2: "Я перевіряю проблему.",
            step3: "Я зв'яжуся з вами щодо запиту.",
            successTitle: "ЗАПИТ ОТРИМАНО",
            successBody: "Ваш запит TELVIQO збережено. Ваш номер запиту:",
            successFooter: "Я розгляну інформацію про пристрій і зв'яжуся з вами, використовуючи вказані дані."
        },
        payment: {
            label: "ОПЛАТА",
            title: "Оплатити через Cash App",
            description: "Оплата через Cash App доступна для схвалених послуг TELVIQO. Підтвердьте послугу та суму перед оплатою.",
            warningTitle: "ВАЖЛИВО",
            warningBody: "Будь ласка, підтвердьте ремонт і суму оплати з TELVIQO перед надсиланням коштів.",
            methodLabel: "СПОСІБ ОПЛАТИ",
            methodTitle: "Cash App",
            methodDescription: "Перейдіть за посиланням Cash App TELVIQO.",
            button: "Оплатити через Cash App",
            note: "Надсилайте оплату лише після підтвердження послуги та суми."
        },
        contact: {
            heading: "Слідуйте за TELVIQO.",
            description: "Слідуйте за моєю роботою та пристроями або зв'яжіться зі мною.",
            social: "СОЦМЕРЕЖІ",
            contact: "КОНТАКТ",
            email: "Email",
            tikTok: "TikTok",
            instagram: "Instagram"
        },
        footer: {
            website: "Сайт",
            contact: "Контакти",
            telviqo: "TELVIQO",
            admin: "Панель адміністратора",
            copyright: "Усі права захищено.",
            subtext: "Незалежний домашній ремонт пристроїв в Антелоуп, Каліфорнія."
        },
        maintenance: {
            title: "TELVIQO зараз проходить технічне обслуговування.",
            body: "Перепрошуємо за очікування. Ми покращуємо сайт і незабаром знову будемо онлайн.",
            thanks: "Дякуємо за ваше терпіння."
        },
        notifications: {
            reviewSuccess: "Дякуємо! Ваш відгук надіслано.",
            reviewError: "Не вдалося надіслати відгук. Спробуйте ще раз.",
            quoteSuccess: "Ваш запит до TELVIQO надіслано.",
            quoteError: "Не вдалося надіслати запит. Спробуйте ще раз.",
            reviewLength: "Будь ласка, напишіть трохи більше про свій досвід.",
            reviewRating: "Будь ласка, оберіть оцінку.",
            quoteName: "Будь ласка, введіть ваше ім'я.",
            quoteDevice: "Розкажіть, який у вас пристрій.",
            quoteProblem: "Будь ласка, опишіть проблему пристрою.",
            quoteAuthorization: "Будь ласка, підтвердіть, що ви є власником пристрою або уповноважені на ремонт."
        }
    },
    ro: {
        nav: {
            about: "Despre",
            services: "Servicii",
            work: "Lucrările mele",
            reviews: "Recenzii",
            contact: "Contact",
            quote: "Cerere de ofertă",
            admin: "Admin",
            home: "Acasă",
            startRepair: "Începe o cerere"
        },
        mobileNav: {
            home: "Acasă",
            about: "Despre mine",
            services: "Servicii",
            work: "Lucrările mele",
            reviews: "Recenzii",
            quote: "Cerere de ofertă",
            contact: "Contact"
        },
        hero: {
            actionPrimary: "Cerere de ofertă",
            actionSecondary: "Vezi lucrările mele",
            statusAccepting: "Accept cereri",
            statusClosed: "Cererile sunt temporar închise",
            location: "Antelope, California",
            statsDevices: "APARATE LUCRATE",
            statsLanguages: "LIMBI",

            experience: "EXPERIENȚĂ",
            founder: "FONDATOR",

            scroll: "DERULARE"
        },
        about: {
            profile: "PROFILUL FONDATORULUI",
            age: "VÂRSTĂ",
            location: "LOCAȚIE",
            current: "ACTUAL",
            future: "VIITOR",
            goal: "SCOPUL MEU",
            signature: "FONDATOR / PROPRIETAR — TELVIQO",
            homeBased: "Afacere de acasă"
        },
        experience: {
            phone: "REPARAȚII TELEFOANE",
            tablet: "REPARAȚII TABLETE",
            diagnostics: "DIAGNOSTICE DISPOZITIVE",
            technology: "TEHNOLOGIE",
            telviqo: "TELVIQO"
        },
        reviews: {
            introLabel: "EXPERIENȚA TA",
            introHeading: "Ai lucrat cu TELVIQO?",
            introDescription: "Lasă o recenzie despre experiența ta. Feedback-ul tău poate apărea public pe site-ul TELVIQO."
        },
        review: {
            nameLabel: "NUME (OPȚIONAL)",
            ratingLabel: "NOTĂ",
            messageLabel: "RECENZIA TA",
            submit: "Trimite recenzia",
            placeholderName: "Numele tău",
            placeholderMessage: "Spune despre experiența ta...",
            ratingPlaceholder: "Alege o notă",
            rating5: "★★★★★ — Excelent",
            rating4: "★★★★ — Foarte bine",
            rating3: "★★★ — Bine",
            rating2: "★★ — Mediu",
            rating1: "★ — Slab"
        },
        quote: {
            customerName: "NUMELE CLIENTULUI *",
            phone: "NUMĂR DE TELEFON",
            deviceType: "TIPUL DISPOZITIVULUI *",
            deviceModel: "MODELUL DISPOZITIVULUI *",
            service: "SERVICIU",
            problem: "DESCRIEREA PROBLEMEI *",
            authorization: "Confirm că sunt proprietarul acestui dispozitiv sau sunt autorizat de proprietar pentru a solicita serviciul.",
            submit: "Trimite cererea",
            privacy: "Nu trimiteți parole, coduri, parole Apple ID sau alte date private.",
            deviceTypePlaceholder: "Alege tipul dispozitivului",
            servicePlaceholder: "Alege un serviciu",
            customerNamePlaceholder: "Numele tău complet",
            phonePlaceholder: "Număr de telefon",
            deviceModelPlaceholder: "Exemplu: iPhone 13",
            problemPlaceholder: "Descrie ce este în neregulă cu dispozitivul...",
            deviceTypePhone: "Telefon",
            deviceTypeTablet: "Tabletă",
            deviceTypeSmartwatch: "Smartwatch",
            deviceTypeLaptop: "Laptop",
            deviceTypeOther: "Altul",
            serviceDeviceRepair: "Reparare dispozitiv",
            serviceScreenReplacement: "Înlocuire ecran",
            serviceBatteryService: "Service baterie",
            serviceDeviceDiagnostics: "Diagnosticare dispozitiv",
            serviceDeviceSetup: "Configurare dispozitiv",
            serviceOther: "Altul",
            header: "CERERE TELVIQO",
            subheader: "Informații despre dispozitiv",
            step1: "Trimite informații despre dispozitiv.",
            step2: "Voi analiza problema.",
            step3: "Voi lua legătura cu tine despre cerere.",
            successTitle: "CERERE PRIMITĂ",
            successBody: "Cererea TELVIQO a fost salvată. Numărul cererii este:",
            successFooter: "Voi revizui informațiile dispozitivului și voi lua legătura cu tine folosind datele furnizate."
        },
        payment: {
            label: "PLATĂ",
            title: "Plătește cu Cash App",
            description: "Plata prin Cash App este disponibilă pentru serviciile aprobate TELVIQO. Confirmă serviciul și suma înainte de plată.",
            warningTitle: "IMPORTANT",
            warningBody: "Te rugăm să confirmi reparația și suma de plată cu TELVIQO înainte de a trimite banii.",
            methodLabel: "METODĂ DE PLATĂ",
            methodTitle: "Cash App",
            methodDescription: "Continuă în siguranță la link-ul Cash App TELVIQO.",
            button: "Plătește cu Cash App",
            note: "Trimite plata doar după ce serviciul și suma au fost confirmate."
        },
        contact: {
            heading: "Urmărește TELVIQO.",
            description: "Urmărește lucrările mele sau contactează-mă despre dispozitivul tău.",
            social: "SOCIAL",
            contact: "CONTACT",
            email: "Email",
            tikTok: "TikTok",
            instagram: "Instagram"
        },
        footer: {
            website: "Website",
            contact: "Contact",
            telviqo: "TELVIQO",
            admin: "Panou admin",
            copyright: "Toate drepturile rezervate.",
            subtext: "Reparare independentă de acasă în Antelope, California."
        },
        maintenance: {
            title: "TELVIQO este momentan în mentenanță.",
            body: "Ne cerem scuze pentru așteptare. Îmbunătățim site-ul și vom reveni online în curând.",
            thanks: "Vă mulțumim pentru răbdare."
        },
        notifications: {
            reviewSuccess: "Mulțumesc! Recenzia ta a fost trimisă.",
            reviewError: "Nu s-a putut trimite recenzia. Încearcă din nou.",
            quoteSuccess: "Cererea ta TELVIQO a fost trimisă.",
            quoteError: "Nu s-a putut trimite cererea. Încearcă din nou.",
            reviewLength: "Te rugăm să scrii puțin mai mult despre experiența ta.",
            reviewRating: "Te rugăm să alegi o notă.",
            quoteName: "Te rugăm să introduci numele tău.",
            quoteDevice: "Spune-mi ce dispozitiv ai.",
            quoteProblem: "Te rugăm să descrii problema dispozitivului.",
            quoteAuthorization: "Te rugăm să confirmi că ești proprietarul sau ești autorizat pentru service."
        }
    }
};


function getStoredWebsiteLanguage() {
    const stored = window.localStorage.getItem("telviqo_language");

    return stored && TELVIQO_TRANSLATIONS[stored]
        ? stored
        : "en";
}


function getCurrentWebsiteLanguage() {
    return TELVIQO_APP_STATE.language || getStoredWebsiteLanguage();
}


function setWebsiteLanguage(language) {
    const nextLanguage = TELVIQO_TRANSLATIONS[language]
        ? language
        : "en";

    TELVIQO_APP_STATE.language = nextLanguage;

    window.localStorage.setItem("telviqo_language", nextLanguage);

    if (window.TELVIQO_DB && typeof window.TELVIQO_DB.updateLanguageSettings === "function") {
        window.TELVIQO_DB.updateLanguageSettings({ currentLanguage: nextLanguage });
    }

    applyWebsiteTranslations();
}


function applyWebsiteTranslations() {
    const language = getCurrentWebsiteLanguage();
    const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;

    websiteGetAll("[data-i18n]").forEach(function (element) {
        const key = element.dataset.i18n;
        const nested = key.split(".");
        let value = dictionary;

        nested.forEach(function (part) {
            value = value?.[part];
        });

        if (value) {
            websiteText(element, value);
        }
    });

    websiteGetAll("[data-placeholder-i18n]").forEach(function (element) {
        const key = element.dataset.placeholderI18n;
        const nested = key.split(".");
        let value = dictionary;

        nested.forEach(function (part) {
            value = value?.[part];
        });

        if (value) {
            element.setAttribute("placeholder", value);
        }
    });

    const languagePicker = websiteGet("[data-language-picker]");

    if (languagePicker) {
        languagePicker.value = language;
    }

    const statusIndicator = websiteGet("[data-request-status]");

    if (statusIndicator) {
        const accepting = (window.TELVIQO_DB && window.TELVIQO_DB.getSettings)
            ? window.TELVIQO_DB.getSettings().acceptingRequests !== false
            : true;

        websiteText(statusIndicator, accepting
            ? dictionary.hero.statusAccepting
            : dictionary.hero.statusClosed);
    }

    websiteGetAll("[data-i18n-attr]").forEach(function (element) {
        const attr = element.dataset.i18nAttr;
        const key = element.dataset.i18nKey;
        const value = getDictionaryValue(dictionary, key);

        if (value) {
            element.setAttribute(attr, value);
        }
    });

    websiteGetAll("[data-content-translation]").forEach(function (element) {
        const key = element.dataset.contentTranslation;
        const value = getDictionaryValue(dictionary, key);

        if (value) {
            websiteText(element, value);
        }
    });

    websiteGetAll("[data-placeholder-translation]").forEach(function (element) {
        const key = element.dataset.placeholderTranslation;
        const value = getDictionaryValue(dictionary, key);

        if (value) {
            element.setAttribute("placeholder", value);
        }
    });

    const mobileNavLinks = websiteGetAll("[data-mobile-nav-i18n]");

    mobileNavLinks.forEach(function (element) {
        const key = element.dataset.mobileNavI18n;
        const value = getDictionaryValue(dictionary, key);

        if (value) {
            websiteText(element, value);
        }
    });
}

function getDictionaryValue(dictionary, key) {
    if (!key) {
        return null;
    }

    const nested = key.split(".");
    let value = dictionary;

    nested.forEach(function (part) {
        value = value?.[part];
    });

    return value || null;
}


function initializeLanguageSwitcher() {
    websiteGetAll("[data-language-picker]").forEach(function (select) {
        select.addEventListener("change", function () {
            setWebsiteLanguage(select.value);
        });
    });

    setWebsiteLanguage(getCurrentWebsiteLanguage());
}


function renderMaintenanceMode() {
    const database = getWebsiteDatabase();

    if (!database || typeof database.getMaintenanceSettings !== "function") {
        return false;
    }

    const maintenance = database.getMaintenanceSettings();

    if (!maintenance.enabled) {
        const overlay = websiteGet("#telviqoMaintenanceScreen");

        if (overlay) {
            overlay.remove();
        }

        document.body.classList.remove("maintenance-active");
        const mainContent = websiteGet("main");

        if (mainContent) {
            mainContent.style.display = "";
        }

        return false;
    }

    let overlay = websiteGet("#telviqoMaintenanceScreen");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "telviqoMaintenanceScreen";
        overlay.className = "maintenance-screen";
        document.body.appendChild(overlay);
    }

    const language = getCurrentWebsiteLanguage();
    const messages = maintenance.messages || {};
    const message = messages[language] || messages.en || "TELVIQO is currently undergoing maintenance.";

    const lines = message.split("\n");

    overlay.innerHTML = `
        <div class="maintenance-panel">
            <div class="maintenance-badge">TELVIQO</div>
            <h1>${websiteEscapeHTML(lines[0] || "TELVIQO")}</h1>
            <p>${websiteEscapeHTML(lines.slice(1, -1).join(" ") || "We are improving the website and will be back online soon.")}</p>
            <div class="maintenance-footer">${websiteEscapeHTML(lines[lines.length - 1] || "TELVIQO")}</div>
        </div>
    `;

    document.body.classList.add("maintenance-active");

    const mainContent = websiteGet("main");

    if (mainContent) {
        mainContent.style.display = "none";
    }

    return true;
}


/* ============================================================
   DOM HELPERS
   ============================================================ */

function websiteGet(selector) {
    return document.querySelector(selector);
}


function websiteGetAll(selector) {
    return Array.from(
        document.querySelectorAll(selector)
    );
}


function websiteText(element, value) {
    if (!element) {
        return;
    }

    element.textContent = value ?? "";
}


function websiteHTML(element, value) {
    if (!element) {
        return;
    }

    element.innerHTML = value ?? "";
}


function websiteEscapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ============================================================
   DATABASE ACCESS
   ============================================================ */

function getWebsiteDatabase() {
    if (!window.TELVIQO_DB) {
        console.error(
            "TELVIQO database is not loaded."
        );

        return null;
    }

    return window.TELVIQO_DB;
}


/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */

let websiteToastTimer = null;


function showWebsiteToast(
    message,
    type = "success"
) {
    let toast = websiteGet(
        TELVIQO_APP_CONFIG.selectors.toast
    );


    if (!toast) {
        toast = document.createElement("div");

        toast.id = "websiteToast";
        toast.className = "website-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        document.body.appendChild(toast);
    }


    toast.className =
        "website-toast " + type;


    websiteText(
        toast,
        message
    );


    window.requestAnimationFrame(
        function () {
            toast.classList.add("active");
        }
    );


    if (websiteToastTimer) {
        window.clearTimeout(
            websiteToastTimer
        );
    }


    websiteToastTimer =
        window.setTimeout(
            function () {
                toast.classList.remove(
                    "active"
                );
            },

            3500
        );
}


/* ============================================================
   CONTENT RENDERING
   ============================================================ */

function renderWebsiteContent() {
    const database =
        getWebsiteDatabase();


    if (!database) {
        return;
    }


    const content =
        database.getContent(getCurrentWebsiteLanguage());


    websiteGetAll(
        "[data-content]"
    ).forEach(
        function (element) {
            const key =
                element.dataset.content;


            if (
                Object.prototype.hasOwnProperty.call(
                    content,
                    key
                )
            ) {
                websiteText(
                    element,
                    content[key]
                );
            }
        }
    );
}


/* ============================================================
   WEBSITE SETTINGS
   ============================================================ */

function renderWebsiteSettings() {
    const database =
        getWebsiteDatabase();


    if (!database) {
        return;
    }


    const settings =
        database.getSettings();
    const maintenance =
        database.getMaintenanceSettings();


    websiteGetAll(
        "[data-setting]"
    ).forEach(
        function (element) {
            const key =
                element.dataset.setting;


            const value =
                settings[key];


            if (
                value !== undefined &&
                value !== null
            ) {
                websiteText(
                    element,
                    value
                );
            }
        }
    );


    renderRequestAvailability(
        settings
    );

    if (maintenance.enabled) {
        renderMaintenanceMode();
    }
}


/* ============================================================
   REQUEST AVAILABILITY
   ============================================================ */

function renderRequestAvailability(
    settings
) {
    const language = getCurrentWebsiteLanguage();
    const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;

    websiteGetAll(
        "[data-request-status]"
    ).forEach(
        function (element) {
            const accepting =
                settings.acceptingRequests !== false;


            element.classList.toggle(
                "active",
                accepting
            );


            element.classList.toggle(
                "closed",
                !accepting
            );


            websiteText(
                element,
                accepting
                    ? dictionary.hero.statusAccepting
                    : dictionary.hero.statusClosed
            );
        }
    );


    const submitButton =
        websiteGet(
            '#quoteForm button[type="submit"]'
        );


    if (submitButton) {
        const accepting =
            settings.acceptingRequests !== false;


        submitButton.disabled =
            !accepting;


        websiteText(
            submitButton,
            accepting
                ? dictionary.quote.submit
                : dictionary.notifications.requestClosed
        );
    }
}


/* ============================================================
   SOCIAL LINKS
   ============================================================ */

function renderSocialLinks() {
    const database =
        getWebsiteDatabase();


    if (!database) {
        return;
    }


    const links =
        database.getSocialLinks();


    renderSocialLink(
        "[data-social-tiktok]",
        links.tiktok
    );


    renderSocialLink(
        "[data-social-instagram]",
        links.instagram
    );


    renderEmailLinks(
        links.email
    );


    renderCashAppLinks(
        links.cashApp
    );
}


function renderSocialLink(
    selector,
    url
) {
    websiteGetAll(
        selector
    ).forEach(
        function (element) {
            if (!url) {
                element.style.display =
                    "none";


                return;
            }


            element.style.display =
                "";


            element.href =
                url;


            element.target =
                "_blank";


            element.rel =
                "noopener noreferrer";
        }
    );
}


/* ============================================================
   EMAIL LINKS
   ============================================================ */

function renderEmailLinks(email) {
    websiteGetAll(
        "[data-contact-email]"
    ).forEach(
        function (element) {
            if (!email) {
                element.style.display =
                    "none";


                return;
            }


            element.style.display =
                "";


            if (
                element.tagName ===
                "A"
            ) {
                element.href =
                    "mailto:" + email;
            }


            const showEmail =
                element.dataset
                    .showEmail !==
                undefined;


            if (showEmail) {
                websiteText(
                    element,
                    email
                );
            }
        }
    );
}


/* ============================================================
   CASH APP
   ============================================================ */

function renderCashAppLinks(
    cashAppURL
) {
    websiteGetAll(
        TELVIQO_APP_CONFIG
            .selectors
            .cashAppButtons
    ).forEach(
        function (button) {
            if (!cashAppURL) {
                button.classList.add(
                    "disabled"
                );


                button.setAttribute(
                    "aria-disabled",
                    "true"
                );


                if (
                    button.tagName ===
                    "A"
                ) {
                    button.removeAttribute(
                        "href"
                    );
                }


                return;
            }


            button.classList.remove(
                "disabled"
            );


            button.removeAttribute(
                "aria-disabled"
            );


            if (
                button.tagName ===
                "A"
            ) {
                button.href =
                    cashAppURL;


                button.target =
                    "_blank";


                button.rel =
                    "noopener noreferrer";
            }
        }
    );
}


/* ============================================================
   CASH APP BUTTON EVENTS
   ============================================================ */

function initializeCashAppButtons() {
    websiteGetAll(
        TELVIQO_APP_CONFIG
            .selectors
            .cashAppButtons
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",

                function (event) {
                    const database =
                        getWebsiteDatabase();


                    if (!database) {
                        return;
                    }


                    const links =
                        database.getSocialLinks();


                    if (!links.cashApp) {
                        event.preventDefault();


                        const language = getCurrentWebsiteLanguage();
                        const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;

                        showWebsiteToast(
                            dictionary.notifications.cashAppUnavailable,

                            "error"
                        );


                        return;
                    }


                    const language = getCurrentWebsiteLanguage();
                    const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;

                    showWebsiteToast(
                        dictionary.notifications.cashAppOpening
                    );
                }
            );
        }
    );
}


/* ============================================================
   SERVICES
   ============================================================ */

function renderServices() {
    const container =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .servicesContainer
        );


    if (!container) {
        return;
    }


    const database =
        getWebsiteDatabase();


    if (!database) {
        return;
    }


    const services =
        database.getServices();


    if (
        services.length === 0
    ) {
        websiteHTML(
            container,

            `
                <div class="website-empty-state">
                    <strong>
                        Services coming soon.
                    </strong>

                    <p>
                        TELVIQO services are being updated.
                    </p>
                </div>
            `
        );


        return;
    }


    websiteHTML(
        container,

        services
            .map(
                function (
                    service,
                    index
                ) {
                    return `
                        <article
                            class="service-card"
                            data-reveal
                        >
                            <div class="service-number">
                                ${String(
                                    index + 1
                                ).padStart(
                                    2,
                                    "0"
                                )}
                            </div>

                            <div class="service-card-content">
                                <h3>
                                    ${websiteEscapeHTML(
                                        service.title
                                    )}
                                </h3>

                                <p>
                                    ${websiteEscapeHTML(
                                        service.description
                                    )}
                                </p>
                            </div>

                            <button
                                class="service-request-button"
                                type="button"
                                data-service-request="${websiteEscapeHTML(
                                    service.title
                                )}"
                            >
                                ${websiteEscapeHTML(
                                    service.buttonText ||
                                    "Request a Quote"
                                )}

                                <span>
                                    →
                                </span>
                            </button>
                        </article>
                    `;
                }
            )
            .join("")
    );


    initializeServiceRequestButtons();


    observeRevealElements();
}


/* ============================================================
   SERVICE REQUEST BUTTONS
   ============================================================ */

function initializeServiceRequestButtons() {
    websiteGetAll(
        "[data-service-request]"
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",

                function () {
                    const service =
                        button.dataset
                            .serviceRequest;


                    const serviceField =
                        websiteGet(
                            '#quoteForm [name="service"]'
                        );


                    if (serviceField) {
                        serviceField.value =
                            service;
                    }


                    scrollToSection(
                        "quote"
                    );


                    window.setTimeout(
                        function () {
                            if (serviceField) {
                                serviceField.focus();
                            }
                        },

                        700
                    );
                }
            );
        }
    );
}


/* ============================================================
   PROJECTS
   ============================================================ */

function renderProjects() {
    const container =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .projectsContainer
        );


    if (!container) {
        return;
    }


    const database =
        getWebsiteDatabase();


    if (!database) {
        return;
    }


    const projects =
        database.getProjects();


    if (
        projects.length === 0
    ) {
        websiteHTML(
            container,

            `
                <div class="website-empty-state">
                    <strong>
                        New repair projects coming soon.
                    </strong>

                    <p>
                        Real TELVIQO repair work will appear here.
                    </p>
                </div>
            `
        );


        return;
    }


    websiteHTML(
        container,

        projects
            .map(
                function (
                    project,
                    index
                ) {
                    const image =
                        project.image
                            ? `
                                <img
                                    src="${project.image}"
                                    alt="${websiteEscapeHTML(
                                        project.imageAlt ||
                                        project.title ||
                                        "TELVIQO repair project"
                                    )}"
                                    loading="lazy"
                                >
                            `
                            : `
                                <div class="project-image-placeholder">
                                    <span>
                                        TELVIQO
                                    </span>

                                    <strong>
                                        Repair Project
                                    </strong>
                                </div>
                            `;


                    return `
                        <article
                            class="project-card"
                            data-reveal
                        >
                            <div class="project-image">
                                ${image}

                                <span class="project-index">
                                    ${String(
                                        index + 1
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>
                            </div>

                            <div class="project-content">
                                <div class="project-meta">
                                    <span>
                                        ${websiteEscapeHTML(
                                            project.device ||
                                            "Device"
                                        )}
                                    </span>

                                    <span>
                                        ${websiteEscapeHTML(
                                            project.service ||
                                            "Repair"
                                        )}
                                    </span>
                                </div>

                                <h3>
                                    ${websiteEscapeHTML(
                                        project.title
                                    )}
                                </h3>

                                <p>
                                    ${websiteEscapeHTML(
                                        project.description ||
                                        ""
                                    )}
                                </p>
                            </div>
                        </article>
                    `;
                }
            )
            .join("")
    );


    observeRevealElements();
}


/* ============================================================
   REVIEWS
   ============================================================ */

function renderReviews() {
    const container =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .reviewsContainer
        );


    if (!container) {
        return;
    }


    const database =
        getWebsiteDatabase();


    if (!database) {
        return;
    }


    const reviews =
        database.getReviews();


    if (
        reviews.length === 0
    ) {
        websiteHTML(
            container,

            `
                <div class="website-empty-state">
                    <strong>
                        No reviews yet.
                    </strong>

                    <p>
                        Be one of the first TELVIQO customers
                        to leave a review.
                    </p>
                </div>
            `
        );


        return;
    }


    websiteHTML(
        container,

        reviews
            .map(
                function (review) {
                    const rating =
                        Math.max(
                            1,

                            Math.min(
                                5,

                                Number(
                                    review.rating
                                ) || 5
                            )
                        );


                    return `
                        <article
                            class="review-card"
                            data-reveal
                        >
                            <div class="review-card-top">
                                <div class="review-stars">
                                    ${"★".repeat(
                                        rating
                                    )}
                                </div>

                                ${
                                    review.verified
                                        ? `
                                            <span class="verified-review">
                                                VERIFIED
                                            </span>
                                        `
                                        : ""
                                }
                            </div>

                            <blockquote>
                                “${websiteEscapeHTML(
                                    review.message
                                )}”
                            </blockquote>

                            <div class="review-author">
                                <div class="review-avatar">
                                    ${getReviewInitials(
                                        review.name
                                    )}
                                </div>

                                <div>
                                    <strong>
                                        ${websiteEscapeHTML(
                                            review.name
                                        )}
                                    </strong>

                                    <span>
                                        TELVIQO Customer
                                    </span>
                                </div>
                            </div>
                        </article>
                    `;
                }
            )
            .join("")
    );


    observeRevealElements();
}


/* ============================================================
   REVIEW INITIALS
   ============================================================ */

function getReviewInitials(name) {
    const parts =
        String(name || "Customer")
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    return parts
        .slice(
            0,
            2
        )
        .map(
            function (part) {
                return part
                    .charAt(0)
                    .toUpperCase();
            }
        )
        .join("");
}


/* ============================================================
   REVIEW FORM
   ============================================================ */

function initializeReviewForm() {
    const form =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .reviewForm
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            void submitReviewForm(form);
        }
    );
}


async function submitReviewForm(form) {
    if (TELVIQO_APP_STATE.reviewSubmitting) {
        return;
    }

    const database = getWebsiteDatabase();

    if (!database) {
        return;
    }

    const formData = new FormData(form);
    const rawName = String(formData.get("name") || "").trim();
    const name = rawName || "Anonymous";
    const message = String(formData.get("message") || "").trim();
    const rating = Number(formData.get("rating"));

    const language = getCurrentWebsiteLanguage();
    const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;


    if (!rating || rating < 1 || rating > 5) {
        showWebsiteToast(dictionary.notifications.reviewRating, "error");
        return;
    }

    TELVIQO_APP_STATE.reviewSubmitting = true;

    const submitButton = form.querySelector('button[type="submit"]');
    setButtonLoading(submitButton, true, "Sending...");

    try {
        const review = await database.createReview({
            name: name,
            message: message,
            rating: rating,
            visible: true,
            verified: false
        });

        if (!review) {
            throw new Error("Review save returned no result.");
        }

        form.reset();
        renderReviews();
        showWebsiteToast(dictionary.notifications.reviewSuccess);
    } catch (error) {
        console.error("TELVIQO review submission failed:", error);
        showWebsiteToast(dictionary.notifications.reviewError, "error");
    } finally {
        TELVIQO_APP_STATE.reviewSubmitting = false;
        setButtonLoading(submitButton, false);
    }
}


/* ============================================================
   QUOTE FORM
   ============================================================ */

function initializeQuoteForm() {
    const form =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .quoteForm
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",

        function (event) {
            event.preventDefault();

            void submitQuoteRequest(
                form
            );
        }
    );
}


/* ============================================================
   SUBMIT QUOTE REQUEST
   ============================================================ */

async function submitQuoteRequest(form) {
    if (
        TELVIQO_APP_STATE
            .quoteSubmitting
    ) {
        return;
    }


    const database =
        getWebsiteDatabase();


    if (!database) {
        return;
    }


    const settings =
        database.getSettings();


    const language = getCurrentWebsiteLanguage();
    const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;

    if (
        settings.acceptingRequests ===
        false
    ) {
        showWebsiteToast(
            dictionary.notifications.requestClosed,

            "error"
        );


        return;
    }


    const formData =
        new FormData(form);

    const authorizedDevice = form.querySelector('[name="authorizedDevice"]');
    const isAuthorizedDevice = Boolean(
        authorizedDevice && authorizedDevice.checked
    );

    const requestData = {
        customerName:
            cleanFormValue(
                formData.get(
                    "customerName"
                ) ||
                formData.get(
                    "name"
                )
            ),

        phone:
            cleanFormValue(
                formData.get(
                    "phone"
                )
            ),

        deviceType:
            cleanFormValue(
                formData.get(
                    "deviceType"
                )
            ),

        deviceModel:
            cleanFormValue(
                formData.get(
                    "deviceModel"
                )
            ),

        service:
            cleanFormValue(
                formData.get(
                    "service"
                )
            ),

        problemDescription:
            cleanFormValue(
                formData.get(
                    "problemDescription"
                ) ||
                formData.get(
                    "problem"
                )
            ),

        authorizedDevice:
            isAuthorizedDevice,

        status:
            "new",

        adminNotes:
            ""
    };


    const validation =
        validateQuoteRequest(
            requestData
        );


    if (!validation.valid) {
        showWebsiteToast(
            validation.message,

            "error"
        );


        return;
    }


    TELVIQO_APP_STATE
        .quoteSubmitting =
        true;


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    setButtonLoading(
        submitButton,
        true,
        "Sending Request..."
    );


    try {
        const request =
            await database.createRequest(
                requestData
            );

        if (!request) {
            console.error(
                "TELVIQO quote insert failed: no request returned from database layer."
            );

            throw new Error(
                "Supabase quote insert did not return a request."
            );
        }

        form.reset();

        if (authorizedDevice) {
            authorizedDevice.checked = false;
        }

        showQuoteSuccess(
            request
        );

        showWebsiteToast(
            dictionary.notifications.quoteSuccess
        );
    } catch (error) {
        console.error(
            "TELVIQO quote insert failed:",
            error
        );

        showWebsiteToast(
            dictionary.notifications.quoteError,
            "error"
        );
    } finally {
        TELVIQO_APP_STATE
            .quoteSubmitting =
            false;


        setButtonLoading(
            submitButton,
            false
        );
    }
}


/* ============================================================
   CLEAN FORM VALUE
   ============================================================ */

function cleanFormValue(value) {
    return String(
        value ?? ""
    ).trim();
}


/* ============================================================
   QUOTE VALIDATION
   ============================================================ */

function validateQuoteRequest(
    request
) {
    const language = getCurrentWebsiteLanguage();
    const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;

    if (
        request.customerName.length <
        2
    ) {
        return {
            valid: false,
            message: dictionary.notifications.quoteName
        };
    }

    if (
        !request.deviceType &&
        !request.deviceModel
    ) {
        return {
            valid: false,
            message: dictionary.notifications.quoteDevice
        };
    }

    if (
        !request.problemDescription ||
        request.problemDescription.length <
        5
    ) {
        return {
            valid: false,
            message: dictionary.notifications.quoteProblem
        };
    }

    if (
        !request.authorizedDevice
    ) {
        return {
            valid: false,
            message: dictionary.notifications.quoteAuthorization
        };
    }


    return {
        valid: true,
        message: ""
    };
}


/* ============================================================
   EMAIL VALIDATION
   ============================================================ */

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            String(email)
        );
}


/* ============================================================
   QUOTE SUCCESS
   ============================================================ */

function showQuoteSuccess(
    request
) {
    const successContainer =
        websiteGet(
            "#quoteSuccess"
        );


    if (!successContainer) {
        return;
    }

    const language = getCurrentWebsiteLanguage();
    const dictionary = TELVIQO_TRANSLATIONS[language] || TELVIQO_TRANSLATIONS.en;

    websiteHTML(
        successContainer,

        `
            <div class="quote-success-card">
                <span class="quote-success-icon">
                    ✓
                </span>

                <span class="quote-success-label">
                    ${websiteEscapeHTML(dictionary.quote.successTitle)}
                </span>

                <h3>
                    ${websiteEscapeHTML(dictionary.quote.successTitle === "REQUEST RECEIVED" ? "Thank you," : "Дякуємо,")} ${websiteEscapeHTML(
                        request.customerName
                    )}.
                </h3>

                <p>
                    ${websiteEscapeHTML(dictionary.quote.successBody)}
                </p>

                <strong class="quote-request-id">
                    ${websiteEscapeHTML(
                        request.id
                    )}
                </strong>

                <p>
                    ${websiteEscapeHTML(dictionary.quote.successFooter)}
                </p>
            </div>
        `
    );


    successContainer.classList.add(
        "active"
    );


    successContainer.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* ============================================================
   BUTTON LOADING STATE
   ============================================================ */

function setButtonLoading(
    button,
    loading,
    loadingText = "Loading..."
) {
    if (!button) {
        return;
    }


    if (loading) {
        if (
            !button.dataset
                .originalText
        ) {
            button.dataset
                .originalText =
                button.textContent;
        }


        button.disabled =
            true;


        button.classList.add(
            "loading"
        );


        websiteText(
            button,
            loadingText
        );


        return;
    }


    button.disabled =
        false;


    button.classList.remove(
        "loading"
    );


    if (
        button.dataset
            .originalText
    ) {
        websiteText(
            button,
            button.dataset
                .originalText
        );
    }
}


/* ============================================================
   NAVIGATION
   ============================================================ */

function initializeNavigation() {
    websiteGetAll(
        'a[href^="#"]'
    ).forEach(
        function (link) {
            link.addEventListener(
                "click",

                function (event) {
                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    closeMobileMenu();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            );
        }
    );


    initializeScrollNavigation();
}


/* ============================================================
   SCROLL TO SECTION
   ============================================================ */

function scrollToSection(sectionID) {
    const section =
        document.getElementById(
            sectionID
        );


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ============================================================
   SCROLL NAVIGATION STYLE
   ============================================================ */

function initializeScrollNavigation() {
    const navigation =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .navigation
        );


    if (!navigation) {
        return;
    }


    function updateNavigation() {
        navigation.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    }


    updateNavigation();


    window.addEventListener(
        "scroll",

        updateNavigation,

        {
            passive: true
        }
    );
}


/* ============================================================
   MOBILE MENU
   ============================================================ */

function initializeMobileMenu() {
    const button =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .mobileMenuButton
        );


    if (button) {
        button.addEventListener(
            "click",

            function () {
                if (
                    TELVIQO_APP_STATE
                        .mobileMenuOpen
                ) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            }
        );
    }


    websiteGetAll(
        TELVIQO_APP_CONFIG
            .selectors
            .mobileMenuClose
    ).forEach(
        function (closeButton) {
            closeButton.addEventListener(
                "click",

                closeMobileMenu
            );
        }
    );


    document.addEventListener(
        "keydown",

        function (event) {
            if (
                event.key ===
                "Escape"
            ) {
                closeMobileMenu();
            }
        }
    );
}


function openMobileMenu() {
    TELVIQO_APP_STATE
        .mobileMenuOpen =
        true;


    document.body.classList.add(
        "mobile-menu-open"
    );


    const menu =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .mobileMenu
        );


    if (menu) {
        menu.classList.add(
            "active"
        );
    }
}


function closeMobileMenu() {
    TELVIQO_APP_STATE
        .mobileMenuOpen =
        false;


    document.body.classList.remove(
        "mobile-menu-open"
    );


    const menu =
        websiteGet(
            TELVIQO_APP_CONFIG
                .selectors
                .mobileMenu
        );


    if (menu) {
        menu.classList.remove(
            "active"
        );
    }
}


/* ============================================================
   ADMIN LOGIN BUTTONS
   ============================================================ */

function initializeAdminButtons() {
    websiteGetAll(
        TELVIQO_APP_CONFIG
            .selectors
            .adminButtons
    ).forEach(
        function (button) {
            button.addEventListener(
                "click",

                function () {
                    if (
                        window.TELVIQO_AUTH &&
                        window.TELVIQO_AUTH
                            .isAuthenticated()
                    ) {
                        window.location.href =
                            TELVIQO_APP_CONFIG
                                .adminPage;


                        return;
                    }


                    window.location.href =
                        TELVIQO_APP_CONFIG
                            .loginPage;
                }
            );
        }
    );
}


/* ============================================================
   REVEAL ANIMATIONS
   ============================================================ */

let websiteRevealObserver =
    null;


function initializeRevealAnimations() {
    if (
        !("IntersectionObserver" in window)
    ) {
        websiteGetAll(
            "[data-reveal]"
        ).forEach(
            function (element) {
                element.classList.add(
                    "revealed"
                );
            }
        );


        return;
    }


    websiteRevealObserver =
        new IntersectionObserver(
            function (entries) {
                entries.forEach(
                    function (entry) {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "revealed"
                        );


                        websiteRevealObserver
                            .unobserve(
                                entry.target
                            );
                    }
                );
            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    observeRevealElements();
}


function observeRevealElements() {
    if (
        !websiteRevealObserver
    ) {
        return;
    }


    websiteGetAll(
        "[data-reveal]:not(.revealed)"
    ).forEach(
        function (element) {
            websiteRevealObserver
                .observe(
                    element
                );
        }
    );
}


/* ============================================================
   CURRENT YEAR
   ============================================================ */

function renderCurrentYear() {
    websiteGetAll(
        "[data-current-year]"
    ).forEach(
        function (element) {
            websiteText(
                element,
                new Date()
                    .getFullYear()
            );
        }
    );
}


/* ============================================================
   DATABASE LIVE UPDATES
   ============================================================ */

function initializeDatabaseLiveUpdates() {
    window.addEventListener(
        "database:update",

        function (event) {
            const collection =
                event.detail
                    ?.collection;


            switch (collection) {
                case "content":
                    renderWebsiteContent();
                    break;


                case "settings":
                    renderWebsiteSettings();
                    break;


                case "socialLinks":
                    renderSocialLinks();
                    break;


                case "services":
                    renderServices();
                    break;


                case "projects":
                    renderProjects();
                    break;


                case "reviews":
                    renderReviews();
                    break;


                default:
                    refreshTELVIQOWebsite();
            }
        }
    );
}


/* ============================================================
   STORAGE LIVE UPDATE
   ============================================================ */

function initializeStorageUpdates() {
    window.addEventListener(
        "storage",

        function () {
            refreshTELVIQOWebsite();
        }
    );
}


/* ============================================================
   REFRESH WEBSITE
   ============================================================ */

function refreshTELVIQOWebsite() {
    renderMaintenanceMode();

    renderWebsiteContent();

    renderWebsiteSettings();

    renderSocialLinks();

    renderServices();

    renderProjects();

    renderReviews();

    renderCurrentYear();

    applyWebsiteTranslations();

    observeRevealElements();
}


/* ============================================================
   INITIALIZE TELVIQO WEBSITE
   ============================================================ */

function initializeTELVIQOWebsite() {
    if (
        TELVIQO_APP_STATE
            .initialized
    ) {
        return;
    }


    TELVIQO_APP_STATE
        .initialized =
        true;


    initializeNavigation();

    initializeMobileMenu();

    initializeAdminButtons();

    initializeCashAppButtons();

    initializeQuoteForm();

    initializeReviewForm();

    initializeLanguageSwitcher();

    initializeRevealAnimations();

    initializeDatabaseLiveUpdates();

    initializeStorageUpdates();


    refreshTELVIQOWebsite();

    renderMaintenanceMode();


    console.log(
        "%cTELVIQO",
        [
            "font-size:24px",
            "font-weight:900",
            "letter-spacing:2px",
            "color:#1877ff"
        ].join(";")
    );


    console.log(
        "TELVIQO website initialized."
    );
}


/* ============================================================
   PUBLIC WEBSITE API
   ============================================================ */

window.TELVIQO_APP = {
    refresh:
        refreshTELVIQOWebsite,

    renderServices:
        renderServices,

    renderProjects:
        renderProjects,

    renderReviews:
        renderReviews,

    scrollToSection:
        scrollToSection,

    showToast:
        showWebsiteToast,

    openMobileMenu:
        openMobileMenu,

    closeMobileMenu:
        closeMobileMenu
};


/* ============================================================
   START TELVIQO WEBSITE
   ============================================================ */

if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",

        initializeTELVIQOWebsite
    );
} else {
    initializeTELVIQOWebsite();
}