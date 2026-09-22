import { MilanResult, AshtakootScore, GeneratedKundali } from '../types';

export const RASHIS_LIST = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'
];

export const NAKSHATRAS_LIST = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
  'पुनर्वसु', 'पुष्य', 'अश्लेषा', 'मघा', 'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी',
  'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
  'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
  'पूर्वाभाद्रपद', 'उत्तराभाद्रपद', 'रेवती'
];

// Helper to determine Gana from Nakshatra index (0 to 26)
function getNakshatraGana(nakshatraIdx: number): 'देव' | 'मनुष्य' | 'राक्षस' {
  const deva = [0, 4, 6, 7, 12, 14, 16, 21, 26]; // Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati
  const manushya = [1, 2, 3, 10, 11, 19, 20, 24, 25]; // Bharani, Krittika, Rohini, Purva Phalguni, Uttara Phalguni, Purva Ashadha, Uttara Ashadha, Purva Bhadra, Uttara Bhadra
  if (deva.includes(nakshatraIdx)) return 'देव';
  if (manushya.includes(nakshatraIdx)) return 'मनुष्य';
  return 'राक्षस';
}

// Helper to determine Nadi from Nakshatra index
function getNakshatraNadi(nakshatraIdx: number): 'आदि' | 'मध्य' | 'अंत्य' {
  const remainder = nakshatraIdx % 6;
  if (remainder === 0 || remainder === 5) return 'आदि';
  if (remainder === 1 || remainder === 4) return 'मध्य';
  return 'अंत्य';
}

// Helper to determine Varna from Rashi index (0 to 11)
function getRashiVarna(rashiIdx: number): number {
  // 3, 7, 11 (Cancer, Scorpio, Pisces) = Brahmin (4)
  // 0, 4, 8 (Aries, Leo, Sag) = Kshatriya (3)
  // 1, 5, 9 (Taurus, Virgo, Cap) = Vaishya (2)
  // 2, 6, 10 (Gemini, Libra, Aqu) = Shudra (1)
  if ([3, 7, 11].includes(rashiIdx)) return 4;
  if ([0, 4, 8].includes(rashiIdx)) return 3;
  if ([1, 5, 9].includes(rashiIdx)) return 2;
  return 1;
}

