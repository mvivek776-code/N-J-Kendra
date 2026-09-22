import React, { useState } from 'react';
import {
  FileText,
  Compass,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Gem,
  Award,
  BookOpen,
} from 'lucide-react';
import { generateSyntheticKundali } from '../utils/vedicCalculator';
import { GeneratedKundali } from '../types';

interface JanamKundaliToolProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const JanamKundaliTool: React.FC<JanamKundaliToolProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('विकास शर्मा');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dob, setDob] = useState('1998-05-24');
  const [tob, setTob] = useState('14:30');
  const [pob, setPob] = useState('वाराणसी, उत्तर प्रदेश');

  const [kundali, setKundali] = useState<GeneratedKundali | null>(() =>
    generateSyntheticKundali('विकास शर्मा', '1998-05-24', '14:30', 'वाराणसी, उत्तर प्रदेश')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = generateSyntheticKundali(name, dob, tob, pob);
    setKundali(result);
  };

  return (
    <section id="kundali" className="py-16 bg-[#FFF9EE]/40 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>वैदिक जन्मपत्री • 12 भाव एवं ग्रह विश्लेषण</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            निःशुल्क वैदिक जन्म कुंडली एवं फलित
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
            अपने जन्म विवरण के अनुसार सटीक उत्तर भारतीय लग्न चक्र, नक्षत्र, महादशा और विवाह व करियर के प्रमुख फलित प्राप्त करें।
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm max-w-5xl mx-auto mb-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                जातक का नाम
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="उदा. अमित कुमार"
                className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                जन्म तिथि (DOB)
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                जन्म समय (TOB)
              </label>
              <input
                type="time"
                required
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                जन्म स्थान (POB)
              </label>
              <input
                type="text"
                required
                value={pob}
                onChange={(e) => setPob(e.target.value)}
                placeholder="शहर का नाम"
                className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>कुंडली बनाएं</span>
              </button>
            </div>
          </form>
        </div>

        {/* Generated Kundali Dashboard */}
        {kundali && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Quick Profile Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <div className="p-2.5">
                <span className="text-[11px] text-amber-900/70 block font-medium">लग्न (Ascendant)</span>
                <span className="text-base font-bold text-amber-950 font-serif">{kundali.lagnaRashi} लग्न</span>
              </div>
              <div className="p-2.5">
                <span className="text-[11px] text-amber-900/70 block font-medium">चंद्र राशि (Moon Sign)</span>
                <span className="text-base font-bold text-amber-950 font-serif">{kundali.chandraRashi} राशि</span>
              </div>
              <div className="p-2.5">
                <span className="text-[11px] text-amber-900/70 block font-medium">नक्षत्र एवं चरण</span>
                <span className="text-base font-bold text-amber-950 font-serif">{kundali.nakshatra} (चरण {kundali.charan})</span>
              </div>
              <div className="p-2.5">
                <span className="text-[11px] text-amber-900/70 block font-medium">वर्तमान महादशा</span>
                <span className="text-base font-bold text-amber-800 font-serif">{kundali.currentDasha}</span>
              </div>
            </div>

            {/* Traditional North Indian Kundali SVG Chart & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* North Indian Diamond Chart (12 Houses) */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div className="text-xs font-bold text-amber-950 mb-2 font-serif flex items-center gap-1.5">
                  <span>उत्तर भारतीय लग्न चक्र (Lagna Kundali)</span>
                </div>

                <div className="relative w-full max-w-[340px] aspect-square bg-[#FFFDF7] p-2 rounded-2xl border-2 border-amber-800 shadow-inner">
                  {/* Classical North Indian Diamond Diagram using SVG */}
                  <svg viewBox="0 0 400 400" className="w-full h-full stroke-amber-800 fill-none stroke-[2]">
                    {/* Outer Square */}
                    <rect x="10" y="10" width="380" height="380" />
                    {/* Main Diagonals */}
                    <line x1="10" y1="10" x2="390" y2="390" />
                    <line x1="390" y1="10" x2="10" y2="390" />
                    {/* Inner Diamond */}
                    <polygon points="200,10 390,200 200,390 10,200" />
                  </svg>

                  {/* House 1 (Lagna - Top Center Diamond) */}
                  <div className="absolute top-[22%] left-[40%] text-center text-xs font-bold text-amber-950">
                    <span className="block text-[10px] text-amber-700">१ लग्न</span>
                    <span className="text-[11px] text-stone-700">सूर्य, बुध</span>
                  </div>

                  {/* House 2 (Top Left Triangle) */}
                  <div className="absolute top-[10%] left-[22%] text-center text-[10px] font-semibold text-amber-950">
                    <span>२ धन</span>
                  </div>

                  {/* House 3 (Left Top Triangle) */}
                  <div className="absolute top-[24%] left-[8%] text-center text-[10px] font-semibold text-amber-950">
                    <span>३ सहज</span>
                  </div>

                  {/* House 4 (Center Left Diamond - Sukha Bhava) */}
                  <div className="absolute top-[44%] left-[20%] text-center text-xs font-bold text-amber-950">
                    <span className="block text-[10px] text-amber-700">४ सुख</span>
                    <span className="text-[11px] text-stone-700">शुक्र</span>
                  </div>

                  {/* House 5 (Bottom Left Triangle - Suta Bhava) */}
                  <div className="absolute bottom-[24%] left-[8%] text-center text-[10px] font-semibold text-amber-950">
                    <span className="block">५ विद्या</span>
                    <span className="text-[10px] text-stone-700">चंद्र</span>
                  </div>

                  {/* House 6 (Bottom Left Triangle) */}
                  <div className="absolute bottom-[10%] left-[22%] text-center text-[10px] font-semibold text-amber-950">
                    <span>६ रिपु</span>
                  </div>

                  {/* House 7 (Bottom Center Diamond - Vivah & Jaya Bhava) */}
                  <div className="absolute bottom-[20%] left-[40%] text-center text-xs font-bold text-amber-950">
                    <span className="block text-[10px] text-amber-700">७ विवाह</span>
                    <span className="text-[11px] text-emerald-800 font-extrabold">गुरु (शुभ)</span>
                  </div>

                  {/* House 8 (Bottom Right Triangle) */}
                  <div className="absolute bottom-[10%] right-[22%] text-center text-[10px] font-semibold text-amber-950">
                    <span>८ आयु</span>
                  </div>

                  {/* House 9 (Bottom Right Triangle - Bhagya Bhava) */}
                  <div className="absolute bottom-[24%] right-[8%] text-center text-[10px] font-semibold text-amber-950">
                    <span className="block">९ भाग्य</span>
                    <span className="text-[10px] text-stone-700">मंगल</span>
                  </div>

                  {/* House 10 (Center Right Diamond - Karma Bhava) */}
                  <div className="absolute top-[44%] right-[20%] text-center text-xs font-bold text-amber-950">
                    <span className="block text-[10px] text-amber-700">१० कर्म</span>
                    <span className="text-[11px] text-stone-700">शनि</span>
                  </div>

                  {/* House 11 (Top Right Triangle - Labha Bhava) */}
                  <div className="absolute top-[24%] right-[8%] text-center text-[10px] font-semibold text-amber-950">
                    <span className="block">११ लाभ</span>
                    <span className="text-[10px] text-stone-700">राहु</span>
                  </div>

                  {/* House 12 (Top Right Triangle - Vyaya Bhava) */}
                  <div className="absolute top-[10%] right-[22%] text-center text-[10px] font-semibold text-amber-950">
                    <span className="block">१२ व्यय</span>
                    <span className="text-[10px] text-stone-700">केतु</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 mt-3 text-center">
                  * वैदिक लग्न चक्र में 12 भावों की शास्त्रीय स्थिति (सप्तम भाव: विवाह स्थान)
                </div>
              </div>

              {/* Lucky Elements & Analysis */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <h4 className="font-bold text-amber-950 text-sm font-serif mb-3 flex items-center gap-1.5">
                    <Gem className="w-4 h-4 text-amber-700" />
                    <span>शुभ कारक तत्व (Lucky Elements)</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200/80">
                      <span className="text-stone-500 block text-[10px]">भाग्यशाली रत्न</span>
                      <strong className="text-amber-950 font-bold">{kundali.luckyStone}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200/80">
                      <span className="text-stone-500 block text-[10px]">शुभ रंग</span>
                      <strong className="text-amber-950 font-bold">{kundali.luckyColor}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200/80">
                      <span className="text-stone-500 block text-[10px]">शुभ अंक</span>
                      <strong className="text-amber-950 font-bold text-base">{kundali.luckyNumber}</strong>
                    </div>
                  </div>
                </div>

                {/* Predictions Cards */}
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs">
                    <div className="font-bold text-amber-950 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>विवाह एवं दांपत्य सुख (7th House - सप्तम भाव):</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {kundali.predictions.vivahDampatya}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs">
                    <div className="font-bold text-amber-950 mb-1 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-700" />
                      <span>आजीविका एवं करियर (10th House - दशम भाव):</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {kundali.predictions.career}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs">
                    <div className="font-bold text-amber-950 mb-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                      <span>भाग्य, धन एवं समृद्धि (9th & 2nd House):</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {kundali.predictions.bhagyaDhana}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={() => onOpenBooking('janam-kundali-detailed')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <span>विस्तृत 20 पृष्ठीय हस्तलिखित जन्मपत्री बनवाएं →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
