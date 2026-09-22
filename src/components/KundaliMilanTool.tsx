import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle,
  AlertTriangle,
  Info,
  Calendar,
  Sparkles,
  RefreshCw,
  PhoneCall,
  User,
  Heart,
} from 'lucide-react';
import {
  RASHIS_LIST,
  NAKSHATRAS_LIST,
  calculateAshtakootMilan,
} from '../utils/vedicCalculator';
import { MilanResult } from '../types';

interface KundaliMilanToolProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const KundaliMilanTool: React.FC<KundaliMilanToolProps> = ({ onOpenBooking }) => {
  // Boy inputs
  const [boyName, setBoyName] = useState('रोहित शर्मा');
  const [boyRashiIdx, setBoyRashiIdx] = useState(0); // Mesh
  const [boyNakshatraIdx, setBoyNakshatraIdx] = useState(0); // Ashwini
  const [boyDob, setBoyDob] = useState('1997-04-15');
  const [boyPob, setBoyPob] = useState('नई दिल्ली');
  const [boyIsManglik, setBoyIsManglik] = useState(false);

  // Girl inputs
  const [girlName, setGirlName] = useState('अंजलि वर्मा');
  const [girlRashiIdx, setGirlRashiIdx] = useState(4); // Simha
  const [girlNakshatraIdx, setGirlNakshatraIdx] = useState(9); // Magha
  const [girlDob, setGirlDob] = useState('1999-08-22');
  const [girlPob, setGirlPob] = useState('वाराणसी');
  const [girlIsManglik, setGirlIsManglik] = useState(false);

  // Calculation Result
  const [result, setResult] = useState<MilanResult | null>(() =>
    calculateAshtakootMilan(
      'रोहित शर्मा',
      0,
      0,
      false,
      'अंजलि वर्मा',
      4,
      9,
      false
    )
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateAshtakootMilan(
      boyName || 'वर',
      Number(boyRashiIdx),
      Number(boyNakshatraIdx),
      boyIsManglik,
      girlName || 'कन्या',
      Number(girlRashiIdx),
      Number(girlNakshatraIdx),
      girlIsManglik
    );
    setResult(res);
  };

  const handleLoadSample = (sampleType: 'ideal' | 'manglik' | 'challenging') => {
    if (sampleType === 'ideal') {
      setBoyName('आदित्य पांडेय');
      setBoyRashiIdx(8); // Dhanu
      setBoyNakshatraIdx(18); // Mula
      setBoyIsManglik(false);
      setGirlName('सौम्या दीक्षित');
      setGirlRashiIdx(0); // Mesha
      setGirlNakshatraIdx(0); // Ashwini
      setGirlIsManglik(false);
      setResult(
        calculateAshtakootMilan('आदित्य पांडेय', 8, 18, false, 'सौम्या दीक्षित', 0, 0, false)
      );
    } else if (sampleType === 'manglik') {
      setBoyName('राहुल खन्ना');
      setBoyRashiIdx(7); // Scorpio
      setBoyNakshatraIdx(16); // Anuradha
      setBoyIsManglik(true);
      setGirlName('प्रिया कपूर');
      setGirlRashiIdx(7); // Scorpio
      setGirlNakshatraIdx(16); // Anuradha
      setGirlIsManglik(true);
      setResult(
        calculateAshtakootMilan('राहुल खन्ना', 7, 16, true, 'प्रिया कपूर', 7, 16, true)
      );
    } else {
      setBoyName('विकास सिंह');
      setBoyRashiIdx(2); // Gemini
      setBoyNakshatraIdx(5); // Ardra
      setBoyIsManglik(true);
      setGirlName('कीर्ति शुक्ला');
      setGirlRashiIdx(7); // Scorpio
      setGirlNakshatraIdx(17); // Jyeshtha
      setGirlIsManglik(false);
      setResult(
        calculateAshtakootMilan('विकास सिंह', 2, 5, true, 'कीर्ति शुक्ला', 7, 17, false)
      );
    }
  };

