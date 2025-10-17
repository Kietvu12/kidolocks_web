# Hướng dẫn cấu hình dịch thuật động cho PricingSection

## 🚀 **Đã hoàn thành:**

### **1. Tạo dịch vụ dịch thuật**
- File: `frontend/src/services/translationService.js`
- Sử dụng Google Translate API trực tiếp qua HTTP requests
- Hỗ trợ dịch text, mảng text, object và mảng object
- Có cache để tối ưu performance
- Xử lý lỗi gracefully
- Tương thích với React frontend

### **2. Cập nhật PricingSection**
- Import dịch vụ dịch thuật
- Thêm state `translatedFeatures` để lưu nội dung đã dịch
- Tạo helper function `getPackageFeatures()` để lấy features đã dịch
- Cập nhật logic fetch packages để dịch nội dung từ API khi `language === 'en'`
- Cập nhật tất cả phần hiển thị features để sử dụng helper function

## 🔧 **Cách hoạt động:**

### **Khi ngôn ngữ là tiếng Việt (vi):**
- Hiển thị nội dung gốc từ API
- Sử dụng `getDefaultFeatures()` làm fallback

### **Khi ngôn ngữ là tiếng Anh (en):**
- Tự động dịch nội dung từ API sang tiếng Anh
- Lưu vào cache để tránh dịch lại
- Hiển thị nội dung đã dịch

## 📋 **Cần cấu hình:**

### **Bước 1: Tạo Google Translate API Key**
1. Truy cập https://console.cloud.google.com/
2. Tạo project mới hoặc chọn project hiện có
3. Vào "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Copy API key

### **Bước 2: Kích hoạt Google Translate API**
1. Vào "APIs & Services" > "Library"
2. Tìm "Cloud Translation API"
3. Click "Enable"

### **Bước 3: Cấu hình trong project**
1. Tạo file `.env` trong thư mục `frontend/`
2. Thêm dòng: `VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here`
3. Restart development server

## 🎯 **Kết quả:**

- ✅ Các danh sách nội dung từ API sẽ được dịch động sang tiếng Anh
- ✅ Cache được sử dụng để tối ưu performance
- ✅ Fallback về nội dung gốc nếu có lỗi dịch thuật
- ✅ Không cần thay đổi context tự tạo
- ✅ Linh hoạt và dễ mở rộng

## 🔄 **Cách sử dụng:**

```javascript
// Trong component khác
import { translateText, translateTexts } from '../services/translationService';

// Dịch text đơn
const translatedText = await translateText('Xin chào', 'en');

// Dịch mảng text
const texts = ['Xin chào', 'Cảm ơn'];
const translatedTexts = await translateTexts(texts, 'en');
```

## 💡 **Lưu ý:**

- API key có giới hạn requests/tháng
- Có thể sử dụng free tier với giới hạn nhất định
- Cache được sử dụng để tối ưu performance
- Có thể thay thế bằng Microsoft Translator hoặc LibreTranslate
