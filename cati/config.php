<?php
/**
 * Универсальная конфигурация для определения домена
 * Автоматически определяет текущий домен и протокол
 * Работает на любом сервере и домене
 */

// Безопасная функция для определения протокола
function getProtocol() {
    // Проверяем различные способы определения HTTPS
    if (
        (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
        (!empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) ||
        (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') ||
        (!empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] === 'on')
    ) {
        return 'https://';
    }
    return 'http://';
}

// Безопасная функция для получения домена
function getDomain() {
    // Используем HTTP_HOST, если доступен
    if (!empty($_SERVER['HTTP_HOST'])) {
        return $_SERVER['HTTP_HOST'];
    }
    // Fallback на SERVER_NAME
    if (!empty($_SERVER['SERVER_NAME'])) {
        return $_SERVER['SERVER_NAME'];
    }
    // Последний fallback
    return 'localhost';
}

// Функция для получения полного URL сайта
function getSiteUrl() {
    $protocol = getProtocol();
    $domain = getDomain();
    return $protocol . $domain;
}

// Функция для получения домена без www
function getDomainWithoutWww() {
    $domain = getDomain();
    // Удаляем www. в начале
    $domain = preg_replace('/^www\./i', '', $domain);
    // Удаляем порт, если есть
    $domain = preg_replace('/:\d+$/', '', $domain);
    return $domain;
}

// Функция для безопасного отображения домена в HTML
function displayDomain() {
    $domain = getDomainWithoutWww();
    // Безопасный вывод с экранированием HTML
    return htmlspecialchars($domain, ENT_QUOTES, 'UTF-8');
}

// Функция для получения базового пути (для относительных путей)
function getBasePath() {
    $script_name = $_SERVER['SCRIPT_NAME'];
    $base_path = dirname($script_name);
    // Убираем слэш в конце, если не корень
    if ($base_path !== '/' && $base_path !== '\\') {
        $base_path = rtrim($base_path, '/\\');
    }
    return $base_path === '/' ? '' : $base_path;
}

// Глобальные переменные для обратной совместимости
$protocol = getProtocol();
$domain = getDomain();
$site_url = getSiteUrl();
?>

