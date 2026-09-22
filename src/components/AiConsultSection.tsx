import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { RASHIS_LIST } from '../utils/vedicCalculator';

export const AiConsultSection: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [topic, setTopic] = useState<'vivah' | 'career' | 'kundali'>('vivah');
  const [rashi, setRashi] = useState('मेष');
  const [loading, setLoading] = useState(false);
  const [consultationResult, setConsultationResult] = useState<string | null>(null);
  const [astrologerName, setAstrologerName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sampleQuestions = [
    'मेरी शादी कब तक संपन्न होगी और जीवनसाथी का स्वभाव कैसा रहेगा?',
    'क्या मेरी कुंडली में मांगलिक दोष है और इसका क्या शास्त्रीय उपाय है?',
    'विवाह में बार-बार बाधाएं क्यों आ रही हैं और कौन सा व्रत या मंत्र फलदायी होगा?',
    'करियर में स्थिरता और मनचाही नौकरी कब तक मिलने के योग हैं?',
  ];

  const handleAsk = async (presetQ?: string) => {
    const qToSend = presetQ || question;
    if (!qToSend.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setConsultationResult(null);

    try {
      const response = await fetch('/api/astrology-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: qToSend,
          topic,
          name: name.trim() || 'जातक',
          rashi,
        }),
      });

      const data = await response.json();
      if (response.ok && data.consultation) {
        setConsultationResult(data.consultation);
        setAstrologerName(data.astrologer || 'ज्योतिषाचार्य विवेक कुमार मिश्रा (12+ वर्ष अनुभव)');
      } else {
        setErrorMsg(data.error || 'परामर्श प्राप्त करने में असुविधा हुई, कृपया पुनः प्रयास करें।');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('सर्वर से संपर्क नहीं हो पाया, कृपया कुछ समय पश्चात पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consult" className="py-16 bg-[#FFF9EE]/40 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>त्वरित वैदिक परामर्श • 12+ वर्षों का प्रामाणिक ज्ञान</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            आचार्य जी से पूछें (त्वरित वैदिक मार्गदर्शन)
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
            विवाह, मांगलिक दोष, सप्तम भाव, करियर अथवा जीवन के किसी भी असमंजस पर हमारे 12+ वर्षों के अनुभवी वैदिक ज्योतिषाचार्य से शास्त्रीय मार्गदर्शन प्राप्त करें।
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md">
          {/* Preset question pills */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-stone-500 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>सामान्यतः पूछे जाने वाले प्रश्न (क्लिक करके तुरंत उत्तर पाएं):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuestion(q);
                    handleAsk(q);
                  }}
                  className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  आपका नाम (वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल या अंजलि"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  आपकी राशि
                </label>
                <select
                  value={rashi}
                  onChange={(e) => setRashi(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none"
                >
                  {RASHIS_LIST.map((r) => (
                    <option key={r} value={r}>
                      {r} राशि
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  परामर्श विषय
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as 'vivah' | 'career' | 'kundali')}
                  className="w-full px-3 py-2 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none"
                >
                  <option value="vivah">💍 विवाह एवं संबंध (Vivah)</option>
                  <option value="career">💼 करियर एवं व्यवसाय (Career)</option>
                  <option value="kundali">📜 जन्म कुंडली एवं दोष (Kundali)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                अपना प्रश्न विस्तार से लिखें:
              </label>
              <textarea
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="उदा. मेरी कुंडली में विवाह योग कब बन रहा है? क्या मुझे कोई विशेष पूजा या व्रत करना चाहिए?"
                className="w-full p-3 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:border-amber-600 outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-stone-500">
                * पराशर ज्योतिष प्रणाली एवं 12+ वर्ष के अनुभव पर आधारित सात्विक उत्तर
              </div>
              <button
                type="button"
                disabled={loading || !question.trim()}
                onClick={() => handleAsk()}
                className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                    <span>वैदिक गणना जारी...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>परामर्श प्राप्त करें</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          {/* Consultation Result Display */}
          {consultationResult && (
            <div className="mt-8 pt-6 border-t border-amber-200 animate-in fade-in duration-300">
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200/80">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-serif font-bold text-sm">
                      ॐ
                    </div>
                    <div>
                      <div className="font-bold text-amber-950 text-sm font-serif">
                        {astrologerName}
                      </div>
                      <div className="text-[10px] text-amber-800/80">
                        निवारण ज्योतिष केंद्र (12+ वर्ष अनुभव)
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-950">
                    प्रमाणित उत्तर
                  </span>
                </div>

                <div className="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-['Outfit','Noto_Serif_Devanagari',sans-serif]">
                  {consultationResult}
                </div>

                <div className="pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <span className="text-stone-500">
                    विस्तृत व्यक्तिगत जन्मपत्री व कुंडली मिलान हेतु हमारे आचार्य जी से संपर्क करें।
                  </span>
                  <a
                    href="tel:+918887578844"
                    className="font-bold text-amber-900 hover:underline shrink-0"
                  >
                    📞 हेल्पलाइन: +91 8887578844
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
