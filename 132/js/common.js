// Общий JavaScript для всех страниц

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Плавная прокрутка для якорных ссылок
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Модальное окно для соцсетей
    const socialModal = document.getElementById('social-modal');
    const socialLinks = document.querySelectorAll('.social-link');
    const socialModalClose = document.querySelector('.social-modal-close');
    const socialModalCloseBtn = document.querySelector('.social-modal-close-btn');

    if (socialModal && socialLinks.length > 0) {
        // Открытие модального окна при клике на соцсеть
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (socialModal) {
                    socialModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Закрытие модального окна
        function closeSocialModal() {
            if (socialModal) {
                socialModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        if (socialModalClose) {
            socialModalClose.addEventListener('click', closeSocialModal);
        }

        if (socialModalCloseBtn) {
            socialModalCloseBtn.addEventListener('click', closeSocialModal);
        }

        // Закрытие модального окна при клике вне его
        socialModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeSocialModal();
            }
        });

        // Закрытие модального окна по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialModal.classList.contains('active')) {
                closeSocialModal();
            }
        });
    }

    // Кнопки футера (Политика куков, Terms, Privacy) - можно добавить обработчики позже
    const footerButtons = document.querySelectorAll('.footer-btn');
    footerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            // Здесь можно добавить функционал для открытия соответствующих модальных окон
            // Пока просто предотвращаем переход по умолчанию
            console.log('Кнопка нажата:', modalId);
        });
    });
});

