import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import group3 from '../assets/group_3.png'

const EducationSection = () => {
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
        <div ref={sectionRef} className="mb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Mobile App Interface */}
                    <div className={`relative order-1 lg:order-1 transition-all duration-1000 ease-out ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                    }`}>
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
                    <div className={`order-2 lg:order-2 transition-all duration-1000 ease-out delay-300 ${
                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                    }`}>
                        <div className="space-y-8">
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide pb-2" style={{ color: '#104B98', borderBottom: '1px solid #135CBC', fontFamily: 'Myriad Pro' }}>
                                {t('educationTitle')}
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
                                        {t('educationFeature1')}
                                    </p>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
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
