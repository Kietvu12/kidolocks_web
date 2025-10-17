# Hướng dẫn cấu hình Google Translate API Key

## 🔑 **Cách lấy API Key:**

### **Bước 1: Tạo Google Cloud Project**
1. Truy cập https://console.cloud.google.com/
2. Click "Select a project" > "New Project"
3. Nhập tên project (ví dụ: "kidlock-translation")
4. Click "Create"

### **Bước 2: Kích hoạt Cloud Translation API**
1. Vào "APIs & Services" > "Library"
2. Tìm kiếm "Cloud Translation API"
3. Click vào "Cloud Translation API"
4. Click "Enable"

### **Bước 3: Tạo API Key**
1. Vào "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy API key được tạo
4. (Tùy chọn) Click "Restrict Key" để giới hạn quyền truy cập

### **Bước 4: Cấu hình trong project**
1. Tạo file `.env` trong thư mục `frontend/`
2. Thêm dòng: `VITE_GOOGLE_TRANSLATE_API_KEY=your_actual_api_key_here`
3. Restart development server: `pnpm dev`

## 💰 **Chi phí:**

- **Free Tier**: 500,000 ký tự/tháng
- **Paid**: $20/1 triệu ký tự sau free tier
- **Ước tính**: Với ~100 features × 50 ký tự = 5,000 ký tự/lần dịch

## 🔒 **Bảo mật:**

### **Restrict API Key (Khuyến nghị):**
1. Vào "APIs & Services" > "Credentials"
2. Click vào API key của bạn
3. Trong "Application restrictions":
   - Chọn "HTTP referrers"
   - Thêm: `localhost:3000/*`, `your-domain.com/*`
4. Trong "API restrictions":
   - Chọn "Restrict key"
   - Chọn "Cloud Translation API"

## 🧪 **Test API Key:**

```javascript
// Test trong browser console
const testTranslation = async () => {
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
  console.log(data.data.translations[0].translatedText);
};

testTranslation(); // Should output: "Hello"
```

## 🚨 **Lưu ý quan trọng:**

- ✅ API key hoạt động với React frontend
- ✅ Không cần cài đặt thêm package
- ✅ Sử dụng HTTP requests trực tiếp
- ✅ Cache được sử dụng để tối ưu performance
- ⚠️ Không expose API key trong production (sử dụng proxy server)
- ⚠️ Có giới hạn requests/tháng
