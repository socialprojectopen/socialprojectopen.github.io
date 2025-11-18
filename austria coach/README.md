# IT-Coaching Portal

Bildungsportal für IT-Technologien und digitale Fähigkeiten. Coaching für IT-Spezialisten in Österreich.

## Структура проекта

```
/
├── index.php                    # Главная страница (Header, Hero, Footer)
├── datenschutz.php             # Privacy Policy (Datenschutzerklärung)
├── cookie-richtlinie.php       # Cookies Policy (Cookie-Richtlinie)
├── nutzungsbedingungen.php     # Terms of Service (Nutzungsbedingungen)
├── css/
│   └── style.css               # Основные стили с темной цветовой гаммой
├── js/
│   ├── main.js                 # Основной JavaScript (мобильное меню, плавная прокрутка)
│   └── cookie-consent.js       # Cookie consent popup с Local Storage
├── kurse/
│   └── kurse.php               # Страница курсов
├── ueber-uns/
│   └── ueber-uns.php           # Страница "О нас"
├── blog/
│   └── blog.php                # Страница блога
├── faq/
│   └── faq.php                 # Страница FAQ
└── kontakte/
    └── kontakte.php            # Страница контактов (с картой)
```

## Технологии

- PHP
- HTML5
- CSS3
- JavaScript (Vanilla)

## Особенности

- ✅ Адаптивный дизайн (ПК + мобильный)
- ✅ Темная цветовая гамма
- ✅ Cookie consent popup с сохранением в Local Storage
- ✅ Плавные анимации
- ✅ Мобильное меню
- ✅ Все страницы на немецком языке
- ✅ Юридические документы в футере
- ✅ Соответствие политике Google

## Цветовая гамма

- **Темный фон**: `#1a1a1a` / `#0f0f0f`
- **Светло-серый текст**: `#e0e0e0` / `#b0b0b0`
- **Темно-серые блоки**: `#2a2a2a`
- **Светло-оранжевый акцент**: `#ff8c42`
- **Теплый желтый/бежевый**: `#f5e6d3` (опционально)

## Страницы сайта

1. **index.php** - Главная страница (только Header, Hero, Footer)
2. **kurse/kurse.php** - Курсы
3. **ueber-uns/ueber-uns.php** - О нас
4. **blog/blog.php** - Блог
5. **faq/faq.php** - FAQ
6. **kontakte/kontakte.php** - Контакты (требуется добавить реальный адрес, почту, телефон и API ключ Google Maps)

## Установка

1. Загрузите файлы на PHP-сервер
2. Для страницы контактов добавьте API ключ Google Maps в файл `kontakte/kontakte.php`
3. Замените примеры контактных данных на реальные в `kontakte/kontakte.php`

## Требования

- PHP 7.0 или выше
- Веб-сервер (Apache/Nginx)
- Google Maps API ключ (для страницы контактов)

## Лицензия

© 2025 IT-Coaching Portal. Alle Rechte vorbehalten.

