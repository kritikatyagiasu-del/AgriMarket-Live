import { MandiPriceRecord, StateDistrictMandiMap, PriceTrendPoint } from '../types';

export const STATE_DISTRICT_MANDI_DATA: StateDistrictMandiMap = {
  "Uttarakhand": {
    "Udham Singh Nagar": ["Rudrapur APMC (Galla Mandi)", "Kashipur Mandi", "Khatima APMC", "Kichha Mandi", "Gadarpur APMC"],
    "Haridwar": ["Laksar APMC (Sugarcane Hub)", "Roorkee Mandi", "Haridwar APMC", "Bhagwanpur Mandi"],
    "Dehradun": ["Dehradun APMC (Niranjanpur Mandi)", "Rishikesh Mandi", "Vikasnagar APMC"],
    "Nainital": ["Haldwani APMC (Mandi Samiti)", "Ramnagar Mandi", "Kaladhungi APMC"],
    "Tehri Garhwal": ["Narendranagar Mandi", "Chamba Mandi"],
    "Pauri Garhwal": ["Kotdwar APMC", "Srinagar Mandi"]
  },
  "Maharashtra": {
    "Nashik": ["Nashik APMC", "Lasalgaon Mandi", "Pimplgaon Mandi", "Yeola Mandi"],
    "Pune": ["Pune Grain Market", "Manchar APMC", "Baramati APMC", "Junner APMC"],
    "Nagpur": ["Nagpur Cotton & Grain APMC", "Kalameshwar Mandi", "Katol APMC"],
    "Ahmednagar": ["Ahmednagar APMC", "Rahuri Mandi", "Sangamner APMC"],
    "Kolhapur": ["Kolhapur Jaggery & Grain Mandi", "Gadhinglaj APMC"]
  },
  "Punjab": {
    "Ludhiana": ["Khanna Mandi (Asia's Largest)", "Ludhiana Central APMC", "Jagraon Mandi"],
    "Amritsar": ["Amritsar Grain Market", "Rayya Mandi", "Jandiala Guru APMC"],
    "Patiala": ["Patiala APMC", "Nabha Mandi", "Rajpura Grain Market"],
    "Bathinda": ["Bathinda Cotton & Grain Mandi", "Raman Mandi", "Mauri APMC"]
  },
  "Uttar Pradesh": {
    "Agra": ["Agra APMC", "Fatehabad Mandi", "Shamsabad APMC"],
    "Lucknow": ["Dubagga Grain & Veg Mandi", "Naveen Galla Mandi Lucknow", "Banthra APMC"],
    "Kanpur Nagar": ["Chakeri Mandi", "Rawatpur APMC", "Kanpur Grain Market"],
    "Varanasi": ["Varanasi APMC", "Pindra Mandi", "Chandauli Border Market"]
  },
  "Gujarat": {
    "Rajkot": ["Rajkot APMC", "Gondal Mandi", "Jetpur APMC"],
    "Ahmedabad": ["Jamalpur APMC", "Sanand Mandi", "Bavla APMC"],
    "Surat": ["Surat APMC", "Bardoli Mandi", "Vyara APMC"],
    "Banaskantha": ["Palanpur APMC", "Deesa Potato Mandi", "Dhanera APMC"]
  },
  "Madhya Pradesh": {
    "Indore": ["Indore Devi Ahilya APMC", "Mhow Mandi", "Sanwer APMC"],
    "Ujjain": ["Ujjain APMC", "Nagda Mandi", "Khachrod APMC"],
    "Bhopal": ["Karond Mandi Bhopal", "Berasia APMC"],
    "Mandsaur": ["Mandsaur Garlic & Grain APMC", "Neemuch APMC"]
  },
  "Rajasthan": {
    "Kota": ["Kota APMC Bhamashah Mandi", "Ramganj Mandi (Coriander Hub)", "Itawa APMC"],
    "Jaipur": ["Mahanandpura Mandi Jaipur", "Chomu Veg APMC", "Kotputli Mandi"],
    "Ganganagar": ["Sri Ganganagar Grain APMC", "Raisinghnagar Mandi"],
    "Jodhpur": ["Jodhpur Spices & Grain APMC", "Piparcity Mandi"]
  },
  "Karnataka": {
    "Bengaluru Urban": ["Yeshwanthpur APMC Market", "Binny Mill Grain Market", "KR Market"],
    "Belagavi": ["Belagavi APMC", "Chikkodi Mandi", "Bailhongal APMC"],
    "Mysuru": ["Mysuru Bandipalya APMC", "Nanjangud Mandi"],
    "Shimoga": ["Shimoga APMC", "Sagar Mandi"]
  },
  "Tamil Nadu": {
    "Chennai": ["Koyambedu Wholesale Market", "Madhavaram APMC"],
    "Coimbatore": ["Mettupalayam Veg APMC", "Coimbatore APMC"],
    "Madurai": ["Madurai Mattuthavani Market", "Melur Mandi"],
    "Erode": ["Erode Turmeric Market", "Perundurai APMC"]
  },
  "Telangana": {
    "Nizamabad": ["Nizamabad Turmeric & Grain APMC", "Armoor Mandi"],
    "Warangal": ["Warangal Cotton & Chilli Market", "Jangaon APMC"],
    "Hyderabad": ["Gudimalkapur APMC", "Bowenpally Wholesale Veg Market"]
  },
  "Andhra Pradesh": {
    "Guntur": ["Guntur Chilli Yard (Asia's Largest)", "Tenali APMC"],
    "Krishna": ["Vijayawada APMC", "Gudivada Mandi"],
    "Kurnool": ["Kurnool Onion Yard", "Adoni Cotton Market"]
  },
  "Haryana": {
    "Karnal": ["Karnal Basmati Rice Market", "Gharaunda Mandi"],
    "Hisar": ["Hisar APMC", "Hansi Mandi"],
    "Ambala": ["Ambala Cantt Mandi", "Mullana APMC"]
  },
  "West Bengal": {
    "Kolkata": ["Koley Market Wholesale", "Mechua Fruit Market"],
    "Hooghly": ["Singur Potato Mandi", "Tarakeswar APMC"],
    "Nadia": ["Ranaghat Veg Market", "Bethuadahari Mandi"]
  },
  "Bihar": {
    "Patna": ["Patna APMC (Mithapur)", "Fatuha Mandi"],
    "Muzaffarpur": ["Muzaffarpur APMC (Fruit & Grain Market)"]
  },
  "Himachal Pradesh": {
    "Shimla": ["Shimla Apple Market (Dhalli)", "Solan Vegetable Mandi"]
  },
  "Odisha": {
    "Cuttack": ["Cuttack Malgodown Market", "Chhatrabazar APMC"]
  }
};

