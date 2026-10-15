<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once '../../config/database.php';

$pdo = getDbConnection();

try {
    $stmt = $pdo->query("
        SELECT category_id, name, slug, description 
        FROM categories 
        WHERE is_active = 1 
        ORDER BY name ASC
    ");
    $categories = $stmt->fetchAll();

    echo json_encode([
        "status" => "success",
        "data"   => $categories
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}