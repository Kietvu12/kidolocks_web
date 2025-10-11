import React from 'react'
import { useNavigate } from 'react-router-dom'
import bannerImage from '../assets/banner.jpg'
import protectKidImage from '../assets/project_kid.png'
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

  return (
  <>
  {/* Navbar */}
  <Navbar />
  
  <div className="px-0 md:px-20 relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden">
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
       <div className="absolute top-6 left-8 z-20 sm:left-6 md:left-8 lg:left-12 xl:left-16">
        <nav>
          <ol className="flex items-center space-x-2 text-xs">
            <li>
              <div className="text-gray-300 hover:text-gray-200 transition-colors font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
                TRANG CHỦ
              </div>
            </li>
            <li className="text-gray-300">{'>'}</li>
            <li className="text-gray-300 hover:text-gray-200 transition-colors font-light" style={{ fontFamily: 'Myriad Pro' }}>KIDOLOCK</li>
          </ol>
        </nav>
      </div>

       {/* Underline - Line matching title width */}
       <div className="absolute top-16 left-8 z-20 sm:left-6 md:left-8 lg:left-12 xl:left-16">
         <div className="w-96 h-px bg-gray-400"></div>
       </div>

       {/* Main Title and Features - Left Side */}
       <div className="absolute left-8 top-28 w-4xl z-20 sm:left-6 sm:top-24 md:left-8 md:top-28 lg:left-12 lg:top-28 xl:left-16 xl:top-28">
         {/* Main Title */}
         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Baloo Bhaijaan 2', fontWeight: 700 }}>
           KIDOLOCK
         </h1>
         
         {/* Subtitle */}
         <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
           <div>GIẢI PHÁP PHẦN MỀM</div>
           <div>BẢO VỆ VÀ NGĂN CHẶN</div>
           <div>"<span className="text-orange-400">RÁC INTERNET</span>" CHO TRẺ EM</div>
         </h2>
         
         {/* Feature List with Bullets */}
         <div className="space-y-3">
           <div className="flex items-center">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2 xl:h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
             <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-white uppercase leading-relaxed font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
               QUẢN LÝ NHỮNG GÌ CON TRẺ THEO DÕI TRÊN <span className="text-green-400">INTERNET</span>
             </p>
           </div>
           <div className="flex items-center">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2 xl:h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
             <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-white uppercase leading-relaxed font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
               KIỂM SOÁT QUỸ THỜI GIAN "<span className="text-green-400">ONLINE</span>" CỦA TRẺ
             </p>
           </div>
           <div className="flex items-center">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2 xl:h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
             <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-white uppercase leading-relaxed font-bold" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
               CHA MẸ AN TÂM, TỪ <span className="text-orange-400">BẤT CỨ ĐÂU</span>
             </p>
           </div>
         </div>
       </div>

       {/* Protect Kid Image - Right Side */}
       <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-0 md:z-10">
        <img
          src={protectKidImage}
          alt="Protect Kid"
          className="w-[28rem] h-[28rem] sm:w-[32rem] sm:h-[32rem] md:w-[36rem] md:h-[36rem] lg:w-[40rem] lg:h-[40rem] xl:w-[44rem] xl:h-[44rem] 2xl:w-[48rem] 2xl:h-[48rem] object-contain opacity-20 md:opacity-20 lg:opacity-20 xl:opacity-100 transition-all duration-500 blur-[2px] sm:blur-[1.5px] md:blur-[1px] lg:blur-[0.5px] xl:blur-none hover:blur-[1px]"
        />
      </div>

       {/* Platform Compatibility - Bottom Right Corner */}
       <div className="absolute bottom-4 right-8 text-right z-20 sm:right-6 md:right-8 lg:right-12 xl:right-16">
        <p className="text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-1" style={{ fontFamily: 'Myriad Pro' }}>AVAILABLE ON</p>
        <div className="flex flex-wrap justify-end items-center gap-1 text-gray-300 hover:text-gray-200 transition-colors font-light text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs" style={{ fontFamily: 'Myriad Pro' }}>
          <span>Windows®</span>
          <span>|</span>
          <span>macOS®</span>
          <span>|</span>
          <span>Android™</span>
          <span>|</span>
          <span>iOS®</span>
        </div>
      </div>
    </div>
  </div>
  
  {/* Why Kidolock Section - Separate from banner */}
  <div>
    <WhyKidolock />
  </div>
  
  {/* Features Section */}
  <div>
    <FeaturesSection />
  </div>
  
  {/* Protection Section */}
  <div>
    <ProtectionSection />
  </div>
  
  {/* Education Section */}
  <div>
    <EducationSection />
  </div>
  
  {/* Testimonials Section */}
  <div>
    <TestimonialsSection />
  </div>
  
  {/* Download Section */}
  <div>
    <DownloadSection />
  </div>
  
  {/* Pricing Section */}
  <div>
    <PricingSection />
  </div>

  {/* Subscription Workflow Section */}
  <div>
    <SubscriptionWorkflowSection />
  </div>

  {/* Contact Section */}
  <ContactSection />
  </>
  );
};

export default HomePage
