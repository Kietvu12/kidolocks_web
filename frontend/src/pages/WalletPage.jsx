import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';
import Navbar from '../components/Navbar';
import heroImg from '../assets/hero_img.png';
import heroWinImg from '../assets/hero_win.png';
import { translateText, translateTexts } from '../services/libreTranslationService';

const WalletPage = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [translatedPackages, setTranslatedPackages] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        sortBy: 'ngay_mua', // ngay_mua, gia, ten
        sortOrder: 'desc', // asc, desc
        priceRange: 'all' // all, under_100k, 100k_500k, over_500k
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin user hiện tại
                const userResponse = await apiService.getCurrentUser();
                if (userResponse.success) {
                    setUserInfo(userResponse.data);
                    
                    // Lấy các gói chưa gán thiết bị
                    const packagesResponse = await apiService.getUnassignedPackages(userResponse.data.ma_phu_huynh);
                    if (packagesResponse.success) {
                        setPackages(packagesResponse.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching wallet data:', error);
                setError(t('cannotLoadWalletData'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Dịch nội dung từ API khi đổi ngôn ngữ
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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const getPackageDuration = (thoiHanThang) => {
        if (thoiHanThang === 1) return `1 ${t('month')}`;
        if (thoiHanThang === 12) return `1 ${t('year')}`;
        if (thoiHanThang === 24) return `2 ${t('years')}`;
        return `${thoiHanThang} ${t('month')}`;
    };

    // Helper function để lấy packages đã dịch
    const getDisplayPackages = () => {
        if (language === 'en' && translatedPackages.length > 0) {
            return translatedPackages;
        }
        return packages;
    };

    const handleAssignDevice = (packageId) => {
        // TODO: Implement device assignment logic
        console.log('Assign device for package:', packageId);
        // Có thể mở modal để nhập mã thiết bị hoặc chọn từ danh sách
    };

    // Filter and sort packages
    const getFilteredPackages = () => {
        const displayPackages = getDisplayPackages();
        let filtered = [...displayPackages];

        // Search filter
        if (filters.search) {
            filtered = filtered.filter(pkg => 
                pkg.thongTinGoi?.ten?.toLowerCase().includes(filters.search.toLowerCase()) ||
                pkg.vnp_txn_ref?.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Price range filter
        if (filters.priceRange !== 'all') {
            filtered = filtered.filter(pkg => {
                const price = pkg.gia;
                switch (filters.priceRange) {
                    case 'under_100k':
                        return price < 100000;
                    case '100k_500k':
                        return price >= 100000 && price <= 500000;
                    case 'over_500k':
                        return price > 500000;
                    default:
                        return true;
                }
            });
        }

        // Sort packages
        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch (filters.sortBy) {
                case 'gia':
                    aValue = a.gia;
                    bValue = b.gia;
                    break;
                case 'ten':
                    aValue = a.thongTinGoi?.ten || '';
                    bValue = b.thongTinGoi?.ten || '';
                    break;
                case 'ngay_mua':
                default:
                    aValue = new Date(a.ngay_mua);
                    bValue = new Date(b.ngay_mua);
                    break;
            }

            if (filters.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    };

    const filteredPackages = getFilteredPackages();

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 mx-auto mb-4" style={{borderBottomColor: '#2563eb', borderBottomWidth: '2px'}}></div>
                        <p style={{color: '#4b5563'}}>{t('loadingWallet')}</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                        <div style={{color: '#ef4444', fontSize: '3.75rem'}} className="mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>{t('errorOccurred')}</h2>
                        <p className="mb-4" style={{color: '#4b5563'}}>{error}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 rounded-lg transition-colors"
                            style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                        >
                            {t('backToHome')}
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen py-8" style={{background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)'}}>
            <div className="container mx-auto px-4">
                {/* Header */}

                {/* User Info */}
                <div className="mx-auto mb-8">
                    <div className="rounded-2xl p-6 shadow-lg" style={{backgroundColor: '#ffffff'}}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                                    <span className="text-xl font-bold" style={{color: '#ffffff'}}>
                                        {userInfo?.ten_phu_huynh?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold" style={{color: '#1f2937'}}>{userInfo?.ten_phu_huynh}</h3>
                                    <p style={{color: '#4b5563'}}>{userInfo?.email_phu_huynh}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm" style={{color: '#6b7280'}}>{t('totalUnassignedPackages')}</p>
                                <p className="text-2xl font-bold" style={{color: '#2563eb'}}>{packages.length}</p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="border-t pt-6" style={{borderColor: '#e5e7eb'}}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Search */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>{t('search')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('searchPlaceholder')}
                                        value={filters.search}
                                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>{t('filter')}</label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="ngay_mua">{t('sortByDate')}</option>
                                        <option value="gia">{t('sortByPrice')}</option>
                                        <option value="ten">{t('sortByName')}</option>
                                    </select>
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>{t('sortOrder')}</label>
                                    <select
                                        value={filters.sortOrder}
                                        onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="desc">{t('sortOrderNewest')}</option>
                                        <option value="asc">{t('sortOrderOldest')}</option>
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>{t('priceRange')}</label>
                                    <select
                                        value={filters.priceRange}
                                        onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">{t('priceRangeAll')}</option>
                                        <option value="under_100k">{t('priceRangeUnder100k')}</option>
                                        <option value="100k_500k">{t('priceRange100k500k')}</option>
                                        <option value="over_500k">{t('priceRangeOver500k')}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-sm" style={{color: '#4b5563'}}>
                                    {t('showingResults')} {filteredPackages.length} {t('of')} {packages.length} {t('packages')}
                                </p>
                                <button
                                    onClick={() => setFilters({
                                        search: '',
                                        sortBy: 'ngay_mua',
                                        sortOrder: 'desc',
                                        priceRange: 'all'
                                    })}
                                    className="text-sm font-medium"
                                    style={{color: '#2563eb'}}
                                    onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                    onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                                >
                                    {t('clearFilters')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="mx-auto">
                    {packages.length === 0 ? (
                        <div className="text-center py-12">
                            <div style={{color: '#9ca3af', fontSize: '3.75rem'}} className="mb-4">📦</div>
                            <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>{t('noPackagesYet')}</h3>
                            <p className="mb-6" style={{color: '#4b5563'}}>{t('noPackagesDescription')}</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 rounded-lg transition-colors"
                                style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                            >
                                {t('buyServicePackage')}
                            </button>
                        </div>
                    ) : filteredPackages.length === 0 ? (
                        <div className="text-center py-12">
                            <div style={{color: '#9ca3af', fontSize: '3.75rem'}} className="mb-4">🔍</div>
                            <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>{t('noPackagesFound')}</h3>
                            <p className="mb-6" style={{color: '#4b5563'}}>{t('noPackagesFoundDescription')}</p>
                            <button
                                onClick={() => setFilters({
                                    search: '',
                                    sortBy: 'ngay_mua',
                                    sortOrder: 'desc',
                                    priceRange: 'all'
                                })}
                                className="px-6 py-3 rounded-lg transition-colors"
                                style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                            >
                                {t('clearFilters')}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPackages.map((pkg) => (
                                <div key={pkg.id} className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow" style={{backgroundColor: '#ffffff'}}>
                                    {/* Package Header */}
                                    <div className="text-center mb-4">
                                        <div className="rounded-full px-4 py-2 text-center mb-3 inline-block" 
                                             style={{background: 'linear-gradient(to right, #3b82f6, #4ade80)'}}>
                                            <span className="font-bold" style={{color: '#ffffff'}}>{getPackageDuration(pkg.thongTinGoi?.thoi_han_thang)}</span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-1" style={{color: '#1f2937'}}>{pkg.thongTinGoi?.ten}</h3>
                                        <p className="text-sm" style={{color: '#4b5563'}}>{pkg.thongTinGoi?.mo_ta}</p>
                                    </div>

                                    {/* Package Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span style={{color: '#4b5563'}}>{t('packagePrice')}</span>
                                            <span className="font-semibold" style={{color: '#16a34a'}}>{formatPrice(pkg.gia)} VND</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span style={{color: '#4b5563'}}>{t('purchaseDate')}</span>
                                            <span className="font-semibold">{new Date(pkg.ngay_mua).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span style={{color: '#4b5563'}}>{t('orderCode')}</span>
                                            <span className="font-semibold text-xs">{pkg.vnp_txn_ref}</span>
                                        </div>
                                    </div>

                                    {/* Features Preview */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold mb-2" style={{color: '#1f2937'}}>{t('features')}</h4>
                                        <div className="space-y-1">
                                            {pkg.thongTinGoi?.noiDungList?.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}></div>
                                                    <span className="text-xs" style={{color: '#4b5563'}}>{feature.noi_dung}</span>
                                                </div>
                                            ))}
                                            {pkg.thongTinGoi?.noiDungList?.length > 3 && (
                                                <div className="text-xs italic" style={{color: '#6b7280'}}>
                                                    +{pkg.thongTinGoi.noiDungList.length - 3} {t('moreFeatures')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hero Image */}
                                    <div className="flex justify-center mb-4">
                                        <img src={heroImg} alt="Hero fighting virus" className="w-20 h-20 object-contain" />
                                    </div>

                                    {/* Action Button */}
                                    {/* <button
                                        onClick={() => handleAssignDevice(pkg.id)}
                                        className="w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                        style={{background: 'linear-gradient(to right, #f97316, #ea580c)', color: 'white'}}
                                    >
                                        Gán Thiết Bị
                                    </button> */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-lg transition-colors"
                        style={{backgroundColor: '#4b5563', color: '#ffffff'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
                    >
                        {t('backToHome')}
                    </button>
                </div>
            </div>
            </div>
        </>
    );
};

export default WalletPage;