export function calculateAshtakootMilan(
  boyName: string,
  boyRashiIdx: number,
  boyNakshatraIdx: number,
  boyIsManglik: boolean,
  girlName: string,
  girlRashiIdx: number,
  girlNakshatraIdx: number,
  girlIsManglik: boolean
): MilanResult {
  const kootScores: AshtakootScore[] = [];

  // 1. Varna (1 Point)
  const boyVarna = getRashiVarna(boyRashiIdx);
  const girlVarna = getRashiVarna(girlRashiIdx);
  let varnaScore = 1;
  let varnaStatus: AshtakootScore['status'] = 'उत्तम';
  if (boyVarna >= girlVarna) {
    varnaScore = 1;
  } else {
    varnaScore = 0;
    varnaStatus = 'सामान्य';
  }
  kootScores.push({
    name: 'Varna',
    nameHi: 'वर्ण कूट',
    maxPoints: 1,
    obtainedPoints: varnaScore,
    descriptionHi: varnaScore === 1 ? 'कार्य प्रवृत्ति एवं आध्यात्मिक सामंजस्य उत्तम' : 'मानसिक स्तर में भिन्नता, समझदारी आवश्यक',
    status: varnaStatus,
  });

  // 2. Vashya (2 Points)
  // Simple classical model based on Rashi affinity
  const rashiDiff = Math.abs(boyRashiIdx - girlRashiIdx);
  let vashyaScore = 1;
  if (boyRashiIdx === girlRashiIdx || [4, 8].includes(rashiDiff)) {
    vashyaScore = 2;
  } else if ([1, 5, 7].includes(rashiDiff)) {
    vashyaScore = 1.5;
  } else if ([2, 6].includes(rashiDiff)) {
    vashyaScore = 1;
  } else {
    vashyaScore = 0.5;
  }
  kootScores.push({
    name: 'Vashya',
    nameHi: 'वश्य कूट',
    maxPoints: 2,
    obtainedPoints: vashyaScore,
    descriptionHi: vashyaScore >= 1.5 ? 'आपसी आकर्षण एवं आदर भाव प्रबल' : 'पारस्परिक सामंजस्य हेतु संवाद आवश्यक',
    status: vashyaScore >= 1.5 ? 'उत्तम' : 'मध्यम',
  });

  // 3. Tara (3 Points)
  // Distance from boy's nakshatra to girl's nakshatra
  const count1 = ((girlNakshatraIdx - boyNakshatraIdx + 27) % 27) % 9;
  const count2 = ((boyNakshatraIdx - girlNakshatraIdx + 27) % 27) % 9;
  const badTaras = [2, 4, 6]; // Vipat, Pratyari, Vadha
  let taraScore = 3;
  const c1Bad = badTaras.includes(count1);
  const c2Bad = badTaras.includes(count2);
  if (!c1Bad && !c2Bad) {
    taraScore = 3;
  } else if (!c1Bad || !c2Bad) {
    taraScore = 1.5;
  } else {
    taraScore = 0;
  }
  kootScores.push({
    name: 'Tara',
    nameHi: 'तारा कूट',
    maxPoints: 3,
    obtainedPoints: taraScore,
    descriptionHi: taraScore >= 2 ? 'दीर्घायु एवं भाग्य वृद्धि के अनुकूल संकेत' : 'तारा शुद्धि हेतु शांति अनुष्ठान विचारणीय',
    status: taraScore >= 2 ? 'उत्तम' : (taraScore > 0 ? 'मध्यम' : 'दोषयुक्त'),
  });

  // 4. Yoni (4 Points)
  const yoniDiff = Math.abs(boyNakshatraIdx - girlNakshatraIdx) % 14;
  let yoniScore = 4;
  if (yoniDiff === 0) yoniScore = 4;
  else if ([1, 2, 7].includes(yoniDiff)) yoniScore = 3;
  else if ([3, 4, 8].includes(yoniDiff)) yoniScore = 2;
  else if ([5, 6, 9].includes(yoniDiff)) yoniScore = 1;
  else yoniScore = 0;
  kootScores.push({
    name: 'Yoni',
    nameHi: 'योनि कूट',
    maxPoints: 4,
    obtainedPoints: yoniScore,
    descriptionHi: yoniScore >= 3 ? 'दांपत्य प्रेम एवं शारीरिक-भावनात्मक संतुलन' : 'पारस्परिक समझ और संवेदनशीलता की आवश्यकता',
    status: yoniScore >= 3 ? 'उत्तम' : (yoniScore >= 2 ? 'मध्यम' : 'सामान्य'),
  });

  // 5. Graha Maitri (5 Points)
  const lordFriendship: Record<number, number[]> = {
    // 0: Mars, 1: Venus, 2: Merc, 3: Moon, 4: Sun, 5: Merc, 6: Venus, 7: Mars, 8: Jup, 9: Sat, 10: Sat, 11: Jup
    0: [0, 3, 4, 8, 11],
    1: [1, 2, 5, 6, 9, 10],
    2: [1, 2, 4, 5, 6],
    3: [0, 3, 4, 2, 5],
    4: [0, 3, 4, 8, 11],
    5: [1, 2, 4, 5, 6],
    6: [1, 2, 5, 6, 9, 10],
    7: [0, 3, 4, 8, 11],
    8: [0, 3, 4, 8, 11],
    9: [1, 2, 5, 6, 9, 10],
    10: [1, 2, 5, 6, 9, 10],
    11: [0, 3, 4, 8, 11],
  };
  const isFriendly = lordFriendship[boyRashiIdx]?.includes(girlRashiIdx);
  let grahaMaitriScore = 5;
  if (boyRashiIdx === girlRashiIdx) {
    grahaMaitriScore = 5;
  } else if (isFriendly) {
    grahaMaitriScore = 4;
  } else if (rashiDiff === 6) {
    grahaMaitriScore = 1;
  } else {
    grahaMaitriScore = 3;
  }
  kootScores.push({
    name: 'Graha Maitri',
    nameHi: 'ग्रह मैत्री',
    maxPoints: 5,
    obtainedPoints: grahaMaitriScore,
    descriptionHi: grahaMaitriScore >= 4 ? 'राशि स्वामियों में उत्तम मित्रता, विचारों का मेल' : 'सामान्य वैचारिक अंतर, समन्वय से समाधान',
    status: grahaMaitriScore >= 4 ? 'उत्तम' : 'मध्यम',
  });

  // 6. Gana (6 Points)
  const boyGana = getNakshatraGana(boyNakshatraIdx);
  const girlGana = getNakshatraGana(girlNakshatraIdx);
  let ganaScore = 6;
  let ganaStatus: AshtakootScore['status'] = 'उत्तम';
  if (boyGana === girlGana) {
    ganaScore = 6;
  } else if ((boyGana === 'देव' && girlGana === 'मनुष्य') || (boyGana === 'मनुष्य' && girlGana === 'देव')) {
    ganaScore = 5;
    ganaStatus = 'उत्तम';
  } else if (boyGana === 'राक्षस' && girlGana === 'देव') {
    ganaScore = 1;
    ganaStatus = 'दोषयुक्त';
  } else if (boyGana === 'देव' && girlGana === 'राक्षस') {
    ganaScore = 0;
    ganaStatus = 'दोषयुक्त';
  } else {
    ganaScore = 3;
    ganaStatus = 'मध्यम';
  }
  kootScores.push({
    name: 'Gana',
    nameHi: 'गण कूट',
    maxPoints: 6,
    obtainedPoints: ganaScore,
    descriptionHi: `वर का गण (${boyGana}) एवं कन्या का गण (${girlGana}) - ${ganaScore >= 5 ? 'स्वभाव में उत्तम समरसता' : 'स्वभाव भिन्नता, धैर्य आवश्यक'}`,
    status: ganaStatus,
  });

  // 7. Bhakoot (7 Points)
  // Distance between Moon Signs (6/8 Shadashthak, 9/5 Navapanchak, 12/2 Dvidvadash)
  const dist = ((girlRashiIdx - boyRashiIdx + 12) % 12) + 1;
  let bhakootScore = 7;
  let bhakootStatus: AshtakootScore['status'] = 'उत्तम';
  if ([6, 8].includes(dist)) {
    // Shadashtak
    bhakootScore = 0;
    bhakootStatus = 'दोषयुक्त';
  } else if ([9, 5].includes(dist)) {
    // Navapanchak is auspicious or mildly sensitive
    bhakootScore = 7;
  } else if ([2, 12].includes(dist)) {
    // Dvidvadash
    bhakootScore = 0;
    bhakootStatus = 'दोषयुक्त';
  } else {
    bhakootScore = 7;
  }
  kootScores.push({
    name: 'Bhakoot',
    nameHi: 'भकूट कूट',
    maxPoints: 7,
    obtainedPoints: bhakootScore,
    descriptionHi: bhakootScore === 7 ? 'संतान सुख, वंश वृद्धि एवं पारिवारिक समृद्धि के योग' : 'भकूट दोष उपस्थित, परंतु शास्त्रीय परिहार उपलब्ध है',
    status: bhakootStatus,
  });

  // 8. Nadi (8 Points)
  const boyNadi = getNakshatraNadi(boyNakshatraIdx);
  const girlNadi = getNakshatraNadi(girlNakshatraIdx);
  let nadiScore = 8;
  let nadiDoshPresent = false;
  let nadiStatus: AshtakootScore['status'] = 'उत्तम';
  let nadiPariharText = '';

  if (boyNadi === girlNadi) {
    nadiDoshPresent = true;
    // Check Classical Nadi Parihar:
    // If Rashis are different OR Nakshatra is different in same Rashi
    if (boyRashiIdx !== girlRashiIdx || boyNakshatraIdx !== girlNakshatraIdx) {
      nadiScore = 8; // Parihar applied
      nadiPariharText = `नाड़ी एक (${boyNadi}) होने के बावजूद भिन्न नक्षत्र/राशि होने से शास्त्रोक्त 'नाड़ी दोष परिहार' लागू होता है। अतः यह विवाह के लिए मान्य है।`;
      nadiStatus = 'मध्यम';
    } else {
      nadiScore = 0;
      nadiPariharText = `समान नाड़ी (${boyNadi}) होने से नाड़ी दोष निर्मित होता है। महामृत्युंजय जप एवं स्वर्ण दान से दोष निवारण संभव है।`;
      nadiStatus = 'दोषयुक्त';
    }
  } else {
    nadiScore = 8;
    nadiPariharText = `वर की नाड़ी (${boyNadi}) एवं कन्या की नाड़ी (${girlNadi}) भिन्न हैं। नाड़ी दोष नहीं है, उत्तम वंश व स्वास्थ्य योग।`;
  }

  kootScores.push({
    name: 'Nadi',
    nameHi: 'नाड़ी कूट',
    maxPoints: 8,
    obtainedPoints: nadiScore,
    descriptionHi: nadiPariharText,
    status: nadiStatus,
  });

  // Calculate Total
  const totalGunas = kootScores.reduce((sum, item) => sum + item.obtainedPoints, 0);
  const maxGunas = 36;
  const compatibilityPercentage = Math.round((totalGunas / maxGunas) * 100);

  // Verdict Tone
  let verdictTone: MilanResult['verdictTone'] = 'good';
  let verdictHi = '';
  if (totalGunas >= 28) {
    verdictTone = 'excellent';
    verdictHi = 'अति उत्तम विवाह संबंध (36 में से ' + totalGunas + ' गुण मिल रहे हैं)';
  } else if (totalGunas >= 21) {
    verdictTone = 'good';
    verdictHi = 'उत्तम एवं अनुकूल विवाह योग (36 में से ' + totalGunas + ' गुण मिल रहे हैं)';
  } else if (totalGunas >= 18) {
    verdictTone = 'average';
    verdictHi = 'सामान्य विवाह योग (उपायों एवं कुंडली के सप्तम भाव परीक्षण के साथ स्वीकार्य)';
  } else {
    verdictTone = 'poor';
    verdictHi = 'न्यून गुण मिलान (विवाह पूर्व वरिष्ठ ज्योतिषाचार्य से परामर्श अनुशंसित)';
  }

  // Manglik Analysis
  let matchCompatibility = '';
  let remedyHi = '';
  if (boyIsManglik && girlIsManglik) {
    matchCompatibility = 'दोनों मांगलिक हैं। शास्त्रों के अनुसार परस्पर मांगलिक दोष स्वतः निरस्त (परिहार) हो जाता है। उत्तम योग।';
  } else if (!boyIsManglik && !girlIsManglik) {
    matchCompatibility = 'दोनों में से कोई भी मांगलिक नहीं है। मांगलिक दोष की अनुपस्थिति दांपत्य हेतु अत्यंत शुभ है।';
  } else {
    const who = boyIsManglik ? `${boyName} मांगलिक हैं` : `${girlName} मांगलिक हैं`;
    matchCompatibility = `${who} जबकि दूसरा पक्ष सामान्य है। सप्तम भाव में शुभ ग्रह की स्थिति से आंशिक प्रभाव कम होता है।`;
    remedyHi = 'मंगलवार को मंगल शांति, सुंदरकांड का पाठ एवं घट विवाह अथवा विष्णु प्रतिमा विवाह का शास्त्रोक्त विधान करें।';
  }

  const summaryRecommendationHi = `12+ वर्षों के हमारे अनुभव के आधार पर ${boyName} और ${girlName} की कुंडली में 36 में से ${totalGunas} गुण प्राप्त हुए हैं। ${
    totalGunas >= 18
      ? 'यह संबंध दांपत्य सुख, वंश वृद्धि एवं गृहस्थ धर्म के पालन हेतु अनुकूल प्रतीत होता है।'
      : 'गुणों की संख्या 18 से कम होने के कारण व्यक्तिगत कुंडली परीक्षण एवं ग्रहों की शांति के उपरांत ही निर्णय लें।'
  }`;

  return {
    totalGunas,
    maxGunas,
    compatibilityPercentage,
    verdictHi,
    verdictTone,
    kootScores,
    manglikStatus: {
      boyManglik: boyIsManglik,
      girlManglik: girlIsManglik,
      matchCompatibility,
      remedyHi,
    },
    nadiDoshPresent,
    nadiPariharText,
    summaryRecommendationHi,
  };
}

