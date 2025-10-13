import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import group1 from '../assets/group_1.png'

const FeaturesSection = () => {
    const { t } = useLanguage();
    
    return (
        <div className="mt-32 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Title */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ fontFamily: 'Myriad Pro' }}>
                        <div className="font-thin" style={{ color: '#111827', fontFamily: 'Myriad Pro' }}>{t('featuresTitle1')}</div>
                        <div className="font-bold" style={{ color: '#2563EB', fontFamily: 'Myriad Pro' }}>{t('featuresTitle2')}</div>
                    </h2>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Character and Dashboard */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative">
                            {/* Character Image */}
                            <div className="flex justify-center lg:justify-start">
                                <img
                                    src={group1}
                                    alt="Child using smartphone"
                                    className="w-full max-w-lg lg:max-w-xl h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Features List */}
                    <div className="order-1 lg:order-2">
                        <div className="space-y-8">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide pb-2" style={{ color: '#111827', borderBottom: '1px solid #4B5563', fontFamily: 'Myriad Pro' }}>
                                {t('featuresSubtitle')}
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#2563EB' }}>
                                        <svg className="w-4 h-4" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xl leading-relaxed" style={{ color: '#374151', fontFamily: 'Myriad Pro' }}>
                                        {t('feature1')}
                                    </p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#2563EB' }}>
                                        <svg className="w-4 h-4" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xl leading-relaxed" style={{ color: '#374151', fontFamily: 'Myriad Pro' }}>
                                        {t('feature2')}
                                    </p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#2563EB' }}>
                                        <svg className="w-4 h-4" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xl leading-relaxed" style={{ color: '#374151', fontFamily: 'Myriad Pro' }}>
                                        {t('feature3')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection
