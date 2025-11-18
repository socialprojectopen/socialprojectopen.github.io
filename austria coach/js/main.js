/**
 * Основной JavaScript файл
 * Мобильное меню и другие функции
 */

(function() {
    'use strict';

    // Мобильное меню
    function initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const nav = document.querySelector('nav');

        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
            });

            // Закрываем меню при клике вне его
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                    nav.classList.remove('active');
                }
            });
        }
    }

    // Плавная прокрутка для якорных ссылок
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
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
    }

    // Аккордеон
    function initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                
                // Закрываем все аккордеоны
                document.querySelectorAll('.accordion-item').forEach(accItem => {
                    accItem.classList.remove('active');
                });
                
                // Открываем текущий, если он был закрыт
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Модальные окна
    function initModals() {
        // Открытие модалок
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Закрытие модалок
        const modalCloses = document.querySelectorAll('.modal-close, .modal');
        modalCloses.forEach(close => {
            close.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('modal-close')) {
                    const modal = this.closest('.modal') || this;
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });

        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    openModal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // Плавное появление элементов при скролле
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Наблюдаем за элементами с классом scroll-fade
        document.querySelectorAll('.scroll-fade').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Плавная загрузка страницы
    function initPageTransition() {
        // Добавляем класс для плавного появления
        document.body.classList.add('page-loaded');
        
        // CSS анимации уже обрабатывают появление элементов
        // Не нужно дублировать их в JavaScript
    }

    // Подсветка активной страницы в навигации
    function initActivePage() {
        const currentUrl = window.location.href;
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav ul li a');
        
        // Получаем имя текущего файла
        let currentPage = '';
        if (currentPath) {
            currentPage = currentPath.split('/').pop() || '';
        } else {
            // Для file:// протокола
            currentPage = currentUrl.split('/').pop() || '';
        }
        
        // Если пусто, значит это главная страница
        if (!currentPage || currentPage === '' || currentPage === 'index.html') {
            currentPage = 'index.html';
        }
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const linkPage = linkPath.split('/').pop();
            
            // Убираем предыдущий класс active
            link.classList.remove('active');
            
            // Проверяем совпадение имени файла
            if (linkPage === currentPage) {
                link.classList.add('active');
                return;
            }
            
            // Проверка для главной страницы
            if ((currentPage === 'index.html' || currentPage === '') && 
                (linkPage === 'index.html' || linkPath.includes('index.html'))) {
                link.classList.add('active');
                return;
            }
            
            // Проверка для страниц в подпапках по имени файла
            const pageNames = {
                'kurse.html': 'kurse',
                'ueber-uns.html': 'ueber-uns',
                'blog.html': 'blog',
                'faq.html': 'faq',
                'kontakte.html': 'kontakte'
            };
            
            for (const [fileName, pageName] of Object.entries(pageNames)) {
                if (currentPage === fileName && linkPath.includes(fileName)) {
                    link.classList.add('active');
                    return;
                }
                if ((currentPath.includes(pageName) || currentUrl.includes(pageName)) && 
                    linkPath.includes(fileName)) {
                    link.classList.add('active');
                    return;
                }
            }
        });
    }

    // Инициализация всех функций
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initAccordion();
        initModals();
        initScrollAnimations();
        initPageTransition();
        initActivePage();
    }

    // Запускаем при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

