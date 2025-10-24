import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import bgSs34 from '../../assets/AboutUs/bg_ss34.png'

const Session3 = () => {
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
      className="relative flex items-start justify-center overflow-hidden pt-8 pb-4"
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
        <div className="max-w-6xl mx-auto">
          
          {/* Title */}
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

          {/* Accordion */}
          <div className="space-y-8">
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
        </div>
      </div>
    </section>
  )
}

export default Session3
