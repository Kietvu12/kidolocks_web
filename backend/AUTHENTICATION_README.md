# Hướng dẫn Authentication System

## Tổng quan
Hệ thống authentication đã được tích hợp với các tính năng sau:
- Đăng nhập/đăng ký với mật khẩu
- Đăng nhập/đăng ký với OTP qua SMS
- Reset password với OTP
- JWT token authentication
- Phân quyền admin/user

## Cấu hình

### 1. Environment Variables
Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

Cập nhật các giá trị trong `.env`:
- `JWT_SECRET`: Secret key cho JWT (nên thay đổi trong production)
- `SPEEDSMS_API_TOKEN`: Token API của SpeedSMS
- `ENCRYPTION_KEY`: Key để mã hóa mật khẩu

### 2. Database Migration
Thêm trường `la_admin` vào bảng `phu_huynh`:
```sql
ALTER TABLE phu_huynh ADD COLUMN la_admin BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Phân quyền admin (true: admin, false: user thường)';
```

## API Endpoints

### Authentication Routes

#### 1. Gửi OTP đăng ký
```
POST /api/auth/send-registration-otp
Body: { "sdt": "0912345678" }
```

#### 2. Đăng ký với OTP
```
POST /api/auth/register
Body: {
  "email_phu_huynh": "user@example.com",
  "sdt": "0912345678",
  "ten_phu_huynh": "Nguyễn Văn A",
  "mat_khau": "password123",
  "otp": "123456"
}
```

#### 3. Gửi OTP đăng nhập
```
POST /api/auth/send-login-otp
Body: { "sdt": "0912345678" }
```

#### 4. Đăng nhập với OTP
```
POST /api/auth/login-otp
Body: {
  "sdt": "0912345678",
  "otp": "123456"
}
```

#### 5. Đăng nhập với mật khẩu
```
POST /api/auth/login
Body: {
  "email_phu_huynh": "user@example.com",
  "mat_khau": "password123"
}
```

#### 6. Gửi OTP reset password
```
POST /api/auth/send-reset-otp
Body: { "sdt": "0912345678" }
```

#### 7. Reset password với OTP
```
POST /api/auth/reset-password
Body: {
  "sdt": "0912345678",
  "otp": "123456",
  "mat_khau_moi": "newpassword123"
}
```

#### 8. Lấy thông tin user hiện tại
```
GET /api/auth/me
Headers: { "Authorization": "Bearer <token>" }
```

## Frontend Usage

### 1. Import API Service
```javascript
import apiService from './services/api';
```

### 2. Đăng ký
```javascript
// Gửi OTP
await apiService.sendRegistrationOTP('0912345678');

// Đăng ký với OTP
const response = await apiService.registerPhuHuynh({
  email_phu_huynh: 'user@example.com',
  sdt: '0912345678',
  ten_phu_huynh: 'Nguyễn Văn A',
  mat_khau: 'password123',
  otp: '123456'
});
```

### 3. Đăng nhập
```javascript
// Đăng nhập với mật khẩu
const response = await apiService.loginPhuHuynh('user@example.com', 'password123');

// Hoặc đăng nhập với OTP
await apiService.sendLoginOTP('0912345678');
const response = await apiService.loginWithOTP('0912345678', '123456');
```

### 4. Kiểm tra authentication
```javascript
// Kiểm tra đã đăng nhập chưa
if (apiService.isAuthenticated()) {
  console.log('User đã đăng nhập');
}

// Kiểm tra quyền admin
if (apiService.isAdmin()) {
  console.log('User là admin');
}

// Lấy thông tin user
const user = apiService.getUser();
console.log(user);
```

### 5. Đăng xuất
```javascript
apiService.logout();
```

## Security Features

### 1. JWT Token
- Token được lưu trong localStorage
- Tự động thêm vào header `Authorization: Bearer <token>`
- Tự động redirect về login khi token hết hạn

### 2. Password Encryption
- Mật khẩu được mã hóa bằng AES-256-CBC
- Sử dụng PBKDF2 với salt cố định
- Tương thích với logic VB.NET

### 3. OTP Security
- OTP 6 chữ số
- Thời gian hết hạn 5 phút (cần implement trong database)
- Gửi qua SpeedSMS

### 4. Route Protection
- Tất cả routes (trừ auth và public) cần authentication
- Routes admin cần `requireAdmin` middleware
- Tự động clear auth data khi token invalid

## Admin Features

### 1. Tạo admin user
```sql
UPDATE phu_huynh SET la_admin = TRUE WHERE email_phu_huynh = 'admin@example.com';
```

### 2. Admin-only endpoints
- `/api/phu-huynh/*` - Quản lý phụ huynh
- `/api/tre-em` - Xem tất cả trẻ em
- `/api/goi/*` - Quản lý gói dịch vụ
- `/api/drill-down` - Báo cáo drill-down

## Testing

### 1. Test OTP (Development)
Trong development, OTP sẽ được trả về trong response để test:
```json
{
  "success": true,
  "message": "Mã OTP đã được gửi đến số điện thoại của bạn",
  "data": {
    "phone": "0912345678",
    "otp": "123456"
  }
}
```

### 2. Test với Postman
1. Import collection từ file `postman_collection.json`
2. Test các endpoints authentication
3. Sử dụng token từ response để test protected endpoints

## Troubleshooting

### 1. SMS không gửi được
- Kiểm tra `SPEEDSMS_API_TOKEN` trong `.env`
- Kiểm tra số điện thoại format (84xxxxxxxxx)
- Kiểm tra balance SpeedSMS account

### 2. JWT token invalid
- Kiểm tra `JWT_SECRET` trong `.env`
- Kiểm tra token format trong localStorage
- Clear localStorage và đăng nhập lại

### 3. Database connection
- Kiểm tra database connection
- Chạy migration để thêm trường `la_admin`
- Kiểm tra Sequelize models

## Production Notes

1. **Security**:
   - Thay đổi `JWT_SECRET` và `ENCRYPTION_KEY`
   - Không trả về OTP trong response
   - Implement rate limiting cho OTP

2. **Performance**:
   - Cache JWT verification
   - Optimize database queries
   - Implement Redis cho session

3. **Monitoring**:
   - Log authentication events
   - Monitor SMS delivery
   - Track failed login attempts
