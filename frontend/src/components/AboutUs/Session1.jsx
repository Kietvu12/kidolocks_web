import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import bgSs1 from '../../assets/AboutUs/bg_ss1.png'
import logoImage from '/logo.png'

const Session1 = () => {
  const [showLogo, setShowLogo] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Hiển thị logo trong 2.5 giây
    const logoTimer = setTimeout(() => {
      setShowLogo(false)
    }, 2500)

    // Hiển thị nội dung sau khi logo biến mất hoàn toàn
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 3500)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgSs1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay đen nhẹ */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
      ></div>
      
      {/* Logo Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div 
          className="transition-all duration-1500 ease-in-out"
          style={{
            opacity: showLogo ? 1 : 0,
            transform: showLogo ? 'scale(1)' : 'scale(0.5)',
            visibility: showLogo ? 'visible' : 'hidden'
          }}
        >
          <img 
            src={logoImage} 
            alt="Kidolock Logo" 
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-contain"
          />
        </div>
      </div>

      {/* Content Container */}
      <div 
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            
            {/* Dòng 1: "Về chúng tôi" */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span style={{ color: 'white' }}>{t('aboutUs').split(' ')[0]}</span>
                <span style={{ color: '#ff6b35' }}> {t('aboutUs').split(' ').slice(1).join(' ')}</span>
              </h1>
            </div>

            {/* Dòng 2: "Về" lớn + Chữ K + "idolock" */}
            <div className="flex items-end justify-center space-x-2 sm:space-x-4">
              {/* Chữ "Về" lớn */}
              <span 
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold"
                style={{ color: 'white' }}
              >
                {t('aboutUs').split(' ')[0]}
              </span>
              
              {/* Chữ K màu xanh */}
              
              {/* Chữ "idolock" với gradient xanh */}
              <span 
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Kidolock
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Session1
