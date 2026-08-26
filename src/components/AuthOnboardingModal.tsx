import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  MapPin, 
  Navigation, 
  Check, 
  Sparkles, 
  X, 
  ArrowRight, 
  ArrowLeft,
  User, 
  UserPlus, 
  LogIn, 
  KeyRound, 
  Lock, 
  Phone, 
  Building, 
  Building2,
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  Apple, 
  Compass, 
  LogOut,
  ChevronRight,
  Info
} from 'lucide-react';
import { SupportedLanguage, UserProfile, UserRole } from '../types';
import { 
  SUPPORTED_LANGUAGES, 
  STATE_TO_LANGUAGE_MAP, 
  estimateStateFromCoordinates 
} from '../i18n/translations';
import { AUTH_TRANSLATIONS } from '../i18n/authTranslations';
import { lookupPincode } from '../data/pincodeData';

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  currentUserProfile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  initialMode?: 'language' | 'choose_auth' | 'signin' | 'register' | 'profile';
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

// District suggestions per state for rich dropdowns
const STATE_DISTRICTS_SUGGESTIONS: Record<string, string[]> = {
  "Uttarakhand": ["Haridwar", "Dehradun", "Udham Singh Nagar", "Nainital", "Almora", "Tehri Garhwal", "Pauri Garhwal"],
  "Punjab": ["Ludhiana", "Amritsar", "Bathinda", "Jalandhar", "Patiala", "Sangrur", "Firozpur"],
  "Haryana": ["Karnal", "Ambala", "Kurukshetra", "Faridabad", "Gurugram", "Hisar", "Sirsa"],
  "Uttar Pradesh": ["Agra", "Lucknow", "Varanasi", "Meerut", "Kanpur", "Prayagraj", "Bareilly", "Gorakhpur"],
  "Maharashtra": ["Kolhapur", "Nashik", "Pune", "Mumbai Suburban", "Nagpur", "Aurangabad", "Solapur", "Ahmednagar"],
  "Gujarat": ["Rajkot", "Mehsana", "Ahmedabad", "Surat", "Vadodara", "Amreli", "Junagadh", "Kutch"],
  "Madhya Pradesh": ["Indore", "Mandsaur", "Bhopal", "Gwalior", "Jabalpur", "Ujjain", "Neemuch"],
  "Rajasthan": ["Kota", "Jaipur", "Jodhpur", "Bikaner", "Sri Ganganagar", "Udaipur", "Alwar"],
  "Karnataka": ["Bengaluru Urban", "Mysuru", "Hubballi-Dharwad", "Belagavi", "Shivamogga", "Tumakuru"],
  "Tamil Nadu": ["Coimbatore", "Chennai", "Madurai", "Salem", "Thanjavur", "Tiruchirappalli", "Erode"],
  "Telangana": ["Nizamabad", "Hyderabad", "Warangal", "Khammam", "Karimnagar"],
  "Andhra Pradesh": ["Guntur", "Visakhapatnam", "Kurnool", "Vijayawada", "East Godavari", "Chittoor"],
  "West Bengal": ["Hooghly", "Kolkata", "Bardhaman", "North 24 Parganas", "Siliguri", "Murshidabad"],
  "Bihar": ["Patna", "Bhagalpur", "Gaya", "Muzaffarpur", "Purnea", "Nalanda"],
  "Himachal Pradesh": ["Shimla", "Kullu", "Mandi", "Solan", "Kangra"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Bargarh", "Sambalpur", "Ganjam"]
};

export const AuthOnboardingModal: React.FC<AuthOnboardingModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
  currentUserProfile,
  onSaveProfile,
  initialMode = 'language',
  isFirstTime = false
}) => {
  // Navigation step within onboarding modal
  const [step, setStep] = useState<'language' | 'choose_auth' | 'signin' | 'register' | 'profile'>(initialMode);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(currentLanguage);
  
  // Detection state
  const [selectedState, setSelectedState] = useState<string>(currentUserProfile?.state || 'Uttarakhand');
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [detectionMessage, setDetectionMessage] = useState<string | null>(null);

  // Sign In Form state
  const [signInUserId, setSignInUserId] = useState<string>(currentUserProfile?.emailOrUserId || currentUserProfile?.phone || '');
  const [signInPassword, setSignInPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [signInError, setSignInError] = useState<string | null>(null);

  // Registration Form state
  const [regFirstName, setRegFirstName] = useState<string>(currentUserProfile?.firstName || '');
  const [regLastName, setRegLastName] = useState<string>(currentUserProfile?.lastName || '');
  const [regPhone, setRegPhone] = useState<string>(currentUserProfile?.phone || '');
  const [regPincode, setRegPincode] = useState<string>(currentUserProfile?.pinCode || '');
  const [regDistrict, setRegDistrict] = useState<string>(currentUserProfile?.district || 'Haridwar');
  const [regState, setRegState] = useState<string>(currentUserProfile?.state || 'Uttarakhand');
  const [regUserType, setRegUserType] = useState<UserRole>(currentUserProfile?.userType || 'farmer');
  const [regPassword, setRegPassword] = useState<string>('');
  const [pincodeSuccessMsg, setPincodeSuccessMsg] = useState<string | null>(null);
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  // Device detection for Apple Sign-In
  const [isAppleDevice, setIsAppleDevice] = useState<boolean>(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || '';
      const isApple = /iPhone|iPad|iPod|Macintosh|Mac OS X/.test(ua);
      setIsAppleDevice(isApple);
    }
  }, []);

  // Update internal step when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedLang(currentLanguage);
      if (initialMode) {
        setStep(initialMode);
      } else if (currentUserProfile && !currentUserProfile.isGuest) {
        setStep('profile');
      } else if (isFirstTime) {
        setStep('language');
      } else {
        setStep('choose_auth');
      }
      setSignInError(null);
      setRegErrors({});
    }
  }, [isOpen, initialMode, isFirstTime, currentLanguage, currentUserProfile]);

  if (!isOpen) return null;

  const t = AUTH_TRANSLATIONS[selectedLang] || AUTH_TRANSLATIONS.en;
  const recommendedLangCode = selectedState ? STATE_TO_LANGUAGE_MAP[selectedState]?.lang || 'en' : 'en';

  // Handle GPS location detection on language step
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
          setRegState(estimatedState);
          const matchedLang = STATE_TO_LANGUAGE_MAP[estimatedState]?.lang;
          if (matchedLang) {
            setSelectedLang(matchedLang);
            onSelectLanguage(matchedLang);
            setDetectionMessage(`📍 Detected: ${estimatedState} • Language set to ${SUPPORTED_LANGUAGES.find(l => l.code === matchedLang)?.nativeName}`);
          } else {
            setDetectionMessage(`📍 Detected: ${estimatedState}`);
          }
        } else {
          setDetectionMessage('📍 Location detected in India. Please select state manually.');
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        console.warn('Geolocation error:', error);
        setDetectionMessage('Could not retrieve GPS location. Please select manually below.');
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  // Language selection handler
  const handleSelectLanguageCard = (langCode: SupportedLanguage) => {
    setSelectedLang(langCode);
    onSelectLanguage(langCode);
  };

  // PIN code auto-population handler
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setRegPincode(clean);
    setPincodeSuccessMsg(null);

    if (clean.length >= 2) {
      const match = lookupPincode(clean);
      if (match) {
        setRegState(match.state);
        setSelectedState(match.state);
        setRegDistrict(match.district);
        setPincodeSuccessMsg(`✓ ${match.state}, ${match.district} (Auto-filled)`);
        
        // Clear errors if any
        setRegErrors((prev) => {
          const next = { ...prev };
          delete next.pinCode;
          delete next.state;
          delete next.district;
          return next;
        });
      }
    }
  };

  // Existing User Sign-In Handler
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInUserId.trim()) {
      setSignInError('Please enter your User ID, Phone, or Email.');
      return;
    }

    // Authenticate or generate user profile from credentials
    const isPhone = /^\d{10}$/.test(signInUserId.trim());
    const profile: UserProfile = {
      firstName: currentUserProfile?.firstName || (isPhone ? 'User' : signInUserId.split('@')[0]),
      lastName: currentUserProfile?.lastName || (isPhone ? `(${signInUserId.slice(-4)})` : ''),
      phone: isPhone ? signInUserId.trim() : (currentUserProfile?.phone || '9876543210'),
      pinCode: currentUserProfile?.pinCode || '249401',
      district: currentUserProfile?.district || 'Haridwar',
      state: selectedState || currentUserProfile?.state || 'Uttarakhand',
      userType: currentUserProfile?.userType || 'farmer',
      emailOrUserId: signInUserId.trim(),
      isGuest: false,
      authProvider: 'credentials',
      registeredAt: new Date().toISOString()
    };

    onSaveProfile(profile);
    onClose();
  };

  // Social Auth Handler (Google / Apple)
  const handleSocialAuth = (provider: 'google' | 'apple') => {
    const providerName = provider === 'google' ? 'Google' : 'Apple ID';
    const sampleEmail = provider === 'google' ? 'user.agrimarket@gmail.com' : 'user.agrimarket@icloud.com';
    
    const profile: UserProfile = {
      firstName: provider === 'google' ? 'Kisan' : 'Apple',
      lastName: provider === 'google' ? 'Trader' : 'User',
      phone: '9876501234',
      pinCode: '249401',
      district: 'Haridwar',
      state: selectedState || 'Uttarakhand',
      userType: 'farmer',
      emailOrUserId: sampleEmail,
      isGuest: false,
      authProvider: provider,
      registeredAt: new Date().toISOString()
    };

    onSaveProfile(profile);
    onClose();
  };

  // New User Registration Handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!regFirstName.trim()) {
      errors.firstName = 'First name is required.';
    }
    if (!regLastName.trim()) {
      errors.lastName = 'Last name is required.';
    }
    if (!regPhone.trim() || regPhone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Valid 10-digit phone number is required.';
    }
    if (!regPincode.trim() || regPincode.replace(/\D/g, '').length !== 6) {
      errors.pinCode = 'Valid 6-digit Indian PIN code is required.';
    }
    if (!regDistrict.trim()) {
      errors.district = 'District is required.';
    }
    if (!regState.trim()) {
      errors.state = 'State is required.';
    }

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const profile: UserProfile = {
      firstName: regFirstName.trim(),
      lastName: regLastName.trim(),
      phone: regPhone.trim().replace(/\D/g, '').slice(-10),
      pinCode: regPincode.trim(),
      district: regDistrict.trim(),
      state: regState.trim(),
      userType: regUserType,
      emailOrUserId: `${regFirstName.toLowerCase()}.${regLastName.toLowerCase()}@agrimarket.in`,
      isGuest: false,
      authProvider: 'credentials',
      registeredAt: new Date().toISOString()
    };

    onSaveProfile(profile);
    onClose();
  };

  // Continue As Guest Handler
  const handleContinueAsGuest = () => {
    const guestProfile: UserProfile = {
      firstName: 'Guest',
      lastName: 'Farmer',
      phone: '',
      pinCode: '249401',
      district: 'Haridwar',
      state: selectedState || 'Uttarakhand',
      userType: 'farmer',
      isGuest: true,
      authProvider: 'guest',
      registeredAt: new Date().toISOString()
    };

    onSaveProfile(guestProfile);
    onClose();
  };

  // Sign Out Handler
  const handleSignOut = () => {
    const guestProfile: UserProfile = {
      firstName: 'Guest',
      lastName: 'User',
      phone: '',
      pinCode: '249401',
      district: 'Haridwar',
      state: 'Uttarakhand',
      userType: 'farmer',
      isGuest: true,
      authProvider: 'guest'
    };
    onSaveProfile(guestProfile);
    setStep('choose_auth');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      id="auth-onboarding-modal-backdrop"
    >
      <div 
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-auto transition-all flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        id="auth-onboarding-modal-card"
      >
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 p-5 sm:p-6 text-white relative shrink-0">
          {!isFirstTime && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
              id="close-auth-modal-btn"
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
                <span>{t.welcomeBadge}</span>
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            {step === 'language' && t.step1Title}
            {step === 'choose_auth' && t.step2Title}
            {step === 'signin' && t.signInHeading}
            {step === 'register' && t.registerHeading}
            {step === 'profile' && t.profileTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            {step === 'language' && t.step1Subtitle}
            {step === 'choose_auth' && t.step2Subtitle}
            {step === 'signin' && t.signInSubheading}
            {step === 'register' && t.registerSubheading}
            {step === 'profile' && `Signed in as ${currentUserProfile?.firstName} ${currentUserProfile?.lastName} (${currentUserProfile?.userType})`}
          </p>

          {/* Breadcrumb Steps Indicator */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setStep('language')}
              className={`flex items-center gap-1 font-semibold transition-colors ${
                step === 'language' ? 'text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/10 inline-flex items-center justify-center text-[10px]">1</span>
              <span>Language</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <button
              type="button"
              onClick={() => setStep('choose_auth')}
              className={`flex items-center gap-1 font-semibold transition-colors ${
                step === 'choose_auth' ? 'text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/10 inline-flex items-center justify-center text-[10px]">2</span>
              <span>Account Type</span>
            </button>
            {(step === 'signin' || step === 'register') && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-white/10 inline-flex items-center justify-center text-[10px]">3</span>
                  <span>{step === 'signin' ? 'Sign In' : 'Registration'}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Modal Body with dynamic step content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* ========================================================================= */}
          {/* STEP 1: LANGUAGE & LOCATION SELECTION */}
          {/* ========================================================================= */}
          {step === 'language' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* State & GPS Auto Detection */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>State / Region Selection</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isDetectingLocation}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-semibold shadow-2xs transition-all disabled:opacity-60 shrink-0 cursor-pointer"
                    id="detect-gps-btn"
                  >
                    <Navigation className={`w-3.5 h-3.5 text-emerald-600 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                    <span>{isDetectingLocation ? 'Detecting Location...' : 'Auto-Detect via GPS'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setRegState(e.target.value);
                      const matchedLang = STATE_TO_LANGUAGE_MAP[e.target.value]?.lang;
                      if (matchedLang) {
                        setSelectedLang(matchedLang);
                        onSelectLanguage(matchedLang);
                      }
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                    id="setup-state-select"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st} {STATE_TO_LANGUAGE_MAP[st]?.stateNameNative ? `(${STATE_TO_LANGUAGE_MAP[st].stateNameNative})` : ''}
                      </option>
                    ))}
                  </select>

                  {selectedState && STATE_TO_LANGUAGE_MAP[selectedState] && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold">{selectedState}:</span> Recommended language is{' '}
                        <strong>{SUPPORTED_LANGUAGES.find(l => l.code === STATE_TO_LANGUAGE_MAP[selectedState]?.lang)?.nativeName}</strong>
                      </div>
                    </div>
                  )}
                </div>

                {detectionMessage && (
                  <p className="text-xs text-emerald-700 font-medium mt-2.5 bg-emerald-50/60 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                    <span>{detectionMessage}</span>
                  </p>
                )}
              </div>

              {/* 9 Regional Languages Grid */}
              <div>
                <label className="text-xs font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Choose Your Preferred Mandi Language</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = selectedLang === lang.code;
                    const isRecommended = lang.code === recommendedLangCode;

                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleSelectLanguageCard(lang.code)}
                        className={`relative text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                        }`}
                        id={`select-lang-${lang.code}`}
                      >
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

              {/* Action Button */}
              <div className="pt-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setStep('choose_auth')}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="lang-step-next-btn"
                >
                  <span>Continue to Account Options ({SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.nativeName})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: 3-CHOICE SELECTION (EXISTING USER, NEW USER, GUEST) */}
          {/* ========================================================================= */}
          {step === 'choose_auth' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Option 1: Existing User - Sign In */}
              <button
                type="button"
                onClick={() => setStep('signin')}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 transition-all shadow-sm hover:shadow-md group flex items-start justify-between gap-4 cursor-pointer"
                id="choose-existing-user-btn"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-850">
                        {t.existingUserTitle}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        🔑 Sign In
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {t.existingUserSubtitle}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                      <span>• Password / PIN</span>
                      <span>• Google Login</span>
                      <span>• Apple Sign In</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 shrink-0 self-center group-hover:translate-x-1 transition-all" />
              </button>

              {/* Option 2: New User - Create an Account */}
              <button
                type="button"
                onClick={() => setStep('register')}
                className="w-full text-left p-5 rounded-2xl border-2 border-emerald-500/60 bg-emerald-50/30 hover:bg-emerald-50/70 transition-all shadow-sm hover:shadow-md group flex items-start justify-between gap-4 cursor-pointer"
                id="choose-new-user-btn"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-850">
                        {t.newUserTitle}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 border border-emerald-300">
                        ✨ Recommended
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {t.newUserSubtitle}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                      <span>• PIN Code Auto-Fill</span>
                      <span>• Farmer / Wholesaler / Exporter</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-600 shrink-0 self-center group-hover:translate-x-1 transition-all" />
              </button>

              {/* Option 3: Continue as Guest */}
              <button
                type="button"
                onClick={handleContinueAsGuest}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition-all shadow-xs group flex items-start justify-between gap-4 cursor-pointer"
                id="choose-guest-btn"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-800">
                        {t.guestTitle}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {t.guestSubtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 shrink-0 self-center group-hover:translate-x-1 transition-all" />
              </button>

              {/* Back to Language Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('language')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                  id="back-to-language-btn"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.changeLanguageBtn} ({SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.nativeName})</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3A: EXISTING USER SIGN IN SCREEN */}
          {/* ========================================================================= */}
          {step === 'signin' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                
                {signInError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {signInError}
                  </div>
                )}

                {/* User ID / Phone / Email */}
                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-1.5">
                    {t.userIdLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={signInUserId}
                      onChange={(e) => {
                        setSignInUserId(e.target.value);
                        setSignInError(null);
                      }}
                      placeholder={t.userIdPlaceholder}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      id="signin-userid-input"
                    />
                  </div>
                </div>

                {/* Password / Security PIN */}
                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-1.5">
                    {t.passwordLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="password"
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      id="signin-password-input"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                    />
                    <span>{t.rememberMe}</span>
                  </label>
                  <span className="text-emerald-700 hover:underline cursor-pointer">Forgot PIN?</span>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="signin-submit-btn"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.signInBtn}</span>
                </button>
              </form>

              {/* Social Login Options */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-slate-500 font-medium">
                    {t.orContinueWith}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
                  id="google-signin-btn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{t.googleBtn}</span>
                </button>

                {/* Apple Sign In (Device Aware) */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('apple')}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer ${
                    isAppleDevice 
                      ? 'bg-black text-white hover:bg-slate-800 ring-2 ring-emerald-500/30' 
                      : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-800'
                  }`}
                  id="apple-signin-btn"
                >
                  <Apple className="w-4 h-4 fill-current" />
                  <span>{t.appleBtn}</span>
                  {isAppleDevice && (
                    <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-semibold ml-1">
                      iOS / Mac
                    </span>
                  )}
                </button>
              </div>

              {/* Navigation links */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStep('choose_auth')}
                  className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.backBtn}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('register')}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    {t.dontHaveAccount} {t.createAccountLink}
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={handleContinueAsGuest}
                    className="text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {t.continueAsGuestBtn}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3B: NEW USER REGISTRATION SCREEN */}
          {/* ========================================================================= */}
          {step === 'register' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                
                {/* 1. First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block mb-1">
                      {t.firstNameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regFirstName}
                      onChange={(e) => {
                        setRegFirstName(e.target.value);
                        if (regErrors.firstName) setRegErrors(prev => ({ ...prev, firstName: '' }));
                      }}
                      placeholder={t.firstNamePlaceholder}
                      className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs ${
                        regErrors.firstName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                      id="reg-firstname-input"
                    />
                    {regErrors.firstName && (
                      <span className="text-[11px] text-red-600 mt-1 block">{regErrors.firstName}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-900 block mb-1">
                      {t.lastNameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regLastName}
                      onChange={(e) => {
                        setRegLastName(e.target.value);
                        if (regErrors.lastName) setRegErrors(prev => ({ ...prev, lastName: '' }));
                      }}
                      placeholder={t.lastNamePlaceholder}
                      className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs ${
                        regErrors.lastName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                      id="reg-lastname-input"
                    />
                    {regErrors.lastName && (
                      <span className="text-[11px] text-red-600 mt-1 block">{regErrors.lastName}</span>
                    )}
                  </div>
                </div>

                {/* 2. Phone Number & PIN code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-slate-900 block mb-1">
                      {t.phoneLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500 pointer-events-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={regPhone}
                        onChange={(e) => {
                          setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                          if (regErrors.phone) setRegErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder={t.phonePlaceholder}
                        className={`w-full bg-white border rounded-xl pl-12 pr-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs ${
                          regErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                        id="reg-phone-input"
                      />
                    </div>
                    {regErrors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">{regErrors.phone}</span>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-900 block">
                        {t.pincodeLabel} <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        Auto-detects State
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={regPincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder={t.pincodePlaceholder}
                        className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs ${
                          regErrors.pinCode ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                        id="reg-pincode-input"
                      />
                      {pincodeSuccessMsg && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-3 pointer-events-none" />
                      )}
                    </div>
                    {pincodeSuccessMsg && (
                      <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                        {pincodeSuccessMsg}
                      </span>
                    )}
                    {regErrors.pinCode && (
                      <span className="text-[11px] text-red-600 mt-1 block">{regErrors.pinCode}</span>
                    )}
                  </div>
                </div>

                {/* 3. State & District (Auto-populated from PIN code) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {/* State (Auto-populated & Selectable) */}
                  <div>
                    <label className="text-xs font-bold text-slate-900 flex items-center justify-between mb-1">
                      <span>{t.stateLabel} (Auto-populated) <span className="text-red-500">*</span></span>
                    </label>
                    <select
                      value={regState}
                      onChange={(e) => {
                        setRegState(e.target.value);
                        setSelectedState(e.target.value);
                        // set district default for selected state
                        const districts = STATE_DISTRICTS_SUGGESTIONS[e.target.value];
                        if (districts && districts.length > 0) {
                          setRegDistrict(districts[0]);
                        }
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                      id="reg-state-select"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District (Auto-populated & Selectable) */}
                  <div>
                    <label className="text-xs font-bold text-slate-900 flex items-center justify-between mb-1">
                      <span>{t.districtLabel} <span className="text-red-500">*</span></span>
                    </label>
                    {STATE_DISTRICTS_SUGGESTIONS[regState] ? (
                      <select
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                        id="reg-district-select"
                      >
                        {STATE_DISTRICTS_SUGGESTIONS[regState].map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        required
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        placeholder="Enter District"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        id="reg-district-input"
                      />
                    )}
                  </div>
                </div>

                {/* 4. User Type Dropdown (Farmer, Buyer / Wholesaler, Exporter) */}
                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-1">
                    {t.userTypeLabel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={regUserType}
                    onChange={(e) => setRegUserType(e.target.value as UserRole)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                    id="reg-usertype-select"
                  >
                    <option value="farmer">{t.roleFarmer}</option>
                    <option value="buyer">{t.roleBuyer}</option>
                    <option value="exporter">{t.roleExporter}</option>
                  </select>

                  {/* Context Helper for Selected Role */}
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {regUserType === 'farmer' && t.roleFarmerDesc}
                      {regUserType === 'buyer' && t.roleBuyerDesc}
                      {regUserType === 'exporter' && t.roleExporterDesc}
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="reg-submit-btn"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.saveRegisterBtn}</span>
                </button>
              </form>

              {/* Navigation links */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStep('choose_auth')}
                  className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.backBtn}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('signin')}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    {t.alreadyHaveAccount} {t.signInLink}
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={handleContinueAsGuest}
                    className="text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {t.continueAsGuestBtn}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: VIEW USER PROFILE / ACCOUNT DETAILS */}
          {/* ========================================================================= */}
          {step === 'profile' && currentUserProfile && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shadow-sm">
                    {currentUserProfile.firstName.charAt(0)}{currentUserProfile.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {currentUserProfile.firstName} {currentUserProfile.lastName}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {currentUserProfile.userType === 'farmer' && '🌾 Farmer'}
                        {currentUserProfile.userType === 'buyer' && '🛒 Buyer & Wholesaler'}
                        {currentUserProfile.userType === 'exporter' && '🚢 Exporter'}
                      </span>
                      {currentUserProfile.isGuest && (
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 font-medium">
                          Guest Mode
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Phone Number</span>
                    <span className="font-bold text-slate-800">{currentUserProfile.phone ? `+91 ${currentUserProfile.phone}` : 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">PIN Code</span>
                    <span className="font-bold text-slate-800">{currentUserProfile.pinCode || '249401'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">District & State</span>
                    <span className="font-bold text-slate-800">{currentUserProfile.district}, {currentUserProfile.state}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Active Language</span>
                    <span className="font-bold text-emerald-700">
                      {SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.nativeName} ({selectedLang.toUpperCase()})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('language')}
                  className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>{t.changeLanguageBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep('register')}
                  className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <UserPlus className="w-4 h-4 text-emerald-600" />
                  <span>Edit Profile / Switch Role</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.signOutBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
