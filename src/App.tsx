import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustIndicators } from './components/TrustIndicators';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { QualitySection } from './components/QualitySection';
import { B2BSection } from './components/B2BSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductInquiryModal } from './components/ProductInquiryModal';
import { B2BCalendarModal } from './components/B2BCalendarModal';
import { ChatBot } from './components/ChatBot';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // Sync HTML lang, dir and document title when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (lang === 'ar') {
      document.title = 'أعلاف الكوثر | Al Kawther Feeds';
    } else {
      document.title = 'Al Kawther Feeds | General Ruminant Feed';
    }
  }, [lang]);

  // Scroll spy to update active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'quality', 'b2b', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-[#FFF6F9] text-[#1E255E] flex flex-col font-arabic selection:bg-pink-200 selection:text-[#B8194B]">
      {/* Sticky Top Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenContactModal={() => scrollToSection('contact')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          lang={lang}
          onNavigate={scrollToSection}
          onOpenConsultationModal={() => setIsCalendarModalOpen(true)}
        />

        {/* 2. Trust Indicators */}
        <TrustIndicators lang={lang} />

        {/* 3. About Company Section */}
        <AboutSection lang={lang} onNavigate={scrollToSection} />

        {/* 4. Products Section (General Ruminant Feed) */}
        <ProductsSection
          lang={lang}
          onOpenInquiryModal={() => setIsProductModalOpen(true)}
        />

        {/* 5. Quality Standards Section */}
        <QualitySection lang={lang} />

        {/* 6. B2B Supply & Partnerships Section */}
        <B2BSection
          lang={lang}
          onOpenConsultationModal={() => setIsCalendarModalOpen(true)}
          onNavigateContact={() => scrollToSection('contact')}
        />

        {/* 7. Contact Us & Direct Email Form Section */}
        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={scrollToSection} />

      {/* Automated Chatbot with Day & Night Mode */}
      <ChatBot
        lang={lang}
        onOpenInquiryModal={() => setIsProductModalOpen(true)}
        onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
        onNavigateContact={() => scrollToSection('contact')}
      />

      {/* Product Inquiry Modal */}
      <ProductInquiryModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        lang={lang}
      />

      {/* B2B Consultation Scheduler Modal */}
      <B2BCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
