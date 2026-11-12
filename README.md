🌾 AgriMarket Live - Mandi Crop Price Tracker
![Image](https://img.shields.io/badge/License-MIT-emerald.svg)
![Image](https://img.shields.io/badge/React-19.0-blue.svg)
![Image](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![Image](https://img.shields.io/badge/TailwindCSS-v4-cyan.svg)
![Image](https://img.shields.io/badge/Google%20Gen%20AI-Gemini%202.5%20Flash-orange.svg)

An intelligent, real-time agricultural mandi price dashboard, arbitrage finder, and AI market trend advisor tailored for Farmers, Wholesalers/Traders, and Exporters across India. Powered by AGMARKNET data structures and Google Gemini 2.5 AI.

🌟 Key Features

1. 🇮🇳 9-Language Multilingual & Regional Localization
Full interface, crop names, market terminology, and AI advisory available in:

English

हिन्दी (Hindi)

ਪੰਜਾਬੀ (Punjabi)

मराठी (Marathi)

ગુજરાતી (Gujarati)

ಕನ್ನಡ (Kannada)

தமிழ் (Tamil)

తెలుగు (Telugu)

বাংলা (Bengali)

Includes automated GPS geolocation and postal PIN code state detection with native dialect suggestions.

2. 📊 Live Mandi Price Tracking & Transparency
Buy vs Sell vs Modal Prices: Clearly displays Wholesaler Buying Rates (what traders pay) and Farmer Selling Rates (what farmers earn) per Quintal.

Hierarchical Cascading Filter: Filter by State, District, Mandi, Crop Category (Cereals, Pulses, Oilseeds, Vegetables, Fruits, Spices, Cash Crops), and free-text search.

7-Day Trend Visualizations: Visual sparkline tags and historical price trajectory graphs.

Daily Arrival Volumes: Displays daily truckloads and metric tonnes arriving at APMCs.

3. 🎯 Best Mandi Finder (Arbitrage & Profit Optimizer)
Compare crop rates across multiple markets in the same or neighboring districts.

Calculates price differentials and highlights top-earning mandis after estimated transport costs.

Identifies the highest-paying market to help farmers maximize crop returns.

4. 🤖 AI Market Advisory (Powered by Gemini 2.5 Flash)
Instant crop market intelligence analyzing 7-day price swings, arrival pressures, and seasonal patterns.

Delivers actionable advice: Sell Now, Hold Stock, or Target Inter-State Mandis.

Highlights key price factors (procurement trends, MSP benchmarks, rainfall/monsoon impact).

Generates responses directly in the farmer's chosen native language.

5. 👥 Role-Based Onboarding & Authentication
Tailored Personas:

Farmer (किसान): Prioritizes selling prices, net realization, best selling mandis, and holding advice.

Buyer / Wholesaler (व्यापारी): Highlights procurement costs, volume discounts, and supply inflows.

Exporter (निर्यातक): Focuses on quality grades, port-connected mandi rates, and bulk supply trends.

Seamless Sign-In Options:

Existing user login with phone/email and PIN.

Social Sign-in via Google and Apple ID.

Fast Guest mode for instant rate lookups without sign-up.

🏗️ Architecture & Tech Stack
Layer	Technologies
Frontend	React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts, Motion
Backend	Node.js Express, Vite dev middleware
AI & LLM	@google/genai TypeScript SDK (Gemini 2.5 Flash) with fallback heuristics
Data Source	AGMARKNET APMC schema with live filtering and historical trend synthesis
Internationalization	Complete type-safe i18n engine across 9 Indian regional languages
📁 Project Structure
Code
├── server.ts                   # Express backend with API routes & Vite middleware
├── src/
│   ├── App.tsx                 # Core application shell & state orchestration
│   ├── main.tsx                # React DOM root entry
│   ├── types.ts                # TypeScript interfaces (Mandi, User, i18n)
│   ├── index.css               # Tailwind CSS v4 directives & theme styles
│   ├── components/
│   │   ├── Header.tsx          # Navigation header, language toggle & user profile
│   │   ├── FilterSection.tsx   # State, District, Mandi, and Category cascading dropdowns
│   │   ├── PriceTable.tsx      # Live price table with role-specific buying/selling rates
│   │   ├── TrendChartSection.tsx # Recharts modal with historical 7d/15d/30d analytics
│   │   ├── BestMandiFinder.tsx # Inter-mandi comparison & arbitrage calculator
│   │   ├── MarketInsightModal.tsx # Gemini AI market analysis & selling recommendations
│   │   ├── AuthOnboardingModal.tsx # Sign in, Sign up (PIN code lookup), & Role selection
│   │   └── LanguageLocationModal.tsx # Language selector & GPS state auto-detection
│   ├── data/
│   │   └── mockMandiData.ts    # Comprehensive AGMARKNET-aligned APMC dataset
│   └── i18n/
│       └── translations.ts     # Localization dictionaries across 9 languages
├── package.json
├── metadata.json
├── tsconfig.json
└── vite.config.ts
🚀 Getting Started

Prerequisites
Node.js (v18 or v20+ recommended)

npm or yarn

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/agrimarket-live.git
cd agrimarket-live
Install dependencies:

Bash
npm install
Configure Environment Variables:
Copy the example environment file and add your credentials:

Bash
cp .env.example .env
Edit .env:

Ini
# Required for AI Market Insights (Gemini 2.5 Flash)
GEMINI_API_KEY="your_google_gemini_api_key_here"

# Optional AGMARKNET API Key for data.gov.in
DATA_GOV_IN_API_KEY=""
Note: If GEMINI_API_KEY is not provided, the application gracefully falls back to built-in rule-based agricultural market insights.
Start the Development Server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

Build for Production:

Bash
npm run build
npm start
📡 API Endpoints
Method	Endpoint	Description
GET	/api/mandi/locations	Returns cascading States, Districts, and Mandis structure
GET	/api/mandi/prices	Fetches filtered & sorted live mandi crop rates
GET	/api/mandi/history	Returns historical price trend points (7, 15, or 30 days)
POST	/api/ai/market-insight	Gemini AI-driven crop trend summary and trading recommendations
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for bug reports and feature suggestions.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.
