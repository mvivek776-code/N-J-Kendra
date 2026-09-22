import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  User,
  HeartHandshake,
  Briefcase,
  Baby,
  Coins,
  HelpCircle,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { ASTROLOGERS_DATA, ASTROLOGY_SERVICES } from '../data/astrologyData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedAstrologerName?: string;
}

// Exactly the 5 subjects requested by the user
export type ConsultationSubject =
  | 'vivah'
  | 'naukri/karrer/vyapar'
  | 'santan'
  | 'dhan/property/makan'
  | 'anya';

interface SubjectOption {
  id: ConsultationSubject;
  labelHi: string;
  subHi: string;
  icon: React.ElementType;
}

const CONSULTATION_SUBJECTS: SubjectOption[] = [
  {
    id: 'vivah',
    labelHi: 'विवाह (Vivah)',
    subHi: 'कुंडली मिलान, विवाह में देरी, मांगलिक व नाड़ी दोष निवारण',
    icon: HeartHandshake,
  },
  {
    id: 'naukri/karrer/vyapar',
    labelHi: 'नौकरी / करियर / व्यापार (Naukri / Career / Vyapar)',
    subHi: 'सरकारी नौकरी योग, पदोन्नति, व्यापार वृद्धि व घाटा निवारण',
    icon: Briefcase,
  },
  {
    id: 'santan',
    labelHi: 'संतान (Santan)',
    subHi: 'संतान सुख, संतान प्राप्ति बाधा एवं उचित वैदिक उपाय',
    icon: Baby,
  },
  {
    id: 'dhan/property/makan',
    labelHi: 'धन / प्रॉपर्टी / मकान (Dhan / Property / Makan)',
    subHi: 'पैतृक संपत्ति, नया मकान योग, कर्ज मुक्ति व आर्थिक समृद्धि',
    icon: Coins,
  },
  {
    id: 'anya',
    labelHi: 'अन्य (Anya)',
    subHi: 'स्वास्थ्य, पारिवारिक शांति, नवग्रह शांति एवं अन्य प्रश्न',
    icon: HelpCircle,
  },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const guruji = ASTROLOGERS_DATA[0];

  // Selected Service Plan (₹251, ₹501, ₹501, ₹1001)
  const [selectedServiceId, setSelectedServiceId] = useState<string>(() => {
    return preselectedServiceId || 'two-subjects-251';
  });

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('');

  // Selected Subjects (Multiple selection for the 2-subject plan)
  const [selectedSubjects, setSelectedSubjects] = useState<ConsultationSubject[]>(['vivah']);

  // Additional Information regarding the Subject
  const [additionalTopicInfo, setAdditionalTopicInfo] = useState('');

  // Client's Full Question
  const [fullQuestion, setFullQuestion] = useState('');

  // Time Slot
  const [timeSlot, setTimeSlot] = useState<string>('morning');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingToken, setBookingToken] = useState('');
  const [redirectWhatsappUrl, setRedirectWhatsappUrl] = useState('');

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  const currentService =
    ASTROLOGY_SERVICES.find((s) => s.id === selectedServiceId) || ASTROLOGY_SERVICES[0];
  const isTwoSubjectPlan = selectedServiceId === 'two-subjects-251';

  const toggleSubject = (subId: ConsultationSubject) => {
    if (isTwoSubjectPlan) {
      if (selectedSubjects.includes(subId)) {
        if (selectedSubjects.length > 1) {
          setSelectedSubjects(selectedSubjects.filter((id) => id !== subId));
        }
      } else {
        if (selectedSubjects.length < 2) {
          setSelectedSubjects([...selectedSubjects, subId]);
        } else {
          // Replace second subject
          setSelectedSubjects([selectedSubjects[0], subId]);
        }
      }
    } else {
      if (selectedSubjects.includes(subId)) {
        if (selectedSubjects.length > 1) {
          setSelectedSubjects(selectedSubjects.filter((id) => id !== subId));
        }
      } else {
        setSelectedSubjects([...selectedSubjects, subId]);
      }
    }
  };

  const getSubjectLabelsText = () => {
    return selectedSubjects
      .map((id) => CONSULTATION_SUBJECTS.find((s) => s.id === id)?.labelHi || id)
      .join(', ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = 'NIVARAN-' + Math.floor(100000 + Math.random() * 900000);
    setBookingToken(token);

    const subjectsText = getSubjectLabelsText();

    // Construct full WhatsApp message
    const whatsappMessage = `॥ श्री गणेशाय नमः ॥
प्रणाम पूज्य गुरुजी (ज्योतिषाचार्य विवेक कुमार मिश्रा जी),
मैंने निवारण ज्योतिष केंद्र की वेबसाइट से परामर्श हेतु आवेदन प्रेषित किया है।

📋 संदर्भ टोकन: ${token}
👤 नाम: ${fullName}
📞 संपर्क नंबर: ${phoneNumber}
🎂 जन्म तिथि: ${dob || 'ज्ञात नहीं'}
⏰ जन्म समय: ${tob || 'ज्ञात नहीं'}
📍 जन्म स्थान: ${pob || 'ज्ञात नहीं'}
🏷️ चयनित सेवा: ${currentService.titleHi} (${currentService.feeText})
🔮 परामर्श विषय: ${subjectsText}
📝 विषय की अतिरिक्त जानकारी: ${additionalTopicInfo || 'सामान्य'}
❓ पूरा प्रश्न: ${fullQuestion}
📞 परामर्श का माध्यम: केवल फोन कॉल (Call Only)
⏰ पसंदीदा समय: ${
      timeSlot === 'morning'
        ? 'प्रातः 09:00 से 12:00'
        : timeSlot === 'afternoon'
        ? 'दोपहर 01:00 से 04:00'
        : timeSlot === 'evening'
        ? 'सायं 05:00 से 08:00'
        : 'रात्रि 08:00 से 10:00'
    }

कृपया कुंडली विश्लेषण कर परामर्श का समय प्रदान करने की कृपा करें।`;

    const waUrl = `https://wa.me/918887578844?text=${encodeURIComponent(whatsappMessage)}`;
    setRedirectWhatsappUrl(waUrl);

    try {
      // 1. Submit to Google Forms via backend endpoint
      await fetch('/api/submit-google-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          phone: phoneNumber,
          dob,
          tob,
          pob,
          serviceId: currentService.id,
          serviceName: currentService.titleHi,
          servicePrice: currentService.price || 501,
          subjects: selectedSubjects.map(
            (id) => CONSULTATION_SUBJECTS.find((s) => s.id === id)?.labelHi || id
          ),
          additionalInfo: additionalTopicInfo,
          fullQuestion,
          consultMode: 'कॉल परामर्श (Phone Call Only)',
          googleFormUrl: localStorage.getItem('nivaran_google_form_url') || '',
        }),
      });
    } catch (err) {
      console.warn('Backend logging note:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // 2. Automatically direct the user to WhatsApp of the account (+91 8887578844)
      try {
        window.open(waUrl, '_blank');
      } catch (e) {
        console.warn('Window open caught:', e);
      }
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-amber-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-3xl border-2 border-amber-300 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-amber-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header featuring Guruji Jyotishacharya Vivek Kumar Mishra */}
            <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-amber-200/70">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xs shrink-0 bg-amber-100">
                <img
                  src={guruji.image}
                  alt={guruji.nameHi}
                  onError={(e) => {
                    e.currentTarget.src = '/astrologer_vivek.jpg';
                  }}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                  <span>निवारण ज्योतिष केंद्र</span>
                  <span>•</span>
                  <span className="text-amber-700">12+ वर्ष अनुभव</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-amber-950 font-serif">
                  {guruji.nameHi} से परामर्श बुक करें
                </h3>
                <p className="text-xs text-stone-600">
                  संस्थापक एवं मुख्य ज्योतिषाचार्य • केवल फोन कॉल परामर्श उपलब्ध
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Plan Selection (The 4 exact requested services) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950">
                    परामर्श सेवा एवं दक्षिणा चुनें *
                  </label>
                  <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    केवल फोन कॉल (Call Only)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ASTROLOGY_SERVICES.map((srv) => {
                    const isSelected = selectedServiceId === srv.id;
                    const isCheapest = srv.id === 'two-subjects-251';

                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => {
                          setSelectedServiceId(srv.id);
                          if (srv.id === 'two-subjects-251' && selectedSubjects.length > 2) {
                            setSelectedSubjects(selectedSubjects.slice(0, 2));
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-600 text-amber-950 shadow-xs ring-2 ring-amber-500/30'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-amber-50/50'
                        }`}
                      >
                        {isCheapest && (
                          <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                            किफायती
                          </span>
                        )}
                        <div className="text-xs font-bold leading-tight truncate">
                          {srv.titleHi.split('(')[0]}
                        </div>
                        <div className="text-sm font-extrabold text-amber-900 mt-1">
                          {srv.feeText}
                        </div>
                        <div className="text-[10px] text-stone-500 mt-0.5">
                          {isCheapest ? '2 विषय कॉल' : 'कॉल परामर्श'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1: Personal Details */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 pb-1 border-b border-amber-100">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <span>1. जातक का व्यक्तिगत विवरण (Personal Details)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      आपका पूरा नाम *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="उदा. अमित कुमार शर्मा"
                      className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      व्हाट्सएप मोबाइल नंबर *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 88875 78844"
                      className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म तिथि (DOB)
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म समय (Time)
                    </label>
                    <input
                      type="time"
                      value={tob}
                      onChange={(e) => setTob(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म स्थान / शहर
                    </label>
                    <input
                      type="text"
                      value={pob}
                      onChange={(e) => setPob(e.target.value)}
                      placeholder="उदा. लखनऊ / वाराणसी"
                      className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: EXACT 5 SUBJECTS ONLY */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      2. परामर्श का विषय चुनें{' '}
                      {isTwoSubjectPlan ? '(अधिकतम 2 विषय)' : '(Select Subject)'} *
                    </span>
                  </h4>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isTwoSubjectPlan
                        ? selectedSubjects.length === 2
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {isTwoSubjectPlan
                      ? `चयनित: ${selectedSubjects.length}/2 विषय`
                      : '5 मुख्य विषय'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONSULTATION_SUBJECTS.map((sub) => {
                    const IconComponent = sub.icon;
                    const isSelected = selectedSubjects.includes(sub.id);
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => toggleSubject(sub.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-600 text-amber-950 font-semibold shadow-xs ring-2 ring-amber-500/20'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-amber-50/60'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-amber-700 text-white'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{sub.labelHi}</span>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                            )}
                          </div>
                          <div className="text-[10px] text-stone-500 leading-snug mt-0.5">
                            {sub.subHi}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: ADDITIONAL TOPIC INFORMATION FIELD */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  3. विषय से संबंधित अतिरिक्त जानकारी (Additional Subject Details)
                </label>
                <input
                  type="text"
                  value={additionalTopicInfo}
                  onChange={(e) => setAdditionalTopicInfo(e.target.value)}
                  placeholder="उदा. विवाह में 3 वर्ष से बाधा आ रही है / सरकारी नौकरी में इंटरव्यू दिया / व्यापार में घाटा"
                  className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none placeholder:text-stone-400"
                />
              </div>

              {/* Step 4: FULL QUESTION / DETAILED QUERY */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  4. अपना पूरा प्रश्न विस्तार से लिखें (Write Your Full Question) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={fullQuestion}
                  onChange={(e) => setFullQuestion(e.target.value)}
                  placeholder="पूज्य गुरुजी ज्योतिषाचार्य विवेक कुमार मिश्रा जी से आप जो भी प्रश्न पूछना चाहते हैं, उसे यहाँ विस्तार से लिखें..."
                  className="w-full p-2.5 text-sm bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none resize-none placeholder:text-stone-400"
                />
              </div>

              {/* Step 5: Consultation Mode & Slot (ONLY CALL OPTION) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    परामर्श का माध्यम
                  </label>
                  <div className="flex items-center gap-2 py-2 px-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-bold text-xs">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>केवल फोन कॉल परामर्श (Only Call Option)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    पसंदीदा समय स्लॉट
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:border-amber-600 outline-none"
                  >
                    <option value="morning">प्रातः 09:00 से 12:00 बजे तक</option>
                    <option value="afternoon">दोपहर 01:00 से 04:00 बजे तक</option>
                    <option value="evening">सायं 05:00 से 08:00 बजे तक</option>
                    <option value="night">रात्रि 08:00 से 10:00 बजे तक</option>
                  </select>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  फॉर्म सबमिट करने पर विवरण सीधे Google Forms में दर्ज होगा और आप तुरंत WhatsApp पर रिडायरेक्ट होंगे।
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-700 via-emerald-800 to-amber-900 hover:from-amber-800 hover:to-emerald-900 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ring-2 ring-amber-400/40 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {isSubmitting
                      ? 'Google Forms में दर्ज हो रहा है...'
                      : `फॉर्म सबमिट करें व WhatsApp पर जुड़ें (${currentService.feeText})`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State with Automatic WhatsApp Direct */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                ✓ Google Forms में सफलतापूर्वक दर्ज
              </span>
              <h3 className="text-2xl font-black text-amber-950 font-serif">
                कल्याणमस्तु! आपका आवेदन स्वीकार कर लिया गया है
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                आपके भरे गए विवरण के साथ आपको सीधे पूज्य गुरुजी के WhatsApp (+91 88875 78844) पर भेजा जा रहा है।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-1.5 text-xs max-w-md mx-auto">
              <div className="flex justify-between pb-1.5 border-b border-amber-200">
                <span className="text-stone-500">बुकिंग टोकन संख्या:</span>
                <strong className="text-amber-950 font-mono text-sm">{bookingToken}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">जातक का नाम:</span>
                <strong className="text-amber-950">{fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">चयनित सेवा:</span>
                <strong className="text-amber-950">{currentService.titleHi} ({currentService.feeText})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">परामर्श विषय:</span>
                <strong className="text-amber-950">{getSubjectLabelsText()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">माध्यम:</span>
                <strong className="text-emerald-800 font-bold">केवल फोन कॉल (Call Only)</strong>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={redirectWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ring-2 ring-emerald-400/30"
              >
                <MessageCircle className="w-5 h-5" />
                <span>सीधे WhatsApp पर विवरण भेजें (+91 88875 78844)</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
              >
                खिड़की बंद करें (Close)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
