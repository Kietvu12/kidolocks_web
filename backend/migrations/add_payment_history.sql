-- Migration: Add detailed payment history table
-- Date: 2025-01-27
-- Description: Create comprehensive payment tracking system

-- Create payment_history table for detailed transaction tracking
CREATE TABLE `payment_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phu_huynh_id` int(11) NOT NULL COMMENT 'ID của phụ huynh thực hiện thanh toán',
  `thong_tin_goi_id` int(11) NOT NULL COMMENT 'ID gói được mua',
  `so_tien` decimal(15,2) NOT NULL COMMENT 'Số tiền thanh toán',
  `phuong_thuc_thanh_toan` enum('VNPAY','MOMO','BANKING','CASH') NOT NULL COMMENT 'Phương thức thanh toán',
  `ma_giao_dich` varchar(100) DEFAULT NULL COMMENT 'Mã giao dịch từ gateway',
  `trang_thai` enum('PENDING','SUCCESS','FAILED','CANCELLED') NOT NULL DEFAULT 'PENDING' COMMENT 'Trạng thái giao dịch',
  `thoi_gian_tao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Thời gian tạo giao dịch',
  `thoi_gian_hoan_thanh` datetime DEFAULT NULL COMMENT 'Thời gian hoàn thành giao dịch',
  `ghi_chu` text DEFAULT NULL COMMENT 'Ghi chú thêm',
  `metadata` json DEFAULT NULL COMMENT 'Dữ liệu bổ sung từ gateway',
  PRIMARY KEY (`id`),
  KEY `idx_phu_huynh_id` (`phu_huynh_id`),
  KEY `idx_thong_tin_goi_id` (`thong_tin_goi_id`),
  KEY `idx_trang_thai` (`trang_thai`),
  KEY `idx_thoi_gian_tao` (`thoi_gian_tao`),
  CONSTRAINT `fk_payment_history_phu_huynh` FOREIGN KEY (`phu_huynh_id`) REFERENCES `phu_huynh` (`ma_phu_huynh`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_payment_history_thong_tin_goi` FOREIGN KEY (`thong_tin_goi_id`) REFERENCES `thong_tin_goi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lịch sử thanh toán chi tiết';

-- Create package_assignments table to track package assignments to devices
CREATE TABLE `package_assignments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goi_dich_vu_id` int(11) NOT NULL COMMENT 'ID gói dịch vụ',
  `ma_thiet_bi` varchar(50) NOT NULL COMMENT 'Mã thiết bị được gán',
  `nguoi_dung_id` varchar(50) NOT NULL COMMENT 'ID người dùng của thiết bị',
  `ngay_gán` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Ngày gán gói cho thiết bị',
  `ngay_bat_dau` datetime NOT NULL COMMENT 'Ngày bắt đầu sử dụng',
  `ngay_ket_thuc` datetime DEFAULT NULL COMMENT 'Ngày kết thúc (tính từ ngay_bat_dau + thời hạn)',
  `trang_thai` enum('ACTIVE','EXPIRED','CANCELLED') NOT NULL DEFAULT 'ACTIVE' COMMENT 'Trạng thái gói',
  `ghi_chu` text DEFAULT NULL COMMENT 'Ghi chú',
  PRIMARY KEY (`id`),
  KEY `idx_goi_dich_vu_id` (`goi_dich_vu_id`),
  KEY `idx_ma_thiet_bi` (`ma_thiet_bi`),
  KEY `idx_nguoi_dung_id` (`nguoi_dung_id`),
  KEY `idx_trang_thai` (`trang_thai`),
  CONSTRAINT `fk_package_assignments_goi_dich_vu` FOREIGN KEY (`goi_dich_vu_id`) REFERENCES `goi_dich_vu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_package_assignments_nguoi_dung` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng theo dõi việc gán gói cho thiết bị';

-- Add trigger to automatically create package assignment when device is assigned
DELIMITER $$
CREATE TRIGGER `tr_goi_dich_vu_assign_device` 
AFTER UPDATE ON `goi_dich_vu`
FOR EACH ROW
BEGIN
    -- If device fields are updated from NULL to actual values, create assignment record
    IF (OLD.ma_thiet_bi IS NULL AND NEW.ma_thiet_bi IS NOT NULL) OR 
       (OLD.nguoi_dung_id IS NULL AND NEW.nguoi_dung_id IS NOT NULL) OR
       (OLD.ngay_bat_dau IS NULL AND NEW.ngay_bat_dau IS NOT NULL) THEN
        
        INSERT INTO `package_assignments` (
            `goi_dich_vu_id`, 
            `ma_thiet_bi`, 
            `nguoi_dung_id`, 
            `ngay_bat_dau`,
            `ngay_ket_thuc`
        ) VALUES (
            NEW.id,
            NEW.ma_thiet_bi,
            NEW.nguoi_dung_id,
            NEW.ngay_bat_dau,
            DATE_ADD(NEW.ngay_bat_dau, INTERVAL (
                SELECT thoi_han_thang FROM thong_tin_goi WHERE id = NEW.thong_tin_goi_id
            ) MONTH)
        );
    END IF;
END$$
DELIMITER ;
