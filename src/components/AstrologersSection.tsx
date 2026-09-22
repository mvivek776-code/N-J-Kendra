import React from 'react';
import {
  Award,
  Star,
  Users,
  MessageCircle,
  PhoneCall,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ASTROLOGERS_DATA } from '../data/astrologyData';

interface AstrologersSectionProps {
  onOpenBooking: (serviceId?: string, astrologerName?: string) => void;
}

export const AstrologersSection: React.FC<AstrologersSectionProps> = ({ onOpenBooking }) => {
  const guruji = ASTROLOGERS_DATA[0];

  return (
    <section id="astrologers" className="py-16 bg-[#FFFDF9] border-b border-amber-200/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>निवारण ज्योतिष केंद्र • 12+ वर्षों का प्रामाणिक अनुभव</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            हमारे मुख्य मार्गदर्शक एवं ज्योतिषाचार्य
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base leading-relaxed">
            वैदिक शास्त्र, कुंडली मिलान, विवाह बाधा निवारण, नौकरी, व्यापार एवं संतान सुख के विशेषज्ञ
          </p>
        </div>

        {/* Guruji Exclusive Feature Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-300/80 shadow-xl shadow-amber-900/5 relative overflow-hidden">
          {/* Subtle Golden Glow Motif */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-200/30 via-amber-100/10 to-transparent rounded-full pointer-events-none -mr-20 -mt-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Guruji's Photo with divine aura */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-amber-50 to-stone-100 border-2 border-amber-300 shadow-md">
                  <img
                    src={guruji.image}
                    alt={guruji.nameHi}
                    onError={(e) => {
                      // Fallback if png not directly loaded
                      e.currentTarget.src = '/astrologer_vivek.jpg';
                    }}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-4 text-white">
                    <span className="text-xs font-bold text-amber-300 block">॥ श्री गणेशाय नमः ॥</span>
                    <span className="text-sm font-semibold">{guruji.nameHi}</span>
                  </div>
                </div>
              </div>

              {/* Experience and Rating Badges */}
              <div className="flex items-center gap-3 mt-4">
                <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.98 / 5.0 रेटिंग</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-stone-600" />
                  <span>52,000+ जातक लाभान्वित</span>
                </div>
              </div>
            </div>

            {/* Guruji's Bio & Specialization */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>संस्थापक एवं प्रधान ज्योतिषी • निवारण ज्योतिष केंद्र</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  {guruji.nameHi}
                </h3>
                <p className="text-amber-800 font-semibold text-sm mt-1">
                  12+ वर्षों का गहन वैदिक एवं पराशर ज्योतिष अनुभव
                </p>
              </div>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {guruji.aboutHi}
              </p>

              {/* Core Specializations */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                  मुख्य विशेषज्ञता विषय (Core Specializations)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {guruji.specializationHi.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flickering & Eye-Catching Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                {/* ATTRACTIVE FLICKERING / PULSING BUTTON */}
                <button
                  onClick={() => onOpenBooking(undefined, guruji.nameHi)}
                  className="animate-flicker-attract relative group w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-red-700 to-amber-800 hover:from-amber-800 hover:to-red-800 text-white font-bold text-sm sm:text-base shadow-xl shadow-amber-900/40 transition-all flex items-center justify-center gap-2.5 overflow-hidden ring-4 ring-amber-400/50 hover:scale-105"
                  title="गुरुजी से परामर्श बुक करें"
                >
                  {/* Flickering Light Effect */}
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="tracking-wide">गुरुजी से परामर्श बुक करें</span>
                  <span className="text-[11px] bg-amber-300 text-amber-950 font-extrabold px-2 py-0.5 rounded-full uppercase ml-1 animate-beacon-flicker">
                    उपलब्ध
                  </span>
                </button>

                <a
                  href="tel:+918887578844"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300 transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  <span>कॉल करें: +91 8887578844</span>
                </a>

                <a
                  href="https://wa.me/918887578844?text=नमस्ते%20गुरुजी%20ज्योतिषाचार्य%20विवेक%20कुमार%20मिश्रा%20जी,%20मुझे%20परामर्श%20हेतु%20समय%20चाहिए।"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>व्हाट्सएप</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

