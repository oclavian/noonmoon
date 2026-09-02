import React, { useState } from 'react';
import { 
  BarChart3, 
  RotateCcw, 
  Copy, 
  Check, 
  ShieldCheck, 
  Zap, 
  TrendingUp 
} from 'lucide-react';
import { analyzeBanglaText } from '../../utils/textAnalyzer';
import { toBengaliNumerals } from '../../utils/bengaliCalendar';
import { useLanguage } from '../../context/LanguageContext';

export const TextAnalyzerTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [sampleText, setSampleText] = useState<string>(
    'বাংলা ভাষা হলো বিশ্বের অন্যতম মিষ্টি ও সমৃদ্ধ ভাষা। বাংলা সাহিত্যের ইতিহাস হাজার বছরের পুরনো। রবীন্দ্রনাথ ঠাকুর এই ভাষার জন্যই নোবেল পুরস্কার লাভ করেছিলেন। বাংলা আমাদের অহংকার ও প্রাণের মাতৃভাষা।'
  );
  const [cleanedNotice, setCleanedNotice] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const toBnDigits = (str: string | number) => 
    String(str).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  const formatNum = (num: number) => language === 'bn' ? toBnDigits(num) : String(num);

  const metrics = analyzeBanglaText(sampleText);

  const handleCleanText = () => {
    // Normalization: remove ZWJ (\u200D), ZWNJ (\u200C), redundant spaces, and weird punctuation
    const clean = sampleText
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    setSampleText(clean);
    setCleanedNotice(language === 'bn' ? 'টেক্সট সফলভাবে ক্লিন ও নর্মালাইজ করা হয়েছে (অপ্রয়োজনীয় ZWJ/ZWNJ কোড অপসারিত)' : 'Text sanitized and normalized (invisible ZWJ/ZWNJ removed)');
    setTimeout(() => setCleanedNotice(''), 4000);
  };

  const handleCopyMetrics = async () => {
    const summary = language === 'bn'
      ? `বাংলা টেক্সট বিশ্লেষণ রিপোর্ট:\nমোট শব্দ: ${metrics.words}\nমোট অক্ষর (স্পেস ছাড়া): ${metrics.charactersNoSpaces}\nস্বরবর্ণ: ${metrics.vowels}\nব্যঞ্জনবর্ণ: ${metrics.consonants}\nকার ও চিহ্ন: ${metrics.modifiers}\nযুক্তবর্ণ: ${metrics.juktaborno}\nপড়ার আনুমানিক সময়: ${metrics.readingTimeMinutes} মিনিট`
      : `Bangla Text Analysis Report:\nTotal Words: ${metrics.words}\nCharacters (No spaces): ${metrics.charactersNoSpaces}\nVowels: ${metrics.vowels}\nConsonants: ${metrics.consonants}\nModifiers: ${metrics.modifiers}\nConjuncts (Juktaborno): ${metrics.juktaborno}\nEstimated Reading Time: ${metrics.readingTimeMinutes} min`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const statCards = [
    { label: language === 'bn' ? 'মোট শব্দ' : 'Total Words', value: formatNum(metrics.words), color: 'text-slate-900', bg: 'bg-purple-50' },
    { label: language === 'bn' ? 'অক্ষর (স্পেস ছাড়া)' : 'Characters (no space)', value: formatNum(metrics.charactersNoSpaces), color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: language === 'bn' ? 'স্বরবর্ণ (Vowels)' : 'Vowels', value: formatNum(metrics.vowels), color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: language === 'bn' ? 'ব্যঞ্জনবর্ণ' : 'Consonants', value: formatNum(metrics.consonants), color: 'text-pink-700', bg: 'bg-pink-50' },
    { label: language === 'bn' ? 'যুক্তবর্ণ (Ligatures)' : 'Conjuncts (Juktaborno)', value: formatNum(metrics.juktaborno), color: 'text-purple-700', bg: 'bg-purple-50' },
    { label: language === 'bn' ? 'পড়ার সময়' : 'Reading Time', value: `${formatNum(metrics.readingTimeMinutes)} ${language === 'bn' ? 'মিনিট' : 'min'}`, color: 'text-rose-700', bg: 'bg-rose-50' },
  ];

  return (
    <section id="bangla-text-analyzer-container" className="space-y-4 sm:space-y-6">
      {/* Header & Action Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-xs shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('analyzerTitle')}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  {language === 'bn' ? 'শব্দ ও বর্ণমিতি' : 'Lexical Metrics'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('analyzerSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="analyzer-clean-btn"
              onClick={handleCleanText}
              className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl border border-purple-200 transition-all shadow-xs"
            >
              <Zap className="w-4 h-4 text-purple-600" />
              <span>{language === 'bn' ? 'টেক্সট ক্লিন করুন (ZWJ স্যানিটাইজার)' : 'Clean Text (ZWJ Sanitizer)'}</span>
            </button>
            <button
              id="analyzer-clear-btn"
              onClick={() => setSampleText('')}
              className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-slate-300/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('clear')}</span>
            </button>
          </div>
        </div>

        {cleanedNotice && (
          <div className="mt-3.5 p-3 bg-purple-50 border border-purple-200 text-purple-800 text-xs rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>{cleanedNotice}</span>
          </div>
        )}

        {/* Input Text Area */}
        <div className="pt-3.5 space-y-2">
          <label htmlFor="analyzer-text-input" className="font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            {language === 'bn' ? 'বিশ্লেষণের জন্য আপনার বাংলা লেখাটি এখানে দিন:' : 'Enter text below for deep linguistic & statistical analysis:'}
          </label>
          <textarea
            id="analyzer-text-input"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            rows={5}
            placeholder={language === 'bn' ? 'আপনার বাংলা প্যারাগ্রাফ বা রচনা এখানে লিখুন বা পেস্ট করুন...' : 'Type or paste your text here...'}
            className="w-full bg-slate-50 text-slate-900 border border-slate-300/60 focus:border-slate-900 focus:bg-white rounded-xl p-3.5 sm:p-4 text-sm sm:text-base leading-relaxed font-bangla outline-none focus:ring-2 focus:ring-slate-900/10 transition-all resize-y"
          />
        </div>
      </div>

      {/* 6 Key Stats Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-300/60/80 ${stat.bg} shadow-xs text-center space-y-1 transition-all hover:scale-102`}
          >
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
            <div className={`text-xl sm:text-3xl font-extrabold font-bangla ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analysis & Copy Report Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            {language === 'bn' ? 'বিস্তারিত বর্ণ ও চিহ্ন বিভাজন (Character Breakdown)' : 'Detailed Linguistic Breakdown'}
          </h3>
          <button
            onClick={handleCopyMetrics}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 sm:px-3.5 py-1.5 rounded-xl transition-all shadow-xs ${
              copied
                ? 'bg-purple-700 text-white'
                : 'bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t('copied') : (language === 'bn' ? 'সম্পূর্ণ রিপোর্ট কপি' : 'Copy Report')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-300/60/80 space-y-1">
            <span className="text-slate-500 font-medium">{language === 'bn' ? 'কার ও স্বরচিহ্ন (Modifiers):' : 'Modifiers (Kar/Matra):'}</span>
            <div className="text-base sm:text-lg font-bold text-slate-900 font-bangla">
              {formatNum(metrics.modifiers)} {language === 'bn' ? 'টি' : ''}
            </div>
          </div>
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-300/60/80 space-y-1">
            <span className="text-slate-500 font-medium">{language === 'bn' ? 'মোট বাক্য (Sentences):' : 'Sentences:'}</span>
            <div className="text-base sm:text-lg font-bold text-slate-900 font-bangla">
              {formatNum(metrics.sentences)} {language === 'bn' ? 'টি' : ''}
            </div>
          </div>
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-300/60/80 space-y-1">
            <span className="text-slate-500 font-medium">{language === 'bn' ? 'প্যারাগ্রাফ (Paragraphs):' : 'Paragraphs:'}</span>
            <div className="text-base sm:text-lg font-bold text-slate-900 font-bangla">
              {formatNum(metrics.paragraphs)} {language === 'bn' ? 'টি' : ''}
            </div>
          </div>
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-300/60/80 space-y-1">
            <span className="text-slate-500 font-medium">{language === 'bn' ? 'সংখ্যা ও অংক (Digits):' : 'Digits:'}</span>
            <div className="text-base sm:text-lg font-bold text-slate-900 font-bangla">
              {formatNum(metrics.digits)} {language === 'bn' ? 'টি' : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