export const INITIAL_MANDI_RECORDS: MandiPriceRecord[] = [
  // --- UTTARAKHAND MANDI RECORDS (Featured) ---
  {
    id: "mandi-uk-001",
    state: "Uttarakhand",
    district: "Haridwar",
    market: "Laksar APMC (Sugarcane Hub)",
    commodity: "Sugar Cane",
    variety: "Sugarcane Co 0238 - Factory Grade",
    buyingPrice: 355,
    sellingPrice: 395,
    modalPrice: 375,
    lastUpdated: "2026-08-12T11:30:00Z",
    arrivalVolumeTonnes: 1450,
    category: "Commercial & Sugarcane",
    priceChange7d: 3.2
  },
  {
    id: "mandi-uk-002",
    state: "Uttarakhand",
    district: "Udham Singh Nagar",
    market: "Rudrapur APMC (Galla Mandi)",
    commodity: "Wheat",
    variety: "PBW 343 - Lokwan Grade A",
    buyingPrice: 2280,
    sellingPrice: 2480,
    modalPrice: 2380,
    lastUpdated: "2026-08-12T11:15:00Z",
    arrivalVolumeTonnes: 890,
    category: "Cereals & Pulses",
    priceChange7d: 1.5
  },
  {
    id: "mandi-uk-003",
    state: "Uttarakhand",
    district: "Dehradun",
    market: "Dehradun APMC (Niranjanpur Mandi)",
    commodity: "Paddy (Dhan)",
    variety: "Dehradun Type-3 Basmati",
    buyingPrice: 4100,
    sellingPrice: 4500,
    modalPrice: 4300,
    lastUpdated: "2026-08-12T10:45:00Z",
    arrivalVolumeTonnes: 320,
    category: "Cereals & Pulses",
    priceChange7d: 4.1
  },
  {
    id: "mandi-uk-004",
    state: "Uttarakhand",
    district: "Nainital",
    market: "Haldwani APMC (Mandi Samiti)",
    commodity: "Apple",
    variety: "Royal Delicious - Grade 1",
    buyingPrice: 6500,
    sellingPrice: 7800,
    modalPrice: 7200,
    lastUpdated: "2026-08-12T09:30:00Z",
    arrivalVolumeTonnes: 210,
    category: "Fruits",
    priceChange7d: 5.8
  },
  {
    id: "mandi-uk-005",
    state: "Uttarakhand",
    district: "Nainital",
    market: "Ramnagar Mandi",
    commodity: "Green Peas (Matar)",
    variety: "Arkel Fresh Hill Peas",
    buyingPrice: 2800,
    sellingPrice: 3300,
    modalPrice: 3050,
    lastUpdated: "2026-08-12T10:10:00Z",
    arrivalVolumeTonnes: 140,
    category: "Vegetables",
    priceChange7d: -2.0
  },
  {
    id: "mandi-uk-006",
    state: "Uttarakhand",
    district: "Udham Singh Nagar",
    market: "Kashipur Mandi",
    commodity: "Sugar Cane",
    variety: "Sugarcane Mill Quality",
    buyingPrice: 350,
    sellingPrice: 390,
    modalPrice: 370,
    lastUpdated: "2026-08-12T11:00:00Z",
    arrivalVolumeTonnes: 1100,
    category: "Commercial & Sugarcane",
    priceChange7d: 2.8
  },
  {
    id: "mandi-uk-007",
    state: "Uttarakhand",
    district: "Haridwar",
    market: "Roorkee Mandi",
    commodity: "Wheat",
    variety: "Sharbati Gold - Grain",
    buyingPrice: 2310,
    sellingPrice: 2500,
    modalPrice: 2410,
    lastUpdated: "2026-08-12T08:50:00Z",
    arrivalVolumeTonnes: 620,
    category: "Cereals & Pulses",
    priceChange7d: 0.8
  },

  // --- SUGARCANE & WHEAT REINFORCEMENTS ACROSS INDIA ---
  {
    id: "mandi-up-sugar",
    state: "Uttar Pradesh",
    district: "Agra",
    market: "Shamsabad APMC",
    commodity: "Sugar Cane",
    variety: "Sugarcane UP Commercial",
    buyingPrice: 358,
    sellingPrice: 398,
    modalPrice: 378,
    lastUpdated: "2026-08-12T11:20:00Z",
    arrivalVolumeTonnes: 2100,
    category: "Commercial & Sugarcane",
    priceChange7d: 3.5
  },
  {
    id: "mandi-mh-sugar",
    state: "Maharashtra",
    district: "Kolhapur",
    market: "Kolhapur Jaggery & Grain Mandi",
    commodity: "Sugar Cane",
    variety: "Sugarcane Jaggery Grade 10001",
    buyingPrice: 365,
    sellingPrice: 415,
    modalPrice: 390,
    lastUpdated: "2026-08-12T10:30:00Z",
    arrivalVolumeTonnes: 1800,
    category: "Commercial & Sugarcane",
    priceChange7d: 4.0
  },
  {
    id: "mandi-hr-wheat",
    state: "Haryana",
    district: "Karnal",
    market: "Gharaunda Mandi",
    commodity: "Wheat",
    variety: "HD 2967 Premium Wheat",
    buyingPrice: 2350,
    sellingPrice: 2520,
    modalPrice: 2435,
    lastUpdated: "2026-08-12T11:05:00Z",
    arrivalVolumeTonnes: 950,
    category: "Cereals & Pulses",
    priceChange7d: 1.2
  },
  {
    id: "mandi-mp-wheat",
    state: "Madhya Pradesh",
    district: "Indore",
    market: "Mhow Mandi",
    commodity: "Wheat",
    variety: "MP Sharbati Premium Wheat",
    buyingPrice: 2650,
    sellingPrice: 2920,
    modalPrice: 2785,
    lastUpdated: "2026-08-12T11:10:00Z",
    arrivalVolumeTonnes: 1100,
    category: "Cereals & Pulses",
    priceChange7d: 2.7
  },

  // --- MAHARASHTRA RECORDS ---
  {
    id: "mandi-001",
    state: "Maharashtra",
    district: "Nashik",
    market: "Lasalgaon Mandi",
    commodity: "Onion",
    variety: "Nashik Red - FAQ",
    buyingPrice: 2250,
    sellingPrice: 2680,
    modalPrice: 2450,
    lastUpdated: "2026-08-12T11:15:00Z",
    arrivalVolumeTonnes: 420,
    category: "Vegetables",
    priceChange7d: 4.2
  },
  {
    id: "mandi-002",
    state: "Maharashtra",
    district: "Nashik",
    market: "Pimplgaon Mandi",
    commodity: "Tomato",
    variety: "Hybrid - Grade A",
    buyingPrice: 1800,
    sellingPrice: 2200,
    modalPrice: 2000,
    lastUpdated: "2026-08-12T10:45:00Z",
    arrivalVolumeTonnes: 185,
    category: "Vegetables",
    priceChange7d: -2.5
  },
  {
    id: "mandi-003",
    state: "Maharashtra",
    district: "Nashik",
    market: "Nashik APMC",
    commodity: "Grapes",
    variety: "Thomson Seedless",
    buyingPrice: 4800,
    sellingPrice: 5600,
    modalPrice: 5200,
    lastUpdated: "2026-08-12T09:30:00Z",
    arrivalVolumeTonnes: 90,
    category: "Fruits",
    priceChange7d: 8.1
  },

  // --- PUNJAB RECORDS ---
  {
    id: "mandi-004",
    state: "Punjab",
    district: "Ludhiana",
    market: "Khanna Mandi (Asia's Largest)",
    commodity: "Wheat",
    variety: "Lokwan Premium Wheat",
    buyingPrice: 2380,
    sellingPrice: 2550,
    modalPrice: 2460,
    lastUpdated: "2026-08-12T11:00:00Z",
    arrivalVolumeTonnes: 1250,
    category: "Cereals & Pulses",
    priceChange7d: 1.8
  },
  {
    id: "mandi-005",
    state: "Punjab",
    district: "Amritsar",
    market: "Amritsar Grain Market",
    commodity: "Paddy (Dhan)",
    variety: "1121 Basmati - Super Fine",
    buyingPrice: 3850,
    sellingPrice: 4250,
    modalPrice: 4050,
    lastUpdated: "2026-08-12T10:20:00Z",
    arrivalVolumeTonnes: 840,
    category: "Cereals & Pulses",
    priceChange7d: 3.5
  },
  {
    id: "mandi-006",
    state: "Punjab",
    district: "Bathinda",
    market: "Bathinda Cotton & Grain Mandi",
    commodity: "Cotton",
    variety: "Long Staple - Medium",
    buyingPrice: 6800,
    sellingPrice: 7400,
    modalPrice: 7100,
    lastUpdated: "2026-08-12T08:50:00Z",
    arrivalVolumeTonnes: 310,
    category: "Spices & Cash Crops",
    priceChange7d: -1.2
  },

  // --- UTTAR PRADESH RECORDS ---
  {
    id: "mandi-007",
    state: "Uttar Pradesh",
    district: "Agra",
    market: "Agra APMC",
    commodity: "Potato",
    variety: "Jyoti Fresh",
    buyingPrice: 1250,
    sellingPrice: 1520,
    modalPrice: 1380,
    lastUpdated: "2026-08-12T11:10:00Z",
    arrivalVolumeTonnes: 620,
    category: "Vegetables",
    priceChange7d: 5.6
  },
  {
    id: "mandi-008",
    state: "Uttar Pradesh",
    district: "Lucknow",
    market: "Naveen Galla Mandi Lucknow",
    commodity: "Wheat",
    variety: "UP Sharbati Gold Wheat",
    buyingPrice: 2320,
    sellingPrice: 2510,
    modalPrice: 2415,
    lastUpdated: "2026-08-12T09:40:00Z",
    arrivalVolumeTonnes: 780,
    category: "Cereals & Pulses",
    priceChange7d: 0.9
  },
  {
    id: "mandi-009",
    state: "Uttar Pradesh",
    district: "Varanasi",
    market: "Varanasi APMC",
    commodity: "Mustard",
    variety: "Yellow - High Oil",
    buyingPrice: 5450,
    sellingPrice: 5950,
    modalPrice: 5700,
    lastUpdated: "2026-08-12T10:05:00Z",
    arrivalVolumeTonnes: 175,
    category: "Oilseeds",
    priceChange7d: 2.1
  },

  // --- GUJARAT RECORDS ---
  {
    id: "mandi-010",
    state: "Gujarat",
    district: "Rajkot",
    market: "Rajkot APMC",
    commodity: "Groundnut",
    variety: "Bold Grade I",
    buyingPrice: 6200,
    sellingPrice: 6850,
    modalPrice: 6500,
    lastUpdated: "2026-08-12T11:25:00Z",
    arrivalVolumeTonnes: 490,
    category: "Oilseeds",
    priceChange7d: -0.8
  },
  {
    id: "mandi-011",
    state: "Gujarat",
    district: "Rajkot",
    market: "Gondal Mandi",
    commodity: "Cumin (Jeera)",
    variety: "Unjha Grade A",
    buyingPrice: 24500,
    sellingPrice: 27200,
    modalPrice: 25800,
    lastUpdated: "2026-08-12T10:15:00Z",
    arrivalVolumeTonnes: 65,
    category: "Spices & Cash Crops",
    priceChange7d: 6.4
  },

  // --- MADHYA PRADESH RECORDS ---
  {
    id: "mandi-012",
    state: "Madhya Pradesh",
    district: "Indore",
    market: "Indore Devi Ahilya APMC",
    commodity: "Soyabean",
    variety: "Yellow - Cleaned",
    buyingPrice: 4350,
    sellingPrice: 4780,
    modalPrice: 4550,
    lastUpdated: "2026-08-12T11:05:00Z",
    arrivalVolumeTonnes: 780,
    category: "Oilseeds",
    priceChange7d: 3.1
  },
  {
    id: "mandi-013",
    state: "Madhya Pradesh",
    district: "Mandsaur",
    market: "Mandsaur Garlic & Grain APMC",
    commodity: "Garlic",
    variety: "Desi White Bold",
    buyingPrice: 11200,
    sellingPrice: 13500,
    modalPrice: 12200,
    lastUpdated: "2026-08-12T09:10:00Z",
    arrivalVolumeTonnes: 140,
    category: "Spices & Cash Crops",
    priceChange7d: 11.2
  },

  // --- RAJASTHAN RECORDS ---
  {
    id: "mandi-014",
    state: "Rajasthan",
    district: "Kota",
    market: "Ramganj Mandi (Coriander Hub)",
    commodity: "Coriander",
    variety: "Eagle Green",
    buyingPrice: 7100,
    sellingPrice: 7900,
    modalPrice: 7500,
    lastUpdated: "2026-08-12T10:50:00Z",
    arrivalVolumeTonnes: 260,
    category: "Spices & Cash Crops",
    priceChange7d: -1.5
  },

  // --- ANDHRA PRADESH & TELANGANA RECORDS ---
  {
    id: "mandi-015",
    state: "Andhra Pradesh",
    district: "Guntur",
    market: "Guntur Chilli Yard (Asia's Largest)",
    commodity: "Chilli Red",
    variety: "Teja Super Hot",
    buyingPrice: 18500,
    sellingPrice: 21000,
    modalPrice: 19800,
    lastUpdated: "2026-08-12T11:20:00Z",
    arrivalVolumeTonnes: 540,
    category: "Spices & Cash Crops",
    priceChange7d: 7.8
  },
  {
    id: "mandi-016",
    state: "Telangana",
    district: "Nizamabad",
    market: "Nizamabad Turmeric & Grain APMC",
    commodity: "Turmeric",
    variety: "Finger - Export Grade",
    buyingPrice: 12800,
    sellingPrice: 14200,
    modalPrice: 13500,
    lastUpdated: "2026-08-12T10:00:00Z",
    arrivalVolumeTonnes: 320,
    category: "Spices & Cash Crops",
    priceChange7d: 2.9
  },

  // --- TAMIL NADU, KARNATAKA, WEST BENGAL, HARYANA ---
  {
    id: "mandi-017",
    state: "Karnataka",
    district: "Bengaluru Urban",
    market: "Yeshwanthpur APMC Market",
    commodity: "Rice",
    variety: "Sona Masoori",
    buyingPrice: 3400,
    sellingPrice: 3850,
    modalPrice: 3600,
    lastUpdated: "2026-08-12T11:00:00Z",
    arrivalVolumeTonnes: 410,
    category: "Cereals & Pulses",
    priceChange7d: 1.2
  },
  {
    id: "mandi-018",
    state: "Tamil Nadu",
    district: "Coimbatore",
    market: "Mettupalayam Veg APMC",
    commodity: "Banana",
    variety: "Grand Naine",
    buyingPrice: 1600,
    sellingPrice: 1950,
    modalPrice: 1780,
    lastUpdated: "2026-08-12T09:25:00Z",
    arrivalVolumeTonnes: 280,
    category: "Fruits",
    priceChange7d: -3.0
  },
  {
    id: "mandi-019",
    state: "West Bengal",
    district: "Hooghly",
    market: "Singur Potato Mandi",
    commodity: "Potato",
    variety: "Chandramukhi",
    buyingPrice: 1320,
    sellingPrice: 1580,
    modalPrice: 1450,
    lastUpdated: "2026-08-12T10:40:00Z",
    arrivalVolumeTonnes: 590,
    category: "Vegetables",
    priceChange7d: 4.8
  },
  {
    id: "mandi-020",
    state: "Haryana",
    district: "Karnal",
    market: "Karnal Basmati Rice Market",
    commodity: "Paddy (Dhan)",
    variety: "Pusa 1509 Basmati",
    buyingPrice: 3600,
    sellingPrice: 3950,
    modalPrice: 3780,
    lastUpdated: "2026-08-12T11:12:00Z",
    arrivalVolumeTonnes: 670,
    category: "Cereals & Pulses",
    priceChange7d: 2.3
  }
];

