import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import bgSession3 from '../assets/bg_session3.png'
import avatar from '../assets/avatar.png'

const TestimonialsSection = () => {
    const { t } = useLanguage();
    
    return (
        <div className="relative w-full">
            {/* Mobile Layout */}
            <div className="block lg:hidden">
                {/* Background - Blue for small screens, image for larger */}
                <div className="relative w-full min-h-screen" style={{ backgroundColor: '#7DD3FC' }}>
                    {/* Background Image - Only for screens >= 400px */}
                    <div className="hidden sm:block absolute inset-0 w-full h-full overflow-hidden">
                        <img
                            src={bgSession3}
                            alt="Background"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="relative w-full z-10 pt-4 pb-12 px-4">
                        <div className="max-w-7xl mx-auto">
                            {/* Title at the top */}
                            <div className="pt-4 pb-6">
                                <div className="text-center">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2" style={{ color: 'white', fontFamily: 'Myriad Pro' }}>
                                        {t('testimonialsTitle1')}
                                    </h2>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#FB923C', fontFamily: 'Myriad Pro' }}>
                                        {t('testimonialsTitle2')}
                                    </h2>
                                </div>
                            </div>
                            
                            {/* Testimonials */}
                            <div>
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Testimonial 1 */}
                                    <div className="backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative mx-2 sm:mx-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                                        {/* Avatar */}
                                        <div className="flex items-center mb-4">
                                            <div className="w-16 h-16 mr-4">
                                                <img
                                                    src={avatar}
                                                    alt="Parent avatar"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold tracking-widest" style={{ color: '#111827' }}>{t('testimonial1Title')}</h3>
                                        </div>
                                        
                                        {/* Content */}
                                        <p className="leading-relaxed text-sm" style={{ color: '#374151' }}>
                                            {t('testimonial1Content')}
                                        </p>
                                    </div>

                                    {/* Testimonial 2 */}
                                    <div className="backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative mx-2 sm:mx-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                                        {/* Avatar */}
                                        <div className="flex items-center mb-4">
                                            <div className="w-16 h-16 mr-4">
                                                <img
                                                    src={avatar}
                                                    alt="Parent avatar"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold tracking-widest" style={{ color: '#111827' }}>{t('testimonial2Title')}</h3>
                                        </div>
                                        
                                        {/* Content */}
                                        <p className="leading-relaxed text-sm" style={{ color: '#374151' }}>
                                            {t('testimonial2Content')}
                                        </p>
                                    </div>

                                    {/* Testimonial 3 */}
                                    <div className="backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative mx-2 sm:mx-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                                        {/* Avatar */}
                                        <div className="flex items-center mb-4">
                                            <div className="w-16 h-16 mr-4">
                                                <img
                                                    src={avatar}
                                                    alt="Parent avatar"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold tracking-widest" style={{ color: '#111827' }}>{t('testimonial3Title')}</h3>
                                        </div>
                                        
                                        {/* Content */}
                                        <p className="leading-relaxed text-sm" style={{ color: '#374151' }}>
                                            {t('testimonial3Content')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block relative w-full flex items-start">
                {/* Background Image */}
                <div className="relative w-full">
                    <img
                        src={bgSession3}
                        alt="Background"
                        className="w-full h-auto object-cover"
                    />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 w-full z-10 pt-8 pb-8 px-4 sm:px-6 lg:px-8 flex flex-col">
                     <div className="max-w-7xl mx-auto flex-1 flex flex-col">
                         {/* Testimonials at the top */}
                         <div className="pt-16">
                             <div className="w-full">
                                <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto px-8">
                                    {/* Testimonial 1 */}
                                    <div className="backdrop-blur-md rounded-2xl p-8 shadow-2xl w-full relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                                        {/* Avatar on border - Top Left */}
                                        <div className="absolute -top-12 -left-12 w-28 h-28">
                                            <img
                                                src={avatar}
                                                alt="Parent avatar"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        
                                        {/* Title - Top Right */}
                                        <div className="absolute top-4 right-8">
                                            <h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ color: '#111827' }}>{t('testimonial1Title')}</h3>
                                            <div className="w-full h-0.5" style={{ backgroundColor: '#D1D5DB' }}></div>
                                        </div>
                                        
                                        <div className="pt-12">
                                            {/* Content */}
                                            <p className="leading-relaxed text-lg" style={{ color: '#374151' }}>
                                                {t('testimonial1Content')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Testimonial 2 */}
                                    <div className="backdrop-blur-md rounded-2xl p-8 shadow-2xl w-full relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                                        {/* Avatar on border - Bottom Center */}
                                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-28 h-28">
                                            <img
                                                src={avatar}
                                                alt="Parent avatar"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        
                                        {/* Title - Top Center */}
                                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                                            <h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ color: '#111827' }}>{t('testimonial2Title')}</h3>
                                            <div className="w-full h-0.5" style={{ backgroundColor: '#D1D5DB' }}></div>
                                        </div>
                                        
                                        <div className="pt-16 pb-12">
                                            {/* Content */}
                                            <p className="leading-relaxed text-lg" style={{ color: '#374151' }}>
                                                {t('testimonial2Content')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Testimonial 3 */}
                                    <div className="backdrop-blur-md rounded-2xl p-8 shadow-2xl w-full relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                                        {/* Avatar on border - Top Right */}
                                        <div className="absolute -top-12 -right-12 w-28 h-28">
                                            <img
                                                src={avatar}
                                                alt="Parent avatar"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        
                                        {/* Title - Top Left */}
                                        <div className="absolute top-4 left-4">
                                            <h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ color: '#111827' }}>{t('testimonial3Title')}</h3>
                                            <div className="w-full h-0.5" style={{ backgroundColor: '#D1D5DB' }}></div>
                                        </div>
                                        
                                        <div className="pt-12">
                                            {/* Content */}
                                            <p className="leading-relaxed text-lg" style={{ color: '#374151' }}>
                                                {t('testimonial3Content')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Split Title positioned higher on the image */}
                <div className="absolute bottom-24 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8">
                    <div className="my-auto mx-auto">
                        <div className="grid grid-cols-2 gap-16 items-center">
                            {/* Left Side - PHỤ HUYNH */}
                            <div className="text-left pl-16">
                                <h2 className="text-7xl font-bold leading-tight" style={{ color: 'white', fontFamily: 'Myriad Pro' }}>
                                    {t('testimonialsTitle1')}
                                </h2>
                            </div>

                            {/* Right Side - NÓI GÌ ? */}
                            <div className="text-right pr-16">
                                <h2 className="text-7xl font-bold leading-tight" style={{ color: '#FB923C', fontFamily: 'Myriad Pro' }}>
                                    {t('testimonialsTitle2')}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialsSection
