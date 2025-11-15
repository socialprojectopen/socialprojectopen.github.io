// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

(function() {
    'use strict';

    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.nav-mobile');

    if (burgerMenu && mobileMenu) {
        // Функция для открытия/закрытия меню
        function toggleMenu() {
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;
            
            burgerMenu.setAttribute('aria-expanded', newState);
            mobileMenu.setAttribute('aria-hidden', !newState);
            burgerMenu.classList.toggle('active', newState);
            mobileMenu.classList.toggle('active', newState);
            
            // Блокируем скролл страницы при открытом меню
            if (newState) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Функция для закрытия меню
        function closeMenu() {
            burgerMenu.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Обработчик клика по бургер-меню
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Закрытие меню при клике на ссылки (обработчики добавляются один раз)
        const mobileLinks = mobileMenu.querySelectorAll('.nav__link');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(event) {
            if (burgerMenu.getAttribute('aria-expanded') === 'true') {
                if (!burgerMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
                    closeMenu();
                }
            }
        });

        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && burgerMenu.getAttribute('aria-expanded') === 'true') {
                closeMenu();
            }
        });
    }
})();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

(function() {
    'use strict';

    // Глобальная переменная для отслеживания автоматической прокрутки
    window.isAutoScrolling = false;

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') {
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                window.isAutoScrolling = true; // Устанавливаем флаг автоматической прокрутки
                
                // Сразу подсвечиваем нужную ссылку при клике
                const navLinks = document.querySelectorAll('.nav__link');
                navLinks.forEach(function(link) {
                    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
                        link.classList.remove('active');
                    }
                });
                const clickedLink = document.querySelector('a.nav__link[href="' + href + '"]');
                if (clickedLink) {
                    clickedLink.classList.add('active');
                }
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Сбрасываем флаг после завершения прокрутки (отслеживаем остановку скролла)
                let scrollEndTimer;
                const checkScrollEnd = function() {
                    clearTimeout(scrollEndTimer);
                    scrollEndTimer = setTimeout(function() {
                        window.isAutoScrolling = false;
                    }, 150);
                };
                
                const scrollListener = function() {
                    checkScrollEnd();
                };
                window.addEventListener('scroll', scrollListener, { once: false, passive: true });
                
                // Также сбрасываем через максимальное время (на случай если что-то пойдет не так)
                setTimeout(function() {
                    window.removeEventListener('scroll', scrollListener);
                    window.isAutoScrolling = false;
                }, 2000);
            }
        });
    });
})();

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

