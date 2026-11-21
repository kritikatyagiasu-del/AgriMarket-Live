import { SupportedLanguage, LanguageInfo } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    associatedStates: ['All India', 'Universal'],
    sampleText: 'Live Mandi Prices & Trends'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    associatedStates: ['Uttarakhand', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Haryana', 'Himachal Pradesh'],
    sampleText: 'ताजा मंडी भाव एवं मूल्य विश्लेषण'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    associatedStates: ['Punjab', 'Haryana'],
    sampleText: 'ਤਾਜ਼ਾ ਮੰਡੀ ਭਾਅ ਅਤੇ ਰੁਝਾਨ'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    associatedStates: ['Maharashtra'],
    sampleText: 'ताज्या बाजार भाव आणि विश्लेषण'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    associatedStates: ['Gujarat'],
    sampleText: 'લાઈવ બજાર ભાવ અને વલણ'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    associatedStates: ['Karnataka'],
    sampleText: 'ಲೈವ್ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ವಿಶ್ಲೇಷಣೆ'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    associatedStates: ['Tamil Nadu'],
    sampleText: 'நேரடி சந்தை விலை மற்றும் போக்குகள்'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    associatedStates: ['Andhra Pradesh', 'Telangana'],
    sampleText: 'ప్రత్యక్ష మార్కెట్ ధరలు మరియు ట్రెండ్స్'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    associatedStates: ['West Bengal'],
    sampleText: 'লাইভ মান্ডি দর এবং প্রবণতা'
  }
];

export const STATE_TO_LANGUAGE_MAP: Record<string, { lang: SupportedLanguage; stateNameNative: string }> = {
  "Uttarakhand": { lang: 'hi', stateNameNative: 'उत्तराखंड' },
  "Uttar Pradesh": { lang: 'hi', stateNameNative: 'उत्तर प्रदेश' },
  "Madhya Pradesh": { lang: 'hi', stateNameNative: 'मध्य प्रदेश' },
  "Bihar": { lang: 'hi', stateNameNative: 'बिहार' },
  "Rajasthan": { lang: 'hi', stateNameNative: 'राजस्थान' },
  "Himachal Pradesh": { lang: 'hi', stateNameNative: 'हिमाचल प्रदेश' },
  "Haryana": { lang: 'hi', stateNameNative: 'हरियाणा' },
  "Punjab": { lang: 'pa', stateNameNative: 'ਪੰਜਾਬ' },
  "Maharashtra": { lang: 'mr', stateNameNative: 'महाराष्ट्र' },
  "Gujarat": { lang: 'gu', stateNameNative: 'ગુજરાત' },
  "Karnataka": { lang: 'kn', stateNameNative: 'ಕರ್ನಾಟಕ' },
  "Tamil Nadu": { lang: 'ta', stateNameNative: 'தமிழ்நாடு' },
  "Telangana": { lang: 'te', stateNameNative: 'తెలంగాణ' },
  "Andhra Pradesh": { lang: 'te', stateNameNative: 'ఆంధ్ర ప్రదేశ్' },
  "West Bengal": { lang: 'bn', stateNameNative: 'পশ্চিমবঙ্গ' },
  "Odisha": { lang: 'hi', stateNameNative: 'ଓଡ଼ିଶା / ओडिशा' }
};

