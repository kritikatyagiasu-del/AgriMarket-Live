import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { FilterSection } from './components/FilterSection';
import { PriceTable } from './components/PriceTable';
import { TrendChartSection } from './components/TrendChartSection';
import { MarketInsightModal } from './components/MarketInsightModal';
import { BestMandiFinder } from './components/BestMandiFinder';
import { AuthOnboardingModal } from './components/AuthOnboardingModal';
import {
  MandiPriceRecord,
  MandiFilterState,
  StateDistrictMandiMap,
  SupportedLanguage,
  UserPreferences,
  UserProfile,
  UserRole
} from './types';
import { STATE_DISTRICT_MANDI_DATA } from './data/mockMandiData';
import { TRANSLATIONS } from './i18n/translations';
import { AUTH_TRANSLATIONS } from './i18n/authTranslations';
import { Download, Sprout, Info, Globe2, User, Sparkles, LogIn } from 'lucide-react';

const PREFERENCES_STORAGE_KEY = 'agrimarket_user_preferences';
const PROFILE_STORAGE_KEY = 'agrimarket_user_profile';

export default function App() {
  const [locationsMap, setLocationsMap] = useState<StateDistrictMandiMap>(STATE_DISTRICT_MANDI_DATA);
  const [records, setRecords] = useState<MandiPriceRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load user profile:', e);
    }
    return null;
  });

  const [userRole, setUserRole] = useState<UserRole>(userProfile?.userType || 'farmer');

  // User Language & Location Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load user preferences from localStorage:', e);
    }
    return {
      language: 'en',
      state: 'Uttarakhand',
      hasCompletedSetup: false
    };
  });

  // First-time onboarding / Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return !parsed.hasCompletedSetup;
      }
    } catch (e) {
      // fallback
    }
    return true;
  });

  const [authModalMode, setAuthModalMode] = useState<'language' | 'choose_auth' | 'signin' | 'register' | 'profile'>('language');

  const currentLanguage: SupportedLanguage = preferences.language || 'en';
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const authT = AUTH_TRANSLATIONS[currentLanguage] || AUTH_TRANSLATIONS.en;

  // Filters State
  const [filters, setFilters] = useState<MandiFilterState>({
    state: userProfile?.state || (preferences.state && preferences.state !== 'All States' ? preferences.state : 'All States'),
    district: userProfile?.district || 'All Districts',
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

  // Handle Save Profile & Preferences
  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    setUserRole(profile.userType);

    const updatedPrefs: UserPreferences = {
      language: currentLanguage,
      state: profile.state,
      hasCompletedSetup: true
    };
    setPreferences(updatedPrefs);

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updatedPrefs));
    } catch (e) {
      console.warn('Failed to save profile / preferences:', e);
    }

    if (profile.state) {
      setFilters((prev) => ({
        ...prev,
        state: profile.state,
        district: profile.district || 'All Districts',
        mandi: 'All Mandis'
      }));
    }
    setIsAuthModalOpen(false);
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    const updated = { ...preferences, language: lang };
    setPreferences(updated);
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save language change:', e);
    }
  };

  const handleOpenAuthModal = (mode: 'language' | 'choose_auth' | 'signin' | 'register' | 'profile' = 'choose_auth') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

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
      t.table.colCrop,
      'Variety',
      'State',
      'District',
      t.table.colMandi,
      `${t.table.colBuying} (${filters.unit})`,
      `${t.table.colSelling} (${filters.unit})`,
      `${t.table.colModal} (${filters.unit})`,
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

  const isGuest = !userProfile || userProfile.isGuest;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Onboarding & Authentication Flow Modal */}
      {isAuthModalOpen && (
        <AuthOnboardingModal
          isOpen={isAuthModalOpen}
          initialMode={authModalMode}
          currentLanguage={currentLanguage}
          onSelectLanguage={handleLanguageChange}
          currentUserProfile={userProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsAuthModalOpen(false)}
          isFirstTime={!preferences.hasCompletedSetup}
        />
      )}

      {/* Header */}
      <Header
        onRefresh={fetchPriceRecords}
        isLoading={isLoading}
        lastSyncTime={lastSyncTime}
        userRole={userRole}
        setUserRole={setUserRole}
        currentLanguage={currentLanguage}
        onChangeLanguage={handleLanguageChange}
        currentState={filters.state}
        onOpenLanguageModal={() => handleOpenAuthModal('language')}
        currentUserProfile={userProfile}
        onOpenAuthModal={handleOpenAuthModal}
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
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                {!isGuest && userProfile ? (
                  <>
                    <span>Namaste, {userProfile.firstName} {userProfile.lastName}!</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                      {t.roles[userRole]} {t.banner.mode}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                      📍 {userProfile.district}, {userProfile.state} ({userProfile.pinCode})
                    </span>
                  </>
                ) : (
                  <>
                    <span>{t.banner.title}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                      {t.roles[userRole]} {t.banner.mode}
                    </span>
                    {filters.state && filters.state !== 'All States' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        📍 {filters.state}
                      </span>
                    )}
                  </>
                )}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {!isGuest && userProfile
                  ? `Showing live wholesale arrival and benchmark rates customized for your registered district (${userProfile.district}) and state (${userProfile.state}).`
                  : t.banner.description}
              </p>
            </div>
          </div>

          {/* Actions on Banner */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {isGuest ? (
              <button
                onClick={() => handleOpenAuthModal('choose_auth')}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                id="banner-signin-btn"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{authT.existingUserTitle.split(' - ')[1] || 'Sign In / Register'}</span>
              </button>
            ) : (
              <button
                onClick={() => handleOpenAuthModal('profile')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                id="banner-profile-btn"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>{userProfile?.firstName} ({t.roles[userRole]})</span>
              </button>
            )}

            <button
              onClick={() => handleOpenAuthModal('language')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Change Language & Location"
              id="banner-change-lang-btn"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.setupModal.title}</span>
            </button>
          </div>
        </div>

        {/* Filter Section (State -> District -> Mandi Dropdowns & Search) */}
        <FilterSection
          locationsMap={locationsMap}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResultsCount={records.length}
          currentLanguage={currentLanguage}
        />

        {/* Best Mandi Finder (Arbitrage Optimization) */}
        {records.length > 0 && (
          <BestMandiFinder
            records={records}
            unit={filters.unit}
            onSelectMandiForTrend={setSelectedRecordForTrend}
            currentLanguage={currentLanguage}
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
          currentLanguage={currentLanguage}
        />

      </main>

      {/* Historical Trend Chart Modal */}
      {selectedRecordForTrend && (
        <TrendChartSection
          selectedRecord={selectedRecordForTrend}
          onClose={() => setSelectedRecordForTrend(null)}
          unit={filters.unit}
          currentLanguage={currentLanguage}
        />
      )}

      {/* AI Market Advisory Modal */}
      {selectedRecordForInsight && (
        <MarketInsightModal
          record={selectedRecordForInsight}
          onClose={() => setSelectedRecordForInsight(null)}
          currentLanguage={currentLanguage}
        />
      )}

      {/* Footer - Geometric Balance Theme */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">{t.appName}</span>
            <span>• {t.agmarknetSync}</span>
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


