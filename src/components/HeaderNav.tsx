import { WaveBottom } from './Waves';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  Sparkles, 
  Calendar, 
  FileText, 
  BarChart3, 
  BookOpen, 
  Type, 
  Layers, 
  Clock, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';
import { TabType } from '../types';
import { getBengaliDate } from '../utils/bengaliCalendar';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [timeStr, setTimeStr] = useState<string>('');
  const [bengaliDateInfo, setBengaliDateInfo] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0); // 0 to 100%

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
    { id: 'directory', labelKey: 'navDirectory', labelEn: 'All Services', labelBn: 'সকল সেবা (৪৫+)', icon: Layers, tag: '45+' },
    { id: 'phonetic', labelKey: 'navPhonetic', labelEn: 'Avro Phonetic', labelBn: 'অভ্র ফোনেটিক', icon: Keyboard, tag: 'Avro' },
    { id: 'bijoy-unicode', labelKey: 'navBijoyUnicode', labelEn: 'Bijoy Converter', labelBn: 'বিজয় কনভার্টার', icon: Sparkles, tag: 'Sutonny' },
    { id: 'calendar', labelKey: 'navCalendar', labelEn: 'Bengali Calendar', labelBn: 'বঙ্গাব্দ ও পঞ্জিকা', icon: Calendar },
    { id: 'age-calculator', labelKey: 'navAgeCalculator', labelEn: 'Age Calculator', labelBn: 'বাংলা বয়স গণক', icon: Clock, tag: 'New' },
    { id: 'templates', labelKey: 'navTemplates', labelEn: 'Templates', labelBn: 'আবেদন ও ফরম', icon: FileText, tag: 'New' },
    { id: 'number-words', labelKey: 'navNumberWords', labelEn: 'Number to Words', labelBn: 'কথায় রূপান্তর', icon: FileText },
    { id: 'analyzer', labelKey: 'navAnalyzer', labelEn: 'Text Analyzer', labelBn: 'টেক্সট অ্যানালাইজার', icon: BarChart3 },
    { id: 'spell-dict', labelKey: 'navSpellDict', labelEn: 'Spelling & Dict', labelBn: 'বানান ও অভিধান', icon: BookOpen },
    { id: 'fonts', labelKey: 'navFonts', labelEn: 'Typography Spec', labelBn: 'ফন্ট স্পেসিমেন', icon: Type },
    { id: 'pdf-tools', labelKey: 'navPdfTools', labelEn: 'PDF Tools', labelBn: 'পিডিএফ টুলস', icon: FileText, tag: 'Free' },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-[#ffffff] shadow-xl transition-all pb-10 sm:pb-14">
      <WaveBottom />
      {/* Top Brand & Controls Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            id="brand-logo-btn"
            onClick={() => handleTabClick('directory')}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] rounded-xl p-1 group transition-transform active:scale-98"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ffffff] text-purple-600 flex items-center justify-center shadow-sm border border-transparent group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img src="/noon-moon-logo.png" alt="Noon-Moon Logo" className="w-full h-full object-cover drop-shadow-sm select-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-[18px] sm:text-[20px] text-[#ffffff] tracking-tight font-sans-ui group-hover:text-[#ffffff] transition-colors flex items-center gap-1">
                  <span>{language === 'bn' ? 'নুন-মুন' : 'Noon-Moon'}</span>
                  <span className="text-[#ffffff]/90 text-[11px] sm:text-xs font-semibold px-1.5 py-0.5 rounded bg-[#ffffff]/20 border-[#ffffff]/30 text-[#ffffff]">
                    {language === 'bn' ? 'Noon-Moon' : 'বাংলা'}
                  </span>
                </span>
                <span className="hidden xs:inline-flex text-[10px] sm:text-[11px] bg-[#ffffff]/10 text-[#ffffff]/90 font-semibold px-2 py-0.5 rounded-full border border-[#ffffff]/20 shadow-xs">
                  {t('brandBadge')}
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-[#ffffff]/70 leading-none mt-0.5 hidden md:block">
                {t('brandTagline')}
              </p>
            </div>
          </button>
        </div>

        {/* Center Live Date & Time Widget (Desktop & Tablet) */}
        <div className="hidden xl:flex items-center gap-3 bg-[#ffffff]/20 border-[#ffffff]/30 text-[#ffffff] px-3.5 py-1.5 rounded-full text-xs text-[#ffffff]/90 shadow-inner">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#ffffff]/70" />
            <span>{bengaliDateInfo}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[#ffffff]/30" />
          <div className="flex items-center gap-1.5 font-mono-code text-[#ffffff]/90 font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#ffffff]/70" />
            <span>{timeStr}</span>
          </div>
        </div>

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-1.5 sm:p-2 rounded-xl bg-[#ffffff]/10 text-[#ffffff]/90 hover:text-[#ffffff] border border-[#ffffff]/20 hover:bg-[#ffffff]/20 transition-colors shadow-xs"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
          </button>

          {/* Language Switcher Button (বাংলা ⇄ English) */}
          <div className="flex items-center bg-[#ffffff]/10 border-[#ffffff]/20 p-0.5 sm:p-1 rounded-xl border border-[#ffffff]/20 shadow-xs" title="ভাষা পরিবর্তন / Switch Language">
            <button
              id="lang-btn-bn"
              onClick={() => setLanguage('bn')}
              aria-label="Switch to Bengali"
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'bn'
                  ? 'bg-[#10b981] text-purple-700 shadow-xs'
                  : 'text-[#ffffff]/90'
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
                  ? 'bg-[#10b981] text-purple-700 shadow-xs'
                  : 'text-[#ffffff]/90'
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
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-[#ffffff]/10 text-[#ffffff]/90 hover:text-[#ffffff] border border-[#ffffff]/20 hover:bg-[#ffffff]/20 focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar with Horizontal Scroll Controls & Line Bar Indicator */}
      <div className="relative bg-[#ffffff]/10 border-t border-[#ffffff]/10 select-none">
        {/* Left Scroll Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollHorizontally(-220)}
            aria-label="Scroll left"
            className="absolute left-0 top-0 bottom-1 z-10 px-1 sm:px-2 flex items-center justify-center bg-gradient-to-r from-blue-700 to-transparent text-[#ffffff]/70 hover:text-[#ffffff] transition-all shadow-md group"
          >
            <div className="p-1 rounded-lg bg-[#ffffff]/20 border border-[#ffffff]/30 group-hover:bg-[#ffffff]/30 group-hover:scale-105 transition-all shadow-sm">
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
                className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13.5px] font-medium transition-all duration-150 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] ${
                  isActive
                    ? 'bg-[#10b981] text-purple-700 shadow-md shadow-[#10b981]/25 font-bold scale-[1.02]'
                    : 'bg-[#ffffff]/10 text-[#ffffff]/90 hover:text-[#ffffff] border border-[#ffffff]/20 hover:bg-[#ffffff]/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-purple-700' : 'text-[#ffffff]/70'}`} />
                <span>{label}</span>
                {tab.tag && (
                  <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ${
                    isActive ? 'bg-slate-950/20 text-purple-700' : 'bg-[#ffffff]/20 text-[#ffffff]/90 border border-[#047857]/40'
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
            className="absolute right-0 top-0 bottom-1 z-10 px-1 sm:px-2 flex items-center justify-center bg-gradient-to-l from-pink-500 to-transparent text-[#ffffff]/70 hover:text-[#ffffff] transition-all shadow-md group"
          >
            <div className="p-1 rounded-lg bg-[#ffffff]/20 border border-[#ffffff]/30 group-hover:bg-[#ffffff]/30 group-hover:scale-105 transition-all shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        )}

        {/* Visual Line Bar Scroll Track & Active Indicator */}
        <div 
          className="w-full h-1 bg-[#ffffff]/10 border-[#ffffff]/20 relative overflow-hidden border-t border-[#ffffff]/10"
          title="Scroll Indicator Bar"
        >
          <div 
            className="h-full bg-[#ffffff] rounded-full transition-all duration-150 shadow-sm"
            style={{
              width: '35%',
              transform: `translateX(${scrollProgress * 1.85}%)`,
            }}
          />
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-800 border-t border-[#ffffff]/20 p-4 space-y-3 shadow-2xl animate-in fade-in duration-150">
          {/* Mobile Date & Time Banner */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ffffff]/10 border border-[#ffffff]/20 text-xs text-[#ffffff]/90">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#ffffff]/70" />
              <span>{bengaliDateInfo}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono-code text-[#ffffff]/90 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#ffffff]/70" />
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
                      ? 'bg-[#10b981] text-purple-700 border-[#34d399] font-bold'
                      : 'bg-[#022c22]/40 text-[#d1fae5] border-[#065f46]/30 hover:bg-[#064e3b]/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-700' : 'text-[#ffffff]/70'}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-purple-700' : 'text-[#ffffff]/50'}`} />
                </button>
              );
            })}
          </div>

          {/* Mobile Bottom Info */}
          <div className="pt-2 border-t border-[#ffffff]/10 flex items-center justify-between text-xs text-[#ffffff]/90/80">
            <span className="text-[11px] text-[#ffffff]/70 font-medium">
              {language === 'bn' ? 'নুন-মুন • বাংলা অনলাইন সেবা হাব' : 'Noon-Moon • Bangla Online Services'}
            </span>
            <span className="text-[11px] text-[#ffffff]/70 font-medium">
              WCAG 2.2 AA Verified
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
