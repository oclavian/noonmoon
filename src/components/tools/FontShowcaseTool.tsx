import React, { useState } from 'react';
import { 
  Type, 
  Check, 
  Copy, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FontShowcaseTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [testText, setTestText] = useState<string>(
    'আমাদের ভালোবাসার বাংলা ভাষা — স্বাগতম ও শুভকামনা। রবীন্দ্রনাথ, নজরুল ও জীবনানন্দের রূপসী বাংলা।'
  );
  const [selectedFont, setSelectedFont] = useState<string>('SolaimanLipi, "Solaiman Lipi", sans-serif');
  const [fontSizePx, setFontSizePx] = useState<number>(20);
  const [fontWeight, setFontWeight] = useState<number>(500);
  const [lineHeightPx, setLineHeightPx] = useState<number>(32);
  const [letterSpacingPx, setLetterSpacingPx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const fontOptions = [
    { name: 'SolaimanLipi', value: 'SolaimanLipi, "Solaiman Lipi", sans-serif', label: language === 'bn' ? 'সোলেমান লিপি (SolaimanLipi - Iconic Unicode)' : 'SolaimanLipi (Iconic Unicode)' },
    { name: 'Hind Siliguri', value: 'Hind Siliguri, Noto Sans Bengali, sans-serif', label: language === 'bn' ? 'হিন্দ শিলিগুড়ি (Hind Siliguri - Clean & Modern)' : 'Hind Siliguri (Clean & Modern)' },
    { name: 'Noto Sans Bengali', value: 'Noto Sans Bengali, sans-serif', label: language === 'bn' ? 'নোটো সান্স বেঙ্গলি (Noto Sans Bengali - Standard)' : 'Noto Sans Bengali (Standard)' },
    { name: 'SutonnyMJ', value: 'SutonnyMJ, "Sutonny MJ", sans-serif', label: language === 'bn' ? 'সুতন্বীএমজে (SutonnyMJ - Bijoy Classic)' : 'SutonnyMJ (Bijoy Classic)' },
  ];

  const literaryPassages = [
    {
      title: language === 'bn' ? 'গীতাঞ্জলি — রবীন্দ্রনাথ ঠাকুর' : 'Gitanjali — Tagore',
      text: 'আমার মাথা নত করে দাও হে তোমার চরণধূলার তলে। সকল অহংকার হে আমার ডুবাও চোখের জলে। নিজেরে করিতে গৌরব দান নিজেরে কেবলি করি অপমান...',
    },
    {
      title: language === 'bn' ? 'বিদ্রোহী — কাজী নজরুল ইসলাম' : 'Bidrohi — Nazrul',
      text: 'বল বীর — বল উন্নত মম শির! শির নেহারি’ আমারি নতশির ওই শিখর হিমাদ্রির! বল বীর — বল মহাবিশ্বের মহাকাশ ফাড়ি’ চন্দ্র সূর্য গ্রহ তারা ছাড়ি’...',
    },
    {
      title: language === 'bn' ? 'রূপসী বাংলা — জীবনানন্দ দাশ' : 'Ruposhi Bangla — Jibanananda',
      text: 'বাংলার মুখ আমি দেখিয়াছি, তাই আমি পৃথিবীর রূপ খুঁজিতে যাই না আর: অন্ধকারে জেগে উঠে ডুমুরের গাছে চেয়ে দেখি ছাতার মতন বড়ো পাতাটির নিচে...',
    },
  ];

  const juktabornoList = [
    { char: 'ক্ষ', desc: 'ক্ + ষ (শিক্ষা, ক্ষমা)' },
    { char: 'জ্ঞ', desc: 'জ্ + ঞ (জ্ঞান, বিজ্ঞান)' },
    { char: 'ষ্ণ', desc: 'ষ্ + ণ (কৃষ্ণ, উষ্ণ)' },
    { char: 'ত্ত', desc: 'ত্ + ত (উত্তর, সম্পত্তি)' },
    { char: 'দ্ধ', desc: 'দ্ + ধ (বুদ্ধি, শুদ্ধ)' },
    { char: 'হ্ম', desc: 'হ্ + ম (ব্রাহ্মণ)' },
    { char: 'ঙ্ক', desc: 'ঙ্ + ক (অঙ্ক, শঙ্কা)' },
    { char: 'ঙ্গ', desc: 'ঙ্ + গ (বঙ্গ, অঙ্গ)' },
  ];

  const handleCopyCss = async () => {
    const css = `font-family: ${selectedFont};\nfont-size: ${fontSizePx}px;\nfont-weight: ${fontWeight};\nline-height: ${lineHeightPx}px;\nletter-spacing: ${letterSpacingPx}px;`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="bangla-fonts-showcase-container" className="space-y-4 sm:space-y-6">
      {/* Workbench Header & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('fontsTitle')}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  {language === 'bn' ? 'স্পেসিমেন ল্যাব' : 'Specimen Lab'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('fontsSubtitle')}
              </p>
            </div>
          </div>

          <button
            id="fonts-copy-css-btn"
            onClick={handleCopyCss}
            className={`flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-xs shrink-0 ${
              copied
                ? 'bg-purple-700 text-white'
                : 'bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (language === 'bn' ? 'CSS কপি হয়েছে!' : 'CSS Copied!') : (language === 'bn' ? 'CSS কোড কপি করুন' : 'Copy CSS')}</span>
          </button>
        </div>

        {/* Sliders and Controls */}
        <div className="bg-slate-50 p-3.5 sm:p-5 rounded-2xl border border-slate-300/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <label htmlFor="font-family-select" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'bn' ? 'ফন্ট নির্বাচন:' : 'Font Family:'}
            </label>
            <select
              id="font-family-select"
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold border border-slate-300/60 rounded-xl p-2.5 outline-none focus:border-slate-900"
            >
              {fontOptions.map((f, idx) => (
                <option key={idx} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>{language === 'bn' ? 'ফন্ট সাইজ (Size):' : 'Font Size:'}</span>
              <span className="font-mono-code text-slate-900">{fontSizePx}px</span>
            </div>
            <input
              type="range"
              min={14}
              max={64}
              value={fontSizePx}
              onChange={(e) => setFontSizePx(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>{language === 'bn' ? 'ফন্ট ওয়েট (Weight):' : 'Font Weight:'}</span>
              <span className="font-mono-code text-slate-900">{fontWeight}</span>
            </div>
            <input
              type="range"
              min={300}
              max={800}
              step={100}
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>{language === 'bn' ? 'লাইন হাইট (Line Height):' : 'Line Height:'}</span>
              <span className="font-mono-code text-slate-900">{lineHeightPx}px</span>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              value={lineHeightPx}
              onChange={(e) => setLineHeightPx(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Playground Canvas */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {language === 'bn' ? 'লাইভ ক্যানভাস প্রিভিউ' : 'Live Canvas Preview'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {literaryPassages.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestText(p.text)}
                  className="text-xs bg-slate-100 hover:bg-purple-50 text-slate-700 dark:text-slate-300 hover:text-purple-800 border border-slate-300/60 px-2 py-0.5 rounded transition-all"
                >
                  {p.title.split('—')[0]}
                </button>
              ))}
            </div>
          </div>

          <div
            className="p-4 sm:p-6 bg-white rounded-2xl border-2 border-purple-200/80 shadow-inner min-h-[140px] sm:min-h-[160px] select-all outline-none"
            style={{
              fontFamily: selectedFont,
              fontSize: `${fontSizePx}px`,
              fontWeight: fontWeight,
              lineHeight: `${lineHeightPx}px`,
              letterSpacing: `${letterSpacingPx}px`,
            }}
          >
            {testText}
          </div>
        </div>
      </div>

      {/* Ligatures / যুক্তবর্ণ Verification Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-3.5 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          {language === 'bn' ? 'যুক্তবর্ণ ও লিগেচার রেন্ডারিং টেস্ট (Ligatures Specimen)' : 'Conjuncts & Ligatures Specimen Test'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {juktabornoList.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-300/60 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-bangla text-purple-800">
                {item.char}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
