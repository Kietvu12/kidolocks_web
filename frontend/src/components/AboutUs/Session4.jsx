import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import bgSs34 from '../../assets/AboutUs/bg_ss34.png'
import kiloviaLogo from '../../assets/AboutUs/kilovia.png'
import son1Image from '../../assets/AboutUs/son1.png'
import son2Image from '../../assets/AboutUs/son2.png'

const Session4 = () => {
  const { t } = useLanguage()
  
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden pt-4 py-8"
      style={{
        backgroundImage: `url(${bgSs34})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.7
      }}
    >

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* Phần 1: Logo Kilovia */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Bên trái - Logo và tiêu đề */}
            <div className="text-center lg:text-left">
              {/* Tiêu đề */}
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8"
                style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
              >
                {t('session4Title')}
              </h2>
              
              {/* Logo Kilovia */}
              <div className="flex justify-center lg:justify-start">
                <img 
                  src={kiloviaLogo} 
                  alt="Kilovia Logo" 
                  className="w-64 h-32 sm:w-80 sm:h-40 lg:w-96 lg:h-48 object-contain"
                />
              </div>
            </div>

            {/* Bên phải - Nội dung */}
            <div className="text-center lg:text-right">
              <p 
                className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-light"
                style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
              >
                {t('session4Content')}
              </p>
            </div>
          </div>

          {/* Phần 2: Tích hợp AI và Vừa học vừa chơi */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Cột trái - Tích hợp AI */}
            <div className="space-y-6">
              {/* Hình ảnh gia đình */}
              <div className="flex justify-center lg:justify-start">
                <img 
                  src={son1Image} 
                  alt="Family with AI Integration" 
                  className="w-80 h-64 sm:w-96 sm:h-80 lg:w-full lg:h-auto object-contain"
                />
              </div>
              
              {/* Tiêu đề và nội dung */}
              <div>
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                >
                  {t('session4AiTitle')}
                </h3>
                
                {/* Đường kẻ ngang */}
                <div 
                  className="w-24 h-1 mb-6"
                  style={{ backgroundColor: '#3b82f6' }}
                ></div>
                
                {/* Danh sách tính năng */}
                <ul className="space-y-4">
                  <li 
                    className="flex items-start space-x-3 text-lg sm:text-xl leading-relaxed font-light"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}></span>
                    <span>{t('session4AiFeature1')}</span>
                  </li>
                  <li 
                    className="flex items-start space-x-3 text-lg sm:text-xl leading-relaxed font-light"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}></span>
                    <span>{t('session4AiFeature2')}</span>
                  </li>
                  <li 
                    className="flex items-start space-x-3 text-lg sm:text-xl leading-relaxed font-light"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}></span>
                    <span>{t('session4AiFeature3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cột phải - Vừa học vừa chơi */}
            <div className="space-y-6">
              {/* Tiêu đề và nội dung */}
              <div>
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
                  style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                >
                  {t('session4LearnPlayTitle')}
                </h3>
                
                {/* Đường kẻ ngang */}
                <div 
                  className="w-24 h-1 mb-6"
                  style={{ backgroundColor: '#3b82f6' }}
                ></div>
                
                {/* Danh sách tính năng */}
                <ul className="space-y-4 mb-8">
                  <li 
                    className="flex items-start space-x-3 text-lg sm:text-xl leading-relaxed font-light"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}></span>
                    <span>{t('session4LearnPlayFeature1')}</span>
                  </li>
                  <li 
                    className="flex items-start space-x-3 text-lg sm:text-xl leading-relaxed font-light"
                    style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                  >
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#3b82f6' }}></span>
                    <span>{t('session4LearnPlayFeature2')}</span>
                  </li>
                </ul>
              </div>
              
              {/* Hình ảnh AI */}
              <div className="flex justify-center lg:justify-end">
                <img 
                  src={son2Image} 
                  alt="AI Learning and Playing" 
                  className="w-80 h-64 sm:w-96 sm:h-80 lg:w-full lg:h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Session4
