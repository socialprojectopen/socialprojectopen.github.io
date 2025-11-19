// Mobile Menu Toggle Function - Simple and Reliable
(function() {
    'use strict';
    
    let mobileMenuToggle, navMenu, navLinks;
    
    function initMobileMenu() {
        mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        navMenu = document.querySelector('.nav-menu');
        navLinks = document.querySelectorAll('.nav-menu a');

        console.log('Initializing mobile menu...');
        console.log('Toggle button:', mobileMenuToggle);
        console.log('Nav menu:', navMenu);

        if (!mobileMenuToggle || !navMenu) {
            console.error('Mobile menu elements not found!');
            return;
        }

        // Toggle menu function
        function toggleMenu(e) {
            console.log('Toggle menu called!');
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            const isOpen = navMenu.classList.contains('active');
            console.log('Menu is open:', isOpen);
            
            if (isOpen) {
                // Close menu
                console.log('Closing menu...');
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            } else {
                // Open menu
                console.log('Opening menu...');
                mobileMenuToggle.classList.add('active');
                navMenu.classList.add('active');
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
        }

        // Close menu function
        function closeMenu() {
            if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        }

        // Remove any existing listeners by cloning the button
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        mobileMenuToggle = newToggle;

        // Toggle button click - use capture phase
        mobileMenuToggle.addEventListener('click', function(e) {
            console.log('Button clicked!');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            toggleMenu(e);
            return false;
        }, true);

        // Also add touch event
        mobileMenuToggle.addEventListener('touchend', function(e) {
            console.log('Button touched!');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(e);
            return false;
        }, true);

        // Make button definitely clickable
        mobileMenuToggle.style.pointerEvents = 'auto';
        mobileMenuToggle.style.cursor = 'pointer';
        mobileMenuToggle.style.zIndex = '1005';
        mobileMenuToggle.setAttribute('tabindex', '0');
        
        // Test click handler
        mobileMenuToggle.onclick = function(e) {
            console.log('onclick handler fired!');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(e);
            return false;
        };

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    setTimeout(closeMenu, 100);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
                const isClickInsideMenu = navMenu.contains(e.target);
                const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(e.target);
                
                if (!isClickInsideMenu && !isClickOnToggle) {
                    closeMenu();
                }
            }
        }, true);

        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && window.innerWidth <= 768) {
                if (navMenu && navMenu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });

        // Close menu on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    closeMenu();
                }
            }, 100);
        });

        console.log('Mobile menu initialized successfully!');
    }

    // Try multiple initialization methods
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        // DOM already loaded
        setTimeout(initMobileMenu, 0);
    }
    
    // Also try on window load as backup
    window.addEventListener('load', function() {
        if (!mobileMenuToggle || !navMenu) {
            console.log('Retrying mobile menu initialization on window load...');
            initMobileMenu();
        }
    });
})();

// Accordion fonksiyonu
document.addEventListener('DOMContentLoaded', function() {
    function initAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        if (accordionHeaders.length > 0) {
            accordionHeaders.forEach((header) => {
                header.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const accordionItem = this.closest('.accordion-item');
                    if (!accordionItem) return;
                    
                    const accordionContent = accordionItem.querySelector('.accordion-content');
                    if (!accordionContent) return;
                    
                    const isActive = this.classList.contains('active');
                    const allHeaders = document.querySelectorAll('.accordion-header');

                    // Tüm accordion'ları kapat
                    allHeaders.forEach(h => {
                        if (h !== this) {
                            h.classList.remove('active');
                            const item = h.closest('.accordion-item');
                            if (item) {
                                const content = item.querySelector('.accordion-content');
                                if (content) {
                                    content.classList.remove('active');
                                    content.style.maxHeight = '0';
                                    // Clean up inline style after transition
                                    setTimeout(() => {
                                        if (!content.classList.contains('active')) {
                                            content.style.maxHeight = '';
                                        }
                                    }, 400);
                                }
                            }
                        }
                    });

                    // Tıklanan accordion'u aç/kapat
                    if (isActive) {
                        // Kapat
                        this.classList.remove('active');
                        // Mevcut yüksekliği al ve animasyon için kullan
                        const currentHeight = accordionContent.scrollHeight;
                        accordionContent.style.maxHeight = currentHeight + 'px';
                        // Force reflow for smooth animation
                        void accordionContent.offsetHeight;
                        // Şimdi kapat
                        accordionContent.style.maxHeight = '0';
                        setTimeout(() => {
                            accordionContent.classList.remove('active');
                            accordionContent.style.maxHeight = '';
                        }, 400);
                    } else {
                        // Aç
                        this.classList.add('active');
                        accordionContent.classList.add('active');
                        // Önce yüksekliği 0 yap
                        accordionContent.style.maxHeight = '0';
                        // Force reflow
                        void accordionContent.offsetHeight;
                        // Şimdi gerçek yüksekliğe ayarla
                        const height = accordionContent.scrollHeight;
                        accordionContent.style.maxHeight = height + 'px';
                        // Transition bittikten sonra maxHeight'ı kaldır (CSS'e bırak)
                        setTimeout(() => {
                            if (accordionContent.classList.contains('active')) {
                                accordionContent.style.maxHeight = '';
                            }
                        }, 400);
                    }
                });
            });
        }
    }
    
    // Initialize accordions
    initAccordions();
});

