import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import messengerIcon from '../assets/messenger.svg';
import zaloIcon from '../assets/zalo.svg';

const ContactFloatingButtons = () => {
    const { t } = useLanguage();
    const [showPhonePopup, setShowPhonePopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMessengerClick = () => {
        // Mở chat Messenger với trang Facebook
        window.open('https://m.me/RdSic', '_blank');
    };

    const handleZaloClick = () => {
        // Mở chat Zalo với số điện thoại
        window.open('https://zalo.me/803412169472209795', '_blank');
    };

    const handlePhoneClick = () => {
        setShowPhonePopup(true);
    };

    const handleCallNow = () => {
        // Gọi điện trực tiếp trên mobile
        window.location.href = 'tel:0989 427 809';
    };

    const closePhonePopup = () => {
        setShowPhonePopup(false);
    };

    return (
        <>
            {/* Floating Contact Buttons */}
            <div className="fixed right-3 sm:right-4 bottom-3 sm:bottom-4 z-50 flex flex-col gap-2 sm:gap-3">
                {/* Phone Button */}
                <button
                    onClick={handlePhoneClick}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    style={{ backgroundColor: '#10b981' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                    title={t('hotline')}
                >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                </button>

                {/* Messenger Button */}
                <button
                    onClick={handleMessengerClick}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    style={{ backgroundColor: '#3b82f6' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    title="Messenger"
                >
                    <img src={messengerIcon} alt="Messenger" className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                </button>

                {/* Zalo Button */}
                <button
                    onClick={handleZaloClick}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    style={{ backgroundColor: '#2563eb' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                    title="Zalo"
                >
                    <img src={zaloIcon} alt="Zalo" className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Phone Popup */}
            {showPhonePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#dcfce7' }}>
                                <svg className="w-8 h-8" style={{ color: '#16a34a' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#1f2937', fontFamily: 'Myriad Pro, sans-serif' }}>
                                {t('hotline')}
                            </h3>
                            <p style={{ color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif' }}>
                                {t('hotlineDescription')}
                            </p>
                        </div>

                        {/* Phone Number */}
                        <div className="text-center mb-6">
                            <div className="text-2xl font-bold mb-2" style={{ color: '#16a34a', fontFamily: 'Myriad Pro, sans-serif' }}>
                            0989 427 809
                            </div>
                            <div className="text-sm" style={{ color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif' }}>
                                {t('hotlineTime')}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            {/* Call Now Button - Only show on mobile */}
                            {isMobile && (
                                <button
                                    onClick={handleCallNow}
                                    className="w-full py-3 font-bold rounded-xl transition-colors duration-300"
                                    style={{ backgroundColor: '#10b981', color: 'white', fontFamily: 'Myriad Pro, sans-serif' }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                                >
                                    {t('callNow')}
                                </button>
                            )}

                            {/* Close Button */}
                            <button
                                onClick={closePhonePopup}
                                className="w-full py-3 font-semibold rounded-xl transition-colors duration-300"
                                style={{ backgroundColor: '#e5e7eb', color: '#374151', fontFamily: 'Myriad Pro, sans-serif' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                            >
                                {t('close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactFloatingButtons;
