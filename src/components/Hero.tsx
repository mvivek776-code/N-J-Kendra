import React from 'react';
import {
  Sparkles,
  HeartHandshake,
  FileText,
  Compass,
  MessageSquare,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface HeroProps {
  onSelectAction: (actionId: string) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectAction, onOpenBooking }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FFFDF9] border-b border-amber-200/50">
      {/* Decorative Traditional Geometric Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Top Sacred Trust Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 text-xs sm:text-sm font-semibold shadow-xs">
            <Award className="w-4 h-4 text-amber-700" />
            <span>12+ वर्षों का अविचल प्रामाणिक अनुभव • काशी एवं हरिद्वार की वैदिक परंपरा</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="text-amber-800 font-bold tracking-wide text-sm sm:text-base uppercase">
            ॥ निवारण ज्योतिष केंद्र ॥
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif] leading-tight tracking-tight">
            वैदिक ज्योतिष एवं <span className="text-amber-800 underline decoration-amber-400 decoration-wavy decoration-2">विवाह समाधान</span> का प्रामाणिक केंद्र
          </h1>
          <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            विवाह में देरी, 36 गुण मिलान, मांगलिक एवं नाड़ी दोष निवारण, जन्म कुंडली तथा जीवन के प्रत्येक प्रश्न का सटीक शास्त्रोक्त समाधान।
          </p>

          {/* FRONT AND CENTER FLICKERING CONSULTATION BUTTON WITH GURUJI */}
          <div className="pt-2 pb-1 flex flex-col items-center justify-center gap-3">
            <button
              onClick={onOpenBooking}
              className="animate-flicker-attract group relative inline-flex items-center gap-3.5 px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 text-white font-extrabold text-base sm:text-xl shadow-2xl transition-transform hover:scale-105 active:scale-95 border-2 border-amber-300 ring-4 ring-amber-400/40 cursor-pointer"
            >
              {/* Guruji Small Avatar Inside Button */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-200 bg-amber-100 shrink-0 shadow-inner">
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

              <div className="text-left leading-tight">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-amber-200 font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-beacon-flicker"></span>
                  <span>गुरुजी विवेक कुमार मिश्रा उपलब्ध हैं</span>
                </div>
                <div className="text-white font-serif font-black tracking-wide flex items-center gap-1.5">
                  <span>परामर्श बुक करें</span>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>

              <span className="ml-1 px-3 py-1 rounded-full bg-white/20 group-hover:bg-white/30 text-amber-100 text-xs sm:text-sm font-bold shrink-0">
                यहाँ क्लिक करें →
              </span>
            </button>

            {/* Subtext info */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-amber-950/80 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                100% गोपनीय व शास्त्रोक्त
              </span>
              <span>•</span>
              <span>केवल 5 मुख्य विषय (विवाह, नौकरी, संतान, धन, अन्य)</span>
              <span>•</span>
              <a
                href="tel:+918887578844"
                className="text-amber-800 hover:text-amber-950 font-bold underline"
              >
                कॉल: +91 8887578844
              </a>
            </div>
          </div>
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-amber-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-amber-950 font-serif">12+ वर्ष</div>
              <div className="text-xs text-stone-500">वैदिक साधना व अनुभव</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-amber-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-amber-950 font-serif">50,000+</div>
              <div className="text-xs text-stone-500">सफल विवाह व जातक</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-amber-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-amber-950 font-serif">100%</div>
              <div className="text-xs text-stone-500">शास्त्रोक्त पराशर पद्धति</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-amber-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-amber-950 font-serif">4.96 ★</div>
              <div className="text-xs text-stone-500">जातक संतुष्टि रेटिंग</div>
            </div>
          </div>
        </div>

        {/* Quick Astroyogi-Inspired Interactive Launchpad */}
        <div className="mt-10 p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white shadow-xl shadow-amber-950/15 border border-amber-700/60 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-amber-700/50">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>त्वरित वैदिक सेवाएं (Instant Vedic Tools)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Noto_Serif_Devanagari',serif]">
                आप क्या जानना चाहते हैं?
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectAction('form')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-white text-amber-950 transition-colors shrink-0 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5 text-amber-800" />
                <span>परामर्श फॉर्म (Google Form)</span>
              </button>
              <button
                onClick={onOpenBooking}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-amber-950 transition-colors shrink-0"
              >
                सीधी बात करें →
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Action 1: Kundali Milan */}
            <button
              onClick={() => onSelectAction('milan')}
              className="group p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-500/30 text-left transition-all hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="font-bold text-base text-amber-100 group-hover:text-white">
                  विवाह गुण मिलान
                </div>
                <div className="text-xs text-amber-200/70 mt-1 line-clamp-2">
                  36 अष्टकूट गुण, मांगलिक व नाड़ी दोष परीक्षण
                </div>
              </div>
              <span className="text-[11px] font-semibold text-amber-300 mt-3 inline-block">
                मिलान प्रारंभ करें →
              </span>
            </button>

            {/* Action 2: Janam Kundali */}
            <button
              onClick={() => onSelectAction('kundali')}
              className="group p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-500/30 text-left transition-all hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="font-bold text-base text-amber-100 group-hover:text-white">
                  निःशुल्क जन्मपत्री
                </div>
                <div className="text-xs text-amber-200/70 mt-1 line-clamp-2">
                  लग्न चक्र, नवमांश, 12 भाव एवं महादशा फल
                </div>
              </div>
              <span className="text-[11px] font-semibold text-amber-300 mt-3 inline-block">
                कुंडली बनाएं →
              </span>
            </button>

            {/* Action 3: Rashifal */}
            <button
              onClick={() => onSelectAction('rashifal')}
              className="group p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-500/30 text-left transition-all hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="font-bold text-base text-amber-100 group-hover:text-white">
                  दैनिक राशिफल
                </div>
                <div className="text-xs text-amber-200/70 mt-1 line-clamp-2">
                  12 राशियों का आज का फल, शुभ रंग व अंक
                </div>
              </div>
              <span className="text-[11px] font-semibold text-amber-300 mt-3 inline-block">
                राशिफल देखें →
              </span>
            </button>

            {/* Action 4: Ask Astrologer */}
            <button
              onClick={() => onSelectAction('consult')}
              className="group p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-500/30 text-left transition-all hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="font-bold text-base text-amber-100 group-hover:text-white">
                  ज्योतिषी से पूछें
                </div>
                <div className="text-xs text-amber-200/70 mt-1 line-clamp-2">
                  विवाह, करियर व जीवन के प्रश्नों का तुरंत उत्तर
                </div>
              </div>
              <span className="text-[11px] font-semibold text-amber-300 mt-3 inline-block">
                प्रश्न पूछें →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
