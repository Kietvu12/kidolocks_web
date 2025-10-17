import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import JSZip from 'jszip';
import kidApple from '../assets/kid_apple.png';
import kidWindow from '../assets/kid_window.png';
import kidAndroid from '../assets/kid_android.png';
import getItOnGooglePlay from '../assets/get_it_on_gg_play.png';
import getItOnAppStore from '../assets/get_it_on_app_store.png';
import step1Image from '../assets/pp_img/1.png';
import step2Image from '../assets/pp_img/2.png';
import step3Image from '../assets/pp_img/3.png';
import step4Image from '../assets/pp_img/4.png';
import step5Image from '../assets/pp_img/5.png';
import step6Image from '../assets/pp_img/6.png';
import step7Image from '../assets/pp_img/7.png';
import step8Image from '../assets/pp_img/8.png';
import step9Image from '../assets/pp_img/9.png';
import step10Image from '../assets/pp_img/10.png';
import step11Image from '../assets/pp_img/11.png';
import step12Image from '../assets/pp_img/12.png';
import step13Image from '../assets/pp_img/13.png';
import step14Image from '../assets/pp_img/14.png';
import step15Image from '../assets/pp_img/15.png';
import step16Image from '../assets/pp_img/16.png';
import step17Image from '../assets/pp_img/17.png';
import step18Image from '../assets/pp_img/18.png';
import step19Image from '../assets/pp_img/19.png';
import step20Image from '../assets/pp_img/20.png';
import step21Image from '../assets/pp_img/21.png';
import step22Image from '../assets/pp_img/22.png';
import step23Image from '../assets/pp_img/23.png';
import step24Image from '../assets/pp_img/24.png';
import step25Image from '../assets/pp_img/25.png';
import step26Image from '../assets/pp_img/26.png';
import step27Image from '../assets/pp_img/27.png';
import step28Image from '../assets/pp_img/28.png';
import step29Image from '../assets/pp_img/29.png';
import step30Image from '../assets/pp_img/30.png';
import step31Image from '../assets/pp_img/31.png';
import step32Image from '../assets/pp_img/32.png';

