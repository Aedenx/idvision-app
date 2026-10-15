<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once '../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

$senderType    = $data['sender_type'] ?? 'customer';
$senderName    = trim($data['sender_name'] ?? 'Pelanggan');
$customerPhone = trim($data['customer_phone'] ?? '');
$message       = trim($data['message'] ?? '');
$orderNumber   = trim($data['order_number'] ?? '');

if (empty($customerPhone) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
    exit;
}

try {
    $pdo = getDbConnection();

    // 1. Simpan Pesan dari Pelanggan
    $stmt = $pdo->prepare("
        INSERT INTO chats (order_number, sender_type, sender_name, customer_phone, message)
        VALUES (:order_number, :sender_type, :sender_name, :customer_phone, :message)
    ");
    $stmt->execute([
        'order_number'   => $orderNumber,
        'sender_type'    => $senderType,
        'sender_name'    => $senderName,
        'customer_phone' => $customerPhone,
        'message'        => $message
    ]);

    // 2. LOGIKA AI AUTO-RESPONDER
    if ($senderType === 'customer') {
        $aiReply = getAiResponse($message, $senderName);

        $stmtAi = $pdo->prepare("
            INSERT INTO chats (order_number, sender_type, sender_name, customer_phone, message)
            VALUES (:order_number, 'admin', 'AI Assistant IDVISION', :customer_phone, :message)
        ");
        $stmtAi->execute([
            'order_number'   => $orderNumber,
            'customer_phone' => $customerPhone,
            'message'        => $aiReply
        ]);
    }

    echo json_encode(['status' => 'success']);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

// FUNGSI LOGIKA BOT AI CERDAS & BERSAHABAT
function getAiResponse($msg, $name) {
    $lowerMsg = strtolower($msg);

    // 1. STOK / KATALOG / KACAMATA
    if (strpos($lowerMsg, 'stok') !== false || strpos($lowerMsg, 'katalog') !== false || strpos($lowerMsg, 'kacamata') !== false || strpos($lowerMsg, 'frame') !== false || strpos($lowerMsg, 'lensa') !== false) {
        return "Halo Kak {$name}! 🕶️ Koleksi frame & lensa kacamata kami selalu update. Kakak bisa langsung cek pilihan terlengkap di menu Katalog Produk. Jika cari model khusus, sebutkan nama framenya ya!";
    }

    // 2. LACAK PESANAN / RESI / PENGIRIMAN
    if (strpos($lowerMsg, 'lacak') !== false || strpos($lowerMsg, 'resi') !== false || strpos($lowerMsg, 'pesanan') !== false || strpos($lowerMsg, 'kirim') !== false) {
        return "Halo Kak {$name}! 🚚 Untuk cek posisi kacamata Kakak, silakan masuk ke Akun Saya > Riwayat Pesanan, lalu klik tombol 'Lacak Pesanan' untuk melihat garis progresnya secara langsung!";
    }

    // 3. PEMBAYARAN / COD / MIDTRANS
    if (strpos($lowerMsg, 'bayar') !== false || strpos($lowerMsg, 'cod') !== false || strpos($lowerMsg, 'transfer') !== false || strpos($lowerMsg, 'qris') !== false) {
        return "Kami menerima pembayaran aman via Midtrans (QRIS, Transfer Bank, E-Wallet) dan juga layanan Cash on Delivery (COD) langsung saat barang sampai di tempat Kakak! 💳";
    }

    // 4. MINTA HUBUNGI ADMIN LANGSUNG
    if (strpos($lowerMsg, 'admin') !== false || strpos($lowerMsg, 'bantuan') !== false || strpos($lowerMsg, 'manusia') !== false || strpos($lowerMsg, 'cs') !== false) {
        return "Baik Kak {$name}! 🧑‍💻 Notifikasi telah dikirimkan ke Dashboard Admin IDVISION. Admin manusia kami akan segera membalas percakapan ini secara langsung.";
    }

    // 5. SALAM / SAPAAN
    if (strpos($lowerMsg, 'halo') !== false || strpos($lowerMsg, 'hi') !== false || strpos($lowerMsg, 'pagi') !== false || strpos($lowerMsg, 'siang') !== false || strpos($lowerMsg, 'malam') !== false) {
        return "Halo Kak {$name}! Selamat datang di IDVISION. Ada yang bisa AI bantu jelaskan seputar kacamata, promo, atau pesanan Kakak?";
    }

    // 6. SMART FALLBACK UNTUK PERTANYAAN RANDOM (OUT OF TOPIC)
    return "Wah, pertanyaan yang menarik Kak {$name}! 🤔 Sebagai AI asisten kacamata IDVISION, fokus utama saya adalah membantu seputar produk kacamata, lensa, pembayaran, dan pesanan Kakak.\n\nNamun jangan khawatir, pesan ini sudah masuk ke dashboard Admin dan akan ditanggapi oleh tim CS kami secepatnya ya!";
}
?>