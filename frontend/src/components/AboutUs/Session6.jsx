import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import helpingImage from '../../assets/AboutUs/helping.png'

const Session6 = () => {
  const { t } = useLanguage()
  
  return (
    <section className="relative w-full bg-white py-16">
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Image */}
            <div className="flex justify-center lg:justify-start">
              <img 
                src={helpingImage} 
                alt="Grandmother and grandson holding hands" 
                className="w-80 h-auto sm:w-96 lg:w-full lg:max-w-md object-contain"
              />
            </div>

            {/* Right Column - Quote */}
            <div className="text-center lg:text-left">
              <blockquote 
                className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-light italic"
                style={{ color: '#374151', fontFamily: 'Myriad Pro, sans-serif' }}
              >
                {t('session6Quote')}
              </blockquote>
              
              <div className="mt-6 text-right lg:text-right">
                <cite 
                  className="text-base sm:text-lg font-semibold not-italic"
                  style={{ color: '#374151', fontFamily: 'Myriad Pro, sans-serif' }}
                >
                  {t('session6Author')}
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Session6
