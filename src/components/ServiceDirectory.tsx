import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Check, 
  Star, 
  Zap, 
  ArrowRight, 
  X,
  Type,
  Copy,
  Keyboard,
  FileText,
  Calendar,
  Clock,
  BookOpen,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Heart,
  MessageCircle,
  Video,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { BANGLA_SERVICES } from '../data/banglaServicesData';
import { BanglaServiceItem, ServiceCategory, TabType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServiceDirectoryProps {
  onSelectTab: (tab: TabType) => void;
}

interface CoreToolItem {
  id: string;
  tab: TabType;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  badgeBn: string;
  badgeEn: string;
  icon: React.ComponentType<{ className?: string }>;
  tagsBn: string[];
  tagsEn: string[];
  actionBn: string;
  actionEn: string;
}

interface TypewriterSubtitleProps {
  text: string;
}

const TypewriterSubtitle: React.FC<TypewriterSubtitleProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Segment accurately by Unicode graphemes (especially essential for complex Bengali conjuncts)
    const graphemes = Array.from(
      typeof Intl !== 'undefined' && (Intl as any).Segmenter
        ? new (Intl as any).Segmenter('bn', { granularity: 'grapheme' }).segment(text)
        : text
    ).map((item: any) => (typeof item === 'string' ? item : item.segment));

    let timer: NodeJS.Timeout;
    let index = isDeleting ? graphemes.length : 0;
    setDisplayedText(isDeleting ? text : '');

    const runTypewriter = () => {
      if (!isDeleting) {
        if (index < graphemes.length) {
          index++;
          setDisplayedText(graphemes.slice(0, index).join(''));
          timer = setTimeout(runTypewriter, 35);
        } else {
          // Finished typing, hold for 4.5 seconds for comfortable reading
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 4500);
        }
      } else {
        if (index > 0) {
          index--;
          setDisplayedText(graphemes.slice(0, index).join(''));
          timer = setTimeout(runTypewriter, 18);
        } else {
          // Finished erasing, brief pause then retype
          setIsDeleting(false);
          timer = setTimeout(runTypewriter, 500);
        }
      }
    };

    timer = setTimeout(runTypewriter, 200);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <span className="inline">
      <span>{displayedText}</span>
      <span
        className="inline-block w-[2.5px] h-[1.15em] bg-emerald-600 ml-1.5 align-middle animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
};

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({ onSelectTab }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [favorites, setFavorites] = useState<string[]>(['s-1', 's-2', 's-3', 's-4']);

  // 8 Primary Core Tools
  const coreTools: CoreToolItem[] = [
    {
      id: 'core-bijoy-unicode',
      tab: 'bijoy-unicode',
      titleBn: 'বিজয় ⇄ ইউনিকোড কনভার্টার',
      titleEn: 'Bijoy ⇄ Unicode Converter',
      subtitleBn: 'সুতন্বীএমজে ও ইউনিকোড দ্বিমুখী রূপান্তর',
      subtitleEn: 'Bidirectional SutonnyMJ & Unicode Converter',
      descriptionBn: 'পুরাতন সুতন্বীএমজে (বিজয়) ফন্টের লেখাকে আধুনিক ওয়েব ইউনিকোডে এবং ওয়েবের ইউনিকোড লেখাকে ফটোশপ, ইলাস্ট্রেটর ও ওয়ার্ডের জন্য বিজয়ে রূপান্তর।',
      descriptionEn: 'Instant bidirectional conversion between legacy ANSI SutonnyMJ (Bijoy) and modern web Unicode Bangla text.',
      badgeBn: 'সবচেয়ে জনপ্রিয়',
      badgeEn: 'Most Popular',
      icon: Sparkles,
      tagsBn: ['সুতন্বীএমজে', 'এমএস ওয়ার্ড', 'ইলাস্ট্রেটর', 'টেক্সট ফাইল'],
      tagsEn: ['SutonnyMJ', 'MS Word', 'Illustrator', 'Text File'],
      actionBn: 'টুলটি ব্যবহার করুন',
      actionEn: 'Open Converter',
    },
    {
      id: 'core-phonetic',
      tab: 'phonetic',
      titleBn: 'অভ্র ফোনেটিক ওয়েব টাইপিং',
      titleEn: 'Avro Phonetic Web Typing',
      subtitleBn: 'ইংরেজি কিবোর্ডে সহজ বাংলা লিখন',
      subtitleEn: 'Easy Bangla Typing with English Keys',
      descriptionBn: 'ইংরেজি বর্ণ দিয়ে বাংলিশ লিখলেই তাৎক্ষণিক শুদ্ধ বাংলা ইউনিকোডে পরিণত হবে। সাথে ভয়েস টাইপিং, সাজেশন তালিকা ও কপি করার সুবিধা।',
      descriptionEn: 'Type phonetic Banglish to convert automatically to standard Bengali Unicode text. Includes Voice Typing & suggestions.',
      badgeBn: 'সহজ টাইপিং',
      badgeEn: 'Easy Typing',
      icon: Keyboard,
      tagsBn: ['বাংলিশ টু বাংলা', 'ভয়েস টাইপ', 'সাজেশন', 'এক ক্লিকে কপি'],
      tagsEn: ['Banglish', 'Voice Typing', 'Suggestions', 'Copy'],
      actionBn: 'টাইপিং শুরু করুন',
      actionEn: 'Start Typing',
    },
    {
      id: 'core-age-calculator',
      tab: 'age-calculator',
      titleBn: 'বাংলা বয়স ও জন্মতারিখ গণক',
      titleEn: 'Bangla Age Calculator',
      subtitleBn: 'নিখুঁত বছর, মাস, দিন ও জন্মদিন',
      subtitleEn: 'Accurate Years, Months, Days & Countdown',
      descriptionBn: 'আপনার জন্মতারিখ নির্বাচন করে সঠিক বয়স, মোট অতিক্রান্ত দিন, বঙ্গাব্দ সন এবং পরবর্তী জন্মদিনের কাউন্টডাউন ও রাশি দেখুন।',
      descriptionEn: 'Calculate accurate age in years, months, days, total elapsed days, Bengali calendar age, and next birthday countdown.',
      badgeBn: 'নিখুঁত হিসাব',
      badgeEn: 'Precise Result',
      icon: Clock,
      tagsBn: ['পরবর্তী জন্মদিন', 'বঙ্গাব্দ বয়স', 'মোট দিন ও সপ্তাহ', 'জীবন হিসাব'],
      tagsEn: ['Next Birthday', 'Bongabdo Age', 'Days & Weeks', 'Life Stats'],
      actionBn: 'বয়স বের করুন',
      actionEn: 'Calculate Age',
    },
    {
      id: 'core-calendar',
      tab: 'calendar',
      titleBn: 'বাংলা পঞ্জিকা ও ক্যালেন্ডার',
      titleEn: 'Bengali Calendar & Panjika',
      subtitleBn: 'আজকের বঙ্গাব্দ সন, তিথি ও ছুটি',
      subtitleEn: 'Bongabdo Date, Tithi & Holidays',
      descriptionBn: 'আজকের বাংলা তারিখ, ১৪৩১-১৪৩২ বঙ্গাব্দ, ছয় ঋতু, তিথি এবং সরকারি ও ঐচ্ছিক ছুটির সম্পূর্ণ হালনাগাদ পঞ্জিকা ও রূপান্তর।',
      descriptionEn: 'Today\'s Bengali date, Bongabdo year, seasons, tithi, and comprehensive government holiday calendar.',
      badgeBn: 'বঙ্গাব্দ পঞ্জিকা',
      badgeEn: 'Bongabdo Panjika',
      icon: Calendar,
      tagsBn: ['আজকের বাংলা তারিখ', 'সরকারি ছুটি', 'ঋতু পরিক্রমা', 'তারিখ রূপান্তর'],
      tagsEn: ['Bangla Date', 'Gov Holidays', '6 Seasons', 'Date Converter'],
      actionBn: 'পঞ্জিকা দেখুন',
      actionEn: 'View Calendar',
    },
    {
      id: 'core-pdf-tools',
      tab: 'pdf-tools',
      titleBn: 'বাংলা পিডিএফ এডিটর ও টুলস',
      titleEn: 'Free PDF Tools Hub',
      subtitleBn: 'পিডিএফ মার্জ, স্প্লিট ও কনভার্ট',
      subtitleEn: 'Merge, Split, Watermark & Read',
      descriptionBn: 'ব্রাউজার থেকেই সম্পূর্ণ নিরাপদ ও ফ্রিতে বাংলা পিডিএফ ফাইল জোড়া লাগানো, আলাদা করা, পৃষ্ঠা সাজানো ও ওয়াটারমার্ক যুক্ত করা।',
      descriptionEn: 'Merge, split, reorder, watermark, and modify any PDF file directly inside the browser with 100% privacy.',
      badgeBn: '১০০% ফ্রি ও নিরাপদ',
      badgeEn: '100% Free & Safe',
      icon: FileText,
      tagsBn: ['পিডিএফ মার্জ', 'পৃষ্ঠা আলাদা', 'ওয়াটারমার্ক', 'ব্রাউজারে নিরাপদ'],
      tagsEn: ['Merge PDF', 'Split Pages', 'Watermark', 'Client Safe'],
      actionBn: 'পিডিএফ টুলস খুলুন',
      actionEn: 'Open PDF Hub',
    },
    {
      id: 'core-templates',
      tab: 'templates',
      titleBn: 'দরখাস্ত ও আবেদন ফরম টেমপ্লেট',
      titleEn: 'Bangla Application Templates',
      subtitleBn: 'চাকরি, ছুটি ও সরকারি আবেদন ফরম',
      subtitleEn: 'Ready-Made Job, Leave & Official Letters',
      descriptionBn: 'ছুটির আবেদন, চাকরির দরখাস্ত, প্রত্যয়ন পত্র, বিভিন্ন উৎসবের শুভেচ্ছা ও সরকারি ফরমের প্রস্তুতকৃত রেডিমেড টেমপ্লেট সংগ্রহ।',
      descriptionEn: 'Ready-made formatted Bengali templates for leave requests, job applications, official certificates, and festival wishes.',
      badgeBn: 'প্রস্তুত ড্রাফট',
      badgeEn: 'Ready Drafts',
      icon: FileText,
      tagsBn: ['চাকরির আবেদন', 'ছুটির দরখাস্ত', 'সরকারি চিঠি', 'এক ক্লিকে কপি'],
      tagsEn: ['Job Application', 'Leave Request', 'Official Letter', 'Copy'],
      actionBn: 'টেমপ্লেট দেখুন',
      actionEn: 'View Templates',
    },
    {
      id: 'core-number-words',
      tab: 'number-words',
      titleBn: 'সংখ্যা থেকে কথায় রূপান্তর',
      titleEn: 'Number to Words',
      subtitleBn: 'বড় অংক বা টাকাকে টেক্সটে রূপান্তর',
      subtitleEn: 'Convert Large Digits to Text',
      descriptionBn: 'যেকোনো বড় অংকের সংখ্যা বা টাকার পরিমাণ (যেমন: চেক লেখার জন্য) টাইপ করলে তা স্বয়ংক্রিয়ভাবে কথায় বা বাংলা টেক্সটে রূপান্তরিত হবে।',
      descriptionEn: 'Type any large numerical amount or currency to instantly generate its Bengali text representation for cheques and formal use.',
      badgeBn: 'নতুন ফিচার',
      badgeEn: 'New Feature',
      icon: Type,
      tagsBn: ['চেকের টাকার পরিমাণ', 'কোটি ও লাখ', 'অটো কনভার্ট', 'এক ক্লিকে কপি'],
      tagsEn: ['Cheque Amount', 'Crore & Lakh', 'Auto Convert', 'Copy'],
      actionBn: 'সংখ্যা কনভার্ট করুন',
      actionEn: 'Convert Numbers',
    },
    {
      id: 'core-spell-dict',
      tab: 'spell-dict',
      titleBn: 'বাংলা বানান ও ডিকশনারি',
      titleEn: 'Spelling & Dictionary',
      subtitleBn: 'শুদ্ধ বানান যাচাই ও সমার্থক শব্দ',
      subtitleEn: 'Spell Checker & Synonyms',
      descriptionBn: 'বাংলা একাডেমি প্রমিত বানানরীতি অনুযায়ী যেকোনো শব্দের সঠিক বানান, সমার্থক শব্দ ও ডিকশনারি থেকে অর্থ খুঁজে বের করুন।',
      descriptionEn: 'Check correct spelling according to Bangla Academy rules, find synonyms, and search meanings in the comprehensive dictionary.',
      badgeBn: 'শিক্ষামূলক',
      badgeEn: 'Educational',
      icon: BookOpen,
      tagsBn: ['প্রমিত বানান', 'সমার্থক শব্দ', 'বিপরীত শব্দ', 'অভিধান'],
      tagsEn: ['Proper Spelling', 'Synonyms', 'Antonyms', 'Dictionary'],
      actionBn: 'ডিকশনারি খুলুন',
      actionEn: 'Open Dictionary',
    }
  ];

  const categories = [
    { id: 'all', labelBn: 'সকল সেবা', labelEn: 'All Services' },
    { id: 'text-typing', labelBn: 'টাইপিং ও রূপান্তর', labelEn: 'Typing & Conversion' },
    { id: 'language-lexicon', labelBn: 'ভাষা ও অভিধান', labelEn: 'Language & Dictionary' },
    { id: 'dates-numbers', labelBn: 'তারিখ, সময় ও হিসাব', labelEn: 'Dates, Time & Calc' },
    { id: 'audio-speech', labelBn: 'ভয়েস ও অডিও', labelEn: 'Voice & Audio' },
    { id: 'gov-public', labelBn: 'সরকারি ও নাগরিক সেবা', labelEn: 'Govt & Public' },
    { id: 'media-literature', labelBn: 'মিডিয়া ও সাহিত্য', labelEn: 'Media & Literature' },
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredServices = BANGLA_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      service.name.toLowerCase().includes(searchLower) ||
      service.nameBn.includes(searchLower) ||
      (service.description && service.description.toLowerCase().includes(searchLower)) ||
      (service.descriptionBn && service.descriptionBn.includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  // Utility to map index to Bento Grid style
  const getBentoStyle = (index: number) => {
    // 0, 3, 5, 7 -> White 3D
    // 1, 6 -> Orange Gradient
    // 2, 4 -> Green Gradient
    const map: Record<number, 'white' | 'orange' | 'green'> = {
      0: 'white', 1: 'orange', 2: 'green', 3: 'white',
      4: 'green', 5: 'white', 6: 'orange', 7: 'white'
    };
    return map[index] || 'white';
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HERO SEARCH BANNER (Balanced & Elegant) */}
      <section className="bg-white rounded-2xl sm:rounded-3xl card-elevation px-5 py-6 sm:px-8 sm:py-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#006B54]/5 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#FF8A3D]/5 to-transparent rounded-tr-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4 relative z-10">
          <div className="space-y-1 sm:space-y-1.5 pt-1 sm:pt-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.5] sm:leading-[1.6] overflow-visible py-2">
              <span className="multicolor-hero-title font-mahin drop-shadow-sm inline-block px-4 pt-3 sm:pt-4 pb-6 sm:pb-8 overflow-visible">
                {language === 'bn' ? 'বাংলা পোর্টাল হাব' : 'Bangla Portal Hub'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium min-h-[1.75rem] sm:min-h-[1.5rem] flex items-center justify-center">
              <TypewriterSubtitle 
                text={language === 'bn' 
                  ? 'টাইপিং, কনভার্টার, পঞ্জিকা থেকে শুরু করে দৈনন্দিন সকল প্রয়োজনীয় ডিজিটাল নাগরিক সেবা এখন এক ঠিকানায়।' 
                  : 'From typing, converters, calendar to daily essential digital citizen services, all in one place.'} 
              />
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-[#006B54] transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'সেবা, টুল বা কিবোর্ড খুঁজুন...' : 'Search services, tools or keywords...'}
                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-900 rounded-full pl-10 sm:pl-11 pr-10 sm:pr-11 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#006B54] focus:bg-white shadow-xs transition-all placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 hover:text-slate-700 transition-colors" />
                </button>
              )}
            </div>

            {/* Quick Filter Tag Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2.5 text-[11px] sm:text-xs">
              <span className="text-slate-400 font-medium">{language === 'bn' ? 'জনপ্রিয়:' : 'Popular:'}</span>
              {[
                { label: language === 'bn' ? 'বিজয় ⇄ ইউনিকোড' : 'Bijoy ⇄ Unicode', tab: 'bijoy-unicode' as TabType },
                { label: language === 'bn' ? 'অভ্র ফোনেটিক' : 'Avro Phonetic', tab: 'phonetic' as TabType },
                { label: language === 'bn' ? 'বাংলা পঞ্জিকা' : 'Calendar', tab: 'calendar' as TabType },
                { label: language === 'bn' ? 'পিডিএফ টুলস' : 'PDF Tools', tab: 'pdf-tools' as TabType },
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTab(pill.tab)}
                  className="bg-white hover:bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all font-medium shadow-xs active:scale-95"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE TOOLS (Bento Grid Style) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006B54] bg-emerald-50 px-3 py-1 rounded-full mb-2 border border-emerald-100">
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'আমরা আপনাদের দিচ্ছি' : 'What We Offer'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'আমাদের জনপ্রিয় ডিজিটাল টুলস' : 'Our Popular Digital Tools'}
            </h2>
          </div>
        </div>

        {/* 8 Primary Tool Cards (3D Bento Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {coreTools.map((tool, idx) => {
            const Icon = tool.icon;
            const style = getBentoStyle(idx);
            
            let containerClass = "group cursor-pointer rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ";
            let iconBgClass = "";
            let textPrimaryClass = "";
            let textMutedClass = "";
            let buttonClass = "w-full py-2.5 rounded-full font-bold text-xs transition-transform active:scale-95 flex items-center justify-center gap-2 ";
            let badgeClass = "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ";

            if (style === 'white') {
              containerClass += "bg-white card-elevation border border-white";
              iconBgClass = "bg-[#F0EBE1] text-[#006B54] group-hover:bg-[#006B54] group-hover:text-white transition-colors";
              textPrimaryClass = "text-slate-900";
              textMutedClass = "text-slate-500";
              buttonClass += "bg-[#F4F2EE] text-slate-700 group-hover:bg-[#006B54] group-hover:text-white";
              badgeClass += "bg-slate-100 text-slate-600";
            } else if (style === 'orange') {
              containerClass += "bg-gradient-to-br from-[#FFB775] to-[#FF8A3D] shadow-card-orange border border-white/20";
              iconBgClass = "bg-white/20 text-white shadow-inner";
              textPrimaryClass = "text-white";
              textMutedClass = "text-white/80";
              buttonClass += "bg-white/90 text-orange-600 shadow-md group-hover:bg-white";
              badgeClass += "bg-white/20 text-white backdrop-blur-sm";
            } else if (style === 'green') {
              containerClass += "bg-gradient-to-br from-[#005B48] to-[#003B2E] shadow-card-green border border-white/10";
              iconBgClass = "bg-white/10 text-white shadow-inner";
              textPrimaryClass = "text-white";
              textMutedClass = "text-emerald-100/80";
              buttonClass += "bg-emerald-50 text-[#005B48] shadow-md group-hover:bg-white";
              badgeClass += "bg-emerald-800/50 text-emerald-100 backdrop-blur-sm border border-emerald-500/30";
            }

            return (
              <div key={tool.id} onClick={() => onSelectTab(tool.tab)} className={containerClass}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center font-bold text-xl shrink-0 ${iconBgClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={badgeClass}>
                      {language === 'bn' ? tool.badgeBn : tool.badgeEn}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold leading-tight ${textPrimaryClass}`}>
                      {language === 'bn' ? tool.titleBn : tool.titleEn}
                    </h3>
                    <p className={`text-[12px] font-semibold mt-1 ${textMutedClass}`}>
                      {language === 'bn' ? tool.subtitleBn : tool.subtitleEn}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5">
                  <button className={buttonClass}>
                    <span>{language === 'bn' ? tool.actionBn : tool.actionEn}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED BANNER: Bangla Text Cleaner & Normalizer Spotlight */}
      <section className="bg-gradient-to-br from-[#005B48] via-[#004B3A] to-[#003B2E] text-white rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card-green border border-emerald-800/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-inner backdrop-blur-sm border border-white/10">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-100 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-500/30">
              <Sparkles className="w-3 h-3" />
              <span>{language === 'bn' ? 'স্মার্ট ইউটিলিটি' : 'Smart Utility'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {language === 'bn' ? 'বাংলা টেক্সট ক্লিন ও অ্যানালাইজার ল্যাব' : 'Bangla Text Cleaner & Analyzer Lab'}
            </h3>
            <p className="text-sm text-emerald-100/80 max-w-xl leading-relaxed">
              {language === 'bn' 
                ? 'যুক্তবর্ণের ত্রুটি সংশোধন, অদৃশ্য স্পেস (ZWJ/ZWNJ) দূরীকরণ, শব্দ ও অক্ষর কাউন্টার এবং পড়ার আনুমানিক সময় পরিমাপ।' 
                : 'Fix broken conjuncts, remove zero-width joiners, count words & characters, and calculate estimated reading time.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab('analyzer')}
          className="whitespace-nowrap w-full md:w-auto px-6 py-3 rounded-full bg-[#FF8A3D] hover:bg-[#FF9B58] text-white text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          <span>{language === 'bn' ? 'অ্যানালাইজার খুলুন' : 'Open Analyzer'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 4. COMPLETE BANGLA SERVICES DIRECTORY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4 px-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-2 border border-orange-200">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'নাগরিক সেবা ও ডিরেক্টরি' : 'Citizen Services Directory'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'সকল বাংলা ডিজিটাল সেবা ও পোর্টাল' : 'All Bengali Digital Services & Portals'}
            </h2>
          </div>

          <span className="text-xs text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            {language === 'bn' ? `প্রদর্শিত: ${filteredServices.length}টি সেবা` : `Showing: ${filteredServices.length} services`}
          </span>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none px-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                selectedCategory === cat.id
                  ? 'bg-[#006B54] text-white border-transparent'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006B54] hover:text-[#006B54]'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredServices.map((service) => {
            const isFav = favorites.includes(service.id);
            return (
              <article
                key={service.id}
                className="group bg-white rounded-[1.5rem] card-elevation p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {service.badge || (service.isExternal ? 'এক্সটার্নাল' : 'অভ্যন্তরীণ')}
                    </span>
                    <button
                      onClick={(e) => toggleFavorite(service.id, e)}
                      title={isFav ? 'পছন্দের তালিকা থেকে মুছুন' : 'পছন্দের তালিকায় রাখুন'}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-red-500 fill-red-500' : ''}`} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#006B54] transition-colors leading-tight">
                      {language === 'bn' ? service.nameBn : service.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {language === 'bn' ? service.descriptionBn : service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  {service.internalTab ? (
                    <button
                      onClick={() => onSelectTab(service.internalTab!)}
                      className="px-4 py-2 rounded-full bg-slate-100 group-hover:bg-[#006B54] text-slate-700 group-hover:text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <span>{language === 'bn' ? 'সরাসরি ব্যবহার' : 'Use Tool'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#FF8A3D] text-slate-700 hover:text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 border border-slate-200 hover:border-transparent"
                    >
                      <span>{language === 'bn' ? 'অফিশিয়াল পোর্টাল' : 'Official Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[2rem] card-elevation p-8 space-y-4 max-w-lg mx-auto mt-8">
            <div className="w-16 h-16 rounded-full bg-[#F0EBE1] text-[#006B54] flex items-center justify-center mx-auto shadow-inner">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'কোনো সেবা খুঁজে পাওয়া যায়নি' : 'No services found'}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {language === 'bn' ? 'অনুসন্ধান শব্দটি পরিবর্তন করে পুনরায় চেষ্টা করুন।' : 'Please adjust your search keyword and try again.'}
              </p>
            </div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#006B54] text-white text-sm font-bold shadow-md hover:bg-[#005B48] transition-colors"
            >
              {language === 'bn' ? 'সকল সেবা প্রদর্শন' : 'Reset Filters'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
