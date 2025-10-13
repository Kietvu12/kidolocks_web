import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import kidApple from '../assets/kid_apple.png';
import kidWindow from '../assets/kid_window.png';
import kidAndroid from '../assets/kid_android.png';
import getItOnGooglePlay from '../assets/get_it_on_gg_play.png';
import getItOnAppStore from '../assets/get_it_on_app_store.png';

const DownloadSection = () => {
    const { t } = useLanguage();
    const [expandedSections, setExpandedSections] = useState({
        allDevices: true,
        systemRequirements: true,
        languageSupport: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4" style={{ color: '#111827', fontFamily: 'Myriad Pro' }}>
                        {t('downloadHeader1')}
                    </h2>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold" style={{ fontFamily: 'Myriad Pro' }}>
                        <span style={{ color: '#2563EB' }}>{t('downloadHeader2Left')}</span> <span style={{ color: '#F97316' }}>{t('downloadHeader2Right')}</span>
                    </h3>
                </div>

                {/* Download Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Android */}
                    <div className="text-center">
                        <div className="mb-6">
                            <img
                                src={kidAndroid}
                                alt="Android Kid"
                                className="w-64 h-64 mx-auto object-contain"
                            />
                        </div>
                        <div className="mb-4">
                            <img
                                src={getItOnGooglePlay}
                                alt="Get it on Google Play"
                                className="h-16 mx-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                            />
                        </div>
                    </div>

                    {/* Windows */}
                    <div className="text-center">
                        <div className="mb-6">
                            <img
                                src={kidWindow}
                                alt="Windows Kid"
                                className="w-64 h-64 mx-auto object-contain"
                            />
                        </div>
                        <div className="mb-4">
                            <button className="px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(to right, #F97316, #2563EB)', color: 'white' }}>
                                {t('downloadExe')}
                            </button>
                        </div>
                    </div>

                    {/* iOS */}
                    <div className="text-center">
                        <div className="mb-6">
                            <img
                                src={kidApple}
                                alt="Apple Kid"
                                className="w-64 h-64 mx-auto object-contain"
                            />
                        </div>
                        <div className="mb-4">
                            <img
                                src={getItOnAppStore}
                                alt="Download on the App Store"
                                className="h-16 mx-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                            />
                        </div>
                    </div>
                </div>

                {/* System Requirements */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-4">
                        {/* For All Devices */}
                        <div className="p-6 rounded-3xl shadow-lg" style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)' }}>
                            <div className="flex items-center">
                                <button 
                                    onClick={() => toggleSection('allDevices')}
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 hover:scale-110"
                                    style={{ backgroundColor: '#2563EB' }}
                                >
                                    <svg 
                                        className={`w-4 h-4 text-white transition-transform duration-200 ${expandedSections.allDevices ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <h4 className="text-2xl font-bold" style={{ color: '#111827', fontFamily: 'Myriad Pro' }}>{t('forAllDevices')}</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.allDevices ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <ul className="space-y-2 text-lg pt-2" style={{ color: '#374151' }}>
                                    <li>• {t('requiresInternet')}</li>
                                </ul>
                            </div>
                        </div>

                        {/* System Requirements */}
                        <div className="p-6 rounded-3xl shadow-lg" style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)' }}>
                            <div className="flex items-center">
                                <button 
                                    onClick={() => toggleSection('systemRequirements')}
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 hover:scale-110"
                                    style={{ backgroundColor: '#2563EB' }}
                                >
                                    <svg 
                                        className={`w-4 h-4 text-white transition-transform duration-200 ${expandedSections.systemRequirements ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <h4 className="text-2xl font-bold" style={{ color: '#111827', fontFamily: 'Myriad Pro' }}>{t('systemRequirements')}</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.systemRequirements ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="space-y-4 text-base pt-2" style={{ color: '#374151' }}>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>{t('windowsTitle')}</h5>
                                        <p className="text-sm mb-2"><strong>Hệ điều hành:</strong> Microsoft Windows 11 Home/Pro/Education; Windows 10 Home/Pro/Education; bản cập nhật Microsoft Windows 8 & 8.1 / Pro / 8.1; Microsoft Windows 7 Starter / Home Basic / Home Premium / Professional / Ultimate - SP1 với bản cập nhật KB4474419 & KB4490628 trở lên</p>
                                        <ul className="space-y-1 text-sm">
                                            <li>• <strong>{t('diskSpace')}:</strong> 200 MB {t('freeDiskSpace')}</li>
                                            <li>• <strong>{t('cpu')}:</strong> 1 GHz {t('orHigher')}, x86 {t('or')} x64</li>
                                            <li>• <strong>{t('memory')}:</strong> 1 GB (32-bit) {t('or')} 2 GB (64-bit)</li>
                                            <li>• <strong>{t('minScreenRes')}:</strong> 1024x768</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>{t('androidTitle')}</h5>
                                        <ul className="space-y-1 text-sm">
                                            <li>• <strong>{t('os')}:</strong> Android™ 10 - 15</li>
                                            <li>• <strong>{t('minScreenRes')}:</strong> 320 x 480</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>{t('iosTitle')}</h5>
                                        <ul className="space-y-1 text-sm">
                                            <li>• <strong>{t('os')}:</strong> iOS® 18</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Language Support */}
                        <div className="p-6 rounded-3xl shadow-lg" style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)' }}>
                            <div className="flex items-center">
                                <button 
                                    onClick={() => toggleSection('languageSupport')}
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 hover:scale-110"
                                    style={{ backgroundColor: '#2563EB' }}
                                >
                                    <svg 
                                        className={`w-4 h-4 text-white transition-transform duration-200 ${expandedSections.languageSupport ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <h4 className="text-2xl font-bold" style={{ color: '#111827', fontFamily: 'Myriad Pro' }}>{t('languageSupport')}</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.languageSupport ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="space-y-4 text-base pt-2" style={{ color: '#374151' }}>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>{t('vietnamese')}</h5>
                                        <p className="text-sm">{t('vietnameseDesc')}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>{t('english')}</h5>
                                        <p className="text-sm">{t('englishDesc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadSection;