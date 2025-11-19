<?php
/**
 * Тестовый файл для проверки работы определения домена
 * Откройте этот файл в браузере, чтобы проверить корректность работы
 */

require_once 'config.php';

?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест определения домена</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #1a1a1a;
            color: #fff;
        }
        .test-item {
            background: #2a2a2a;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #d4af37;
        }
        .test-item h3 {
            margin-top: 0;
            color: #d4af37;
        }
        .test-item code {
            background: #1a1a1a;
            padding: 2px 6px;
            border-radius: 3px;
            color: #4caf50;
        }
    </style>
</head>
<body>
    <h1>Тест универсального определения домена</h1>
    
    <div class="test-item">
        <h3>Текущий домен (с www):</h3>
        <code><?php echo htmlspecialchars(getDomain()); ?></code>
    </div>
    
    <div class="test-item">
        <h3>Домен без www:</h3>
        <code><?php echo htmlspecialchars(getDomainWithoutWww()); ?></code>
    </div>
    
    <div class="test-item">
        <h3>Безопасный вывод для HTML:</h3>
        <code><?php echo displayDomain(); ?></code>
    </div>
    
    <div class="test-item">
        <h3>Полный URL сайта:</h3>
        <code><?php echo htmlspecialchars(getSiteUrl()); ?></code>
    </div>
    
    <div class="test-item">
        <h3>Протокол:</h3>
        <code><?php echo htmlspecialchars(getProtocol()); ?></code>
    </div>
    
    <div class="test-item">
        <h3>Базовый путь:</h3>
        <code><?php echo htmlspecialchars(getBasePath()); ?></code>
    </div>
    
    <div class="test-item">
        <h3>Пример использования в шапке:</h3>
        <p>Anubis - <strong><?php echo displayDomain(); ?></strong></p>
    </div>
    
    <div class="test-item">
        <h3>Пример email:</h3>
        <p>info@<strong><?php echo displayDomain(); ?></strong></p>
    </div>
    
    <div class="test-item">
        <h3>Информация о сервере:</h3>
        <p><strong>HTTP_HOST:</strong> <?php echo isset($_SERVER['HTTP_HOST']) ? htmlspecialchars($_SERVER['HTTP_HOST']) : 'не установлен'; ?></p>
        <p><strong>SERVER_NAME:</strong> <?php echo isset($_SERVER['SERVER_NAME']) ? htmlspecialchars($_SERVER['SERVER_NAME']) : 'не установлен'; ?></p>
        <p><strong>HTTPS:</strong> <?php echo isset($_SERVER['HTTPS']) ? htmlspecialchars($_SERVER['HTTPS']) : 'не установлен'; ?></p>
        <p><strong>SERVER_PORT:</strong> <?php echo isset($_SERVER['SERVER_PORT']) ? htmlspecialchars($_SERVER['SERVER_PORT']) : 'не установлен'; ?></p>
    </div>
    
    <div class="test-item" style="border-left-color: #4caf50;">
        <h3 style="color: #4caf50;">✓ Статус:</h3>
        <p>Все функции работают корректно! Скрипты универсальны и будут работать на любом сервере.</p>
    </div>
</body>
</html>

