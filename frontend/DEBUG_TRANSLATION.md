# Hướng dẫn Debug Dịch Thuật

## 🐛 **Lỗi đã sửa:**

### **Lỗi: `process is not defined`**
- **Nguyên nhân**: React frontend không có `process.env`
- **Giải pháp**: Sử dụng `import.meta.env` thay vì `process.env`
- **Cập nhật**: `VITE_GOOGLE_TRANSLATE_API_KEY` thay vì `REACT_APP_GOOGLE_TRANSLATE_API_KEY`

## 🔧 **Cách debug:**

### **Bước 1: Kiểm tra API Key**
```javascript
// Trong browser console
console.log('API Key:', import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY);
```

### **Bước 2: Test dịch vụ**
```javascript
// Import và chạy test
import { testTranslation } from './src/utils/testTranslation.js';
testTranslation();
```

### **Bước 3: Kiểm tra Network Tab**
1. Mở Developer Tools > Network
2. Chuyển ngôn ngữ sang English
3. Xem requests đến `translation.googleapis.com`

## 📋 **Checklist Debug:**

- [ ] File `.env` có tồn tại trong `frontend/`
- [ ] `VITE_GOOGLE_TRANSLATE_API_KEY` được cấu hình
- [ ] API key không phải `your_google_translate_api_key_here`
- [ ] Development server đã restart sau khi thêm `.env`
- [ ] Google Cloud Translation API đã được enable
- [ ] API key có quyền truy cập Cloud Translation API

## 🚨 **Các lỗi thường gặp:**

### **1. API Key không được cấu hình**
```
Google Translate API key not configured. Returning original text.
```
**Giải pháp**: Tạo file `.env` với `VITE_GOOGLE_TRANSLATE_API_KEY=your_key`

### **2. API Key không hợp lệ**
```
Translation API error: 400
```
**Giải pháp**: Kiểm tra API key và enable Cloud Translation API

### **3. Quota exceeded**
```
Translation API error: 429
```
**Giải pháp**: Kiểm tra quota trong Google Cloud Console

### **4. CORS Error**
```
Access to fetch at 'https://translation.googleapis.com' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Giải pháp**: Google Translate API hỗ trợ CORS, kiểm tra API key

## 🧪 **Test Manual:**

```javascript
// Test trực tiếp trong browser console
const testAPI = async () => {
  const apiKey = 'your_api_key_here';
  const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: 'Xin chào',
      source: 'vi',
      target: 'en',
      format: 'text'
    })
  });
  const data = await response.json();
  console.log(data);
};
testAPI();
```

## ✅ **Kết quả mong đợi:**

- Không còn lỗi `process is not defined`
- Console hiển thị: `Google Translate API key not configured` (nếu chưa cấu hình)
- Hoặc dịch thuật hoạt động bình thường (nếu đã cấu hình)
- Network tab hiển thị requests đến Google Translate API
