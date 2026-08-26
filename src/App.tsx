import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { FilterSection } from './components/FilterSection';
import { PriceTable } from './components/PriceTable';
import { TrendChartSection } from './components/TrendChartSection';
import { MarketInsightModal } from './components/MarketInsightModal';
import { BestMandiFinder } from './components/BestMandiFinder';
import {
  MandiPriceRecord,
  MandiFilterState,
  StateDistrictMandiMap
} from './types';
import { STATE_DISTRICT_MANDI_DATA } from './data/mockMandiData';
import { Download, AlertCircle, Sparkles, Sprout, Info } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<'farmer' | 'buyer' | 'exporter'>('farmer');
  const [locationsMap, setLocationsMap] = useState<StateDistrictMandiMap>(STATE_DISTRICT_MANDI_DATA);
  const [records, setRecords] = useState<MandiPriceRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());

  // Filters State
  const [filters, setFilters] = useState<MandiFilterState>({
    state: 'All States',
    district: 'All Districts',
    mandi: 'All Mandis',
    category: 'All Categories',
    searchQuery: '',
    unit: 'quintal',
    sortBy: 'crop',
    sortOrder: 'asc'
  });

  // Modal State
  const [selectedRecordForTrend, setSelectedRecordForTrend] = useState<MandiPriceRecord | null>(null);
  const [selectedRecordForInsight, setSelectedRecordForInsight] = useState<MandiPriceRecord | null>(null);

  // Fetch Locations Cascade Map
  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch('/api/mandi/locations');
        const json = await res.json();
        if (json.success && json.data) {
          setLocationsMap(json.data);
        }
      } catch (err) {
        console.error('Using local location fallback:', err);
      }
    }
    fetchLocations();
  }, []);

  // Fetch Mandi Price Records
  const fetchPriceRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.state !== 'All States') params.append('state', filters.state);
      if (filters.district !== 'All Districts') params.append('district', filters.district);
      if (filters.mandi !== 'All Mandis') params.append('mandi', filters.mandi);
      if (filters.category !== 'All Categories') params.append('category', filters.category);
      if (filters.searchQuery.trim().length > 0) params.append('q', filters.searchQuery.trim());
      params.append('sortBy', filters.sortBy);
      params.append('sortOrder', filters.sortOrder);

      const res = await fetch(`/api/mandi/prices?${params.toString()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRecords(json.data);
        setLastSyncTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }));
      }
    } catch (err) {
      console.error('Error fetching price records:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPriceRecords();
  }, [fetchPriceRecords]);

  const handleFilterChange = (updated: Partial<MandiFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      state: 'All States',
      district: 'All Districts',
      mandi: 'All Mandis',
      category: 'All Categories',
      searchQuery: '',
      unit: 'quintal',
      sortBy: 'crop',
      sortOrder: 'asc'
    });
  };

  const handleSortChange = (sortBy: MandiFilterState['sortBy']) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  // CSV Export
  const handleExportCSV = () => {
    if (records.length === 0) return;

    const headers = [
      'Crop',
      'Variety',
      'State',
      'District',
      'Mandi',
      `Buying Price (${filters.unit})`,
      `Selling Price (${filters.unit})`,
      `Modal Price (${filters.unit})`,
      'Last Updated'
    ];

    const rows = records.map((r) => [
      `"${r.commodity}"`,
      `"${r.variety}"`,
      `"${r.state}"`,
      `"${r.district}"`,
      `"${r.market}"`,
      r.buyingPrice,
      r.sellingPrice,
      r.modalPrice,
      `"${r.lastUpdated}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `mandi_prices_${filters.state}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Header */}
      <Header
        onRefresh={fetchPriceRecords}
        isLoading={isLoading}
        lastSyncTime={lastSyncTime}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Banner Guidance - Geometric Balance Card */}
        <div className="mb-6 p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl shrink-0 mt-0.5">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Agri-Tech Mandi Market Portal & Price Analytics
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                  {userRole} Mode
                </span>
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Select your <strong>State</strong>, <strong>District</strong>, and <strong>Mandi</strong> below to check live buying & selling prices for crops across Indian agricultural markets.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            disabled={records.length === 0}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 disabled:opacity-50 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Mandi Sheet (CSV)</span>
          </button>
        </div>

        {/* Filter Section (State -> District -> Mandi Dropdowns & Search) */}
        <FilterSection
          locationsMap={locationsMap}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResultsCount={records.length}
        />

        {/* Best Mandi Finder (Arbitrage Optimization) */}
        {records.length > 0 && (
          <BestMandiFinder
            records={records}
            unit={filters.unit}
            onSelectMandiForTrend={setSelectedRecordForTrend}
          />
        )}

        {/* Required 5-Column Live Mandi Price Bulletin */}
        <PriceTable
          records={records}
          filters={filters}
          onSelectRecordForTrend={setSelectedRecordForTrend}
          onSelectRecordForInsight={setSelectedRecordForInsight}
          onSortChange={handleSortChange}
          userRole={userRole}
        />

      </main>

      {/* Historical Trend Chart Modal */}
      {selectedRecordForTrend && (
        <TrendChartSection
          selectedRecord={selectedRecordForTrend}
          onClose={() => setSelectedRecordForTrend(null)}
          unit={filters.unit}
        />
      )}

      {/* AI Market Advisory Modal */}
      {selectedRecordForInsight && (
        <MarketInsightModal
          record={selectedRecordForInsight}
          onClose={() => setSelectedRecordForInsight(null)}
        />
      )}

      {/* Footer - Geometric Balance Theme */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">AgriMarket Live</span>
            <span>• AGMARKNET Mandi Price Intelligence Portal</span>
          </div>
          <div className="text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Resource Endpoint: <code className="text-slate-800 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[11px] font-mono">/resource/9ef84268-d588-465a-a308-a864a43d0070</code></span>
          </div>
        </div>
      </footer>

    </div>
  );
}
