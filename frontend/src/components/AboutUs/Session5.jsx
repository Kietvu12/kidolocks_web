import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import bgSs5 from '../../assets/AboutUs/bg_ss5.png'

const Session5 = () => {
  const { t } = useLanguage()
  
  return (
      <section 
        className="relative w-full bg-blue-100 py-16"
    >
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Section - Mission Statement */}
          <div className="text-center mb-16">
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4"
              style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('session5Title1')}
            </h2>
            <h3 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8"
              style={{ color: '#3b82f6', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('session5Title2')}
            </h3>
            
            <p 
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-light max-w-4xl mx-auto"
              style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('session5Content')}
            </p>
          </div>

          {/* Bottom Section - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column - Product Description */}
            <div className="space-y-6">
              <div>
                <h4 
                  className="text-xl sm:text-2xl lg:text-3xl font-light mb-2"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                >
                  {t('session5Subtitle1')}
                </h4>
                <h5 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                  style={{ color: '#3b82f6', fontFamily: 'Myriad Pro, sans-serif' }}
                >
                  {t('session5Subtitle2')}
                </h5>
                
                <p 
                  className="text-lg sm:text-xl leading-relaxed font-light"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  dangerouslySetInnerHTML={{ __html: t('session5Description') }}
                >
                </p>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div 
                  className="flex items-start space-x-3 text-lg sm:text-xl leading-relaxed font-light"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                >
                  <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}></span>
                  <span>
                    {t('session5Benefit1')}
                  </span>
                </div>
                
                <div 
                  className="flex items-start space-x-3 text-lg sm:text-xl leading-relaxed font-light"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                >
                  <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}></span>
                  <span>
                    {t('session5Benefit2')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Session5
