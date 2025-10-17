# Hướng dẫn Logic Dịch Thuật Hybrid

## 🎯 **Logic Dịch Thuật Mới:**

### **1. Chỉ dịch nội dung từ API**
- **MyMemory API**: Chỉ dịch `noiDungList` từ API (các tính năng của gói)
- **Context Translation**: Tất cả các phần khác (tiêu đề, button, text UI)

### **2. Reset khi đổi ngôn ngữ**
- **Khi đổi ngôn ngữ**: Reset `translatedFeatures` về `{}`
- **Tiếng Việt**: Hiển thị nội dung gốc từ API
- **Tiếng Anh**: Dịch nội dung từ API bằng MyMemory API

## 🔧 **Cách hoạt động:**

### **Khi ngôn ngữ là tiếng Việt (vi):**
```javascript
// Hiển thị nội dung gốc từ API
if (pkg.noiDungList && pkg.noiDungList.length > 0) {
    return pkg.noiDungList.map(item => item.noi_dung);
}
```

### **Khi ngôn ngữ là tiếng Anh (en):**
```javascript
// Dịch nội dung từ API bằng MyMemory API
if (language === 'en' && translatedFeatures[pkg.id] && translatedFeatures[pkg.id].length > 0) {
    return translatedFeatures[pkg.id];
}
```

## 📋 **Các phần được dịch:**

### **✅ Dịch bằng MyMemory API:**
- `standardPackage.noiDungList` - Tính năng gói tiêu chuẩn
- `paidPackages[].noiDungList` - Tính năng gói trả phí

### **✅ Dịch bằng Context:**
- Tiêu đề section (`t('pricingTitle1')`, `t('pricingTitle2')`)
- Tên gói (`t('standardPackage')`, `t('premiumPackage')`)
- Button text (`t('buyNow')`, `t('viewDetails')`)
- Thông tin thiết bị (`t('deviceUser')`, `t('protectionFeatures')`)
- Giá cả và thời gian (`t('free')`, `t('unlimitedTime')`)
- Tất cả text UI khác

## 🔄 **Flow khi đổi ngôn ngữ:**

1. **User click đổi ngôn ngữ** trên Navbar
2. **Context language** thay đổi
3. **useEffect** trigger với `language` dependency
4. **Reset** `translatedFeatures = {}`
5. **Nếu tiếng Anh**: Dịch `noiDungList` bằng MyMemory API
6. **Nếu tiếng Việt**: Hiển thị nội dung gốc từ API
7. **Context translation** tự động cập nhật các phần khác

## 🎯 **Kết quả:**

- ✅ **Nội dung từ API**: Dịch bằng MyMemory API (chỉ khi tiếng Anh)
- ✅ **UI Text**: Dịch bằng Context (tự động)
- ✅ **Reset khi đổi ngôn ngữ**: Về nội dung gốc trước khi dịch
- ✅ **Performance**: Cache được sử dụng cho API translation
- ✅ **Fallback**: Nếu API lỗi, hiển thị nội dung gốc

## 💡 **Lưu ý:**

- **Chỉ dịch khi cần**: MyMemory API chỉ được gọi khi `language === 'en'`
- **Reset cache**: Mỗi lần đổi ngôn ngữ, cache được reset
- **Hybrid approach**: Kết hợp Context và API translation
- **User experience**: Smooth transition khi đổi ngôn ngữ
