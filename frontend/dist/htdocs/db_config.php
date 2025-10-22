<?php
// db_config.php - dùng MySQLi
$host = "127.0.0.1"; // hoặc "localhost"
$port = 3306;
$db   = "kidolocks";
$user = "mcp";
$pass = "ZKdP9LAL8QSAvsE@";

// Kết nối
$conn = new mysqli($host, $user, $pass, $db, $port);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: (" . $conn->connect_errno . ") " . $conn->connect_error);
}

// echo "✅ Kết nối thành công!";
?>
