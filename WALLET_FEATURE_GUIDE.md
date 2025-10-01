# Hướng dẫn tính năng Ví gói

## Tổng quan
Tính năng Ví gói cho phép người dùng xem và quản lý các gói dịch vụ đã mua nhưng chưa được gán cho thiết bị nào (trạng thái `CHUA_GAN_THIET_BI`).

## Các file đã được tạo/cập nhật

### Frontend
1. **`frontend/src/pages/WalletPage.jsx`** - Trang hiển thị ví gói
2. **`frontend/src/components/Navbar.jsx`** - Cập nhật với dropdown menu cho avatar
3. **`frontend/src/App.jsx`** - Thêm route `/wallet`

### Backend
- Sử dụng API endpoint có sẵn: `getUnassignedPackages(phuHuynhId)`

## Cách hoạt động

### Luồng sử dụng:
1. User đăng nhập → Avatar hiển thị trong navbar
2. Click vào avatar → Dropdown menu xuất hiện
3. Click "Ví gói" → Chuyển đến trang `/wallet`
4. Trang hiển thị danh sách gói chưa gán thiết bị
5. User có thể click "Gán Thiết Bị" (chức năng sẽ được phát triển sau)

## Tính năng của WalletPage

### Giao diện:
- **Header**: Tiêu đề "Ví Gói Dịch Vụ" với mô tả
- **User Info Card**: Hiển thị thông tin người dùng và tổng số gói chưa gán
- **Packages Grid**: Hiển thị các gói dưới dạng card
- **Empty State**: Thông báo khi chưa có gói nào

### Thông tin hiển thị cho mỗi gói:
- Tên gói và mô tả
- Thời hạn (1 THÁNG, 1 NĂM, 2 NĂM)
- Giá gói
- Ngày mua
- Mã đơn hàng
- Danh sách tính năng (hiển thị 3 tính năng đầu + số lượng còn lại)
- Hero image
- Nút "Gán Thiết Bị"

### Responsive Design:
- Grid layout: 1 cột trên mobile, 2 cột trên tablet, 3 cột trên desktop
- Card design với shadow và hover effects
- Responsive typography và spacing

## Tính năng của Navbar Dropdown

### Avatar Button:
- Hiển thị avatar với chữ cái đầu của tên người dùng
- Gradient background (blue to purple)
- Thông tin role (Phụ huynh/Quản trị viên) và status (PREMIUM/ADMIN)
- Arrow icon với animation khi mở/đóng

### Dropdown Menu:
- **User Info Header**: Avatar lớn + tên + email
- **Ví gói**: Link đến trang wallet
- **Lịch sử mua hàng**: Placeholder với label "Sắp có"
- **Đăng xuất**: Button màu đỏ với icon

### UX Features:
- Click outside để đóng dropdown
- Smooth transitions và animations
- Hover effects cho tất cả interactive elements
- Responsive design

## API Integration

### Endpoints sử dụng:
```javascript
// Lấy thông tin user hiện tại
const userResponse = await apiService.getCurrentUser();

// Lấy gói chưa gán thiết bị
const packagesResponse = await apiService.getUnassignedPackages(userResponse.data.ma_phu_huynh);
```

### Data Structure:
```javascript
// Package object structure
{
  id: number,
  gia: number,
  ngay_mua: string,
  vnp_txn_ref: string,
  trang_thai: 'CHUA_GAN_THIET_BI',
  thongTinGoi: {
    ten: string,
    mo_ta: string,
    thoi_han_thang: number,
    noiDungList: [
      { noi_dung: string }
    ]
  }
}
```

## Styling và Design

### Color Scheme:
- Primary: Blue (#3b82f6, #2563eb)
- Success: Green (#10b981, #059669)
- Warning: Orange (#f97316, #ea580c)
- Background: Gradient (blue-50 to indigo-100)

### Components:
- **Cards**: White background với shadow-lg
- **Buttons**: Gradient backgrounds với hover effects
- **Icons**: SVG icons với consistent sizing
- **Typography**: Responsive text sizes

### Animations:
- Hover effects trên buttons và cards
- Smooth transitions (duration-300)
- Scale effects (hover:scale-105)
- Rotate animation cho dropdown arrow

## Error Handling

### Loading States:
- Spinner animation khi đang tải dữ liệu
- Loading text "Đang tải ví gói..."

### Error States:
- Error icon và message khi có lỗi
- Button "Về trang chủ" để recovery
- Console logging cho debugging

### Empty States:
- Friendly message khi chưa có gói
- Call-to-action button "Mua gói dịch vụ"

## Future Enhancements

### Planned Features:
1. **Device Assignment**: Modal để nhập mã thiết bị
2. **Purchase History**: Trang lịch sử mua hàng
3. **Package Details**: Modal chi tiết gói dịch vụ
4. **Search/Filter**: Tìm kiếm và lọc gói
5. **Bulk Actions**: Gán nhiều gói cùng lúc

### Technical Improvements:
1. **Caching**: Cache package data để tăng performance
2. **Pagination**: Phân trang cho danh sách gói lớn
3. **Real-time Updates**: WebSocket cho cập nhật real-time
4. **Offline Support**: Service worker cho offline usage

## Testing

### Manual Testing:
1. **Login Flow**: Đăng nhập và kiểm tra avatar hiển thị
2. **Dropdown**: Click avatar và kiểm tra dropdown menu
3. **Navigation**: Click "Ví gói" và kiểm tra chuyển trang
4. **Data Display**: Kiểm tra hiển thị đúng thông tin gói
5. **Responsive**: Test trên mobile, tablet, desktop

### Edge Cases:
1. **No Packages**: Test khi user chưa có gói nào
2. **Network Error**: Test khi API call thất bại
3. **Large Data**: Test với nhiều gói dịch vụ
4. **Slow Network**: Test với connection chậm

## Troubleshooting

### Common Issues:
1. **Avatar không hiển thị**: Kiểm tra user data trong AuthContext
2. **Dropdown không mở**: Kiểm tra state `isUserDropdownOpen`
3. **Packages không load**: Kiểm tra API endpoint và authentication
4. **Styling issues**: Kiểm tra Tailwind CSS classes

### Debug Tips:
1. Sử dụng React DevTools để inspect state
2. Kiểm tra Network tab để debug API calls
3. Console.log để debug data flow
4. Kiểm tra browser console cho errors

## Security Considerations

### Authentication:
- Route `/wallet` được bảo vệ bởi `ProtectedRoute`
- API calls sử dụng JWT token từ localStorage
- User data được validate từ AuthContext

### Data Protection:
- Không hiển thị sensitive information
- API responses được validate
- Error messages không leak internal details
