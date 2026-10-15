<?php
// backend/config/config.php (atau sesuaikan dengan nama file baru kamu)

// Mencegah redeclaration jika file di-require lebih dari sekali
if (!defined('BASE_URL')) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';

    // Deteksi jika berjalan di lokal (Laragon / Localhost)
    if (strpos($host, 'localhost') !== false || strpos($host, '127.0.0.1') !== false) {
        define('BASE_URL', $protocol . $host . '/idvision');
    } else {
        // Berjalan di Railway / Production
        define('BASE_URL', $protocol . $host);
    }
}