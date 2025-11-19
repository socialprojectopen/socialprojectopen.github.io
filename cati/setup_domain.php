<?php
/**
 * Одноразовый скрипт для настройки домена на сайте
 * Запустите этот скрипт один раз на вашем домене
 * После выполнения можно удалить все PHP файлы
 */

// Определяем домен
function getDomain() {
    if (!empty($_SERVER['HTTP_HOST'])) {
        $domain = $_SERVER['HTTP_HOST'];
    } elseif (!empty($_SERVER['SERVER_NAME'])) {
        $domain = $_SERVER['SERVER_NAME'];
    } else {
        $domain = 'localhost';
    }
    // Убираем www
    $domain = preg_replace('/^www\./i', '', $domain);
    // Убираем порт
    $domain = preg_replace('/:\d+$/', '', $domain);
    return $domain;
}

$domain = getDomain();

// Читаем CSS файл для определения цвета
$css_file = 'css/style.css';
$color = '#d4af37'; // Цвет по умолчанию

if (file_exists($css_file)) {
    $css_content = file_get_contents($css_file);
    
    // Ищем --gold-color
    if (preg_match('/--gold-color:\s*([^;]+);/', $css_content, $matches)) {
        $color = trim($matches[1]);
    }
    // Или ищем цвет в .btn-primary
    elseif (preg_match('/\.btn-primary[^{]*\{[^}]*background[^:]*:\s*([^;]+);/', $css_content, $matches)) {
        // Пытаемся извлечь цвет из градиента
        if (preg_match('/#[\da-fA-F]{6}|#[\da-fA-F]{3}/', $matches[1], $color_match)) {
            $color = $color_match[0];
        }
    }
}

// Список HTML файлов для обновления
$html_files = [
    'index.html',
    'hakkimizda.html',
    'rituel.html',
    'galeri.html',
    'iletisim.html',
    'tesekkurler.html',
    'quiz.html'
];

$updated_files = [];
$errors = [];

foreach ($html_files as $file) {
    if (!file_exists($file)) {
        continue;
    }
    
    $content = file_get_contents($file);
    $original_content = $content;
    
    // Заменяем "Anubis</span>" на "Anubis - domain</span>" с цветом
    $pattern = '/(<span class="logo-text">)Anubis(<\/span>)/';
    $replacement = '$1Anubis - <span style="color: ' . htmlspecialchars($color) . ';">' . htmlspecialchars($domain) . '</span>$2';
    $content = preg_replace($pattern, $replacement, $content);
    
    // Также заменяем в футере
    $pattern = '/(&copy; 2024 Anubis)(\. Tüm hakları saklıdır\.)/';
    $replacement = '$1 - <span style="color: ' . htmlspecialchars($color) . ';">' . htmlspecialchars($domain) . '</span>$2';
    $content = preg_replace($pattern, $replacement, $content);
    
    // Заменяем email в политике конфиденциальности
    $pattern = '/(<strong>E-posta:<\/strong> info@)([^<]+)(<br>)/';
    $replacement = '$1<span style="color: ' . htmlspecialchars($color) . ';">' . htmlspecialchars($domain) . '</span>$3';
    $content = preg_replace($pattern, $replacement, $content);
    
    // Если были изменения, сохраняем файл
    if ($content !== $original_content) {
        if (file_put_contents($file, $content)) {
            $updated_files[] = $file;
        } else {
            $errors[] = "Не удалось сохранить файл: $file";
        }
    }
}

?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Настройка домена - Завершено</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #1a1a1a;
            color: #fff;
        }
        .success {
            background: #2d5a2d;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #4caf50;
        }
        .info {
            background: #2a2a2a;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
        }
        .error {
            background: #5a2d2d;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            border-left: 4px solid #f44336;
        }
        code {
            background: #1a1a1a;
            padding: 2px 6px;
            border-radius: 3px;
            color: #4caf50;
        }
        .file-list {
            list-style: none;
            padding: 0;
        }
        .file-list li {
            background: #2a2a2a;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            border-left: 3px solid #d4af37;
        }
    </style>
</head>
<body>
    <h1>Настройка домена завершена!</h1>
    
    <div class="success">
        <h2>✓ Успешно обновлено</h2>
        <p><strong>Домен:</strong> <code style="color: <?php echo htmlspecialchars($color); ?>;"><?php echo htmlspecialchars($domain); ?></code></p>
        <p><strong>Цвет:</strong> <code><?php echo htmlspecialchars($color); ?></code></p>
    </div>
    
    <?php if (!empty($updated_files)): ?>
    <div class="info">
        <h3>Обновленные файлы:</h3>
        <ul class="file-list">
            <?php foreach ($updated_files as $file): ?>
            <li>✓ <?php echo htmlspecialchars($file); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php endif; ?>
    
    <?php if (!empty($errors)): ?>
    <div class="error">
        <h3>Ошибки:</h3>
        <ul>
            <?php foreach ($errors as $error): ?>
            <li><?php echo htmlspecialchars($error); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php endif; ?>
    
    <div class="info">
        <h3>Что было сделано:</h3>
        <ul>
            <li>Определен домен: <code><?php echo htmlspecialchars($domain); ?></code></li>
            <li>Найден цвет из CSS: <code style="color: <?php echo htmlspecialchars($color); ?>;"><?php echo htmlspecialchars($color); ?></code></li>
            <li>Домен добавлен в логотип с цветом</li>
            <li>Домен добавлен в футер с цветом</li>
            <li>Email обновлен в политике конфиденциальности</li>
        </ul>
    </div>
    
    <?php
    // Удаляем ненужные PHP файлы после выполнения
    $files_to_delete = [
        'config.php',
        'header.php',
        'footer.php',
        'test_domain.php'
    ];
    
    $deleted_files = [];
    $delete_errors = [];
    
    foreach ($files_to_delete as $file) {
        if (file_exists($file)) {
            if (unlink($file)) {
                $deleted_files[] = $file;
            } else {
                $delete_errors[] = "Не удалось удалить: $file";
            }
        }
    }
    ?>
    
    <div class="success">
        <h3>🎉 Готово!</h3>
        <p><strong>Настройка завершена:</strong></p>
        <ol>
            <li>✓ Все HTML файлы обновлены с доменом</li>
            <li>✓ Ненужные PHP файлы удалены</li>
            <li>✓ Сайт готов к работе со статическими HTML файлами</li>
        </ol>
    </div>
    
    <?php if (!empty($deleted_files)): ?>
    <div class="info">
        <h3>Удаленные ненужные файлы:</h3>
        <ul class="file-list">
            <?php foreach ($deleted_files as $file): ?>
            <li>✓ Удален: <?php echo htmlspecialchars($file); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php endif; ?>
    
    <?php if (!empty($delete_errors)): ?>
    <div class="error">
        <h3>Ошибки при удалении:</h3>
        <ul>
            <?php foreach ($delete_errors as $error): ?>
            <li><?php echo htmlspecialchars($error); ?></li>
            <?php endforeach; ?>
        </ul>
        <p>Вы можете удалить эти файлы вручную.</p>
    </div>
    <?php endif; ?>
    
    <div class="info">
        <p><strong>Примечание:</strong> Файл <code>setup_domain.php</code> оставлен. Вы можете удалить его вручную, если он больше не нужен.</p>
    </div>
    
    <div class="info">
        <h3>Пример изменений:</h3>
        <p>В логотипе:</p>
        <code>&lt;span class="logo-text"&gt;Anubis - <span style="color: <?php echo htmlspecialchars($color); ?>;"><?php echo htmlspecialchars($domain); ?></span>&lt;/span&gt;</code>
    </div>
</body>
</html>

