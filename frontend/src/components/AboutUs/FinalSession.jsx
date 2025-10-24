import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const FinalSession = () => {
  const { t } = useLanguage()
  
  return (
    <section className="relative w-full bg-white py-16">
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-8">
            <div 
              className="text-sm font-medium mb-2"
              style={{ color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('finalSessionLabel')}
            </div>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ color: '#3b82f6', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('finalSessionTitle')}
            </h2>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <p 
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: '#374151', fontFamily: 'Myriad Pro, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: t('finalSessionContent') }}
            >
            </p>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-200 pt-8">
            <div 
              className="text-sm font-medium mb-4"
              style={{ color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif' }}
            >
              {t('finalSessionCopyright')}
            </div>
            
            <div className="space-y-2">
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif' }}
              >
                {t('finalSessionCopyrightText1')}
              </p>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#6b7280', fontFamily: 'Myriad Pro, sans-serif' }}
              >
                {t('finalSessionCopyrightText2')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalSession
