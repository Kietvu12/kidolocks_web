-- Migration script để thêm các tính năng authentication
-- Chạy script này để cập nhật database

-- 1. Thêm trường la_admin vào bảng phu_huynh
ALTER TABLE phu_huynh 
ADD COLUMN la_admin BOOLEAN NOT NULL DEFAULT FALSE 
COMMENT 'Phân quyền admin (true: admin, false: user thường)';

-- 2. Tạo bảng otp_verification để lưu trữ OTP
CREATE TABLE otp_verification (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Mã ID',
    phone VARCHAR(15) NOT NULL COMMENT 'Số điện thoại',
    otp_code VARCHAR(6) NOT NULL COMMENT 'Mã OTP',
    purpose ENUM('registration', 'login', 'reset_password') NOT NULL COMMENT 'Mục đích sử dụng OTP',
    is_used BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Đã sử dụng chưa',
    expires_at DATETIME NOT NULL COMMENT 'Thời gian hết hạn',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    used_at DATETIME NULL COMMENT 'Thời gian sử dụng',
    
    INDEX idx_phone_purpose (phone, purpose),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_used (is_used)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu trữ mã OTP xác thực';

-- 3. Tạo admin user mặc định (tùy chọn)
-- Uncomment dòng dưới nếu muốn tạo admin user mặc định
-- INSERT INTO phu_huynh (email_phu_huynh, sdt, ten_phu_huynh, mat_khau, la_admin) 
-- VALUES ('admin@kidlock.com', '0123456789', 'Administrator', 'encrypted_password_here', TRUE);

-- 4. Tạo cleanup job để xóa OTP hết hạn (tùy chọn)
-- Có thể tạo event hoặc cron job để chạy định kỳ:
-- DELETE FROM otp_verification WHERE expires_at < NOW() AND is_used = FALSE;

-- Kiểm tra kết quả
SELECT 'Migration completed successfully!' as status;
SELECT COUNT(*) as total_phu_huynh FROM phu_huynh;
SELECT COUNT(*) as total_otp_records FROM otp_verification;
