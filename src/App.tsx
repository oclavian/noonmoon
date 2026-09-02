import { WaveFooter } from './components/Waves';
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
import { FontShowcaseTool } from './components/tools/FontShowcaseTool';
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
    'fonts': {
      title: lang === 'bn' ? 'বাংলা ফন্ট গ্যালারি | নুন-মুন' : 'Bengali Font Gallery | Noon-Moon',
      desc: lang === 'bn' ? 'আকর্ষণীয় ও জনপ্রিয় সব বাংলা ফন্টের লাইভ প্রিভিউ ও শোকেস।' : 'Live preview and showcase of popular and attractive Bengali fonts.',
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

  return (
    <div id="noon-moon-app-root" className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-[#10b981] selection:text-[#ffffff] ${language === 'bn' ? 'font-bangla' : 'font-sans-ui'}`}>
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
      <main id="main-content-viewport" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 transition-all">
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
        {activeTab === 'fonts' && <FontShowcaseTool />}
        {activeTab === 'pdf-tools' && <PdfToolsHub />}

      </main>

      {/* Structured Modern Responsive Footer */}
      <footer id="app-global-footer" className="relative bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-[#ffffff] mt-24 pt-8 sm:pt-10 pb-8 sm:pb-10">
        <WaveFooter />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#ffffff]/20">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffffff] text-purple-600 flex items-center justify-center shadow-sm border border-transparent overflow-hidden relative">
                  <img src="/noon-moon-logo.png" alt="Noon-Moon Logo" className="w-full h-full object-cover drop-shadow-sm select-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <span className="font-extrabold text-[20px] text-[#ffffff] tracking-tight font-sans-ui flex items-center gap-1.5">
                  <span>{language === 'bn' ? 'নুন-মুন' : 'Noon-Moon'}</span>
                  <span className="text-[#34d399] font-medium text-sm">({language === 'bn' ? 'Noon-Moon' : 'Bangla Hub'})</span>
                </span>
                <span className="text-[11px] bg-[#064e3b]/60 text-[#6ee7b7] px-2.5 py-0.5 rounded-full border border-[#047857]/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
                  {t('wcagVerified')}
                </span>
              </div>
              <p className="text-[#ffffff]/70 text-xs sm:text-[14px] mt-2 max-w-xl leading-relaxed">
                {t('footerDescription')}
              </p>
            </div>

            {/* Quick Legal Actions / Links */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13.5px]">
              <button 
                onClick={() => setLegalModal('about')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm border-[#ffffff]/20 text-[#ffffff] border border-[#ffffff]/20 transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
              </button>
              <button 
                onClick={() => setLegalModal('privacy')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm border-[#ffffff]/20 text-[#ffffff] border border-[#ffffff]/20 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
              </button>
              <button 
                onClick={() => setLegalModal('terms')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm border-[#ffffff]/20 text-[#ffffff] border border-[#ffffff]/20 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                {language === 'bn' ? 'শর্তাবলী' : 'Terms of Service'}
              </button>
              <button 
                onClick={() => setLegalModal('contact')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm border-[#ffffff]/20 text-[#ffffff] border border-[#ffffff]/20 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#ffffff]/70 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {t('footerCopyright')}</p>
            <p className="text-[#ffffff]/60">{t('footerTag')}</p>
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
