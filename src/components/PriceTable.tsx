import React from 'react';
import {
  MandiPriceRecord,
  MandiFilterState,
  SupportedLanguage
} from '../types';
import { formatPriceByUnit } from '../data/mockMandiData';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  LineChart,
  Sparkles,
  MapPin,
  Store,
  ArrowUpDown,
  Tag,
  BadgeAlert
} from 'lucide-react';
import { TRANSLATIONS, COMMODITY_LOCALIZED_NAMES } from '../i18n/translations';

interface PriceTableProps {
  records: MandiPriceRecord[];
  filters: MandiFilterState;
  onSelectRecordForTrend: (record: MandiPriceRecord) => void;
  onSelectRecordForInsight: (record: MandiPriceRecord) => void;
  onSortChange: (sortBy: MandiFilterState['sortBy']) => void;
  userRole: 'farmer' | 'buyer' | 'exporter';
  currentLanguage: SupportedLanguage;
}

export const PriceTable: React.FC<PriceTableProps> = ({
  records,
  filters,
  onSelectRecordForTrend,
  onSelectRecordForInsight,
  onSortChange,
  userRole,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const getCropDisplay = (crop: string) => {
    return COMMODITY_LOCALIZED_NAMES[crop]?.[currentLanguage] || crop;
  };

  // Helper to format ISO timestamp into user friendly relative / formatted local string
  const formatLastUpdated = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMinutes = Math.round((now.getTime() - date.getTime()) / (1000 * 60));

      const timeStr = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      if (diffMinutes < 60) {
        return `${t.table.today}, ${timeStr} (${diffMinutes} ${t.table.minsAgo})`;
      } else {
        const dateStr = date.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short'
        });
        return `${dateStr}, ${timeStr}`;
      }
    } catch {
      return `${t.table.today}, 11:30 AM`;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
      
      {/* Table Header Controls / Info */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🌾 {t.table.title}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              {filters.unit === 'quintal' ? t.units.quintal : filters.unit === 'kg' ? t.units.kg : t.units.tonne}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.table.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center text-xs text-slate-500">
          <span className="font-medium">{t.table.sortBy}:</span>
          <button
            onClick={() => onSortChange('crop')}
            className={`px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
              filters.sortBy === 'crop'
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            {t.table.colCrop}
          </button>
          <button
            onClick={() => onSortChange('buyingPrice')}
            className={`px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
              filters.sortBy === 'buyingPrice'
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            {t.table.colBuyPrice}
          </button>
          <button
            onClick={() => onSortChange('sellingPrice')}
            className={`px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
              filters.sortBy === 'sellingPrice'
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            {t.table.colSellPrice}
          </button>
        </div>
      </div>

      {/* Empty State */}
      {records.length === 0 ? (
        <div className="p-12 text-center text-slate-500">
          <BadgeAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">{t.table.noRecords}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            {t.table.noRecordsDesc}
          </p>
        </div>
      ) : (
        /* Responsive Mandi Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                {/* REQUIRED COLUMN 1: Crop */}
                <th className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onSortChange('crop')}>
                    <span>1. {t.table.colCrop}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* REQUIRED COLUMN 2: Variety */}
                <th className="py-3.5 px-4">
                  <span>2. {t.table.colVariety}</span>
                </th>

                {/* Mandi & Location (Context) */}
                <th className="py-3.5 px-4">
                  <span>{t.table.colMandi}</span>
                </th>

                {/* REQUIRED COLUMN 3: Buying Price */}
                <th className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5 cursor-pointer" onClick={() => onSortChange('buyingPrice')}>
                    <span className="text-amber-700 font-bold">3. {t.table.colBuyPrice}</span>
                    <ArrowUpDown className="w-3 h-3 text-amber-600" />
                  </div>
                </th>

                {/* REQUIRED COLUMN 4: Selling Price */}
                <th className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5 cursor-pointer" onClick={() => onSortChange('sellingPrice')}>
                    <span className="text-emerald-700 font-bold">4. {t.table.colSellPrice}</span>
                    <ArrowUpDown className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>

                {/* REQUIRED COLUMN 5: Last Updated Time */}
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onSortChange('lastUpdated')}>
                    <span>5. {t.table.colLastUpdated}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* Interactive Analysis Actions */}
                <th className="py-3.5 px-4 text-center">
                  <span>{t.table.colAnalysis}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
              {records.map((r) => {
                const formattedBuy = formatPriceByUnit(r.buyingPrice, filters.unit);
                const formattedSell = formatPriceByUnit(r.sellingPrice, filters.unit);
                const formattedModal = formatPriceByUnit(r.modalPrice, filters.unit);
                const localizedCropName = getCropDisplay(r.commodity);

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* COLUMN 1: Crop */}
                    <td className="py-4 px-4 sm:px-6 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                          {localizedCropName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                            {localizedCropName}
                            {r.priceChange7d !== 0 && (
                              <span
                                className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${
                                  r.priceChange7d > 0
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                                }`}
                              >
                                {r.priceChange7d > 0 ? (
                                  <TrendingUp className="w-3 h-3 mr-0.5" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 mr-0.5" />
                                )}
                                {Math.abs(r.priceChange7d)}%
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 font-normal">
                            {r.commodity !== localizedCropName ? `${r.commodity} • ` : ''}{r.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* COLUMN 2: Variety */}
                    <td className="py-4 px-4">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {r.variety}
                      </div>
                    </td>

                    {/* Mandi / Location */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-800 text-xs flex items-center gap-1">
                          <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[180px]">{r.market}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          {r.district}, {r.state}
                        </div>
                      </div>
                    </td>

                    {/* COLUMN 3: Buying Price */}
                    <td className="py-4 px-4 text-right">
                      <div className="font-bold text-amber-700 text-base">
                        {formattedBuy.formatted}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {userRole === 'buyer' ? t.table.yourBuyRate : t.table.wholesalerBuyRate}
                      </div>
                    </td>

                    {/* COLUMN 4: Selling Price */}
                    <td className="py-4 px-4 text-right">
                      <div className="font-bold text-emerald-700 text-base">
                        {formattedSell.formatted}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-end gap-1">
                        <span>{t.table.modalPrice}: {formattedModal.formatted.split('/')[0]}</span>
                      </div>
                    </td>

                    {/* COLUMN 5: Last Updated Time */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{formatLastUpdated(r.lastUpdated)}</span>
                      </div>
                      {r.arrivalVolumeTonnes && (
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {t.table.arrival}: <strong className="text-slate-700">{r.arrivalVolumeTonnes} Tonnes</strong>
                        </div>
                      )}
                    </td>

                    {/* Price Analysis Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Historical Graph Trigger */}
                        <button
                          onClick={() => onSelectRecordForTrend(r)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                          title="View 30-Day Historical Trend Graph"
                        >
                          <LineChart className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.table.btnGraph}</span>
                        </button>

                        {/* AI Market Advice Trigger */}
                        <button
                          onClick={() => onSelectRecordForInsight(r)}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                          title="Get AI Market Advisory & Price Forecast"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span className="hidden md:inline">{t.table.btnAiAdvice}</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

