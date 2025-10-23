import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import bannerImage from '../assets/banner.png'
import protectKidImage from '../assets/project_kid.png'
import bgSession from '../assets/bg_session.png'
import Navbar from '../components/Navbar'
import WhyKidolock from '../components/WhyKidolock'
import FeaturesSection from '../components/FeaturesSection'
import ProtectionSection from '../components/ProtectionSection'
import EducationSection from '../components/EducationSection'
import TestimonialsSection from '../components/TestimonialsSection'
import DownloadSection from '../components/DownloadSection'
import PricingSection from '../components/PricingSection'
import SubscriptionWorkflowSection from '../components/SubscriptionWorkflowSection'
import ContactSection from '../components/ContactSection'

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.5, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.5, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  return (
  <>
  {/* Navbar */}
  <Navbar />
  
  <motion.div 
    className="px-0 md:px-20 relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden"
    initial="initial"
    animate="animate"
    variants={staggerChildren}
  >
      {/* Banner Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={bannerImage}
          alt="Kidolock Banner"
          className="w-full h-full object-cover object-center" />
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-black bg-black/30 sm:block md:hidden"></div>
        {/* Desktop overlay - darker background */}
        <div className="absolute inset-0 bg-black/20 hidden md:block"></div>
        {/* Overlay for screens 1239px and below - dark blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-900/50 hidden xl:block"></div>
      </div>

    {/* Content positioned over the banner */}
    <div className="relative z-10 h-full">
       {/* Breadcrumb - Top Left */}
       <motion.div 
         className="absolute top-6 left-8 z-20 sm:left-6 md:left-8 lg:left-12 xl:left-16"
         variants={fadeInLeft}
       >
        <nav>
          <ol className="flex items-center space-x-2 text-xs">
            <li>
              <div className="text-gray-300 hover:text-gray-200 transition-colors font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
                {t('breadcrumbHome')}
              </div>
            </li>
            <li className="text-gray-300">{'>'}</li>
            <li className="text-gray-300 hover:text-gray-200 transition-colors font-light" style={{ fontFamily: 'Myriad Pro' }}>{t('breadcrumbKidolock')}</li>
          </ol>
        </nav>
      </motion.div>

       {/* Underline - Line matching title width */}
       <motion.div 
         className="absolute top-12 left-8 z-20 sm:left-6 sm:top-10 md:left-8 md:top-12 lg:left-12 lg:top-12 xl:left-16 xl:top-12"
         variants={fadeInLeft}
       >
         <div className="w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-px bg-gray-400"></div>
       </motion.div>

       {/* Main Title and Features - Left Side */}
       <motion.div 
         className="absolute left-8 top-28 w-4xl z-20 sm:left-6 sm:top-24 md:left-8 md:top-28 lg:left-12 lg:top-28 xl:left-16 xl:top-28"
         variants={fadeInLeft}
       >
         {/* Main Title */}
         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Baloo Bhaijaan 2', fontWeight: 700 }}>
           {t('mainTitle')}
         </h1>
         
        {/* Subtitle */}
        <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
          <div>{t('subtitle1')}</div>
          <div>{t('subtitle2')}</div>
          <div className='uppercase'>
            {t('subtitle3_highlight_trash_internet')}
          </div>
          <div className='uppercase'>
            <span className="text-orange-400 uppercase">{t('subtitle3_suffix')}</span>
          </div>
        </h2>
         
         {/* Feature List with Bullets */}
         <div className="space-y-3">
           <div className="flex items-center">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2 xl:h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
            <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-white uppercase leading-relaxed font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
              {t('feature1_prefix')}<span className="text-green-400">{t('feature1_highlight_internet')}</span>{t('feature1_suffix')}
            </p>
           </div>
           <div className="flex items-center">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2 xl:h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
            <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-white uppercase leading-relaxed font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
              {t('feature2_prefix')}"<span className="text-green-400">{t('feature2_highlight_online')}</span>"{t('feature2_suffix')}
            </p>
           </div>
           <div className="flex items-center">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2 xl:h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
            <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-white uppercase leading-relaxed font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
              {t('feature3_prefix')}<span className="text-orange-400">{t('feature3_highlight_anywhere')}</span>{t('feature3_suffix')}
            </p>
           </div>
         </div>
       </motion.div>

       {/* Protect Kid Image - Right Side */}
       <motion.div 
         className="absolute top-1/2 right-4 transform -translate-y-1/2 z-0 md:z-10"
         variants={fadeInRight}
       >
        <img
          src={protectKidImage}
          alt="Protect Kid"
          className="w-[28rem] h-[28rem] sm:w-[32rem] sm:h-[32rem] md:w-[36rem] md:h-[36rem] lg:w-[40rem] lg:h-[40rem] xl:w-[44rem] xl:h-[44rem] 2xl:w-[48rem] 2xl:h-[48rem] object-contain opacity-20 md:opacity-20 lg:opacity-20 xl:opacity-100 transition-all duration-500 blur-[2px] sm:blur-[1.5px] md:blur-[1px] lg:blur-[0.5px] xl:blur-none hover:blur-[1px]"
        />
      </motion.div>

       {/* Platform Compatibility - Bottom Right Corner */}
       <motion.div 
         className="absolute bottom-4 right-8 text-right z-20 sm:right-6 md:right-8 lg:right-12 xl:right-16"
         variants={fadeInRight}
       >
        <p className="text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-1" style={{ fontFamily: 'Myriad Pro' }}>{t('availableOn')}</p>
        <div className="flex flex-wrap justify-end items-center gap-1 text-gray-300 hover:text-gray-200 transition-colors font-light text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs" style={{ fontFamily: 'Myriad Pro' }}>
          <span>Windows®</span>
          <span>|</span>
          <span>Android™</span>
          <span>|</span>
          <span>iOS®</span>
        </div>
      </motion.div>
    </div>
  </motion.div>
  
  {/* Combined Sections with Background */}
  <motion.div
    className="relative"
    style={{
      backgroundImage: `url(${bgSession})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    }}
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <WhyKidolock />
    <div id="features-section">
      <FeaturesSection />
    </div>
    <div id="protection-section">
      <ProtectionSection />
    </div>
    <div id="education-section">
      <EducationSection />
    </div>
  </motion.div>
  
  {/* Testimonials Section */}
  <motion.div
    id="testimonials-section"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <TestimonialsSection />
  </motion.div>
  
  {/* Download Section */}
  <motion.div
    id="download-section"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <DownloadSection />
  </motion.div>
  
  {/* Pricing Section */}
  <motion.div
    id="pricing-section"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <PricingSection />
  </motion.div>

  {/* Subscription Workflow Section */}
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <SubscriptionWorkflowSection />
  </motion.div>

  {/* Contact Section */}
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <ContactSection />
  </motion.div>
  </>
  );
};

export default HomePage
