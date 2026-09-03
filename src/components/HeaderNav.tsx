import { WaveBottom } from './Waves';
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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-red-800 via-red-700 to-rose-900 text-white shadow-md border-b border-red-950/30 transition-all pb-8 sm:pb-12">
      <WaveBottom />
      
      {/* Top Brand & Controls Bar (Lipighor Style Header) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            id="brand-logo-btn"
            onClick={() => handleTabClick('directory')}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded-xl p-1 group transition-transform active:scale-98"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-red-700 flex items-center justify-center shadow-md border border-red-200/50 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img src="/noon-moon-logo.png" alt="Noon-Moon Logo" className="w-full h-full object-cover select-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[19px] sm:text-[22px] text-white tracking-tight font-sans-ui flex items-center gap-1.5">
                  <span>{language === 'bn' ? 'নুন-মুন' : 'Noon-Moon'}</span>
                  <span className="text-red-100 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-red-950/50 border border-red-400/30">
                    {language === 'bn' ? 'বাংলা পোর্টাল' : 'Bangla Portal'}
                  </span>
                </span>
                <span className="hidden xs:inline-flex text-[10px] sm:text-[11px] bg-red-950/40 text-red-200 font-semibold px-2.5 py-0.5 rounded-full border border-red-500/40">
                  {t('brandBadge')}
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-red-100/80 leading-none mt-0.5 hidden md:block">
                {language === 'bn' ? 'বাংলা ডিজিটাল টুলস, কিবোর্ড কনভার্টার ও নাগরিক সেবা হাব' : 'Bengali Digital Tools, Keyboard Converters & Citizen Service Hub'}
              </p>
            </div>
          </button>
        </div>

        {/* Center Live Date & Time Widget (Lipighor / FontBD Status Widget) */}
        <div className="hidden lg:flex items-center gap-3 bg-red-950/45 border border-red-500/30 text-red-100 px-4 py-1.5 rounded-full text-xs shadow-inner">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-red-300" />
            <span>{bengaliDateInfo}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-red-400/50" />
          <div className="flex items-center gap-1.5 font-mono-code text-white font-semibold">
            <Clock className="w-3.5 h-3.5 text-red-300" />
            <span>{timeStr}</span>
          </div>
        </div>

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Button (বাংলা ⇄ English) */}
          <div className="flex items-center bg-red-950/50 border border-red-500/30 p-0.5 rounded-xl shadow-xs" title="ভাষা পরিবর্তন / Switch Language">
            <button
              id="lang-btn-bn"
              onClick={() => setLanguage('bn')}
              aria-label="Switch to Bengali"
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'bn'
                  ? 'bg-white text-red-800 shadow-sm'
                  : 'text-red-100 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <button
              id="lang-btn-en"
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-white text-red-800 shadow-sm'
                  : 'text-red-100 hover:text-white'
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
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-red-950/40 text-red-100 hover:text-white border border-red-500/30 hover:bg-red-950/60 focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar (Secondary Categories / Tools Strip like Lipighor) */}
      <div className="relative bg-red-950/35 border-t border-red-500/20 select-none">
        {/* Left Scroll Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollHorizontally(-220)}
            aria-label="Scroll left"
            className="absolute left-0 top-0 bottom-1 z-10 px-1 sm:px-2 flex items-center justify-center bg-gradient-to-r from-red-950 via-red-950/90 to-transparent text-red-100 hover:text-white transition-all shadow-md group"
          >
            <div className="p-1 rounded-lg bg-red-800/80 border border-red-600/40 group-hover:scale-105 transition-all shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </div>
          </button>
        )}

        {/* Navigation Tabs Scroll Container */}
        <nav 
          ref={scrollContainerRef}
          id="primary-navigation-bar"
          aria-label="Primary Services Navigation"
          className="nav-scroll-container max-w-7xl mx-auto px-2 sm:px-6 flex items-center gap-1.5 sm:gap-2 py-2 scroll-smooth"
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
                className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13.5px] font-medium transition-all duration-150 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive
                    ? 'bg-white text-red-800 shadow-md font-bold scale-[1.02]'
                    : 'bg-red-950/30 text-red-100 hover:text-white border border-red-600/25 hover:bg-red-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-red-700' : 'text-red-300'}`} />
                <span>{label}</span>
                {tab.tag && (
                  <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ${
                    isActive ? 'bg-red-100 text-red-800' : 'bg-red-950/60 text-red-200 border border-red-600/30'
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
            className="absolute right-0 top-0 bottom-1 z-10 px-1 sm:px-2 flex items-center justify-center bg-gradient-to-l from-red-950 via-red-950/90 to-transparent text-red-100 hover:text-white transition-all shadow-md group"
          >
            <div className="p-1 rounded-lg bg-red-800/80 border border-red-600/40 group-hover:scale-105 transition-all shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        )}

        {/* Visual Line Bar Scroll Track & Active Indicator */}
        <div 
          className="w-full h-1 bg-red-950/40 relative overflow-hidden border-t border-red-600/20"
          title="Scroll Indicator Bar"
        >
          <div 
            className="h-full bg-red-300 rounded-full transition-all duration-150 shadow-sm"
            style={{
              width: '35%',
              transform: `translateX(${scrollProgress * 1.85}%)`,
            }}
          />
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-red-950 border-t border-red-700/60 p-4 space-y-3 shadow-2xl animate-in fade-in duration-150">
          {/* Mobile Date & Time Banner */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-900/50 border border-red-700/60 text-xs text-red-100">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-red-300" />
              <span>{bengaliDateInfo}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono-code text-white font-semibold">
              <Clock className="w-3.5 h-3.5 text-red-300" />
              <span>{timeStr}</span>
            </div>
          </div>

          {/* Grid of Tools for Quick Mobile Access */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const label = language === 'bn' ? tab.labelBn : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                    isActive
                      ? 'bg-white text-red-900 border-white font-bold shadow-sm'
                      : 'bg-red-950/40 text-red-100 border-red-700/50 hover:bg-red-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-700' : 'text-red-300'}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-red-700' : 'text-red-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Mobile Bottom Info */}
          <div className="pt-2 border-t border-red-700/40 flex items-center justify-between text-xs text-red-200">
            <span className="text-[11px] font-medium">
              {language === 'bn' ? 'নুন-মুন • বাংলা ডিজিটাল সেবা ও ফন্ট হাব' : 'Noon-Moon • Bangla Online Hub'}
            </span>
            <span className="text-[11px] font-medium flex items-center gap-1 text-red-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              WCAG 2.2 AA
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