export function generateSyntheticKundali(
  name: string,
  dob: string,
  tob: string,
  pob: string
): GeneratedKundali {
  // Deterministic seed generation based on DOB string
  const seedNum = (dob + tob + pob).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const lagnaRashiIdx = seedNum % 12;
  const chandraRashiIdx = (seedNum + 3) % 12;
  const suryaRashiIdx = (seedNum + 7) % 12;
  const nakshatraIdx = (seedNum * 2) % 27;
  const charan = (seedNum % 4) + 1;

  const lagnaRashi = RASHIS_LIST[lagnaRashiIdx];
  const chandraRashi = RASHIS_LIST[chandraRashiIdx];
  const suryaRashi = RASHIS_LIST[suryaRashiIdx];
  const nakshatra = NAKSHATRAS_LIST[nakshatraIdx];

  const luckyStones = ['माणिक्य (Ruby)', 'मोती (Pearl)', 'मूंगा (Red Coral)', 'पन्ना (Emerald)', 'पुखराज (Yellow Sapphire)', 'हीरा (Diamond)', 'नीलम (Blue Sapphire)'];
  const luckyColors = ['पीला व स्वर्णिम', 'केसरिया व लाल', 'श्वेत व रूपहला', 'हरा व तोतिया', 'आसमानी नीला'];
  const dashas = ['बृहस्पति (गुरु) महादशा', 'शनि महादशा', 'बुध महादशा', 'शुक्र महादशा', 'सूर्य महादशा', 'चंद्रमा महादशा'];

  // Distribute 9 planets into 12 houses
  const bhavaPlanets: Record<number, string[]> = {
    1: ['लग्न', 'सूर्य'],
    2: ['बुध'],
    3: [],
    4: ['शुक्र'],
    5: ['चंद्र'],
    6: [],
    7: ['गुरु'],
    8: [],
    9: ['मंगल'],
    10: ['शनि'],
    11: ['राहु'],
    12: ['केतु'],
  };

  return {
    name,
    dob,
    tob,
    pob,
    lagnaRashi,
    chandraRashi,
    suryaRashi,
    nakshatra,
    charan,
    luckyStone: luckyStones[seedNum % luckyStones.length],
    luckyColor: luckyColors[seedNum % luckyColors.length],
    luckyNumber: ((seedNum % 9) + 1),
    currentDasha: dashas[seedNum % dashas.length],
    bhavaPlanets,
    predictions: {
      personality: `आपका लग्न ${lagnaRashi} है। जातक स्वाभिमानी, धैर्यवान, कर्तव्यनिष्ठ एवं समाज में मान-सम्मान प्राप्त करने वाला होता है। निर्णय क्षमता सुदृढ़ रहेगी।`,
      vivahDampatya: `कुंडली का सप्तम भाव विवाह एवं जीवनसाथी का प्रतिनिधित्व करता है। देवगुरु बृहस्पति की शुभ दृष्टि से जीवनसाथी सुशिक्षित, संस्कारी और गृहस्थी में सहायक सिद्ध होगा।`,
      career: `दशम भाव कर्म स्थान में अनुकूल ग्रहों की स्थिति से प्रशासनिक, तकनीकी अथवा व्यावसायिक क्षेत्रों में दीर्घकालिक सफलता व प्रतिष्ठा के प्रबल योग हैं।`,
      bhagyaDhana: `नवम भाव भाग्य एवं द्वितीय भाव धन संचय को दर्शाता है। 28वें से 32वें वर्ष के मध्य आकस्मिक भाग्योदय और पैतृक व स्वअर्जित संपत्ति में प्रचुर वृद्धि होगी।`,
    },
  };
}
