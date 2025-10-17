# Hướng dẫn Translation cho WalletPage

## 🎯 **Tính năng đã thêm:**

### **1. Hybrid Translation System**
- **Context Translation**: Cho các text cố định trong UI
- **MyMemory API Translation**: Cho dữ liệu trả về từ API
- **Automatic Reset**: Reset về nội dung gốc khi đổi ngôn ngữ

### **2. Translation Keys mới trong LanguageContext**

#### **Vietnamese (vi):**
```javascript
// Wallet Page
walletTitle: 'VÍ GÓI CỦA TÔI',
walletSubtitle: 'Quản lý các gói dịch vụ chưa được gán thiết bị',
totalUnassignedPackages: 'Tổng gói chưa gán',
searchPlaceholder: 'Tên gói hoặc mã đơn...',
sortByDate: 'Ngày mua',
sortByPrice: 'Giá',
sortByName: 'Tên gói',
sortOrderNewest: 'Mới nhất',
sortOrderOldest: 'Cũ nhất',
priceRangeAll: 'Tất cả',
priceRangeUnder100k: 'Dưới 100k',
priceRange100k500k: '100k - 500k',
priceRangeOver500k: 'Trên 500k',
showingResults: 'Hiển thị',
of: 'của',
packages: 'gói',
clearFilters: 'Xóa bộ lọc',
noPackagesYet: 'Chưa có gói nào',
noPackagesDescription: 'Bạn chưa có gói dịch vụ nào chưa được gán thiết bị',
buyServicePackage: 'Mua gói dịch vụ',
noPackagesFound: 'Không tìm thấy gói',
noPackagesFoundDescription: 'Không có gói nào phù hợp với bộ lọc hiện tại',
packagePrice: 'Giá:',
purchaseDate: 'Ngày mua:',
orderCode: 'Mã đơn:',
features: 'Tính năng:',
moreFeatures: 'tính năng khác',
assignDevice: 'Gán Thiết Bị',
backToHome: 'Về trang chủ',
loadingWallet: 'Đang tải ví gói...',
errorOccurred: 'Có lỗi xảy ra',
cannotLoadWalletData: 'Không thể tải dữ liệu ví gói',
month: 'THÁNG',
year: 'NĂM',
years: 'NĂM'
```

#### **English (en):**
```javascript
// Wallet Page
walletTitle: 'MY WALLET',
walletSubtitle: 'Manage unassigned service packages',
totalUnassignedPackages: 'Total unassigned packages',
searchPlaceholder: 'Package name or order code...',
sortByDate: 'Purchase date',
sortByPrice: 'Price',
sortByName: 'Package name',
sortOrderNewest: 'Newest',
sortOrderOldest: 'Oldest',
priceRangeAll: 'All',
priceRangeUnder100k: 'Under 100k',
priceRange100k500k: '100k - 500k',
priceRangeOver500k: 'Over 500k',
showingResults: 'Showing',
of: 'of',
packages: 'packages',
clearFilters: 'Clear filters',
noPackagesYet: 'No packages yet',
noPackagesDescription: 'You don\'t have any unassigned service packages yet',
buyServicePackage: 'Buy service package',
noPackagesFound: 'No packages found',
noPackagesFoundDescription: 'No packages match the current filters',
packagePrice: 'Price:',
purchaseDate: 'Purchase date:',
orderCode: 'Order code:',
features: 'Features:',
moreFeatures: 'more features',
assignDevice: 'Assign Device',
backToHome: 'Back to home',
loadingWallet: 'Loading wallet...',
errorOccurred: 'An error occurred',
cannotLoadWalletData: 'Cannot load wallet data',
month: 'MONTH',
year: 'YEAR',
years: 'YEARS'
```

## 🔧 **Cách hoạt động:**

### **1. Context Translation cho UI Text:**
```javascript
const { t, language } = useLanguage();

// Sử dụng trong JSX
<h3>{t('walletTitle')}</h3>
<p>{t('walletSubtitle')}</p>
<button>{t('buyServicePackage')}</button>
```