const DownloadSection = () => {
    const { t, language } = useLanguage();
    const [expandedSections, setExpandedSections] = useState({
        allDevices: true,
        systemRequirements: true,
        languageSupport: true
    });
    const [showTutorialPopup, setShowTutorialPopup] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadCountdown, setDownloadCountdown] = useState(0);
    const [activeTab, setActiveTab] = useState('tutorial'); // 'tutorial' or 'download'
    const [selectedVersion, setSelectedVersion] = useState('latest');
    const [availableVersions, setAvailableVersions] = useState([]);
    const [isLoadingVersions, setIsLoadingVersions] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Load available versions
    useEffect(() => {
        const loadVersions = async () => {
            setIsLoadingVersions(true);
            try {
                const response = await fetch('/src/assets/kidolock_window/versions.json');
                if (response.ok) {
                    const versions = await response.json();
                    setAvailableVersions(versions);
                    // Set default to latest version
                    const latestVersion = versions.find(v => v.isLatest);
                    if (latestVersion) {
                        setSelectedVersion(latestVersion.version);
                    }
                }
            } catch (error) {
                console.error('Error loading versions:', error);
                // Fallback to hardcoded versions
                setAvailableVersions([
                    {
                        version: "1.0.4",
                        filename: "KidoLock 1.0.4.msi",
                        isLatest: true,
                        description: "Phiên bản mới nhất với các tính năng cải tiến",
                        descriptionEn: "Latest version with improved features"
                    },
                    {
                        version: "1.0.3",
                        filename: "KidoLock 1.0.3.msi", 
                        isLatest: false,
                        description: "Phiên bản ổn định đã được kiểm tra kỹ lưỡng",
                        descriptionEn: "Stable version that has been thoroughly tested"
                    }
                ]);
                setSelectedVersion("1.0.4");
            } finally {
                setIsLoadingVersions(false);
            }
        };

        loadVersions();
    }, []);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Helper function to render responsive step
    const renderStep = (stepNumber, title, description, imageSrc, imageAlt) => (
        <div className="mb-4 sm:mb-6">
            <div className="flex items-start space-x-2 sm:space-x-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base" style={{ backgroundColor: '#2563EB' }}>
                    {stepNumber}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-base sm:text-lg font-semibold mb-2 sm:mb-3" style={{ color: '#111827' }}>
                        {title}
                    </p>
                    {description && (
                        <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: '#374151' }}>
                            {description}
                        </p>
                    )}
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-2 sm:p-4">
                        <img 
                            src={imageSrc} 
                            alt={imageAlt} 
                            className="w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-4xl mx-auto rounded-lg shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // Helper function to render section header
    const renderSectionHeader = (title) => (
        <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
            {title}
        </h4>
    );

    const downloadZipFile = async (version = 'latest') => {
        try {
            setIsDownloading(true);
            setDownloadCountdown(3); // Start countdown from 3 seconds
            
            // Countdown timer
            const countdownInterval = setInterval(() => {
                setDownloadCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            // Wait for countdown to finish
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const zip = new JSZip();
            
            // Find version info from available versions
            const versionInfo = availableVersions.find(v => v.version === version) || 
                               availableVersions.find(v => v.isLatest);
            
            if (!versionInfo) {
                throw new Error('Version not found');
            }
            
            // Fetch installer file from assets
            const installerPath = `/src/assets/kidolock_window/${versionInfo.filename}`;
            const installerResponse = await fetch(installerPath);
            if (installerResponse.ok) {
                const installerBlob = await installerResponse.blob();
                zip.file(versionInfo.filename, installerBlob);
            }
            
            // Always include manual
            const manualResponse = await fetch('/Hướng dẫn sử dụng phần mềm.pptx');
            if (manualResponse.ok) {
                const manualBlob = await manualResponse.blob();
                zip.file('Hướng dẫn sử dụng phần mềm.pptx', manualBlob);
            }
            
            // Check if we have any files to zip
            if (zip.files && Object.keys(zip.files).length > 0) {
                // Generate zip file
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                
                // Create download link
                const url = URL.createObjectURL(zipBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `KidLock_Complete_Package_${versionInfo.version}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                console.log('Zip file downloaded successfully');
            } else {
                console.error('No files found to zip');
            }
            
        } catch (error) {
            console.error('Error creating zip file:', error);
        } finally {
            setIsDownloading(false);
            setDownloadCountdown(0);
        }
    };

    return (
        <div ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ffffff' }}>
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
                    <div className={`text-center transition-all duration-1000 ease-out ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        <div className="mb-6">
                            <img
                                src={kidAndroid}
                                alt="Android Kid"
                                className="w-64 h-64 mx-auto object-contain transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-2xl"
                            />
                        </div>
                        <div className="mb-4">
                            <img
                                src={getItOnGooglePlay}
                                alt="Get it on Google Play"
                                className="h-16 mx-auto object-contain cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300 ease-out"
                            />
                        </div>
                    </div>

                    {/* Windows */}
                    <div className={`text-center transition-all duration-1000 ease-out delay-200 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        <div className="mb-6">
                            <img
                                src={kidWindow}
                                alt="Windows Kid"
                                className="w-64 h-64 mx-auto object-contain transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-2xl"
                            />
                        </div>
                        <div className="mb-4">
                            <button 
                                onClick={() => {
                                    setShowTutorialPopup(true);
                                    setActiveTab('download');
                                }}
                                className="px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 ease-out" 
                                style={{ background: 'linear-gradient(to right, #F97316, #2563EB)', color: 'white' }}
                            >
                                {t('downloadExe')}
                            </button>
                        </div>
                    </div>

                    {/* iOS */}
                    <div className={`text-center transition-all duration-1000 ease-out delay-400 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        <div className="mb-6">
                            <img
                                src={kidApple}
                                alt="Apple Kid"
                                className="w-64 h-64 mx-auto object-contain transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-2xl"
                            />
                        </div>
                        <div className="mb-4">
                            <img
                                src={getItOnAppStore}
                                alt="Download on the App Store"
                                className="h-16 mx-auto object-contain cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300 ease-out"
                            />
                        </div>
                    </div>
                </div>

                {/* System Requirements */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-4">
                        {/* For All Devices */}
                        <div className="p-6 rounded-3xl shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50" style={{ backgroundColor: '#EAFFFF', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)' }}>
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
                                <h4 className="text-2xl font-bold" style={{ color: '#1251A4', fontFamily: 'Myriad Pro' }}>{t('forAllDevices')}</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.allDevices ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <ul className="space-y-2 text-lg pt-2" style={{ color: '#071F55', fontWeight: 400 }}>
                                    <li>{t('requiresInternet')}</li>
                                </ul>
                            </div>
                        </div>

                        {/* System Requirements */}
                        <div className="p-6 rounded-3xl shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50" style={{ backgroundColor: '#EAFFFF', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)' }}>
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
                                <h4 className="text-2xl font-bold" style={{ color: '#1251A4', fontFamily: 'Myriad Pro' }}>{t('systemRequirements')}</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.systemRequirements ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="space-y-4 text-base pt-2" style={{ color: '#071F55' }}>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#1251A4' }}>{t('windowsTitle')}</h5>
                                        <p className="text-sm mb-2" style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 600 }}>{language === 'en' ? 'Operating system:' : 'Hệ điều hành:'}</span> {language === 'en'
                                                ? 'Microsoft Windows 11 Home/Pro/Education; Windows 10 Home/Pro/Education; updates for Microsoft Windows 8 & 8.1 / Pro / 8.1; Microsoft Windows 7 Starter / Home Basic / Home Premium / Professional / Ultimate - SP1 with updates KB4474419 & KB4490628 or later'
                                                : 'Microsoft Windows 11 Home/Pro/Education; Windows 10 Home/Pro/Education; bản cập nhật Microsoft Windows 8 & 8.1 / Pro / 8.1; Microsoft Windows 7 Starter / Home Basic / Home Premium / Professional / Ultimate - SP1 với bản cập nhật KB4474419 & KB4490628 trở lên'}
                                        </p>
                                        <ul className="space-y-1 text-sm" style={{ fontWeight: 400 }}>
                                            <li>• <strong>{t('diskSpace')}:</strong> 200 MB {t('freeDiskSpace')}</li>
                                            <li>• <strong>{t('cpu')}:</strong> 1 GHz {t('orHigher')}, x86 {t('or')} x64</li>
                                            <li>• <strong>{t('memory')}:</strong> 1 GB (32-bit) {t('or')} 2 GB (64-bit)</li>
                                            <li>• <strong>{t('minScreenRes')}:</strong> 1024x768</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#1251A4' }}>{t('androidTitle')}</h5>
                                        <ul className="space-y-1 text-sm" style={{ fontWeight: 400 }}>
                                            <li>• <strong>{t('os')}:</strong> Android™ 10 - 15</li>
                                            <li>• <strong>{t('minScreenRes')}:</strong> 320 x 480</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#1251A4' }}>{t('iosTitle')}</h5>
                                        <ul className="space-y-1 text-sm" style={{ fontWeight: 400 }}>
                                            <li>• <strong>{t('os')}:</strong> iOS® 18</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Language Support */}
                        <div className="p-6 rounded-3xl shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50" style={{ backgroundColor: '#EAFFFF', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)' }}>
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
                                <h4 className="text-2xl font-bold" style={{ color: '#1251A4', fontFamily: 'Myriad Pro' }}>{t('languageSupport')}</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.languageSupport ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="space-y-4 text-base pt-2" style={{ color: '#071F55', fontWeight: 400 }}>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#1251A4' }}>{t('vietnamese')}</h5>
                                        <p className="text-sm" style={{ fontWeight: 400 }}>{t('vietnameseDesc')}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#1251A4' }}>{t('english')}</h5>
                                        <p className="text-sm" style={{ fontWeight: 400 }}>{t('englishDesc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tutorial Popup */}
            {showTutorialPopup && (
                <div 
                    className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-4">
                        {/* Header */}
                        <div className="flex justify-between items-center p-3 sm:p-4 lg:p-6 border-b border-gray-200">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold pr-2" style={{ color: '#111827', fontFamily: 'Myriad Pro' }}>
                                {activeTab === 'tutorial' ? t('tutorialTitle') : t('downloadTitle')}
                            </h3>
                            <button 
                                onClick={() => {
                                    setShowTutorialPopup(false);
                                    setActiveTab('tutorial'); // Reset to tutorial tab when closing
                                }}
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                            >
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('tutorial')}
                                className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                                    activeTab === 'tutorial'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {t('tutorialTab')}
                            </button>
                            <button
                                onClick={() => setActiveTab('download')}
                                className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                                    activeTab === 'download'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {t('downloadTab')}
                            </button>
                        </div>

                        {/* Download Status Banner */}
                        {isDownloading && (
                            <div className="mx-3 sm:mx-4 lg:mx-6 mt-3 sm:mt-4 animate-fadeIn">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 shadow-sm">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <div className="flex-1">
                                            <p className="text-sm sm:text-base font-medium text-blue-800">
                                                {downloadCountdown > 0 
                                                    ? `${t('preparingDownload')}... ${downloadCountdown}s` 
                                                    : t('downloading') + '...'
                                                }
                                            </p>
                                            <p className="text-xs sm:text-sm text-blue-600 mt-1">
                                                {language === 'vi' 
                                                    ? 'Vui lòng chờ trong giây lát, file sẽ được tải xuống tự động' 
                                                    : 'Please wait a moment, the file will be downloaded automatically'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div 
                            className="p-2 sm:p-4 lg:p-6 overflow-y-auto"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#d1d5db #f3f4f6',
                                maxHeight: 'calc(95vh - 120px)'
                            }}
                        >
                            <style jsx>{`
                                div::-webkit-scrollbar {
                                    width: 6px;
                                }
                                div::-webkit-scrollbar-track {
                                    background: #f3f4f6;
                                    border-radius: 3px;
                                }
                                div::-webkit-scrollbar-thumb {
                                    background: #d1d5db;
                                    border-radius: 3px;
                                }
                                div::-webkit-scrollbar-thumb:hover {
                                    background: #9ca3af;
                                }
                            `}</style>
                            
                            {/* Tutorial Tab Content */}
                            {activeTab === 'tutorial' && (
                                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                                {/* Section I */}
                                <div>
                                    {renderSectionHeader(t('tutorialSection1'))}
                                    {renderStep(1, t('step1Title'), null, step1Image, "System Tray")}
                                    {renderStep(2, t('step2Title'), null, step2Image, "KidLock Icon")}
                                </div>

                                {/* Section II */}
                                <div>
                                    {renderSectionHeader(t('tutorialSection2'))}
                                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-2 sm:p-4">
                                        <img 
                                            src={step3Image} 
                                            alt="Main Interface" 
                                            className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto rounded-lg shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Section III */}
                                <div>
                                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                        {t('tutorialSection3')}
                                    </h4>
                                    
                                    {/* Truy cập Quản lý phần mềm */}
                                    <div className="mb-6">
                                        <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                            {t('step4Title')}
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <img 
                                                src={step4Image} 
                                                alt="Software Management Access" 
                                                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    {t('step5Title')}
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    {t('step5Desc')}
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step5Image} 
                                                        alt="Allow Software Usage" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Bỏ cho phép sử dụng phần mềm
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Người dùng không cho phép các ứng dụng đó được phép truy cập vào nữa.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step6Image} 
                                                        alt="Disallow Software Usage" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                3
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Cho phép các ứng dụng đang chạy
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Những ứng dụng đang mở sẽ được chưa phép cập nhật
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step7Image} 
                                                        alt="Allow Running Applications" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                4
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Thiết lập thời gian được phép truy cập của ứng dụng
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Người dùng cài đặt thời gian để cho phép ứng dụng được phép truy cập trong 1 khoảng thời gian nhất định.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step8Image} 
                                                        alt="Set Application Access Time" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                5
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Load lại các ứng dụng
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Mỗi khi cài đặt ứng dụng mới thì load lại để cập nhật thêm ứng dụng
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step9Image} 
                                                        alt="Reload Applications" 
                                                        className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 6 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                6
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Tìm kiếm ứng dụng
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step10Image} 
                                                        alt="Search Applications" 
                                                        className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section IV */}
                                <div>
                                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                        IV. Quản lý trang Web
                                    </h4>
                                    
                                    {/* Truy cập Quản lý trang Web */}
                                    <div className="mb-6">
                                        <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                            Truy cập Quản lý trang Web
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <img 
                                                src={step11Image} 
                                                alt="Web Management Access" 
                                                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Thêm từ khóa cho phép/ Chặn sử dụng trang Web
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Thêm các từ khóa vào list để có thể truy cập/chặn các trang Web có từ khóa trong list.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step12Image} 
                                                        alt="Add Keywords for Web Access" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xóa từ khóa cho phép/ Chặn sử dụng trang Web
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Xóa các từ khóa vào list.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step13Image} 
                                                        alt="Delete Keywords for Web Access" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                3
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Thiết lập thời gian được phép truy cập của trang Web
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Người dùng được phép truy cập trang Web trong thời gian cho phép.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step14Image} 
                                                        alt="Set Web Access Time" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                4
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xóa toàn bộ cài đặt thời gian
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Tất cả thời gian đã cài đặt sẽ bị xóa hết
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step15Image} 
                                                        alt="Delete All Time Settings" 
                                                        className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                5
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Tải các từ khóa mẫu
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Tải các từ khóa mẫu có sẵn
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step16Image} 
                                                        alt="Load Sample Keywords" 
                                                        className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section V */}
                                <div>
                                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                        V. Lịch sử truy cập Web
                                    </h4>
                                    
                                    {/* Truy cập Lịch sử trang Web */}
                                    <div className="mb-6">
                                        <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                            Truy cập Lịch sử trang Web
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <img 
                                                src={step18Image} 
                                                alt="Web History Access" 
                                                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xem lịch sử truy cập trang Web
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step17Image} 
                                                        alt="View Web Access History" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xem lịch sử truy cập trang Web theo ngày
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Xem lịch sử theo ngày tùy chọn
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step19Image} 
                                                        alt="View Web History by Date" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section VI */}
                                <div>
                                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                        VI. Quản lý theo giờ
                                    </h4>
                                    
                                    {/* Truy cập Quản lý theo giờ */}
                                    <div className="mb-6">
                                        <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                            Truy cập Quản lý theo giờ
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <img 
                                                src={step20Image} 
                                                alt="Time Management Access" 
                                                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xem lịch sử truy cập trang Web
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Chọn thời gian, trong khoảng thời gian đó người dùng được thoải mái truy cập tất cả các trang Web, ứng dụng mà không bị giới hạn gì.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step21Image} 
                                                        alt="Select Time for Free Access" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section VII */}
                                <div>
                                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                        VII. Ảnh màn hình
                                    </h4>
                                    
                                    {/* Truy cập ảnh chụp màn hình */}
                                    <div className="mb-6">
                                        <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                            Truy cập ảnh chụp màn hình
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <img 
                                                src={step22Image} 
                                                alt="Screenshot Access" 
                                                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xem ảnh màn hình đã được chụp
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Xem các ảnh màn hình đã được chụp.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step23Image} 
                                                        alt="View Captured Screenshots" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section VIII */}
                                <div>
                                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                        VIII. Lịch sử máy tính
                                    </h4>
                                    
                                    {/* Truy cập Lịch sử máy tính */}
                                    <div className="mb-6">
                                        <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                            Truy cập Lịch sử máy tính
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <img 
                                                src={step24Image} 
                                                alt="Computer History Access" 
                                                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xem lịch sử trang Web/ Phần mềm
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Xem lịch sử trang Web/ phần mềm như thời gian sử dụng, thời gian bắt đầu sử dụng, tên,....Cho phép tìm kiếm, chọn ngày xem.
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step25Image} 
                                                        alt="View Web/Software History" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xem lịch sử trang Web hoặc phần mềm theo ngày
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Xem lịch sử trang Web hoặc ứng dụng theo ngày tùy chọn
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step26Image} 
                                                        alt="View History by Date" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section IX */}
                                <div>
                                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                        IX. Cài đặt
                                    </h4>
                                    
                                    {/* Truy cập Cài đặt */}
                                    <div className="mb-6">
                                        <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                            Truy cập Cài đặt
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4">
                                            <img 
                                                src={step27Image} 
                                                alt="Settings Access" 
                                                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Xem thông tin người dùng
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step28Image} 
                                                        alt="View User Information" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Chọn thời gian, đường dẫn lưu ảnh chụp màn hình
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Cài đặt chụp ảnh, chọn khoảng thời gian chụp ảnh, nơi lưu trữ ảnh
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step29Image} 
                                                        alt="Select Screenshot Time and Path" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                3
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Chọn các cài đặt về chặn
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Tùy chọn các cài đặt về chặn trang Web, ứng dụng, hiển thị thông báo, thời gian chặn,...
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step30Image} 
                                                        alt="Select Block Settings" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                4
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Đổi mật khẩu
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Đổi mật khẩu
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step31Image} 
                                                        alt="Change Password" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2563EB' }}>
                                                5
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>
                                                    Tắt phần mềm hoàn toàn
                                                </p>
                                                <p className="text-sm mb-3" style={{ color: '#374151' }}>
                                                    Phần mềm bị tắt hoàn toàn
                                                </p>
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img 
                                                        src={step32Image} 
                                                        alt="Completely Turn Off Software" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )}
                            
                            {/* Download Tab Content */}
                            {activeTab === 'download' && (
                                <div className="space-y-6">
                                    {/* Version Selection */}
                                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                        <h4 className="text-lg sm:text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                            {t('selectVersion')}
                                        </h4>
                                        {isLoadingVersions ? (
                                            <div className="flex items-center justify-center py-8">
                                                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="ml-3 text-gray-600">{t('loadingVersions')}</span>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {availableVersions.map((versionInfo) => (
                                                    <label key={versionInfo.version} className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="version"
                                                            value={versionInfo.version}
                                                            checked={selectedVersion === versionInfo.version}
                                                            onChange={(e) => setSelectedVersion(e.target.value)}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-sm sm:text-base font-medium text-gray-900">
                                                                    Version {versionInfo.version}
                                                                </span>
                                                                {versionInfo.isLatest && (
                                                                    <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
                                                                        {t('latest')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs sm:text-sm text-gray-500">
                                                                {language === 'vi' ? versionInfo.description : versionInfo.descriptionEn}
                                                            </p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Package Contents */}
                                    <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                                        <h4 className="text-lg sm:text-xl font-bold mb-4" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>
                                            {t('packageContents')}
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm sm:text-base text-gray-700">
                                                    {availableVersions.find(v => v.version === selectedVersion)?.filename || 'KidoLock.msi'}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm sm:text-base text-gray-700">
                                                    Hướng dẫn sử dụng phần mềm.pptx
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Download Button */}
                                    <div className="text-center">
                                        <button
                                            onClick={() => downloadZipFile(selectedVersion)}
                                            disabled={isDownloading}
                                            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ease-out ${
                                                isDownloading 
                                                    ? 'opacity-70 cursor-not-allowed' 
                                                    : 'hover:opacity-90 hover:scale-105'
                                            }`}
                                            style={{ background: 'linear-gradient(to right, #F97316, #2563EB)', color: 'white' }}
                                        >
                                            {isDownloading ? (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>
                                                        {downloadCountdown > 0 
                                                            ? `${t('preparingDownload')}... ${downloadCountdown}s` 
                                                            : t('downloading') + '...'
                                                        }
                                                    </span>
                                                </div>
                                            ) : (
                                                t('downloadNow')
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DownloadSection;