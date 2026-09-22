import React, { useState } from 'react';
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  User,
  Settings,
  HeartHandshake,
  Briefcase,
  Baby,
  Coins,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { ASTROLOGY_SERVICES } from '../data/astrologyData';

interface GoogleFormSectionProps {
  onOpenBooking?: (serviceId?: string) => void;
}

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

export const GoogleFormSection: React.FC<GoogleFormSectionProps> = () => {
  // Configurable Google Form URL
  const defaultGoogleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSd8tK9yVq4jW_example_nivaran/viewform';

  const [googleFormUrl, setGoogleFormUrl] = useState<string>(() => {
    return localStorage.getItem('nivaran_google_form_url') || defaultGoogleFormUrl;
  });
  const [showConfig, setShowConfig] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState(googleFormUrl);

  // Selected Service
  const [selectedServiceId, setSelectedServiceId] = useState<string>('two-subjects-251');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState<'पुरुष' | 'महिला' | 'अन्य'>('पुरुष');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('');

  // Selected Subjects (up to 2 for the ₹251 plan)
  const [selectedSubjects, setSelectedSubjects] = useState<ConsultationSubject[]>(['vivah']);

  // Additional Subject Details
  const [additionalTopicInfo, setAdditionalTopicInfo] = useState('');

  // Full Client Question
  const [fullQuestion, setFullQuestion] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionSummary, setSubmissionSummary] = useState<{
    token: string;
    whatsappUrl: string;
    details: string;
  } | null>(null);

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

  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customUrlInput.trim();
    if (trimmed) {
      setGoogleFormUrl(trimmed);
      localStorage.setItem('nivaran_google_form_url', trimmed);
      setShowConfig(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = 'NIVARAN-' + Math.floor(100000 + Math.random() * 900000);
    const subjectsText = getSubjectLabelsText();

    // Construct full WhatsApp message containing all details filled in the form
    const whatsappText = `॥ श्री गणेशाय नमः ॥
प्रणाम पूज्य गुरुजी (ज्योतिषाचार्य विवेक कुमार मिश्रा जी),
मैंने निवारण ज्योतिष केंद्र की वेबसाइट से Google Forms द्वारा परामर्श आवेदन प्रेषित किया है।

📋 संदर्भ टोकन: ${token}
👤 नाम: ${fullName} (${gender})
📞 मोबाइल नंबर: ${mobileNumber}
🎂 जन्म तिथि: ${dob || 'ज्ञात नहीं'}
⏰ जन्म समय: ${tob || 'ज्ञात नहीं'}
📍 जन्म स्थान: ${pob || 'ज्ञात नहीं'}
🏷️ चयनित सेवा: ${currentService.titleHi} (${currentService.feeText})
🔮 परामर्श विषय: ${subjectsText}
📝 विषय की अतिरिक्त जानकारी: ${additionalTopicInfo || 'सामान्य'}
❓ मेरा पूरा प्रश्न: ${fullQuestion}
📞 परामर्श माध्यम: केवल फोन कॉल (Call Only)

कृपया कुंडली विश्लेषण कर फोन कॉल परामर्श का समय प्रदान करने की कृपा करें।`;

    const waUrl = `https://wa.me/918887578844?text=${encodeURIComponent(whatsappText)}`;

    // Submit to Google Forms via backend proxy endpoint
    try {
      await fetch('/api/submit-google-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          phone: mobileNumber,
          gender,
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
          googleFormUrl,
        }),
      });
    } catch (err) {
      console.warn('Google Forms submission note:', err);
    } finally {
      setIsSubmitting(false);
      setSubmissionSummary({
        token,
        whatsappUrl: waUrl,
        details: whatsappText,
      });
      setSubmitted(true);

      // Automatically redirect user to WhatsApp with the exact details
      try {
        window.open(waUrl, '_blank');
      } catch (err) {
        console.warn('Window open restricted:', err);
      }
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setSubmissionSummary(null);
  };

  return (
    <section id="form" className="py-16 bg-[#FFF8EE]/60 border-b border-amber-200/60 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Google Forms इंटीग्रेशन • केवल फोन कॉल परामर्श</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Noto_Serif_Devanagari',serif]">
            ऑनलाइन परामर्श फॉर्म (Google Forms)
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base leading-relaxed">
            फॉर्म सबमिट करते ही आपकी जानकारी Google Forms में स्वतः दर्ज होगी और आप तुरंत गुरुजी के WhatsApp पर प्रेषित हो जाएंगे।
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-800 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Google Form URL कॉन्फ़िगरेशन {showConfig ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>

        {/* Configuration Drawer for Custom Google Form URL */}
        {showConfig && (
          <form
            onSubmit={handleSaveCustomUrl}
            className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-3 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950">
                अपना लाइव Google Form URL यहाँ सेट करें:
              </span>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>
            <input
              type="url"
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              placeholder="https://docs.google.com/forms/d/e/.../viewform"
              className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs outline-none focus:border-amber-600"
            />
            <div className="flex justify-between items-center pt-1">
              <span className="text-[11px] text-stone-500">
                फॉर्म सबमिट होते ही डेटा इस Google Form में दर्ज होगा।
              </span>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-800 text-white rounded-lg font-semibold hover:bg-amber-900"
              >
                URL सहेजें
              </button>
            </div>
          </form>
        )}

        {/* Form Body or Success State */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden">
          {!submitted ? (
            <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Service Plan Selection (The 4 exact requested services) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950">
                    1. सेवा एवं दक्षिणा प्लान चुनें *
                  </label>
                  <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    केवल फोन कॉल उपलब्ध
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
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
                        className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-600 text-amber-950 shadow-xs ring-2 ring-amber-500/30'
                            : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-amber-50/50'
                        }`}
                      >
                        {isCheapest && (
                          <span className="absolute -top-2.5 right-2 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                            ★ सबसे किफायती
                          </span>
                        )}
                        <div>
                          <div className="text-xs font-bold leading-tight">
                            {srv.titleHi.split('(')[0]}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {isCheapest ? '2 विषय कॉल' : 'संपूर्ण विश्लेषण'}
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-amber-200/50 flex items-center justify-between">
                          <span className="text-sm font-black text-amber-900">
                            {srv.feeText}
                          </span>
                          <span className="text-[10px] text-stone-500">
                            {srv.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 pb-1 border-b border-amber-100">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <span>2. जातक का व्यक्तिगत विवरण (Personal Information)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      पूरा नाम *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="उदा. राहुल शर्मा"
                      className="w-full px-3.5 py-2.5 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      लिंग *
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3 py-2.5 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none"
                    >
                      <option value="पुरुष">पुरुष (Male)</option>
                      <option value="महिला">महिला (Female)</option>
                      <option value="अन्य">अन्य (Other)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    व्हाट्सएप मोबाइल नंबर *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="+91 88875 78844"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    इस नंबर पर फॉर्म सबमिट होते ही गुरुजी के व्हाट्सएप की सीधी लिंक खुलेगी।
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म तिथि (DOB)
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none"
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
                      className="w-full px-3 py-2 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      जन्म स्थान (Place)
                    </label>
                    <input
                      type="text"
                      value={pob}
                      onChange={(e) => setPob(e.target.value)}
                      placeholder="उदा. लखनऊ / वाराणसी"
                      className="w-full px-3 py-2 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Consultation Subjects (Exact 5 Subjects, with up to 2 for ₹251 plan) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      3. परामर्श का विषय चुनें{' '}
                      {isTwoSubjectPlan ? '(किन्हीं 2 विषय का चयन करें)' : '(Select Subject)'} *
                    </span>
                  </h3>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CONSULTATION_SUBJECTS.map((sub) => {
                    const IconComponent = sub.icon;
                    const isSelected = selectedSubjects.includes(sub.id);

                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => toggleSubject(sub.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-600 text-amber-950 font-semibold shadow-xs ring-2 ring-amber-500/20'
                            : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-amber-50/60'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
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
                          <div className="text-[11px] text-stone-500 leading-snug mt-0.5">
                            {sub.subHi}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Subject Information */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  4. विषय की थोड़ी सी अतिरिक्त जानकारी (Additional Subject Details)
                </label>
                <input
                  type="text"
                  value={additionalTopicInfo}
                  onChange={(e) => setAdditionalTopicInfo(e.target.value)}
                  placeholder="उदा. विवाह में पिछले 2 वर्षों से रिश्ते टूट रहे हैं / सरकारी नौकरी में 2 बार चयन रुका / कर्ज मुक्ति"
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none placeholder:text-stone-400"
                />
              </div>

              {/* Full Question Field */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  5. क्लाइंट का पूरा प्रश्न (Write Your Full Question) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={fullQuestion}
                  onChange={(e) => setFullQuestion(e.target.value)}
                  placeholder="पूज्य गुरुजी ज्योतिषाचार्य विवेक कुमार मिश्रा जी से आप जो भी प्रश्न पूछना चाहते हैं, उसे यहाँ विस्तार से लिखें..."
                  className="w-full p-3 text-sm bg-stone-50/60 rounded-xl border border-stone-300 focus:border-amber-600 focus:bg-white outline-none resize-none placeholder:text-stone-400"
                />
              </div>

              {/* Consultation Mode (ONLY CALL OPTION) */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  6. परामर्श का माध्यम
                </label>
                <div className="flex items-center gap-2.5 py-3 px-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 font-bold text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>केवल फोन कॉल परामर्श (Only Call Option Available)</span>
                  <span className="ml-auto text-[11px] font-semibold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
                    सीधा कॉल
                  </span>
                </div>
              </div>

              {/* Notice & Submit Button */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    फॉर्म सबमिट करते ही यह Google Forms में दर्ज होगा और आप तुरंत WhatsApp पर प्रेषित होंगे।
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 via-amber-800 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2 ring-4 ring-emerald-400/20 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>
                    {isSubmitting
                      ? 'Google Forms में दर्ज हो रहा है...'
                      : `फॉर्म सबमिट करें व WhatsApp पर जुड़ें (${currentService.feeText})`}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* Success & Auto Redirect State */
            <div className="p-8 sm:p-10 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  ✓ Google Forms में सफलतापूर्वक दर्ज
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif">
                  कल्याणमस्तु! आपका आवेदन स्वीकार कर लिया गया है
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto">
                  आपकी जानकारी सुरक्षित रूप से Google Forms में दर्ज हो चुकी है। आपको सीधे पूज्य गुरुजी के WhatsApp (+91 88875 78844) पर प्रेषित किया जा रहा है।
                </p>
              </div>

              {submissionSummary && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2 text-xs max-w-md mx-auto">
                  <div className="flex justify-between pb-2 border-b border-amber-200">
                    <span className="text-stone-500">बुकिंग संदर्भ टोकन:</span>
                    <strong className="text-amber-950 font-mono text-sm">
                      {submissionSummary.token}
                    </strong>
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
              )}

              {/* Direct WhatsApp Call-to-Action */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <a
                  href={submissionSummary?.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2 ring-4 ring-emerald-400/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp पर विवरण भेजें (+91 88875 78844)</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
                >
                  नया आवेदन भरें (Submit Another Response)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