// Approximate geographic centroids for Indian States for instant GPS mapping
const STATE_CENTROIDS: { state: string; lat: number; lng: number }[] = [
  { state: "Uttarakhand", lat: 30.0668, lng: 79.0193 },
  { state: "Punjab", lat: 31.1471, lng: 75.3412 },
  { state: "Haryana", lat: 29.0588, lng: 76.0856 },
  { state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
  { state: "Maharashtra", lat: 19.7515, lng: 75.7139 },
  { state: "Gujarat", lat: 22.2587, lng: 71.1924 },
  { state: "Madhya Pradesh", lat: 22.9734, lng: 78.6569 },
  { state: "Rajasthan", lat: 27.0238, lng: 74.2179 },
  { state: "Karnataka", lat: 15.3173, lng: 75.7139 },
  { state: "Tamil Nadu", lat: 11.1271, lng: 78.6569 },
  { state: "Telangana", lat: 18.1124, lng: 79.0193 },
  { state: "Andhra Pradesh", lat: 15.9129, lng: 79.7400 },
  { state: "West Bengal", lat: 22.9868, lng: 87.8550 },
  { state: "Bihar", lat: 25.0961, lng: 85.3131 },
  { state: "Himachal Pradesh", lat: 31.7433, lng: 77.1202 },
  { state: "Odisha", lat: 20.9517, lng: 85.0985 }
];

export function estimateStateFromCoordinates(latitude: number, longitude: number): string | null {
  let closestState: string | null = null;
  let minDistance = Infinity;

  for (const item of STATE_CENTROIDS) {
    const dLat = item.lat - latitude;
    const dLng = item.lng - longitude;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < minDistance) {
      minDistance = distSq;
      closestState = item.state;
    }
  }

  // If distance squared is reasonably within India (~< 25 units squared)
  if (minDistance < 35) {
    return closestState;
  }
  return null;
}

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  agmarknetSync: string;
  liveBadge: string;
  roles: {
    farmer: string;
    buyer: string;
    exporter: string;
  };
  banner: {
    title: string;
    mode: string;
    description: string;
    exportButton: string;
  };
  filters: {
    searchPlaceholder: string;
    unitLabel: string;
    stateLabel: string;
    districtLabel: string;
    mandiLabel: string;
    allStates: string;
    allDistricts: string;
    allMandis: string;
    allCategories: string;
    resetFilters: string;
    resultsCount: string;
    showing: string;
    records: string;
  };
  categories: {
    all: string;
    cereals: string;
    vegetables: string;
    fruits: string;
    oilseeds: string;
    spices: string;
    commercial: string;
  };
  units: {
    quintal: string;
    kg: string;
    tonne: string;
  };
  bestMandi: {
    badge: string;
    title: string;
    highestSelling: string;
    lowestBuying: string;
    spread: string;
    bestOpportunity: string;
    selectCrop: string;
    viewTrend: string;
    rate: string;
    arbitrageBadge: string;
  };
  table: {
    title: string;
    subtitle: string;
    sortBy: string;
    colCrop: string;
    colVariety: string;
    colMandi: string;
    colBuyPrice: string;
    colSellPrice: string;
    colBuying: string;
    colSelling: string;
    colModal: string;
    colLastUpdated: string;
    colTrend: string;
    colAction: string;
    colAnalysis: string;
    buyRate: string;
    sellRate: string;
    modalRate: string;
    yourBuyRate: string;
    wholesalerBuyRate: string;
    modalPrice: string;
    arrival: string;
    tonnes: string;
    btnGraph: string;
    btnAiAdvice: string;
    viewTrendBtn: string;
    aiInsightBtn: string;
    noRecords: string;
    noRecordsTitle: string;
    noRecordsDesc: string;
    resetButton: string;
    today: string;
    minsAgo: string;
  };
  chartModal: {
    title: string;
    subtitle: string;
    trendLabel: string;
    arrivalVolume: string;
    modalPrice: string;
    buyingPrice: string;
    sellingPrice: string;
    sevenDayDiff: string;
    close: string;
  };
  insightModal: {
    title: string;
    subtitle: string;
    marketOutlook: string;
    recommendedAction: string;
    bestAlternative: string;
    keyFactors: string;
    bullish: string;
    bearish: string;
    stable: string;
    close: string;
  };
  setupModal: {
    title: string;
    subtitle: string;
    locationPrompt: string;
    detectLocationBtn: string;
    detecting: string;
    locationDetected: string;
    stateSelectLabel: string;
    chooseState: string;
    recommendedLangBadge: string;
    selectLanguageLabel: string;
    setDefaultStateToggle: string;
    saveAndContinueBtn: string;
    skipForNow: string;
    changeAnytimeNote: string;
  };
  header: {
    changeLanguageBtn: string;
    refresh: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'AgriMarket Live',
    appSubtitle: 'Mandi Crop Price Tracker & Trade Analytics',
    agmarknetSync: 'Demo data',
    liveBadge: 'Live Mandi Prices',
    roles: {
      farmer: '🌾 Farmer',
      buyer: '🛒 Buyer / Wholesaler',
      exporter: '🚢 Exporter'
    },
    banner: {
      title: 'Agri-Tech Mandi Market Portal & Price Analytics',
      mode: 'Mode',
      description: 'Select your State, District, and Mandi below to check live buying & selling prices for crops across Indian agricultural markets.',
      exportButton: 'Export Mandi Sheet (CSV)'
    },
    filters: {
      searchPlaceholder: 'Search crop, variety, mandi, or district (e.g., Wheat, Sugar Cane, Laksar, Haridwar)...',
      unitLabel: 'Unit:',
      stateLabel: 'State',
      districtLabel: 'District',
      mandiLabel: 'Mandi / Yard',
      allStates: 'All States',
      allDistricts: 'All Districts',
      allMandis: 'All Mandis',
      allCategories: 'All Categories',
      resetFilters: 'Reset Filters',
      resultsCount: 'results found',
      showing: 'Showing',
      records: 'records'
    },
    categories: {
      all: 'All Categories',
      cereals: 'Cereals & Pulses',
      vegetables: 'Vegetables',
      fruits: 'Fruits',
      oilseeds: 'Oilseeds',
      spices: 'Spices & Cash Crops',
      commercial: 'Commercial & Sugarcane'
    },
    units: {
      quintal: '₹/Quintal (100kg)',
      kg: '₹/Kg',
      tonne: '₹/Tonne'
    },
    bestMandi: {
      badge: 'Price Arbitrage Finder',
      title: 'Best Mandi to Sell & Buy',
      highestSelling: 'Highest Selling Price Mandi (Best for Farmers)',
      lowestBuying: 'Lowest Buying Price Mandi (Best for Buyers)',
      spread: 'Mandi Spread Opportunity',
      bestOpportunity: 'Potential realization gain across markets',
      selectCrop: 'Select Crop:',
      viewTrend: 'Analyze Mandi Trend',
      rate: 'Rate',
      arbitrageBadge: 'Max Price Realization'
    },
    table: {
      title: 'Live Mandi Price Bulletin',
      subtitle: 'Prices reported across APMC Mandis • Wholesaler Buying vs Farmer Selling spread',
      sortBy: 'Sort by:',
      colCrop: 'Crop',
      colVariety: 'Variety',
      colMandi: 'Mandi & Location',
      colBuyPrice: 'Buying Price',
      colSellPrice: 'Selling Price',
      colBuying: 'Buying Price (Wholesale)',
      colSelling: 'Selling Price (Farmer Realization)',
      colModal: 'Modal Rate (Benchmark)',
      colLastUpdated: 'Last Updated',
      colTrend: '7D Trend',
      colAction: 'Analytics',
      colAnalysis: 'Price Analysis',
      buyRate: 'Buy Rate',
      sellRate: 'Sell Rate',
      modalRate: 'Modal',
      yourBuyRate: 'Wholesale Buy Rate',
      wholesalerBuyRate: 'Wholesaler Buy Rate',
      modalPrice: 'Modal',
      arrival: 'Arrival',
      tonnes: 'Tonnes',
      btnGraph: 'Graph',
      btnAiAdvice: 'AI Advisory',
      viewTrendBtn: 'Price Trend',
      aiInsightBtn: 'AI Advisory',
      noRecords: 'No Mandi records found matching filters',
      noRecordsTitle: 'No Mandi price records found matching your filters',
      noRecordsDesc: 'Try adjusting your state, district, or search criteria.',
      resetButton: 'Clear All Filters',
      today: 'Today',
      minsAgo: 'mins ago'
    },
    chartModal: {
      title: 'Historical Mandi Price Trend',
      subtitle: '14-Day Price Movement & Market Arrival Analysis',
      trendLabel: 'Price Trend',
      arrivalVolume: 'Arrival Volume (Tonnes)',
      modalPrice: 'Modal Price',
      buyingPrice: 'Min / Buying Rate',
      sellingPrice: 'Max / Selling Rate',
      sevenDayDiff: '7-Day Price Variation',
      close: 'Close'
    },
    insightModal: {
      title: 'AI Mandi Market Advisory',
      subtitle: 'Predictive intelligence based on crop arrivals and regional trade',
      marketOutlook: 'Market Outlook',
      recommendedAction: 'Recommended Strategy',
      bestAlternative: 'Top Alternative Mandi',
      keyFactors: 'Key Market Drivers',
      bullish: 'Bullish (Prices Expected to Rise)',
      bearish: 'Bearish (Prices Expected to Soften)',
      stable: 'Stable (Consistent Trading Band)',
      close: 'Close Advisory'
    },
    setupModal: {
      title: 'Welcome to AgriMarket Live',
      subtitle: 'Set your language preference and home location for personalized Mandi rates',
      locationPrompt: 'Where are you located?',
      detectLocationBtn: 'Detect My Location (GPS)',
      detecting: 'Locating...',
      locationDetected: 'Location Detected',
      stateSelectLabel: 'Select Your State / Region:',
      chooseState: 'Choose State',
      recommendedLangBadge: 'Recommended for your region',
      selectLanguageLabel: 'Select Your Preferred Language:',
      setDefaultStateToggle: 'Pre-select my state on the Mandi dashboard',
      saveAndContinueBtn: 'Save & Start Exploring',
      skipForNow: 'Continue with English',
      changeAnytimeNote: 'You can change your language and state preference anytime from the top header.'
    },
    header: {
      changeLanguageBtn: 'Language & Location',
      refresh: 'Refresh Rates'
    }
  },

  hi: {
    appName: 'एग्रीमार्केट लाइव',
    appSubtitle: 'मंडी भाव ट्रैकर एवं कृषि व्यापार विश्लेषण',
    agmarknetSync: 'डेमो डेटा',
    liveBadge: 'ताजा मंडी भाव',
    roles: {
      farmer: '🌾 किसान',
      buyer: '🛒 व्यापारी / खरीदार',
      exporter: '🚢 निर्यातक'
    },
    banner: {
      title: 'एग्री-टेक मंडी बाजार पोर्टल एवं मूल्य विश्लेषण',
      mode: 'मोड',
      description: 'भारत के प्रमुख कृषि मंडियों में फसलों के लाइव खरीद एवं बिक्री भाव देखने के लिए अपना राज्य, जिला और मंडी चुनें।',
      exportButton: 'मंडी रिपोर्ट डाउनलोड करें (CSV)'
    },
    filters: {
      searchPlaceholder: 'फसल, किस्म, मंडी या जिला खोजें (जैसे: गेहूं, गन्ना, लक्सर, हरिद्वार, रुड़की)...',
      unitLabel: 'इकाई:',
      stateLabel: 'राज्य',
      districtLabel: 'जिला',
      mandiLabel: 'मंडी / यार्ड',
      allStates: 'सभी राज्य',
      allDistricts: 'सभी जिले',
      allMandis: 'सभी मंडियां',
      allCategories: 'सभी श्रेणियां',
      resetFilters: 'फ़िल्टर हटाएं',
      resultsCount: 'परिणाम मिले',
      showing: 'दर्शाए गए',
      records: 'रिकॉर्ड'
    },
    categories: {
      all: 'सभी श्रेणियां',
      cereals: 'अनाज एवं दालें (Cereals)',
      vegetables: 'सब्जियां (Vegetables)',
      fruits: 'फल (Fruits)',
      oilseeds: 'तिलहन (Oilseeds)',
      spices: 'मसाले व नकदी फसलें (Spices)',
      commercial: 'व्यावसायिक व गन्ना (Commercial)'
    },
    units: {
      quintal: '₹/क्विंटल (100 किग्रा)',
      kg: '₹/किलोग्राम',
      tonne: '₹/टन'
    },
    bestMandi: {
      badge: 'सर्वोत्तम मंडी खोजक',
      title: 'फसल बेचने और खरीदने के लिए सबसे अच्छी मंडी',
      highestSelling: 'अधिकतम बिक्री भाव वाली मंडी (किसानों के लिए उत्तम)',
      lowestBuying: 'न्यूनतम खरीद भाव वाली मंडी (व्यापारियों के लिए उत्तम)',
      spread: 'मंडी मूल्य अंतर (मुनाफ़ा अवसर)',
      bestOpportunity: 'मंडियों के बीच मूल्य अंतर का लाभ उठाएं',
      selectCrop: 'फसल चुनें:',
      viewTrend: 'मंडी रुझान देखें',
      rate: 'दर',
      arbitrageBadge: 'अधिकतम प्राप्ति'
    },
    table: {
      title: 'लाइव मंडी मूल्य बुलेटिन',
      subtitle: 'APMC मंडियों से प्राप्त आधिकारिक भाव • थोक खरीद व किसान बिक्री दर',
      sortBy: 'क्रमबद्ध करें:',
      colCrop: 'फसल',
      colVariety: 'किस्म / ग्रेड',
      colMandi: 'मंडी एवं स्थान',
      colBuyPrice: 'खरीद भाव',
      colSellPrice: 'बिक्री भाव',
      colBuying: 'न्यूनतम / खरीद भाव',
      colSelling: 'अधिकतम / बिक्री भाव',
      colModal: 'मॉडल दर (औसत भाव)',
      colLastUpdated: 'अंतिम अपडेट',
      colTrend: '7 दिन का रुझान',
      colAction: 'विश्लेषण',
      colAnalysis: 'मूल्य विश्लेषण',
      buyRate: 'खरीद भाव',
      sellRate: 'बिक्री भाव',
      modalRate: 'मॉडल भाव',
      yourBuyRate: 'आपकी खरीद दर',
      wholesalerBuyRate: 'व्यापारी खरीद दर',
      modalPrice: 'मॉडल भाव',
      arrival: 'मंडी आवक',
      tonnes: 'टन',
      btnGraph: 'ग्राफ',
      btnAiAdvice: 'AI सलाह',
      viewTrendBtn: 'मूल्य रुझान',
      aiInsightBtn: 'AI सलाह',
      noRecords: 'कोई मंडी रिकॉर्ड नहीं मिला',
      noRecordsTitle: 'आपके फ़िल्टर के अनुसार कोई मंडी रिकॉर्ड नहीं मिला',
      noRecordsDesc: 'कृपया राज्य, जिला या खोज शब्द बदल कर पुनः प्रयास करें।',
      resetButton: 'फ़िल्टर रीसेट करें',
      today: 'आज',
      minsAgo: 'मिनट पहले'
    },
    chartModal: {
      title: 'ऐतिहासिक मंडी मूल्य रुझान',
      subtitle: '14 दिनों के भाव में उतार-चढ़ाव और मंडी आवक विश्लेषण',
      trendLabel: 'मूल्य रुझान',
      arrivalVolume: 'मंडी आवक (टन में)',
      modalPrice: 'मॉडल भाव',
      buyingPrice: 'न्यूनतम / खरीद दर',
      sellingPrice: 'अधिकतम / बिक्री दर',
      sevenDayDiff: '7 दिन का मूल्य अंतर',
      close: 'बंद करें'
    },
    insightModal: {
      title: 'AI मंडी बाजार सलाह',
      subtitle: 'मंडी आवक और क्षेत्रीय व्यापार के आधार पर मूल्य पूर्वानुमान',
      marketOutlook: 'बाजार का रुख',
      recommendedAction: 'सुझाई गई रणनीति',
      bestAlternative: 'सर्वश्रेष्ठ वैकल्पिक मंडी',
      keyFactors: 'मूल्य को प्रभावित करने वाले मुख्य कारक',
      bullish: 'तेजी (भाव बढ़ने की संभावना)',
      bearish: 'मंदी (भाव गिरने की संभावना)',
      stable: 'स्थिर (सामान्य उतार-चढ़ाव)',
      close: 'सलाह बंद करें'
    },
    setupModal: {
      title: 'एग्रीमार्केट लाइव में आपका स्वागत है',
      subtitle: 'अपने क्षेत्र के अनुसार भाषा और स्थान प्राथमिकता निर्धारित करें',
      locationPrompt: 'आप किस राज्य / क्षेत्र से हैं?',
      detectLocationBtn: 'मेरा स्थान पहचानें (GPS)',
      detecting: 'पहचान जारी है...',
      locationDetected: 'स्थान पहचाना गया',
      stateSelectLabel: 'अपना राज्य चुनें:',
      chooseState: 'राज्य चुनें',
      recommendedLangBadge: 'आपके क्षेत्र के लिए अनुशंसित',
      selectLanguageLabel: 'अपनी पसंदीदा भाषा चुनें:',
      setDefaultStateToggle: 'डैशबोर्ड पर मेरे राज्य को डिफ़ॉल्ट रूप से चुनें',
      saveAndContinueBtn: 'सहेजें और शुरू करें',
      skipForNow: 'अंग्रेजी में जारी रखें',
      changeAnytimeNote: 'आप शीर्ष हेडर से कभी भी अपनी भाषा और राज्य बदल सकते हैं।'
    },
    header: {
      changeLanguageBtn: 'भाषा एवं स्थान',
      refresh: 'ताजा भाव लोड करें'
    }
  },

  pa: {
    appName: 'ਐਗਰੀਮਾਰਕੀਟ ਲਾਈਵ',
    appSubtitle: 'ਮੰਡੀ ਭਾਅ ਟਰੈਕਰ ਅਤੇ ਵਪਾਰ ਵਿਸ਼ਲੇਸ਼ਣ',
    agmarknetSync: 'ਡੈਮੋ ਡਾਟਾ',
    liveBadge: 'ਲਾਈਵ ਮੰਡੀ ਭਾਅ',
    roles: {
      farmer: '🌾 ਕਿਸਾਨ',
      buyer: '🛒 ਵਪਾਰੀ / ਖਰੀਦਦਾਰ',
      exporter: '🚢 ਨਿਰਯਾਤਕ'
    },
    banner: {
      title: 'ਐਗਰੀ-ਟੈਕ ਮੰਡੀ ਮਾਰਕੀਟ ਪੋਰਟਲ ਅਤੇ ਭਾਅ ਵਿਸ਼ਲੇਸ਼ਣ',
      mode: 'ਮੋਡ',
      description: 'ਪੰਜਾਬ ਅਤੇ ਦੇਸ਼ ਭਰ ਦੀਆਂ ਮੰਡੀਆਂ ਦੇ ਲਾਈਵ ਖਰੀਦ ਅਤੇ ਵਿਕਰੀ ਭਾਅ ਦੇਖਣ ਲਈ ਆਪਣਾ ਸੂਬਾ ਅਤੇ ਮੰਡੀ ਚੁਣੋ।',
      exportButton: 'ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ (CSV)'
    },
    filters: {
      searchPlaceholder: 'ਫ਼ਸਲ, ਕਿਸਮ, ਮੰਡੀ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਲੱਭੋ (ਜਿਵੇਂ ਕਣਕ, ਝੋਨਾ, ਖੰਨਾ ਮੰਡੀ, ਲੁਧਿਆਣਾ)...',
      unitLabel: 'ਇਕਾਈ:',
      stateLabel: 'ਸੂਬਾ',
      districtLabel: 'ਜ਼ਿਲ੍ਹਾ',
      mandiLabel: 'ਮੰਡੀ',
      allStates: 'ਸਾਰੇ ਸੂਬੇ',
      allDistricts: 'ਸਾਰੇ ਜ਼ਿਲ੍ਹੇ',
      allMandis: 'ਸਾਰੀਆਂ ਮੰਡੀਆਂ',
      allCategories: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
      resetFilters: 'ਫ਼ਿਲਟਰ ਹਟਾਓ',
      resultsCount: 'ਨਤੀਜੇ ਲੱਭੇ',
      showing: 'ਦਿਖਾਏ ਜਾ ਰਹੇ',
      records: 'ਰਿਕਾਰਡ'
    },
    categories: {
      all: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
      cereals: 'ਅਨਾਜ ਅਤੇ ਦਾਲਾਂ',
      vegetables: 'ਸਬਜ਼ੀਆਂ',
      fruits: 'ਫ਼ਲ',
      oilseeds: 'ਤੇਲ ਬੀਜ',
      spices: 'ਮਸਾਲੇ',
      commercial: 'ਵਪਾਰਕ ਅਤੇ ਗੰਨਾ'
    },
    units: {
      quintal: '₹/ਕੁਇੰਟਲ',
      kg: '₹/ਕਿਲੋ',
      tonne: '₹/ਟਨ'
    },
    bestMandi: {
      badge: 'ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀ ਲੱਭੋ',
      title: 'ਫ਼ਸਲ ਵੇਚਣ ਅਤੇ ਖਰੀਦਣ ਲਈ ਵਧੀਆ ਮੰਡੀ',
      highestSelling: 'ਸਭ ਤੋਂ ਵੱਧ ਵਿਕਰੀ ਭਾਅ (ਕਿਸਾਨਾਂ ਲਈ ਲਾਹੇਵੰਦ)',
      lowestBuying: 'ਸਭ ਤੋਂ ਘੱਟ ਖਰੀਦ ਭਾਅ (ਵਪਾਰੀਆਂ ਲਈ)',
      spread: 'ਮੰਡੀਆਂ ਵਿਚਕਾਰ ਮੁਨਾਫ਼ੇ ਦਾ ਫ਼ਰਕ',
      bestOpportunity: 'ਵੱਧ ਕਮਾਈ ਦਾ ਮੌਕਾ',
      selectCrop: 'ਫ਼ਸਲ ਚੁਣੋ:',
      viewTrend: 'ਰੁਝਾਨ ਦੇਖੋ',
      rate: 'ਭਾਅ',
      arbitrageBadge: 'ਵੱਧ ਮੁਨਾਫ਼ਾ'
    },
    table: {
      title: 'ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਸੂਚੀ',
      subtitle: 'APMC ਮੰਡੀਆਂ ਦੇ ਤਾਜ਼ਾ ਭਾਅ',
      sortBy: 'ਤਰਤੀਬ:',
      colCrop: 'ਫ਼ਸਲ',
      colVariety: 'ਕਿਸਮ / ਗ੍ਰੇਡ',
      colMandi: 'ਮੰਡੀ ਅਤੇ ਥਾਂ',
      colBuyPrice: 'ਖਰੀਦ ਭਾਅ',
      colSellPrice: 'ਵਿਕਰੀ ਭਾਅ',
      colBuying: 'ਖਰੀਦ ਭਾਅ',
      colSelling: 'ਵਿਕਰੀ ਭਾਅ',
      colModal: 'ਮਾਡਲ ਭਾਅ',
      colLastUpdated: 'ਆਖਰੀ ਅੱਪਡੇਟ',
      colTrend: '7 ਦਿਨਾਂ ਦਾ ਰੁਝਾਨ',
      colAction: 'ਵਿਸ਼ਲੇਸ਼ਣ',
      colAnalysis: 'ਭਾਅ ਵਿਸ਼ਲੇਸ਼ਣ',
      buyRate: 'ਖਰੀਦ',
      sellRate: 'ਵਿਕਰੀ',
      modalRate: 'ਮਾਡਲ',
      yourBuyRate: 'ਤੁਹਾਡਾ ਖਰੀਦ ਭਾਅ',
      wholesalerBuyRate: 'ਵਪਾਰੀ ਖਰੀਦ ਭਾਅ',
      modalPrice: 'ਮਾਡਲ',
      arrival: 'ਮੰਡੀ ਆਮਦ',
      tonnes: 'ਟਨ',
      btnGraph: 'ਗ੍ਰਾਫ਼',
      btnAiAdvice: 'AI ਸਲਾਹ',
      viewTrendBtn: 'ਰੁਝਾਨ',
      aiInsightBtn: 'AI ਸਲਾਹ',
      noRecords: 'ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ',
      noRecordsTitle: 'ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ',
      noRecordsDesc: 'ਕਿਰਪਾ ਕਰਕੇ ਹੋਰ ਮੰਡੀ ਜਾਂ ਫ਼ਸਲ ਚੁਣੋ।',
      resetButton: 'ਫ਼ਿਲਟਰ ਰੀਸੈਟ ਕਰੋ',
      today: 'ਅੱਜ',
      minsAgo: 'ਮਿੰਟ ਪਹਿਲਾਂ'
    },
    chartModal: {
      title: 'ਮੰਡੀ ਭਾਅ ਦਾ ਪਿਛੋਕੜ',
      subtitle: '14 ਦਿਨਾਂ ਦੇ ਭਾਅ ਅਤੇ ਆਮਦ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ',
      trendLabel: 'ਭਾਅ ਦਾ ਰੁਝਾਨ',
      arrivalVolume: 'ਮੰਡੀ ਆਮਦ (ਟਨ)',
      modalPrice: 'ਮਾਡਲ ਭਾਅ',
      buyingPrice: 'ਘੱਟੋ-ਘੱਟ ਭਾਅ',
      sellingPrice: 'ਵੱਧ ਤੋਂ ਵੱਧ ਭਾਅ',
      sevenDayDiff: '7 ਦਿਨਾਂ ਦਾ ਫ਼ਰਕ',
      close: 'ਬੰਦ ਕਰੋ'
    },
    insightModal: {
      title: 'AI ਮੰਡੀ ਮਾਰਕੀਟ ਸਲਾਹ',
      subtitle: 'ਮੰਡੀ ਆਮਦ ਦੇ ਆਧਾਰ ਤੇ ਭਵਿੱਖਬਾਣੀ',
      marketOutlook: 'ਮਾਰਕੀਟ ਦਾ ਰੁਖ਼',
      recommendedAction: 'ਸੁਝਾਈ ਗਈ ਰਣਨੀਤੀ',
      bestAlternative: 'ਵਧੀਆ ਬਦਲਵੀਂ ਮੰਡੀ',
      keyFactors: 'ਮੁੱਖ ਕਾਰਨ',
      bullish: 'ਤੇਜ਼ੀ (ਭਾਅ ਵਧਣ ਦੀ ਉਮੀਦ)',
      bearish: 'ਮੰਦੀ (ਭਾਅ ਡਿੱਗਣ ਦੀ ਉਮੀਦ)',
      stable: 'ਸਥਿਰ',
      close: 'ਬੰਦ ਕਰੋ'
    },
    setupModal: {
      title: 'ਐਗਰੀਮਾਰਕੀਟ ਲਾਈਵ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ',
      subtitle: 'ਆਪਣੀ ਭਾਸ਼ਾ ਅਤੇ ਇਲਾਕਾ ਚੁਣੋ',
      locationPrompt: 'ਤੁਸੀਂ ਕਿਹੜੇ ਸੂਬੇ ਤੋਂ ਹੋ?',
      detectLocationBtn: 'ਮੇਰਾ ਟਿਕਾਣਾ ਲੱਭੋ (GPS)',
      detecting: 'ਖੋਜ ਜਾਰੀ ਹੈ...',
      locationDetected: 'ਟਿਕਾਣਾ ਮਿਲ ਗਿਆ',
      stateSelectLabel: 'ਆਪਣਾ ਸੂਬਾ ਚੁਣੋ:',
      chooseState: 'ਸੂਬਾ ਚੁਣੋ',
      recommendedLangBadge: 'ਤੁਹਾਡੇ ਖੇਤਰ ਲਈ ਸਿਫ਼ਾਰਿਸ਼ ਕੀਤੀ ਭਾਸ਼ਾ',
      selectLanguageLabel: 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ:',
      setDefaultStateToggle: 'ਮੇਰੇ ਸੂਬੇ ਨੂੰ ਪਹਿਲਾਂ ਚੁਣੋ',
      saveAndContinueBtn: 'ਸੇਵ ਕਰੋ ਅਤੇ ਸ਼ੁਰੂ ਕਰੋ',
      skipForNow: 'ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਜਾਰੀ ਰੱਖੋ',
      changeAnytimeNote: 'ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਵੇਲੇ ਉੱਪਰੋਂ ਭਾਸ਼ਾ ਬਦਲ ਸਕਦੇ ਹੋ।'
    },
    header: {
      changeLanguageBtn: 'ਭਾਸ਼ਾ ਅਤੇ ਇਲਾਕਾ',
      refresh: 'ਤਾਜ਼ਾ ਭਾਅ'
    }
  },

  mr: {
    appName: 'ॲग्रीमार्केट लाईव्ह',
    appSubtitle: 'बाजार भाव ट्रॅकर आणि कृषी व्यापार विश्लेषण',
    agmarknetSync: 'डेमो डेटा',
    liveBadge: 'लाईव्ह बाजार भाव',
    roles: {
      farmer: '🌾 शेतकरी',
      buyer: '🛒 व्यापारी / खरेदीदार',
      exporter: '🚢 निर्यातदार'
    },
    banner: {
      title: 'ॲग्री-टेक बाजार समिती पोर्टल व भाव विश्लेषण',
      mode: 'मोड',
      description: 'महाराष्ट्रातील व देशभरातील बाजार समित्यांचे थेट खरेदी व विक्री भाव पाहण्यासाठी राज्य व बाजार निवडा.',
      exportButton: 'बाजार अहवाल डाउनलोड करा (CSV)'
    },
    filters: {
      searchPlaceholder: 'पीक, जात, बाजार किंवा जिल्हा शोधा (उदा. कांदा, सोयाबीन, लासलगाव, नाशिक)...',
      unitLabel: 'एकक:',
      stateLabel: 'राज्य',
      districtLabel: 'जिल्हा',
      mandiLabel: 'बाजार समिती',
      allStates: 'सर्व राज्ये',
      allDistricts: 'सर्व जिल्हे',
      allMandis: 'सर्व बाजार समित्या',
      allCategories: 'सर्व वर्गवारी',
      resetFilters: 'फिल्टर काढा',
      resultsCount: 'नोंदी आढळल्या',
      showing: 'दर्शवित आहे',
      records: 'नोंदी'
    },
    categories: {
      all: 'सर्व वर्गवारी',
      cereals: 'धान्य व कडधान्ये',
      vegetables: 'भाज्या',
      fruits: 'फळे',
      oilseeds: 'गळीत धान्ये / सोयाबीन',
      spices: 'मसाले व नगदी पिके',
      commercial: 'व्यावसायिक व ऊस'
    },
    units: {
      quintal: '₹/क्विंटल',
      kg: '₹/किलो',
      tonne: '₹/टन'
    },
    bestMandi: {
      badge: 'सर्वोत्तम बाजार शोधक',
      title: 'माल विकण्यासाठी व खरेदीसाठी उत्तम बाजार समिती',
      highestSelling: 'सर्वाधिक विक्री दर (शेतकऱ्यांसाठी फायदेशीर)',
      lowestBuying: 'किमान खरेदी दर (व्यापाऱ्यांसाठी उत्तम)',
      spread: 'बाजार भाव फरक (नफा संधी)',
      bestOpportunity: 'जास्तीत जास्त दर मिळवण्याची संधी',
      selectCrop: 'पीक निवडा:',
      viewTrend: 'कल पहा',
      rate: 'दर',
      arbitrageBadge: 'जास्तीत जास्त नफा'
    },
    table: {
      title: 'थेट बाजार भाव बुलेटिन',
      subtitle: 'APMC बाजार समित्यांचे अधिकृत भाव',
      sortBy: 'क्रमवारी:',
      colCrop: 'पीक',
      colVariety: 'वाण / जात',
      colMandi: 'बाजार समिती व ठिकाण',
      colBuyPrice: 'खरेदी भाव',
      colSellPrice: 'विक्री भाव',
      colBuying: 'किमान / खरेदी भाव',
      colSelling: 'कमाल / विक्री भाव',
      colModal: 'सरासरी (मॉडेल) भाव',
      colLastUpdated: 'शेवटचे अपडेट',
      colTrend: '७ दिवसांचा कल',
      colAction: 'विश्लेषण',
      colAnalysis: 'भाव विश्लेषण',
      buyRate: 'खरेदी दर',
      sellRate: 'विक्री दर',
      modalRate: 'सरासरी',
      yourBuyRate: 'तुमचा खरेदी दर',
      wholesalerBuyRate: 'व्यापारी खरेदी दर',
      modalPrice: 'सरासरी',
      arrival: 'बाजार आवक',
      tonnes: 'टन',
      btnGraph: 'आलेख',
      btnAiAdvice: 'AI सल्ला',
      viewTrendBtn: 'भाव कल',
      aiInsightBtn: 'AI सल्ला',
      noRecords: 'कोणतीही नोंद आढळली नाही',
      noRecordsTitle: 'कोणतीही नोंद आढळली नाही',
      noRecordsDesc: 'कृपया राज्य किंवा जिल्हा बदलून पहा.',
      resetButton: 'फिल्टर रीसेट करा',
      today: 'आज',
      minsAgo: 'मिनिटांपूर्वी'
    },
    chartModal: {
      title: 'ऐतिहासिक बाजार भाव कल',
      subtitle: '१४ दिवसांतील भाव चढ-उतार व आवक विश्लेषण',
      trendLabel: 'भाव कल',
      arrivalVolume: 'बाजार आवक (टन)',
      modalPrice: 'सरासरी भाव',
      buyingPrice: 'किमान भाव',
      sellingPrice: 'कमाल भाव',
      sevenDayDiff: '७ दिवसांतील फरक',
      close: 'बंद करा'
    },
    insightModal: {
      title: 'AI बाजार समिती सल्ला',
      subtitle: 'आवक व व्यापारावर आधारित भाव अंदाज',
      marketOutlook: 'बाजाराचा कल',
      recommendedAction: 'सुचवलेली रणनीती',
      bestAlternative: 'पर्यायी उत्तम बाजार',
      keyFactors: 'महत्त्वाचे घटक',
      bullish: 'तेजी (भाव वाढण्याची शक्यता)',
      bearish: 'मंदी (भाव कमी होण्याची शक्यता)',
      stable: 'स्थिर',
      close: 'बंद करा'
    },
    setupModal: {
      title: 'ॲग्रीमार्केट लाईव्ह मध्ये आपले स्वागत आहे',
      subtitle: 'आपल्या प्राधान्यानुसार भाषा व राज्य निवडा',
      locationPrompt: 'आपण कोणत्या राज्यातील आहात?',
      detectLocationBtn: 'माझे स्थान शोधा (GPS)',
      detecting: 'शोधत आहे...',
      locationDetected: 'स्थान आढळले',
      stateSelectLabel: 'आपले राज्य निवडा:',
      chooseState: 'राज्य निवडा',
      recommendedLangBadge: 'आपल्या विभागासाठी सुचवलेली भाषा',
      selectLanguageLabel: 'पसंतीची भाषा निवडा:',
      setDefaultStateToggle: 'माझे राज्य डिफॉल्ट म्हणून सेट करा',
      saveAndContinueBtn: 'जतन करा आणि सुरू करा',
      skipForNow: 'इंग्रजीत सुरू ठेवा',
      changeAnytimeNote: 'आपण वरील हेडरमधून कधीही भाषा व राज्य बदलू शकता.'
    },
    header: {
      changeLanguageBtn: 'भाषा आणि स्थान',
      refresh: 'ताजे भाव'
    }
  },

  gu: {
    appName: 'એગ્રીમાર્કેટ લાઈવ',
    appSubtitle: 'માર્કેટ યાર્ડ ભાવ અને કૃષિ વિશ્લેષણ',
    agmarknetSync: 'ડેમો ડેટા',
    liveBadge: 'લાઈવ માર્કેટ ભાવ',
    roles: {
      farmer: '🌾 ખેડૂત',
      buyer: '🛒 વેપારી / ખરીદનાર',
      exporter: '🚢 નિકાસકાર'
    },
    banner: {
      title: 'એગ્રી-ટેક માર્કેટ યાર્ડ પોર્ટલ અને ભાવ વિશ્લેષણ',
      mode: 'મોડ',
      description: 'ગુજરાત અને ભારતના માર્કેટ યાર્ડ્સના લાઈવ ભાવ જોવા માટે રાજ્ય અને યાર્ડ પસંદ કરો.',
      exportButton: 'અહેવાલ ડાઉનલોડ કરો (CSV)'
    },
    filters: {
      searchPlaceholder: 'પાક, જાત, યાર્ડ અથવા જિલ્લો શોધો (જેમ કે કપાસ, મગફળી, ગોંડલ, રાજકોટ)...',
      unitLabel: 'એકમ:',
      stateLabel: 'રાજ્ય',
      districtLabel: 'જિલ્લો',
      mandiLabel: 'માર્કેટ યાર્ડ',
      allStates: 'બધા રાજ્યો',
      allDistricts: 'બધા જિલ્લા',
      allMandis: 'બધા યાર્ડ',
      allCategories: 'બધી કેટેગરી',
      resetFilters: 'ફિલ્ટર હટાવો',
      resultsCount: 'પરિણામો મળ્યા',
      showing: 'દર્શાવે છે',
      records: 'રેકોર્ડ'
    },
    categories: {
      all: 'બધી કેટેગરી',
      cereals: 'અનાજ અને કઠોળ',
      vegetables: 'શાકભાજી',
      fruits: 'ફળો',
      oilseeds: 'તેલીબિયાં / મગફળી',
      spices: 'મસાલા અને રોકડિયા પાક',
      commercial: 'કોમર્શિયલ અને શેરડી'
    },
    units: {
      quintal: '₹/ક્વિન્ટલ',
      kg: '₹/કિલો',
      tonne: '₹/ટન'
    },
    bestMandi: {
      badge: 'શ્રેષ્ઠ યાર્ડ શોધક',
      title: 'પાક વેચવા અને ખરીદવા માટે ઉત્તમ યાર્ડ',
      highestSelling: 'મહત્તમ વેચાણ ભાવ (ખેડૂતો માટે ઉત્તમ)',
      lowestBuying: 'ન્યૂનતમ ખરીદ ભાવ (વેપારીઓ માટે)',
      spread: 'ભાવ તફાવત (નફાની તક)',
      bestOpportunity: 'વધુ નફો મેળવવાની તક',
      selectCrop: 'પાક પસંદ કરો:',
      viewTrend: 'ટ્રેન્ડ જુઓ',
      rate: 'ભાવ',
      arbitrageBadge: 'મહત્તમ નફો'
    },
    table: {
      title: 'લાઈવ માર્કેટ યાર્ડ બુલેટિન',
      subtitle: 'APMC યાર્ડના અધિકૃત ભાવ',
      sortBy: 'ક્રમ:',
      colCrop: 'પાક',
      colVariety: 'જાત / ગ્રેડ',
      colMandi: 'યાર્ડ અને સ્થળ',
      colBuyPrice: 'ખરીદ ભાવ',
      colSellPrice: 'વેચાણ ભાવ',
      colBuying: 'ન્યૂનતમ ભાવ',
      colSelling: 'મહત્તમ ભાવ',
      colModal: 'સરેરાશ મોડલ ભાવ',
      colLastUpdated: 'છેલ્લું અપડેટ',
      colTrend: '૭ દિવસનો ટ્રેન્ડ',
      colAction: 'વિશ્લેષણ',
      colAnalysis: 'ભાવ વિશ્લેષણ',
      buyRate: 'ખરીદ ભાવ',
      sellRate: 'વેચાણ ભાવ',
      modalRate: 'મોડલ ભાવ',
      yourBuyRate: 'તમારો ખરીદ ભાવ',
      wholesalerBuyRate: 'વેપારી ખરીદ ભાવ',
      modalPrice: 'મોડલ',
      arrival: 'આવક',
      tonnes: 'ટન',
      btnGraph: 'ગ્રાફ',
      btnAiAdvice: 'AI સલાહ',
      viewTrendBtn: 'ભાવ ટ્રેન્ડ',
      aiInsightBtn: 'AI સલાહ',
      noRecords: 'કોઈ રેકોર્ડ મળ્યો નથી',
      noRecordsTitle: 'કોઈ રેકોર્ડ મળ્યો નથી',
      noRecordsDesc: 'કૃપા કરીને રાજ્ય અથવા જિલ્લો બદલો.',
      resetButton: 'ફિલ્ટર રીસેટ કરો',
      today: 'આજે',
      minsAgo: 'મિનિટ પહેલાં'
    },
    chartModal: {
      title: 'ઐતિહાસિક ભાવ ટ્રેન્ડ',
      subtitle: '૧૪ દિવસના ભાવ અને આવકનું વિશ્લેષણ',
      trendLabel: 'ભાવ ટ્રેન્ડ',
      arrivalVolume: 'આવક (ટન)',
      modalPrice: 'મોડલ ભાવ',
      buyingPrice: 'ન્યૂનતમ ભાવ',
      sellingPrice: 'મહત્તમ ભાવ',
      sevenDayDiff: '૭ દિવસનો તફાવત',
      close: 'બંધ કરો'
    },
    insightModal: {
      title: 'AI માર્કેટ સલાહ',
      subtitle: 'આવકના આધારે ભાવની આગાહી',
      marketOutlook: 'બજારનું વલણ',
      recommendedAction: 'સુચવેલ વ્યૂહરચના',
      bestAlternative: 'વૈકલ્પિક શ્રેષ્ઠ યાર્ડ',
      keyFactors: 'મુખ્ય પરિબળો',
      bullish: 'તેજી (ભાવ વધવાની શક્યતા)',
      bearish: 'મંદી (ભાવ ઘટવાની શક્યતા)',
      stable: 'સ્થિર',
      close: 'બંધ કરો'
    },
    setupModal: {
      title: 'એગ્રીમાર્કેટ લાઈવમાં આપનું સ્વાગત છે',
      subtitle: 'તમારી ભાષા અને સ્થળની પસંદગી નક્કી કરો',
      locationPrompt: 'તમે કયા રાજ્યમાંથી છો?',
      detectLocationBtn: 'મારું સ્થાન શોધો (GPS)',
      detecting: 'શોધી રહ્યું છે...',
      locationDetected: 'સ્થાન મળ્યું',
      stateSelectLabel: 'રાજ્ય પસંદ કરો:',
      chooseState: 'રાજ્ય પસંદ કરો',
      recommendedLangBadge: 'તમારા વિસ્તાર માટે ભલામણ કરેલ ભાષા',
      selectLanguageLabel: 'પસંદગીની ભાષા પસંદ કરો:',
      setDefaultStateToggle: 'મારા રાજ્યને ડિફોલ્ટ સેટ કરો',
      saveAndContinueBtn: 'સાચવો અને શરૂ કરો',
      skipForNow: 'અંગ્રેજીમાં ચાલુ રાખો',
      changeAnytimeNote: 'તમે ઉપરથી ગમે ત્યારે ભાષા બદલી શકો છો.'
    },
    header: {
      changeLanguageBtn: 'ભાષા અને સ્થળ',
      refresh: 'તાજા ભાવ'
    }
  },

  kn: {
    appName: 'ಅಗ್ರಿಮಾರ್ಕೆಟ್ ಲೈವ್',
    appSubtitle: 'ಮಾರುಕಟ್ಟೆ ದರ ಟ್ರ್ಯಾಕರ್ ಮತ್ತು ಕೃಷಿ ವ್ಯಾಪಾರ ವಿಶ್ಲೇಷಣೆ',
    agmarknetSync: 'ಡೆಮೊ ಡೇಟಾ',
    liveBadge: 'ಲೈವ್ ಎಪಿಎಂಸಿ ದರಗಳು',
    roles: {
      farmer: '🌾 ರೈತ',
      buyer: '🛒 ವ್ಯಾಪಾರಿ / ಖರೀದಿದಾರ',
      exporter: '🚢 ರಫ್ತುದಾರ'
    },
    banner: {
      title: 'ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ ಮಾರುಕಟ್ಟೆ ಪೋರ್ಟಲ್ ಮತ್ತು ಬೆಲೆ ವಿಶ್ಲೇಷಣೆ',
      mode: 'ಮೋಡ್',
      description: 'ಕರ್ನಾಟಕ ಮತ್ತು ದೇಶಾದ್ಯಂತದ ಮಾರುಕಟ್ಟೆಗಳ ಲೈವ್ ಖರೀದಿ ಮತ್ತು ಮಾರಾಟ ದರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ರಾಜ್ಯ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಆಯ್ಕೆಮಾಡಿ.',
      exportButton: 'ವರದಿ ಡೌನ್‌ಲೋಡ್ (CSV)'
    },
    filters: {
      searchPlaceholder: 'ಬೆಳೆ, ತಳಿ, ಮಾರುಕಟ್ಟೆ ಅಥವಾ ಜಿಲ್ಲೆ ಹುಡುಕಿ (ಉದಾ: ರಾಗಿ, ಅಡಿಕೆ, ಯಶವಂತಪುರ, ಬೆಂಗಳೂರು)...',
      unitLabel: 'ಘಟಕ:',
      stateLabel: 'ರಾಜ್ಯ',
      districtLabel: 'ಜಿಲ್ಲೆ',
      mandiLabel: 'ಮಾರುಕಟ್ಟೆ (APMC)',
      allStates: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು',
      allDistricts: 'ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು',
      allMandis: 'ಎಲ್ಲಾ ಮಾರುಕಟ್ಟೆಗಳು',
      allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      resetFilters: 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ',
      resultsCount: 'ಫಲಿತಾಂಶಗಳು',
      showing: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ',
      records: 'ದಾಖಲೆಗಳು'
    },
    categories: {
      all: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      cereals: 'ಧಾನ್ಯಗಳು ಮತ್ತು ಬೇಳೆಕಾಳುಗಳು',
      vegetables: 'ತರಕಾರಿಗಳು',
      fruits: 'ಹಣ್ಣುಗಳು',
      oilseeds: 'ಎಣ್ಣೆಕಾಳುಗಳು',
      spices: 'ಮಸಾಲೆ ಪದಾರ್ಥಗಳು',
      commercial: 'ವಾಣಿಜ್ಯ ಮತ್ತು ಕಬ್ಬು'
    },
    units: {
      quintal: '₹/ಕ್ವಿಂಟಾಲ್',
      kg: '₹/ಕೆಜಿ',
      tonne: '₹/ಟನ್'
    },
    bestMandi: {
      badge: 'ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಾಟ',
      title: 'ಮಾರಾಟ ಮತ್ತು ಖರೀದಿಗೆ ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ',
      highestSelling: 'ಗರಿಷ್ಠ ಮಾರಾಟ ಬೆಲೆ (ರೈತರಿಗೆ ಲಾಭದಾಯಕ)',
      lowestBuying: 'ಕನಿಷ್ಠ ಖರೀದಿ ಬೆಲೆ (ವ್ಯಾಪಾರಿಗಳಿಗೆ)',
      spread: 'ದರ ವ್ಯತ್ಯಾಸದ ಲಾಭ',
      bestOpportunity: 'ಹೆಚ್ಚಿನ ಆದಾಯ ಪಡೆಯುವ ಅವಕಾಶ',
      selectCrop: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ:',
      viewTrend: 'ಟ್ರೆಂಡ್ ನೋಡಿ',
      rate: 'ದರ',
      arbitrageBadge: 'ಹೆಚ್ಚಿನ ಲಾಭ'
    },
    table: {
      title: 'ಲೈವ್ ಎಪಿಎಂಸಿ ದರ ಪಟ್ಟಿ',
      subtitle: 'APMC ಮಾರುಕಟ್ಟೆಗಳ ಅಧಿಕೃತ ದರಗಳು',
      sortBy: 'ವಿಂಗಡಿಸಿ:',
      colCrop: 'ಬೆಳೆ ಮತ್ತು ತಳಿ',
      colVariety: 'ತಳಿ',
      colMandi: 'ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಸ್ಥಳ',
      colBuyPrice: 'ಖರೀದಿ ದರ',
      colSellPrice: 'ಮಾರಾಟ ದರ',
      colBuying: 'ಖರೀದಿ ದರ',
      colSelling: 'ಮಾರಾಟ ದರ',
      colModal: 'ಮಾದರಿ (ಸರಾಸರಿ) ದರ',
      colLastUpdated: 'ನವೀಕರಿಸಿದ ಸಮಯ',
      colTrend: '೭ ದಿನಗಳ ಟ್ರೆಂಡ್',
      colAction: 'ವಿಶ್ಲೇಷಣೆ',
      colAnalysis: 'ವಿಶ್ಲೇಷಣೆ',
      buyRate: 'ಖರೀದಿ',
      sellRate: 'ಮಾರಾಟ',
      modalRate: 'ಮಾದರಿ',
      yourBuyRate: 'ನಿಮ್ಮ ಖರೀದಿ ದರ',
      wholesalerBuyRate: 'ವ್ಯಾಪಾರಿ ಖರೀದಿ ದರ',
      modalPrice: 'ಮಾದರಿ ದರ',
      arrival: 'ಆವಕ',
      tonnes: 'ಟನ್',
      btnGraph: 'ದರ ಟ್ರೆಂಡ್ ಗ್ರಾಫ್',
      btnAiAdvice: 'AI ಸಲಹೆ',
      viewTrendBtn: 'ದರ ಟ್ರೆಂಡ್',
      aiInsightBtn: 'AI ಸಲಹೆ',
      noRecords: 'ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ',
      noRecordsTitle: 'ಯಾವುದೇ ಮಾಹಿತಿ ಕಂಡುಬಂದಿಲ್ಲ',
      noRecordsDesc: 'ದಯವಿಟ್ಟು ರಾಜ್ಯ ಅಥವಾ ಜಿಲ್ಲೆಯನ್ನು ಬದಲಾಯಿಸಿ.',
      resetButton: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
      today: 'ಇಂದು',
      minsAgo: 'ನಿಮಿಷಗಳ ಹಿಂದೆ'
    },
    chartModal: {
      title: 'ಐತಿಹಾಸಿಕ ದರ ಟ್ರೆಂಡ್',
      subtitle: '೧೪ ದಿನಗಳ ಬೆಲೆ ಮತ್ತು ಆವಕ ವಿಶ್ಲೇಷಣೆ',
      trendLabel: 'ಬೆಲೆ ಟ್ರೆಂಡ್',
      arrivalVolume: 'ಆವಕ (ಟನ್‌ಗಳಲ್ಲಿ)',
      modalPrice: 'ಮಾದರಿ ದರ',
      buyingPrice: 'ಕನಿಷ್ಠ ದರ',
      sellingPrice: 'ಗರಿಷ್ಠ ದರ',
      sevenDayDiff: '೭ ದಿನಗಳ ವ್ಯತ್ಯಾಸ',
      close: 'ಮುಚ್ಚಿ'
    },
    insightModal: {
      title: 'AI ಮಾರುಕಟ್ಟೆ ಸಲಹೆ',
      subtitle: 'ಬೆಳೆ ಆವಕ ಆಧಾರಿತ ಬೆಲೆ ಮುನ್ಸೂಚನೆ',
      marketOutlook: 'ಮಾರುಕಟ್ಟೆ ದೃಷ್ಟಿಕೋನ',
      recommendedAction: 'ಶಿಫಾರಸು ಮಾಡಿದ ತಂತ್ರ',
      bestAlternative: 'ಪರ್ಯಾಯ ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ',
      keyFactors: 'ಪ್ರಮುಖ ಅಂಶಗಳು',
      bullish: 'ಏರಿಕೆ (ಬೆಲೆ ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆ)',
      bearish: 'ಇಳಿಕೆ (ಬೆಲೆ ಕಡಿಮೆಯಾಗುವ ಸಾಧ್ಯತೆ)',
      stable: 'ಸ್ಥಿರ',
      close: 'ಮುಚ್ಚಿ'
    },
    setupModal: {
      title: 'ಅಗ್ರಿಮಾರ್ಕೆಟ್ ಲೈವ್‌ಗೆ ಸುಸ್ವಾಗತ',
      subtitle: 'ನಿಮ್ಮ ಭಾಷೆ ಮತ್ತು ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      locationPrompt: 'ನಿಮ್ಮ ರಾಜ್ಯ ಯಾವುದು?',
      detectLocationBtn: 'ನನ್ನ ಸ್ಥಳ ಗುರುತಿಸಿ (GPS)',
      detecting: 'ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
      locationDetected: 'ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ',
      stateSelectLabel: 'ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ:',
      chooseState: 'ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ',
      recommendedLangBadge: 'ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಶಿಫಾರಸು ಮಾಡಲಾದ ಭಾಷೆ',
      selectLanguageLabel: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ:',
      setDefaultStateToggle: 'ನನ್ನ ರಾಜ್ಯವನ್ನು ಡಿಫಾಲ್ಟ್ ಆಗಿ ಹೊಂದಿಸಿ',
      saveAndContinueBtn: 'ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ',
      skipForNow: 'ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮುಂದುವರಿಸಿ',
      changeAnytimeNote: 'ಮೇಲಿನ ಹೆಡರ್‌ನಿಂದ ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಭಾಷೆ ಬದಲಾಯಿಸಬಹುದು.'
    },
    header: {
      changeLanguageBtn: 'ಭಾಷೆ ಮತ್ತು ಸ್ಥಳ',
      refresh: 'ದರ ನವೀಕರಿಸಿ'
    }
  },

  ta: {
    appName: 'அக்ரிமார்க்கெட் லைவ்',
    appSubtitle: 'சந்தை விலை கண்காணிப்பு மற்றும் விவசாய வர்த்தக பகுப்பாய்வு',
    agmarknetSync: 'டெமோ தரவு',
    liveBadge: 'நேரடி சந்தை விலை',
    roles: {
      farmer: '🌾 விவசாயி',
      buyer: '🛒 வியாபாரி / வாங்குபவர்',
      exporter: '🚢 ஏற்றுமதியாளர்'
    },
    banner: {
      title: 'அக்ரி-டெக் சந்தை போர்டல் மற்றும் விலை பகுப்பாய்வு',
      mode: 'பயன்முறை',
      description: 'தமிழ்நாடு மற்றும் பிற சந்தைகளின் நேரடி கொள்முதல் மற்றும் விற்பனை விலைகளைக் காண மாநிலத்தைத் தேர்ந்தெடுக்கவும்.',
      exportButton: 'அறிக்கை பதிவிறக்கம் (CSV)'
    },
    filters: {
      searchPlaceholder: 'பயிர், ரகம், சந்தை அல்லது மாவட்டத்தைத் தேடுங்கள் (எ.கா: நெல், கரும்பு, கோயம்பேடு, மதுரை)...',
      unitLabel: 'அலகு:',
      stateLabel: 'மாநிலம்',
      districtLabel: 'மாவட்டம்',
      mandiLabel: 'சந்தை (Mandi)',
      allStates: 'அனைத்து மாநிலங்கள்',
      allDistricts: 'அனைத்து மாவட்டங்கள்',
      allMandis: 'அனைத்து சந்தைகள்',
      allCategories: 'அனைத்து பிரிவுகள்',
      resetFilters: 'வடிகட்டிகளை நீக்கு',
      resultsCount: 'முடிவுகள்',
      showing: 'காட்டப்படுகிறது',
      records: 'பதிவுகள்'
    },
    categories: {
      all: 'அனைத்து பிரிவுகள்',
      cereals: 'தானியங்கள் மற்றும் பருப்பு வகைகள்',
      vegetables: 'காய்கறிகள்',
      fruits: 'பழங்கள்',
      oilseeds: 'எண்ணெய் வித்துக்கள்',
      spices: 'மசாலா பொருட்கள்',
      commercial: 'வணிகப் பயிர்கள் மற்றும் கரும்பு'
    },
    units: {
      quintal: '₹/குவிண்டால்',
      kg: '₹/கிலோ',
      tonne: '₹/டன்'
    },
    bestMandi: {
      badge: 'சிறந்த சந்தை கண்டுபிடிப்பான்',
      title: 'விற்பனை மற்றும் கொள்முதலுக்கு சிறந்த சந்தை',
      highestSelling: 'அதிகபட்ச விற்பனை விலை (விவசாயிகளுக்கு சிறந்தது)',
      lowestBuying: 'குறைந்தபட்ச கொள்முதல் விலை (வியாபாரிகளுக்கு)',
      spread: 'சந்தை விலை வித்தியாசம்',
      bestOpportunity: 'அதிக லாபம் ஈட்டும் வாய்ப்பு',
      selectCrop: 'பயிர் தேர்வு:',
      viewTrend: 'போக்கைக் காண்க',
      rate: 'விலை',
      arbitrageBadge: 'அதிகபட்ச லாபம்'
    },
    table: {
      title: 'நேரடி சந்தை விலை புलेटின்',
      subtitle: 'APMC சந்தைகளின் அதிகாரப்பூர்வ விலைகள்',
      sortBy: 'வரிசைப்படுத்து:',
      colCrop: 'பயிர் மற்றும் ரகம்',
      colVariety: 'ரகம்',
      colMandi: 'சந்தை மற்றும் இடம்',
      colBuyPrice: 'கொள்முதல் விலை',
      colSellPrice: 'விற்பனை விலை',
      colBuying: 'கொள்முதல் விலை',
      colSelling: 'விற்பனை விலை',
      colModal: 'மாதிரி (சராசரி) விலை',
      colLastUpdated: 'கடைசி புதுப்பிப்பு',
      colTrend: '7 நாள் போக்கு',
      colAction: 'பகுப்பாய்வு',
      colAnalysis: 'பகுப்பாய்வு',
      buyRate: 'கொள்முதல்',
      sellRate: 'விற்பனை',
      modalRate: 'சராசரி',
      yourBuyRate: 'உங்கள் கொள்முதல் விலை',
      wholesalerBuyRate: 'வியாபாரி கொள்முதல் விலை',
      modalPrice: 'மாதிரி விலை',
      arrival: 'வரத்து',
      tonnes: 'டன்',
      btnGraph: 'விலை போக்கு வரைபடம்',
      btnAiAdvice: 'AI ஆலோசனை',
      viewTrendBtn: 'விலை போக்கு',
      aiInsightBtn: 'AI ஆலோசனை',
      noRecords: 'பதிவுகள் எதுவும் இல்லை',
      noRecordsTitle: 'தகவல் எதுவும் கிடைக்கவில்லை',
      noRecordsDesc: 'தயவுசெய்து மாநிலம் அல்லது மாவட்டத்தை மாற்றவும்.',
      resetButton: 'வடிகட்டிகளை மீட்டமை',
      today: 'இன்று',
      minsAgo: 'நிமிடங்களுக்கு முன்'
    },
    chartModal: {
      title: 'வரலாற்று விலை போக்கு',
      subtitle: '14 நாள் விலை மற்றும் வரத்து பகுப்பாய்வு',
      trendLabel: 'விலை போக்கு',
      arrivalVolume: 'வரத்து (டன்கள்)',
      modalPrice: 'மாதிரி விலை',
      buyingPrice: 'குறைந்தபட்ச விலை',
      sellingPrice: 'அதிகபட்ச விலை',
      sevenDayDiff: '7 நாள் மாற்றம்',
      close: 'மூடு'
    },
    insightModal: {
      title: 'AI சந்தை ஆலோசனை',
      subtitle: 'வரத்து அடிப்படையிலான விலை முன்னறிவிப்பு',
      marketOutlook: 'சந்தை பார்வை',
      recommendedAction: 'பரிந்துரைக்கப்பட்ட உத்தி',
      bestAlternative: 'மாற்று சிறந்த சந்தை',
      keyFactors: 'முக்கிய காரணிகள்',
      bullish: 'ஏற்றம் (விலை உயர வாய்ப்பு)',
      bearish: 'இறக்கம் (விலை குறைய வாய்ப்பு)',
      stable: 'நிலையானது',
      close: 'மூடு'
    },
    setupModal: {
      title: 'அக்ரிமார்க்கெட் லைவிற்கு நல்வரவு',
      subtitle: 'உங்கள் மொழி மற்றும் இருப்பிட விருப்பங்களை அமைக்கவும்',
      locationPrompt: 'உங்கள் மாநிலம் எது?',
      detectLocationBtn: 'இருப்பிடத்தைக் கண்டறி (GPS)',
      detecting: 'கண்டறிகிறது...',
      locationDetected: 'இருப்பிடம் கண்டறியப்பட்டது',
      stateSelectLabel: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்:',
      chooseState: 'மாநிலத்தைத் தேர்வுசெய்',
      recommendedLangBadge: 'உங்கள் பகுதிக்கு பரிந்துரைக்கப்பட்ட மொழி',
      selectLanguageLabel: 'விரும்பிய மொழியைத் தேர்ந்தெடுக்கவும்:',
      setDefaultStateToggle: 'என் மாநிலத்தை முன்னிருப்பாக அமைக்கவும்',
      saveAndContinueBtn: 'சேமித்து தொடரவும்',
      skipForNow: 'ஆங்கிலத்தில் தொடரவும்',
      changeAnytimeNote: 'மேல் பகுதியில் இருந்து எப்போது வேண்டுமானாலும் மொழியை மாற்றலாம்.'
    },
    header: {
      changeLanguageBtn: 'மொழி மற்றும் இருப்பிடம்',
      refresh: 'புதிய விலை'
    }
  },

  te: {
    appName: 'అగ్రిమార్కెట్ లైవ్',
    appSubtitle: 'మండీ ధరల ట్రాకర్ మరియు వ్యవసాయ వాణిజ్య విశ్లేషణ',
    agmarknetSync: 'డెమో డేటా',
    liveBadge: 'లైవ్ మార్కెట్ ధరలు',
    roles: {
      farmer: '🌾 రైతు',
      buyer: '🛒 వ్యాపారి / కొనుగోలుదారు',
      exporter: '🚢 ఎగుమతిదారు'
    },
    banner: {
      title: 'అగ్రి-టెక్ మార్కెట్ పోర్టల్ మరియు ధరల విశ్లేషణ',
      mode: 'మోడ్',
      description: 'ఆంధ్రప్రదేశ్, తెలంగాణ మరియు దేశవ్యాప్త మార్కెట్ల లైవ్ కొనుగోలు మరియు అమ్మకం ధరలను చూడటానికి రాష్ట్రాన్ని ఎంచుకోండి.',
      exportButton: 'నివేదిక డౌన్‌లోడ్ (CSV)'
    },
    filters: {
      searchPlaceholder: 'పంట, రకం, మార్కెట్ లేదా జిల్లా వెతకండి (ఉదా: మిర్చి, వరి, గుంటూరు, నిజామాబాద్)...',
      unitLabel: 'యూనిట్:',
      stateLabel: 'రాష్ట్రం',
      districtLabel: 'జిల్లా',
      mandiLabel: 'మార్కెట్ యార్డ్',
      allStates: 'అన్ని రాష్ట్రాలు',
      allDistricts: 'అన్ని జిల్లాలు',
      allMandis: 'అన్ని మార్కెట్లు',
      allCategories: 'అన్ని వర్గాలు',
      resetFilters: 'ఫిల్టర్లు తొలగించు',
      resultsCount: 'ఫలితాలు',
      showing: 'చూపిస్తోంది',
      records: 'రికార్డులు'
    },
    categories: {
      all: 'అన్ని వర్గాలు',
      cereals: 'ధాన్యాలు మరియు పప్పుదినుసులు',
      vegetables: 'కూరగాయలు',
      fruits: 'పండ్లు',
      oilseeds: 'నూనె గింజలు',
      spices: 'మసాలా దినుసులు & మిర్చి',
      commercial: 'వాణిజ్య పంటలు & చెరకు'
    },
    units: {
      quintal: '₹/క్వింటాల్',
      kg: '₹/కేజీ',
      tonne: '₹/టన్ను'
    },
    bestMandi: {
      badge: 'ఉత్తమ మార్కెట్ ఫైండర్',
      title: 'అమ్మకానికి మరియు కొనుగోలుకు ఉత్తమ మార్కెట్',
      highestSelling: 'గరిష్ట అమ్మకపు ధర (రైతులకు లాభదాయకం)',
      lowestBuying: 'కనిష్ట కొనుగోలు ధర (వ్యాపారులకు ఉత్తమం)',
      spread: 'ధరల వ్యత్యాసం లాభం',
      bestOpportunity: 'ఎక్కువ లాభం పొందే అవకాశం',
      selectCrop: 'పంట ఎంచుకోండి:',
      viewTrend: 'ట్రెండ్ చూడండి',
      rate: 'ధర',
      arbitrageBadge: 'గరిష్ట రాబడి'
    },
    table: {
      title: 'లైవ్ మార్కెట్ ధరల బులెటిన్',
      subtitle: 'APMC మార్కెట్ల అధికారిక ధరలు',
      sortBy: 'క్రమబద్ధీకరణ:',
      colCrop: 'పంట మరియు రకం',
      colVariety: 'రకం',
      colMandi: 'మార్కెట్ మరియు ప్రదేశం',
      colBuyPrice: 'కొనుగోలు ధర',
      colSellPrice: 'అమ్మకపు ధర',
      colBuying: 'కొనుగోలు ధర',
      colSelling: 'అమ్మకపు ధర',
      colModal: 'మోడల్ (సగటు) ధర',
      colLastUpdated: 'చివరి నవీకరణ',
      colTrend: '7 రోజుల ట్రెండ్',
      colAction: 'విశ్లేషణ',
      colAnalysis: 'విశ్లేషణ',
      buyRate: 'కొనుగోలు',
      sellRate: 'అమ్మకం',
      modalRate: 'మోడల్',
      yourBuyRate: 'మీ కొనుగోలు ధర',
      wholesalerBuyRate: 'వ్యాపారి కొనుగోలు ధర',
      modalPrice: 'మోడల్ ధర',
      arrival: 'రాకలు',
      tonnes: 'టన్నులు',
      btnGraph: 'ధరల ట్రెండ్ గ్రాఫ్',
      btnAiAdvice: 'AI సలహా',
      viewTrendBtn: 'ధర ట్రెండ్',
      aiInsightBtn: 'AI సలహా',
      noRecords: 'రికార్డులు కనుగొనబడలేదు',
      noRecordsTitle: 'ఎలాంటి సమాచారం దొరకలేదు',
      noRecordsDesc: 'దయచేసి రాష్ట్రం లేదా జిల్లాను మార్చండి.',
      resetButton: 'ఫిల్టర్లు రీసెట్ చేయండి',
      today: 'ఈ రోజు',
      minsAgo: 'నిమిషాల క్రితం'
    },
    chartModal: {
      title: 'చారిత్రక ధరల ట్రెండ్',
      subtitle: '14 రోజుల ధర మరియు రాబడుల విశ్లేషణ',
      trendLabel: 'ధర ట్రెండ్',
      arrivalVolume: 'రాకలు (టన్నులలో)',
      modalPrice: 'మోడల్ ధర',
      buyingPrice: 'కనిష్ట ధర',
      sellingPrice: 'గరిష్ట ధర',
      sevenDayDiff: '7 రోజుల మార్పు',
      close: 'మూసివేయి'
    },
    insightModal: {
      title: 'AI మార్కెట్ సలహా',
      subtitle: 'రాబడుల ఆధారంగా ధరల అంచనా',
      marketOutlook: 'మార్కెట్ దృక్పథం',
      recommendedAction: 'సిఫార్సు చేసిన వ్యూహం',
      bestAlternative: 'ప్రత్యామ్నాయ ఉత్తమ మార్కెట్',
      keyFactors: 'ముఖ్య కారణాలు',
      bullish: 'పెరుగుదల (ధరలు పెరిగే అవకాశం)',
      bearish: 'తగ్గుదల (ధరలు తగ్గే అవకాశం)',
      stable: 'స్థిరమైనది',
      close: 'మూసివేయి'
    },
    setupModal: {
      title: 'అగ్రిమార్కెట్ లైవ్‌కు స్వాగతం',
      subtitle: 'మీ ప్రాంతానికి అనుగుణంగా భాష మరియు రాష్ట్రాన్ని ఎంచుకోండి',
      locationPrompt: 'మీ రాష్ట్రం ఏది?',
      detectLocationBtn: 'నా స్థానాన్ని గుర్తించు (GPS)',
      detecting: 'గుర్తిస్తోంది...',
      locationDetected: 'స్థానం గుర్తించబడింది',
      stateSelectLabel: 'రాష్ట్రం ఎంచుకోండి:',
      chooseState: 'రాష్ట్రం ఎంచుకోండి',
      recommendedLangBadge: 'మీ ప్రాంతానికి సిఫార్సు చేసిన భాష',
      selectLanguageLabel: 'భాషను ఎంచుకోండి:',
      setDefaultStateToggle: 'నా రాష్ట్రాన్ని డిఫాల్ట్‌గా సెట్ చేయండి',
      saveAndContinueBtn: 'సేవ్ చేసి ప్రారంభించండి',
      skipForNow: 'ఇంగ్లీష్‌లో కొనసాగించండి',
      changeAnytimeNote: 'మీరు ఎప్పుడైనా పై హెడర్ నుండి భాషను మార్చుకోవచ్చు.'
    },
    header: {
      changeLanguageBtn: 'భాష మరియు ప్రాంతం',
      refresh: 'ధరలు నవీకరించండి'
    }
  },

  bn: {
    appName: 'এগ্রিমার্কেট লাইভ',
    appSubtitle: 'মান্ডি দর ট্র্যাকার এবং কৃষি বাজার বিশ্লেষণ',
    agmarknetSync: 'ডেমো ডেটা',
    liveBadge: 'লাইভ মান্ডি দর',
    roles: {
      farmer: '🌾 কৃষক',
      buyer: '🛒 ব্যবসায়ী / ক্রেতা',
      exporter: '🚢 রপ্তানিকারক'
    },
    banner: {
      title: 'এগ্রি-টেক মান্ডি বাজার পোর্টাল ও মূল্য বিশ্লেষণ',
      mode: 'মোড',
      description: 'পশ্চিমবঙ্গ ও দেশের বিভিন্ন মান্ডির লাইভ ক্রয় ও বিক্রয় দর দেখতে রাজ্য ও মান্ডি বেছে নিন।',
      exportButton: 'রিপোর্ট ডাউনলোড (CSV)'
    },
    filters: {
      searchPlaceholder: 'ফসল, জাত, মান্ডি বা জেলা খুঁজুন (যেমন: ধান, আলু, সিঙ্গুর, হুগলী)...',
      unitLabel: 'একক:',
      stateLabel: 'রাজ্য',
      districtLabel: 'জেলা',
      mandiLabel: 'মান্ডি / বাজার',
      allStates: 'সব রাজ্য',
      allDistricts: 'সব জেলা',
      allMandis: 'সব মান্ডি',
      allCategories: 'সব বিভাগ',
      resetFilters: 'ফিল্টার সরান',
      resultsCount: 'ফলাফল পাওয়া গেছে',
      showing: 'দেখানো হচ্ছে',
      records: 'রেকর্ড'
    },
    categories: {
      all: 'সব বিভাগ',
      cereals: 'শস্য ও ডাল',
      vegetables: 'শাকসবজি / আলু',
      fruits: 'ফলমূল',
      oilseeds: 'তৈলবীজ / সরিষা',
      spices: 'মশলা ও অর্থকরী ফসল',
      commercial: 'বাণিজ্যিক ও আখ'
    },
    units: {
      quintal: '₹/কুইন্টাল',
      kg: '₹/কেজি',
      tonne: '₹/টন'
    },
    bestMandi: {
      badge: 'সেরা মান্ডি সন্ধানকারী',
      title: 'ফসল বিক্রয় ও ক্রয়ের জন্য সেরা মান্ডি',
      highestSelling: 'সর্বোচ্চ বিক্রয় দর (কৃষকদের জন্য লাভজনক)',
      lowestBuying: 'সর্বনিম্ন ক্রয় দর (ক্রেতাদের জন্য)',
      spread: 'দরের ফারাক (লাভের সুযোগ)',
      bestOpportunity: 'বেশি মূল্য পাওয়ার সুযোগ',
      selectCrop: 'ফসল নির্বাচন করুন:',
      viewTrend: 'ট্রেন্ড দেখুন',
      rate: 'দর',
      arbitrageBadge: 'সর্বোচ্চ লাভ'
    },
    table: {
      title: 'লাইভ মান্ডি দর বুলেটিন',
      subtitle: 'APMC মান্ডির অফিসিয়াল রেট',
      sortBy: 'সাজান:',
      colCrop: 'ফসল ও জাত',
      colVariety: 'জাত',
      colMandi: 'মান্ডি ও স্থান',
      colBuyPrice: 'ক্রয় দর',
      colSellPrice: 'বিক্রয় দর',
      colBuying: 'ক্রয় দর (পাইকারি)',
      colSelling: 'বিক্রয় দর (কৃষক দর)',
      colModal: 'গড় মডেল দর',
      colLastUpdated: 'সর্বশেষ আপডেট',
      colTrend: '৭ দিনের ট্রেন্ড',
      colAction: 'বিশ্লেষণ',
      colAnalysis: 'বিশ্লেষণ',
      buyRate: 'ক্রয় দর',
      sellRate: 'বিক্রয় দর',
      modalRate: 'মডেল দর',
      yourBuyRate: 'আপনার ক্রয় দর',
      wholesalerBuyRate: 'পাইকারি ক্রয় দর',
      modalPrice: 'মডেল দর',
      arrival: 'আমদানি',
      tonnes: 'টন',
      btnGraph: 'মূল্য ট্রেন্ড গ্রাফ',
      btnAiAdvice: 'AI পরামর্শ',
      viewTrendBtn: 'মূল্য ট্রেন্ড',
      aiInsightBtn: 'AI পরামর্শ',
      noRecords: 'কোনো তথ্য নেই',
      noRecordsTitle: 'কোনো রেকর্ড পাওয়া যায়নি',
      noRecordsDesc: 'অনুগ্রহ করে রাজ্য বা জেলা পরিবর্তন করুন।',
      resetButton: 'ফিল্টার রিসেট করুন',
      today: 'আজ',
      minsAgo: 'মিনিট আগে'
    },
    chartModal: {
      title: 'ঐতিহাসিক মূল্য ট্রেন্ড',
      subtitle: '১৪ দিনের দর ওঠানামা ও আমদানি বিশ্লেষণ',
      trendLabel: 'মূল্য ট্রেন্ড',
      arrivalVolume: 'আমদানি (টন)',
      modalPrice: 'মডেল দর',
      buyingPrice: 'সর্বনিম্ন দর',
      sellingPrice: 'সর্বোচ্চ দর',
      sevenDayDiff: '৭ দিনের পরিবর্তন',
      close: 'বন্ধ করুন'
    },
    insightModal: {
      title: 'AI বাজার পরামর্শ',
      subtitle: 'আমদানির ভিত্তিতে মূল্য পূর্বাভাস',
      marketOutlook: 'বাজারের পরিস্থিতি',
      recommendedAction: 'পরামর্শিত কৌশল',
      bestAlternative: 'বিকল্প সেরা মান্ডি',
      keyFactors: 'প্রধান কারণসমূহ',
      bullish: 'ঊর্ধ্বমুখী (দর বৃদ্ধির সম্ভাবনা)',
      bearish: 'নিম্নমুখী (দর কমার সম্ভাবনা)',
      stable: 'স্থিতিশীল',
      close: 'বন্ধ করুন'
    },
    setupModal: {
      title: 'এগ্রিমার্কেট লাইভে স্বাগতম',
      subtitle: 'আপনার অঞ্চল অনুসারে ভাষা ও স্থান বেছে নিন',
      locationPrompt: 'আপনার রাজ্য কোনটি?',
      detectLocationBtn: 'আমার অবস্থান শনাক্ত করুন (GPS)',
      detecting: 'শনাক্ত করা হচ্ছে...',
      locationDetected: 'অবস্থান শনাক্ত হয়েছে',
      stateSelectLabel: 'রাজ্য নির্বাচন করুন:',
      chooseState: 'রাজ্য বেছে নিন',
      recommendedLangBadge: 'আপনার অঞ্চলের জন্য প্রস্তাবিত ভাষা',
      selectLanguageLabel: 'পছন্দের ভাষা বেছে নিন:',
      setDefaultStateToggle: 'আমার রাজ্যটি ডিফল্ট হিসেবে সেট করুন',
      saveAndContinueBtn: 'সংরক্ষণ করে শুরু করুন',
      skipForNow: 'ইংরেজিতে চালিয়ে যান',
      changeAnytimeNote: 'আপনি উপরের হেডার থেকে যেকোনো সময় ভাষা পরিবর্তন করতে পারেন।'
    },
    header: {
      changeLanguageBtn: 'ভাষা ও স্থান',
      refresh: 'নতুন দর'
    }
  }
};

