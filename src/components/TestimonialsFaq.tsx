import React, { useState } from 'react';
import { Star, MessageSquare, HelpCircle, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA, FAQS_DATA } from '../data/astrologyData';

export const TestimonialsFaq: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="py-16 bg-[#FFFDF9] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Testimonials Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              <span>50,000+ संतुष्ट जातक • प्रामाणिक अनुभव</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
              जातकों के अनुभव एवं सफल विवाह कथाएं
            </h2>
            <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
              12 वर्षों से देश-विदेश के परिवारों ने हमारी वैदिक गणनाओं और उपायों से सुखी गृहस्थ जीवन का आशीर्वाद पाया है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-[#FFFBF5] border border-amber-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                    "{t.storyHi}"
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-100">
                  <div className="font-bold text-amber-950 text-sm font-serif">{t.name}</div>
                  <div className="text-[11px] text-stone-500">{t.city}</div>
                  <div className="text-[10px] text-amber-800 font-medium mt-1">
                    सेवा: {t.serviceUsed}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>जिज्ञासा समाधान</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
              विवाह एवं ज्योतिष: अक्सर पूछे जाने वाले प्रश्न (FAQ)
            </h2>
            <p className="text-stone-600 mt-2 text-xs sm:text-sm">
              अष्टकूट मिलान, मांगलिक विचार एवं वैदिक उपायों से जुड़े प्रमुख शास्त्रीय नियम
            </p>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-amber-200 bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-amber-950 font-serif flex items-center justify-between gap-4 hover:bg-amber-50/50 transition-colors"
                  >
                    <span>{faq.questionHi}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line border-t border-amber-100 bg-amber-50/30">
                      {faq.answerHi}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
