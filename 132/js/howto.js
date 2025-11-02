// JavaScript для страницы "Как оформить"

document.addEventListener('DOMContentLoaded', function() {
    // Интерактивные шаги с анимацией перехода
    const stepNavButtons = document.querySelectorAll('.step-nav-btn');
    const stepPanels = document.querySelectorAll('.step-panel');
    let currentStep = 1; // Начинаем с шага 1 (активен по умолчанию)

    stepNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            
            if (step !== currentStep) {
                // Убираем активный класс со всех кнопок и панелей
                stepNavButtons.forEach(btn => btn.classList.remove('active'));
                stepPanels.forEach(panel => panel.classList.remove('active'));
                
                // Добавляем активный класс выбранной кнопке
                this.classList.add('active');
                
                // Находим соответствующую панель и активируем её
                const targetPanel = document.querySelector(`.step-panel[data-step="${step}"]`);
                if (targetPanel) {
                    // Небольшая задержка для плавной анимации
                    setTimeout(() => {
                        targetPanel.classList.add('active');
                        currentStep = step;
                    }, 150);
                }
            }
        });
    });

    // Аккордеон для FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Закрываем все другие элементы аккордеона
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        if (otherContent) {
                            otherContent.style.maxHeight = '0';
                        }
                    }
                });
                
                // Переключаем текущий элемент
                const isActive = item.classList.contains('active');
                const content = item.querySelector('.accordion-content');
                
                if (isActive) {
                    item.classList.remove('active');
                    if (content) {
                        content.style.maxHeight = '0';
                    }
                } else {
                    item.classList.add('active');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }
            });
        }
    });

    // Аккордеон для дополнительных разделов
    const infoAccordionItems = document.querySelectorAll('.info-accordion-item');

    infoAccordionItems.forEach(item => {
        const header = item.querySelector('.info-accordion-header');
        
        if (header) {
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                const content = item.querySelector('.info-accordion-content');
                
                if (isActive) {
                    // Закрываем текущий элемент
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        void content.offsetHeight;
                        item.classList.remove('active');
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                    }
                } else {
                    // Закрываем все другие элементы
                    infoAccordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherContent = otherItem.querySelector('.info-accordion-content');
                            if (otherContent && otherItem.classList.contains('active')) {
                                otherContent.style.maxHeight = otherContent.scrollHeight + 'px';
                                void otherContent.offsetHeight;
                                otherItem.classList.remove('active');
                                otherContent.style.maxHeight = '0';
                                otherContent.style.opacity = '0';
                            }
                        }
                    });
                    
                    // Открываем текущий элемент
                    item.classList.add('active');
                    if (content) {
                        const scrollHeight = content.scrollHeight;
                        content.style.maxHeight = scrollHeight + 'px';
                        content.style.opacity = '1';
                    }
                }
            });
        }
    });

    // Инициализация: устанавливаем правильную высоту для открытых элементов
    infoAccordionItems.forEach(item => {
        if (item.classList.contains('active')) {
            const content = item.querySelector('.info-accordion-content');
            if (content) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            }
        }
    });

    // Кнопка "Скачать бланк"
    const downloadButtons = document.querySelectorAll('.download-blank-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const blankType = this.getAttribute('data-blank');
            // Имитация скачивания файла
            // В реальном приложении здесь будет ссылка на файл
            alert(`Скачивание бланка: ${blankType}\n\nВ реальном приложении здесь будет скачивание файла.`);
            
            // Можно добавить реальную ссылку для скачивания:
            // const link = document.createElement('a');
            // link.href = `blanks/${blankType}.pdf`;
            // link.download = `${blankType}.pdf`;
            // link.click();
        });
    });

    // Кнопка открытия аккордеона "Документы" из шага 3
    const documentsAccordionBtn = document.querySelector('[data-accordion="documents"]');
    if (documentsAccordionBtn) {
        documentsAccordionBtn.addEventListener('click', function() {
            const documentsItem = document.querySelector('.info-accordion-item:first-child');
            if (documentsItem) {
                const header = documentsItem.querySelector('.info-accordion-header');
                if (header) {
                    header.click();
                    // Прокрутка к аккордеону
                    documentsItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }
});
