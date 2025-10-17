import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import componentSlide1 from '../assets/component_slide_1.png'
import componentSlide2 from '../assets/component_slide_2.png'
import componentSlide3 from '../assets/component_slide_3.png'

const WhyKidolock = () => {
    const { t } = useLanguage();
    const features = [
        {
            title: t('trackTitle'),
            content: t('trackContent'),
            image: componentSlide1
        },
        {
            title: t('educateTitle'), 
            content: t('educateContent'),
            image: componentSlide2
        },
        {
            title: t('protectTitle'),
            content: t('protectContent'),
            image: componentSlide3
        }
    ]

    return (
        <div className="py-32 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Title Section - Mobile/Tablet */}
                <div className="block lg:hidden text-center mb-16">
                    <h2 className="leading-tight" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
                        <div className="text-lg sm:text-xl md:text-2xl font-light" style={{ color: '#4B5563', fontFamily: 'Myriad Pro' }}>{t('whyTitle1')}</div>
                        <div className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ background: 'linear-gradient(to right, #05CAF6, #00B2FF, #0F85CE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Myriad Pro' }}>{t('whyTitle2')}</div>
                    </h2>
                </div>

                {/* Main Content Container */}
                <div className="relative min-h-[40rem]">
                    {/* Images Section - Shifted to left */}
                    <div className="flex items-center justify-center lg:justify-start">
                    {/* Mobile/Tablet Layout - Text outside image */}
                    <div className="block lg:hidden">
                        <div className="space-y-8 px-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {/* Image Section */}
                                    <div className="relative h-[20rem] sm:h-[22rem] md:h-[24rem] w-full mb-6 overflow-hidden rounded-2xl">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
                                        />
                                    </div>
                                    
                                    {/* Content Section - Outside image */}
                                    <div className="text-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1251A4', fontFamily: 'Myriad Pro' }}>
                                            {feature.title}
                                        </h3>
                                        <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
                                            {feature.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop/Laptop Layout - Text inside image */}
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-3 gap-8 lg:gap-12 ml-0 lg:ml-[-2rem] xl:ml-[-4rem]">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className={`relative ${
                                        index === 0 ? 'mt-0' : 
                                        index === 1 ? 'mt-12 sm:mt-20' : 
                                        'mt-0'
                                    }`}
                                >
                                    {/* Title for second image - positioned above */}
                                    {index === 1 && (
                                        <div className="mb-4 text-left">
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#1251A4', fontFamily: 'Myriad Pro' }}>
                                                {feature.title}
                                            </h3>
                                        </div>
                                    )}
                                    
                                    {/* Vertical Rectangle Image - Larger size */}
                                    <div className="relative h-[26rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem] overflow-hidden rounded-2xl">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
                                        />
                                        
                                        {/* Gradient overlay - covers only bottom half */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white via-white/80 to-transparent" style={{borderRadius: '0 0 1rem 1rem'}}></div>
                                        
                                        {/* Overlay with content - positioned over gradient */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8" style={{borderRadius: '0 0 1rem 1rem'}}>
                                            <p className="leading-relaxed text-xs md:text-sm lg:text-sm" style={{ color: '#071F55', fontFamily: 'Myriad Pro' }}>
                                                {feature.content}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Title positioned outside based on image index */}
                                    {index === 0 && (
                                        <div className="mt-4 text-left">
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#1251A4', fontFamily: 'Myriad Pro' }}>
                                                {feature.title}
                                            </h3>
                                        </div>
                                    )}
                                    {index === 2 && (
                                        <div className="mt-4 text-left">
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#1251A4', fontFamily: 'Myriad Pro' }}>
                                                {feature.title}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>

                    {/* Title Section - Desktop/Laptop only */}
                    <div className="hidden lg:block absolute bottom-[-1rem] right-0 lg:bottom-[-3rem] lg:right-[-2rem] xl:bottom-[-4rem] xl:right-[-3rem] text-right z-10">
                        <h2 className="leading-tight" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light" style={{ color: '#4B5563', fontFamily: 'Myriad Pro' }}>{t('whyTitle1')}</div>
                            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold" style={{ background: 'linear-gradient(to right, #05CAF6, #00B2FF, #0F85CE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Myriad Pro' }}>{t('whyTitle2')}</div>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyKidolock
