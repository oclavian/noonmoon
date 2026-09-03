import React, { useState } from 'react';
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

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({ onSelectTab }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['s-1', 's-2', 's-3', 's-4']);

  // 8 Primary Core Tools in Lipighor Card Grid Style
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
      titleBn: 'সংখ্যা থেকে কথায় রূপান্তর',
      titleEn: 'Number to Bangla Words (Cheque)',
      subtitleBn: 'ব্যাংক চেক ও টাকার অংক বাংলায়',
      subtitleEn: 'Bank Cheque, Receipts & Official Taka Text',
      descriptionBn: 'যেকোনো বড় সংখ্যা বা টাকার পরিমাণ ইনপুট দিলে স্বয়ংক্রিয়ভাবে প্রমিত বাংলায় (চেক ও ভাউচার ফরম্যাটে টাকা ও পয়সা সহ) রূপান্তর।',
      descriptionEn: 'Convert any numeric amount into standard Bengali words formatted for bank cheques, vouchers, and formal documents.',
      badgeBn: 'ব্যাংক ও ভাউচার',
      badgeEn: 'Banking & Cheques',
      icon: BarChart3,
      tagsBn: ['ব্যাংক চেক ফরম্যাট', 'টাকা ও পয়সা', 'ইংরেজি/বাংলা সংখ্যা', 'তাত্ক্ষণিক রূপান্তর'],
      tagsEn: ['Cheque Format', 'Taka & Poisha', 'Bengali Digits', 'Fast Convert'],
      actionBn: 'কথায় রূপান্তর করুন',
      actionEn: 'Convert to Words',
    },
    {
      id: 'core-spell-dict',
      tab: 'spell-dict',
      titleBn: 'বাংলা বানান ও একাডেমি অভিধান',
      titleEn: 'Spell Checker & Academy Dictionary',
      subtitleBn: 'প্রমিত বানান যাচাই ও শব্দার্থ সন্ধান',
      subtitleEn: 'Standard Bengali Spelling, Meanings & Synonyms',
      descriptionBn: 'বাংলা একাডেমি প্রমিত বানানরীতি অনুযায়ী যেকোনো শব্দের সঠিক বানান যাচাই, অর্থ, পদ, সমার্থক শব্দ ও বিপরীত শব্দ সন্ধান।',
      descriptionEn: 'Check correct Bengali spelling, find word meanings, grammatical parts of speech, and comprehensive synonyms.',
      badgeBn: 'বাংলা একাডেমি',
      badgeEn: 'Bangla Academy',
      icon: BookOpen,
      tagsBn: ['শুদ্ধ বানান', 'সমার্থক শব্দ', 'শব্দার্থ ও পদ', 'ব্যাকরণ নিয়ম'],
      tagsEn: ['Spell Check', 'Synonyms', 'Definitions', 'Grammar'],
      actionBn: 'অভিধান খুলুন',
      actionEn: 'Open Dictionary',
    },
  ];

  // Filtered Services from BANGLA_SERVICES
  const filteredServices = BANGLA_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      service.name.toLowerCase().includes(q) ||
      service.nameBn.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.descriptionBn.toLowerCase().includes(q)
    );
    return matchesCategory && matchesSearch;
  });

  const categories: { id: ServiceCategory | 'all'; labelBn: string; labelEn: string }[] = [
    { id: 'all', labelBn: 'সকল সেবা', labelEn: 'All Services' },
    { id: 'text-typing', labelBn: 'কিবোর্ড ও টাইপিং', labelEn: 'Text & Typing' },
    { id: 'language-lexicon', labelBn: 'ভাষা ও অভিধান', labelEn: 'Language & Lexicon' },
    { id: 'dates-numbers', labelBn: 'পঞ্জিকা ও সংখ্যা', labelEn: 'Dates & Numbers' },
    { id: 'pdf-tools', labelBn: 'পিডিএফ ও ফাইল', labelEn: 'PDF & Files' },
    { id: 'gov-public', labelBn: 'সরকারি ও নাগরিক সেবা', labelEn: 'Citizen & Gov' },
    { id: 'audio-speech', labelBn: 'ভয়েস ও অডিও', labelEn: 'Audio & Speech' },
    { id: 'media-literature', labelBn: 'মিডিয়া ও সাহিত্য', labelEn: 'Media & Literature' },
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div id="lipighor-portal-main" className="space-y-8 sm:space-y-12">
      {/* 1. HERO BANNER: Curved Crimson Red Banner with Search & Live Stats */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-800 via-red-700 to-rose-900 text-white shadow-xl border border-red-900/40 p-6 sm:p-10">
        {/* Background decorative curved SVG */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-8 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <span className="text-[160px] font-black font-bangla text-white select-none leading-none">বাংলা</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: Graphic Logo & Title */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-red-700 flex items-center justify-center font-extrabold text-3xl sm:text-4xl shadow-2xl border-4 border-red-200/60 shrink-0 transform -rotate-2 hover:rotate-0 transition-transform overflow-hidden">
                <img src="/noon-moon-logo.png" alt="Noon-Moon Logo" className="w-full h-full object-cover select-none" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 bg-red-950/50 text-red-200 text-xs font-semibold px-3 py-0.5 rounded-full border border-red-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-red-300" />
                  <span>{language === 'bn' ? 'বাংলা ভাষার আধুনিক ডিজিটাল পোর্টাল' : 'Modern Bengali Digital Tools Portal'}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  {language === 'bn' ? 'বাংলা ডিজিটাল টুলস ও কিবোর্ড পোর্টাল' : 'Bangla Digital Tools & Keyboard Hub'}
                </h1>
                <p className="text-xs sm:text-sm text-red-100/90 max-w-xl leading-relaxed">
                  {language === 'bn' 
                    ? 'বিজয় ⇄ ইউনিকোড কনভার্টার, অভ্র ফোনেটিক টাইপিং, বঙ্গাব্দ ক্যালেন্ডার, বয়স গণক, পিডিএফ এডিটর ও নিত্যপ্রয়োজনীয় ডিজিটাল সেবা এক ক্লিকে সম্পূর্ণ বিনামূল্যে।' 
                    : 'Bijoy to Unicode converter, Avro phonetic typing, Bengali calendar, age calculator, PDF tools and essential digital citizen services for free.'}
                </p>
              </div>
            </div>

            {/* Right: Live Counter Stats Pill */}
            <div className="bg-red-950/60 border border-red-400/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex flex-row lg:flex-col gap-4 text-center shrink-0 shadow-inner w-full sm:w-auto justify-around">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans-ui">
                  {language === 'bn' ? '১০+' : '10+'}
                </div>
                <div className="text-[11px] text-red-200 font-medium">{language === 'bn' ? 'নিজস্ব লাইভ টুলস' : 'Live Interactive Tools'}</div>
              </div>
              <div className="h-px w-full bg-red-800/60 hidden lg:block" />
              <div className="w-px h-auto bg-red-800/60 block lg:hidden" />
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-sans-ui">
                  {language === 'bn' ? '৪৫+' : '45+'}
                </div>
                <div className="text-[11px] text-red-200 font-medium">{language === 'bn' ? 'বাংলা নাগরিক সেবা' : 'Digital Citizen Services'}</div>
              </div>
            </div>
          </div>

          {/* Integrated Lipighor Search Bar inside Hero */}
          <div className="pt-2 max-w-3xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="hero-tools-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'যেকোনো টুল বা সেবা খুঁজুন (যেমন: বিজয়, ফোনেটিক, বয়স, ক্যালেন্ডার, পিডিএফ)...' : 'Search any tool or service (e.g., Bijoy, Phonetic, Age, Calendar, PDF)...'}
                className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white text-slate-900 text-sm sm:text-base font-medium placeholder-slate-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-400/50 transition-all border border-red-200"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 text-xs">
              <span className="text-red-200 font-semibold">{language === 'bn' ? 'জনপ্রিয় অনুসন্ধান:' : 'Quick tags:'}</span>
              {[
                { label: language === 'bn' ? 'বিজয় ⇄ ইউনিকোড' : 'Bijoy ⇄ Unicode', tab: 'bijoy-unicode' as TabType },
                { label: language === 'bn' ? 'অভ্র ফোনেটিক' : 'Avro Phonetic', tab: 'phonetic' as TabType },
                { label: language === 'bn' ? 'বয়স ক্যালকুলেটর' : 'Age Calculator', tab: 'age-calculator' as TabType },
                { label: language === 'bn' ? 'বাংলা পঞ্জিকা' : 'Calendar', tab: 'calendar' as TabType },
                { label: language === 'bn' ? 'পিডিএফ টুলস' : 'PDF Tools', tab: 'pdf-tools' as TabType },
                { label: language === 'bn' ? 'দরখাস্ত ফরম' : 'Templates', tab: 'templates' as TabType },
                { label: language === 'bn' ? 'কথায় রূপান্তর' : 'Words', tab: 'number-words' as TabType },
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTab(pill.tab)}
                  className="bg-red-950/40 hover:bg-white hover:text-red-800 text-red-100 px-2.5 py-1 rounded-lg border border-red-400/30 transition-all font-medium text-[11px] sm:text-xs"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. "আমাদের প্রধান ডিজিটাল টুলস" (Lipighor 6/8 Core Cards Grid) */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-full mb-1 border border-red-200">
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'আমরা আপনাদের দিচ্ছি' : 'What We Offer'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'আমাদের জনপ্রিয় ডিজিটাল টুলস' : 'Our Popular Digital Tools'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'bn' 
                ? 'বাংলা টাইপিং, রূপান্তর, হিসাব ও দৈনন্দিন সেবার নির্ভুল অনলাইন সমাধান' 
                : 'Accurate online solutions for Bengali typing, conversion, calculations and daily tools'}
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {language === 'bn' ? '৮টি প্রধান টুল' : '8 Core Tools'}
          </span>
        </div>

        {/* 8 Primary Tool Cards (Lipighor Aesthetic: Red badge, white container, hover elevation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {coreTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTab(tool.tab)}
                className="group cursor-pointer bg-white rounded-2xl border border-red-100/90 hover:border-red-500 p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Top Badge & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-200/80 flex items-center justify-center font-bold text-xl shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-red-800 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                      {language === 'bn' ? tool.badgeBn : tool.badgeEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {language === 'bn' ? tool.titleBn : tool.titleEn}
                    </h3>
                    <p className="text-[11px] font-semibold text-red-700 mt-0.5">
                      {language === 'bn' ? tool.subtitleBn : tool.subtitleEn}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {language === 'bn' ? tool.descriptionBn : tool.descriptionEn}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(language === 'bn' ? tool.tagsBn : tool.tagsEn).slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1">
                    <span>{language === 'bn' ? tool.actionBn : tool.actionEn}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">
                    {language === 'bn' ? 'ফ্রি' : 'Free'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED BANNER: Bangla Text Cleaner & Normalizer Spotlight */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-700/60 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-300 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-700/50">
              <Sparkles className="w-3 h-3" />
              <span>{language === 'bn' ? 'স্মার্ট ইউটিলিটি' : 'Smart Utility'}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {language === 'bn' ? 'বাংলা টেক্সট ক্লিন ও অ্যানালাইজার ল্যাব' : 'Bangla Text Cleaner & Analyzer Lab'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {language === 'bn' 
                ? 'যুক্তবর্ণের ত্রুটি সংশোধন, অদৃশ্য স্পেস (ZWJ/ZWNJ) দূরীকরণ, শব্দ ও অক্ষর কাউন্টার এবং পড়ার আনুমানিক সময় পরিমাপ।' 
                : 'Fix broken conjuncts, remove zero-width joiners, count words & characters, and calculate estimated reading time.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab('analyzer')}
          className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98 flex items-center gap-2 shrink-0"
        >
          <span>{language === 'bn' ? 'অ্যানালাইজার খুলুন' : 'Open Analyzer'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 4. SOCIAL / CONNECT RIBBON (Lipighor Style 3 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-2xl border border-slate-200 hover:border-red-500 p-4 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
              {language === 'bn' ? 'অফিশিয়াল ফেসবুক পেজ' : 'Official Facebook Page'}
            </h4>
            <p className="text-[11px] text-slate-500 truncate">
              {language === 'bn' ? 'বাংলা টেকনোলজি আপডেট পেতে জয়েন করুন' : 'Join for Bangla tech updates'}
            </p>
          </div>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-2xl border border-slate-200 hover:border-red-500 p-4 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
              {language === 'bn' ? 'ইউটিউব সহায়িকা' : 'YouTube Guides'}
            </h4>
            <p className="text-[11px] text-slate-500 truncate">
              {language === 'bn' ? 'বিজয় ও অভ্র কিবোর্ড টিউটোরিয়াল' : 'Bijoy & Avro tutorials'}
            </p>
          </div>
        </a>

        {/* Community Feedback */}
        <button
          onClick={() => {
            const footerEl = document.getElementById('app-global-footer');
            footerEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-left group bg-white rounded-2xl border border-slate-200 hover:border-red-500 p-4 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
              {language === 'bn' ? 'যোগাযোগ ও মতামত' : 'Feedback & Contact'}
            </h4>
            <p className="text-[11px] text-slate-500 truncate">
              {language === 'bn' ? 'নতুন কোনো টুলের অনুরোধ জানান' : 'Suggest a new tool'}
            </p>
          </div>
        </button>
      </section>

      {/* 6. COMPLETE BANGLA SERVICES DIRECTORY (45+ Curated Citizen & Language Tools) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 px-3 py-0.5 rounded-full mb-1 border border-red-200">
              <Layers className="w-3 h-3" />
              <span>{language === 'bn' ? 'নাগরিক সেবা ও ডিরেক্টরি' : 'Citizen Services Directory'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'সকল বাংলা ডিজিটাল সেবা ও পোর্টাল' : 'All Bengali Digital Services & Portals'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'bn' 
                ? 'বাংলা একাডেমি, জাতীয় তথ্য বাতায়ন, কিবোর্ড সফটওয়্যার ও প্রয়োজনীয় সকল লিংক' 
                : 'Bangla Academy, National Portal, keyboard software and essential resources'}
            </p>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            {language === 'bn' ? `প্রদর্শিত: ${filteredServices.length}টি সেবা` : `Showing: ${filteredServices.length} services`}
          </span>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredServices.map((service) => {
            const isFav = favorites.includes(service.id);
            return (
              <article
                key={service.id}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-red-500 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                      {service.badge || (service.isExternal ? 'এক্সটার্নাল' : 'অভ্যন্তরীণ')}
                    </span>
                    <button
                      onClick={(e) => toggleFavorite(service.id, e)}
                      title={isFav ? 'পছন্দের তালিকা থেকে মুছুন' : 'পছন্দের তালিকায় রাখুন'}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-red-600 fill-red-600' : ''}`} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {language === 'bn' ? service.nameBn : service.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {language === 'bn' ? service.descriptionBn : service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {service.internalTab ? (
                    <button
                      onClick={() => onSelectTab(service.internalTab!)}
                      className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <span>{language === 'bn' ? 'সরাসরি ব্যবহার' : 'Use Tool'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-bold text-xs transition-all flex items-center gap-1.5 border border-slate-200"
                    >
                      <span>{language === 'bn' ? 'অফিশিয়াল পোর্টাল' : 'Official Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <span className="text-[11px] text-slate-400 font-medium">
                    {service.isExternal ? 'External' : 'Internal'}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {language === 'bn' ? 'কোনো সেবা খুঁজে পাওয়া যায়নি' : 'No services found'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'অনুসন্ধান শব্দটি পরিবর্তন করে পুনরায় চেষ্টা করুন।' : 'Please adjust your search keyword and try again.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              {language === 'bn' ? 'সকল সেবা প্রদর্শন' : 'Reset Filters'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
