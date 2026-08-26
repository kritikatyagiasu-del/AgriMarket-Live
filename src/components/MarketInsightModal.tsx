import React, { useState, useEffect } from 'react';
import { MandiPriceRecord, MarketInsight, SupportedLanguage } from '../types';
import {
  Sparkles,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  Store,
  Lightbulb,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { TRANSLATIONS, COMMODITY_LOCALIZED_NAMES } from '../i18n/translations';

interface MarketInsightModalProps {
  record: MandiPriceRecord | null;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
}

export const MarketInsightModal: React.FC<MarketInsightModalProps> = ({
  record,
  onClose,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [insight, setInsight] = useState<MarketInsight | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!record) return;

    async function generateInsight() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/ai/market-insight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            commodity: record!.commodity,
            state: record!.state,
            district: record!.district,
            market: record!.market,
            buyingPrice: record!.buyingPrice,
            sellingPrice: record!.sellingPrice,
            modalPrice: record!.modalPrice,
            priceChange7d: record!.priceChange7d,
            language: currentLanguage
          })
        });

        const json = await res.json();
        if (json.success && json.insight) {
          setInsight(json.insight);
        } else {
          setError(json.error || 'Failed to generate advisory.');
        }
      } catch (err: any) {
        setError('Network error loading market advisory.');
      } finally {
        setIsLoading(false);
      }
    }

    generateInsight();
  }, [record, currentLanguage]);

  if (!record) return null;

  const localizedCropName = COMMODITY_LOCALIZED_NAMES[record.commodity]?.[currentLanguage] || record.commodity;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {t.insightModal.title}
              </h2>
              <p className="text-xs text-slate-500">
                {localizedCropName} ({record.variety}) • {record.market}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-3">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
              <p className="text-sm font-medium">Analyzing market trends & prices for {localizedCropName}...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 font-medium">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          ) : insight ? (
            <>
              {/* Outlook Badge & Summary */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.insightModal.marketOutlook}
                  </span>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      insight.priceOutlook === 'bullish'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : insight.priceOutlook === 'bearish'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {insight.priceOutlook === 'bullish' ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : insight.priceOutlook === 'bearish' ? (
                      <TrendingDown className="w-3.5 h-3.5" />
                    ) : (
                      <Minus className="w-3.5 h-3.5" />
                    )}
                    {insight.priceOutlook === 'bullish' ? t.insightModal.bullish : insight.priceOutlook === 'bearish' ? t.insightModal.bearish : t.insightModal.stable}
                  </div>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                  {insight.trendSummary}
                </p>
              </div>

              {/* Recommended Action Card */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>{t.insightModal.recommendedAction}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {insight.recommendedAction}
                </p>
              </div>

              {/* Best Selling Mandi & Key Factors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-emerald-600" />
                    {t.insightModal.bestAlternative}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {insight.bestSellingMandi}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {t.insightModal.keyFactors}
                  </div>
                  <ul className="text-[11px] text-slate-700 space-y-1 list-disc list-inside font-medium">
                    {insight.factors.slice(0, 3).map((f, i) => (
                      <li key={i} className="truncate">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            {t.insightModal.close}
          </button>
        </div>

      </div>
    </div>
  );
};

