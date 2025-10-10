import React from 'react'
import { useNavigate } from 'react-router-dom'
import bannerImage from '../assets/banner.jpg'
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
  
  <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden">
      {/* Banner Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={bannerImage}
          alt="Kidolock Banner"
          className="w-full h-full object-cover object-center" />
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-black bg-black/30 sm:block md:hidden"></div>
      </div>

    {/* Content positioned over the banner */}
    <div className="relative z-10 h-full">
      {/* Breadcrumb - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <nav>
          <ol className="flex items-center space-x-2 text-xs">
            <li>
              <div className="text-gray-300 hover:text-gray-200 transition-colors font-light">
                TRANG CHỦ
              </div>
            </li>
            <li className="text-gray-300">{'>'}</li>
            <li className="text-gray-300 hover:text-gray-200 transition-colors font-light">KIDOLOCK</li>
          </ol>
        </nav>
      </div>

      {/* Underline - Line matching title width */}
      <div className="absolute top-16 left-6 z-20">
        <div className="w-96 h-px bg-gray-400"></div>
      </div>

      {/* Main Title - Left Side */}
      <div className="absolute left-6 top-28 w-4xl z-20 sm:left-4 sm:top-24 md:left-6 md:top-28">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <div>KIDOLOCK - GIẢI PHÁP •</div>
          <div>PHẦN MỀM BẢO VỆ VÀ</div>
          <div>NGĂN CHẶN <span className="text-orange-400">"RÁC</span></div>
          <div><span className="text-orange-400">INTERNET"</span> CHO TRẺ EM</div>
        </h1>
      </div>

      {/* Feature Cards - Desktop Layout */}
      <div className="hidden md:block">
        {/* Feature Card 1 - Top Center Right */}
        <div className="absolute top-32 right-1/6 z-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-[40px] p-1.5 md:p-2 lg:p-3 xl:p-4 text-gray-800 shadow-xl border border-white/50">
            <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-center uppercase font-semibold">
              QUẢN LÝ NHỮNG GÌ CON TRẺ THEO DÕI TRÊN <span className="text-blue-600">INTERNET</span>
            </p>
          </div>
        </div>

        {/* Feature Card 2 - Bottom Center Left */}
        <div className="absolute top-[33rem] left-1/5 z-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-[40px] p-1.5 md:p-2 lg:p-3 xl:p-4 text-gray-800 shadow-xl border border-white/50">
            <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-center uppercase font-semibold">
              KIỂM SOÁT QUỸ THỜI GIAN <span className="text-blue-600">"ONLINE"</span> CỦA TRẺ
            </p>
          </div>
        </div>

        {/* Feature Card 3 - Bottom Center Right */}
        <div className="absolute top-[35rem] right-1/5 z-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-[40px] p-1.5 md:p-2 lg:p-3 xl:p-4 text-gray-800 shadow-xl border border-white/50">
            <p className="text-xs md:text-sm lg:text-base xl:text-lg text-center uppercase font-semibold">
              CHA MẸ AN TÂM, TỪ <span className="text-blue-600">BẤT CỨ ĐÂU</span>
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards - Mobile List Layout */}
      <div className="block md:hidden">
        <div className="absolute top-64 left-4 right-4 z-20 space-y-2 sm:space-y-3">
          <div className="text-white text-left">
            <p className="text-[10px] sm:text-xs uppercase leading-relaxed">
              QUẢN LÝ NHỮNG GÌ CON TRẺ THEO DÕI TRÊN <span className="text-green-400">INTERNET</span>
            </p>
          </div>
          <div className="text-white text-left">
            <p className="text-[10px] sm:text-xs uppercase leading-relaxed">
              KIỂM SOÁT QUỸ THỜI GIAN <span className="text-blue-400">"ONLINE"</span> CỦA TRẺ
            </p>
          </div>
          <div className="text-white text-left">
            <p className="text-[10px] sm:text-xs uppercase leading-relaxed">
              CHA MẸ AN TÂM, TỪ <span className="text-orange-400">BẤT CỨ ĐÂU</span>
            </p>
          </div>
        </div>
      </div>



      {/* Platform Compatibility - Bottom Right of Image */}
      <div className="absolute top-[calc(50vh-3rem)] right-4 text-right z-20 sm:top-[calc(50vh-2.5rem)] sm:right-2 md:top-[calc(80vh-3rem)] md:right-4 lg:top-[calc(75vh-3rem)] lg:right-6 xl:top-[calc(75vh-3rem)] xl:right-6">
        <p className="text-white text-xs font-semibold mb-1 sm:text-[4px] md:text-sm lg:text-sm xl:text-base">AVAILABLE ON</p>
        <div className="flex flex-wrap justify-end items-center gap-1 text-gray-300 hover:text-gray-200 transition-colors font-light sm:gap-0.5 sm:text-[3px] md:text-sm lg:text-sm xl:text-base">
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
