import React, { useState } from 'react';
import { MandiPriceRecord } from '../types';
import { formatPriceByUnit } from '../data/mockMandiData';
import { Award, TrendingUp, MapPin, Store, ChevronRight, Zap } from 'lucide-react';

interface BestMandiFinderProps {
  records: MandiPriceRecord[];
  unit: 'quintal' | 'kg' | 'tonne';
  onSelectMandiForTrend: (record: MandiPriceRecord) => void;
}

export const BestMandiFinder: React.FC<BestMandiFinderProps> = ({
  records,
  unit,
  onSelectMandiForTrend
}) => {
  // Get distinct commodities
  const distinctCommodities = Array.from(new Set(records.map((r) => r.commodity)));
  const [selectedCrop, setSelectedCrop] = useState<string>('Sugar Cane');

  const activeCrop = distinctCommodities.includes(selectedCrop)
    ? selectedCrop
    : distinctCommodities[0] || 'Sugar Cane';

  // Filter records for this selected crop and sort by selling price (descending)
  const cropRecords = records
    .filter((r) => r.commodity.toLowerCase() === activeCrop.toLowerCase())
    .sort((a, b) => b.sellingPrice - a.sellingPrice);

  const bestSellingMandi = cropRecords[0];
  const lowestBuyingMandi = [...cropRecords].sort((a, b) => a.buyingPrice - b.buyingPrice)[0];

  if (!bestSellingMandi) return null;

  const topSellFormatted = formatPriceByUnit(bestSellingMandi.sellingPrice, unit);
  const topBuyFormatted = formatPriceByUnit(lowestBuyingMandi.buyingPrice, unit);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl">
              <Award className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Best Mandi Arbitrage & Price Realization
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare across Mandis to find where farmers get highest payout and buyers get lowest bulk rates.
          </p>
        </div>

        {/* Crop Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Select Crop:</span>
          <select
            value={activeCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {distinctCommodities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Highest Selling Rate (Best for Farmers) */}
        <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                🌾 Top Farmer Payout
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-700" />
                {bestSellingMandi.market}
              </h3>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {bestSellingMandi.district}, {bestSellingMandi.state}
              </p>
            </div>

            <div className="text-right">
              <div className="text-xl font-extrabold text-emerald-700">
                {topSellFormatted.formatted}
              </div>
              <span className="text-[10px] font-medium text-slate-500">Max Selling Rate</span>
            </div>
          </div>

          <button
            onClick={() => onSelectMandiForTrend(bestSellingMandi)}
            className="self-end text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
          >
            <span>Analyze {bestSellingMandi.market} Trends</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lowest Buying Rate (Best for Wholesalers & Exporters) */}
        <div className="bg-amber-50/60 border border-amber-200/90 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                🛒 Best Wholesaler Deal
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-700" />
                {lowestBuyingMandi.market}
              </h3>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {lowestBuyingMandi.district}, {lowestBuyingMandi.state}
              </p>
            </div>

            <div className="text-right">
              <div className="text-xl font-extrabold text-amber-700">
                {topBuyFormatted.formatted}
              </div>
              <span className="text-[10px] font-medium text-slate-500">Min Buying Rate</span>
            </div>
          </div>

          <button
            onClick={() => onSelectMandiForTrend(lowestBuyingMandi)}
            className="self-end text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
          >
            <span>Analyze {lowestBuyingMandi.market} Trends</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
