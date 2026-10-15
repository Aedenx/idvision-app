<?php
// backend/config/database.php atau admin/config/database.php

define('DB_HOST', 'db.pikxqcmqhfXeqanozix.supabase.co');
define('DB_PORT', '5432');
define('DB_USER', 'postgres');
define('DB_PASS', 'Muhammadikhwan1'); // Ganti dengan password Supabase Anda
define('DB_NAME', 'postgres');

function getDbConnection() {
    static $pdo = null;

    if ($pdo === null) {
        try {
            $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";";
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