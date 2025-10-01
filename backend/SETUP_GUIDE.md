# Hướng dẫn Setup Authentication System

## 1. Cài đặt Dependencies

### Backend
```bash
cd backend
yarn install
```

### Frontend
```bash
cd frontend
yarn install
```

## 2. Cấu hình Environment

### Backend
```bash
# Copy file env.example
cp env.example .env

# Cập nhật các giá trị trong .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=kidslock
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

SPEEDSMS_API_TOKEN=your-speedsms-api-token
ENCRYPTION_KEY=your-encryption-key-here
```

## 3. Database Setup

### Chạy Migration
```bash
# Kết nối MySQL và chạy migration script
mysql -u root -p kidslock < migrations/add_auth_features.sql
```

### Hoặc chạy từ Node.js
```bash
# Test connection
yarn test-connection

# Sync database (tạo tables nếu chưa có)
yarn sync-db
```

## 4. Tạo Admin User

### Cách 1: Qua SQL
```sql
-- Thay thế password bằng mật khẩu đã mã hóa
INSERT INTO phu_huynh (email_phu_huynh, sdt, ten_phu_huynh, mat_khau, la_admin) 
VALUES ('admin@kidlock.com', '0123456789', 'Administrator', 'encrypted_password', TRUE);
```

### Cách 2: Qua API (sau khi đã có user thường)
```bash
# Đăng nhập với user thường, sau đó update thành admin
curl -X PUT http://localhost:7000/api/phu-huynh/{id} \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"la_admin": true}'
```

## 5. Test Authentication

### Test Backend API
```bash
# Start backend server
yarn dev

# Test health check
curl http://localhost:7000/api/health

# Test send OTP
curl -X POST http://localhost:7000/api/auth/send-registration-otp \
  -H "Content-Type: application/json" \
  -d '{"sdt": "0123456789"}'

# Test register
curl -X POST http://localhost:7000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email_phu_huynh": "test@example.com",
    "sdt": "0123456789",
    "ten_phu_huynh": "Test User",
    "mat_khau": "password123",
    "otp": "123456"
  }'
```

### Test Frontend
```bash
# Start frontend server
cd frontend
yarn dev

# Mở browser: http://localhost:5173
```

## 6. SpeedSMS Configuration

### Đăng ký tài khoản SpeedSMS
1. Truy cập: https://speedsms.vn/
2. Đăng ký tài khoản
3. Lấy API token từ dashboard
4. Cập nhật `SPEEDSMS_API_TOKEN` trong `.env`

### Test SMS
```bash
# Test gửi SMS
curl -X POST http://localhost:7000/api/auth/send-registration-otp \
  -H "Content-Type: application/json" \
  -d '{"sdt": "0123456789"}'
```

## 7. Security Checklist

### Production Setup
- [ ] Thay đổi `JWT_SECRET` thành giá trị ngẫu nhiên mạnh
- [ ] Thay đổi `ENCRYPTION_KEY` thành giá trị ngẫu nhiên mạnh
- [ ] Không trả về OTP trong API response
- [ ] Cấu hình HTTPS
- [ ] Cấu hình rate limiting cho OTP
- [ ] Cấu hình CORS cho production domain
- [ ] Backup database định kỳ

### Environment Variables
```bash
# Production .env example
NODE_ENV=production
DB_HOST=your-production-db-host
DB_NAME=your-production-db-name
DB_USER=your-production-db-user
DB_PASSWORD=your-strong-db-password

JWT_SECRET=your-super-strong-jwt-secret-key
JWT_EXPIRES_IN=24h

SPEEDSMS_API_TOKEN=your-production-speedsms-token
ENCRYPTION_KEY=your-strong-encryption-key

PORT=7000
```

## 8. Troubleshooting

### Database Connection Issues
```bash
# Test connection
yarn test-connection

# Check MySQL service
sudo systemctl status mysql

# Check database exists
mysql -u root -p -e "SHOW DATABASES;"
```

### SMS Issues
- Kiểm tra `SPEEDSMS_API_TOKEN` có đúng không
- Kiểm tra balance SpeedSMS account
- Kiểm tra format số điện thoại (84xxxxxxxxx)
- Kiểm tra network connection

### JWT Issues
- Kiểm tra `JWT_SECRET` có đúng không
- Kiểm tra token format trong localStorage
- Clear localStorage và đăng nhập lại

### Frontend Issues
- Kiểm tra API_BASE_URL trong `frontend/src/services/api.js`
- Kiểm tra CORS configuration
- Kiểm tra browser console errors

## 9. Development Tips

### Hot Reload
```bash
# Backend với nodemon
yarn dev

# Frontend với Vite
cd frontend && yarn dev
```

### Database Reset
```bash
# Reset database (cẩn thận!)
yarn sync-db --force
```

### Logs
```bash
# Backend logs
tail -f logs/app.log

# Database logs
tail -f /var/log/mysql/error.log
```

## 10. API Documentation

### Authentication Endpoints
- `POST /api/auth/send-registration-otp` - Gửi OTP đăng ký
- `POST /api/auth/register` - Đăng ký với OTP
- `POST /api/auth/send-login-otp` - Gửi OTP đăng nhập
- `POST /api/auth/login-otp` - Đăng nhập với OTP
- `POST /api/auth/login` - Đăng nhập với mật khẩu
- `POST /api/auth/send-reset-otp` - Gửi OTP reset password
- `POST /api/auth/reset-password` - Reset password với OTP
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Protected Endpoints
Tất cả endpoints khác cần JWT token trong header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Admin Only Endpoints
- `/api/phu-huynh/*` - Quản lý phụ huynh
- `/api/tre-em` - Xem tất cả trẻ em
- `/api/goi/*` - Quản lý gói dịch vụ
- `/api/drill-down` - Báo cáo drill-down
