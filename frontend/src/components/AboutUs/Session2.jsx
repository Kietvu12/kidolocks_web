import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import bgSs2 from '../../assets/AboutUs/bg_ss2.png'

const Session2 = () => {
  const { t } = useLanguage()
  
  return (
    <section 
      className="relative min-h-screen lg:min-h-screen md:min-h-auto flex items-center justify-center overflow-hidden bg-blue-100 lg:bg-transparent"
      style={{
        backgroundImage: `url(${bgSs2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Mobile overlay để che background */}
      <div className="absolute inset-0 bg-blue-100 lg:hidden"></div>
      
      {/* Content Container - Responsive layout */}
      <div className="relative z-10 py-8 lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:pt-8 lg:pb-0">
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-20">
          
          {/* Layout: Desktop - Tiêu đề bên trái, nội dung bên phải | Mobile - Stacked */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            
            {/* Bên trái - Tiêu đề */}
            <div className="flex-shrink-0 mb-8 lg:mb-0">
              {/* 3 thuộc tính mô tả */}
              <div className="mb-6">
                <div className="flex space-x-3">
                  <div 
                    className="text-xs font-light tracking-wider"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    {t('educateTitle')}
                  </div>
                  <div 
                    className="text-xs font-light tracking-wider"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    {t('trackTitle')}
                  </div>
                  <div 
                    className="text-xs font-light tracking-wider"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    {t('protectTitle')}
                  </div>
                </div>
              </div>

              {/* Tiêu đề chính */}
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight max-w-md"
                style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
              >
                {t('session2Title')}
              </h2>
            </div>

            {/* Bên phải - 2 phần nội dung */}
            <div className="flex-shrink-0 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-12 xl:space-x-16 2xl:space-x-20 lg:pt-8 xl:pt-12">
              {/* Nội dung 1 */}
              <div className="max-w-sm">
                <p 
                  className="text-xs sm:text-sm lg:text-base leading-relaxed font-light"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  dangerouslySetInnerHTML={{ __html: t('session2Content1') }}
                >
                </p>
              </div>

              {/* Nội dung 2 */}
              <div className="max-w-sm">
                <p 
                  className="text-xs sm:text-sm lg:text-base leading-relaxed font-light"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  dangerouslySetInnerHTML={{ __html: t('session2Content2') }}
                >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Session2