// Modal trigger'ları (Cookie, Terms, Privacy) - Global initialization
(function() {
    'use strict';
    
    function initModalTriggers() {
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        
        console.log('Initializing modal triggers, found:', modalTriggers.length);
        
        if (modalTriggers.length > 0) {
            modalTriggers.forEach((trigger) => {
                // Remove any existing listeners
                const newTrigger = trigger.cloneNode(true);
                trigger.parentNode.replaceChild(newTrigger, trigger);
                
                newTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const modalName = this.getAttribute('data-modal');
                    const modalId = modalName + 'Modal';
                    const modal = document.getElementById(modalId);
                    
                    console.log('Modal trigger clicked:', modalName, 'Modal ID:', modalId, 'Modal found:', modal);
                    
                    if (modal) {
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100%';
                    } else {
                        console.error('Modal not found:', modalId);
                    }
                });
            });
        }
    }
    
    // Modal kapatma fonksiyonu
    function initModalClose() {
        const closeModalButtons = document.querySelectorAll('.close-modal');
        if (closeModalButtons.length > 0) {
            closeModalButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const modal = this.closest('.modal');
                    if (modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                });
            });
        }

        // Modal dışına tıklandığında kapat
        const modals = document.querySelectorAll('.modal');
        if (modals.length > 0) {
            modals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('active');
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                });
            });
        }

        // ESC tuşu ile modal kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModals = document.querySelectorAll('.modal.active');
                activeModals.forEach(modal => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                });
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initModalTriggers();
            initModalClose();
        });
    } else {
        initModalTriggers();
        initModalClose();
    }
})();

