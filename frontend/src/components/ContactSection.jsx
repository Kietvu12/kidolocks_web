import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import kilovia from '../assets/kilovia.png';
import kidolocks from '../assets/kidolocks.png';
import huce from '../assets/huce.png';
import rdsic from '../assets/rdsic.png';
import footerBg from '../assets/footer.png';

const ContactSection = () => {
    const [email, setEmail] = useState('');
    const { t } = useLanguage();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle email submission
        console.log('Email submitted:', email);
        setEmail('');
    };

    return (
        <div className="relative flex items-center justify-center" style={{
            backgroundImage: `url(${footerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center -20%',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}>
            <div className="relative z-10 pt-72 sm:pt-56 md:pt-60 lg:pt-56 xl:pt-60 pb-16 px-4 sm:px-6 lg:px-8 w-full">
                <div className="mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
                        <div className="text-center lg:text-left mb-8 lg:mb-0 hidden lg:block">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-4" style={{color: 'white'}}>
                                {t('contactTitle')}
                            </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-6 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[300px] sm:min-w-[400px]"
                                style={{backgroundColor: 'white'}}
                            />
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 font-bold rounded-lg transition-colors uppercase"
                                style={{backgroundColor: 'white', color: '#1f2937'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                            >
                                {t('send')}
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Left Section - RDSIC Training System */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-4" style={{color: 'white'}}>
                                {t('rdsicTitle')}
                            </h2>
                            <p className="text-lg mb-8" style={{color: 'white'}}>
                                {t('rdsicSubtitle')}
                            </p>
                            
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">{t('mainOffice')}</span>
                                        <span className="hidden sm:inline">{t('mainOffice')}</span>
                                    </span>
                                    <span>{t('addressMainValue')}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">{t('trainingAddress2')}</span>
                                        <span className="hidden sm:inline">{t('trainingAddress2')}</span>
                                    </span>
                                    <span>{t('address2Value')}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">{t('trainingAddress3')}</span>
                                        <span className="hidden sm:inline">{t('trainingAddress3')}</span>
                                    </span>
                                    <span>{t('address3Value')}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">{t('trainingAddress4')}</span>
                                        <span className="hidden sm:inline">{t('trainingAddress4')}</span>
                                    </span>
                                    <span>{t('address4Value')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Contact Information */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-8" style={{color: 'white'}}>
                                {t('contactInfo')}
                            </h2>
                            
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-20 sm:w-24 mb-1 sm:mb-0">
                                        <span className="sm:hidden">{t('hotline')}</span>
                                        <span className="hidden sm:inline">{t('hotline')}</span>
                                    </span>
                                    <span>0989 427 809</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="w-20 sm:w-24 mb-1 sm:mb-0"></span>
                                    <span>0914 388 841</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-20 sm:w-24 mb-1 sm:mb-0">
                                        <span className="sm:hidden">{t('email')}</span>
                                        <span className="hidden sm:inline">{t('email')}</span>
                                    </span>
                                    <span>admin@rdsic.edu.vn</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-20 sm:w-24 mb-1 sm:mb-0">
                                        <span className="sm:hidden">{t('website')}</span>
                                        <span className="hidden sm:inline">{t('website')}</span>
                                    </span>
                                    <span>rdsic.edu.vn</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        {/* Left - Products */}
                        <div className="mb-8 lg:mb-0">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase mb-6" style={{color: 'white'}}>
                                {t('products')}
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={kidolocks}
                                        alt="Kidolocks"
                                        className="w-12 h-12 object-contain"
                                    />
                                    <span className="font-bold text-lg" style={{color: 'white'}}>Kidolock</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={kilovia}
                                        alt="Kilovia"
                                        className="w-12 h-12 object-contain"
                                    />
                                    <span className="font-bold text-lg" style={{color: 'white'}}>Kilovia</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Logos and Copyright */}
                        <div className="text-center lg:text-right">
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 mb-4">
                                <img
                                    src={rdsic}
                                    alt="RDSIC"
                                    className="w-16 h-16 object-contain"
                                />
                                <img
                                    src={huce}
                                    alt="HUCE"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            <p className="text-sm" style={{color: 'white'}}>
                                {t('copyright')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
