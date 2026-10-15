<?php
// backend/config/database.php

function getDbConnection() {
    static $pdo = null;

    if ($pdo === null) {
        try {
            // URL Transaction Pooler Supabase yang benar
            $dbUrl = "pgsql:postgresql://postgres.pikxqcmqhfxeqanozix:Muhammadikhwan1@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres";
            
            $pdo = new PDO($dbUrl);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
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