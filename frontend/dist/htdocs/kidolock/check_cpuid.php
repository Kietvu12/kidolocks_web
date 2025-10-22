<?php
include '../db_config.php'; // file này phải có $conn = new mysqli(...);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cpuid = $_POST["cpuid"];

    // Kiểm tra tham số
    if (empty($cpuid)) {
        echo json_encode(["status" => "thiếu cpuid"]);
        exit;
    }

    // Câu lệnh SQL kiểm tra tồn tại
    $sql = "SELECT * FROM nguoi_dung WHERE ma_thiet_bi = '$cpuid'";
    $result = $conn->query($sql);

    if ($result === false) {
        // Lỗi SQL
        echo json_encode(["status" => "lỗi truy vấn"]);
    } elseif ($result->num_rows > 0) {
        // Tìm thấy cpuid
        echo json_encode(["status" => "OK"]);
    } else {
        // Không tìm thấy
        echo json_encode(["status" => "ChuaDangKy"]);
    }

    $conn->close();
} else {
    echo json_encode(["status" => "phương thức không hợp lệ"]);
}
?>
