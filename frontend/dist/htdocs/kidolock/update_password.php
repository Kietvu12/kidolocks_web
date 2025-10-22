<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/../db_config.php'; // $conn = new mysqli(...)

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "InvalidMethod"], JSON_UNESCAPED_UNICODE);
    exit;
}

// Lấy tham số từ POST
$pwd = $_POST["mat_khau"] ?? '';
$pid = $_POST["ma_phu_huynh"] ?? '';

if ($pwd === '' || $pid === '') {
    echo json_encode(["status" => "MissingParam"], JSON_UNESCAPED_UNICODE);
    exit;
}

@$conn->set_charset('utf8mb4');

try {
    $sql = "UPDATE phu_huynh
               SET mat_khau = ?
             WHERE ma_phu_huynh = ?
             LIMIT 1";

    if (!$stmt = $conn->prepare($sql)) {
        throw new RuntimeException("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("si", $pwd, $pid); // mật khẩu string, id integer
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "OK"], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["status" => "NoChange"], JSON_UNESCAPED_UNICODE);
    }

    $stmt->close();
    $conn->close();
} catch (Throwable $e) {
    error_log("UpdatePassword error: " . $e->getMessage());
    echo json_encode(["status" => "DBError"], JSON_UNESCAPED_UNICODE);
}
