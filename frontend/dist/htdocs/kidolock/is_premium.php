<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/../db_config.php'; // $conn = new mysqli(...)

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "InvalidMethod"], JSON_UNESCAPED_UNICODE);
    exit;
}

$userId = $_POST["nguoi_dung_id"] ?? '';
$maThietBi = $_POST["ma_thiet_bi"] ?? '';

if ($userId === '' || $maThietBi === '') {
    echo json_encode(["status" => "MissingParam"], JSON_UNESCAPED_UNICODE);
    exit;
}

@$conn->set_charset('utf8mb4');

$sql = "
    SELECT ngay_ket_thuc, trang_thai
    FROM goi_dich_vu
    WHERE nguoi_dung_id = ? AND ma_thiet_bi = ?
    ORDER BY (trang_thai = 'DANG_HOAT_DONG' AND ngay_ket_thuc >= UTC_TIMESTAMP()) DESC,
             ngay_ket_thuc DESC
    LIMIT 1
";

try {
    if (!$stmt = $conn->prepare($sql)) {
        throw new RuntimeException("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ss", $userId, $maThietBi);
    $stmt->execute();
    $res = $stmt->get_result();

    if (!$res || $res->num_rows === 0) {
        // Không có gói → Free
        echo json_encode(["status" => "OK", "isPremium" => false], JSON_UNESCAPED_UNICODE);
        $stmt->close();
        $conn->close();
        exit;
    }

    $row = $res->fetch_assoc();
    $stmt->close();
    $conn->close();

    $trangThai = $row["trang_thai"];
    $ngayKetThuc = $row["ngay_ket_thuc"];

    $isPremium = false;
    if ($trangThai === "DANG_HOAT_DONG" && !empty($ngayKetThuc)) {
        $dt = new DateTime($ngayKetThuc, new DateTimeZone("UTC"));
        $now = new DateTime("now", new DateTimeZone("UTC"));
        if ($dt >= $now) {
            $isPremium = true;
        }
    }

    echo json_encode([
        "status"    => "OK",
        "isPremium" => $isPremium,
        "trang_thai" => $trangThai,
        "ngay_ket_thuc" => $ngayKetThuc
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log("IsPremium error: " . $e->getMessage());
    echo json_encode(["status" => "DBError"], JSON_UNESCAPED_UNICODE);
}
