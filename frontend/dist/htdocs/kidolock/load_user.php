<?php
// load_user.php
header('Content-Type: application/json; charset=utf-8');
include __DIR__ . '/../db_config.php'; // file này phải tạo $conn = new mysqli(...)

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "phương thức không hợp lệ"], JSON_UNESCAPED_UNICODE);
    exit;
}

$cpuid = $_POST["cpuid"] ?? '';
$cpuid = trim($cpuid);

if ($cpuid === '') {
    echo json_encode(["status" => "MissingParam"], JSON_UNESCAPED_UNICODE);
    exit;
}

// Đảm bảo charset
@$conn->set_charset('utf8mb4');

$sql = "
    SELECT 
      nd.nguoi_dung_id,
      nd.ma_thiet_bi,
      nd.ma_tre_em,

      -- Thông tin trẻ
      te.ten_tre,
      te.lop,
      te.ngay_sinh,
      te.truong,
      te.gioi_tinh,
      te.ma_phu_huynh,
      te.email_tre_em,

      -- Thông tin phụ huynh
      ph.ma_phu_huynh AS ma_phu_huynh2,
      ph.ten_phu_huynh,
      ph.email_phu_huynh,
      ph.sdt,
      ph.mat_khau
    FROM nguoi_dung AS nd
    LEFT JOIN tre_em AS te 
      ON te.ma_tre_em = nd.ma_tre_em
    LEFT JOIN phu_huynh AS ph 
      ON ph.ma_phu_huynh = te.ma_phu_huynh
    WHERE nd.ma_thiet_bi = ?
    LIMIT 1
";

try {
    if (!$stmt = $conn->prepare($sql)) {
        throw new RuntimeException('Prepare failed: ' . $conn->error);
    }

    $stmt->bind_param('s', $cpuid);
    $stmt->execute();
    $res = $stmt->get_result();

    if (!$res || $res->num_rows === 0) {
        echo json_encode(["status" => "NotFound"], JSON_UNESCAPED_UNICODE);
        $stmt->close();
        $conn->close();
        exit;
    }

    $r = $res->fetch_assoc();
    $stmt->close();
    $conn->close();

    // Map tương đương class User
    $user = [
        "UID"           => (string)($r["nguoi_dung_id"] ?? ""),
        "CPU_Id"        => (string)($r["ma_thiet_bi"] ?? ""),
        "IsRegistered"  => true,

        // Liên kết trẻ
        "MaTreEm"       => isset($r["ma_tre_em"]) ? (int)$r["ma_tre_em"] : null,
        "TenTre"        => (string)($r["ten_tre"] ?? ""),
        "Lop"           => (string)($r["lop"] ?? ""),
        "NgaySinh"      => (string)($r["ngay_sinh"] ?? ""),
        "Truong"        => (string)($r["truong"] ?? ""),
        "GioiTinh"      => (string)($r["gioi_tinh"] ?? ""),
        "EmailTreEm"    => (string)($r["email_tre_em"] ?? ""),

        // Liên kết phụ huynh
        "MaPhuHuynh"    => isset($r["ma_phu_huynh2"]) ? (int)$r["ma_phu_huynh2"] : null,
        "TenPhuHuynh"   => (string)($r["ten_phu_huynh"] ?? ""),
        "Email"         => (string)($r["email_phu_huynh"] ?? ""),
        "SDT"           => (string)($r["sdt"] ?? ""),
        "MatKhau"       => (string)($r["mat_khau"] ?? "")
    ];

    echo json_encode(["status" => "OK", "user_data" => $user], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log("LoadUser DB Error: " . $e->getMessage());
    echo json_encode(["status" => "DBError"], JSON_UNESCAPED_UNICODE);
}
