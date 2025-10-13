import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SubscriptionWorkflowSection = () => {
    const { t } = useLanguage();
    const [expandedSections, setExpandedSections] = useState({
        pricingLevels: true,
        autoRenewal: true,
        cancelAutoRenewal: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: 'white'}}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'Myriad Pro' }}>
                        <span style={{color: '#1f2937', fontFamily: 'Myriad Pro'}}>{t('subscriptionHeader1')}</span>
                    </h2>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: 'Myriad Pro' }}>
                    <span style={{color: '#f97316', fontFamily: 'Myriad Pro'}}>{t('subscriptionHeader2')}</span>
                    </h2>
                </div>

                {/* Content Sections */}
                <div className="space-y-4">
                    {/* Section 1: CÁC MỨC GIÁ */}
                    <div className="rounded-3xl p-6 shadow-lg" style={{backgroundColor: 'rgba(37, 99, 235, 0.15)', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)'}}>
                        <div className="flex items-center">
                            <button 
                                onClick={() => toggleSection('pricingLevels')}
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: '#2563EB' }}
                            >
                                <svg 
                                    className={`w-4 h-4 text-white transition-transform duration-200 ${expandedSections.pricingLevels ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <h3 className="text-xl font-bold" style={{color: '#111827', fontFamily: 'Myriad Pro'}}>{t('pricingLevels')}</h3>
                        </div>
                        <div className={`overflow-hidden mt-2 transition-all duration-300 ease-in-out ${
                            expandedSections.pricingLevels ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <p className="leading-relaxed" style={{color: '#374151'}}>
                                {t('subscriptionCommonDesc')}
                            </p>
                        </div>
                    </div>

                    {/* Section 2: TỰ ĐỘNG GIA HẠN */}
                    <div className="rounded-3xl p-6 shadow-lg" style={{backgroundColor: 'rgba(37, 99, 235, 0.15)', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)'}}>
                        <div className="flex items-center">
                            <button 
                                onClick={() => toggleSection('autoRenewal')}
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: '#2563EB' }}
                            >
                                <svg 
                                    className={`w-4 h-4 text-white transition-transform duration-200 ${expandedSections.autoRenewal ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <h3 className="text-xl font-bold" style={{color: '#111827', fontFamily: 'Myriad Pro'}}>{t('autoRenewal')}</h3>
                        </div>
                        <div className={`overflow-hidden mt-2 transition-all duration-300 ease-in-out ${
                            expandedSections.autoRenewal ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <p className="leading-relaxed" style={{color: '#374151'}}>
                                {t('subscriptionCommonDesc')}
                            </p>
                        </div>
                    </div>

                    {/* Section 3: HỦY BỎ TỰ ĐỘNG GIA HẠN */}
                    <div className="rounded-3xl p-6 shadow-lg" style={{backgroundColor: 'rgba(37, 99, 235, 0.15)', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)'}}>
                        <div className="flex items-center">
                            <button 
                                onClick={() => toggleSection('cancelAutoRenewal')}
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: '#2563EB' }}
                            >
                                <svg 
                                    className={`w-4 h-4 text-white transition-transform duration-200 ${expandedSections.cancelAutoRenewal ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <h3 className="text-xl font-bold" style={{color: '#111827', fontFamily: 'Myriad Pro'}}>{t('cancelAutoRenewal')}</h3>
                        </div>
                        <div className={`overflow-hidden mt-2 transition-all duration-300 ease-in-out ${
                            expandedSections.cancelAutoRenewal ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <div className="space-y-4 leading-relaxed mt-2" style={{color: '#374151'}}>
                                <p>{t('cancelIntro1')}</p>
                                <p>{t('cancelIntro2')}</p>
                                <p><strong>{t('cancelHowTo')}</strong></p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>{t('cancelList1')}</li>
                                    <li>{t('cancelList2')}</li>
                                    <li>{t('cancelList3')}</li>
                                </ul>
                                <p>{t('cancelSupport')}</p>
                                <p>{t('refundIntro')}</p>
                                <p>{t('refundContact')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionWorkflowSection;
