import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPopup = ({ isVisible, onClose, orderData }) => {
    const [showAnimation, setShowAnimation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isVisible) {
            // Delay để animation chạy mượt
            setTimeout(() => setShowAnimation(true), 100);
        } else {
            setShowAnimation(false);
        }
    }, [isVisible]);

    const handleConfirm = () => {
        setShowAnimation(false);
        setTimeout(() => {
            onClose();
            navigate('/');
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    showAnimation ? 'opacity-50' : 'opacity-0'
                }`}
                onClick={handleConfirm}
            />
            
            {/* Popup */}
            <div 
                className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
                    showAnimation 
                        ? 'scale-100 opacity-100 translate-y-0' 
                        : 'scale-95 opacity-0 translate-y-4'
                }`}
            >
                {/* Success Icon với animation */}
                <div className="flex justify-center pt-8 pb-4">
                    <div 
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                            showAnimation ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                        }`}
                        style={{background: 'linear-gradient(to right, #10b981, #059669)'}}
                    >
                        <svg 
                            className="w-10 h-10 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={3} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Thanh toán thành công!
                    </h2>
                    
                    <p className="text-gray-600 mb-6">
                        Đơn hàng của bạn đã được xử lý thành công
                    </p>

                    {/* Order Details */}
                    {orderData && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                            <h3 className="font-semibold text-gray-800 mb-2">Chi tiết đơn hàng:</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Mã đơn hàng:</span>
                                    <span className="font-medium">{orderData.order_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Gói dịch vụ:</span>
                                    <span className="font-medium">{orderData.package_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Số tiền:</span>
                                    <span className="font-medium text-green-600">
                                        {new Intl.NumberFormat('vi-VN').format(orderData.amount)} VND
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Confirmation Button */}
                    <button
                        onClick={handleConfirm}
                        className="w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        style={{background: 'linear-gradient(to right, #3b82f6, #2563eb)'}}
                    >
                        Xác nhận
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default SuccessPopup;
