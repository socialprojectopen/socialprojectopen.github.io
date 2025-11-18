/**
 * Cookie Consent Popup
 * Сохранение выбора пользователя в Local Storage
 */

(function() {
    'use strict';

    const COOKIE_CONSENT_KEY = 'cookieConsent';
    const COOKIE_CONSENT_EXPIRY_DAYS = 365;

    // Проверяем, было ли уже принято решение о cookies
    function hasConsent() {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) return false;

        try {
            const consentData = JSON.parse(consent);
            // Проверяем срок действия (опционально)
            if (consentData.expiry && new Date() > new Date(consentData.expiry)) {
                localStorage.removeItem(COOKIE_CONSENT_KEY);
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    // Сохраняем согласие пользователя
    function saveConsent(accepted) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);

        const consentData = {
            accepted: accepted,
            date: new Date().toISOString(),
            expiry: expiryDate.toISOString()
        };

        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    }

    // Показываем popup
    function showCookieConsent() {
        const popup = document.getElementById('cookie-consent');
        if (popup) {
            popup.classList.add('show');
        }
    }

    // Скрываем popup
    function hideCookieConsent() {
        const popup = document.getElementById('cookie-consent');
        if (popup) {
            popup.classList.remove('show');
        }
    }

    // Инициализация
    function initCookieConsent() {
        // Если согласие уже было дано, не показываем popup
        if (hasConsent()) {
            return;
        }

        // Показываем popup после небольшой задержки для лучшего UX
        setTimeout(() => {
            showCookieConsent();
        }, 500);

        // Обработчики кнопок
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                saveConsent(true);
                hideCookieConsent();
            });
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                saveConsent(false);
                hideCookieConsent();
            });
        }
    }

    // Запускаем при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }
})();