(function() {
    'use strict';

    function getCurrentPageName() {
        let path = window.location.pathname;
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        const fileName = path.split('/').pop();
        return fileName || 'index.html';
    }

    function updateActiveLinks() {
        const currentPage = getCurrentPageName();
        const currentHash = window.location.hash;
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (!href) return;
            
            if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

            if (href.startsWith('#')) {
                if (currentPage === 'index.html' && currentHash === href) {
                    link.classList.add('active');
                }
                return;
            }

            if (!href.includes('://')) {
                const parts = href.split('#');
                const pathPart = parts[0] || '';
                const linkHash = parts[1] ? '#' + parts[1] : '';
                
                let linkFileName = '';
                if (!pathPart || pathPart === '' || pathPart === '/') {
                    linkFileName = 'index.html';
                } else {
                    const cleanPath = pathPart.replace(/^\/+|\/+$/g, '');
                    linkFileName = cleanPath.split('/').pop() || 'index.html';
                }

                if (linkFileName === currentPage) {
                    if (linkFileName === 'products.html' || 
                        linkFileName === 'certificates.html' || 
                        linkFileName === 'news.html') {
                        link.classList.add('active');
                    } else if (linkFileName === 'index.html' && linkHash) {
                        if (currentHash === linkHash) {
                            link.classList.add('active');
                        }
                    }
                }
            }
        });
    }

    updateActiveLinks();
    window.addEventListener('hashchange', updateActiveLinks);

    // Update active link on scroll for hash links
    let scrollTimeout;
    let lastActiveSection = null;
    let isAutoScrolling = false;
    
    function updateActiveSectionOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        const navLinks = document.querySelectorAll('.nav__link');
        let currentActiveSection = null;

        // Находим текущую активную секцию
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentActiveSection = sectionId;
            }
        });

        // Если секция изменилась, обновляем подсветку
        if (currentActiveSection !== lastActiveSection) {
            lastActiveSection = currentActiveSection;
            
            // Убираем все активные классы с якорных ссылок
            navLinks.forEach(function(link) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    link.classList.remove('active');
                }
            });

            // Подсвечиваем активную ссылку
            if (currentActiveSection) {
                navLinks.forEach(function(link) {
                    if (link.getAttribute('href') === '#' + currentActiveSection) {
                        link.classList.add('active');
                    }
                });
            }
        }
    }
    
    window.addEventListener('scroll', function() {
        // Проверяем, идет ли автоматическая прокрутка (из глобальной переменной или через проверку)
        if (window.isAutoScrolling !== undefined) {
            isAutoScrolling = window.isAutoScrolling;
        }
        
        // При ручной прокрутке обновляем сразу
        if (!isAutoScrolling) {
            updateActiveSectionOnScroll();
        }
        
        // Обновляем после остановки прокрутки (работает для обеих случаев)
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // После остановки всегда обновляем активную секцию
            isAutoScrolling = false;
            if (window.isAutoScrolling !== undefined) {
                window.isAutoScrolling = false;
            }
            updateActiveSectionOnScroll();
        }, 200);
    });
})();

// ============================================
// LAZY LOADING IMAGES
// ============================================

(function() {
    'use strict';

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }
})();

// ============================================
// HEADER SCROLL EFFECT
// ============================================

(function() {
    'use strict';

    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }

            lastScroll = currentScroll;
        });
    }
})();

// ============================================
// PAGE LOAD ANIMATION
// ============================================

(function() {
    'use strict';

    // Плавное появление элементов при загрузке страницы
    function initPageAnimations() {
        // Добавляем класс для анимации после загрузки DOM
        document.body.classList.add('page-loaded');
        
        // Анимация для элементов, которые появляются при скролле
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Наблюдаем за секциями
        const sections = document.querySelectorAll('section');
        sections.forEach(function(section) {
            observer.observe(section);
        });
    }

    // Плавный переход при навигации
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && !link.hash && !link.target && link.hostname === window.location.hostname) {
            // Плавное исчезновение при переходе на другую страницу
            document.body.style.transition = 'opacity 0.3s ease-out';
            document.body.style.opacity = '0.7';
        }
    });

    // Инициализация после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageAnimations);
    } else {
        initPageAnimations();
    }
})();

// ============================================
// MODAL FUNCTIONALITY
// ============================================

