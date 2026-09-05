import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  Sparkles, 
  Calendar, 
  FileText, 
  BarChart3, 
  BookOpen, 
  Layers, 
  Clock, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { TabType } from '../types';
import { getBengaliDate } from '../utils/bengaliCalendar';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedLogo } from './AnimatedLogo';

interface HeaderNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [timeStr, setTimeStr] = useState<string>('');
  const [bengaliDateInfo, setBengaliDateInfo] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
    if (maxScroll > 0) {
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    } else {
      setScrollProgress(0);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Auto-scroll active tab into view whenever it changes
  useEffect(() => {
    const activeEl = document.getElementById(`nav-tab-${activeTab}`);
    if (activeEl && scrollContainerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setTimeout(checkScroll, 300);
    }
  }, [activeTab]);

  const scrollHorizontally = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: offset,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const bDate = getBengaliDate(now);
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const isPm = hours >= 12;
      const formattedHours = hours % 12 || 12;
      
      const toBnDigits = (str: string | number) => 
        String(str).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

      if (language === 'bn') {
        const ampm = isPm ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
        setTimeStr(`${toBnDigits(formattedHours)}:${toBnDigits(minutes)} ${ampm}`);
        setBengaliDateInfo(`${bDate.dayBn} ${bDate.monthBn}, ${bDate.yearBn} বঙ্গাব্দ`);
      } else {
        const ampm = isPm ? 'PM' : 'AM';
        setTimeStr(`${formattedHours}:${minutes} ${ampm}`);
        setBengaliDateInfo(`${bDate.day} ${bDate.month}, ${bDate.year} BS`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [language]);

  const navTabs: { id: TabType; labelKey: string; labelEn: string; labelBn: string; icon: React.ComponentType<{ className?: string }>; tag?: string }[] = [
    { id: 'directory', labelKey: 'navDirectory', labelEn: 'All Services', labelBn: 'সকল সেবা', icon: Layers, tag: '৪৫+' },
    { id: 'bijoy-unicode', labelKey: 'navBijoyUnicode', labelEn: 'Bijoy Converter', labelBn: 'বিজয় কনভার্টার', icon: Sparkles, tag: 'সুতন্বী' },
    { id: 'phonetic', labelKey: 'navPhonetic', labelEn: 'Avro Phonetic', labelBn: 'অভ্র ফোনেটিক', icon: Keyboard, tag: 'অভ্র' },
    { id: 'calendar', labelKey: 'navCalendar', labelEn: 'Bengali Calendar', labelBn: 'বঙ্গাব্দ ও পঞ্জিকা', icon: Calendar },
    { id: 'age-calculator', labelKey: 'navAgeCalculator', labelEn: 'Age Calculator', labelBn: 'বাংলা বয়স গণক', icon: Clock, tag: 'জনপ্রিয়' },
    { id: 'pdf-tools', labelKey: 'navPdfTools', labelEn: 'PDF Tools', labelBn: 'পিডিএফ টুলস', icon: FileText, tag: 'ফ্রি' },
    { id: 'templates', labelKey: 'navTemplates', labelEn: 'Templates', labelBn: 'আবেদন ও ফরম', icon: FileText },
    { id: 'number-words', labelKey: 'navNumberWords', labelEn: 'Number to Words', labelBn: 'কথায় রূপান্তর', icon: FileText },
    { id: 'analyzer', labelKey: 'navAnalyzer', labelEn: 'Text Analyzer', labelBn: 'টেক্সট কাউন্টার', icon: BarChart3 },
    { id: 'spell-dict', labelKey: 'navSpellDict', labelEn: 'Spelling & Dict', labelBn: 'বানান ও অভিধান', icon: BookOpen },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-6 z-50 max-w-[1400px] w-full mx-auto px-4 xl:px-8">
      {/* Relative container that anchors the glowing rainbow backdrop */}
      <div className="relative">
        {/* Layer 1: Slim Ambient Soft Glow (Delicate 3-4px halo behind the header) */}
        <div 
          className="rainbow-glow-ambient absolute -inset-[3px] sm:-inset-[4px] rounded-[2.2rem] pointer-events-none transition-all duration-500"
          aria-hidden="true"
        />

        {/* Layer 2: Sleek Radiant Rim (Fine 1.5px colorful outline around the card) */}
        <div 
          className="rainbow-glow-rim absolute -inset-[1.5px] rounded-[2.08rem] opacity-90 blur-[1px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Main Foreground Header Card */}
        <div className="relative z-10 glass-panel rounded-[2rem] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] transition-all flex flex-col overflow-hidden border border-white/90 bg-white/95 backdrop-blur-2xl">
          {/* Top Brand & Controls Bar */}
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4 bg-white/70">
            {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              id="brand-logo-btn"
              onClick={() => handleTabClick('directory')}
              className="flex items-center gap-2.5 sm:gap-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006B54] rounded-xl p-1 group transition-transform active:scale-98"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#006B54] to-[#004B3A] text-white flex items-center justify-center shadow-lg border border-emerald-500/30 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
                <AnimatedLogo className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[19px] sm:text-[22px] text-slate-900 tracking-tight font-sans-ui flex items-center gap-1.5">
                    <span className={language === 'bn' ? 'font-helal-arafat text-[22px] sm:text-[25px] font-normal tracking-wide text-slate-900 inline-block' : ''}>
                      {language === 'bn' ? 'নুন-মুন' : 'Noon-Moon'}
                    </span>
                    <span className="text-[#006B54] text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                      {language === 'bn' ? 'বাংলা পোর্টাল' : 'Bangla Portal'}
                    </span>
                  </span>
                  <span className="hidden xs:inline-flex text-[10px] sm:text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {t('brandBadge')}
                  </span>
                </div>
                <p className="text-[11px] sm:text-[12px] text-slate-500 leading-normal mt-1 sm:mt-1.5 hidden md:block font-medium">
                  {language === 'bn' ? 'বাংলা ডিজিটাল টুলস, কিবোর্ড কনভার্টার ও নাগরিক সেবা হাব' : 'Bengali Digital Tools, Keyboard Converters & Citizen Service Hub'}
                </p>
              </div>
            </button>
          </div>

          {/* Center Live Date & Time Widget */}
          <div className="hidden lg:flex items-center gap-3 bg-white/70 border border-slate-200/60 text-slate-600 px-4 py-1.5 rounded-full text-xs shadow-sm">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#006B54]" />
              <span>{bengaliDateInfo}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1.5 font-mono-code text-slate-800 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#006B54]" />
              <span>{timeStr}</span>
            </div>
          </div>

          {/* Action Controls & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Button (বাংলা ⇄ English) */}
            <div className="flex items-center bg-slate-100/80 border border-slate-200/60 p-1 rounded-full shadow-inner" title="ভাষা পরিবর্তন / Switch Language">
              <button
                id="lang-btn-bn"
                onClick={() => setLanguage('bn')}
                aria-label="Switch to Bengali"
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'bn'
                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                বাংলা
              </button>
              <button
                id="lang-btn-en"
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                ENG
              </button>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-white/60 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-white focus:outline-none transition-colors shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Primary Navigation Bar (Secondary Categories / Tools Strip) */}
        <div className="relative border-t border-slate-200/50 select-none bg-slate-50/40">
          {/* Left Scroll Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => scrollHorizontally(-220)}
              aria-label="Scroll left"
              className="absolute left-0 top-0 bottom-1 z-10 px-1 flex items-center justify-center bg-gradient-to-r from-white via-white/90 to-transparent text-slate-500 hover:text-slate-800 transition-all rounded-bl-[2rem]"
            >
              <div className="p-1 rounded-full bg-white border border-slate-200 shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </div>
            </button>
          )}

          {/* Navigation Tabs Scroll Container */}
          <nav 
            ref={scrollContainerRef}
            id="primary-navigation-bar"
            aria-label="Primary Services Navigation"
            className="nav-scroll-container px-3 sm:px-6 flex items-center gap-2 py-3 scroll-smooth"
          >
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const label = language === 'bn' ? tab.labelBn : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006B54] ${
                    isActive
                      ? 'bg-[#006B54] text-white shadow-pill-green font-bold'
                      : 'bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm border border-slate-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                  <span>{label}</span>
                  {tab.tag && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                      isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {tab.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Scroll Arrow Button */}
          {canScrollRight && (
            <button
              onClick={() => scrollHorizontally(220)}
              aria-label="Scroll right"
              className="absolute right-0 top-0 bottom-1 z-10 px-1 flex items-center justify-center bg-gradient-to-l from-white via-white/90 to-transparent text-slate-500 hover:text-slate-800 transition-all rounded-br-[2rem]"
            >
              <div className="p-1 rounded-full bg-white border border-slate-200 shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white rounded-[2rem] p-4 space-y-3 shadow-xl border border-slate-200 animate-in fade-in duration-150 relative z-40">
          {/* Mobile Date & Time Banner */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#006B54]" />
              <span>{bengaliDateInfo}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono-code text-slate-800 font-semibold">
              <Clock className="w-4 h-4 text-[#006B54]" />
              <span>{timeStr}</span>
            </div>
          </div>

          {/* Grid of Tools for Quick Mobile Access */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const label = language === 'bn' ? tab.labelBn : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl text-left text-xs font-semibold border transition-all ${
                    isActive
                      ? 'bg-[#006B54] text-white border-[#006B54] shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                    <span className="truncate">{label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