### **2. MyMemory API Translation cho API Data:**
```javascript
// State để lưu packages đã dịch
const [translatedPackages, setTranslatedPackages] = useState([]);

// useEffect để dịch khi đổi ngôn ngữ
useEffect(() => {
    const translateApiContent = async () => {
        if (packages.length > 0 && language === 'en') {
            const translatedPkgs = await Promise.all(
                packages.map(async (pkg) => {
                    const translatedPkg = { ...pkg };
                    
                    // Dịch tên gói
                    if (pkg.thongTinGoi?.ten) {
                        translatedPkg.thongTinGoi = {
                            ...pkg.thongTinGoi,
                            ten: await translateText(pkg.thongTinGoi.ten, 'en')
                        };
                    }
                    
                    // Dịch mô tả gói
                    if (pkg.thongTinGoi?.mo_ta) {
                        translatedPkg.thongTinGoi = {
                            ...translatedPkg.thongTinGoi,
                            mo_ta: await translateText(pkg.thongTinGoi.mo_ta, 'en')
                        };
                    }
                    
                    // Dịch danh sách tính năng
                    if (pkg.thongTinGoi?.noiDungList && pkg.thongTinGoi.noiDungList.length > 0) {
                        const features = pkg.thongTinGoi.noiDungList.map(item => item.noi_dung);
                        const translatedFeatures = await translateTexts(features, 'en');
                        
                        translatedPkg.thongTinGoi = {
                            ...translatedPkg.thongTinGoi,
                            noiDungList: pkg.thongTinGoi.noiDungList.map((item, index) => ({
                                ...item,
                                noi_dung: translatedFeatures[index] || item.noi_dung
                            }))
                        };
                    }
                    
                    return translatedPkg;
                })
            );
            
            setTranslatedPackages(translatedPkgs);
        } else {
            setTranslatedPackages([]);
        }
    };

    translateApiContent();
}, [language, packages]);
```

### **3. Helper Function để lấy Packages đã dịch:**
```javascript
// Helper function để lấy packages đã dịch
const getDisplayPackages = () => {
    if (language === 'en' && translatedPackages.length > 0) {
        return translatedPackages;
    }
    return packages;
};

// Sử dụng trong filter logic
const getFilteredPackages = () => {
    const displayPackages = getDisplayPackages();
    let filtered = [...displayPackages];
    // ... filter logic
    return filtered;
};
```

## 🎨 **Hiệu ứng Visual:**

### **Khi ngôn ngữ là tiếng Việt:**
- ✅ **UI Text**: Sử dụng Context translation (tiếng Việt)
- ✅ **API Data**: Hiển thị nội dung gốc từ API (tiếng Việt)
- ✅ **No Translation**: Không gọi MyMemory API

### **Khi ngôn ngữ là tiếng Anh:**
- ✅ **UI Text**: Sử dụng Context translation (tiếng Anh)
- ✅ **API Data**: Dịch bằng MyMemory API (tiếng Anh)
- ✅ **Reset Behavior**: Reset về nội dung gốc trước khi dịch

## 🚀 **Ưu điểm:**

- ✅ **Hybrid Approach**: Kết hợp Context và API translation
- ✅ **Performance**: Chỉ dịch khi cần thiết (tiếng Anh)
- ✅ **Reset Logic**: Đảm bảo nội dung gốc được hiển thị trước
- ✅ **Caching**: MyMemory API có caching để tối ưu performance
- ✅ **Fallback**: Fallback về nội dung gốc nếu dịch thất bại
- ✅ **Consistent**: UI text và API data được dịch đồng bộ

## 📱 **Responsive:**

- ✅ **Desktop**: Full translation với dropdowns
- ✅ **Mobile**: Translation cho mobile menu
- ✅ **Tablet**: Responsive design cho mọi kích thước

## 🔧 **Technical Details:**

### **Translation Flow:**
1. **Language Change**: User đổi ngôn ngữ trên navbar
2. **Reset State**: `translatedPackages` được reset về `[]`
3. **API Translation**: Nếu `language === 'en'`, gọi MyMemory API
4. **Display**: `getDisplayPackages()` trả về packages phù hợp
5. **UI Update**: Component re-render với nội dung đã dịch

### **Error Handling:**
- **API Fail**: Fallback về nội dung gốc
- **Network Error**: Hiển thị nội dung gốc
- **Empty Response**: Sử dụng nội dung gốc

### **Performance Optimization:**
- **Conditional Translation**: Chỉ dịch khi `language === 'en'`
- **Batch Translation**: Sử dụng `translateTexts` cho multiple items
- **Caching**: MyMemory API có built-in caching
- **State Management**: Efficient state updates

## 💡 **Lưu ý:**

- **API Dependency**: Cần MyMemory API hoạt động để dịch
- **Rate Limiting**: MyMemory API có rate limit (100ms delay)
- **Network Required**: Cần internet để dịch API content
- **Fallback Strategy**: Luôn có fallback về nội dung gốc
- **Memory Usage**: `translatedPackages` state có thể tăng memory usage

## 🔄 **Workflow:**

1. **Initial Load**: Packages được load từ API (tiếng Việt)
2. **Language Switch**: User đổi sang tiếng Anh
3. **Reset**: `translatedPackages` được clear
4. **Translation**: MyMemory API dịch packages
5. **Display**: Packages đã dịch được hiển thị
6. **Switch Back**: User đổi về tiếng Việt
7. **Reset**: `translatedPackages` được clear
8. **Display**: Packages gốc được hiển thị
