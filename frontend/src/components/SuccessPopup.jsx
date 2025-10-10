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
                className={`absolute inset-0 transition-opacity duration-300 ${
                    showAnimation ? '' : ''
                }`}
                style={{backgroundColor: '#000000', opacity: showAnimation ? 0.5 : 0}}
                onClick={handleConfirm}
            />
            
            {/* Popup */}
            <div 
                className={`relative rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
                    showAnimation 
                        ? 'scale-100 opacity-100 translate-y-0' 
                        : 'scale-95 opacity-0 translate-y-4'
                }`}
                style={{backgroundColor: '#ffffff'}}
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
                            className="w-10 h-10" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{color: '#ffffff'}}
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
                    <h2 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>
                        Thanh toán thành công!
                    </h2>
                    
                    <p className="mb-6" style={{color: '#4b5563'}}>
                        Đơn hàng của bạn đã được xử lý thành công
                    </p>

                    {/* Order Details */}
                    {orderData && (
                        <div className="rounded-lg p-4 mb-6 text-left" style={{backgroundColor: '#f9fafb'}}>
                            <h3 className="font-semibold mb-2" style={{color: '#1f2937'}}>Chi tiết đơn hàng:</h3>
                            <div className="space-y-1 text-sm" style={{color: '#4b5563'}}>
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
                                    <span className="font-medium" style={{color: '#16a34a'}}>
                                        {new Intl.NumberFormat('vi-VN').format(orderData.amount)} VND
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Confirmation Button */}
                    <button
                        onClick={handleConfirm}
                        className="w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        style={{background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: '#ffffff'}}
                    >
                        Xác nhận
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping" style={{backgroundColor: '#4ade80'}}></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: '#60a5fa'}}></div>
            </div>
        </div>
    );
};

export default SuccessPopup;
