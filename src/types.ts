export interface RashiInfo {
  id: string;
  nameHi: string;
  nameEn: string;
  symbol: string;
  icon: string;
  element: string;
  ruler: string;
  luckyNumber: number;
  luckyColor: string;
  dailyPrediction: {
    general: string;
    career: string;
    loveVivah: string;
    finance: string;
    health: string;
    mantra: string;
  };
}

export interface AstrologyService {
  id: string;
  titleHi: string;
  titleEn: string;
  tagHi: string;
  descriptionHi: string;
  iconName: string;
  highlightsHi: string[];
  duration: string;
  feeText: string;
  price?: number;
  badge?: string;
}

export interface Astrologer {
  id: string;
  nameHi: string;
  nameEn: string;
  titleHi: string;
  experienceYears: number;
  specializationHi: string[];
  languages: string[];
  rating: number;
  consultationsCount: number;
  image: string;
  aboutHi: string;
}

export interface MuhuratItem {
  id: string;
  category: 'vivah' | 'grihapravesh' | 'namkaran' | 'vahan';
  titleHi: string;
  dateStr: string;
  tithiHi: string;
  nakshatraHi: string;
  shubhMuhuratTimeHi: string;
  auspiciousness: string;
}

export interface AshtakootScore {
  name: string;
  nameHi: string;
  maxPoints: number;
  obtainedPoints: number;
  descriptionHi: string;
  status: 'उत्तम' | 'मध्यम' | 'सामान्य' | 'दोषयुक्त';
}

export interface MilanResult {
  totalGunas: number;
  maxGunas: number;
  compatibilityPercentage: number;
  verdictHi: string;
  verdictTone: 'excellent' | 'good' | 'average' | 'poor';
  kootScores: AshtakootScore[];
  manglikStatus: {
    boyManglik: boolean;
    girlManglik: boolean;
    matchCompatibility: string;
    remedyHi?: string;
  };
  nadiDoshPresent: boolean;
  nadiPariharText?: string;
  summaryRecommendationHi: string;
}

export interface KundaliPlanetaryPosition {
  house: number; // 1 to 12
  planet: string;
  planetHi: string;
  rashiHi: string;
  degree: string;
  isRetrograde?: boolean;
}

export interface GeneratedKundali {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  lagnaRashi: string;
  chandraRashi: string;
  suryaRashi: string;
  nakshatra: string;
  charan: number;
  luckyStone: string;
  luckyColor: string;
  luckyNumber: number;
  currentDasha: string;
  bhavaPlanets: Record<number, string[]>;
  predictions: {
    personality: string;
    vivahDampatya: string;
    career: string;
    bhagyaDhana: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  serviceUsed: string;
  rating: number;
  storyHi: string;
  dateStr: string;
}

export interface FaqItem {
  id: string;
  questionHi: string;
  answerHi: string;
  category: string;
}
