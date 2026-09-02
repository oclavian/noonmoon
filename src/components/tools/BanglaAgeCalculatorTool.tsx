import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Gift, 
  Sparkles, 
  Copy, 
  Check, 
  Printer, 
  Heart, 
  Activity, 
  Moon, 
  Compass, 
  CalendarDays,
  ArrowRight,
  Download
} from 'lucide-react';
import { calculateBanglaAge, calculateDateDifference } from '../../utils/banglaAgeCalculator';
import { useLanguage } from '../../context/LanguageContext';
import { printFormattedText, downloadAsPdf } from '../../utils/documentExport';
import { saveHistoryItem } from '../../utils/historyStorage';

export const BanglaAgeCalculatorTool: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Default to a realistic birth date (e.g. 1998-05-15)
  const [birthDateStr, setBirthDateStr] = useState<string>('1998-05-15');
  const [targetDateStr, setTargetDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [mode, setMode] = useState<'current-age' | 'date-difference'>('current-age');
  const [copied, setCopied] = useState<boolean>(false);

  // Range for difference mode
  const [diffStartStr, setDiffStartStr] = useState<string>('2020-03-26');
  const [diffEndStr, setDiffEndStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const ageResult = useMemo(() => {
    const bDate = new Date(birthDateStr);
    const tDate = mode === 'current-age' ? new Date() : new Date(targetDateStr);
    return calculateBanglaAge(bDate, tDate);
  }, [birthDateStr, targetDateStr, mode]);

  const diffResult = useMemo(() => {
    if (mode !== 'date-difference') return null;
    return calculateDateDifference(new Date(diffStartStr), new Date(diffEndStr));
  }, [diffStartStr, diffEndStr, mode]);

  const handleCopySummary = async () => {
    if (!ageResult) return;
    const summary = `📌 বাংলা বয়স ও জন্ম বিবরণী:
• বয়স: ${ageResult.yearsBn} বছর, ${ageResult.monthsBn} মাস, ${ageResult.daysBn} দিন
• মোট দিন: ${ageResult.totalDaysBn} দিন (${ageResult.totalWeeksBn} সপ্তাহ)
• পরবর্তী জন্মদিন: আর ${ageResult.daysToNextBirthdayBn} দিন বাকি (${ageResult.nextBirthdayDayBn})
• বাংলা জন্মতারিখ: ${ageResult.bengaliDob.dayBn} ${ageResult.bengaliDob.monthBn}, ${ageResult.bengaliDob.yearBn} বঙ্গাব্দ
• ঋতু ও বার: ${ageResult.bengaliDob.seasonBn} ঋতু, ${ageResult.bengaliDob.weekdayBn}`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      saveHistoryItem({
        tool: 'age',
        title: `বয়স হিসাব (${birthDateStr})`,
        content: summary,
        preview: `${ageResult.yearsBn} বছর ${ageResult.monthsBn} মাস ${ageResult.daysBn} দিন`,
      });
    } catch {
      // fallback
    }
  };

  const handlePrintCertificate = () => {
    if (!ageResult) return;
    const html = `
      <div style="text-align: center; border: 3px double #064e3b; padding: 30px; border-radius: 12px;">
        <h1 style="color: #064e3b; margin-bottom: 4px; font-size: 26px;">বাংলা বয়স ও জন্মবিবরণী সনদ</h1>
        <p style="color: #4b5563; font-size: 14px; margin-bottom: 24px;">নুন-মুন ডিজিটাল বাংলা প্ল্যাটফর্ম দ্বারা গণনাকৃত</p>
        
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 18px; margin-bottom: 24px; text-align: left;">
          <h2 style="font-size: 20px; color: #166534; margin-top: 0;">বর্তমান বয়স: ${ageResult.yearsBn} বছর, ${ageResult.monthsBn} মাস, ${ageResult.daysBn} দিন</h2>
          <p style="margin: 6px 0;"><strong>ইংরেজি জন্মতারিখ:</strong> ${birthDateStr}</p>
          <p style="margin: 6px 0;"><strong>বাংলা জন্মতারিখ:</strong> ${ageResult.bengaliDob.dayBn} ${ageResult.bengaliDob.monthBn}, ${ageResult.bengaliDob.yearBn} বঙ্গাব্দ</p>
          <p style="margin: 6px 0;"><strong>জন্মকালীন ঋতু ও বার:</strong> ${ageResult.bengaliDob.seasonBn} ঋতু, ${ageResult.bengaliDob.weekdayBn}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; text-align: left;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>মোট জীবনকাল (দিন):</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${ageResult.totalDaysBn} দিন</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>মোট সপ্তাহ:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${ageResult.totalWeeksBn} সপ্তাহ</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>পরবর্তী জন্মদিন:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">আর ${ageResult.daysToNextBirthdayBn} দিন বাকি</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>পরবর্তী জন্মদিনের বার:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${ageResult.nextBirthdayDayBn}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>আনুমানিক হৃদস্পন্দন:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">~${ageResult.approxHeartbeatsBn} বার</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ঘুমের মোট সময়:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">~${ageResult.approxSleepHoursBn} ঘণ্টা</td>
          </tr>
        </table>
      </div>
    `;
    printFormattedText('বাংলা বয়স সনদ', html);
  };

  const handleDownloadPdfCertificate = async () => {
    if (!ageResult) return;
    const html = `
      <div style="text-align: center; border: 3px double #064e3b; padding: 30px; border-radius: 12px;">
        <h1 style="color: #064e3b; margin-bottom: 4px; font-size: 26px;">বাংলা বয়স ও জন্মবিবরণী সনদ</h1>
        <p style="color: #4b5563; font-size: 14px; margin-bottom: 24px;">নুন-মুন ডিজিটাল বাংলা প্ল্যাটফর্ম দ্বারা গণনাকৃত</p>
        
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 18px; margin-bottom: 24px; text-align: left;">
          <h2 style="font-size: 20px; color: #166534; margin-top: 0;">বর্তমান বয়স: ${ageResult.yearsBn} বছর, ${ageResult.monthsBn} মাস, ${ageResult.daysBn} দিন</h2>
          <p style="margin: 6px 0;"><strong>ইংরেজি জন্মতারিখ:</strong> ${birthDateStr}</p>
          <p style="margin: 6px 0;"><strong>বাংলা জন্মতারিখ:</strong> ${ageResult.bengaliDob.dayBn} ${ageResult.bengaliDob.monthBn}, ${ageResult.bengaliDob.yearBn} বঙ্গাব্দ</p>
          <p style="margin: 6px 0;"><strong>জন্মকালীন ঋতু ও বার:</strong> ${ageResult.bengaliDob.seasonBn} ঋতু, ${ageResult.bengaliDob.weekdayBn}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; text-align: left;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>মোট জীবনকাল (দিন):</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${ageResult.totalDaysBn} দিন</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>মোট সপ্তাহ:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${ageResult.totalWeeksBn} সপ্তাহ</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>পরবর্তী জন্মদিন:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">আর ${ageResult.daysToNextBirthdayBn} দিন বাকি</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>পরবর্তী জন্মদিনের বার:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${ageResult.nextBirthdayDayBn}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>আনুমানিক হৃদস্পন্দন:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">~${ageResult.approxHeartbeatsBn} বার</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ঘুমের মোট সময়:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">~${ageResult.approxSleepHoursBn} ঘণ্টা</td>
          </tr>
        </table>
      </div>
    `;
    try {
      await downloadAsPdf('বাংলা বয়স সনদ', html, `age-certificate-${Date.now()}.pdf`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="bangla-age-calculator-tool" className="space-y-4 sm:space-y-6">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {language === 'bn' ? 'বাংলা বয়স ও জন্মতারিখ ক্যালকুলেটর' : 'Bengali Age & Birthday Calculator'}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full">
                  {language === 'bn' ? 'বঙ্গাব্দ ও তিথিসহ' : 'With Bengali Era'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {language === 'bn' 
                  ? 'জন্মতারিখ থেকে নিখুঁত বছর, মাস, দিন, বঙ্গাব্দ সন, ঋতু, পরবর্তী জন্মদিন ও জীবনকালের পরিসংখ্যান।' 
                  : 'Calculate exact age in years, months, days, Bengali era San, season, next birthday and lifespan stats.'}
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300/60 self-start sm:self-auto">
            <button
              onClick={() => setMode('current-age')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'current-age'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? 'বর্তমান বয়স' : 'Current Age'}
            </button>
            <button
              onClick={() => setMode('date-difference')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'date-difference'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? 'তারিখের ব্যবধান' : 'Date Difference'}
            </button>
          </div>
        </div>

        {/* Date Inputs Controls */}
        {mode === 'current-age' ? (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="space-y-1.5">
              <label htmlFor="birthdate-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-purple-600" />
                <span>{language === 'bn' ? 'আপনার জন্মতারিখ নির্বাচন করুন:' : 'Select Your Date of Birth:'}</span>
              </label>
              <input
                id="birthdate-input"
                type="date"
                value={birthDateStr}
                onChange={(e) => setBirthDateStr(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full text-sm font-semibold bg-slate-50 border border-slate-300/60 px-3.5 py-2 rounded-xl text-slate-900 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="targetdate-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'bn' ? 'যে তারিখ অনুযায়ী হিসাব হবে:' : 'Calculate Age As Of:'}</span>
              </label>
              <input
                id="targetdate-input"
                type="date"
                value={targetDateStr}
                onChange={(e) => setTargetDateStr(e.target.value)}
                className="w-full text-sm font-semibold bg-slate-50 border border-slate-300/60 px-3.5 py-2 rounded-xl text-slate-900 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 outline-none"
              />
            </div>

            {/* Quick Birthday Presets */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <span className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'দ্রুত বছর সিলেক্ট:' : 'Quick Presets:'}</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {['2005-01-01', '2000-06-15', '1995-10-20', '1990-03-26'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBirthDateStr(preset)}
                    className="text-xs bg-slate-100 hover:bg-purple-50 hover:text-purple-800 border border-slate-300/60 px-2 py-1 rounded-lg transition-all"
                  >
                    {preset.substring(0, 4)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'bn' ? 'শুরুর তারিখ (Start Date):' : 'Start Date:'}
              </label>
              <input
                type="date"
                value={diffStartStr}
                onChange={(e) => setDiffStartStr(e.target.value)}
                className="w-full text-sm font-semibold bg-slate-50 border border-slate-300/60 px-3.5 py-2 rounded-xl text-slate-900 focus:border-slate-900 focus:bg-white outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'bn' ? 'শেষের তারিখ (End Date):' : 'End Date:'}
              </label>
              <input
                type="date"
                value={diffEndStr}
                onChange={(e) => setDiffEndStr(e.target.value)}
                className="w-full text-sm font-semibold bg-slate-50 border border-slate-300/60 px-3.5 py-2 rounded-xl text-slate-900 focus:border-slate-900 focus:bg-white outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Results Display */}
      {mode === 'current-age' && ageResult && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          {/* Primary Age Big Card */}
          <div className="bg-white dark:bg-slate-900 text-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md border border-[#047857]/60 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-700/60 text-[#6ee7b7] text-xs font-bold px-3 py-1 rounded-full border border-slate-900 dark:border-white/40 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>{language === 'bn' ? 'বর্তমান বয়স হিসাব' : 'Calculated Age'}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-bangla text-[#ffffff] flex flex-wrap items-baseline gap-2">
                  <span>{ageResult.yearsBn} <span className="text-[#34d399] text-lg sm:text-2xl font-semibold">বছর</span></span>
                  <span>{ageResult.monthsBn} <span className="text-[#34d399] text-lg sm:text-2xl font-semibold">মাস</span></span>
                  <span>{ageResult.daysBn} <span className="text-[#34d399] text-lg sm:text-2xl font-semibold">দিন</span></span>
                </h3>
                <p className="text-xs sm:text-sm text-[#6ee7b7]/90 mt-2 font-bangla">
                  মোট জীবনকাল: <strong className="text-[#ffffff]">{ageResult.totalDaysBn} দিন</strong> ({ageResult.totalWeeksBn} সপ্তাহ বা {ageResult.totalMonthsBn} মাস)
                </p>
              </div>

              {/* Action Buttons inside Card */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={handleCopySummary}
                  className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'বিবরণী কপি' : 'Copy Summary')}</span>
                </button>
                <button
                  onClick={handlePrintCertificate}
                  className="flex items-center gap-1.5 bg-[#022c22]/70 hover:bg-purple-900 text-[#d1fae5] text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl border border-purple-600/50 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'bn' ? 'সনদ প্রিন্ট' : 'Print View'}</span>
                </button>
                <button
                  onClick={handleDownloadPdfCertificate}
                  className="flex items-center gap-1.5 bg-rose-950/70 hover:bg-rose-900 text-rose-100 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl border border-rose-600/50 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'bn' ? 'পিডিএফ সনদ' : 'PDF Cert'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Bento Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Bengali Date of Birth Details */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
              <div>
                <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm mb-3">
                  <CalendarDays className="w-4 h-4" />
                  <h4>{language === 'bn' ? 'বাংলা জন্মতারিখ (বঙ্গাব্দ)' : 'Bengali San Date of Birth'}</h4>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                    <span className="text-xs text-slate-500">{language === 'bn' ? 'বাংলা সন ও পঞ্জিকা তারিখ:' : 'Bengali San & Date:'}</span>
                    <p className="text-base font-bold text-purple-950 font-bangla mt-0.5">
                      {ageResult.bengaliDob.dayBn} {ageResult.bengaliDob.monthBn}, {ageResult.bengaliDob.yearBn} বঙ্গাব্দ
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-slate-600 dark:text-slate-400">
                    <span>{language === 'bn' ? 'জন্মকালীন ঋতু:' : 'Birth Season:'}</span>
                    <strong className="text-slate-900 font-bangla">{ageResult.bengaliDob.seasonBn} ঋতু</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>{language === 'bn' ? 'জন্মের বার:' : 'Birth Day of Week:'}</span>
                    <strong className="text-slate-900 font-bangla">{ageResult.bengaliDob.weekdayBn}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Next Birthday Countdown */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
              <div>
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-sm mb-3">
                  <Gift className="w-4 h-4" />
                  <h4>{language === 'bn' ? 'পরবর্তী জন্মদিন কাউন্টডাউন' : 'Next Birthday'}</h4>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80">
                    <span className="text-xs text-amber-800">{language === 'bn' ? 'জন্মদিন আসতে বাকি:' : 'Days Remaining:'}</span>
                    <p className="text-lg font-extrabold text-amber-950 font-bangla mt-0.5">
                      আর {ageResult.daysToNextBirthdayBn} দিন
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-slate-600 dark:text-slate-400">
                    <span>{language === 'bn' ? 'পরবর্তী বয়স হবে:' : 'Next Milestone Age:'}</span>
                    <strong className="text-slate-900 font-bangla">{ageResult.nextAgeYearsBn} বছর</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>{language === 'bn' ? 'পরবর্তী জন্মদিনের বার:' : 'Day of the Week:'}</span>
                    <strong className="text-slate-900 font-bangla">{ageResult.nextBirthdayDayBn}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Lifespan Biological Insights */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
              <div>
                <div className="flex items-center gap-2.5 text-rose-600 font-bold text-sm mb-3">
                  <Activity className="w-4 h-4" />
                  <h4>{language === 'bn' ? 'জীবনকালের রোমাঞ্চকর তথ্য' : 'Lifespan Statistics'}</h4>
                </div>
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>{language === 'bn' ? 'মোট হৃদস্পন্দন (আনুমানিক):' : 'Total Heartbeats:'}</span>
                    </span>
                    <strong className="text-slate-900 font-bangla">~{ageResult.approxHeartbeatsBn} বার</strong>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-pink-500" />
                      <span>{language === 'bn' ? 'মোট শ্বাস-প্রশ্বাস:' : 'Total Breaths Taken:'}</span>
                    </span>
                    <strong className="text-slate-900 font-bangla">~{ageResult.approxBreathsBn} বার</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{language === 'bn' ? 'ঘুমের মোট সময়:' : 'Total Sleep Hours:'}</span>
                    </span>
                    <strong className="text-slate-900 font-bangla">~{ageResult.approxSleepHoursBn} ঘণ্টা</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Difference Mode Display */}
      {mode === 'date-difference' && diffResult && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs animate-in fade-in">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{language === 'bn' ? 'তারিখ দুটির মধ্যকার ব্যবধানের ফলাফল' : 'Date Difference Result'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <span className="text-xs text-slate-900">{language === 'bn' ? 'বছর' : 'Years'}</span>
              <p className="text-2xl font-bold text-purple-950 font-bangla mt-1">{diffResult.yearsBn} বছর</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <span className="text-xs text-slate-900">{language === 'bn' ? 'মাস' : 'Months'}</span>
              <p className="text-2xl font-bold text-purple-950 font-bangla mt-1">{diffResult.monthsBn} মাস</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <span className="text-xs text-slate-900">{language === 'bn' ? 'দিন' : 'Days'}</span>
              <p className="text-2xl font-bold text-purple-950 font-bangla mt-1">{diffResult.daysBn} দিন</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-300/60">
              <span className="text-xs text-slate-500">{language === 'bn' ? 'মোট দিন সংখ্যা' : 'Total Days'}</span>
              <p className="text-2xl font-bold text-slate-900 font-bangla mt-1">{diffResult.totalDaysBn} দিন</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