  return (
    <section id="milan" className="py-16 bg-[#FFFDF9] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-amber-700" />
            <span>विवाह विशेष सेवा • 12+ वर्षों का शोधित अनुभव</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            वैदिक विवाह एवं 36 गुण मिलान (अष्टकूट चक्र)
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
            वर और कन्या के जन्म विवरण, राशि एवं नक्षत्र के आधार पर संपूर्ण अष्टकूट (वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट, नाड़ी) तथा मांगलिक दोष का सूक्ष्म विश्लेषण।
          </p>
        </div>

        {/* Form Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-amber-100 mb-6">
            <div className="text-xs font-medium text-stone-500">
              त्वरित परीक्षण हेतु उदाहरण लोड करें:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleLoadSample('ideal')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
              >
                ✓ उत्तम विवाह योग (30+ गुण)
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('manglik')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
              >
                ⚖ मांगलिक परिहार योग
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('challenging')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 transition-colors"
              >
                ⚠ नाड़ी / भकूट दोष उदाहरण
              </button>
            </div>
          </div>

          <form onSubmit={handleCalculate}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Boy's Details (वर विवरण) */}
              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-amber-200">
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-sm">
                    वर
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-950 text-base font-serif">
                      वर का विवरण (Boy's Details)
                    </h3>
                    <p className="text-[11px] text-amber-800/70">नाम, जन्म राशि एवं नक्षत्र</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    वर का पूरा नाम
                  </label>
                  <input
                    type="text"
                    required
                    value={boyName}
                    onChange={(e) => setBoyName(e.target.value)}
                    placeholder="उदा. राहुल शर्मा"
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म राशि (Moon Sign)
                    </label>
                    <select
                      value={boyRashiIdx}
                      onChange={(e) => setBoyRashiIdx(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    >
                      {RASHIS_LIST.map((rashi, idx) => (
                        <option key={rashi} value={idx}>
                          {rashi} राशि
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म नक्षत्र (Nakshatra)
                    </label>
                    <select
                      value={boyNakshatraIdx}
                      onChange={(e) => setBoyNakshatraIdx(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    >
                      {NAKSHATRAS_LIST.map((nakshatra, idx) => (
                        <option key={nakshatra} value={idx}>
                          {nakshatra}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म तिथि (DOB)
                    </label>
                    <input
                      type="date"
                      value={boyDob}
                      onChange={(e) => setBoyDob(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म स्थान (POB)
                    </label>
                    <input
                      type="text"
                      value={boyPob}
                      onChange={(e) => setBoyPob(e.target.value)}
                      placeholder="उदा. नई दिल्ली"
                      className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={boyIsManglik}
                      onChange={(e) => setBoyIsManglik(e.target.checked)}
                      className="w-4 h-4 text-amber-700 rounded border-stone-300 focus:ring-amber-500"
                    />
                    <span className="text-xs font-semibold text-stone-800">
                      वर की कुंडली में मांगलिक दोष है (Manglik)
                    </span>
                  </label>
                </div>
              </div>

              {/* Girl's Details (कन्या विवरण) */}
              <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-200/80 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-rose-200">
                  <div className="w-8 h-8 rounded-full bg-rose-200 text-rose-900 flex items-center justify-center font-bold text-sm">
                    कन्या
                  </div>
                  <div>
                    <h3 className="font-bold text-rose-950 text-base font-serif">
                      कन्या का विवरण (Girl's Details)
                    </h3>
                    <p className="text-[11px] text-rose-800/70">नाम, जन्म राशि एवं नक्षत्र</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    कन्या का पूरा नाम
                  </label>
                  <input
                    type="text"
                    required
                    value={girlName}
                    onChange={(e) => setGirlName(e.target.value)}
                    placeholder="उदा. अंजलि वर्मा"
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म राशि (Moon Sign)
                    </label>
                    <select
                      value={girlRashiIdx}
                      onChange={(e) => setGirlRashiIdx(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    >
                      {RASHIS_LIST.map((rashi, idx) => (
                        <option key={rashi} value={idx}>
                          {rashi} राशि
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म नक्षत्र (Nakshatra)
                    </label>
                    <select
                      value={girlNakshatraIdx}
                      onChange={(e) => setGirlNakshatraIdx(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    >
                      {NAKSHATRAS_LIST.map((nakshatra, idx) => (
                        <option key={nakshatra} value={idx}>
                          {nakshatra}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म तिथि (DOB)
                    </label>
                    <input
                      type="date"
                      value={girlDob}
                      onChange={(e) => setGirlDob(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म स्थान (POB)
                    </label>
                    <input
                      type="text"
                      value={girlPob}
                      onChange={(e) => setGirlPob(e.target.value)}
                      placeholder="उदा. वाराणसी"
                      className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={girlIsManglik}
                      onChange={(e) => setGirlIsManglik(e.target.checked)}
                      className="w-4 h-4 text-rose-700 rounded border-stone-300 focus:ring-rose-500"
                    />
                    <span className="text-xs font-semibold text-stone-800">
                      कन्या की कुंडली में मांगलिक दोष है (Manglik)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white font-bold text-base shadow-lg shadow-amber-800/25 hover:from-amber-800 hover:to-amber-950 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                <HeartHandshake className="w-5 h-5 text-amber-300" />
                <span>अष्टकूट 36 गुण मिलान परिणाम देखें</span>
              </button>
            </div>
          </form>

          {/* Results Display */}
          {result && (
            <div className="mt-12 pt-8 border-t border-amber-200 space-y-8 animate-in fade-in duration-300">
              {/* Verdict Header Banner */}
              <div
                className={`p-6 rounded-2xl border ${
                  result.totalGunas >= 25
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : result.totalGunas >= 18
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                    : 'bg-rose-50/80 border-rose-300 text-rose-950'
                } flex flex-col md:flex-row items-center justify-between gap-6`}
              >
                <div className="flex items-center gap-5">
                  {/* Score Circle */}
                  <div className="relative w-24 h-24 rounded-full bg-white shadow-md flex flex-col items-center justify-center border-4 border-current shrink-0">
                    <span className="text-2xl font-black font-serif">
                      {result.totalGunas}
                    </span>
                    <span className="text-[10px] font-bold text-stone-500 uppercase">
                      / 36 गुण
                    </span>
                  </div>

                  <div>
                    <div className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 shadow-xs mb-1.5">
                      {result.compatibilityPercentage}% अनुकूलता
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-['Noto_Serif_Devanagari',serif]">
                      {result.verdictHi}
                    </h3>
                    <p className="text-xs sm:text-sm mt-1 opacity-90 max-w-xl">
                      {result.summaryRecommendationHi}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onOpenBooking('vivah-kundali-milan')}
                    className="px-5 py-2.5 rounded-xl bg-amber-800 text-white hover:bg-amber-900 font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    विशेषज्ञ से चर्चा करें
                  </button>
                </div>
              </div>

              {/* Ashtakoot Breakdown Table */}
              <div>
                <h4 className="text-lg font-bold text-amber-950 font-serif mb-4 flex items-center gap-2">
                  <span>अष्टकूट 8 घटकों का विस्तृत अंक विभाजन:</span>
                  <span className="text-xs font-normal text-stone-500">
                    (पराशर संहिता अनुसार)
                  </span>
                </h4>

                <div className="overflow-x-auto rounded-2xl border border-stone-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-amber-100/70 text-amber-950 border-b border-amber-200 font-bold">
                        <th className="py-3 px-4">कूट (Koota)</th>
                        <th className="py-3 px-4">महत्व एवं कार्य</th>
                        <th className="py-3 px-3 text-center">अधिकतम गुण</th>
                        <th className="py-3 px-3 text-center">प्राप्त गुण</th>
                        <th className="py-3 px-4 text-center">स्थिति</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {result.kootScores.map((koot) => (
                        <tr key={koot.name} className="hover:bg-amber-50/40 transition-colors">
                          <td className="py-3 px-4 font-bold text-amber-950 whitespace-nowrap">
                            {koot.nameHi}
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            {koot.descriptionHi}
                          </td>
                          <td className="py-3 px-3 text-center font-semibold text-stone-500">
                            {koot.maxPoints}
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-amber-800 text-base">
                            {koot.obtainedPoints}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                koot.status === 'उत्तम'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : koot.status === 'मध्यम'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {koot.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-amber-50 font-bold text-amber-950 border-t-2 border-amber-300">
                        <td className="py-3.5 px-4 text-base">कुल योग (Total)</td>
                        <td className="py-3.5 px-4 text-stone-600">
                          36 गुणों में से 18 गुण मिलना न्यूनतम स्वीकार्य माना जाता है।
                        </td>
                        <td className="py-3.5 px-3 text-center text-base">36</td>
                        <td className="py-3.5 px-3 text-center text-xl text-amber-800 font-extrabold">
                          {result.totalGunas}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-xs uppercase px-3 py-1 rounded-full bg-amber-200 text-amber-950">
                            {result.compatibilityPercentage}%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Special Vivah Dosha Analysis (Manglik & Nadi) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Manglik Analysis */}
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2 font-bold text-amber-950 text-base font-serif">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>मांगलिक दोष परीक्षण (Mangal Dosha)</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {result.manglikStatus.matchCompatibility}
                  </p>
                  {result.manglikStatus.remedyHi && (
                    <div className="mt-3 p-3 rounded-xl bg-white border border-amber-200 text-xs text-amber-900">
                      <strong className="text-amber-950 font-semibold block mb-0.5">
                        अनुशंसित वैदिक उपाय:
                      </strong>
                      {result.manglikStatus.remedyHi}
                    </div>
                  )}
                </div>

                {/* Nadi Analysis */}
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2 font-bold text-amber-950 text-base font-serif">
                    <Info className="w-4 h-4 text-amber-700" />
                    <span>नाड़ी दोष एवं परिहार (Nadi Parihar)</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {result.nadiPariharText}
                  </p>
                  <div className="mt-3 p-3 rounded-xl bg-white border border-amber-200 text-xs text-stone-600">
                    <span className="font-semibold text-amber-950">12 वर्षों का अनुभव: </span>
                    नाड़ी दोष होने पर भी यदि नक्षत्र या चरण भिन्न हों, तो विवाह शास्त्र सम्मत एवं फलदायी होता है।
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
