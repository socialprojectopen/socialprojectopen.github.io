<?php
/**
 * Универсальная шапка сайта с автоматическим определением домена
 * Работает на любом сервере и домене
 */

// Определяем путь к config.php относительно текущего файла
$config_path = __DIR__ . '/config.php';
if (file_exists($config_path)) {
    require_once $config_path;
} else {
    // Fallback если config.php не найден
    function displayDomain() {
        return !empty($_SERVER['HTTP_HOST']) ? htmlspecialchars(preg_replace('/^www\./i', '', $_SERVER['HTTP_HOST']), ENT_QUOTES, 'UTF-8') : 'localhost';
    }
}

// Получаем текущий домен
$current_domain = displayDomain();
$site_url = getSiteUrl();
$base_path = getBasePath();
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Anubis: Antik Mısır'ın Geçit Bekçisi. Ölülerin rehberi ve kalbin tartılması geleneğinin koruyucusu hakkında bilgiler.">
    <meta name="keywords" content="Anubis, Mısır tanrısı, antik Mısır, ölüler tanrısı, Duat, kalbin tartılması">
    <title>Anubis: Antik Mısır'ın Geçit Bekçisi</title>
    <link rel="icon" type="image/jpeg" href="images/favicon.jpeg">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="<?php echo $base_path; ?>/index.php" class="logo">
                        <span class="logo-icon"></span>
                        <span class="logo-text">Anubis - <?php echo $current_domain; ?></span>
                    </a>
                    <button class="mobile-menu-toggle" aria-label="Menüyü aç/kapat" type="button" onclick="toggleMobileMenu(event)">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu">
                        <li><a href="<?php echo $base_path; ?>/index.php" class="active">Ana Sayfa</a></li>
                        <li><a href="<?php echo $base_path; ?>/hakkimizda.php">Hakkında Anubis</a></li>
                        <li><a href="<?php echo $base_path; ?>/rituel.php">Ritüeller ve İnançlar</a></li>
                        <li><a href="<?php echo $base_path; ?>/galeri.php">Galeri</a></li>
                        <li><a href="<?php echo $base_path; ?>/iletisim.php">İletişim</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

