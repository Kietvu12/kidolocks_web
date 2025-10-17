import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import logoImage from '/logo.png';

const SplashScreen = ({ onComplete }) => {
    const { language, setLanguage } = useLanguage();
    const [showLogo, setShowLogo] = useState(false);
    const [logoMoveLeft, setLogoMoveLeft] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showSlogan, setShowSlogan] = useState(false);
    const [showLanguagePopup, setShowLanguagePopup] = useState(false);
    const [visibleLetters, setVisibleLetters] = useState([]);

    useEffect(() => {
        // Check if user has already selected language
        const hasSelectedLanguage = localStorage.getItem('hasSelectedLanguage');
        
        if (hasSelectedLanguage) {
            // Skip splash screen if language already selected
            onComplete();
            return;
        }

        // Start animation sequence
        const timer1 = setTimeout(() => {
            setShowLogo(true);
        }, 300);

        const timer2 = setTimeout(() => {
            setLogoMoveLeft(true);
        }, 1000);

        const timer3 = setTimeout(() => {
            setShowText(true);
            // Animate letters one by one
            const letters = ['i', 'd', 'o', 'l', 'o', 'c', 'k'];
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    setVisibleLetters(prev => [...prev, letter]);
                }, 1200 + (index * 150)); // Each letter appears 150ms apart
            });
        }, 1200);

        const timer4 = setTimeout(() => {
            setShowSlogan(true);
        }, 2400); // After all letters are visible

        const timer5 = setTimeout(() => {
            setShowLanguagePopup(true);
        }, 5400); // 3s after slogan

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, [onComplete]);

    const handleLanguageSelect = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        localStorage.setItem('hasSelectedLanguage', 'true');
        setShowLanguagePopup(false);
        
        // Delay before completing splash screen
        setTimeout(() => {
            onComplete();
        }, 500);
    };

    if (localStorage.getItem('hasSelectedLanguage')) {
        return null; // Don't show splash screen if language already selected
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            {/* Logo and Text Container */}
            <div className="flex items-end space-x-0">
                {/* Logo */}
                <div 
                    className={`relative transition-all duration-700 ease-out ${
                        showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    } ${
                        logoMoveLeft ? 'transform-none' : 'transform-none'
                    }`}
                    style={{
                        transform: logoMoveLeft ? 'translateX(-8px)' : 'translateX(0)',
                        transition: 'transform 0.8s ease-out'
                    }}
                >
                    <img 
                        src={logoImage} 
                        alt="Kidolock Logo" 
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain"
                    />
                </div>

                {/* Animated Text */}
                <div className="relative overflow-hidden">
                    <h1 
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight transition-all duration-1000 ease-out ${
                            showText ? 'opacity-100 transform translateX(0)' : 'opacity-0 transform translateX(100px)'
                        }`}
                        style={{
                            fontFamily: 'Baloo Bhaijaan 2, sans-serif'
                        }}
                    >
                        {['i', 'd', 'o', 'l', 'o', 'c', 'k'].map((letter, index) => (
                            <span
                                key={index}
                                className={`inline-block transition-all duration-300 ease-out ${
                                    visibleLetters.includes(letter) 
                                        ? 'opacity-100 transform scale-100' 
                                        : 'opacity-0 transform scale-50'
                                }`}
                                style={{
                                    background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #0066ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    transitionDelay: `${index * 50}ms`
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>

            {/* Slogan */}
            <div 
                className={`mt-6 sm:mt-8 md:mt-10 lg:mt-12 transition-all duration-1000 ease-out ${
                    showSlogan ? 'opacity-100 transform translateY(0)' : 'opacity-0 transform translateY(20px)'
                }`}
            >
                <p 
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wide"
                    style={{
                        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff8c00 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: 'Baloo Bhaijaan 2, sans-serif'
                    }}
                >
                    Good Kid - Good Future
                </p>
            </div>

            {/* Language Selection Popup */}
            {showLanguagePopup && (
                <div 
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                    }}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
                        style={{
                            animation: 'fadeIn 0.3s ease-out',
                            transform: 'scale(1)',
                            transition: 'all 0.3s ease-out'
                        }}
                    >
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2" style={{ color: '#111827', fontFamily: 'Myriad Pro' }}>
                                Chọn ngôn ngữ / Select Language
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Vui lòng chọn ngôn ngữ để tiếp tục / Please select your language to continue
                            </p>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleLanguageSelect('vi')}
                                    className="w-full p-4 rounded-xl border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 hover:bg-blue-50 group"
                                >
                                    <div className="flex items-center justify-center space-x-3">
                                        <div className="w-8 h-6 bg-red-500 rounded-sm flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">VN</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                                                Tiếng Việt
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Vietnamese
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleLanguageSelect('en')}
                                    className="w-full p-4 rounded-xl border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 hover:bg-blue-50 group"
                                >
                                    <div className="flex items-center justify-center space-x-3">
                                        <div className="w-8 h-6 bg-blue-500 rounded-sm flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">US</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                                                English
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                English
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SplashScreen;
