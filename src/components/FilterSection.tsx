import React from 'react';
import { Search, MapPin, Building2, Store, SlidersHorizontal, Scale, XCircle } from 'lucide-react';
import { StateDistrictMandiMap, MandiFilterState, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FilterSectionProps {
  locationsMap: StateDistrictMandiMap;
  filters: MandiFilterState;
  onFilterChange: (updated: Partial<MandiFilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
  currentLanguage: SupportedLanguage;
}

const CATEGORIES = [
  'All Categories',
  'Cereals & Pulses',
  'Vegetables',
  'Fruits',
  'Oilseeds',
  'Spices & Cash Crops',
  'Commercial & Sugarcane'
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  locationsMap,
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const statesList = Object.keys(locationsMap);

  // Available districts based on selected state
  const availableDistricts = filters.state && filters.state !== 'All States' && locationsMap[filters.state]
    ? Object.keys(locationsMap[filters.state])
    : [];

  // Available mandis based on selected district
  const availableMandis = filters.state && filters.district && filters.district !== 'All Districts' && locationsMap[filters.state]?.[filters.district]
    ? locationsMap[filters.state][filters.district]
    : [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrimaryState = e.target.value;
    onFilterChange({
      state: newPrimaryState,
      district: 'All Districts',
      mandi: 'All Mandis'
    });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value;
    onFilterChange({
      district: newDistrict,
      mandi: 'All Mandis'
    });
  };

  const handleMandiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      mandi: e.target.value
    });
  };

  const isFiltered = filters.state !== 'All States' || 
                     filters.district !== 'All Districts' || 
                     filters.mandi !== 'All Mandis' || 
                     filters.category !== 'All Categories' || 
                     filters.searchQuery.trim().length > 0;

  // Localized category display
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All Categories': return t.categories.all;
      case 'Cereals & Pulses': return t.categories.cereals;
      case 'Vegetables': return t.categories.vegetables;
      case 'Fruits': return t.categories.fruits;
      case 'Oilseeds': return t.categories.oilseeds;
      case 'Spices & Cash Crops': return t.categories.spices;
      case 'Commercial & Sugarcane': return t.categories.commercial;
      default: return cat;
    }
  };

  return (
    <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm mb-6">
      {/* Top Search Bar & Unit Selector */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-5">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-600" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder={t.filters.searchPlaceholder}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Unit Selector Toggle */}
        <div className="flex items-center gap-2 self-end lg:self-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-600">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.filters.unitLabel}</span>
          </div>
          {(['quintal', 'kg', 'tonne'] as const).map((u) => (
            <button
              key={u}
              onClick={() => onFilterChange({ unit: u })}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                filters.unit === u
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {u === 'quintal' ? t.units.quintal : u === 'kg' ? t.units.kg : t.units.tonne}
            </button>
          ))}
        </div>

      </div>

      {/* Cascading Location Dropdowns (State -> District -> Mandi) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        
        {/* 1. State Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {t.filters.stateLabel}
          </label>
          <select
            value={filters.state}
            onChange={handleStateChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer font-medium"
          >
            <option value="All States">{t.filters.allStates} ({statesList.length} States)</option>
            {statesList.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* 2. District Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            {t.filters.districtLabel}
          </label>
          <select
            value={filters.district}
            onChange={handleDistrictChange}
            disabled={availableDistricts.length === 0}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-50 cursor-pointer font-medium"
          >
            <option value="All Districts">
              {filters.state === 'All States' 
                ? `${t.filters.districtLabel}...` 
                : `${t.filters.allDistricts} (${filters.state})`}
            </option>
            {availableDistricts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Mandi / Market Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            {t.filters.mandiLabel}
          </label>
          <select
            value={filters.mandi}
            onChange={handleMandiChange}
            disabled={availableMandis.length === 0}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-50 cursor-pointer font-medium"
          >
            <option value="All Mandis">
              {filters.district === 'All Districts' 
                ? `${t.filters.mandiLabel}...` 
                : `${t.filters.allMandis} (${filters.district})`}
            </option>
            {availableMandis.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Commodity Category Quick Pills & Result Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-slate-500" />
            {t.filters.allCategories}:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filters.category === cat
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Status / Reset */}
        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          <span className="text-xs text-slate-500">
            {t.filters.showing} <strong className="text-emerald-700 font-bold">{totalResultsCount}</strong> {t.filters.records}
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 transition-colors"
            >
              {t.filters.resetFilters}
            </button>
          )}
        </div>

      </div>

    </section>
  );
};

