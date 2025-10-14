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
    const [showModal, setShowModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedDeviceCount, setSelectedDeviceCount] = useState(1);
    const [standardPackage, setStandardPackage] = useState(null);
    const [paidPackages, setPaidPackages] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

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

    // Lấy gói trả phí theo số thiết bị được chọn
    const getSelectedPaidPackage = () => {
        return paidPackages.find(pkg => pkg.so_thiet_bi === selectedDeviceCount);
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
                    <p className="text-2xl mb-4" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>{t('pricingSubtitle')}</p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{fontFamily: 'Myriad Pro, sans-serif'}}>
                        <span style={{color: '#1f2937'}}>{t('pricingTitle1')}</span> <span style={{color: '#f97316'}}>{t('pricingTitle2')}</span>
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Card 1: Gói tiêu chuẩn (id=8) */}
                            {standardPackage && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg relative flex flex-col h-full">
                                        {/* Package Title */}
                                        <div className="mb-6">
                                        <div className="rounded-full px-6 py-3 text-center mb-2" style={{background: 'linear-gradient(to bottom, #56CCFF, #004895)'}}>
                                            <span className="font-bold text-lg" style={{color: 'white', fontFamily: 'Myriad Pro, sans-serif'}}>GÓI TIÊU CHUẨN</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-bold uppercase text-center" style={{color: '#111827', fontFamily: 'Myriad Pro, sans-serif'}}>Kidolock Basic</h3>
                                            
                                            {/* Pricing */}
                                            <div className="text-center">

                                            <div className="text-sm mt-2" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                {standardPackage.so_thiet_bi || 1} thiết bị | 1 người dùng
                                            </div>
                                            
                                            {/* Operating Systems */}
                                            <div className="mt-4">
                                                <div className="flex items-center justify-center space-x-4 text-xs" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                    <span>Windows®</span>
                                                    <div className="w-px h-3 bg-gray-300"></div>
                                                    <span>macOS®</span>
                                                    <div className="w-px h-3 bg-gray-300"></div>
                                                    <span>Android™</span>
                                                    <div className="w-px h-3 bg-gray-300"></div>
                                                    <span>iOS®</span>
                                                </div>
                                                <div className="text-sm font-semibold mt-2" style={{color: '#3b82f6', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                    {(standardPackage.noiDungList?.length || defaultFeatures.length)} tính năng bảo vệ
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                    {/* Features List */}
                                        <div className="space-y-3 mb-6 flex-grow">
                                        {(standardPackage.noiDungList?.map(item => item.noi_dung) || defaultFeatures).map((feature, idx) => (
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
                                            <div className="text-lg font-bold" style={{color: '#1f2937'}}>MIỄN PHÍ</div>
                                            <div className="text-xs" style={{color: '#6b7280'}}>Không giới hạn thời gian</div>
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
                                <div className="bg-white rounded-2xl p-6 shadow-lg relative flex flex-col h-full">
                                    {/* Package Title */}
                                    <div className="mb-6">
                                        <div className="rounded-full px-6 py-3 text-center mb-2" style={{background: 'linear-gradient(to right, #873BFF, #004895)'}}>
                                            <span className="font-bold text-lg" style={{color: 'white', fontFamily: 'Myriad Pro, sans-serif'}}>GÓI TRẢ PHÍ</span>
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
                                            Kidolock Premium
                                        </h3>

                                        {/* Device Count and User Info */}
                                        <div className="text-center mb-4">
                                            <div className="text-sm" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                {selectedDeviceCount} thiết bị | 1 người dùng
                                        </div>
                                        </div>

                                        {/* Operating Systems */}
                                        <div className="text-center mb-4">
                                            <div className="flex items-center justify-center space-x-4 text-xs" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                <span>Windows®</span>
                                                <div className="w-px h-3 bg-gray-300"></div>
                                                <span>macOS®</span>
                                                <div className="w-px h-3 bg-gray-300"></div>
                                                <span>Android™</span>
                                                <div className="w-px h-3 bg-gray-300"></div>
                                                <span>iOS®</span>
                                                </div>
                                            <div className="text-sm font-semibold mt-2" style={{color: '#3b82f6', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                {(paidPackages[0]?.noiDungList?.length || defaultFeatures.length)} tính năng bảo vệ
                                            </div>
                                        </div>
                                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-3 mb-6 flex-grow">
                                        {(paidPackages[0]?.noiDungList?.map(item => item.noi_dung) || defaultFeatures).map((feature, idx) => (
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
                                                        <div className="font-bold">{getSelectedPaidPackage()?.so_thiet_bi || 1} Thiết bị</div>
                                                        <div className="text-sm" style={{color: '#6b7280'}}>1 Năm</div>
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
                                                                    <div className="font-bold">{pkg.so_thiet_bi} Thiết bị</div>
                                                                    <div className="text-sm" style={{color: '#6b7280'}}>1 Năm</div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="font-bold">{formatPrice(pkg.gia)} đ*</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Discount Card */}
                                        {selectedDeviceCount > 1 && (
                                            <div className="flex justify-center mb-3">
                                                <div className="text-center py-3 px-6 rounded-2xl" style={{backgroundColor: '#f59e0b', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                    <div className="text-sm font-bold uppercase" style={{color: '#000000'}}>
                                                        {selectedDeviceCount === 2 ? 'Tiết kiệm 5%' : selectedDeviceCount === 3 ? 'Tiết kiệm 10%' : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Pricing */}
                                        <div className="text-center py-3 px-4 rounded-lg" style={{backgroundColor: '#f8fafc', fontFamily: 'Myriad Pro, sans-serif'}}>
                                            <div className="text-4xl font-bold" style={{color: '#1f2937', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                {getSelectedPaidPackage() ? formatPrice(getSelectedPaidPackage().gia) : '0'} vnd
                                            </div>
                                            <div className="text-sm mt-1" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                                1 năm
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            {/* Buy Now Button */}
                                            <button 
                                                onClick={() => handleBuyNow(getSelectedPaidPackage())}
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
                                                MUA NGAY
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

                            {/* Card 3: Liên hệ tư vấn */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg relative flex flex-col h-full items-center justify-center" style={{border: '2px solid #10b981'}}>
                                {/* Phone Sticker with Animation */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center animate-bounce" style={{background: 'linear-gradient(to bottom right, #10b981, #059669)'}}>
                                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    {/* Ripple Effect */}
                                    <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{borderColor: '#10b981'}}></div>
                                    <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{borderColor: '#059669', animationDelay: '0.5s'}}></div>
                                </div>

                                {/* Contact Text */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-2" style={{color: '#10b981', fontFamily: 'Myriad Pro, sans-serif'}}>LIÊN HỆ TƯ VẤN</h3>
                                    <p className="text-sm" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>
                                        Liên hệ với chúng tôi để được tư vấn về gói dịch vụ phù hợp nhất
                                    </p>
                                </div>

                                {/* Contact Button */}
                                <button 
                                    className="w-full py-3 rounded-lg font-bold transition-all duration-300 mt-6" 
                                    style={{background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', fontFamily: 'Myriad Pro, sans-serif'}}
                                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #059669, #047857)'}
                                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #10b981, #059669)'}>
                                    LIÊN HỆ NGAY
                                </button>
                                    </div>
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
                                            {selectedPackage.id === 8 ? 'GÓI TIÊU CHUẨN' : 'GÓI TRẢ PHÍ'}
                                        </h3>
                                        <p className="font-semibold" style={{color: '#4b5563', fontFamily: 'Myriad Pro, sans-serif'}}>
                                            {selectedPackage.so_thiet_bi || 1} thiết bị | 1 người dùng
                                        </p>
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
                                                    <div className="text-2xl font-bold mb-1" style={{fontFamily: 'Myriad Pro, sans-serif'}}>MIỄN PHÍ</div>
                                                    <div className="text-xs" style={{color: '#e5e7eb', fontFamily: 'Myriad Pro, sans-serif'}}>{selectedPackage.so_thiet_bi || 1} thiết bị | 1 người dùng</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="line-through text-sm mb-1" style={{color: '#e5e7eb', fontFamily: 'Myriad Pro, sans-serif'}}>{formatPrice(selectedPackage.gia * 2)}</div>
                                                    <div className="text-2xl font-bold mb-1" style={{fontFamily: 'Myriad Pro, sans-serif'}}>{formatPrice(selectedPackage.gia)} <span className="text-base">vnd</span></div>
                                                    <div className="text-xs" style={{color: '#e5e7eb', fontFamily: 'Myriad Pro, sans-serif'}}>{selectedPackage.so_thiet_bi || 1} thiết bị | 1 người dùng</div>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Right Section - Free Trial Package */}
                                <div className="rounded-2xl p-6 relative border-2" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    {/* Phần 1: Tiêu đề */}
                                    <div className="text-center mb-6">
                                        <p className="text-sm mb-2" style={{color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif'}}>GÓI DÙNG THỬ</p>
                                        <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937', fontFamily: 'Myriad Pro, sans-serif'}}>MIỄN PHÍ</h3>
                                        <p className="font-semibold" style={{color: '#4b5563', fontFamily: 'Myriad Pro, sans-serif'}}>1 thiết bị | 1 người dùng</p>
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
