import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import bgSession4 from '../assets/bg_session_4.png';
import heroImg from '../assets/hero_img.png';
import heroWinImg from '../assets/hero_win.png';
import apiService from '../services/api';

const PricingSection = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedPackages, setExpandedPackages] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Fetch packages from API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await apiService.getAllGoi();
                if (response.success) {
                    // Filter out free trial packages and sort by price
                    const paidPackages = response.data.filter(pkg => pkg.loai_goi === 'TRA_PHI');
                    setPackages(paidPackages);
                    
                    // Initialize expanded state for each package
                    const initialExpandedState = {};
                    paidPackages.forEach((pkg, index) => {
                        initialExpandedState[`package${index}`] = false;
                    });
                    setExpandedPackages(initialExpandedState);
                }
            } catch (error) {
                console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const togglePackage = (packageId) => {
        setExpandedPackages(prev => ({
            ...prev,
            [packageId]: !prev[packageId]
        }));
    };

    const handleViewDetails = (packageData) => {
        setSelectedPackage(packageData);
        setShowModal(true);
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

    const getDisplayFeatures = (features, isExpanded = false) => {
        if (!features || features.length === 0) return [];
        
        if (isExpanded) {
            return features;
        }
        
        const displayFeatures = features.slice(0, 7);
        const hasMore = features.length > 7;
        
        return { features: displayFeatures, hasMore };
    };

    // Default features for fallback
    const defaultFeatures = [
        "Chặn website không phù hợp với trẻ em",
        "Tạo danh sách website được phép truy cập",
        "Kiểm soát và chặn các ứng dụng trên máy tính",
        "Chụp màn hình tự động để giám sát",
        "Cảnh báo thông minh từ AI",
        "Thông báo real-time về hoạt động của trẻ",
        "Báo cáo chi tiết hoạt động sử dụng máy tính"
    ];

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
                    <p className="text-2xl mb-4" style={{color: '#6b7280'}}>{t('pricingSubtitle')}</p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                        <span style={{color: '#1f2937'}}>{t('pricingTitle1')}</span> <span style={{color: '#f97316'}}>{t('pricingTitle2')}</span>
                    </h2>
                </div>

                {/* Featured Packages (First 3 packages) */}
                <div className="mb-20">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">{t('loadingPackages')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.slice(0, 3).map((pkg, index) => {
                                const features = pkg.noiDungList?.map(item => item.noi_dung) || defaultFeatures;
                                const displayFeatures = getDisplayFeatures(features);
                                
                                return (
                                    <div key={pkg.id} className="bg-white rounded-2xl p-6 shadow-lg relative flex flex-col h-full">
                                        {/* Discount Badge */}
                                        <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-bold" style={{backgroundColor: '#f97316', color: 'white'}}>
                                            70% OFF
                                        </div>

                                        {/* Package Title */}
                                        <div className="mb-6">
                                            <div className="rounded-full px-6 py-3 text-center mb-4" style={{background: 'linear-gradient(to right, #3b82f6, #4ade80)'}}>
                                                <span className="font-bold text-lg" style={{color: 'white'}}>{getPackageDuration(pkg.thoi_han_thang)}</span>
                                            </div>
                                            
                                            {/* Pricing */}
                                            <div className="text-center">
                                                <div className="line-through text-lg" style={{color: '#9ca3af'}}>{formatPrice(pkg.gia * 2)}</div>
                                                <div className="text-4xl font-bold" style={{color: '#1f2937'}}>{formatPrice(pkg.gia)} <span className="text-lg">vnd</span></div>
                                                <div className="text-sm mt-2" style={{color: '#6b7280'}}>{t('deviceUser')}</div>
                                            </div>
                                        </div>

                                        {/* Features List - Flexible content */}
                                        <div className="space-y-3 mb-6 flex-grow">
                                            {(displayFeatures.features || displayFeatures).map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm" style={{color: '#374151'}}>{feature}</span>
                                                </div>
                                            ))}
                                            {displayFeatures.hasMore && (
                                                <div className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#6b7280'}}>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm italic" style={{color: '#6b7280'}}>và còn rất nhiều những điều khác</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* View Details Button - Always at bottom */}
                                        <button 
                                            onClick={() => handleViewDetails(pkg)}
                                            className="w-full py-3 rounded-lg font-bold transition-all duration-300 mt-auto" 
                                            style={{background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white'}}
                                            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)'}
                                            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #3b82f6, #2563eb)'}>
                                            {t('viewDetails')}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Other Packages Section */}
                <div>
                    <h3 className="text-3xl font-bold text-center mb-12" style={{color: 'white'}}>{t('otherPackages')}</h3>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">{t('loadingPackages')}</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {packages.slice(3).map((pkg, index) => {
                                const features = pkg.noiDungList?.map(item => item.noi_dung) || defaultFeatures;
                                const displayFeatures = getDisplayFeatures(features);
                                const packageKey = `package${index + 3}`;
                                
                                return (
                                    <div key={pkg.id} className="bg-white rounded-2xl p-6 shadow-lg relative">
                                        {/* Discount Badge - Top Right Corner */}
                                        <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-bold" style={{backgroundColor: '#f97316', color: 'white'}}>
                                            70% OFF
                                        </div>

                                        {/* Expand Button - Bottom Center */}
                                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                            <button 
                                                onClick={() => togglePackage(packageKey)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                                                style={{backgroundColor: '#3b82f6', color: 'white'}}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                                            >
                                                <svg 
                                                    className={`w-4 h-4 transition-transform duration-300 ${
                                                        expandedPackages[packageKey] ? 'rotate-180' : ''
                                                    }`} 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* View Details Button - Bottom Right */}
                                        <div className="absolute -bottom-2 -right-2">
                                            <button 
                                                onClick={() => handleViewDetails(pkg)}
                                                className="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg"
                                                style={{background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white'}}
                                                onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)'}
                                                onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #3b82f6, #2563eb)'}>
                                                {t('viewDetails')}
                                            </button>
                                        </div>

                                        {/* Header - Hide when expanded on desktop, show on mobile */}
                                        <div className={`${expandedPackages[packageKey] ? 'lg:hidden' : ''}`}>
                                            <div className="flex items-center justify-between">
                                                {/* Left Section - Package Title */}
                                                <div className="rounded-full px-6 py-3 hidden sm:block" style={{background: 'linear-gradient(to right, #22c55e, #facc15)'}}>
                                                    <span className="font-bold text-lg" style={{color: 'white'}}>{getPackageDuration(pkg.thoi_han_thang)}</span>
                                                </div>
                                                
                                                {/* Mobile Title - No background, larger text */}
                                                <div className="sm:hidden">
                                                    <span className="font-bold text-2xl" style={{color: '#22c55e'}}>{getPackageDuration(pkg.thoi_han_thang)}</span>
                                                </div>

                                                {/* Middle Section - Price and Info */}
                                                <div className="flex-1 text-center mx-4 sm:mx-8">
                                                    <div className="text-2xl sm:text-3xl font-bold" style={{color: '#1f2937'}}>{formatPrice(pkg.gia)} <span className="text-base sm:text-lg">vnd</span></div>
                                                    <div className="text-xs sm:text-sm mt-1" style={{color: '#6b7280'}}>1 thiết bị | 1 người dùng</div>
                                                </div>

                                                {/* Right Section - Empty space for balance */}
                                                <div className="w-16 sm:w-24"></div>
                                            </div>
                                        </div>

                                        {/* Expandable Content */}
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            expandedPackages[packageKey] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <div className="mt-4 pt-4 border-t" style={{borderColor: '#e5e7eb'}}>
                                                {/* Content Layout - Responsive Grid */}
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                                                    {/* Part 1 - Hero Image */}
                                                    <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
                                                        <img
                                                            src={heroImg}
                                                            alt="Hero fighting virus"
                                                            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
                                                        />
                                                    </div>

                                                    {/* Part 2 - Features Content (Center) */}
                                                    <div className="order-2 lg:order-2">
                                                        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                                                            {(() => {
                                                                const isExpanded = expandedPackages[packageKey];
                                                                const featuresToShow = isExpanded ? features : (displayFeatures.features || displayFeatures);
                                                                const showMoreText = isExpanded ? false : displayFeatures.hasMore;
                                                                
                                                                return (
                                                                    <>
                                                                        {featuresToShow.map((feature, idx) => (
                                                                            <div key={idx} className="flex items-center">
                                                                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}>
                                                                                    <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                    </svg>
                                                                                </div>
                                                                                <span className="text-xs sm:text-sm">{feature}</span>
                                                                            </div>
                                                                        ))}
                                                                        {showMoreText && (
                                                                            <div className="flex items-center">
                                                                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0" style={{backgroundColor: '#6b7280'}}>
                                                                                    <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                                    </svg>
                                                                                </div>
                                                                                <span className="text-xs sm:text-sm italic">và còn rất nhiều những điều khác</span>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>

                                                    {/* Part 3 - Pricing */}
                                                    <div className="order-3 lg:order-3 flex justify-center lg:justify-end">
                                                        <div className="flex flex-col lg:flex-row items-center gap-4">
                                                            <div className="rounded-full px-6 py-3" style={{background: 'linear-gradient(to right, #22c55e, #facc15)'}}>
                                                                <span className="font-bold text-lg" style={{color: 'white'}}>{getPackageDuration(pkg.thoi_han_thang)}</span>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="line-through text-base mb-1" style={{color: '#9ca3af'}}>{formatPrice(pkg.gia * 2)}</div>
                                                                <div className="text-3xl sm:text-4xl font-bold" style={{color: '#1f2937'}}>{formatPrice(pkg.gia)} <span className="text-lg sm:text-xl">vnd</span></div>
                                                                <div className="text-sm sm:text-base mt-1" style={{color: '#6b7280'}}>1 thiết bị | 1 người dùng</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                                        <h3 className="text-2xl font-bold mb-2" style={{background: 'linear-gradient(to right, #2563eb, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                                            {getPackageDuration(selectedPackage.thoi_han_thang)}
                                        </h3>
                                        <p className="font-semibold" style={{color: '#4b5563'}}>1 thiết bị | 1 người dùng</p>
                                    </div>

                                    {/* Phần 2: Nội dung so sánh */}
                                    <div className="mb-6">
                                        {/* Features */}
                                        <div className="space-y-3 mb-6">
                                            {(selectedPackage.noiDungList?.map(item => item.noi_dung) || defaultFeatures).map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm" style={{color: '#374151'}}>{feature}</span>
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
                                            style={{background: 'linear-gradient(to right, #f97316, #ea580c)', color: 'white'}} 
                                            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #ea580c, #dc2626)'} 
                                            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #f97316, #ea580c)'}>
                                            <div className="line-through text-sm mb-1" style={{color: '#e5e7eb'}}>{formatPrice(selectedPackage.gia * 2)}</div>
                                            <div className="text-2xl font-bold mb-1">{formatPrice(selectedPackage.gia)} <span className="text-base">vnd</span></div>
                                            <div className="text-xs" style={{color: '#e5e7eb'}}>1 thiết bị | 1 người dùng</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Right Section - Free Trial Package */}
                                <div className="rounded-2xl p-6 relative border-2" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    {/* Phần 1: Tiêu đề */}
                                    <div className="text-center mb-6">
                                        <p className="text-sm mb-2" style={{color: '#6b7280'}}>GÓI DÙNG THỬ</p>
                                        <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>MIỄN PHÍ</h3>
                                        <p className="font-semibold" style={{color: '#4b5563'}}>1 thiết bị | 1 người dùng</p>
                                    </div>

                                    {/* Phần 2: Nội dung so sánh */}
                                    <div className="mb-6">
                                        {/* Features - Show limited features for free trial */}
                                        <div className="space-y-3 mb-6">
                                            {(selectedPackage.noiDungList?.map(item => item.noi_dung) || defaultFeatures).map((feature, idx) => (
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
                                                    <span className="text-sm" style={{color: idx < 2 ? '#374151' : '#9ca3af'}}>
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
                                        
                                        <button className="w-full py-4 rounded-xl" style={{color: 'black'}}>
                                            <div className="text-2xl font-bold mb-1">MIỄN PHÍ</div>
                                            <div className="text-xs" style={{color: '#1f2937'}}>1 thiết bị | 1 người dùng</div>
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
