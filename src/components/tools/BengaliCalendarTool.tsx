import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sun, 
  CloudRain, 
  Wind, 
  Flame, 
  Snowflake, 
  Flower2, 
  Copy, 
  Check,
  CalendarDays
} from 'lucide-react';
import { getBengaliDate } from '../../utils/bengaliCalendar';
import { useLanguage } from '../../context/LanguageContext';

export const BengaliCalendarTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const d = new Date();
    const pad = (n: number) => (n < 10 ? '0' + n : String(n));
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  });
  const [copied, setCopied] = useState<boolean>(false);

  const selectedDate = new Date(selectedDateStr + 'T12:00:00');
  const bResult = getBengaliDate(selectedDate);

  const seasonIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'গ্রীষ্ম': Flame,
    'বর্ষা': CloudRain,
    'শরৎ': Wind,
    'হেমন্ত': Sun,
    'শীত': Snowflake,
    'বসন্ত': Flower2,
  };

  const seasonColors: Record<string, { bg: string; text: string; border: string }> = {
    'গ্রীষ্ম': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'বর্ষা': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    'শরৎ': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    'হেমন্ত': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    'শীত': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'বসন্ত': { bg: 'bg-purple-50', text: 'text-slate-900', border: 'border-purple-200' },
  };

  const seasonEnMap: Record<string, string> = {
    'গ্রীষ্ম': 'Summer (Grishma)',
    'বর্ষা': 'Monsoon (Barsha)',
    'শরৎ': 'Autumn (Sharat)',
    'হেমন্ত': 'Late Autumn (Hemanta)',
    'শীত': 'Winter (Sheet)',
    'বসন্ত': 'Spring (Basanta)',
  };

  const SeasonIcon = seasonIcons[bResult.seasonBn] || Sun;
  const currentSeasonColor = seasonColors[bResult.seasonBn] || { bg: 'bg-purple-50', text: 'text-slate-900', border: 'border-purple-200' };

  const quickDates = [
    { label: language === 'bn' ? 'আজকের দিন' : 'Today', date: new Date() },
    { label: language === 'bn' ? 'পহেলা বৈশাখ' : 'Pohela Boishakh', date: new Date(2026, 3, 14) },
    { label: language === 'bn' ? 'একুশে ফেব্রুয়ারি' : '21st February', date: new Date(2026, 1, 21) },
    { label: language === 'bn' ? 'স্বাধীনতা দিবস' : 'Independence Day', date: new Date(2026, 2, 26) },
    { label: language === 'bn' ? 'বিজয় দিবস' : 'Victory Day', date: new Date(2026, 11, 16) },
  ];

  const banglaMonthsList = [
    { name: 'বৈশাখ', nameEn: 'Boishakh', days: language === 'bn' ? '৩১ দিন' : '31 days', season: language === 'bn' ? 'গ্রীষ্ম' : 'Summer' },
    { name: 'জ্যৈষ্ঠ', nameEn: 'Joishtho', days: language === 'bn' ? '৩১ দিন' : '31 days', season: language === 'bn' ? 'গ্রীষ্ম' : 'Summer' },
    { name: 'আষাঢ়', nameEn: 'Asharh', days: language === 'bn' ? '৩১ দিন' : '31 days', season: language === 'bn' ? 'বর্ষা' : 'Monsoon' },
    { name: 'শ্রাবণ', nameEn: 'Shrabon', days: language === 'bn' ? '৩১ দিন' : '31 days', season: language === 'bn' ? 'বর্ষা' : 'Monsoon' },
    { name: 'ভাদ্র', nameEn: 'Bhadro', days: language === 'bn' ? '৩১ দিন' : '31 days', season: language === 'bn' ? 'শরৎ' : 'Autumn' },
    { name: 'আশ্বিন', nameEn: 'Ashwin', days: language === 'bn' ? '৩১ দিন' : '31 days', season: language === 'bn' ? 'শরৎ' : 'Autumn' },
    { name: 'কার্তিক', nameEn: 'Kartik', days: language === 'bn' ? '৩০ দিন' : '30 days', season: language === 'bn' ? 'হেমন্ত' : 'Late Autumn' },
    { name: 'অগ্রহায়ণ', nameEn: 'Agrahayan', days: language === 'bn' ? '৩০ দিন' : '30 days', season: language === 'bn' ? 'হেমন্ত' : 'Late Autumn' },
    { name: 'পৌষ', nameEn: 'Poush', days: language === 'bn' ? '৩০ দিন' : '30 days', season: language === 'bn' ? 'শীত' : 'Winter' },
    { name: 'মাঘ', nameEn: 'Magh', days: language === 'bn' ? '৩০ দিন' : '30 days', season: language === 'bn' ? 'শীত' : 'Winter' },
    { name: 'ফাল্গুন', nameEn: 'Falgun', days: language === 'bn' ? '২৯/৩০ দিন' : '29/30 days', season: language === 'bn' ? 'বসন্ত' : 'Spring' },
    { name: 'চৈত্র', nameEn: 'Choitro', days: language === 'bn' ? '৩০ দিন' : '30 days', season: language === 'bn' ? 'বসন্ত' : 'Spring' },
  ];

  const handleCopyDate = async () => {
    const formatted = `${bResult.dayBn} ${bResult.monthBn}, ${bResult.yearBn} ${bResult.era} (${bResult.weekdayBn}, ঋতু: ${bResult.seasonBn})`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSetDate = (d: Date) => {
    const pad = (n: number) => (n < 10 ? '0' + n : String(n));
    setSelectedDateStr(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  };

  return (
    <section id="bengali-calendar-container" className="space-y-4 sm:space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[1rem] bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-sm shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('calendarTitle')}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  {language === 'bn' ? 'একাডেমি ২০১৯ প্রমিত' : 'Academy 2019 Standard'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('calendarSubtitle')}
              </p>
            </div>
          </div>

          {/* Quick Date Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            {quickDates.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSetDate(item.date)}
                className="text-xs bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-800 border border-slate-300/60 hover:border-purple-300 px-2.5 sm:px-3 py-1.5 rounded-[1rem] font-medium transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date Picker Row */}
        <div className="pt-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <label htmlFor="calendar-date-picker" className="text-xs font-bold text-slate-600 whitespace-nowrap">
              {t('selectDate')}:
            </label>
            <input
              type="date"
              id="calendar-date-picker"
              value={selectedDateStr}
              onChange={(e) => setSelectedDateStr(e.target.value)}
              className="bg-slate-50 border border-slate-300/60 hover:border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold rounded-[1rem] px-3 py-1.5 sm:py-2 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <button
            onClick={handleCopyDate}
            className={`flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-[1rem] transition-all shadow-sm ${
              copied
                ? 'bg-purple-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800:bg-slate-200 text-white active:scale-95'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t('copied') : (language === 'bn' ? 'সম্পূর্ণ তারিখ কপি করুন' : 'Copy Full Date')}</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Hero Widget */}
      <div className="bg-gradient-to-br from-[#06231c] via-[#09352a] to-[#041d17] text-[#ffffff] p-5 sm:p-8 rounded-[2rem] sm:rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Main Big Bengali Date Display */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full border shadow-sm ${currentSeasonColor.bg} ${currentSeasonColor.text} ${currentSeasonColor.border}`}>
                <SeasonIcon className="w-3.5 h-3.5" />
                {language === 'bn' ? `ঋতু: ${bResult.seasonBn}` : `Season: ${seasonEnMap[bResult.seasonBn] || bResult.seasonBn}`}
              </span>
              <span className="text-xs text-[#6ee7b7] font-medium">
                {bResult.weekdayBn}{language === 'bn' ? 'বার' : ' (Day)'}
              </span>
            </div>

            <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-bangla text-[#ffffff] tracking-tight leading-tight">
              {bResult.dayBn} {bResult.monthBn}, {bResult.yearBn} <span className="text-[#34d399] text-xl sm:text-3xl">{bResult.era}</span>
            </div>

            <p className="text-[#d1fae5]/80 text-xs sm:text-sm">
              {language === 'bn' ? 'ইংরেজি সমতুল্য তারিখ: ' : 'Equivalent Gregorian Date: '}
              <span className="font-semibold text-[#ffffff]">
                {selectedDate.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 min-w-[200px] sm:min-w-[240px]">
            <div className="bg-[#022c22]/60 backdrop-blur-md p-3 sm:p-3.5 rounded-[1rem] sm:rounded-[2rem] border border-[#047857]/40 text-center">
              <div className="text-[11px] sm:text-xs text-[#34d399] font-medium">
                {language === 'bn' ? 'বাংলা মাস' : 'Bengali Month'}
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#ffffff] mt-0.5">{bResult.monthBn}</div>
            </div>
            <div className="bg-[#022c22]/60 backdrop-blur-md p-3 sm:p-3.5 rounded-[1rem] sm:rounded-[2rem] border border-[#047857]/40 text-center">
              <div className="text-[11px] sm:text-xs text-[#34d399] font-medium">
                {language === 'bn' ? 'বাংলা সন' : 'Bengali Year'}
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#34d399] font-mono-code mt-0.5">{bResult.yearBn}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bangla Calendar Months Reference Grid */}
      <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-8 space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-purple-600" />
          {language === 'bn' ? 'বাংলা ১২ মাসের হিসাব ও ঋতু পরিক্রমা (বাংলা একাডেমি প্রমিত)' : '12 Bengali Months & 6 Seasons (Bangla Academy Standard)'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {banglaMonthsList.map((m, idx) => {
            const isCurrent = m.name === bResult.monthBn;
            return (
              <div
                key={idx}
                className={`p-3 rounded-[1rem] border text-center transition-all ${
                  isCurrent
                    ? 'bg-purple-50 border-slate-900 shadow-sm ring-2 ring-purple-500/20'
                    : 'bg-slate-50/70 border-slate-300/60/80 hover:border-purple-300'
                }`}
              >
                <div className={`font-bold text-sm sm:text-base ${isCurrent ? 'text-purple-800' : 'text-slate-900'}`}>
                  {language === 'bn' ? m.name : m.nameEn}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{m.days}</div>
                <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isCurrent ? 'bg-purple-200 text-purple-900' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {m.season}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
