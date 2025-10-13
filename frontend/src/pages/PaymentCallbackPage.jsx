import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSearchParams } from 'react-router-dom';
import SuccessPopup from '../components/SuccessPopup';
import apiService from '../services/api';

const PaymentCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const { t } = useLanguage();
    const [showPopup, setShowPopup] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const processPaymentResult = async () => {
            try {
                // Kiểm tra có lỗi server không
                const serverError = searchParams.get('error');
                if (serverError) {
                    setError(t('errorOccurred'));
                    setLoading(false);
                    return;
                }

                // Lấy các tham số từ URL
                const vnpResponseCode = searchParams.get('vnp_ResponseCode');
                const vnpTxnRef = searchParams.get('vnp_TxnRef');
                const vnpAmount = searchParams.get('vnp_Amount');
                const vnpTransactionStatus = searchParams.get('vnp_TransactionStatus');

                console.log('Payment callback params:', {
                    vnpResponseCode,
                    vnpTxnRef,
                    vnpAmount,
                    vnpTransactionStatus
                });

                // Kiểm tra kết quả thanh toán
                if (vnpResponseCode === '00' && vnpTransactionStatus === '00') {
                    // Thanh toán thành công
                    const amount = parseInt(vnpAmount) / 100; // VNPay trả về số tiền nhân 100
                    
                    setOrderData({
                        order_id: vnpTxnRef,
                        amount: amount,
                        package_name: 'Gói dịch vụ', // Có thể lấy từ API nếu cần
                        status: 'SUCCESS'
                    });

                    // Hiển thị popup sau một chút delay để UX mượt hơn
                    setTimeout(() => {
                        setShowPopup(true);
                        setLoading(false);
                    }, 500);
                } else {
                    // Thanh toán thất bại
                    setError(t('paymentNotSuccessful'));
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error processing payment result:', error);
                setError(t('errorOccurred'));
                setLoading(false);
            }
        };

        processPaymentResult();
    }, [searchParams]);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('processingPaymentResult')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('errorOccurred')}</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {t('backHome')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Success Popup */}
            <SuccessPopup 
                isVisible={showPopup}
                onClose={handleClosePopup}
                orderData={orderData}
            />
        </div>
    );
};

export default PaymentCallbackPage;
