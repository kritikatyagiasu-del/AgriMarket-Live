import React from 'react';
import { Sprout, RefreshCw, Layers, Radio, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  lastSyncTime: string;
  userRole: 'farmer' | 'buyer' | 'exporter';
  setUserRole: (role: 'farmer' | 'buyer' | 'exporter') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  isLoading,
  lastSyncTime,
  userRole,
  setUserRole
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-emerald-500/30 p-1 flex items-center justify-center shadow-inner overflow-hidden">
              <img src="/favicon.svg" alt="AgriMarket Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  AgriMarket <span className="text-emerald-400">Live</span>
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 border border-emerald-800/60 text-emerald-300">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  AGMARKNET Sync
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Live Mandi Prices • Resource ID: <code className="text-slate-300 bg-slate-800 px-1 py-0.5 rounded text-[11px]">9ef84268-d588-465a-a308-a864a43d0070</code>
              </p>
            </div>
          </div>

          {/* Controls & Role Switcher */}
          <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
            {/* Role Switcher */}
            <div className="bg-slate-800/90 p-1 rounded-lg border border-slate-700/80 flex items-center text-xs">
              <button
                onClick={() => setUserRole('farmer')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  userRole === 'farmer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🌾 Farmer
              </button>
              <button
                onClick={() => setUserRole('buyer')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  userRole === 'buyer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🛒 Buyer / Wholesaler
              </button>
              <button
                onClick={() => setUserRole('exporter')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  userRole === 'exporter'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🚢 Exporter
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium rounded-lg text-slate-200 transition-colors disabled:opacity-50"
              title="Refresh Mandi Price Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
