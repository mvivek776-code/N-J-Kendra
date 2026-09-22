import React, { useState } from 'react';
import {
  Compass,
  Briefcase,
  Heart,
  Coins,
  Activity,
  Sparkles,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { RASHIS_DATA } from '../data/astrologyData';
import { RashiInfo } from '../types';

export const RashifalSection: React.FC = () => {
  const [selectedRashiId, setSelectedRashiId] = useState<string>('aries');
  const [activeTab, setActiveTab] = useState<'general' | 'loveVivah' | 'career' | 'finance' | 'health'>('general');

  const selectedRashi = RASHIS_DATA.find((r) => r.id === selectedRashiId) || RASHIS_DATA[0];

  const tabs = [
    { id: 'general', label: 'संपूर्ण दिन', icon: Compass },
    { id: 'loveVivah', label: 'विवाह व प्रेम', icon: Heart },
    { id: 'career', label: 'करियर व आजीविका', icon: Briefcase },
    { id: 'finance', label: 'आर्थिक स्थिति', icon: Coins },
    { id: 'health', label: 'स्वास्थ्य', icon: Activity },
  ] as const;

  return (
    <section id="rashifal" className="py-16 bg-[#FFFDF9] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>दैनिक ग्रह गोचर फल • 12 राशियां</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            आज का दैनिक वैदिक राशिफल
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
            प्रत्येक राशि का चंद्र गोचर के आधार पर विवाह, प्रेम, करियर, धन एवं स्वास्थ्य का सटीक फलित तथा दैनिक वैदिक मंत्र।
          </p>
        </div>

        {/* 12 Rashis Selector Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
          {RASHIS_DATA.map((rashi) => {
            const isSelected = rashi.id === selectedRashiId;
            return (
              <button
                key={rashi.id}
                onClick={() => setSelectedRashiId(rashi.id)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-800 text-white border-amber-900 shadow-md scale-[1.03]'
                    : 'bg-white text-stone-700 border-amber-200/70 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <span className="text-2xl leading-none">{rashi.symbol}</span>
                <span className="font-bold text-sm font-serif">{rashi.nameHi}</span>
                <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                  {rashi.nameEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Rashi Detail View */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-amber-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-3xl font-serif border border-amber-300 shadow-xs">
                {selectedRashi.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-amber-950 font-serif">
                    {selectedRashi.nameHi} राशिफल ({selectedRashi.nameEn})
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-200">
                    {selectedRashi.element}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  राशि स्वामी: <strong className="text-amber-900">{selectedRashi.ruler}</strong>
                </p>
              </div>
            </div>

            {/* Lucky highlights pill */}
            <div className="flex items-center gap-3 bg-amber-50/80 px-4 py-2 rounded-2xl border border-amber-200">
              <div className="text-xs">
                <span className="text-stone-500 block text-[10px]">शुभ रंग</span>
                <strong className="text-amber-950 font-bold">{selectedRashi.luckyColor}</strong>
              </div>
              <div className="w-px h-6 bg-amber-200"></div>
              <div className="text-xs">
                <span className="text-stone-500 block text-[10px]">शुभ अंक</span>
                <strong className="text-amber-950 font-bold text-base">{selectedRashi.luckyNumber}</strong>
              </div>
            </div>
          </div>

          {/* Sub-Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pb-2">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-100 text-amber-950 shadow-xs border border-amber-300'
                      : 'bg-stone-50 text-stone-600 hover:bg-amber-50/50'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Prediction Content Area */}
          <div className="mt-6 p-6 rounded-2xl bg-amber-50/40 border border-amber-100 min-h-[140px] flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {activeTab === 'general' && 'सामान्य राशिफल एवं दैनिक दिनचर्या'}
                  {activeTab === 'loveVivah' && 'विवाह, प्रेम एवं दांपत्य जीवन फलित'}
                  {activeTab === 'career' && 'कार्यक्षेत्र, नौकरी एवं व्यापार योग'}
                  {activeTab === 'finance' && 'आर्थिक समृद्धि, निवेश व लाभ-हानि'}
                  {activeTab === 'health' && 'स्वास्थ्य, खानपान एवं मानसिक संतुलन'}
                </span>
              </div>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                {selectedRashi.dailyPrediction[activeTab]}
              </p>
            </div>

            {/* Sacred Mantra of the day for this Rashi */}
            <div className="mt-6 pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-amber-900 block">
                  आज का कल्याणकारी वैदिक बीज मंत्र:
                </span>
                <span className="text-sm font-serif font-bold text-amber-950 tracking-wide">
                  {selectedRashi.dailyPrediction.mantra}
                </span>
              </div>
              <div className="text-xs text-amber-800/80 italic">
                * प्रातः काल 11 बार जप करने से ग्रह शांति होती है
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
