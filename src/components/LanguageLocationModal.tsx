import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  MapPin, 
  Navigation, 
  Check, 
  Sparkles, 
  X, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { 
  SUPPORTED_LANGUAGES, 
  STATE_TO_LANGUAGE_MAP, 
  TRANSLATIONS,
  estimateStateFromCoordinates 
} from '../i18n/translations';

interface LanguageLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  currentState?: string;
  onSavePreferences: (language: SupportedLanguage, defaultState?: string) => void;
  isFirstTime?: boolean;
}

const INDIAN_STATES = [
  "Uttarakhand",
  "Punjab",
  "Haryana",
  "Uttar Pradesh",
  "Maharashtra",
  "Gujarat",
  "Madhya Pradesh",
  "Rajasthan",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Andhra Pradesh",
  "West Bengal",
  "Bihar",
  "Himachal Pradesh",
  "Odisha"
];

export const LanguageLocationModal: React.FC<LanguageLocationModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  currentState = 'Uttarakhand',
  onSavePreferences,
  isFirstTime = false
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(currentLanguage);
  const [selectedState, setSelectedState] = useState<string>(currentState || 'Uttarakhand');
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [detectionMessage, setDetectionMessage] = useState<string | null>(null);
  const [setDefaultState, setSetDefaultState] = useState<boolean>(true);

  // Sync with current props when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedLang(currentLanguage);
      if (currentState && currentState !== 'All States') {
        setSelectedState(currentState);
      }
    }
  }, [isOpen, currentLanguage, currentState]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[selectedLang] || TRANSLATIONS.en;
  const recommendedLangCode = selectedState ? STATE_TO_LANGUAGE_MAP[selectedState]?.lang || 'en' : 'en';

  // Handle GPS location detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setDetectionMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    setDetectionMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = position.coords;
        const estimatedState = estimateStateFromCoordinates(latitude, longitude);

        if (estimatedState) {
          setSelectedState(estimatedState);
          const matchedLang = STATE_TO_LANGUAGE_MAP[estimatedState]?.lang;
          if (matchedLang) {
            setSelectedLang(matchedLang);
            setDetectionMessage(`📍 Detected: ${estimatedState} • Language set to ${SUPPORTED_LANGUAGES.find(l => l.code === matchedLang)?.nativeName}`);
          } else {
            setDetectionMessage(`📍 Detected: ${estimatedState}`);
          }
        } else {
          // If outside centroid threshold or generic India location
          setDetectionMessage('📍 Located in India. Please select your specific state from the list.');
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        console.warn('Geolocation error:', error);
        setDetectionMessage('Could not retrieve GPS location. Please select your state manually below.');
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    // Auto suggest & set language when state changes
    const matchedLang = STATE_TO_LANGUAGE_MAP[stateName]?.lang;
    if (matchedLang) {
      setSelectedLang(matchedLang);
    }
  };

  const handleSave = () => {
    onSavePreferences(selectedLang, setDefaultState && selectedState ? selectedState : undefined);
    onClose();
  };

  const handleSkip = () => {
    onSavePreferences('en', undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-auto transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-850 via-slate-900 to-emerald-900 p-6 text-white relative">
          {!isFirstTime && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center p-1.5 shadow-inner">
              <img src="/favicon.svg" alt="AgriMarket Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                <Globe className="w-3 h-3 text-emerald-400" />
                {isFirstTime ? 'First Time Setup • भाषा चयन' : 'Language & Region Settings'}
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            {t.setupModal.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            {t.setupModal.subtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          
          {/* Step 1: Location Selection & GPS */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{t.setupModal.stateSelectLabel}</span>
              </label>

              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-semibold shadow-2xs transition-all disabled:opacity-60 shrink-0"
              >
                <Navigation className={`w-3.5 h-3.5 text-emerald-600 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                <span>{isDetectingLocation ? t.setupModal.detecting : t.setupModal.detectLocationBtn}</span>
              </button>
            </div>

            {/* State Select Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateSelect(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer shadow-2xs"
                >
                  <option value="">-- {t.setupModal.chooseState} --</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st} {STATE_TO_LANGUAGE_MAP[st]?.stateNameNative ? `(${STATE_TO_LANGUAGE_MAP[st].stateNameNative})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detected / Recommended Note */}
              <div className="flex items-center">
                {selectedState && STATE_TO_LANGUAGE_MAP[selectedState] && (
                  <div className="w-full p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">
                        {STATE_TO_LANGUAGE_MAP[selectedState].stateNameNative || selectedState}:
                      </span>{' '}
                      <span className="text-emerald-800">
                        {t.setupModal.recommendedLangBadge} →{' '}
                        <strong>
                          {SUPPORTED_LANGUAGES.find(l => l.code === STATE_TO_LANGUAGE_MAP[selectedState].lang)?.nativeName}
                        </strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* GPS Feedback message */}
            {detectionMessage && (
              <p className="text-xs text-emerald-700 font-medium mt-2.5 bg-emerald-50/60 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                <span>{detectionMessage}</span>
              </p>
            )}
          </div>

          {/* Step 2: Language Preference Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>{t.setupModal.selectLanguageLabel}</span>
              </label>
              <span className="text-[11px] text-slate-500">
                {SUPPORTED_LANGUAGES.length} Indian Languages supported
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                const isRecommended = lang.code === recommendedLangCode;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setSelectedLang(lang.code)}
                    className={`relative text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Recommended Tag */}
                    {isRecommended && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                        ★ Recommended
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-base font-bold tracking-tight ${isSelected ? 'text-emerald-950' : 'text-slate-900'}`}>
                          {lang.nativeName}
                        </span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        {lang.name}
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <p className="text-[11px] text-slate-600 italic truncate font-sans">
                        "{lang.sampleText}"
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                        {lang.associatedStates.join(', ')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Default State Toggle */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <label htmlFor="default-state-toggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                {t.setupModal.setDefaultStateToggle} ({selectedState || 'Uttarakhand'})
              </label>
            </div>
            <input
              id="default-state-toggle"
              type="checkbox"
              checked={setDefaultState}
              onChange={(e) => setSetDefaultState(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer border-slate-300"
            />
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            {t.setupModal.changeAnytimeNote}
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isFirstTime && (
              <button
                type="button"
                onClick={handleSkip}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t.setupModal.skipForNow}
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{t.setupModal.saveAndContinueBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
