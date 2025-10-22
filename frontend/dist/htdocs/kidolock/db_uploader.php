<?php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/../db_config.php'; // $conn = new mysqli(...)

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "InvalidMethod"], JSON_UNESCAPED_UNICODE);
    exit;
}

// Nhận dữ liệu từ client (JSON hoặc POST thường)
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    $data = $_POST; // fallback nếu gửi form-data
}

$tablename    = $data["tablename"] ?? '';
$columnNames  = $data["columnNames"] ?? [];
$values       = $data["values"] ?? [];
$maThietBi    = $data["ma_thiet_bi"] ?? '';
$nguoiDungId  = $data["nguoi_dung_id"] ?? '';

if ($tablename === '' || $maThietBi === '' || $nguoiDungId === '' || count($columnNames) !== count($values)) {
    echo json_encode(["status" => "MissingParam"], JSON_UNESCAPED_UNICODE);
    exit;
}

@$conn->set_charset('utf8mb4');

try {
    // 1. Kiểm tra tồn tại
    $checkSql = "SELECT COUNT(*) AS cnt FROM $tablename WHERE ma_thiet_bi = ? AND nguoi_dung_id = ?";
    $stmt = $conn->prepare($checkSql);
    $stmt->bind_param("ss", $maThietBi, $nguoiDungId);
    $stmt->execute();
    $res = $stmt->get_result();
    $row = $res->fetch_assoc();
    $exists = ($row["cnt"] > 0);
    $stmt->close();

    if ($exists) {
        // 2. UPDATE
        $setParts = [];
        foreach ($columnNames as $col) {
            $setParts[] = "$col = ?";
        }
        $setClause = implode(", ", $setParts);

        $updateSql = "UPDATE $tablename SET $setClause WHERE ma_thiet_bi = ? AND nguoi_dung_id = ?";
        $stmt = $conn->prepare($updateSql);

        // bind params
        $types = str_repeat("s", count($values) + 2); // tất cả string
        $params = array_merge($values, [$maThietBi, $nguoiDungId]);
        $stmt->bind_param($types, ...$params);

        $stmt->execute();
        $affected = $stmt->affected_rows;
        $stmt->close();

        echo json_encode(["status" => "Updated", "affected" => $affected], JSON_UNESCAPED_UNICODE);
    } else {
        // 3. INSERT
        $insertColumns = array_merge(["nguoi_dung_id", "ma_thiet_bi"], $columnNames);
        $placeholders  = implode(", ", array_fill(0, count($insertColumns), "?"));
        $cols          = implode(", ", $insertColumns);

        $insertSql = "INSERT INTO $tablename ($cols) VALUES ($placeholders)";
        $stmt = $conn->prepare($insertSql);

        $params = array_merge([$nguoiDungId, $maThietBi], $values);
        $types = str_repeat("s", count($params));
        $stmt->bind_param($types, ...$params);

        $stmt->execute();
        $insertId = $stmt->insert_id;
        $stmt->close();

        echo json_encode(["status" => "Inserted", "id" => $insertId], JSON_UNESCAPED_UNICODE);
    }

    $conn->close();
} catch (Throwable $e) {
    error_log("DB_Uploader error: " . $e->getMessage());
    echo json_encode(["status" => "DBError"], JSON_UNESCAPED_UNICODE);
}
