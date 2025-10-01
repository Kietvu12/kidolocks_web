import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import Navbar from '../components/Navbar';
import heroImg from '../assets/hero_img.png';
import heroWinImg from '../assets/hero_win.png';

const PaymentPage = () => {
    const { packageId } = useParams();
    const navigate = useNavigate();
    const [packageInfo, setPackageInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin gói
                const packageResponse = await apiService.getGoiById(packageId);
                if (packageResponse.success) {
                    setPackageInfo(packageResponse.data);
                }

                // Lấy thông tin user hiện tại
                const userResponse = await apiService.getCurrentUser();
                if (userResponse.success) {
                    setUserInfo(userResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Không thể tải thông tin gói dịch vụ');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [packageId]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const getPackageDuration = (thoiHanThang) => {
        if (thoiHanThang === 1) return '1 THÁNG';
        if (thoiHanThang === 12) return '1 NĂM';
        if (thoiHanThang === 24) return '2 NĂM';
        return `${thoiHanThang} THÁNG`;
    };

    const handlePayment = async () => {
        if (!userInfo || !packageInfo) {
            setError('Thiếu thông tin người dùng hoặc gói dịch vụ');
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            const response = await apiService.createPayment({
                phu_huynh_id: userInfo.ma_phu_huynh,
                thong_tin_goi_id: packageInfo.id
            });

            if (response.success) {
                // Redirect to VNPay
                window.location.href = response.data.payment_url;
            } else {
                setError(response.message || 'Có lỗi xảy ra khi tạo thanh toán');
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            setError('Lỗi kết nối server. Vui lòng thử lại sau.');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang tải thông tin...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error && !packageInfo) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Về trang chủ
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Thanh Toán Gói Dịch Vụ</h1>
                    <p className="text-gray-600">Hoàn tất đơn hàng của bạn</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Package Information */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="text-center mb-6">
                                <div className="rounded-full px-6 py-3 text-center mb-4" style={{background: 'linear-gradient(to right, #3b82f6, #4ade80)'}}>
                                    <span className="font-bold text-lg text-white">{getPackageDuration(packageInfo?.thoi_han_thang)}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{packageInfo?.ten}</h2>
                                <p className="text-gray-600">{packageInfo?.mo_ta}</p>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tính năng bao gồm:</h3>
                                {packageInfo?.noiDungList?.slice(0, 7).map((feature, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}>
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-700">{feature.noi_dung}</span>
                                    </div>
                                ))}
                                {packageInfo?.noiDungList?.length > 7 && (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{backgroundColor: '#6b7280'}}>
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: 'white'}}>
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm italic text-gray-500">và còn rất nhiều những điều khác</span>
                                    </div>
                                )}
                            </div>

                            {/* Hero Image */}
                            <div className="flex justify-center">
                                <img src={heroImg} alt="Hero fighting virus" className="w-32 h-32 object-contain" />
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Thông Tin Thanh Toán</h3>
                                <p className="text-gray-600">Xác nhận đơn hàng của bạn</p>
                            </div>

                            {/* User Info */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Thông tin người mua:</h4>
                                <p className="text-gray-600">👤 {userInfo?.ten_phu_huynh}</p>
                                <p className="text-gray-600">📧 {userInfo?.email_phu_huynh}</p>
                                <p className="text-gray-600">📱 {userInfo?.sdt}</p>
                            </div>

                            {/* Package Summary */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h4 className="font-semibold text-gray-800 mb-3">Tóm tắt đơn hàng:</h4>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">{packageInfo?.ten}</span>
                                    <span className="font-semibold">{getPackageDuration(packageInfo?.thoi_han_thang)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Số thiết bị</span>
                                    <span className="font-semibold">{packageInfo?.so_thiet_bi || 1} thiết bị</span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                                    <span className="text-2xl font-bold text-blue-600">{formatPrice(packageInfo?.gia)} VND</span>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-700">{error}</span>
                                    </div>
                                </div>
                            )}

                            {/* Payment Button */}
                            <div className="space-y-4">
                                <button
                                    onClick={handlePayment}
                                    disabled={processing || !userInfo || !packageInfo}
                                    className="w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{background: 'linear-gradient(to right, #f97316, #ea580c)', color: 'white'}}
                                    onMouseEnter={(e) => {
                                        if (!e.target.disabled) {
                                            e.target.style.background = 'linear-gradient(to right, #ea580c, #dc2626)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!e.target.disabled) {
                                            e.target.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
                                        }
                                    }}
                                >
                                    {processing ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Đang xử lý...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            Thanh Toán VNPay
                                        </div>
                                    )}
                                </button>

                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Quay lại trang chủ
                                </button>
                            </div>

                            {/* Security Notice */}
                            <div className="mt-6 text-center">
                                <div className="flex items-center justify-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    Thanh toán được bảo mật bởi VNPay
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default PaymentPage;
