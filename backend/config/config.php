<?php
// Deteksi protokol (http/https)
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'];

// Jika berjalan di lokal (localhost / 127.0.0.1)
if (strpos($host, 'localhost') !== false || strpos($host, '127.0.0.1') !== false) {
    define('BASE_URL', $protocol . $host . '/idvision');
} else {
    // Jika berjalan di Railway / Production
    define('BASE_URL', $protocol . $host);
}