// Commodity multilingual names mapping for visual clarity
export const COMMODITY_LOCALIZED_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  "Sugar Cane": {
    en: "Sugar Cane",
    hi: "गन्ना (Sugar Cane)",
    pa: "ਗੰਨਾ (Sugar Cane)",
    mr: "ऊस (Sugar Cane)",
    gu: "શેરડી (Sugar Cane)",
    kn: "ಕಬ್ಬು (Sugar Cane)",
    ta: "கரும்பு (Sugar Cane)",
    te: "చెరకు (Sugar Cane)",
    bn: "আখ (Sugar Cane)"
  },
  "Wheat": {
    en: "Wheat",
    hi: "गेहूं (Wheat)",
    pa: "ਕਣਕ (Wheat)",
    mr: "गहू (Wheat)",
    gu: "ઘઉં (Wheat)",
    kn: "ಗೋಧಿ (Wheat)",
    ta: "கோதுமை (Wheat)",
    te: "గోధుమలు (Wheat)",
    bn: "গম (Wheat)"
  },
  "Rice / Paddy": {
    en: "Rice / Paddy",
    hi: "धान / चावल (Paddy)",
    pa: "ਝੋਨਾ / ਚਾਵਲ (Paddy)",
    mr: "भात / तांदूळ (Paddy)",
    gu: "ડાંગર / ચોખા (Paddy)",
    kn: "ಭತ್ತ / ಅಕ್ಕಿ (Paddy)",
    ta: "நெல் / அரிசி (Paddy)",
    te: "వరి / బియ్యం (Paddy)",
    bn: "ধান / চাল (Paddy)"
  },
  "Cotton": {
    en: "Cotton",
    hi: "कपास (Cotton)",
    pa: "ਕਪਾਹ (Cotton)",
    mr: "कापूस (Cotton)",
    gu: "કપાસ (Cotton)",
    kn: "ಹತ್ತಿ (Cotton)",
    ta: "பருத்தி (Cotton)",
    te: "పత్తి (Cotton)",
    bn: "তুলা (Cotton)"
  },
  "Soybean": {
    en: "Soybean",
    hi: "सोयाबीन (Soybean)",
    pa: "ਸੋਇਆਬੀਨ (Soybean)",
    mr: "सोयाबीन (Soybean)",
    gu: "સોયાબીન (Soybean)",
    kn: "ಸೋಯಾಬೀನ್ (Soybean)",
    ta: "சோயாபீன் (Soybean)",
    te: "సోయాబీన్ (Soybean)",
    bn: "সয়াবিন (Soybean)"
  },
  "Onion": {
    en: "Onion",
    hi: "प्याज़ (Onion)",
    pa: "ਪਿਆਜ਼ (Onion)",
    mr: "कांदा (Onion)",
    gu: "ડુંગળી (Onion)",
    kn: "ಈರುಳ್ಳಿ (Onion)",
    ta: "வெங்காயம் (Onion)",
    te: "ఉల్లిపాయ (Onion)",
    bn: "পেঁয়াজ (Onion)"
  },
  "Potato": {
    en: "Potato",
    hi: "आलू (Potato)",
    pa: "ਆਲੂ (Potato)",
    mr: "बटाटा (Potato)",
    gu: "બટાટા (Potato)",
    kn: "ಆಲೂಗಡ್ಡೆ (Potato)",
    ta: "உருளைக்கிழங்கு (Potato)",
    te: "బంగాళాదుంప (Potato)",
    bn: "আলু (Potato)"
  },
  "Tomato": {
    en: "Tomato",
    hi: "टमाटर (Tomato)",
    pa: "ਟਮਾਟਰ (Tomato)",
    mr: "टोमॅटो (Tomato)",
    gu: "ટામેટા (Tomato)",
    kn: "ಟೊಮ್ಯಾಟೊ (Tomato)",
    ta: "தக்காளி (Tomato)",
    te: "టమోటా (Tomato)",
    bn: "টমেটো (Tomato)"
  },
  "Mustard": {
    en: "Mustard",
    hi: "सरसों (Mustard)",
    pa: "ਸਰ੍ਹੋਂ (Mustard)",
    mr: "मोहरी (Mustard)",
    gu: "રાઈ / સરસવ (Mustard)",
    kn: "ಸಾಸಿವೆ (Mustard)",
    ta: "கடுகு (Mustard)",
    te: "ఆవాలు (Mustard)",
    bn: "সরিষা (Mustard)"
  },
  "Garlic": {
    en: "Garlic",
    hi: "लहसुन (Garlic)",
    pa: "ਲਸਣ (Garlic)",
    mr: "लसूण (Garlic)",
    gu: "લસણ (Garlic)",
    kn: "ಬೆಳ್ಳುಳ್ಳಿ (Garlic)",
    ta: "பூண்டு (Garlic)",
    te: "వెల్లుల్లి (Garlic)",
    bn: "রসুন (Garlic)"
  },
  "Apple": {
    en: "Apple",
    hi: "सेब (Apple)",
    pa: "ਸੇਬ (Apple)",
    mr: "सफरचंद (Apple)",
    gu: "સફરજન (Apple)",
    kn: "ಸೇಬು (Apple)",
    ta: "ஆப்பிள் (Apple)",
    te: "యాపిల్ (Apple)",
    bn: "আপেল (Apple)"
  },
  "Chilli (Red)": {
    en: "Chilli (Red)",
    hi: "लाल मिर्च (Red Chilli)",
    pa: "ਲਾਲ ਮਿਰਚ (Red Chilli)",
    mr: "लाल मिरची (Red Chilli)",
    gu: "લાલ મરચું (Red Chilli)",
    kn: "ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ (Red Chilli)",
    ta: "சிவப்பு மிளகாய் (Red Chilli)",
    te: "ఎర్ర మిరపకాయ (Red Chilli)",
    bn: "লাল মরিচ (Red Chilli)"
  },
  "Turmeric": {
    en: "Turmeric",
    hi: "हल्दी (Turmeric)",
    pa: "ਹਲਦੀ (Turmeric)",
    mr: "हळद (Turmeric)",
    gu: "હળદર (Turmeric)",
    kn: "ಅರಿಶಿನ (Turmeric)",
    ta: "மஞ்சள் (Turmeric)",
    te: "పసుపు (Turmeric)",
    bn: "হলুদ (Turmeric)"
  },
  "Maize": {
    en: "Maize",
    hi: "मक्का (Maize)",
    pa: "ਮੱਕੀ (Maize)",
    mr: "मका (Maize)",
    gu: "મકાઈ (Maize)",
    kn: "ಮೆಕ್ಕೆಜೋಳ (Maize)",
    ta: "மக்காச்சோளம் (Maize)",
    te: "మొక్కజొన్న (Maize)",
    bn: "ভুট্টা (Maize)"
  }
};
