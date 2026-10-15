<?php
// backend/config/database.php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // Sesuaikan jika MySQL Laragon kamu pakai password
define('DB_NAME', 'ecommerce_kacamata');

function getDbConnection() {
    static $pdo = null;

    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Database Connection Error: ' . $e->getMessage()
            ]);
            exit;
        }
    }

    return $pdo;
}