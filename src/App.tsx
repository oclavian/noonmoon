import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { HeaderNav } from './components/HeaderNav';
import { ServiceDirectory } from './components/ServiceDirectory';
import { PhoneticTool } from './components/tools/PhoneticTool';
import { BijoyUnicodeTool } from './components/tools/BijoyUnicodeTool';
import { BengaliCalendarTool } from './components/tools/BengaliCalendarTool';
import { BanglaAgeCalculatorTool } from './components/tools/BanglaAgeCalculatorTool';
import { BanglaTemplatesTool } from './components/tools/BanglaTemplatesTool';
import { NumberToWordsTool } from './components/tools/NumberToWordsTool';
import { TextAnalyzerTool } from './components/tools/TextAnalyzerTool';
import { SpellDictionaryTool } from './components/tools/SpellDictionaryTool';
import { PdfToolsHub } from './components/tools/PdfToolsHub';
import { TabType } from './types';
import { ShieldCheck, FileText, Info, Mail, ShieldAlert } from 'lucide-react';
import { SEO } from './components/SEO';
import { LegalModal, LegalModalType } from './components/LegalModal';
import { CookieConsent } from './components/CookieConsent';

const getSeoData = (tab: TabType, lang: 'en' | 'bn') => {
  const baseUrl = 'https://noon-moon.tools';
  const urlPath = tab === 'directory' ? '' : `/${tab}`;
  const canonicalUrl = `${baseUrl}${urlPath}`;

  const data: Record<string, any> = {
    directory: {
      title: lang === 'bn' ? 'নুন-মুন (Noon-Moon) | বাংলা ভাষার ডিজিটাল টুলস ও সেবা হাব' : 'Noon-Moon | Bengali Digital Tools & Service Hub',
      desc: lang === 'bn' ? 'নুন-মুন - বাংলা কিবোর্ড কনভার্টার, পঞ্জিকা, বয়স ক্যালকুলেটর ও সকল ডিজিটাল সেবার একটি আধুনিক হাব।' : 'Noon-Moon - A modern hub for Bengali keyboard converters, calendar, age calculator and digital services.',
      schemaType: 'WebSite'
    },
    phonetic: {
      title: lang === 'bn' ? 'অভ্র ফোনেটিক থেকে বাংলা (Avro to Bangla) | নুন-মুন' : 'Avro Phonetic to Bangla Converter | Noon-Moon',
      desc: lang === 'bn' ? 'ইংরেজিতে (Banglish) লিখলে সরাসরি সঠিক বাংলা ইউনিকোড টেক্সটে রূপান্তরিত হবে। সাথে ভয়েস টাইপিং সুবিধা।' : 'Type in Banglish (English) to convert automatically to standard Bengali Unicode text. Includes Voice Typing.',
      schemaType: 'WebApplication'
    },
    'bijoy-unicode': {
      title: lang === 'bn' ? 'বিজয় থেকে ইউনিকোড কনভার্টার (Bijoy to Unicode) | নুন-মুন' : 'Bijoy to Unicode Converter | Noon-Moon',
      desc: lang === 'bn' ? 'সুতন্বী এমজে (SutonnyMJ) বা বিজয় থেকে ইউনিকোডে এবং ইউনিকোড থেকে বিজয়ে নির্ভুল কনভার্টার।' : '100% accurate SutonnyMJ/Bijoy to Unicode and Unicode to Bijoy text converter.',
      schemaType: 'WebApplication'
    },
    'calendar': {
      title: lang === 'bn' ? 'বাংলা ক্যালেন্ডার ও পঞ্জিকা | নুন-মুন' : 'Bengali Calendar & Panjika | Noon-Moon',
      desc: lang === 'bn' ? 'আজকের বাংলা তারিখ, বঙ্গাব্দ সন, ঋতু ও সরকারি ছুটির দিনের সম্পূর্ণ তালিকা ও পঞ্জিকা।' : 'Today\'s Bengali date, Bongabdo, seasons, and complete list of government holidays.',
      schemaType: 'WebApplication'
    },
    'age-calculator': {
      title: lang === 'bn' ? 'বাংলা বয়স ও জন্মতারিখ ক্যালকুলেটর | নুন-মুন' : 'Bangla Age Calculator | Noon-Moon',
      desc: lang === 'bn' ? 'আপনার জন্মতারিখ দিয়ে নির্ভুল বছর, মাস, দিন, বঙ্গাব্দ এবং পরবর্তী জন্মদিনের হিসাব বের করুন।' : 'Calculate accurate age in years, months, days, Bongabdo, and track upcoming birthdays.',
      schemaType: 'WebApplication'
    },
    'templates': {
      title: lang === 'bn' ? 'বাংলা টেমপ্লেট ও ফরম | নুন-মুন' : 'Bengali Templates & Forms | Noon-Moon',
      desc: lang === 'bn' ? 'বিভিন্ন উৎসব, শুভেচ্ছা বার্তা বা সাধারণ মেসেজ পাঠানোর জন্য চমৎকার সব রেডিমেড বাংলা টেমপ্লেট।' : 'Ready-made Bengali templates for festivals, greetings, and official forms.',
      schemaType: 'WebApplication'
    },
    'number-words': {
      title: lang === 'bn' ? 'সংখ্যা থেকে কথায় রূপান্তর | নুন-মুন' : 'Number to Words Converter | Noon-Moon',
      desc: lang === 'bn' ? 'যেকোনো বড় সংখ্যা বা টাকার পরিমাণ লিখলে সেটি স্বয়ংক্রিয়ভাবে কথায় (বাংলা টেক্সটে) রূপান্তর করে দেওয়ার টুল।' : 'Convert any large number or currency amount automatically into Bengali text (words).',
      schemaType: 'WebApplication'
    },
    'analyzer': {
      title: lang === 'bn' ? 'বাংলা টেক্সট অ্যানালাইজার | নুন-মুন' : 'Bengali Text Analyzer | Noon-Moon',
      desc: lang === 'bn' ? 'বাংলা টেক্সটের শব্দ সংখ্যা, অক্ষর সংখ্যা, পড়ার সময় এবং বিস্তারিত পরিসংখ্যান বের করুন।' : 'Analyze Bengali text for word count, character count, reading time, and detailed statistics.',
      schemaType: 'WebApplication'
    },
    'spell-dict': {
      title: lang === 'bn' ? 'বাংলা বানান ও অভিধান | নুন-মুন' : 'Bengali Spelling & Dictionary | Noon-Moon',
      desc: lang === 'bn' ? 'শুদ্ধ বাংলা বানান যাচাই, সমার্থক শব্দ ও বাংলা ডিকশনারি বা অভিধান।' : 'Check correct Bengali spelling, find synonyms, and use the Bengali dictionary.',
      schemaType: 'WebApplication'
    },
    'pdf-tools': {
      title: lang === 'bn' ? 'ফ্রি পিডিএফ এডিটর ও টুলস | নুন-মুন' : 'Free PDF Editor & Tools | Noon-Moon',
      desc: lang === 'bn' ? 'ব্রাউজার থেকেই সম্পূর্ণ ফ্রিতে পিডিএফ জোড়া লাগানো, আলাদা করা বা এডিট করার টুলস।' : 'Merge, split, watermark, and modify any PDF file directly from the browser for free.',
      schemaType: 'WebApplication'
    }
  };

  const item = data[tab] || data.directory;
  
  // Generate Schema.org JSON-LD dynamically
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": item.schemaType,
    "name": item.title,
    "description": item.desc,
    "url": canonicalUrl,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return {
    title: item.title,
    desc: item.desc,
    canonicalUrl,
    schemaMarkup: JSON.stringify(schemaObj)
  };
};

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('directory');
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const { language, t } = useLanguage();
  const seoData = getSeoData(activeTab, language);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div id="noon-moon-app-root" className={`min-h-screen flex flex-col bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] antialiased selection:bg-emerald-200 selection:text-emerald-900 ${language === 'bn' ? 'font-bangla' : 'font-sans-ui'}`}>
      <SEO 
        title={seoData.title} 
        description={seoData.desc} 
        canonicalUrl={seoData.canonicalUrl}
        schemaMarkup={seoData.schemaMarkup}
      />
      
      {/* Sticky Responsive Header & Navigation */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Viewport */}
      <main id="main-content-viewport" className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-8 pt-7 sm:pt-10 pb-8 sm:pb-12 transition-all">
        {activeTab === 'directory' && (
          <ServiceDirectory onSelectTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'phonetic' && <PhoneticTool />}
        {activeTab === 'bijoy-unicode' && <BijoyUnicodeTool />}
        {activeTab === 'calendar' && <BengaliCalendarTool />}
        {activeTab === 'age-calculator' && <BanglaAgeCalculatorTool />}
        {activeTab === 'templates' && <BanglaTemplatesTool />}
        {activeTab === 'number-words' && <NumberToWordsTool />}
        {activeTab === 'analyzer' && <TextAnalyzerTool />}
        {activeTab === 'spell-dict' && <SpellDictionaryTool />}
        {activeTab === 'pdf-tools' && <PdfToolsHub />}
      </main>

      {/* Structured Modern Responsive Footer */}
      <footer id="app-global-footer" className="bg-gradient-to-b from-[#005B48] to-[#003B2E] text-white mt-10 pt-8 pb-6 border-t border-emerald-900/40">
        <div className="max-w-[1400px] w-full mx-auto px-4 xl:px-8 space-y-6">
          {/* Main Footer Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-800/50">
            {/* Brand Info */}
            <div className="flex flex-col items-center md:items-start space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[1rem] bg-white text-emerald-800 flex items-center justify-center shadow-lg border border-emerald-100 overflow-hidden shrink-0">
                  <img src="/noon-moon-logo.png" alt="Noon-Moon Logo" className="w-full h-full object-cover select-none" />
                </div>
                <div>
                  <span className="font-extrabold text-[21px] text-white tracking-tight font-sans-ui flex items-center gap-2">
                    <span className={language === 'bn' ? 'font-helal-arafat text-[24px] sm:text-[27px] font-normal tracking-wide text-white inline-block' : ''}>
                      {language === 'bn' ? 'নুন-মুন' : 'Noon-Moon'}
                    </span>
                    <span className="text-emerald-100 font-medium text-xs px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 shadow-sm">
                      {language === 'bn' ? 'বাংলা পোর্টাল' : 'Bangla Portal'}
                    </span>
                  </span>
                </div>
              </div>
              
              <p className="text-emerald-50/80 text-xs sm:text-[13.5px] leading-relaxed max-w-sm text-center md:text-left">
                {language === 'bn'
                  ? 'বাংলা টাইপোগ্রাফি, কিবোর্ড কনভার্টার, ইউনিকোড ফন্ট এবং নিত্যপ্রয়োজনীয় ডিজিটাল সেবা এক ক্লিকে ব্যবহারের একটি নির্ভরযোগ্য উন্মুক্ত প্ল্যাটফর্ম।'
                  : 'A modern, reliable open platform for Bengali typography, keyboard converters, Unicode fonts, and essential digital citizen tools.'}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] bg-emerald-950/50 text-emerald-200 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-medium shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {t('wcagVerified')}
                </span>
                <span className="text-[11px] bg-emerald-950/50 text-emerald-200 px-3 py-1 rounded-full border border-emerald-500/30 font-medium shadow-sm">
                  ১০০% ফ্রি ও নিরাপদ
                </span>
              </div>
            </div>

            {/* Quick Legal Buttons Bar */}
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-xs">
                <button 
                  onClick={() => setLegalModal('about')}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-50 hover:text-white shadow-sm transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
                </button>
                <button 
                  onClick={() => setLegalModal('privacy')}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-50 hover:text-white shadow-sm transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </button>
                <button 
                  onClick={() => setLegalModal('terms')}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-50 hover:text-white shadow-sm transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'শর্তাবলী' : 'Terms of Service'}
                </button>
                <button 
                  onClick={() => setLegalModal('contact')}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-50 hover:text-white shadow-sm transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'যোগাযোগ ও ফিডব্যাক' : 'Contact Us'}
                </button>
              </div>
              <p className="text-emerald-200/70 text-xs text-center md:text-right">
                {language === 'bn' ? 'বাংলা ভাষার ডিজিটাল উৎকর্ষতায় নিবেদিত' : 'Dedicated to Bangla Digital Typography'}
              </p>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-200/70 text-center sm:text-left">
            <p>© {new Date().getFullYear()} <span className={language === 'bn' ? 'font-helal-arafat text-[15px] font-normal tracking-wide text-emerald-100' : ''}>{language === 'bn' ? 'নুন-মুন' : 'Noon-Moon'}</span> (Noon-Moon) • সর্বস্বত্ব সংরক্ষিত</p>
            <p>বাংলা ফন্ট, কনভার্টার ও অনলাইন টুলস পোর্টাল</p>
          </div>
        </div>
      </footer>
      
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
