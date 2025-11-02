// JavaScript для главной страницы

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления карточек популярных услуг при прокрутке
    const popularServiceCards = document.querySelectorAll('.popular-service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    popularServiceCards.forEach(card => {
        observer.observe(card);
    });

    // Анимация появления секции "О нас"
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(30px)';
        aboutSection.style.transition = 'opacity 0.8s, transform 0.8s';
        aboutObserver.observe(aboutSection);
    }

    // Куки-уведомление
    const cookieNotification = document.getElementById('cookie-notification');
    const cookieAccept = document.querySelector('.cookie-accept');
    const cookieDecline = document.querySelector('.cookie-decline');

    // Проверяем, было ли уже принято решение по cookies
    function checkCookieConsent() {
        const cookieConsent = localStorage.getItem('cookieConsent');
        return cookieConsent !== null;
    }

    // Показываем уведомление только при первом посещении
    function showCookieNotification() {
        if (!checkCookieConsent() && cookieNotification) {
            setTimeout(() => {
                cookieNotification.classList.add('show');
            }, 1000); // Показываем через 1 секунду после загрузки
        }
    }

    // Сохраняем выбор пользователя
    function setCookieConsent(accepted) {
        localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
        if (cookieNotification) {
            cookieNotification.classList.remove('show');
            setTimeout(() => {
                cookieNotification.style.display = 'none';
            }, 500);
        }
    }

    // Обработчики кнопок
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            setCookieConsent(true);
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', function() {
            setCookieConsent(false);
        });
    }

    // Показываем уведомление при загрузке страницы
    showCookieNotification();
});
