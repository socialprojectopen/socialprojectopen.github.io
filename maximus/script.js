// Плавная загрузка страницы
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
    const menus = document.querySelectorAll('.menu');
    const body = document.body;

    mobileMenuToggles.forEach(mobileMenuToggle => {
        const nav = mobileMenuToggle.closest('.main-nav');
        const menu = nav ? nav.querySelector('.menu') : null;

        if (mobileMenuToggle && menu) {
            mobileMenuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isActive = menu.classList.contains('active');
                
                // Закрываем все остальные меню
                menus.forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('active');
                    }
                });
                mobileMenuToggles.forEach(btn => {
                    if (btn !== mobileMenuToggle) {
                        btn.classList.remove('active');
                    }
                });
                
                if (isActive) {
                    menu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    body.style.overflow = '';
                } else {
                    menu.classList.add('active');
                    mobileMenuToggle.classList.add('active');
                    body.style.overflow = 'hidden';
                }
            });
        }
    });

    // Закрытие меню при клике на ссылку
    menus.forEach(menu => {
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menus.forEach(m => m.classList.remove('active'));
                mobileMenuToggles.forEach(btn => btn.classList.remove('active'));
                body.style.overflow = '';
            });
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.menu')) {
            menus.forEach(menu => {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    const toggle = menu.closest('.main-nav')?.querySelector('.mobile-menu-toggle');
                    if (toggle) toggle.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            menus.forEach(menu => {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    const toggle = menu.closest('.main-nav')?.querySelector('.mobile-menu-toggle');
                    if (toggle) toggle.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
    });

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с задержкой анимации
    const animatedElements = document.querySelectorAll('.advantage-card, .stat-card, .city-card, .cargo-card, .service-card, .benefit-item-detailed, .guarantee-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Аккордеон
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Закрываем все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});
