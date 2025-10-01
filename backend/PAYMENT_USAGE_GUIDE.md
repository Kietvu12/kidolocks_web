# Hướng Dẫn Sử Dụng Hệ Thống Thanh Toán VNPay

## Tổng Quan

Hệ thống đã được tích hợp VNPay để xử lý thanh toán gói dịch vụ với luồng hoạt động:

1. **Phụ huynh mua gói** → Tạo thanh toán VNPay
2. **Thanh toán thành công** → Gói chuyển sang trạng thái "CHUA_GAN_THIET_BI"
3. **Gán gói cho thiết bị** → Kích hoạt sử dụng

## Cài Đặt

### 1. Chạy Migration

```bash
mysql -u username -p database_name < backend/migrations/add_payment_integration.sql
```

### 2. Cấu Hình Environment Variables

Thêm vào file `.env`:

```env
# VNPay Configuration
VNP_TMN_CODE=DHXDTEST
VNP_HASH_SECRET=00N0EYXHIRGRWYSVYU2J5YJQFKINETWE
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_RETURN_URL=http://localhost:7000/api/payment/vnpay-return
```

## API Endpoints

### 1. Tạo Thanh Toán

**POST** `/api/payment/create`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "phu_huynh_id": 10,
  "thong_tin_goi_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tạo thanh toán thành công",
  "data": {
    "payment_url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...",
    "order_id": "KIDLOCK_20250127123456_10",
    "amount": 500000,
    "package_name": "Gói 1 năm",
    "goi_dich_vu_id": 25
  }
}
```

### 2. Callback VNPay (Webhook)

**GET** `/api/payment/vnpay-return`

VNPay sẽ tự động gọi endpoint này sau khi thanh toán.

**Response Success:**
```json
{
  "success": true,
  "message": "Thanh toán thành công",
  "data": {
    "order_id": "KIDLOCK_20250127123456_10",
    "amount": 500000,
    "package_name": "Gói 1 năm",
    "status": "SUCCESS",
    "goi_dich_vu_id": 25
  }
}
```

### 3. Lấy Danh Sách Gói Đã Mua

**GET** `/api/payment/purchased/:phu_huynh_id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 25,
      "phu_huynh_id": 10,
      "thong_tin_goi_id": 1,
      "gia": 500000,
      "trang_thai": "CHUA_GAN_THIET_BI",
      "ngay_mua": "2025-01-27T12:34:56.000Z",
      "vnp_txn_ref": "KIDLOCK_20250127123456_10",
      "thongTinGoi": {
        "id": 1,
        "ten": "Gói 1 năm",
        "thoi_han_thang": 12
      }
    }
  ]
}
```

### 4. Lấy Gói Chưa Gán Thiết Bị

**GET** `/api/payment/unassigned/:phu_huynh_id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:** Tương tự endpoint trên nhưng chỉ trả về gói có `trang_thai = 'CHUA_GAN_THIET_BI'`

### 5. Gán Gói Cho Thiết Bị

**POST** `/api/payment/assign`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "goi_dich_vu_id": 25,
  "ma_thiet_bi": "BFEBFBFF000B06A2YX06SB9V"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gán gói cho thiết bị thành công",
  "data": {
    "goi_dich_vu_id": 25,
    "ma_thiet_bi": "BFEBFBFF000B06A2YX06SB9V",
    "ngay_bat_dau": "2025-01-27T12:34:56.000Z",
    "ngay_ket_thuc": "2026-01-27T12:34:56.000Z",
    "trang_thai": "DANG_HOAT_DONG"
  }
}
```

## Trạng Thái Gói

- `CHUA_THANH_TOAN`: Đã tạo nhưng chưa thanh toán
- `CHUA_GAN_THIET_BI`: Đã thanh toán, chờ gán thiết bị
- `DANG_HOAT_DONG`: Đang sử dụng
- `HET_HAN`: Hết hạn
- `HUY`: Bị hủy

## Luồng Hoạt Động Frontend

### 1. Trang Mua Gói

```javascript
// Khi user click "Mua ngay"
const createPayment = async (packageId) => {
  try {
    const response = await fetch('/api/payment/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phu_huynh_id: currentUser.id,
        thong_tin_goi_id: packageId
      })
    });
    
    const result = await response.json();
    if (result.success) {
      // Redirect to VNPay
      window.location.href = result.data.payment_url;
    }
  } catch (error) {
    console.error('Error creating payment:', error);
  }
};
```

### 2. Trang Quản Lý Gói

```javascript
// Lấy danh sách gói chưa gán
const getUnassignedPackages = async () => {
  try {
    const response = await fetch(`/api/payment/unassigned/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const result = await response.json();
    if (result.success) {
      setUnassignedPackages(result.data);
    }
  } catch (error) {
    console.error('Error getting unassigned packages:', error);
  }
};

// Gán gói cho thiết bị
const assignPackage = async (packageId, deviceId) => {
  try {
    const response = await fetch('/api/payment/assign', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        goi_dich_vu_id: packageId,
        ma_thiet_bi: deviceId
      })
    });
    
    const result = await response.json();
    if (result.success) {
      alert('Gán gói thành công!');
      getUnassignedPackages(); // Refresh list
    }
  } catch (error) {
    console.error('Error assigning package:', error);
  }
};
```

## Xử Lý Lỗi

### 1. Thanh Toán Thất Bại

```javascript
// Trong callback URL
if (result.success === false) {
  // Hiển thị thông báo lỗi
  alert(`Thanh toán thất bại: ${result.message}`);
  // Redirect về trang gói
  window.location.href = '/packages';
}
```

### 2. Gán Gói Thất Bại

```javascript
// Khi gán gói
if (result.success === false) {
  if (result.message.includes('Không tìm thấy')) {
    alert('Thiết bị không tồn tại');
  } else if (result.message.includes('không thể gán')) {
    alert('Gói này đã được gán hoặc không hợp lệ');
  }
}
```

## Testing

### 1. Test Thanh Toán

Sử dụng thông tin test của VNPay:
- **Thẻ test**: 9704198526191432198
- **Ngày hết hạn**: 03/07
- **OTP**: 123456

### 2. Test Callback

Có thể test callback bằng cách gọi trực tiếp:
```bash
curl "http://localhost:7000/api/payment/vnpay-return?vnp_ResponseCode=00&vnp_TxnRef=KIDLOCK_20250127123456_10&..."
```

## Lưu Ý Quan Trọng

1. **Bảo mật**: Không bao giờ expose VNPay secret key
2. **HTTPS**: Production phải sử dụng HTTPS
3. **Webhook**: Đảm bảo callback URL accessible từ internet
4. **Logging**: Log tất cả giao dịch để debug
5. **Timeout**: Xử lý timeout khi gọi VNPay API

## Troubleshooting

### 1. Lỗi Signature

- Kiểm tra `VNP_HASH_SECRET` có đúng không
- Kiểm tra encoding UTF-8
- Kiểm tra sort order của parameters

### 2. Lỗi Callback

- Kiểm tra `VNP_RETURN_URL` có đúng không
- Kiểm tra server có accessible từ internet không
- Kiểm tra firewall settings

### 3. Lỗi Database

- Chạy migration đầy đủ
- Kiểm tra foreign key constraints
- Kiểm tra indexes
