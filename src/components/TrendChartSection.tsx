import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { MandiPriceRecord, PriceTrendPoint, SupportedLanguage } from '../types';
import { formatPriceByUnit } from '../data/mockMandiData';
import {
  X,
  LineChart as LineChartIcon,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Scale,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS, COMMODITY_LOCALIZED_NAMES } from '../i18n/translations';

interface TrendChartSectionProps {
  selectedRecord: MandiPriceRecord | null;
  onClose: () => void;
  unit: 'quintal' | 'kg' | 'tonne';
  currentLanguage: SupportedLanguage;
}

export const TrendChartSection: React.FC<TrendChartSectionProps> = ({
  selectedRecord,
  onClose,
  unit,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [timeframeDays, setTimeframeDays] = useState<number>(30);
  const [chartType, setChartType] = useState<'prices' | 'volume' | 'corridor'>('prices');
  const [trendData, setTrendData] = useState<PriceTrendPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedRecord) return;

    async function fetchTrendHistory() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/mandi/history?commodity=${encodeURIComponent(selectedRecord!.commodity)}&market=${encodeURIComponent(selectedRecord!.market)}&days=${timeframeDays}`
        );
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTrendData(json.data);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendHistory();
  }, [selectedRecord, timeframeDays]);

  if (!selectedRecord) return null;

  const localizedCropName = COMMODITY_LOCALIZED_NAMES[selectedRecord.commodity]?.[currentLanguage] || selectedRecord.commodity;

  // Transform prices based on unit selected (Quintal / Kg / Tonne)
  const formattedChartData = trendData.map((pt) => {
    const buy = formatPriceByUnit(pt.buyingPrice, unit).value;
    const sell = formatPriceByUnit(pt.sellingPrice, unit).value;
    const modal = formatPriceByUnit(pt.modalPrice, unit).value;
    const spread = sell - buy;

    return {
      date: pt.date,
      displayDate: new Date(pt.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      }),
      buyingPrice: Number(buy.toFixed(2)),
      sellingPrice: Number(sell.toFixed(2)),
      modalPrice: Number(modal.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      arrivalVolume: pt.arrivalVolume
    };
  });

  // Calculate statistics over selected timeframe
  const modalPricesList = formattedChartData.map((d) => d.modalPrice);
  const highestPrice = modalPricesList.length > 0 ? Math.max(...modalPricesList) : 0;
  const lowestPrice = modalPricesList.length > 0 ? Math.min(...modalPricesList) : 0;
  const avgPrice = modalPricesList.length > 0
    ? Math.round(modalPricesList.reduce((a, b) => a + b, 0) / modalPricesList.length)
    : 0;

  const firstPrice = modalPricesList[0] || 1;
  const lastPrice = modalPricesList[modalPricesList.length - 1] || 1;
  const overallTrendPct = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(1);

  const unitLabel = unit === 'quintal' ? t.units.quintal : unit === 'kg' ? t.units.kg : t.units.tonne;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-2 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl">
                <LineChartIcon className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {localizedCropName} {t.chartModal.title}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {selectedRecord.variety}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Market: <strong className="text-slate-800">{selectedRecord.market}</strong> ({selectedRecord.district}, {selectedRecord.state})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50/50 border-b border-slate-200 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 flex items-center justify-between font-medium">
              <span>{t.chartModal.sellingPrice} ({unitLabel})</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-emerald-700 mt-1">
              ₹{highestPrice.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 flex items-center justify-between font-medium">
              <span>{t.chartModal.buyingPrice} ({unitLabel})</span>
              <ArrowDownRight className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-lg font-bold text-rose-700 mt-1">
              ₹{lowestPrice.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 flex items-center justify-between font-medium">
              <span>{t.chartModal.modalPrice}</span>
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-lg font-bold text-slate-900 mt-1">
              ₹{avgPrice.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 flex items-center justify-between font-medium">
              <span>{timeframeDays}-Day {t.chartModal.trendLabel}</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className={`text-lg font-bold mt-1 ${Number(overallTrendPct) >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {Number(overallTrendPct) >= 0 ? `+${overallTrendPct}%` : `${overallTrendPct}%`}
            </div>
          </div>
        </div>

        {/* Controls Toolbar (Timeframe & View Toggle) */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto">
            <Calendar className="w-3.5 h-3.5 text-slate-500 ml-2" />
            <span className="text-slate-600 mr-1 hidden sm:inline font-medium">Span:</span>
            {[7, 30, 90, 365].map((d) => (
              <button
                key={d}
                onClick={() => setTimeframeDays(d)}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-bold transition-all ${
                  timeframeDays === d
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d === 365 ? '1 Year' : `${d} Days`}
              </button>
            ))}
          </div>

          {/* Chart View Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto justify-end">
            <button
              onClick={() => setChartType('prices')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                chartType === 'prices'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.table.colBuying} vs {t.table.colSelling}
            </button>
            <button
              onClick={() => setChartType('corridor')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                chartType === 'corridor'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.table.colModal}
            </button>
            <button
              onClick={() => setChartType('volume')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                chartType === 'volume'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.chartModal.arrivalVolume}
            </button>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="p-4 sm:p-6 bg-white flex-1 min-h-[320px] relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
              Loading price history data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              {chartType === 'prices' ? (
                <AreaChart data={formattedChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="displayDate" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit={` ${unitLabel.split('/')[0]}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="sellingPrice" name={`${t.table.colSelling} (${unitLabel})`} stroke="#059669" fillOpacity={1} fill="url(#colorSell)" strokeWidth={2} />
                  <Area type="monotone" dataKey="buyingPrice" name={`${t.table.colBuying} (${unitLabel})`} stroke="#d97706" fillOpacity={1} fill="url(#colorBuy)" strokeWidth={2} />
                </AreaChart>
              ) : chartType === 'corridor' ? (
                <LineChart data={formattedChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="displayDate" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="modalPrice" name={`${t.table.colModal} (${unitLabel})`} stroke="#0284c7" strokeWidth={3} dot={false} />
                </LineChart>
              ) : (
                <BarChart data={formattedChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="displayDate" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="arrivalVolume" name="Mandi Arrival (Tonnes)" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Data source: <strong>AGMARKNET Regulated Mandis Network</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors"
          >
            {t.chartModal.close}
          </button>
        </div>

      </div>
    </div>
  );
};

