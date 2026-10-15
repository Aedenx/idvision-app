<?php
// backend/config/database.php

function getDbConnection() {
    static $pdo = null;

    if ($pdo === null) {
        try {
            // Priority 1: Ambil dari Environment Variable Railway
            $dbUrl = getenv('DATABASE_URL');

            if (!empty($dbUrl)) {
                $pdo = new PDO($dbUrl);
            } else {
                // Priority 2: Fallback manual sesuai data asli Supabase
                $host = 'aws-0-ap-northeast-1.pooler.supabase.com';
                $port = '5432';
                $dbname = 'postgres';
                $user = 'postgres.pikxqcmqhfxeqanozix';
                $password = 'Muhammadikhwan1';

                $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password";

                $pdo = new PDO($dsn, null, null, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]);
            }
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