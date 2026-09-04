import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  RotateCcw, 
  DollarSign, 
  Hash, 
  Sparkles, 
  Receipt 
} from 'lucide-react';
import { numberToBanglaWords } from '../../utils/numberToWordsBangla';
import { toBengaliNumerals } from '../../utils/bengaliCalendar';
import { useLanguage } from '../../context/LanguageContext';

export const NumberToWordsTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [numberInput, setNumberInput] = useState<string>('7543210.50');
  const [currencyMode, setCurrencyMode] = useState<boolean>(true);
  const [payeeName, setPayeeName] = useState<string>('জনাব রহিম আহমেদ');
  const [copied, setCopied] = useState<boolean>(false);

  const wordsOutput = numberToBanglaWords(numberInput, currencyMode);
  const bengaliNumerals = toBengaliNumerals(numberInput);

  const handleCopy = async () => {
    if (!wordsOutput) return;
    try {
      await navigator.clipboard.writeText(wordsOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const presets = [
    { label: language === 'bn' ? '১ লক্ষ টাকা' : '1 Lakh', val: '100000' },
    { label: language === 'bn' ? '৭৫ লক্ষ টাকা' : '75 Lakh', val: '7500000' },
    { label: language === 'bn' ? '১ কোটি টাকা' : '1 Crore', val: '10000000' },
    { label: language === 'bn' ? 'ব্যাংক চেক নমুনা' : 'Bank Cheque Sample', val: '2456789.75' },
    { label: language === 'bn' ? '৫০ পয়সা' : '50 Poisha', val: '0.50' },
  ];

  return (
    <section id="number-to-words-tool-container" className="space-y-4 sm:space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[1rem] bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('numberWordsTitle')}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  {language === 'bn' ? 'কোটি ও লক্ষ প্রমিত' : 'Crore & Lakh Standard'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('numberWordsSubtitle')}
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="numwords-toggle-currency-btn"
              onClick={() => setCurrencyMode(!currencyMode)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] border transition-all ${
                currencyMode
                  ? 'bg-slate-900 text-white border-purple-600 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-300/60 hover:bg-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>{currencyMode ? (language === 'bn' ? 'মুদ্রা মোড (টাকা ও পয়সা)' : 'Currency Mode (Taka & Poisha)') : (language === 'bn' ? 'সাধারণ সংখ্যা মোড' : 'Plain Number Mode')}</span>
            </button>

            <button
              id="numwords-clear-btn"
              onClick={() => setNumberInput('')}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-3 py-1.5 rounded-[1rem] border border-slate-300/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('clear')}</span>
            </button>
          </div>
        </div>

        {/* Input & Quick Presets */}
        <div className="pt-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="numwords-input" className="font-bold text-slate-700 text-xs sm:text-sm flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-purple-600" />
              {language === 'bn' ? 'যেকোনো সংখ্যা লিখুন (ইংরেজি বা বাংলা অংকে):' : 'Enter number in English or Bengali digits:'}
            </label>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">{language === 'bn' ? 'বাংলা সংখ্যায়:' : 'In Bengali numerals:'}</span>
              <span className="font-bangla font-bold text-slate-900 text-sm bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                {bengaliNumerals || '০'} ৳
              </span>
            </div>
          </div>

          <input
            type="text"
            id="numwords-input"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="যেমন: 7543210 বা ৭৫৪৩২১০.৫০"
            className="w-full bg-slate-50 text-slate-900 border border-slate-300/60 focus:border-slate-900 focus:bg-white rounded-[1rem] p-3 sm:p-3.5 text-lg sm:text-2xl font-mono-code font-bold outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
          />

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
            <span className="text-xs text-slate-500 font-medium">{t('samples')}</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setNumberInput(p.val)}
                className="text-xs bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-800 border border-slate-300/60 hover:border-purple-300 px-2.5 py-1 rounded-lg transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="bg-slate-50/50 rounded-[2rem] border border-slate-200 p-4 sm:p-6 shadow-sm space-y-3.5 bg-gradient-to-b from-purple-50/20 to-white">
        <div className="flex items-center justify-between gap-2 border-b border-purple-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            {language === 'bn' ? 'বাংলা কথায় লিখিত ফলাফল' : 'Bangla Words In Full (Official)'}
          </span>
          <button
            onClick={handleCopy}
            disabled={!wordsOutput}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-[1rem] transition-all shadow-sm active:scale-95 ${
              copied
                ? 'bg-purple-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t('copied') : (language === 'bn' ? 'কথায় লেখা কপি করুন' : 'Copy Words')}</span>
          </button>
        </div>

        <div className="p-3.5 sm:p-5 bg-white rounded-[1rem] border border-purple-200 shadow-inner">
          <p className="text-lg sm:text-2xl font-bold font-bangla text-slate-900 leading-relaxed select-all">
            {wordsOutput || (language === 'bn' ? 'সংখ্যা ইনপুট দিলে এখানে কথায় রূপান্তর দেখা যাবে...' : 'Input number above to see conversion...')}
          </p>
        </div>
      </div>

      {/* Digital Bank Cheque Preview Simulation */}
      <div className="bg-amber-50/40 rounded-[2rem] sm:rounded-3xl border-2 border-dashed border-amber-200/80 p-4 sm:p-8 shadow-md relative overflow-hidden bg-gradient-to-br from-amber-50/60 via-purple-50/20 to-slate-50">
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              {language === 'bn' ? 'ব্যাংক চেক / অফিস ভাউচার প্রিভিউ' : 'Cheque & Voucher Slip Simulation'}
            </span>
          </div>
          <span className="text-xs font-mono-code text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
            PAY ORDER / CHEQUE
          </span>
        </div>

        <div className="space-y-4 font-bangla text-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs text-slate-500 font-bold whitespace-nowrap">{language === 'bn' ? 'প্রাপক (Pay To):' : 'Pay To:'}</span>
              <input
                type="text"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
                placeholder="প্রাপকের নাম লিখুন..."
                className="bg-transparent border-b border-slate-300 focus:border-purple-600 outline-none text-xs sm:text-sm font-semibold text-slate-900 w-full px-1"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold">{language === 'bn' ? 'তারিখ:' : 'Date:'}</span>
              <span className="font-mono-code font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-300/60">
                {new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </span>
            </div>
          </div>

          <div className="bg-white/80 p-3 sm:p-4 rounded-[1rem] border border-amber-200/60 shadow-sm space-y-1.5">
            <div className="text-xs text-slate-500 font-bold">{language === 'bn' ? 'টাকার পরিমাণ কথায় (The sum of):' : 'The sum of (In words):'}</div>
            <div className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
              {wordsOutput || '—'}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500 font-mono-code">
              A/C PAYEE ONLY
            </div>
            <div className="bg-[#064e3b] text-[#ffffff] font-mono-code font-extrabold text-base sm:text-xl px-3 sm:px-4 py-1.5 rounded-lg border border-[#047857] shadow-sm">
              ৳ {bengaliNumerals || '০.০০'} /-
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
