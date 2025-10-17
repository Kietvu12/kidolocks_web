import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import bgSession4 from '../assets/bg_session_4.png';
import heroImg from '../assets/hero_img.png';
import heroWinImg from '../assets/hero_win.png';
import apiService from '../services/api';
import { translateText, translateTexts } from '../services/libreTranslationService';

const PricingSection = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedDeviceCount, setSelectedDeviceCount] = useState(1);
    const [standardPackage, setStandardPackage] = useState(null);
    const [paidPackages, setPaidPackages] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [translatedFeatures, setTranslatedFeatures] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    

    // Fetch packages from API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await apiService.getAllGoi();
                if (response.success) {
                    const allPackages = response.data;
                    
                    // Lấy gói tiêu chuẩn (id = 8)
                    const standard = allPackages.find(pkg => pkg.id === 8);
                    setStandardPackage(standard);
                    
                    // Lấy các gói trả phí (id = 3, 2, 4)
                    const paid = allPackages.filter(pkg => [3, 2, 4].includes(pkg.id));
                    setPaidPackages(paid);
                }
            } catch (error) {
                console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Dịch nội dung từ API khi đổi ngôn ngữ
    useEffect(() => {
        const translateApiContent = async () => {
            // Reset translated features khi đổi ngôn ngữ
            setTranslatedFeatures({});

            // Chỉ dịch khi ngôn ngữ là tiếng Anh
            if (language === 'en') {
                const packagesToTranslate = [];
                if (standardPackage) packagesToTranslate.push(standardPackage);
                if (paidPackages && paidPackages.length > 0) packagesToTranslate.push(...paidPackages);

                if (packagesToTranslate.length === 0) return;

                const results = await Promise.all(
                    packagesToTranslate.map(async (pkg) => {
                        const features = pkg?.noiDungList?.map(item => item.noi_dung) || [];
                        const translated = features.length > 0 ? await translateTexts(features, 'en') : [];
                        return { id: pkg.id, translated };
                    })
                );

                const map = results.reduce((acc, cur) => {
                    acc[cur.id] = cur.translated;
                    return acc;
                }, {});

                setTranslatedFeatures(map);
            }
        };

        translateApiContent();
    }, [language, standardPackage, paidPackages]);

    // Intersection Observer for animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handleViewDetails = (packageData) => {
        setSelectedPackage(packageData);
        setShowModal(true);
    };

    const handleBuyNow = (pkg) => {
        if (!pkg) return;
        
        // Navigate to payment page with package info
        navigate('/payment', { 
            state: { 
                packageId: pkg.id,
                packageName: pkg.ten_goi,
                price: pkg.gia,
                deviceCount: pkg.so_thiet_bi
            } 
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPackage(null);
    };

    

    // Helper functions
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const getPackageDuration = (thoiHanThang) => {
        if (thoiHanThang === 1) return '1 THÁNG';
        if (thoiHanThang === 12) return '1 NĂM';
        if (thoiHanThang === 24) return '2 NĂM';
        return `${thoiHanThang} THÁNG`;
    };

    // Tính giá gốc từ giá hiện tại và phần trăm giảm giá
    const calculateOriginalPrice = (currentPrice, discountPercent) => {
        if (!discountPercent || discountPercent === 0) return null;
        return Math.round(currentPrice / (1 - discountPercent / 100));
    };

    // Lấy phần trăm giảm giá dựa trên số thiết bị
    const getDiscountPercent = (deviceCount) => {
        switch (deviceCount) {
            case 2: return 5;  // Giảm 5%
            case 3: return 10; // Giảm 10%
            default: return 0; // Không giảm
        }
    };

    // Lấy gói trả phí theo số thiết bị được chọn
    const getSelectedPaidPackage = () => {
        return paidPackages.find(pkg => pkg.so_thiet_bi === selectedDeviceCount);
    };

    // Helper function để lấy features cho package
    const getPackageFeatures = (pkg) => {
        if (!pkg) return getDefaultFeatures();
        
        // Nếu có features đã dịch từ API (chỉ khi ngôn ngữ là tiếng Anh)
        if (language === 'en' && translatedFeatures[pkg.id] && translatedFeatures[pkg.id].length > 0) {
            return translatedFeatures[pkg.id];
        }
        
        // Nếu có features từ API (hiển thị gốc khi tiếng Việt)
        if (pkg.noiDungList && pkg.noiDungList.length > 0) {
            return pkg.noiDungList.map(item => item.noi_dung);
        }
        
        // Fallback về default features
        return getDefaultFeatures();
    };

    // Default features for fallback - sẽ được dịch động
    const getDefaultFeatures = () => {
        if (language === 'en') {
            return [
                "Block websites inappropriate for children",
                "Create list of allowed websites",
                "Control and block applications on computer",
                "Automatic screenshots for monitoring",
                "Smart AI warnings",
                "Real-time notifications about child activities",
                "Detailed computer usage reports"
            ];
        }
        return [
            "Chặn website không phù hợp với trẻ em",
            "Tạo danh sách website được phép truy cập",
            "Kiểm soát và chặn các ứng dụng trên máy tính",
            "Chụp màn hình tự động để giám sát",
            "Cảnh báo thông minh từ AI",
            "Thông báo real-time về hoạt động của trẻ",
            "Báo cáo chi tiết hoạt động sử dụng máy tính"
        ];
    };

    return (
        <div ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={bgSession4}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-2xl mb-4" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>{t('pricingSubtitle')}</p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{
                        background: 'linear-gradient(90deg, #014F8D 0%, #00AACF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: 'Myriad Pro, sans-serif',
                        lineHeight: '1.3',
                        paddingTop: '0.15em',
                        paddingBottom: '0.15em',
                        display: 'inline-block'
                    }}>
                        {t('pricingTitle1')} {t('pricingTitle2')}
                    </h2>
                </div>

                {/* Gradient text animation keyframes for Premium title */}
                <style>{`
                    @keyframes gradientShift { 
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}</style>

                {/* Three Package Cards */}
                <div className="mb-20">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600" style={{fontFamily: 'Myriad Pro, sans-serif'}}>{t('loadingPackages')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Card 1: Gói tiêu chuẩn (id=8) */}
                            {standardPackage && (
                                <div className={`bg-white rounded-2xl p-6 shadow-lg relative flex flex-col h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl ${
                                    isVisible ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-20 scale-90 opacity-0'
                                }`}>
                                        {/* Package Title */}
                                        <div className="mb-6">
                                        <div className="rounded-full px-6 py-3 text-center mb-2" style={{background: 'linear-gradient(to bottom, #56CCFF, #004895)'}}>
                                            <span className="font-bold text-lg" style={{color: 'white', fontFamily: 'Myriad Pro, sans-serif'}}>{t('standardPackage')}</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-bold uppercase text-center" style={{color: '#071F55', fontFamily: 'Myriad Pro, sans-serif'}}>{t('kidolockBasic')}</h3>
                                            
                                            {/* Pricing */}
                                            <div className="text-center">

                                            <div className="text-sm mt-2" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                {standardPackage.so_thiet_bi || 1} {t('deviceUser')}
                                            </div>
                                            
                                            {/* Operating Systems */}
                                            <div className="mt-4">
                                                <div className="flex items-center justify-center space-x-4 text-xs" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                    <span>Windows®</span>
                                                   
                                                    <div className="w-px h-3 bg-gray-300"></div>
                                                    <span>Android™</span>
                                                    <div className="w-px h-3 bg-gray-300"></div>
                                                    <span>iOS®</span>
                                                </div>
                                                <div className="text-sm font-semibold mt-2" style={{color: '#3b82f6', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                    {getPackageFeatures(standardPackage).length} {t('protectionFeatures')}
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                    {/* Features List */}
                                        <div className="space-y-3 mb-6 flex-grow">
                                        {getPackageFeatures(standardPackage).map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm" style={{color: '#374151', fontFamily: 'Myriad Pro, sans-serif'}}>{feature}</span>
                                                </div>
                                            ))}
                                                    </div>

                                    {/* Bottom Section with Price and Button */}
                                    <div className="flex gap-3 mt-auto">
                                        {/* Price Section */}
                                        <div className="flex-1 text-center py-2 px-4 rounded-lg" style={{backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontFamily: 'Myriad Pro, sans-serif'}}>
                                            <div className="text-lg font-bold" style={{color: '#1f2937'}}>{t('free')}</div>
                                            <div className="text-xs" style={{color: '#6b7280'}}>{t('unlimitedTime')}</div>
                                        </div>

                                        {/* View Details Button */}
                                        <button 
                                            onClick={() => handleViewDetails(standardPackage)}
                                            className="flex-1 py-3 rounded-xl font-bold transition-all duration-300" 
                                            style={{background: '#00B2FF', color: 'white', fontFamily: 'Myriad Pro, sans-serif'}}
                                            onMouseEnter={(e) => e.target.style.background = '#0099e6'}
                                            onMouseLeave={(e) => e.target.style.background = '#00B2FF'}>
                                            {t('viewDetails')}
                                        </button>
                                    </div>
                        </div>
                    )}

                            {/* Card 2: Gói trả phí */}
                            {paidPackages.length > 0 && (
                                <div className={`bg-white rounded-2xl p-6 shadow-lg relative flex flex-col h-full transition-all duration-300 ease-out delay-300 hover:scale-105 hover:shadow-2xl ${
                                    isVisible ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-20 scale-90 opacity-0'
                                }`}>
                                    {/* Package Title */}
                                    <div className="mb-6">
                                        <div className="rounded-full px-6 py-3 text-center mb-2" style={{background: 'linear-gradient(to right, #873BFF, #004895)'}}>
                                            <span className="font-bold text-lg" style={{color: 'white', fontFamily: 'Myriad Pro, sans-serif'}}>{t('premiumPackage')}</span>
                                        </div>
                                        <h3 
                                            className="text-2xl sm:text-3xl font-bold uppercase text-center"
                                            style={{
                                                fontFamily: 'Myriad Pro, sans-serif',
                                                background: 'linear-gradient(90deg, #05CAF6, #00B2FF, #0F85CE)',
                                                backgroundSize: '200% 200%',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                animation: 'gradientShift 6s ease infinite'
                                            }}
                                        >
                                            {t('kidolockPremium')}
                                        </h3>

                                        {/* Device Count and User Info */}
                                        <div className="text-center mb-4">
                                            <div className="text-sm" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                {selectedDeviceCount} {t('deviceUser')}
                                        </div>
                                        </div>

                                        {/* Operating Systems */}
                                        <div className="text-center mb-4">
                                            <div className="flex items-center justify-center space-x-4 text-xs" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                <span>Windows®</span>
                                               
                                                <div className="w-px h-3 bg-gray-300"></div>
                                                <span>Android™</span>
                                                <div className="w-px h-3 bg-gray-300"></div>
                                                <span>iOS®</span>
                                                </div>
                                            <div className="text-sm font-semibold mt-2" style={{color: '#3b82f6', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                {getPackageFeatures(paidPackages[0]).length} {t('protectionFeatures')}
                                            </div>
                                        </div>
                                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-3 mb-6 flex-grow">
                                        {getPackageFeatures(paidPackages[0]).map((feature, idx) => (
                                                                            <div key={idx} className="flex items-center">
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}>
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                    </svg>
                                                                                </div>
                                                    <span className="text-sm" style={{color: '#374151', fontFamily: 'Myriad Pro, sans-serif'}}>{feature}</span>
                                                                            </div>
                                                                        ))}
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="space-y-3 mt-auto">
                                        {/* Custom Device Count Dropdown */}
                                        <div className="relative">
                                            <div className="w-full py-4 px-6 rounded-xl border-2 cursor-pointer transition-colors duration-200 hover:bg-purple-50" 
                                                 style={{
                                                     fontFamily: 'Myriad Pro, sans-serif',
                                                     borderColor: '#873BFF',
                                                     backgroundColor: '#f8fafc',
                                                     color: '#1f2937',
                                                     fontSize: '16px',
                                                     fontWeight: '600'
                                                 }}
                                                 onClick={() => setShowDropdown(!showDropdown)}>
                                                <div className="flex justify-between items-center">
                                                <div className="text-left">
                                                    <div className="font-bold">{getSelectedPaidPackage()?.so_thiet_bi || 1} {t('device')}</div>
                                                    <div className="text-sm" style={{color: '#6b7280'}}>1 {t('year')}</div>
                                                </div>
                                                </div>
                                            </div>
                                            
                                            {/* Custom dropdown arrow */}
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#873BFF'}}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>

                                            {/* Dropdown Options */}
                                            {showDropdown && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 rounded-xl shadow-lg z-10" style={{borderColor: '#873BFF'}}>
                                                    {paidPackages.map(pkg => (
                                                        <div 
                                                            key={pkg.id}
                                                            className="px-6 py-4 cursor-pointer transition-colors duration-200 hover:bg-purple-50"
                                                            onClick={() => {
                                                                setSelectedDeviceCount(pkg.so_thiet_bi);
                                                                setShowDropdown(false);
                                                            }}
                                                            style={{
                                                                fontFamily: 'Myriad Pro, sans-serif',
                                                                fontSize: '16px',
                                                                fontWeight: '600',
                                                                color: '#1f2937'
                                                            }}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-left">
                                                                    <div className="font-bold">{pkg.so_thiet_bi} {t('device')}</div>
                                                                    <div className="text-sm" style={{color: '#6b7280'}}>1 {t('year')}</div>
                                                                </div>
                                                                <div className="text-right">
                                                                    {(() => {
                                                                        const discountPercent = getDiscountPercent(pkg.so_thiet_bi);
                                                                        const originalPrice = calculateOriginalPrice(pkg.gia, discountPercent);
                                                                        
                                                                        return (
                                                                            <div className="text-right">
                                                                                {originalPrice && (
                                                                                    <div className="text-sm line-through opacity-60 mb-1" style={{color: '#9ca3af'}}>
                                                                                        {formatPrice(originalPrice)} đ
                                                                                    </div>
                                                                                )}
                                                                                <div className="font-bold text-lg" style={{color: '#2563eb'}}>
                                                                                    {formatPrice(pkg.gia)} đ*
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="px-6 py-3 border-t text-center text-sm" style={{borderTopColor: '#e5e7eb', color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                        {t('needMoreDevicesNote')}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Discount Card */}
                                        {selectedDeviceCount > 1 && (
                                            <div className="flex justify-center mb-3">
                                                <div className="text-center py-3 px-6 rounded-2xl" style={{backgroundColor: '#f59e0b', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                    <div className="text-sm font-bold uppercase" style={{color: '#000000'}}>
                                                        {selectedDeviceCount === 2 ? t('save5') : selectedDeviceCount === 3 ? t('save10') : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Pricing */}
                                        <div className="text-center py-3 px-4 rounded-lg" style={{backgroundColor: '#f8fafc', fontFamily: 'Myriad Pro, sans-serif'}}>
                                            {(() => {
                                                const selectedPkg = getSelectedPaidPackage();
                                                if (!selectedPkg) return null;
                                                
                                                const discountPercent = getDiscountPercent(selectedPkg.so_thiet_bi);
                                                const originalPrice = calculateOriginalPrice(selectedPkg.gia, discountPercent);
                                                
                                                return (
                                                    <>
                                                        {originalPrice && (
                                                            <div className="text-lg line-through opacity-60 mb-2" style={{color: '#9ca3af', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                                {formatPrice(originalPrice)} {t('vnd')}
                                                            </div>
                                                        )}
                                                        <div className="text-4xl font-bold" style={{color: '#1f2937', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                            {formatPrice(selectedPkg.gia)} {t('vnd')}
                                                        </div>
                                                        <div className="text-sm mt-1" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                            1 {t('year')}
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>

                                        

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            {/* Buy Now Button */}
                                            <button 
                                                onClick={() => {
                                                    const selectedPkg = getSelectedPaidPackage();
                                                    if (selectedPkg) {
                                                        navigate(`/payment/${selectedPkg.id}`);
                                                    }
                                                }}
                                                className="flex-1 py-3 rounded-xl font-bold transition-all duration-300 border-2" 
                                                style={{
                                                    borderColor: '#873BFF', 
                                                    color: '#873BFF', 
                                                    backgroundColor: 'transparent', 
                                                    fontFamily: 'Myriad Pro, sans-serif',
                                                    fontWeight: '700'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#873BFF'; 
                                                    e.target.style.color = 'white';
                                                    e.target.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = 'transparent'; 
                                                    e.target.style.color = '#873BFF';
                                                    e.target.style.transform = 'translateY(0)';
                                                }}>
                                                {t('buyNow')}
                                            </button>

                                            {/* View Details Button */}
                                            <button 
                                                onClick={() => handleViewDetails(getSelectedPaidPackage())}
                                                className="flex-1 py-3 rounded-xl font-bold transition-all duration-300" 
                                                style={{background: '#00B2FF', color: 'white', fontFamily: 'Myriad Pro, sans-serif'}}
                                                onMouseEnter={(e) => e.target.style.background = '#0099e6'}
                                                onMouseLeave={(e) => e.target.style.background = '#00B2FF'}>
                                                {t('viewDetails')}
                                            </button>
                                        </div>
                                                                                </div>
                                                                            </div>
                                                                        )}

                        </div>
                    )}
                </div>

            </div>

            {/* Modal */}
            {showModal && selectedPackage && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-50"
                            style={{backgroundColor: '#e5e7eb', color: '#4b5563'}}
                            onMouseEnter={(e) => {e.target.style.backgroundColor = '#d1d5db'; e.target.style.color = '#1f2937'}}
                            onMouseLeave={(e) => {e.target.style.backgroundColor = '#e5e7eb'; e.target.style.color = '#4b5563'}}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Background with floating elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Floating clouds */}
                            <div className="absolute top-10 left-10 w-16 h-8 rounded-full" style={{backgroundColor: 'white', opacity: 0.3}}></div>
                            <div className="absolute top-20 right-20 w-12 h-6 rounded-full" style={{backgroundColor: 'white', opacity: 0.3}}></div>
                            <div className="absolute bottom-20 left-20 w-20 h-10 rounded-full" style={{backgroundColor: 'white', opacity: 0.3}}></div>
                            
                            {/* Floating virus monsters */}
                            <div className="absolute top-16 right-16 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#a855f7', opacity: 0.4}}>
                                <span className="text-xs" style={{color: '#ef4444'}}>!</span>
                            </div>
                            <div className="absolute bottom-16 right-32 w-6 h-6 rounded-full flex items-center justify-center" style={{backgroundColor: '#a855f7', opacity: 0.4}}>
                                <span className="text-xs" style={{color: '#ef4444'}}>!</span>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="relative z-10 p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Section - Selected Package */}
                                <div className="rounded-2xl p-6 relative" style={{background: 'linear-gradient(to bottom right, #dbeafe, #eff6ff)'}}>
                                    {/* Phần 1: Tiêu đề */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold mb-2" style={{background: 'linear-gradient(to right, #2563eb, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Myriad Pro, sans-serif'}}>
                                            {selectedPackage.id === 8 ? t('standardPackageModal') : t('premiumPackageModal')}
                                        </h3>
                                        <p className="font-semibold" style={{color: '#4b5563', fontFamily: 'Myriad Pro, sans-serif'}}>
                                            {selectedPackage.so_thiet_bi || 1} {t('deviceUserModal')}
                                        </p>
                                    </div>

                                    {/* Phần 2: Nội dung so sánh */}
                                    <div className="mb-6">
                                        {/* Features */}
                                        <div className="space-y-3 mb-6">
                                            {getPackageFeatures(selectedPackage).map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm" style={{color: '#374151', fontFamily: 'Myriad Pro, sans-serif'}}>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Phần 3: Nút call-to-action với hero image */}
                                    <div className="relative">
                                        {/* Hero Image - Top Right */}
                                        <div className="absolute -top-8 -right-2 z-10">
                                            <img
                                                src={heroWinImg}
                                                alt="Hero victorious over virus"
                                                className="w-20 h-20 object-contain"
                                            />
                                        </div>
                                        
                                        <button 
                                            onClick={() => navigate(`/payment/${selectedPackage.id}`)}
                                            className="w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg" 
                                            style={{background: 'linear-gradient(to right, #f97316, #ea580c)', color: 'white', fontFamily: 'Myriad Pro, sans-serif'}} 
                                            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #ea580c, #dc2626)'} 
                                            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #f97316, #ea580c)'}>
                                            {selectedPackage.id === 8 ? (
                                                <>
                                                    <div className="text-2xl font-bold mb-1" style={{fontFamily: 'Myriad Pro, sans-serif'}}>{t('freeModal')}</div>
                                                    <div className="text-xs" style={{color: '#e5e7eb', fontFamily: 'Myriad Pro, sans-serif'}}>{selectedPackage.so_thiet_bi || 1} {t('deviceUserModal')}</div>
                                                </>
                                            ) : (
                                                <>
                                                    {(() => {
                                                        const discountPercent = getDiscountPercent(selectedPackage.so_thiet_bi);
                                                        const originalPrice = calculateOriginalPrice(selectedPackage.gia, discountPercent);
                                                        
                                                        return (
                                                            <>
                                                                {originalPrice && (
                                                                    <div className="line-through text-sm mb-1" style={{color: '#e5e7eb', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                                        {formatPrice(originalPrice)} {t('vnd')}
                                                                    </div>
                                                                )}
                                                                <div className="text-2xl font-bold mb-1" style={{fontFamily: 'Myriad Pro, sans-serif'}}>
                                                                    {formatPrice(selectedPackage.gia)} <span className="text-base">{t('vnd')}</span>
                                                                </div>
                                                                <div className="text-xs" style={{color: '#e5e7eb', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                                    {selectedPackage.so_thiet_bi || 1} {t('deviceUserModal')}
                                                                </div>
                                                            </>
                                                        );
                                                    })()}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Right Section - Free Trial Package */}
                                <div className="rounded-2xl p-6 relative border-2" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    {/* Phần 1: Tiêu đề */}
                                    <div className="text-center mb-6">
                                        <p className="text-sm mb-2" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>{t('freeTrialModal')}</p>
                                        <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937', fontFamily: 'Myriad Pro, sans-serif'}}>{t('freeModal')}</h3>
                                        <p className="font-semibold" style={{color: '#4b5563', fontFamily: 'Myriad Pro, sans-serif'}}>1 {t('deviceUserModal')}</p>
                                    </div>

                                    {/* Phần 2: Nội dung so sánh */}
                                    <div className="mb-6">
                                        {/* Features - Show limited features for free trial */}
                                        <div className="space-y-3 mb-6">
                                            {getPackageFeatures(selectedPackage).map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: idx < 2 ? '#d1d5db' : '#f3f4f6'}}>
                                                        {idx < 2 ? (
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: '#9ca3af'}}>
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className="text-sm" style={{color: idx < 2 ? '#374151' : '#9ca3af', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Phần 3: Nút call-to-action với hero image */}
                                    <div className="relative">
                                        {/* Hero Image - Top Left */}
                                        <div className="absolute -top-8 -left-2 z-10">
                                            <img
                                                src={heroImg}
                                                alt="Hero fighting virus"
                                                className="w-20 h-20 object-contain"
                                            />
                                        </div>
                                        
                                        <button className="w-full py-4 rounded-xl" style={{color: 'black', fontFamily: 'Myriad Pro, sans-serif'}}>
                                            <div className="text-2xl font-bold mb-1">{t('freeModal')}</div>
                                            <div className="text-xs" style={{color: '#1f2937'}}>1 {t('deviceUserModal')}</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default PricingSection;
