import React from 'react';
import { Sprout, RefreshCw, Radio, ShieldCheck, Globe, MapPin, ChevronDown, User, LogIn } from 'lucide-react';
import { SupportedLanguage, UserProfile, UserRole } from '../types';
import { TRANSLATIONS, SUPPORTED_LANGUAGES, STATE_TO_LANGUAGE_MAP } from '../i18n/translations';
import { AUTH_TRANSLATIONS } from '../i18n/authTranslations';

interface HeaderProps {
  onRefresh?: () => void;
  isLoading?: boolean;
  lastSyncTime?: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentLanguage: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  currentState?: string;
  onOpenLanguageModal?: () => void;
  currentUserProfile: UserProfile | null;
  onOpenAuthModal: (mode?: 'language' | 'choose_auth' | 'signin' | 'register' | 'profile') => void;
}

export const Header: React.FC<HeaderProps> = ({
  userRole,
  setUserRole,
  currentLanguage,
  onChangeLanguage,
  currentState,
  onOpenLanguageModal,
  currentUserProfile,
  onOpenAuthModal
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const authT = AUTH_TRANSLATIONS[currentLanguage] || AUTH_TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const isGuest = !currentUserProfile || currentUserProfile.isGuest;
  const displayName = currentUserProfile && !currentUserProfile.isGuest 
    ? `${currentUserProfile.firstName} ${currentUserProfile.lastName?.charAt(0) ? `${currentUserProfile.lastName.charAt(0)}.` : ''}`
    : 'Guest';

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-emerald-500/30 p-1 flex items-center justify-center shadow-inner overflow-hidden shrink-0">
              <img src="/favicon.svg" alt="AgriMarket Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  AgriMarket <span className="text-emerald-400">Demo</span>
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 border border-emerald-800/60 text-emerald-300">
                  <Radio className="w-3 h-3 text-emerald-400" />
                  {t.agmarknetSync}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.liveBadge || 'Live Mandi Prices'}</span>
              </p>
            </div>
          </div>

          {/* Controls: Role Switcher, Current Language, User Account Button */}
          <div className="flex items-center justify-between lg:justify-end gap-2.5 flex-wrap">
            
            {/* Role Switcher */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 flex items-center text-xs">
              <button
                onClick={() => setUserRole('farmer')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  userRole === 'farmer'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="role-btn-farmer"
              >
                {t.roles.farmer}
              </button>
              <button
                onClick={() => setUserRole('buyer')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  userRole === 'buyer'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="role-btn-buyer"
              >
                {t.roles.buyer}
              </button>
              <button
                onClick={() => setUserRole('exporter')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  userRole === 'exporter'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="role-btn-exporter"
              >
                {t.roles.exporter}
              </button>
            </div>

            {/* Current Language Display & Selector Field */}
            <div className="relative flex items-center bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-emerald-500/60 rounded-xl px-3 py-1.5 shadow-sm transition-all group cursor-pointer">
              <Globe className="w-4 h-4 text-emerald-400 mr-2 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex flex-col pr-5">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 leading-none">
                  {currentLanguage === 'en' ? 'Language' : 'भाषा / Language'}
                </span>
                <span className="text-xs font-bold text-emerald-400 leading-tight">
                  {currentLangObj.nativeName}
                </span>
              </div>
              <select
                id="header-language-select"
                aria-label="Select Current Language"
                value={currentLanguage}
                onChange={(e) => onChangeLanguage(e.target.value as SupportedLanguage)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white py-1">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none group-hover:text-emerald-400 transition-colors" />
            </div>

            {/* User Account / Sign-In Button */}
            <button
              type="button"
              onClick={() => onOpenAuthModal(isGuest ? 'choose_auth' : 'profile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
                !isGuest 
                  ? 'bg-emerald-950/80 border-emerald-700/70 text-emerald-300 hover:bg-emerald-900/90' 
                  : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-slate-600'
              }`}
              id="header-user-account-btn"
              title={!isGuest ? 'View User Profile & Mandi Preferences' : 'Sign In / Create Account'}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                !isGuest ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}>
                {!isGuest ? displayName.charAt(0) : <User className="w-3 h-3" />}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase font-semibold text-slate-400 leading-none">
                  {!isGuest ? (currentUserProfile?.userType ? t.roles[currentUserProfile.userType] : 'Account') : 'Account'}
                </span>
                <span className="text-xs font-bold leading-tight truncate max-w-[90px]">
                  {displayName}
                </span>
              </div>
              {!isGuest ? (
                <ChevronDown className="w-3 h-3 text-emerald-400 ml-0.5" />
              ) : (
                <LogIn className="w-3 h-3 text-slate-400 ml-0.5" />
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};


