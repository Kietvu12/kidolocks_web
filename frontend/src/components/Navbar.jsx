import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import logoImage from '/logo.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCountryOpen, setIsCountryOpen] = useState(false)
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const { user, isAuthenticated, isAdmin, logout } = useAuth()
    const { t, toggleLanguage, language } = useLanguage()

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
                setIsUserDropdownOpen(false);
            }
            if (isCountryOpen && !event.target.closest('.country-dropdown')) {
                setIsCountryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserDropdownOpen, isCountryOpen]);

    return (
        <div className="w-full">
            <header
                aria-label="Menu điều hướng chính"
                role="navigation"
                className={`shadow-lg sticky top-0 z-50 font-sans backdrop-blur-sm transition-all duration-300 ${
                    isScrolled ? 'shadow-xl' : 'shadow-lg'
                }`}
                style={{
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: isScrolled ? '1px solid rgba(229, 231, 235, 0.8)' : '1px solid rgba(229, 231, 235, 0.5)'
                }}
            >
                <div className="w-full px-3 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center space-x-2 sm:space-x-3 transition-colors"
                                style={{color: '#2563eb'}}
                                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                            >
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <img 
                                        src={logoImage} 
                                        alt="Kidolock Logo" 
                                        className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain"
                                    />
                                    <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight" style={{color: '#111827'}}>Kidolock</span>
                                </div>
                                <span className="sr-only">Logo Kidolock</span>
                            </button>
                        </div>
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex space-x-4 xl:space-x-6 2xl:space-x-8 flex-1 justify-center">
                            <div className="relative group">
                                <button className="px-2 py-3 text-sm xl:text-base font-medium transition-colors rounded-md" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
                                    {t('products')}
                                </button>
                                <div className="absolute left-0 mt-2 w-[600px] sm:w-[500px] md:w-[550px] lg:w-[600px] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border" style={{backgroundColor: '#ffffff', borderColor: '#e5e7eb'}}>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                            {/* Cột 1: Tính năng chính */}
                                            <div>
                                                <h3 className="text-2xl font-bold mb-8 tracking-tight" style={{color: '#111827'}}>{t('mainFeatures')}</h3>
                                                
                                                <div className="space-y-6">
                                                    <button 
                                                        onClick={() => {
                                                            const element = document.getElementById('features-section');
                                                            if (element) {
                                                                element.scrollIntoView({ behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                                    >
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('protectionFeatures')}</span>
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => {
                                                            const element = document.getElementById('protection-section');
                                                            if (element) {
                                                                element.scrollIntoView({ behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                                    >
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                        <span className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('childProtection')}</span>
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => {
                                                            const element = document.getElementById('education-section');
                                                            if (element) {
                                                                element.scrollIntoView({ behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                                    >
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        <span className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('safeEducation')}</span>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* Cột 2: Giá cả & Đánh giá */}
                                            <div>
                                                <h3 className="text-2xl font-bold mb-8 tracking-tight" style={{color: '#111827'}}>{t('pricingAndReviews')}</h3>
                                                <div className="space-y-6">
                                                    <button 
                                                        onClick={() => {
                                                            const element = document.getElementById('pricing-section');
                                                            if (element) {
                                                                element.scrollIntoView({ behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                                    >
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                        </svg>
                                                        <span className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('pricingTable')}</span>
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => {
                                                            const element = document.getElementById('testimonials-section');
                                                            if (element) {
                                                                element.scrollIntoView({ behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                                    >
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                        </svg>
                                                        <span className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('reviews')}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                                

                            {/* Tải xuống - Dropdown */}
                            <div className="relative group">
                                <button 
                                    onClick={() => {
                                        const element = document.getElementById('download-section');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="px-2 py-3 text-sm xl:text-base font-medium transition-colors rounded-md" 
                                    style={{color: '#374151'}} 
                                    onMouseEnter={(e) => e.target.style.color = '#2563eb'} 
                                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                                >
                                    {t('download')}
                                </button>
                                <div className="absolute left-0 mt-2 w-[400px] sm:w-[350px] md:w-[375px] lg:w-[400px] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border" style={{backgroundColor: '#ffffff', borderColor: '#e5e7eb'}}>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold mb-8 tracking-tight" style={{color: '#111827'}}>{t('download')}</h3>
                                            
                                            <button 
                                                onClick={() => {
                                                    alert('Phiên bản Android đang được phát triển. Vui lòng quay lại sau!');
                                                }}
                                                className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                            >
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <div className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('android')}</div>
                                                    <div className="text-sm text-gray-600">{t('androidDeveloping')}</div>
                                                </div>
                                            </button>
                                            
                                            <button 
                                                onClick={() => {
                                                    alert('Phiên bản iOS đang được phát triển. Vui lòng quay lại sau!');
                                                }}
                                                className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                            >
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18l9-5-9-5-9 5 9 5z" />
                                                </svg>
                                                <div>
                                                    <div className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('ios')}</div>
                                                    <div className="text-sm text-gray-600">{t('iosDeveloping')}</div>
                                                </div>
                                            </button>
                                            
                                            <button 
                                                onClick={() => {
                                                    // Xử lý giống nút Download EXE - mở popup và tải zip
                                                    const element = document.getElementById('download-section');
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                    // Trigger download popup và zip file
                                                    setTimeout(() => {
                                                        const downloadButton = element?.querySelector('button[onclick*="setShowTutorialPopup"]');
                                                        if (downloadButton) {
                                                            downloadButton.click();
                                                        }
                                                    }, 500);
                                                }}
                                                className="flex items-center space-x-4 p-4 rounded-lg group w-full text-left"
                                            >
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#0d9488'}}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div>
                                                    <div className="font-semibold group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>{t('windows')}</div>
                                                    <div className="text-sm text-gray-600">{t('windowsWorking')}</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="px-2 py-3 text-sm xl:text-base font-medium transition-colors rounded-md" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
                                    {t('navAboutUs')}
                                </button>
                                <div className="absolute left-0 mt-2 w-[400px] sm:w-[350px] md:w-[375px] lg:w-[400px] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">{t('aboutUs')}</h3>
                                            <div className="space-y-6">
                                                <a href="/about" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">{t('learnAboutUs')}</span>
                                                </a>
                                                <a href="/contact" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">{t('contactUs')}</span>
                                                </a>
                                                <a href="/careers" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                                    </svg>
                                                    <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">{t('careers')}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        </div>
                        </nav>
                        {/* Header Actions */}
                        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                            {/* Language Selector */}
                            <div className="relative">
                                <button 
                                    onClick={toggleLanguage}
                                    className="p-2 sm:p-3 transition-colors rounded-lg"
                                    style={{color: '#4b5563'}}
                                    onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                    onMouseLeave={(e) => e.target.style.color = '#4b5563'}
                                    aria-label={t('language')}
                                >
                                    <span className="text-sm font-bold">{language === 'vi' ? 'VI' : 'EN'}</span>
                                </button>
                            </div>

                            {/* Country Selector - Hidden on mobile */}
                           

                            {/* User Account Section - Hidden on mobile */}
                            <div className="relative hidden sm:block">
                                {isAuthenticated ? (
                                    <div className="relative user-dropdown">
                                        {/* Avatar Button */}
                                        <button 
                                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                            className="flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors"
                                            style={{backgroundColor: '#eff6ff'}}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#dbeafe'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#eff6ff'}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">
                                                    {user?.ten_phu_huynh?.charAt(0) || 'U'}
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-xs font-medium" style={{color: '#111827'}}>
                                                    {isAdmin() ? t('adminLabel') : t('parentLabel')}
                                                </div>
                                                <div className="text-xs font-semibold" style={{color: '#2563eb'}}>
                                                    {isAdmin() ? t('adminRole') : t('premiumRole')}
                                                </div>
                                            </div>
                                            <svg 
                                                className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                                style={{color: '#6b7280'}}
                                            >
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isUserDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl border z-50" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                                <div className="py-2">
                                                    {/* User Info Header */}
                                                    <div className="px-4 py-3 border-b" style={{borderColor: '#e5e7eb'}}>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                                                <span className="text-white font-bold">
                                                                    {user?.ten_phu_huynh?.charAt(0) || 'U'}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">{user?.ten_phu_huynh}</div>
                                                                <div className="text-sm text-gray-500">{user?.email_phu_huynh}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Menu Items */}
                                                    <div className="py-2">
                                                        {/* Admin Dashboard Button - Only show for admins */}
                                                        {isAdmin() && (
                                                            <button 
                                                                onClick={() => {
                                                                    setIsUserDropdownOpen(false);
                                                                    navigate('/admin');
                                                                }}
                                                                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                                </svg>
                                                                {t('adminDashboard')}
                                                            </button>
                                                        )}

                                                        <button 
                                                            onClick={() => {
                                                                setIsUserDropdownOpen(false);
                                                                navigate('/wallet');
                                                            }}
                                                            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                            </svg>
                                                            {t('wallet')}
                                                        </button>
                                                        
                                                        <button 
                                                            onClick={() => {
                                                                setIsUserDropdownOpen(false);
                                                                // TODO: Navigate to purchase history
                                                                console.log('Navigate to purchase history');
                                                            }}
                                                            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                            </svg>
                                                            {t('purchaseHistory')}
                                                            <span className="ml-auto text-xs text-gray-400">{t('comingSoon')}</span>
                                                        </button>

                                                        <button 
                                                            onClick={() => {
                                                                setIsUserDropdownOpen(false);
                                                                navigate('/change-password');
                                                            }}
                                                            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                            </svg>
                                                            {t('changePassword')}
                                                        </button>

                                                        <div className="border-t my-2" style={{borderColor: '#e5e7eb'}}></div>

                                                        <button 
                                                            onClick={() => {
                                                                setIsUserDropdownOpen(false);
                                                                logout();
                                                            }}
                                                            className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                            </svg>
                                                            {t('logoutLabel')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 transition-colors rounded-lg"
                                        style={{color: '#374151'}}
                                        onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                        onMouseLeave={(e) => e.target.style.color = '#374151'}
                                    >
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M.75 12v-.02a2.6 2.6 0 0 1 2.67-2.65h2.45L8 14.43l2.13-5.1h2.45a2.6 2.6 0 0 1 2.67 2.65v.04l.75 5.3H0L.75 12ZM8 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                                                    fill="currentColor"></path>
                                        </svg>
                                        <span className="text-xs sm:text-sm font-medium">{t('login')}</span>
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M9.7.3a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4A1 1 0 0 1 1.7.3L5 3.58 8.3.29a1 1 0 0 1 1.4 0Z">
                                                </path>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 sm:p-3 transition-colors rounded-lg"
                                style={{color: '#4b5563'}}
                                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                onMouseLeave={(e) => e.target.style.color = '#4b5563'}
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            </div>
                        </div>
                    </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t shadow-lg" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                        <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
                            <div className="space-y-1 sm:space-y-2">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">{t('products')}</div>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const element = document.getElementById('features-section');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('protectionFeatures')}
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const element = document.getElementById('protection-section');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('childProtection')}
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const element = document.getElementById('education-section');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('safeEducation')}
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const element = document.getElementById('pricing-section');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('pricingTable')}
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const element = document.getElementById('testimonials-section');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('reviews')}
                                </button>
                </div>
                            
                            {/* Tải xuống - Mobile Dropdown */}
                            <div className="space-y-1 sm:space-y-2">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">{t('download')}</div>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        alert('Phiên bản Android đang được phát triển. Vui lòng quay lại sau!');
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('android')}
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        alert('Phiên bản iOS đang được phát triển. Vui lòng quay lại sau!');
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('ios')}
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const element = document.getElementById('download-section');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                        // Trigger download popup và zip file
                                        setTimeout(() => {
                                            const downloadButton = element?.querySelector('button[onclick*="setShowTutorialPopup"]');
                                            if (downloadButton) {
                                                downloadButton.click();
                                            }
                                        }, 500);
                                    }} 
                                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                    {t('windows')}
                                </button>
                </div>
                            
                            
                            <div className="space-y-1 sm:space-y-2">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">{t('navAboutUs')}</div>
                                <button onClick={() => navigate('/about')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg">{t('learnAboutUs')}</button>
                                <button onClick={() => navigate('/contact')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg">{t('contactUs')}</button>
                                <button onClick={() => navigate('/careers')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg">{t('careers')}</button>
                            </div>
                            
                            {/* Mobile Authentication Section */}
                            <div className="space-y-1 sm:space-y-2 border-t border-gray-200 pt-4">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">{t('mobileAccount')}</div>
                                {isAuthenticated ? (
                                    <>
                                        <div className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
                                            <div className="font-medium">{isAdmin() ? t('adminLabel') : t('parentLabel')}</div>
                                            <div className="text-blue-600 font-semibold">{isAdmin() ? t('adminRole') : t('premiumRole')}</div>
                                        </div>
                                        
                                        {/* Admin Dashboard Button - Only show for admins */}
                                        {isAdmin() && (
                                            <button 
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    navigate('/admin');
                                                }}
                                                className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                            >
                                                {t('adminDashboard')}
                                            </button>
                                        )}
                                        
                                        <button 
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                navigate('/wallet');
                                            }}
                                            className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                        >
                                            {t('wallet')}
                                        </button>
                                        
                                        <button 
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                navigate('/change-password');
                                            }}
                                            className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                        >
                                            {t('changePassword')}
                                        </button>
                                        
                                        <button 
                                            onClick={() => logout()}
                                            className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-red-600 hover:text-red-700 transition-colors rounded-lg"
                                        >
                                            {t('logoutLabel')}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => navigate('/login')}
                                            className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                        >
                                            Đăng nhập
                                        </button>
                                        <button 
                                            onClick={() => navigate('/register')}
                                            className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                                        >
                                            Đăng ký
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Country Selector Dropdown */}
                {isCountryOpen && (
                    <div className="absolute top-full right-0 mt-2 w-96 rounded-xl shadow-xl border z-50" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold" style={{color: '#111827'}}>{t('country')}</h3>
                                <button 
                                    onClick={() => setIsCountryOpen(false)}
                                    className="p-2  rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6b7280'}}>
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                        </div>
                            
                            <div className="grid grid-cols-2 gap-6 max-h-96 overflow-y-auto">
                                <div>
                                    <div className="space-y-2">
                                        <a href="https://www.kaspersky.com.vn/" className="block text-sm font-semibold px-2 py-1 rounded" style={{color: '#2563eb', backgroundColor: '#eff6ff'}}>Việt Nam</a>
                                        </div>
                                    </div>
                                <div>
                                    <div className="space-y-2">
                                        <a href="https://usa.kaspersky.com/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>English</a>
                                        </div>
                                    </div>
                    </div>
                </div>
                </div>
                )}
            </header>
        </div>
    )
}

export default Navbar