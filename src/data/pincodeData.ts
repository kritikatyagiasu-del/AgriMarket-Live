export interface PincodeLookupResult {
  district: string;
  state: string;
  mandiSuggestion?: string;
}

// Prefix to State & District mappings for major agricultural hubs & general Indian Postal circles
export const PINCODE_PREFIX_MAP: Record<string, { state: string; district: string; mandi?: string }> = {
  // Uttarakhand (248, 249, 262, 263)
  '249401': { state: 'Uttarakhand', district: 'Haridwar', mandi: 'Laksar APMC (Sugarcane Hub)' },
  '249402': { state: 'Uttarakhand', district: 'Haridwar', mandi: 'Roorkee Mandi' },
  '249408': { state: 'Uttarakhand', district: 'Haridwar', mandi: 'Laksar APMC (Sugarcane Hub)' },
  '249404': { state: 'Uttarakhand', district: 'Haridwar', mandi: 'Roorkee Mandi' },
  '249': { state: 'Uttarakhand', district: 'Haridwar', mandi: 'Laksar APMC (Sugarcane Hub)' },
  
  '248001': { state: 'Uttarakhand', district: 'Dehradun', mandi: 'Dehradun APMC (Niranjanpur Mandi)' },
  '248': { state: 'Uttarakhand', district: 'Dehradun', mandi: 'Dehradun APMC (Niranjanpur Mandi)' },
  
  '263153': { state: 'Uttarakhand', district: 'Udham Singh Nagar', mandi: 'Rudrapur APMC (Galla Mandi)' },
  '244713': { state: 'Uttarakhand', district: 'Udham Singh Nagar', mandi: 'Kashipur Mandi' },
  '262405': { state: 'Uttarakhand', district: 'Udham Singh Nagar', mandi: 'Kashipur Mandi' },
  '263139': { state: 'Uttarakhand', district: 'Nainital', mandi: 'Haldwani APMC (Mandi Samiti)' },
  '263126': { state: 'Uttarakhand', district: 'Nainital', mandi: 'Ramnagar Mandi' },
  '263': { state: 'Uttarakhand', district: 'Nainital', mandi: 'Haldwani APMC (Mandi Samiti)' },

  // Maharashtra (416, 422, 411, 400, etc.)
  '416001': { state: 'Maharashtra', district: 'Kolhapur', mandi: 'Kolhapur Jaggery & Grain Mandi' },
  '416': { state: 'Maharashtra', district: 'Kolhapur', mandi: 'Kolhapur Jaggery & Grain Mandi' },
  '422001': { state: 'Maharashtra', district: 'Nashik', mandi: 'Lasalgaon Onion Yard (Asia #1)' },
  '422': { state: 'Maharashtra', district: 'Nashik', mandi: 'Lasalgaon Onion Yard (Asia #1)' },
  '411': { state: 'Maharashtra', district: 'Pune', mandi: 'Pune APMC Market' },
  '400': { state: 'Maharashtra', district: 'Mumbai Suburban', mandi: 'Vashi APMC Navi Mumbai' },

  // Punjab (141, 143, 151, 144)
  '141001': { state: 'Punjab', district: 'Ludhiana', mandi: 'Khanna Grain Market (Asia’s Largest)' },
  '141': { state: 'Punjab', district: 'Ludhiana', mandi: 'Khanna Grain Market (Asia’s Largest)' },
  '143001': { state: 'Punjab', district: 'Amritsar', mandi: 'Amritsar Grain Mandi (Bhagtanwala)' },
  '143': { state: 'Punjab', district: 'Amritsar', mandi: 'Amritsar Grain Mandi (Bhagtanwala)' },
  '151001': { state: 'Punjab', district: 'Bathinda', mandi: 'Bathinda Cotton & Grain Mandi' },
  '151': { state: 'Punjab', district: 'Bathinda', mandi: 'Bathinda Cotton & Grain Mandi' },
  '144': { state: 'Punjab', district: 'Jalandhar', mandi: 'Jalandhar Grain Market' },

  // Uttar Pradesh (282, 226, 221, etc.)
  '282001': { state: 'Uttar Pradesh', district: 'Agra', mandi: 'Agra Potato & Mustard Mandi (Khandari)' },
  '282': { state: 'Uttar Pradesh', district: 'Agra', mandi: 'Agra Potato & Mustard Mandi (Khandari)' },
  '226001': { state: 'Uttar Pradesh', district: 'Lucknow', mandi: 'Lucknow Dubagga Mandi' },
  '226': { state: 'Uttar Pradesh', district: 'Lucknow', mandi: 'Lucknow Dubagga Mandi' },
  '221001': { state: 'Uttar Pradesh', district: 'Varanasi', mandi: 'Varanasi Chandasi Mandi' },
  '221': { state: 'Uttar Pradesh', district: 'Varanasi', mandi: 'Varanasi Chandasi Mandi' },

  // Gujarat (360, 384, 380, 395)
  '360001': { state: 'Gujarat', district: 'Rajkot', mandi: 'Rajkot APMC (Bedi Yard)' },
  '360': { state: 'Gujarat', district: 'Rajkot', mandi: 'Rajkot APMC (Bedi Yard)' },
  '384170': { state: 'Gujarat', district: 'Mehsana', mandi: 'Unjha Spices & Cumin APMC' },
  '384': { state: 'Gujarat', district: 'Mehsana', mandi: 'Unjha Spices & Cumin APMC' },
  '380': { state: 'Gujarat', district: 'Ahmedabad', mandi: 'Ahmedabad APMC' },

  // Madhya Pradesh (452, 458, 462)
  '452001': { state: 'Madhya Pradesh', district: 'Indore', mandi: 'Indore Mandi (Choithram)' },
  '452': { state: 'Madhya Pradesh', district: 'Indore', mandi: 'Indore Mandi (Choithram)' },
  '458001': { state: 'Madhya Pradesh', district: 'Mandsaur', mandi: 'Mandsaur Garlic & Soybean Mandi' },
  '458': { state: 'Madhya Pradesh', district: 'Mandsaur', mandi: 'Mandsaur Garlic & Soybean Mandi' },
  '462': { state: 'Madhya Pradesh', district: 'Bhopal', mandi: 'Bhopal Karond Mandi' },

  // Rajasthan (324, 302)
  '324001': { state: 'Rajasthan', district: 'Kota', mandi: 'Ramganj Mandi (Coriander Hub)' },
  '324': { state: 'Rajasthan', district: 'Kota', mandi: 'Ramganj Mandi (Coriander Hub)' },
  '302': { state: 'Rajasthan', district: 'Jaipur', mandi: 'Jaipur Muhana Mandi' },

  // Andhra Pradesh & Telangana (522, 503, 500)
  '522001': { state: 'Andhra Pradesh', district: 'Guntur', mandi: 'Guntur Chilli Yard (Asia\'s Largest)' },
  '522': { state: 'Andhra Pradesh', district: 'Guntur', mandi: 'Guntur Chilli Yard (Asia\'s Largest)' },
  '503001': { state: 'Telangana', district: 'Nizamabad', mandi: 'Nizamabad Turmeric Yard' },
  '503': { state: 'Telangana', district: 'Nizamabad', mandi: 'Nizamabad Turmeric Yard' },
  '500': { state: 'Telangana', district: 'Hyderabad', mandi: 'Bowenpally Market Yard' },

  // Karnataka (560, 570)
  '560001': { state: 'Karnataka', district: 'Bengaluru Urban', mandi: 'Yeshwanthpur APMC Bangalore' },
  '560': { state: 'Karnataka', district: 'Bengaluru Urban', mandi: 'Yeshwanthpur APMC Bangalore' },

  // Tamil Nadu (641, 600)
  '641001': { state: 'Tamil Nadu', district: 'Coimbatore', mandi: 'Mettupalayam Veg APMC' },
  '641301': { state: 'Tamil Nadu', district: 'Coimbatore', mandi: 'Mettupalayam Veg APMC' },
  '641': { state: 'Tamil Nadu', district: 'Coimbatore', mandi: 'Mettupalayam Veg APMC' },
  '600': { state: 'Tamil Nadu', district: 'Chennai', mandi: 'Koyambedu Wholesale Market' },

  // West Bengal (712, 700)
  '712101': { state: 'West Bengal', district: 'Hooghly', mandi: 'Sheoraphuli Market (Hooghly)' },
  '712': { state: 'West Bengal', district: 'Hooghly', mandi: 'Sheoraphuli Market (Hooghly)' },
  '700': { state: 'West Bengal', district: 'Kolkata', mandi: 'Posta Bazar Wholesale Mandi' },

  // Haryana (132, 121, 122)
  '132001': { state: 'Haryana', district: 'Karnal', mandi: 'Karnal Basmati Rice Yard' },
  '132': { state: 'Haryana', district: 'Karnal', mandi: 'Karnal Basmati Rice Yard' },
  '121': { state: 'Haryana', district: 'Faridabad', mandi: 'Faridabad Mandi' },
  '122': { state: 'Haryana', district: 'Gurugram', mandi: 'Gurugram Grain Mandi' },

  // General 2-Digit Indian Postal Circle Rules
  '11': { state: 'Delhi', district: 'New Delhi', mandi: 'Azadpur APMC Mandi' },
  '12': { state: 'Haryana', district: 'Karnal', mandi: 'Karnal Basmati Rice Yard' },
  '13': { state: 'Haryana', district: 'Karnal', mandi: 'Karnal Basmati Rice Yard' },
  '14': { state: 'Punjab', district: 'Ludhiana', mandi: 'Khanna Grain Market (Asia’s Largest)' },
  '15': { state: 'Punjab', district: 'Bathinda', mandi: 'Bathinda Cotton & Grain Mandi' },
  '16': { state: 'Punjab', district: 'Chandigarh', mandi: 'Sector 26 Grain Market' },
  '17': { state: 'Himachal Pradesh', district: 'Shimla', mandi: 'Dhalli Fruit & Apple Mandi' },
  '18': { state: 'Jammu & Kashmir', district: 'Jammu', mandi: 'Narwal Fruit Mandi' },
  '19': { state: 'Jammu & Kashmir', district: 'Srinagar', mandi: 'Parimpora Fruit Mandi' },
  '20': { state: 'Uttar Pradesh', district: 'Agra', mandi: 'Agra Potato & Mustard Mandi (Khandari)' },
  '21': { state: 'Uttar Pradesh', district: 'Prayagraj', mandi: 'Mundera Mandi' },
  '22': { state: 'Uttar Pradesh', district: 'Lucknow', mandi: 'Lucknow Dubagga Mandi' },
  '23': { state: 'Uttar Pradesh', district: 'Varanasi', mandi: 'Varanasi Chandasi Mandi' },
  '24': { state: 'Uttarakhand', district: 'Haridwar', mandi: 'Laksar APMC (Sugarcane Hub)' },
  '25': { state: 'Uttar Pradesh', district: 'Meerut', mandi: 'Meerut Mandi' },
  '26': { state: 'Uttarakhand', district: 'Udham Singh Nagar', mandi: 'Rudrapur APMC (Galla Mandi)' },
  '27': { state: 'Uttar Pradesh', district: 'Gorakhpur', mandi: 'Gorakhpur Mandi' },
  '28': { state: 'Uttar Pradesh', district: 'Agra', mandi: 'Agra Potato & Mustard Mandi (Khandari)' },
  '30': { state: 'Rajasthan', district: 'Jaipur', mandi: 'Jaipur Muhana Mandi' },
  '31': { state: 'Rajasthan', district: 'Udaipur', mandi: 'Udaipur Krishi Mandi' },
  '32': { state: 'Rajasthan', district: 'Kota', mandi: 'Ramganj Mandi (Coriander Hub)' },
  '33': { state: 'Rajasthan', district: 'Bikaner', mandi: 'Bikaner Grain Mandi' },
  '34': { state: 'Rajasthan', district: 'Jodhpur', mandi: 'Jodhpur Mandi' },
  '36': { state: 'Gujarat', district: 'Rajkot', mandi: 'Rajkot APMC (Bedi Yard)' },
  '37': { state: 'Gujarat', district: 'Kutch', mandi: 'Bhuj APMC' },
  '38': { state: 'Gujarat', district: 'Mehsana', mandi: 'Unjha Spices & Cumin APMC' },
  '39': { state: 'Gujarat', district: 'Surat', mandi: 'Surat APMC' },
  '40': { state: 'Maharashtra', district: 'Mumbai', mandi: 'Vashi APMC Navi Mumbai' },
  '41': { state: 'Maharashtra', district: 'Kolhapur', mandi: 'Kolhapur Jaggery & Grain Mandi' },
  '42': { state: 'Maharashtra', district: 'Nashik', mandi: 'Lasalgaon Onion Yard (Asia #1)' },
  '43': { state: 'Maharashtra', district: 'Aurangabad', mandi: 'Jalna Seed Mandi' },
  '44': { state: 'Maharashtra', district: 'Nagpur', mandi: 'Nagpur Orange Mandi' },
  '45': { state: 'Madhya Pradesh', district: 'Indore', mandi: 'Indore Mandi (Choithram)' },
  '46': { state: 'Madhya Pradesh', district: 'Bhopal', mandi: 'Bhopal Karond Mandi' },
  '47': { state: 'Madhya Pradesh', district: 'Gwalior', mandi: 'Laxmiganj Mandi Gwalior' },
  '48': { state: 'Madhya Pradesh', district: 'Jabalpur', mandi: 'Krishi Upaj Mandi Jabalpur' },
  '49': { state: 'Chhattisgarh', district: 'Raipur', mandi: 'Raipur Grain Mandi' },
  '50': { state: 'Telangana', district: 'Nizamabad', mandi: 'Nizamabad Turmeric Yard' },
  '51': { state: 'Andhra Pradesh', district: 'Kurnool', mandi: 'Kurnool APMC' },
  '52': { state: 'Andhra Pradesh', district: 'Guntur', mandi: 'Guntur Chilli Yard (Asia\'s Largest)' },
  '53': { state: 'Andhra Pradesh', district: 'Visakhapatnam', mandi: 'Anakapalle Jaggery Mandi' },
  '56': { state: 'Karnataka', district: 'Bengaluru Urban', mandi: 'Yeshwanthpur APMC Bangalore' },
  '57': { state: 'Karnataka', district: 'Mysuru', mandi: 'Bandipalya APMC Mysuru' },
  '58': { state: 'Karnataka', district: 'Hubballi-Dharwad', mandi: 'Amargol APMC Hubballi' },
  '59': { state: 'Karnataka', district: 'Belagavi', mandi: 'Belgaum APMC' },
  '60': { state: 'Tamil Nadu', district: 'Chennai', mandi: 'Koyambedu Wholesale Market' },
  '61': { state: 'Tamil Nadu', district: 'Thanjavur', mandi: 'Thanjavur Paddy Mandi' },
  '62': { state: 'Tamil Nadu', district: 'Madurai', mandi: 'Mattuthavani Central Market' },
  '63': { state: 'Tamil Nadu', district: 'Salem', mandi: 'Salem Mango & Veg Mandi' },
  '64': { state: 'Tamil Nadu', district: 'Coimbatore', mandi: 'Mettupalayam Veg APMC' },
  '67': { state: 'Kerala', district: 'Ernakulam', mandi: 'Cochin Spices Exchange' },
  '68': { state: 'Kerala', district: 'Kottayam', mandi: 'Rubber & Spices Board Market' },
  '69': { state: 'Kerala', district: 'Thiruvananthapuram', mandi: 'Chalai Market' },
  '70': { state: 'West Bengal', district: 'Kolkata', mandi: 'Posta Bazar Wholesale Mandi' },
  '71': { state: 'West Bengal', district: 'Hooghly', mandi: 'Sheoraphuli Market (Hooghly)' },
  '72': { state: 'West Bengal', district: 'Bardhaman', mandi: 'Burdwan Paddy Market' },
  '73': { state: 'West Bengal', district: 'Siliguri', mandi: 'Siliguri Regulated Market' },
  '74': { state: 'West Bengal', district: 'North 24 Parganas', mandi: 'Barasat Mandi' },
  '75': { state: 'Odisha', district: 'Bhubaneswar', mandi: 'Unit-1 Daily Market' },
  '76': { state: 'Odisha', district: 'Cuttack', mandi: 'Chhatra Bazar' },
  '78': { state: 'Assam', district: 'Guwahati', mandi: 'Pamohi Wholesale Market' },
  '80': { state: 'Bihar', district: 'Patna', mandi: 'Bazar Samiti Bazar Patna' },
  '81': { state: 'Bihar', district: 'Bhagalpur', mandi: 'Bhagalpur Mandi' },
  '82': { state: 'Bihar', district: 'Gaya', mandi: 'Gaya Galla Mandi' },
  '83': { state: 'Jharkhand', district: 'Ranchi', mandi: 'Pandra Market Yard Ranchi' },
  '84': { state: 'Bihar', district: 'Muzaffarpur', mandi: 'Litchi & Galla Mandi Muzaffarpur' },
  '85': { state: 'Bihar', district: 'Purnea', mandi: 'Gulabbagh Mandi (Asia Maize Hub)' }
};

/**
 * Auto-resolves state and district from a 6-digit Indian PIN code
 */
export function lookupPincode(pincode: string): PincodeLookupResult | null {
  const cleanPin = pincode.trim().replace(/\D/g, '');
  if (cleanPin.length < 2) return null;

  // 1. Exact 6-digit match
  if (cleanPin.length === 6 && PINCODE_PREFIX_MAP[cleanPin]) {
    const data = PINCODE_PREFIX_MAP[cleanPin];
    return { district: data.district, state: data.state, mandiSuggestion: data.mandi };
  }

  // 2. Exact 3-digit prefix match
  if (cleanPin.length >= 3) {
    const prefix3 = cleanPin.substring(0, 3);
    if (PINCODE_PREFIX_MAP[prefix3]) {
      const data = PINCODE_PREFIX_MAP[prefix3];
      return { district: data.district, state: data.state, mandiSuggestion: data.mandi };
    }
  }

  // 3. 2-digit circle match
  const prefix2 = cleanPin.substring(0, 2);
  if (PINCODE_PREFIX_MAP[prefix2]) {
    const data = PINCODE_PREFIX_MAP[prefix2];
    return { district: data.district, state: data.state, mandiSuggestion: data.mandi };
  }

  return null;
}
