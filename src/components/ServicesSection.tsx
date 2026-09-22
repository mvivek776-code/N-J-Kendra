import React, { useState } from 'react';
import {
  HeartHandshake,
  Sparkles,
  FileText,
  Flame,
  Gem,
  Home,
  Calendar,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { ASTROLOGY_SERVICES } from '../data/astrologyData';
import { AstrologyService } from '../types';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectTool: (toolId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return HeartHandshake;
      case 'Sparkles':
        return Sparkles;
      case 'FileText':
        return FileText;
      case 'Flame':
        return Flame;
      case 'Gem':
        return Gem;
      case 'Home':
        return Home;
      case 'Calendar':
        return Calendar;
      case 'Briefcase':
        return Briefcase;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="services" className="py-16 bg-[#FFF9EE]/40 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>केवल फोन कॉल परामर्श (Only Call Option Available)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            हमारी प्रमुख सेवाएं एवं दक्षिणा शुल्क
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base leading-relaxed">
            पूज्य गुरुजी ज्योतिषाचार्य विवेक कुमार मिश्रा (12+ वर्ष अनुभव) द्वारा शास्त्रोक्त वैदिक विश्लेषण। अपनी आवश्यकता अनुसार उपयुक्त सेवा चुनें।
          </p>
        </div>

        {/* Services Grid (4 Exact Plans) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ASTROLOGY_SERVICES.map((service) => {
            const IconComponent = getIcon(service.iconName);
            const isCheapest = service.id === 'two-subjects-251';
            const isPopular = service.id === 'purna-kundali-501';

            return (
              <div
                key={service.id}
                className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative ${
                  isCheapest
                    ? 'bg-gradient-to-b from-amber-50/80 to-white border-2 border-emerald-500 shadow-lg ring-2 ring-emerald-400/20'
                    : isPopular
                    ? 'bg-white border-2 border-amber-500 shadow-xl ring-2 ring-amber-400/30'
                    : 'bg-white border border-amber-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Special Tag Ribbon */}
                {isCheapest && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    ★ सबसे किफायती प्लान
                  </div>
                )}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    ★ सर्वाधिक अनुशंसित
                  </div>
                )}

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4 mt-1">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isCheapest
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {service.feeText}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-amber-950 font-serif mb-1 leading-snug">
                    {service.titleHi}
                  </h3>
                  <div className="text-[11px] text-stone-500 mb-2 font-medium">
                    {service.tagHi}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {service.descriptionHi}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-5">
                    {service.highlightsHi.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Fee, Time and CTA */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {service.duration}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                      केवल कॉल
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCheapest
                        ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900'
                        : isPopular
                        ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950'
                        : 'bg-stone-800 hover:bg-stone-900'
                    }`}
                  >
                    <span>{service.feeText} में बुक करें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 font-serif">
                100% प्रामाणिक व शास्त्रोक्त वैदिक परामर्श (No False Promises)
              </h4>
              <p className="text-xs text-stone-500">
                फॉर्म सबमिट होते ही आपकी जानकारी Google Forms में सुरक्षित दर्ज होगी तथा आप तुरंत गुरुजी के WhatsApp पर प्रेषित होंगे।
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking('two-subjects-251')}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-xs"
          >
            ₹251 में 2 विषय परामर्श लें →
          </button>
        </div>
      </div>
    </section>
  );
};
