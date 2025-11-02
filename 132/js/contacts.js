// JavaScript для страницы контактов (форма и карта)

// Инициализация Google Maps
function initMap() {
    // Координаты адреса: г. Краснодар, ул. Коммунаров, 266/Б
    // Примечание: Используются примерные координаты Краснодара
    // Для точных координат используйте Geocoding API или найдите точный адрес
    const address = { lat: 45.0448, lng: 38.9766 }; // Примерные координаты Краснодара
    const mapElement = document.getElementById('map');
    
    if (mapElement && typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        const map = new google.maps.Map(mapElement, {
            zoom: 15,
            center: address,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });

        // Метка на карте
        const marker = new google.maps.Marker({
            position: address,
            map: map,
            title: 'Миграционная служба Краснодар',
            animation: google.maps.Animation.DROP
        });

        // Информационное окно
        const infoWindow = new google.maps.InfoWindow({
            content: '<div style="padding: 10px;"><strong>Миграционная служба Краснодар</strong><br>ул. Коммунаров, 266/Б<br>г. Краснодар<br><br>Телефон: +7 (861) 245-67-90</div>'
        });

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Загружаем карту Google Maps (нужно добавить ваш API ключ)
    // ВАЖНО: Замените YOUR_API_KEY на ваш реальный API ключ Google Maps
    // Получить ключ можно здесь: https://console.cloud.google.com/google/maps-apis
    
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        // Если API еще не загружен, загружаем его
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&language=ru';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    } else {
        // Если API уже загружен, инициализируем карту
        initMap();
    }

    // Обработка формы обратной связи
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получаем значения формы
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Простая валидация
            if (!name || !phone || !message) {
                showMessage('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }

            // Валидация телефона (русский формат)
            const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
            const phoneRegex = /^(\+?7|8)?[0-9]{10}$/;
            if (!phoneRegex.test(phoneClean)) {
                showMessage('Пожалуйста, введите корректный номер телефона (например: +7 (861) 245-67-90)', 'error');
                return;
            }

            // Имитация отправки формы
            showMessage('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Очистка формы
            contactForm.reset();

            // Удаление сообщения через 5 секунд
            setTimeout(() => {
                if (formMessage) {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }
            }, 5000);
        });
    }

    function showMessage(text, type) {
        // Удаляем предыдущее сообщение, если есть
        if (formMessage) {
            formMessage.className = `form-message ${type}`;
            formMessage.textContent = text;
        }
    }

    // Анимация появления карточек контактов
    const contactCards = document.querySelectorAll('.contact-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
});
