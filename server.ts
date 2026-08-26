import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_MANDI_RECORDS,
  STATE_DISTRICT_MANDI_DATA,
  generateHistoricalTrendPoints
} from './src/data/mockMandiData.js';
import { MandiPriceRecord } from './src/types.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper for lazy Gemini AI instance initialization
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return null;
    }
    return new GoogleGenAI({ apiKey });
  }

  // --- API ROUTES ---

  // 1. Get States, Districts, Mandis Cascade Structure
  app.get('/api/mandi/locations', (req, res) => {
    try {
      res.json({
        success: true,
        data: STATE_DISTRICT_MANDI_DATA
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Server error' });
    }
  });

  // 2. Get Mandi Live Market Prices (with state, district, mandi, category, search query filtering)
  app.get('/api/mandi/prices', async (req, res) => {
    try {
      const {
        state,
        district,
        mandi,
        category,
        q,
        sortBy = 'crop',
        sortOrder = 'asc'
      } = req.query;

      let records: MandiPriceRecord[] = [...INITIAL_MANDI_RECORDS];

      // Filtering logic
      if (state && typeof state === 'string' && state !== 'All States') {
        records = records.filter(r => r.state.toLowerCase() === state.toLowerCase());
      }

      if (district && typeof district === 'string' && district !== 'All Districts') {
        records = records.filter(r => r.district.toLowerCase() === district.toLowerCase());
      }

      if (mandi && typeof mandi === 'string' && mandi !== 'All Mandis') {
        records = records.filter(r => r.market.toLowerCase().includes(mandi.toLowerCase()));
      }

      if (category && typeof category === 'string' && category !== 'All Categories') {
        records = records.filter(r => r.category.toLowerCase() === category.toLowerCase());
      }

      if (q && typeof q === 'string' && q.trim().length > 0) {
        const query = q.trim().toLowerCase();
        records = records.filter(r =>
          r.commodity.toLowerCase().includes(query) ||
          r.variety.toLowerCase().includes(query) ||
          r.market.toLowerCase().includes(query) ||
          r.district.toLowerCase().includes(query) ||
          r.state.toLowerCase().includes(query)
        );
      }

      // Sorting
      records.sort((a, b) => {
        let valA: any = a.commodity;
        let valB: any = b.commodity;

        if (sortBy === 'buyingPrice') {
          valA = a.buyingPrice;
          valB = b.buyingPrice;
        } else if (sortBy === 'sellingPrice') {
          valA = a.sellingPrice;
          valB = b.sellingPrice;
        } else if (sortBy === 'modalPrice') {
          valA = a.modalPrice;
          valB = b.modalPrice;
        } else if (sortBy === 'lastUpdated') {
          valA = new Date(a.lastUpdated).getTime();
          valB = new Date(b.lastUpdated).getTime();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      res.json({
        success: true,
        resourceId: "9ef84268-d588-465a-a308-a864a43d0070",
        total: records.length,
        timestamp: new Date().toISOString(),
        data: records
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Failed to fetch price records' });
    }
  });

  // 3. Get Historical Price Trend Points for a selected Commodity & Mandi
  app.get('/api/mandi/history', (req, res) => {
    try {
      const { commodity, market, days = '30' } = req.query;
      const daysCount = parseInt(days as string, 10) || 30;

      // Find matching base record or fallback to defaults
      let baseRecord = INITIAL_MANDI_RECORDS.find(
        r => r.commodity.toLowerCase() === (commodity as string)?.toLowerCase()
      );

      if (!baseRecord) {
        baseRecord = INITIAL_MANDI_RECORDS[0];
      }

      const points = generateHistoricalTrendPoints(
        baseRecord.modalPrice,
        baseRecord.buyingPrice,
        baseRecord.sellingPrice,
        daysCount
      );

      res.json({
        success: true,
        commodity: baseRecord.commodity,
        variety: baseRecord.variety,
        market: market || baseRecord.market,
        days: daysCount,
        data: points
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Error generating history' });
    }
  });

  // 4. Server-Side AI Market Insight / Crop Advisory Endpoint (Gemini API)
  app.post('/api/ai/market-insight', async (req, res) => {
    try {
      const { commodity, state, district, market, buyingPrice, sellingPrice, modalPrice, priceChange7d } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback rule-based insight when GEMINI_API_KEY is not configured
        return res.json({
          success: true,
          insight: {
            crop: commodity || "Selected Crop",
            trendSummary: `Prices for ${commodity} in ${market || district || state} have moved by ${priceChange7d >= 0 ? '+' : ''}${priceChange7d}% over the past week.`,
            priceOutlook: priceChange7d > 2 ? 'bullish' : priceChange7d < -2 ? 'bearish' : 'stable',
            bestSellingMandi: market || "Regional APMC Hub",
            recommendedAction: priceChange7d > 2 
              ? "Consider selling in staggered batches to capitalize on current upward momentum while keeping eye on arrival volumes." 
              : "Hold stock if moisture levels allow, or target export/wholesale buyers to lock in stable prices.",
            factors: [
              "Local mandi arrival volumes and monsoon transport updates",
              "Inter-state wholesale demand and processing plant procurement",
              "Government Minimum Support Price (MSP) benchmarks"
            ]
          }
        });
      }

      const prompt = `You are an expert Indian Agricultural Economist and Mandi Price Analyst. Analyze the following crop market data and provide concise, practical selling/buying advice for farmers, buyers, or exporters:
      - Crop/Commodity: ${commodity}
      - Location: Mandi: ${market}, District: ${district}, State: ${state}
      - Current Wholesaler Buying Price: ₹${buyingPrice} / Quintal
      - Current Selling Price: ₹${sellingPrice} / Quintal
      - Modal Price: ₹${modalPrice} / Quintal
      - 7-Day Price Change: ${priceChange7d}%

      Return a JSON response with exactly this structure:
      {
        "trendSummary": "2 short sentences describing the market condition",
        "priceOutlook": "bullish" | "bearish" | "stable",
        "bestSellingMandi": "Recommended nearby high-demand mandi name or regional hub",
        "recommendedAction": "Actionable 1-2 sentence recommendation for the farmer or trader",
        "factors": ["Factor 1", "Factor 2", "Factor 3"]
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      const parsed = JSON.parse(responseText);

      return res.json({
        success: true,
        insight: {
          crop: commodity,
          trendSummary: parsed.trendSummary,
          priceOutlook: parsed.priceOutlook || 'stable',
          bestSellingMandi: parsed.bestSellingMandi,
          recommendedAction: parsed.recommendedAction,
          factors: parsed.factors || []
        }
      });
    } catch (err: any) {
      console.error('Gemini market insight error:', err);
      return res.status(500).json({
        success: false,
        error: 'Unable to generate AI market insight at this moment.'
      });
    }
  });

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