(function() {
    'use strict';

    const modal = document.getElementById('aboutModal');
    const modalOverlay = modal ? modal.querySelector('.modal__overlay') : null;
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalIcon = document.getElementById('modalIcon');
    const aboutCards = document.querySelectorAll('.about__card[data-modal]');

    if (!modal) return;

    // Данные для модальных окон
    const modalData = {
        production: {
            title: 'Производственные возможности',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 21V13H8V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 7H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            content: '<p>Собственные производственные и технологические площади компании оснащены всем необходимым современным оборудованием. Производственная линия ЦАТИ обеспечивает выпуск до <strong>6 трёхслойных сотовых панелей в сутки</strong>, размером <strong>1250х2750 мм</strong>, толщиной от <strong>3 до 25 миллиметров</strong>.</p><p>Изготовление полимерных деталей авиационного и другого назначения, любой конфигурации, толщины и габаритами (до <strong>1220 х 2440 мм</strong>).</p><p>Производственная линия ЦАТИ оснащена современным оборудованием для формования панелей из ПКМ прессовым и вакуумным способами. Компания использует передовые технологии производства трёхслойных сотовых панелей с различными наполнителями, включая алюминиевый и арамидный сотовый заполнитель.</p><p>Наше производство позволяет выполнять заказы любой сложности и объёма, обеспечивая высокое качество продукции и соблюдение всех технических требований заказчика. Мы работаем как с серийным производством, так и с индивидуальными проектами.</p>'
        },
        technology: {
            title: 'Технология производства',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            content: '<p>ЦАТИ изготавливает продукцию из панелей с <strong>алюминиевым сотовым наполнителем</strong> и различными обшивками. Внешние стороны панелей имеют защитно-декоративное покрытие, обеспечивающее свойства долговечности, коррозионной стойкости, фактуры, лёгкости, теплоизоляции, жёсткости и прочности.</p><p>Компания использует современные методы формования панелей из полимерных композитных материалов (ПКМ) прессовым и вакуумным способами. Технология позволяет изготавливать панели с точными геометрическими параметрами и требуемыми характеристиками прочности и веса.</p><p>Применение трёхслойных сотовых панелей обеспечивает оптимальное соотношение веса и прочности, что критически важно для авиационной и космической отрасли. Панели ПАНПОЛ и ПАНТИН производятся с использованием качественных материалов и проходят строгий контроль качества на всех этапах производства.</p><p>Мы используем <strong>арамидный сотовый заполнитель</strong> для создания высокопрочных и лёгких конструкций. Формование панелей из ПКМ осуществляется как прессовым, так и вакуумным способами, что позволяет изготавливать изделия различной конфигурации и сложности. Разработка конструкторской документации выполняется нашими специалистами с учётом всех требований заказчика и стандартов отрасли.</p>'
        },
        certification: {
            title: 'Сертификация и качество',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            content: '<p>Выпускаемая ЦАТИ продукция <strong>сертифицирована в РФ</strong>. Компания осуществляет лицензированную деятельность в соответствии с полученными лицензиями, сертификатами и допусками регулирующих органов:</p><ul class="modal__list"><li>Министерство транспорта РФ</li><li>ФАВТ (Федеральное агентство воздушного транспорта)</li><li>РОСКОСМОС — лицензия на создание космических аппаратов, кораблей и станций, а также разработку и изготовление панелей солнечных батарей</li><li>МИНПРОМТОРГ РОССИИ</li><li>УФСБ России</li><li>Институт испытаний и сертификации вооружений и военной техники («Военный Стандарт»)</li></ul><p>Система управления качеством производства ООО «ЦАТИ» соответствует <strong>ГОСТ РИСО 9001-2015</strong> и <strong>ГОСТ РВ 0015-002-2020</strong>. Все производственные процессы проходят строгий контроль качества, продукция соответствует требованиям международных стандартов и допускам для работы с авиационной, космической и оборонной отраслью.</p><p>Наличие всех необходимых лицензий и сертификатов позволяет компании работать с оборонными заказами, выполнять специальные задачи для государственных структур и обеспечивать поставки продукции для критически важных объектов авиационной и космической инфраструктуры.</p>'
        }
    };

    function openModal(type) {
        if (!modalData[type]) return;

        const data = modalData[type];
        
        // Устанавливаем содержимое
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalIcon) modalIcon.innerHTML = data.icon;
        if (modalBody) modalBody.innerHTML = '<div class="modal__text">' + data.content + '</div>';

        // Показываем модалку
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Обработчики для карточек
    if (aboutCards.length > 0) {
        aboutCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const modalType = this.getAttribute('data-modal');
                if (modalType) {
                    openModal(modalType);
                }
            });
        });
    }

    // Закрытие по клику на overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Закрытие по кнопке
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Предотвращаем закрытие при клике на содержимое модалки
    const modalContent = modal.querySelector('.modal__content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
})();
