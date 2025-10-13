import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import group3 from '../assets/group_3.png'

const EducationSection = () => {
    const { t } = useLanguage();
    
    return (
        <div className="mb-16 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Mobile App Interface */}
                    <div className="relative order-1 lg:order-1">
                        <div className="relative">
                            {/* Character Image */}
                            <div className="flex justify-center lg:justify-start">
                                <img
                                    src={group3}
                                    alt="Education and time management illustration"
                                    className="w-full max-w-lg lg:max-w-xl h-auto"
                                />
                            </div>

                            {/* Mobile App Overlay */}
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="order-2 lg:order-2">
                        <div className="space-y-8">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-600 pb-2" style={{ fontFamily: 'Myriad Pro' }}>
                                {t('educationTitle')}
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'Myriad Pro' }}>
                                        {t('educationFeature1')}
                                    </p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'Myriad Pro' }}>
                                        {t('educationFeature2')}
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

export default EducationSection
