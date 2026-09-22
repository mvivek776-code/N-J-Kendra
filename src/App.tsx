import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KundaliMilanTool } from './components/KundaliMilanTool';
import { JanamKundaliTool } from './components/JanamKundaliTool';
import { RashifalSection } from './components/RashifalSection';
import { GoogleFormSection } from './components/GoogleFormSection';
import { ServicesSection } from './components/ServicesSection';
import { AstrologersSection } from './components/AstrologersSection';
import { AiConsultSection } from './components/AiConsultSection';
import { MuhuratSection } from './components/MuhuratSection';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Phone, MessageCircle, HeartHandshake } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingAstrologerName, setBookingAstrologerName] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string, astrologerName?: string) => {
    setBookingServiceId(serviceId);
    setBookingAstrologerName(astrologerName);
    setIsBookingOpen(true);
  };

  const handleSelectTool = (toolId: string) => {
    setActiveSection(toolId);
    const element = document.getElementById(toolId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col font-['Outfit','Noto_Serif_Devanagari',sans-serif] text-stone-800">
      {/* Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectAction={handleSelectTool}
          onOpenBooking={() => handleOpenBooking('vivah-kundali-milan')}
        />

        {/* Vivah & Ashtakoot Kundali Milan Tool */}
        <KundaliMilanTool onOpenBooking={handleOpenBooking} />

        {/* Janam Kundali & Diamond Chart Generator */}
        <JanamKundaliTool onOpenBooking={handleOpenBooking} />

        {/* Online Google Form Application Section (निवारण ज्योतिष केंद्र) */}
        <GoogleFormSection />

        {/* Daily Rashifal (12 Rashis) */}
        <RashifalSection />

        {/* Comprehensive Services (Vivah and Many More) */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onSelectTool={handleSelectTool}
        />

        {/* Senior Astrologers with 12+ Years Experience */}
        <AstrologersSection onOpenBooking={handleOpenBooking} />

        {/* AI Vedic Astrology Consultation */}
        <AiConsultSection />

        {/* Auspicious Muhurats */}
        <MuhuratSection onOpenBooking={handleOpenBooking} />

        {/* Testimonials & FAQs */}
        <TestimonialsFaq />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleSelectTool}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Appointment Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={bookingServiceId}
        preselectedAstrologerName={bookingAstrologerName}
      />

      {/* Floating Action Buttons for Astroyogi-Grade Accessibility */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Quick Consultation Booking Button with Flicker Effect */}
        <button
          onClick={() => handleOpenBooking()}
          className="animate-flicker-attract group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-2xl border-2 border-amber-300 ring-2 ring-amber-400/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          title="पूज्य गुरुजी से परामर्श बुक करें"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-200 bg-amber-100 shrink-0">
            <img
              src="/IMG_20250822_191834-removebg-preview.png"
              alt="ज्योतिषाचार्य विवेक कुमार मिश्रा"
              onError={(e) => {
                e.currentTarget.src = '/astrologer_vivek.jpg';
              }}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="tracking-wide">परामर्श बुक करें</span>
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-beacon-flicker"></span>
        </button>

        <div className="flex items-center gap-2">
          {/* WhatsApp Quick Link */}
          <a
            href="https://wa.me/918887578844?text=नमस्ते%20गुरुजी%20ज्योतिषाचार्य%20विवेक%20कुमार%20मिश्रा%20जी,%20मुझे%20निवारण%20ज्योतिष%20केंद्र%20से%20परामर्श%20चाहिए।"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-transform hover:scale-110 active:scale-95 border-2 border-white"
            title="व्हाट्सएप पर संपर्क करें"
          >
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* Instant Helpline Call */}
          <a
            href="tel:+918887578844"
            className="w-12 h-12 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-lg hover:bg-amber-800 transition-transform hover:scale-110 active:scale-95 border-2 border-white"
            title="निःशुल्क हेल्पलाइन कॉल करें: +91 8887578844"
          >
            <Phone className="w-5 h-5 text-amber-200" />
          </a>
        </div>
      </div>
    </div>
  );
}
