import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenBooking }) => {
  return (
    <footer className="bg-[#1C160C] text-stone-300 pt-14 pb-8 border-t-4 border-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-serif text-2xl font-bold">
                ॐ
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-200 font-serif">
                  निवारण ज्योतिष केंद्र
                </h3>
                <span className="text-[11px] text-amber-400 font-semibold block">
                  12+ वर्षों का प्रामाणिक अनुभव
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              काशी और हरिद्वार की पावन परंपरा के अनुसार शास्त्रोक्त विवाह एवं अष्टकूट 36 गुण मिलान, मांगलिक निवारण, जन्म कुंडली और वैदिक समाधान।
            </p>
            <div className="pt-2 text-xs text-amber-300/80 font-serif italic">
              ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-amber-100 font-serif mb-4 uppercase tracking-wider">
              शीघ्र लिंक (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  • मुख्य पृष्ठ (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('form')}
                  className="hover:text-amber-300 transition-colors text-amber-300/90 font-medium"
                >
                  • ऑनलाइन परामर्श फॉर्म (Google Forms)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('milan')}
                  className="hover:text-amber-300 transition-colors"
                >
                  • विवाह एवं 36 गुण मिलान (Kundali Milan)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('kundali')}
                  className="hover:text-amber-300 transition-colors"
                >
                  • निःशुल्क जन्मपत्री (Free Janam Kundali)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('rashifal')}
                  className="hover:text-amber-300 transition-colors"
                >
                  • आज का दैनिक राशिफल (Daily Rashifal)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-amber-300 transition-colors"
                >
                  • हमारी सेवाएं (Services - Vivah & more)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('astrologers')}
                  className="hover:text-amber-300 transition-colors"
                >
                  • हमारे वरिष्ठ ज्योतिषाचार्य (Astrologers)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('muhurat')}
                  className="hover:text-amber-300 transition-colors"
                >
                  • शुभ विवाह मुहूर्त 2025 (Shubh Muhurat)
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-sm font-bold text-amber-100 font-serif mb-4 uppercase tracking-wider">
              विवाह एवं अन्य सेवाएं
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>• अष्टकूट 36 गुण मिलान चक्र</li>
              <li>• मांगलिक एवं नाड़ी दोष परिहार</li>
              <li>• विवाह बाधा निवारण महाअनुष्ठान</li>
              <li>• हस्तलिखित 20 पृष्ठीय जन्मपत्री</li>
              <li>• नवग्रह शांति एवं रुद्राभिषेक</li>
              <li>• लैब-प्रमाणित रत्न व सिद्ध रुद्राक्ष</li>
              <li>• आवासीय व व्यावसायिक वास्तु परामर्श</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-amber-100 font-serif mb-4 uppercase tracking-wider">
              संपर्क एवं संस्थान केंद्र
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>मुख्य पीठ:</strong> अस्सी घाट मार्ग, काशी (वाराणसी), उ.प्र.
                  <br />
                  <strong>शाखा:</strong> हरिद्वार एवं करोल बाग, नई दिल्ली
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+918887578844" className="hover:text-amber-200">
                  हेल्पलाइन: +91 8887578844 (24x7)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@nivaranjyotishkendra.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>परामर्श समय: प्रातः 08:00 से रात्रि 10:00 बजे तक</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>12+ वर्षों का प्रामाणिक अनुभव • 100% गोपनीय व शास्त्रोक्त वैदिक परामर्श</span>
          </div>
          <div>
            © {new Date().getFullYear()} निवारण ज्योतिष केंद्र. सर्वाधिकार सुरक्षित।
          </div>
        </div>
      </div>
    </footer>
  );
};
