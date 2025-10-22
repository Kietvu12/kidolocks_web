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
    SELECT * 
    FROM goi_dich_vu
    WHERE nguoi_dung_id = ? AND ma_thiet_bi = ?
    ORDER BY ngay_ket_thuc DESC
    LIMIT 1
";

try {
    if (!$stmt = $conn->prepare($sql)) {
        throw new RuntimeException("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ss", $userId, $maThietBi);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res && $row = $res->fetch_assoc()) {
        $goi = [
            "Id"                  => (int)$row["id"],
            "MaThietBi"           => $row["ma_thiet_bi"],
            "NguoiDungId"         => $row["nguoi_dung_id"],
            "NgayBatDau"          => $row["ngay_bat_dau"],
            "NgayKetThuc"         => $row["ngay_ket_thuc"],
            "Gia"                 => isset($row["gia"]) ? (float)$row["gia"] : 0,
            "TrangThai"           => $row["trang_thai"],
            "PhuongThucThanhToan" => $row["phuong_thuc_thanh_toan"],
            "MaGiaoDich"          => $row["ma_giao_dich"]
        ];

        echo json_encode(["status" => "OK", "goi_dich_vu" => $goi], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["status" => "NotFound"], JSON_UNESCAPED_UNICODE);
    }

    $stmt->close();
    $conn->close();

} catch (Throwable $e) {
    error_log("LoadByUserAndDevice error: " . $e->getMessage());
    echo json_encode(["status" => "DBError"], JSON_UNESCAPED_UNICODE);
}
