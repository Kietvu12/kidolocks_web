import React from 'react'
import Navbar from '../components/Navbar'
import Session1 from '../components/AboutUs/Session1'
import Session2 from '../components/AboutUs/Session2'
import Session3And4 from '../components/AboutUs/Session3And4'
import Session5 from '../components/AboutUs/Session5'
import Session6 from '../components/AboutUs/Session6'
import FinalSession from '../components/AboutUs/FinalSession'
import ContactSection from '../components/ContactSection'

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Session 1 - Hero Section */}
      <Session1 />
      
      {/* Session 2 - About Content */}
      <Session2 />
      
      {/* Session 3 & 4 - Product Features and Kilovia Ecosystem */}
      <Session3And4 />
      
      {/* Session 5 - Mission Statement */}
      <Session5 />
      
      {/* Session 6 - Quote Section */}
      <Session6 />
      
      {/* Final Session - Development Cooperation */}
      <FinalSession />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

export default AboutUsPage
