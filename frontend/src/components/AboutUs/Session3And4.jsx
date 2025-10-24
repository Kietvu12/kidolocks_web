import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import bgSs34 from '../../assets/AboutUs/bg_ss34.png'
import kiloviaLogo from '../../assets/AboutUs/kilovia.png'
import son1Image from '../../assets/AboutUs/son1.png'
import son2Image from '../../assets/AboutUs/son2.png'

const Session3And4 = () => {
  const [expandedItem, setExpandedItem] = useState(null)
  const { t } = useLanguage()

  const accordionItems = [
    {
      id: 'desktop',
      title: t('session3DesktopTitle'),
      content: t('session3DesktopContent')
    },
    {
      id: 'mobile',
      title: t('session3MobileTitle'),
      content: t('session3MobileContent')
    },
    {
      id: 'parent',
      title: t('session3ParentTitle'),
      content: t('session3ParentContent')
    }
  ]

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <section 
      className="relative flex items-start justify-center overflow-hidden pt-8 pb-8"
      style={{
        backgroundImage: `url(${bgSs34})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-white"
        style={{ opacity: 0.5 }}
      ></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Session 3 - Title */}
          <div className="text-center mb-16">
            <h2 
              className="text-xl sm:text-2xl lg:text-3xl font-light leading-tight mb-4"
              style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('session3Title1')}
            </h2>
            <h3 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold"
              style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('session3Title2')}
            </h3>
          </div>

          {/* Session 3 - Accordion */}
          <div className="space-y-8 mb-20">
            {accordionItems.map((item, index) => (
              <div key={item.id} className="overflow-hidden">
                {/* Accordion Button */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-8 rounded-2xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Chevron Icon */}
                    <div className="text-white">
                      <svg 
                        className={`w-6 h-6 transition-transform duration-300 ${
                          expandedItem === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Title */}
                    <span 
                      className="text-white font-semibold text-lg sm:text-xl"
                      style={{ fontFamily: 'Myriad Pro, sans-serif' }}
                    >
                      {item.title}
                    </span>
                  </div>
                </button>

                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    expandedItem === item.id 
                      ? 'max-h-96 opacity-100 mt-6' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div 
                    className="p-8 rounded-2xl bg-white shadow-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <p 
                      className="text-base sm:text-lg leading-relaxed font-light"
                      style={{ color: '#0F1E6E', fontFamily: 'Myriad Pro, sans-serif' }}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Session 4 - Phần 1: Logo Kilovia */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            
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

          {/* Session 4 - Phần 2: Tích hợp AI và Vừa học vừa chơi */}
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

export default Session3And4
