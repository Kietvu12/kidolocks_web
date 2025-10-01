# Hướng dẫn sử dụng Payment Callback

## Tổng quan
Tính năng Payment Callback cho phép xử lý kết quả thanh toán VNPay và hiển thị popup thông báo thành công với animation đẹp mắt.

## Các file đã được tạo/cập nhật

### Frontend
1. **`frontend/src/components/SuccessPopup.jsx`** - Component popup với animation
2. **`frontend/src/pages/PaymentCallbackPage.jsx`** - Trang xử lý callback từ VNPay
3. **`frontend/src/App.jsx`** - Thêm route `/payment/callback`

### Backend
1. **`backend/controllers/PaymentController.js`** - Cập nhật để redirect về frontend
2. **`backend/env.example`** - Thêm biến `FRONTEND_URL`

## Cách hoạt động

### Luồng thanh toán:
1. User click "Thanh Toán VNPay" → Redirect đến VNPay
2. User thanh toán trên VNPay
3. VNPay redirect về backend: `http://localhost:7000/api/payment/vnpay-return`
4. Backend xử lý kết quả và redirect về frontend: `http://localhost:5173/payment/callback`
5. Frontend hiển thị popup thành công với animation

### Cấu hình môi trường:
```env
# Backend (.env)
FRONTEND_URL=http://localhost:5173
```

## Tính năng của SuccessPopup

### Animation:
- Fade in/out với backdrop
- Scale và rotate animation cho icon
- Smooth transition cho tất cả elements
- Decorative animated elements

### Thông tin hiển thị:
- Icon thành công với gradient background
- Thông báo "Thanh toán thành công!"
- Chi tiết đơn hàng (mã đơn, gói dịch vụ, số tiền)
- Nút "Xác nhận" để đóng popup và về trang chủ

### Responsive:
- Hoạt động tốt trên mobile và desktop
- Animation mượt mà trên mọi thiết bị

## Xử lý lỗi

### Các trường hợp lỗi:
1. **Thanh toán thất bại** - Hiển thị trang lỗi với nút về trang chủ
2. **Lỗi server** - Redirect với parameter `error=server_error`
3. **Lỗi xử lý** - Try-catch để bắt lỗi và hiển thị thông báo phù hợp

## Testing

### Test thanh toán thành công:
1. Tạo payment với VNPay sandbox
2. Thanh toán thành công (ResponseCode = '00')
3. Kiểm tra redirect về `/payment/callback`
4. Kiểm tra popup hiển thị với thông tin đúng

### Test thanh toán thất bại:
1. Tạo payment với VNPay sandbox
2. Hủy thanh toán hoặc thanh toán thất bại
3. Kiểm tra redirect về `/payment/callback`
4. Kiểm tra trang lỗi hiển thị

## Customization

### Thay đổi animation:
- Sửa `transition-all duration-300` trong SuccessPopup
- Thay đổi `scale-100`, `opacity-100` cho các trạng thái khác nhau

### Thay đổi màu sắc:
- Gradient background: `linear-gradient(to right, #3b82f6, #2563eb)`
- Success icon: `linear-gradient(to right, #10b981, #059669)`

### Thay đổi thông tin hiển thị:
- Sửa `orderData` object trong PaymentCallbackPage
- Thêm API call để lấy thông tin chi tiết gói dịch vụ

## Lưu ý quan trọng

1. **URL Redirect**: Đảm bảo VNPay được cấu hình đúng `VNP_RETURN_URL`
2. **Environment Variables**: Cập nhật `.env` với `FRONTEND_URL` chính xác
3. **CORS**: Backend cần cho phép redirect đến frontend
4. **Security**: Validate signature từ VNPay trước khi redirect

## Troubleshooting

### Popup không hiển thị:
- Kiểm tra console log trong PaymentCallbackPage
- Kiểm tra URL parameters từ VNPay
- Kiểm tra state `showPopup` và `loading`

### Redirect không hoạt động:
- Kiểm tra biến môi trường `FRONTEND_URL`
- Kiểm tra VNPay configuration
- Kiểm tra network tab trong browser

### Animation không mượt:
- Kiểm tra CSS transitions
- Kiểm tra browser compatibility
- Kiểm tra performance với DevTools
