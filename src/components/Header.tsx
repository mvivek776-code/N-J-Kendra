import React, { useState } from 'react';
import { Phone, Calendar, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'मुख्य पृष्ठ' },
    { id: 'milan', label: 'विवाह एवं गुण मिलान' },
    { id: 'kundali', label: 'जन्म कुंडली' },
    { id: 'form', label: 'परामर्श फॉर्म' },
    { id: 'rashifal', label: 'दैनिक राशिफल' },
    { id: 'services', label: 'हमारी सेवाएं' },
    { id: 'astrologers', label: 'वरिष्ठ ज्योतिषी' },
    { id: 'consult', label: 'ज्योतिषी से पूछें' },
    { id: 'muhurat', label: 'शुभ मुहूर्त' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      {/* Top Auspicious Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-100 text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-bold">॥ ॐ श्री गणेशाय नमः ॥</span>
            <span className="hidden sm:inline text-amber-200/70">|</span>
            <span className="hidden sm:inline">12+ वर्षों का प्रामाणिक वैदिक अनुभव • 50,000+ संतुष्ट जातक</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+918887578844"
              className="flex items-center gap-1.5 text-amber-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>परामर्श हेल्पलाइन: +91 8887578844</span>
            </a>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300 font-normal">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% गोपनीय व शास्त्रोक्त
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20 border border-amber-400/40 group-hover:scale-105 transition-transform">
            <span className="text-2xl font-serif">ॐ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Noto_Serif_Devanagari',serif] tracking-tight">
                निवारण ज्योतिष केंद्र
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/80">
                12+ Yrs Exp
              </span>
            </div>
            <p className="text-xs text-amber-900/70 font-medium">
              सटीक विवाह एवं अष्टकूट मिलान • जन्मपत्री • प्रामाणिक वैदिक समाधान
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-amber-100 text-amber-900 font-semibold shadow-xs'
                  : 'hover:bg-amber-50/80 hover:text-amber-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="animate-flicker-attract flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-600/30 hover:from-amber-700 hover:to-amber-900 transition-transform hover:scale-105 active:scale-95 border-2 border-amber-300 ring-2 ring-amber-400/50"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-beacon-flicker shrink-0"></span>
            <Calendar className="w-4 h-4 text-amber-200" />
            <span className="tracking-wide">परामर्श बुक करें</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-amber-950 hover:bg-amber-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-amber-200 px-4 pt-2 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-stone-700 hover:bg-amber-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-amber-200/60 flex flex-col gap-2">
            <a
              href="tel:+918887578844"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-amber-50 text-amber-900 font-semibold text-xs border border-amber-200"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              हेल्पलाइन: +91 8887578844
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
