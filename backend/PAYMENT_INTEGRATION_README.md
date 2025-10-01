# Tích Hợp Hệ Thống Thanh Toán

## Tổng Quan

Hệ thống đã được cập nhật để hỗ trợ luồng thanh toán hoàn chỉnh với các tính năng:

1. **Phụ huynh mua gói** trước khi gán cho thiết bị cụ thể
2. **Lưu trữ lịch sử thanh toán** chi tiết
3. **Theo dõi việc gán gói** cho thiết bị
4. **Quản lý trạng thái gói** (đang hoạt động, hết hạn, hủy)

## Cấu Trúc Database Mới

### 1. Bảng `goi_dich_vu` (Đã Cập Nhật)

```sql
-- Các trường mới được thêm:
phu_huynh_id     int(11)     -- ID phụ huynh mua gói
ngay_mua         datetime    -- Ngày mua gói

-- Các trường được chuyển thành nullable:
ma_thiet_bi      varchar(50) DEFAULT NULL  -- Chỉ có giá trị khi gán cho thiết bị
nguoi_dung_id    varchar(50) DEFAULT NULL  -- Chỉ có giá trị khi gán cho thiết bị  
ngay_bat_dau     datetime DEFAULT NULL     -- Chỉ có giá trị khi kích hoạt
```

### 2. Bảng `payment_history` (Mới)

```sql
CREATE TABLE payment_history (
    id                      int(11) AUTO_INCREMENT PRIMARY KEY,
    phu_huynh_id           int(11) NOT NULL,           -- Phụ huynh thực hiện thanh toán
    thong_tin_goi_id       int(11) NOT NULL,           -- Gói được mua
    so_tien                decimal(15,2) NOT NULL,     -- Số tiền
    phuong_thuc_thanh_toan enum('VNPAY','MOMO','BANKING','CASH'),
    ma_giao_dich           varchar(100),               -- Mã từ gateway
    trang_thai             enum('PENDING','SUCCESS','FAILED','CANCELLED'),
    thoi_gian_tao          datetime DEFAULT current_timestamp(),
    thoi_gian_hoan_thanh   datetime,
    ghi_chu                text,
    metadata               json                        -- Dữ liệu bổ sung
);
```

### 3. Bảng `package_assignments` (Mới)

```sql
CREATE TABLE package_assignments (
    id              int(11) AUTO_INCREMENT PRIMARY KEY,
    goi_dich_vu_id  int(11) NOT NULL,              -- Liên kết với goi_dich_vu
    ma_thiet_bi     varchar(50) NOT NULL,          -- Thiết bị được gán
    nguoi_dung_id   varchar(50) NOT NULL,          -- Người dùng của thiết bị
    ngay_gán        datetime DEFAULT current_timestamp(),
    ngay_bat_dau    datetime NOT NULL,              -- Ngày bắt đầu sử dụng
    ngay_ket_thuc   datetime,                       -- Ngày kết thúc (tự động tính)
    trang_thai      enum('ACTIVE','EXPIRED','CANCELLED')
);
```

## Luồng Hoạt Động

### Bước 1: Phụ Huynh Mua Gói

```javascript
// 1. Tạo payment_history record
const paymentRecord = {
    phu_huynh_id: 10,
    thong_tin_goi_id: 1,
    so_tien: 500000,
    phuong_thuc_thanh_toan: 'VNPAY',
    trang_thai: 'PENDING'
};

// 2. Tạo goi_dich_vu record (chưa gán thiết bị)
const packageRecord = {
    phu_huynh_id: 10,
    thong_tin_goi_id: 1,
    gia: 500000,
    trang_thai: 'CHUA_KICH_HOAT',  // Trạng thái mới
    ngay_mua: new Date(),
    ma_thiet_bi: null,           // Chưa gán
    nguoi_dung_id: null,         // Chưa gán
    ngay_bat_dau: null           // Chưa kích hoạt
};
```

### Bước 2: Thanh Toán Thành Công

```javascript
// Cập nhật payment_history
UPDATE payment_history 
SET trang_thai = 'SUCCESS', 
    thoi_gian_hoan_thanh = NOW(),
    ma_giao_dich = 'VNPAY_123456'
WHERE id = payment_id;

// Cập nhật goi_dich_vu
UPDATE goi_dich_vu 
SET trang_thai = 'CHUA_GAN_THIET_BI'
WHERE phu_huynh_id = 10 AND thong_tin_goi_id = 1;
```

### Bước 3: Gán Gói Cho Thiết Bị

```javascript
// Phụ huynh chọn thiết bị để gán gói
UPDATE goi_dich_vu 
SET ma_thiet_bi = 'BFEBFBFF000B06A2YX06SB9V',
    nguoi_dung_id = '31c1edc5-a1cf-4687-8e95-629f1717dd21',
    ngay_bat_dau = NOW(),
    trang_thai = 'DANG_HOAT_DONG'
WHERE id = package_id;

// Trigger tự động tạo package_assignments record
```

## API Endpoints Cần Tạo

### 1. Thanh Toán

```javascript
POST /api/payment/create
{
    "phu_huynh_id": 10,
    "thong_tin_goi_id": 1,
    "phuong_thuc_thanh_toan": "VNPAY"
}

POST /api/payment/callback
{
    "ma_giao_dich": "VNPAY_123456",
    "trang_thai": "SUCCESS"
}
```

### 2. Quản Lý Gói

```javascript
GET /api/packages/purchased/:phu_huynh_id
// Lấy danh sách gói đã mua của phụ huynh

POST /api/packages/assign
{
    "goi_dich_vu_id": 25,
    "ma_thiet_bi": "BFEBFBFF000B06A2YX06SB9V"
}
// Gán gói cho thiết bị

GET /api/packages/available/:phu_huynh_id
// Lấy danh sách gói chưa gán thiết bị
```

## Trạng Thái Gói Mới

- `CHUA_KICH_HOAT`: Đã thanh toán nhưng chưa gán thiết bị
- `CHUA_GAN_THIET_BI`: Đã thanh toán, chờ gán thiết bị  
- `DANG_HOAT_DONG`: Đang sử dụng
- `HET_HAN`: Hết hạn
- `HUY`: Bị hủy

## Lợi Ích

1. **Linh hoạt**: Phụ huynh có thể mua gói trước, gán sau
2. **Theo dõi**: Lịch sử thanh toán chi tiết
3. **Quản lý**: Dễ dàng quản lý nhiều gói của một phụ huynh
4. **Báo cáo**: Thống kê doanh thu và sử dụng
5. **Bảo mật**: Tách biệt thông tin thanh toán và sử dụng

## Migration

Chạy các file migration theo thứ tự:

1. `add_payment_integration.sql`
2. `add_payment_history.sql`

```bash
mysql -u username -p database_name < backend/migrations/add_payment_integration.sql
mysql -u username -p database_name < backend/migrations/add_payment_history.sql
```
