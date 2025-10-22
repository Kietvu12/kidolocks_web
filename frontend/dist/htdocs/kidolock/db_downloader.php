<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/../db_config.php'; // $conn = new mysqli(...)

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "InvalidMethod"], JSON_UNESCAPED_UNICODE);
    exit;
}

// Nhận dữ liệu POST hoặc JSON
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!$data) {
    $data = $_POST; // fallback nếu gửi form-data
}

$tableName    = $data["tableName"] ?? '';
$idColumn     = $data["idColumn"] ?? '';
$idValue      = $data["idValue"] ?? '';
$additional   = $data["additionalConditions"] ?? '';
$columnMap    = $data["columnMappings"] ?? null; // dạng: {"TenThuocTinh":"ten_cot_trong_db"}

if ($tableName === '' || $idColumn === '' || $idValue === '') {
    echo json_encode(["status" => "MissingParam"], JSON_UNESCAPED_UNICODE);
    exit;
}

@$conn->set_charset('utf8mb4');

// Chuẩn bị câu SQL
$query = "SELECT * FROM $tableName WHERE $idColumn = ? $additional ORDER BY id DESC LIMIT 1";

try {
    if (!$stmt = $conn->prepare($query)) {
        throw new RuntimeException("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("s", $idValue);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res && $row = $res->fetch_assoc()) {
        // Nếu có columnMappings thì ánh xạ lại key
        if ($columnMap && is_array($columnMap)) {
            foreach ($columnMap as $prop => $dbCol) {
                if (isset($row[$dbCol])) {
                    $row[$prop] = $row[$dbCol];
                }
            }
        }

        echo json_encode([
            "status" => "OK",
            "data"   => $row
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["status" => "NotFound"], JSON_UNESCAPED_UNICODE);
    }

    $stmt->close();
    $conn->close();

} catch (Throwable $e) {
    error_log("DB_Downloader error: " . $e->getMessage());
    echo json_encode(["status" => "DBError"], JSON_UNESCAPED_UNICODE);
}
