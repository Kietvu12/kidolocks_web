<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/../db_config.php'; // $conn = new mysqli(...)

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "InvalidMethod"], JSON_UNESCAPED_UNICODE);
    exit;
}

// Nhận dữ liệu từ client
$cpu  = $_POST["ma_thiet_bi"] ?? '';
$uid  = $_POST["nguoi_dung_id"] ?? '';
$loai = $_POST["loai"] ?? '';
$ten  = $_POST["ten_chuong_trinh"] ?? '';
$tg   = $_POST["thoi_gian_gui"] ?? '';
$duyet = $_POST["duoc_phe_duyet"] ?? null;

if ($cpu === '' || $uid === '' || $loai === '' || $ten === '') {
    echo json_encode(["status" => "MissingParam"], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($tg === '') {
    $tg = date("Y-m-d H:i:s");
}

@$conn->set_charset('utf8mb4');

$sql = "
    INSERT INTO yeu_cau_truy_cap
    (ma_thiet_bi, nguoi_dung_id, loai, ten_chuong_trinh, thoi_gian_gui, duoc_phe_duyet)
    VALUES (?, ?, ?, ?, ?, ?)
";

try {
    if (!$stmt = $conn->prepare($sql)) {
        throw new RuntimeException("Prepare failed: " . $conn->error);
    }

    // cho phép NULL ở duoc_phe_duyet
    if ($duyet === '' || $duyet === null) {
        $duyet = null;
    }

    $stmt->bind_param("ssssss", $cpu, $uid, $loai, $ten, $tg, $duyet);
    $stmt->execute();

    $insertId = $stmt->insert_id;

    echo json_encode([
        "status" => "OK",
        "id" => $insertId
    ], JSON_UNESCAPED_UNICODE);

    $stmt->close();
    $conn->close();
} catch (Throwable $e) {
    error_log("YeuCauTruyCap_Insert error: " . $e->getMessage());
    echo json_encode(["status" => "DBError"], JSON_UNESCAPED_UNICODE);
}
