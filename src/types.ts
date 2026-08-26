export interface MandiPriceRecord {
  id: string;
  state: string;
  district: string;
  market: string; // Mandi name
  commodity: string; // Crop
  variety: string;
  buyingPrice: number; // ₹ per Quintal (Min or Wholesale Buy rate)
  sellingPrice: number; // ₹ per Quintal (Max or Retail/Traded Sell rate)
  modalPrice: number; // ₹ per Quintal
  lastUpdated: string; // ISO date string or formatted time
  arrivalVolumeTonnes?: number;
  category: CropCategory;
  priceChange7d: number; // Percentage change in last 7 days (+/- %)
}

export type CropCategory = 
  | 'Cereals & Pulses' 
  | 'Vegetables' 
  | 'Fruits' 
  | 'Oilseeds' 
  | 'Spices & Cash Crops'
  | 'Commercial & Sugarcane'
  | 'Other';

export interface PriceTrendPoint {
  date: string;
  buyingPrice: number;
  sellingPrice: number;
  modalPrice: number;
  arrivalVolume: number;
}

export interface StateDistrictMandiMap {
  [state: string]: {
    [district: string]: string[]; // list of mandi/market names
  };
}

export interface MandiFilterState {
  state: string;
  district: string;
  mandi: string;
  category: string;
  searchQuery: string;
  unit: 'quintal' | 'kg' | 'tonne';
  sortBy: 'crop' | 'buyingPrice' | 'sellingPrice' | 'modalPrice' | 'lastUpdated';
  sortOrder: 'asc' | 'desc';
}

export interface MarketInsight {
  crop: string;
  trendSummary: string;
  priceOutlook: 'bullish' | 'bearish' | 'stable';
  bestSellingMandi: string;
  recommendedAction: string;
  factors: string[];
}

export type SupportedLanguage = 
  | 'en' 
  | 'hi' 
  | 'pa' 
  | 'mr' 
  | 'gu' 
  | 'kn' 
  | 'ta' 
  | 'te' 
  | 'bn';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  associatedStates: string[];
  sampleText: string;
}

export interface UserPreferences {
  language: SupportedLanguage;
  state?: string;
  preferredState?: string;
  hasCompletedSetup: boolean;
}

export type UserRole = 'farmer' | 'buyer' | 'exporter';

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  pinCode: string;
  district: string;
  state: string;
  userType: UserRole;
  emailOrUserId?: string;
  isGuest: boolean;
  authProvider?: 'credentials' | 'google' | 'apple' | 'guest';
  registeredAt?: string;
}

export type AuthMode = 'choose_auth' | 'signin' | 'register' | 'profile';
