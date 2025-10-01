-- Migration: Add payment integration fields to goi_dich_vu table
-- Date: 2025-01-27
-- Description: Add payment fields and VNPay integration support

-- Add new columns for payment integration
ALTER TABLE `goi_dich_vu` 
ADD COLUMN `phu_huynh_id` int(11) DEFAULT NULL COMMENT 'ID của phụ huynh mua gói',
ADD COLUMN `ngay_mua` datetime DEFAULT NULL COMMENT 'Ngày mua gói',
ADD COLUMN `vnp_txn_ref` varchar(100) DEFAULT NULL COMMENT 'Mã giao dịch VNPay',
ADD COLUMN `vnp_order_info` text DEFAULT NULL COMMENT 'Thông tin đơn hàng VNPay',
ADD COLUMN `vnp_response_code` varchar(10) DEFAULT NULL COMMENT 'Mã phản hồi từ VNPay',
ADD COLUMN `vnp_transaction_status` varchar(20) DEFAULT NULL COMMENT 'Trạng thái giao dịch VNPay';

-- Make device-related fields nullable since packages can be purchased before assignment
ALTER TABLE `goi_dich_vu` 
MODIFY COLUMN `ma_thiet_bi` varchar(50) DEFAULT NULL COMMENT 'Mã thiết bị (nullable until assigned)',
MODIFY COLUMN `nguoi_dung_id` varchar(50) DEFAULT NULL COMMENT 'ID người dùng (nullable until assigned)',
MODIFY COLUMN `ngay_bat_dau` datetime DEFAULT NULL COMMENT 'Ngày bắt đầu sử dụng (nullable until activated)';

-- Update trang_thai enum to include new payment states
ALTER TABLE `goi_dich_vu` 
MODIFY COLUMN `trang_thai` enum('CHUA_THANH_TOAN','CHUA_GAN_THIET_BI','DANG_HOAT_DONG','HET_HAN','HUY') 
NOT NULL DEFAULT 'CHUA_THANH_TOAN' COMMENT 'Trạng thái gói dịch vụ';

-- Add foreign key constraint for phu_huynh_id
ALTER TABLE `goi_dich_vu` 
ADD CONSTRAINT `fk_goi_dich_vu_phu_huynh` 
FOREIGN KEY (`phu_huynh_id`) REFERENCES `phu_huynh` (`ma_phu_huynh`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add indexes for better query performance
ALTER TABLE `goi_dich_vu` 
ADD INDEX `idx_phu_huynh_id` (`phu_huynh_id`),
ADD INDEX `idx_ngay_mua` (`ngay_mua`),
ADD INDEX `idx_vnp_txn_ref` (`vnp_txn_ref`),
ADD INDEX `idx_vnp_response_code` (`vnp_response_code`);

-- Update existing records to have default values
-- For existing records, set phu_huynh_id based on nguoi_dung_id relationship
UPDATE `goi_dich_vu` gd
JOIN `nguoi_dung` nd ON gd.nguoi_dung_id = nd.nguoi_dung_id
JOIN `tre_em` te ON nd.ma_tre_em = te.ma_tre_em
SET gd.phu_huynh_id = te.ma_phu_huynh,
    gd.ngay_mua = gd.ngay_bat_dau,
    gd.trang_thai = 'DANG_HOAT_DONG'
WHERE gd.nguoi_dung_id IS NOT NULL;

-- Add comment to explain the new workflow
ALTER TABLE `goi_dich_vu` 
COMMENT = 'Bảng quản lý gói dịch vụ với tích hợp thanh toán VNPay. Phụ huynh mua gói trước, sau đó gán cho thiết bị cụ thể.';
