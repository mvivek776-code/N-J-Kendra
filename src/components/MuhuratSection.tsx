import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';
import { UPCOMING_MUHURATS } from '../data/astrologyData';

interface MuhuratSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const MuhuratSection: React.FC<MuhuratSectionProps> = ({ onOpenBooking }) => {
  const [activeCat, setActiveCat] = useState<'all' | 'vivah' | 'grihapravesh' | 'vahan'>('all');

  const filteredMuhurats = UPCOMING_MUHURATS.filter((m) => {
    if (activeCat === 'all') return true;
    return m.category === activeCat;
  });

  return (
    <section id="muhurat" className="py-16 bg-[#FFFDF9] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>पंचांग शुद्धि • त्रिबल विचार</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            आगामी शुभ विवाह एवं मांगलिक मुहूर्त
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
            शुभ विवाह, गृह प्रवेश एवं नवीन कार्यों के लिए पंचांग के 5 अंगों की शुद्धि, गुरु-शुक्र अस्त विचार और त्रिबल शुद्धि से निर्धारित प्रामाणिक मुहूर्त।
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCat === 'all'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50'
            }`}
          >
            सभी मुहूर्त
          </button>
          <button
            onClick={() => setActiveCat('vivah')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCat === 'vivah'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50'
            }`}
          >
            💍 शुभ विवाह मुहूर्त (Vivah)
          </button>
          <button
            onClick={() => setActiveCat('grihapravesh')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCat === 'grihapravesh'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50'
            }`}
          >
            🏛️ गृह प्रवेश मुहूर्त
          </button>
          <button
            onClick={() => setActiveCat('vahan')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCat === 'vahan'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50'
            }`}
          >
            🚗 वाहन एवं संपत्ति क्रय
          </button>
        </div>

        {/* Muhurat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMuhurats.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {m.auspiciousness}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {m.category === 'vivah' ? 'विवाह मुहूर्त' : 'मांगलिक काल'}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-amber-950 font-serif mb-2">
                  {m.titleHi}
                </h3>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-stone-700">
                    <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                    <strong className="text-amber-950">{m.dateStr}</strong>
                  </div>
                  <div className="flex items-start gap-2 text-stone-600">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{m.tithiHi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <div>
                      <span className="text-[10px] text-stone-500 block">शुभ वेला (Auspicious Window)</span>
                      <strong className="text-amber-900 font-bold text-xs">{m.shubhMuhuratTimeHi}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => onOpenBooking('shubh-muhurat-selection')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>व्यक्तिगत लग्न पत्रिका बनवाएं</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
