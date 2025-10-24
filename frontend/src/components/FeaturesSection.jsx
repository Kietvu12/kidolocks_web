import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import group1 from '../assets/group_1.png'

const FeaturesSection = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
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
    
    return (
        <div ref={sectionRef} className="mt-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Title */}
                <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight" style={{ fontFamily: 'Myriad Pro' }}>
                        <div className="font-bold" style={{ color: '#01B8FD', fontFamily: 'Myriad Pro' }}>{t('featuresTitle1')}</div>
                    </h2>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Character and Dashboard */}
                    <div className={`relative order-1 lg:order-1 transition-all duration-1000 ease-out ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                    }`}>
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
                    <div className={`order-2 lg:order-2 transition-all duration-1000 ease-out delay-300 ${
                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                    }`}>
                        <div className="space-y-8">
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide pb-2" style={{ color: '#104B98', borderBottom: '1px solid #135CBC', fontFamily: 'Myriad Pro' }}>
                                {t('featuresSubtitle')}
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2563EB' }}>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-sm lg:text-base leading-tight" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
                                        {t('feature1')}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2563EB' }}>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-sm lg:text-base leading-tight" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
                                        {t('feature2')}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2563EB' }}>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-sm lg:text-base leading-tight" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
                                        {t('feature3')}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2563EB' }}>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-sm lg:text-base leading-tight" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
                                        {t('feature4')}
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