// Galeri görsel modal'ı
document.addEventListener('DOMContentLoaded', function() {
    const galleryItemsForModal = document.querySelectorAll('.gallery-item[data-gallery]');
    const galleryModal = document.getElementById('galleryModal');
    
    // Galeri verileri
    const galleryData = {
        1: {
            title: 'Anubis Heykeli - Tapınak Girişi',
            history: 'Bu heykel, antik Mısır tapınaklarının girişlerinde bulunan Anubis heykellerini temsil eder. Şakal başlı tanrı, ölülerin koruyucusu olarak tapınakları gözetler. Heykeller, siyah renkli taşlardan yapılır ve altın detaylarla süslenir, tanrının ilahi doğasını yansıtır.',
            symbol: 'Anubis heykeli, koruma ve rehberlik sembolizmini taşır. Şakal başı, keskin görüşü ve gece görüşünü temsil eder. Tapınak girişlerindeki bu heykeller, ziyaretçileri karşılar ve kutsal alanın korunmasını sağlar.'
        },
        2: {
            title: 'Mısır Duvar Freskleri',
            history: 'Antik Mısır tapınaklarının duvarlarında bulunan freskler, tanrıların hikayelerini ve ritüelleri tasvir eder. Bu sanat eserleri, binlerce yıl boyunca korunmuştur. Fresklerde Anubis, genellikle mumyalama sürecinde veya kalbin tartılması ritüelinde tasvir edilir.',
            symbol: 'Freskler, antik Mısır'ın dini inançlarını ve kültürel değerlerini yansıtır. Her sembol, derin bir anlam taşır. Bu sahneler, Anubis'in ölülerin koruyucusu ve adaletin gözlemcisi olarak rolünü gösterir.'
        },
        3: {
            title: 'Anubis Hiyeroglifleri',
            history: 'Hiyeroglif yazı, antik Mısır'ın en önemli kültürel miraslarından biridir. Anubis, bu yazılarda sıklıkla tasvir edilir ve ölülerin koruyucusu olarak anılır. Anubis'in hiyeroglif sembolü, şakal başlı bir figürdür ve genellikle "Anpu" olarak yazılır.',
            symbol: 'Hiyerogliflerde Anubis, şakal başlı bir figür olarak gösterilir. Bu sembol, onun tanrısal kimliğini ve görevlerini ifade eder. Hiyeroglifler, Anubis'in antik Mısır inanç sistemindeki merkezi rolünü gösterir.'
        }
    };

    if (galleryItemsForModal.length > 0) {
        galleryItemsForModal.forEach(item => {
            item.addEventListener('click', function() {
                const galleryId = this.getAttribute('data-gallery');
                const data = galleryData[galleryId];

                if (galleryModal && data) {
                    const modalImage = document.getElementById('galleryModalImage');
                    const modalTitle = document.getElementById('galleryModalTitle');
                    const modalHistory = document.getElementById('galleryModalHistory');
                    const modalSymbol = document.getElementById('galleryModalSymbol');

                    if (modalImage) {
                        const placeholder = this.querySelector('.gallery-placeholder');
                        if (placeholder) {
                            modalImage.textContent = placeholder.textContent;
                        }
                    }
                    if (modalTitle) modalTitle.textContent = data.title;
                    if (modalHistory) modalHistory.textContent = data.history;
                    if (modalSymbol) modalSymbol.textContent = data.symbol;

                    galleryModal.classList.add('active');
                }
            });
        });
    }

    // Mini galeri görselleri (ana sayfa)
    const miniGalleryItems = document.querySelectorAll('.gallery-item[data-image]');
    const imageModal = document.getElementById('imageModal');

    const miniGalleryData = {
        4: {
            title: 'Tapınak Kabartmaları',
            desc: 'Antik Mısır tapınaklarının duvarlarındaki kabartmalar, tanrıların hikayelerini ve ritüelleri tasvir eder.'
        },
        5: {
            title: 'Anubis Rölyefi',
            desc: 'Şakal başlı Anubis, ölülerin koruyucusu ve rehberi olarak rölyeflerde sıklıkla tasvir edilir.'
        },
        6: {
            title: 'Kutsal Şakal Sembolü',
            desc: 'Şakal, Anubis'in en önemli sembolüdür ve koruma, rehberlik ve adalet anlamlarını taşır.'
        }
    };

    if (miniGalleryItems.length > 0) {
        miniGalleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imageId = this.getAttribute('data-image');
                const data = miniGalleryData[imageId];

                if (imageModal && data) {
                    const modalImage = document.getElementById('modalImage');
                    const modalTitle = document.getElementById('modalImageTitle');
                    const modalDesc = document.getElementById('modalImageDesc');

                    if (modalImage) {
                        const placeholder = this.querySelector('.gallery-placeholder');
                        if (placeholder) {
                            modalImage.textContent = placeholder.textContent;
                        }
                    }
                    if (modalTitle) modalTitle.textContent = data.title;
                    if (modalDesc) modalDesc.textContent = data.desc;

                    imageModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    // Ritüel görselleri modal
    const ritualImageItems = document.querySelectorAll('.ritual-image-item[data-image]');
    const ritualImageData = {
        ritual1: {
            title: 'Terazi - Tapınak Sanatı',
            desc: 'Kalbin tartılması ritüelini tasvir eden tapınak sanatı. Anubis, teraziyi yönetir ve adaleti sağlar.'
        },
        ritual2: {
            title: 'Altın Maske',
            desc: 'Antik Mısır'ın altın maskeleri, ölüm sonrası yaşam ve yeniden doğuş sembolizmini taşır.'
        }
    };

    if (ritualImageItems.length > 0) {
        ritualImageItems.forEach(item => {
            item.addEventListener('click', function() {
                const imageId = this.getAttribute('data-image');
                const data = ritualImageData[imageId];

                if (imageModal && data) {
                    const modalImage = document.getElementById('modalImage');
                    const modalTitle = document.getElementById('modalImageTitle');
                    const modalDesc = document.getElementById('modalImageDesc');

                    if (modalImage) {
                        const placeholder = this.querySelector('.image-placeholder');
                        if (placeholder) {
                            modalImage.textContent = placeholder.textContent;
                        }
                    }
                    if (modalTitle) modalTitle.textContent = data.title;
                    if (modalDesc) modalDesc.textContent = data.desc;

                    imageModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    // İletişim formu
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form validasyonu burada yapılabilir
            // Şu anda form doğrudan tesekkurler.html'e yönlendiriyor
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
