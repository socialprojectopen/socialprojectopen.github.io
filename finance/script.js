// Калькулятор перевода
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация калькулятора
    initCalculator();
    
    // Инициализация FAQ
    initFAQ();
    
    // Инициализация форм
    initForms();
    
    // Плавная прокрутка для якорных ссылок
    initSmoothScroll();
    
    // Установка высоты изображения в разделе "Как мы работаем"
    setHowItWorksImageHeight();
});

// Калькулятор стоимости перевода
function initCalculator() {
    const amountInput = document.getElementById('amountInput');
    const currencySelect = document.getElementById('currencySelect');
    const countrySelect = document.getElementById('countrySelect');
    const currencyLabel = document.getElementById('currencyLabel');
    const resultSum = document.getElementById('resultSum');
    
    // Курсы валют по ЦБ РФ (примерные значения для демонстрации)
    const exchangeRates = {
        'USD': 78.50,
        'EUR': 85.20,
        'CNY': 10.80,
        'AED': 21.40,
        'GBP': 99.50,
        'JPY': 0.54
    };
    
    // Комиссия по странам (базовая комиссия 0,3%)
    const countryCommission = {
        'Китай': 0.003,
        'Корея': 0.0035,
        'Япония': 0.0035,
        'Германия': 0.004,
        'Франция': 0.004,
        'США': 0.004,
        'ОАЭ': 0.0035,
        'Другое': 0.005
    };
    
    // НДС 20%
    const VAT_RATE = 0.20;
    // Базовая комиссия 0,3%
    const BASE_COMMISSION = 0.003;
    
    function calculate() {
        let amount = parseFloat(amountInput.value.replace(/\s/g, '').replace(',', '.')) || 0;
        const currency = currencySelect.value;
        const country = countrySelect.value;
        
        if (amount <= 0) {
            updateResults(0, currency, 0, 0, 0, 0);
            return;
        }
        
        // Получаем курс валюты
        const rate = exchangeRates[currency] || 78.50;
        
        // Конвертация в рубли
        let rubAmount = amount * rate;
        
        // Получаем комиссию по стране (если есть специальная, иначе базовая)
        const commissionRate = countryCommission[country] || BASE_COMMISSION;
        
        // Рассчитываем комиссию (от суммы в рублях)
        const commission = rubAmount * commissionRate;
        
        // Рассчитываем НДС от комиссии
        const vat = commission * VAT_RATE;
        
        // Итоговая сумма к оплате
        const totalAmount = rubAmount + commission + vat;
        
        // Обновляем результат
        if (resultSum) {
            const formattedTotal = formatCurrency(Math.round(totalAmount));
            resultSum.textContent = formattedTotal;
        }
    }
    
    function formatNumber(num) {
        if (num === 0) return '0';
        // Для чисел с дробной частью
        if (num % 1 !== 0) {
            return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return num.toLocaleString('ru-RU');
    }
    
    function formatRate(rate, currency) {
        // Для JPY показываем больше знаков после запятой
        if (currency === 'JPY') {
            return rate.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) + ' ₽';
        }
        return rate.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽';
    }
    
    function formatCurrency(num) {
        return formatNumber(num) + ' ₽';
    }
    
    // Обновление метки валюты при изменении выбора
    if (currencySelect && currencyLabel) {
        currencySelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const currencyCode = selectedOption.value;
            currencyLabel.textContent = currencyCode;
            calculate();
        });
    }
    
    // Обработка изменения страны
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            calculate();
        });
    }
    
    // Форматирование ввода суммы
    if (amountInput) {
        amountInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^\d,.]/g, '');
            // Заменяем запятую на точку для парсинга
            value = value.replace(',', '.');
            // Ограничиваем двумя знаками после запятой
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            if (parts[1] && parts[1].length > 2) {
                value = parts[0] + '.' + parts[1].substring(0, 2);
            }
            
            // Форматируем для отображения (заменяем точку на запятую для российского формата)
            let displayValue = value;
            if (displayValue.includes('.')) {
                displayValue = displayValue.replace('.', ',');
            }
            
            // Форматируем целую часть с пробелами
            if (displayValue.includes(',')) {
                const [intPart, decPart] = displayValue.split(',');
                const formattedInt = formatNumber(parseInt(intPart) || 0);
                displayValue = formattedInt + ',' + decPart;
            } else if (displayValue) {
                displayValue = formatNumber(parseInt(displayValue) || 0);
            }
            
            e.target.value = displayValue;
            calculate();
        });
        
        // Инициализация при загрузке
        calculate();
    }
}

// FAQ аккордеон
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Закрываем все остальные
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Переключаем текущий
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Инициализация форм
function initForms() {
    // Форма заявки в секции request
    const requestForm = document.querySelector('.request__form');
    
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const consent = this.querySelector('input[type="checkbox"][required]').checked;
            
            if (!name || !phone) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            if (!consent) {
                alert('Необходимо дать согласие на обработку персональных данных');
                return;
            }
            
            // Здесь была бы отправка данных на сервер
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    // Валидация телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '8') {
                    value = '7' + value.slice(1);
                }
                if (value[0] === '7') {
                    value = '+7' + formatPhone(value.slice(1));
                } else {
                    value = '+' + value;
                }
            }
            e.target.value = value;
        });
    });
    
    function formatPhone(phone) {
        if (phone.length <= 3) return phone;
        if (phone.length <= 6) return phone.slice(0, 3) + ' ' + phone.slice(3);
        if (phone.length <= 8) return phone.slice(0, 3) + ' ' + phone.slice(3, 6) + ' ' + phone.slice(6);
        return phone.slice(0, 3) + ' ' + phone.slice(3, 6) + ' ' + phone.slice(6, 8) + ' ' + phone.slice(8, 10);
    }
}

// Плавная прокрутка для якорных ссылок
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 150;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Установка высоты изображения в разделе "Как мы работаем" по высоте двух карточек
function setHowItWorksImageHeight() {
    const steps = document.querySelectorAll('.how-it-works__step');
    const image = document.querySelector('.how-it-works__image');
    
    if (steps.length >= 2 && image) {
        // Вычисляем высоту первых двух карточек
        const firstStep = steps[0];
        const secondStep = steps[1];
        
        const firstHeight = firstStep.offsetHeight;
        const secondHeight = secondStep.offsetHeight;
        
        // Получаем gap между карточками (30px = var(--spacing-md))
        const gap = 30;
        
        // Общая высота = высота первой карточки + gap + высота второй карточки
        const totalHeight = firstHeight + gap + secondHeight;
        
        // Устанавливаем высоту изображения
        image.style.height = totalHeight + 'px';
    }
}

// Пересчитываем высоту при изменении размера окна
window.addEventListener('resize', function() {
    setHowItWorksImageHeight();
});

// Обработка cookie уведомления
const cookieNotice = document.getElementById('cookieNotice');
if (cookieNotice) {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    
    if (cookieAccepted === 'true') {
        cookieNotice.style.display = 'none';
    } else {
        const cookieBtn = cookieNotice.querySelector('.cookie-notice__btn');
        if (cookieBtn) {
            cookieBtn.addEventListener('click', function() {
                localStorage.setItem('cookieAccepted', 'true');
                cookieNotice.style.display = 'none';
            });
        }
    }
}