// Helper function to generate smooth, realistic historical trend points
export function generateHistoricalTrendPoints(
  baseModalPrice: number,
  baseBuyingPrice: number,
  baseSellingPrice: number,
  days: number = 30
): PriceTrendPoint[] {
  const points: PriceTrendPoint[] = [];
  const today = new Date();
  
  // Deterministic seed simulation so charts look stable yet organic
  let currentModal = baseModalPrice;
  let currentBuy = baseBuyingPrice;
  let currentSell = baseSellingPrice;
  
  // We generate backwards from today
  for (let i = days - 1; i >= 0; i--) {
    const dateObj = new Date(today);
    dateObj.setDate(today.getDate() - i);
    const dateStr = dateObj.toISOString().split('T')[0];
    
    // Add subtle seasonal volatility (+/- 1.5% daily fluctuation)
    const seed = (dateObj.getDate() * 17 + dateObj.getMonth() * 31 + i * 13) % 100;
    const factor = 1 + (seed - 50) / 2000; // range 0.975 to 1.025
    
    const dayModal = Math.round(currentModal * factor);
    const dayBuy = Math.round(currentBuy * factor);
    const daySell = Math.round(currentSell * factor);
    
    const arrivalVol = Math.round(300 + (seed * 8) % 500);

    points.push({
      date: dateStr,
      buyingPrice: dayBuy,
      sellingPrice: daySell,
      modalPrice: dayModal,
      arrivalVolume: arrivalVol
    });
  }

  return points;
}

// Convert price depending on user selected unit:
// Quintal (100 kg), Per Kg, Per Tonne (1000 kg)
export function formatPriceByUnit(
  priceInQuintal: number,
  unit: 'quintal' | 'kg' | 'tonne'
): { value: number; label: string; formatted: string } {
  if (unit === 'kg') {
    const val = priceInQuintal / 100;
    return {
      value: val,
      label: '₹/kg',
      formatted: `₹${val.toFixed(2)} / kg`
    };
  }
  if (unit === 'tonne') {
    const val = priceInQuintal * 10;
    return {
      value: val,
      label: '₹/Tonne',
      formatted: `₹${val.toLocaleString('en-IN')} / Tonne`
    };
  }
  // Default quintal
  return {
    value: priceInQuintal,
    label: '₹/Quintal',
    formatted: `₹${priceInQuintal.toLocaleString('en-IN')} / Quintal`
  };
}
