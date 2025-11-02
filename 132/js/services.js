// JavaScript для страницы услуг (модальные окна)

document.addEventListener('DOMContentLoaded', function() {
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Открытие модального окна
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Закрытие модального окна
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Закрытие модального окна при клике вне его
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Закрытие модального окна по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // FAQ Аккордеон с плавной анимацией
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        if (header) {
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Закрываем все другие элементы аккордеона
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.faq-content');
                        if (otherContent && otherItem.classList.contains('active')) {
                            otherContent.style.maxHeight = otherContent.scrollHeight + 'px';
                            void otherContent.offsetHeight;
                            otherItem.classList.remove('active');
                            otherContent.style.maxHeight = '0';
                            otherContent.style.opacity = '0';
                        }
                    }
                });
                
                // Переключаем текущий элемент
                const content = item.querySelector('.faq-content');
                if (content) {
                    if (isActive) {
                        // Закрываем элемент
                        content.style.maxHeight = content.scrollHeight + 'px';
                        // Принудительно запускаем перерисовку
                        void content.offsetHeight;
                        item.classList.remove('active');
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                    } else {
                        // Открываем элемент
                        item.classList.add('active');
                        // Устанавливаем реальную высоту для плавной анимации
                        const scrollHeight = content.scrollHeight;
                        content.style.maxHeight = scrollHeight + 'px';
                        content.style.opacity = '1';
                    }
                }
            });
        }
    });

    // Инициализация: устанавливаем правильную высоту для открытых элементов при загрузке
    faqItems.forEach(item => {
        if (item.classList.contains('active')) {
            const content = item.querySelector('.faq-content');
            if (content) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            }
        }
    });
});

