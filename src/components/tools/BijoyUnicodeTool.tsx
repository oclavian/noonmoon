import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRightLeft, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  Upload, 
  Sparkles, 
  Eye, 
  Code2, 
  Info,
  FileText,
  Printer,
  History,
  Trash2
} from 'lucide-react';
import { bijoyToUnicode, unicodeToBijoy } from '../../utils/bijoyUnicodeConverter';
import { parsePhoneticSentence } from '../../utils/phoneticConverter';
import { loadStoredCustomFont, saveCustomFont } from '../../utils/fontStorage';
import { useLanguage } from '../../context/LanguageContext';
import { downloadAsDoc, downloadAsTxt, printFormattedText } from '../../utils/documentExport';
import { getHistoryItems, saveHistoryItem, deleteHistoryItem, clearHistory, HistoryItem } from '../../utils/historyStorage';

export const BijoyUnicodeTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [conversionMode, setConversionMode] = useState<'bijoy-to-unicode' | 'unicode-to-bijoy'>('unicode-to-bijoy');
  const [inputText, setInputText] = useState<string>('আমি তোমাকে ভালোবাসি');
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [fontName, setFontName] = useState<string>('SutonnyMJ WebFont');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [viewMode, setViewMode] = useState<'font' | 'ansi'>('font');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textFileInputRef = useRef<HTMLInputElement>(null);

  // Check and restore custom font or webfont on mount
  useEffect(() => {
    loadStoredCustomFont('SutonnyMJ').then((res) => {
      if (res) {
        setFontLoaded(true);
        setFontName(`Local (${res.name})`);
      } else if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.load('16px SutonnyMJ').then((fonts) => {
          if (fonts && fonts.length > 0) {
            setFontLoaded(true);
            setFontName('SutonnyMJ WebFont');
          }
        }).catch(() => {
          setFontLoaded(true);
        });
      }
    });
  }, []);

  useEffect(() => {
    setHistoryList(getHistoryItems('bijoy'));
  }, [showHistory]);

  // Perform Realtime Conversion
  useEffect(() => {
    if (conversionMode === 'bijoy-to-unicode') {
      setOutputText(bijoyToUnicode(inputText));
    } else {
      // In unicode-to-bijoy mode, if user types English (Banglish),
      // we auto-convert it to Bengali Unicode first (Phonetic)
      const hasEnglish = /[a-zA-Z]/.test(inputText);
      let unicodeText = inputText;
      if (hasEnglish) {
        unicodeText = parsePhoneticSentence(inputText);
      }
      setOutputText(unicodeToBijoy(unicodeText));
    }
  }, [inputText, conversionMode]);

  const handleSwapModes = () => {
    const nextMode = conversionMode === 'bijoy-to-unicode' ? 'unicode-to-bijoy' : 'bijoy-to-unicode';
    setConversionMode(nextMode);
    setInputText(outputText);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Save to history
      saveHistoryItem({
        tool: 'bijoy',
        title: `${conversionMode === 'unicode-to-bijoy' ? 'ইউনিকোড ➔ বিজয়' : 'বিজয় ➔ ইউনিকোড'}: ${outputText.substring(0, 25)}...`,
        content: outputText,
        preview: inputText.substring(0, 30) + '...',
      });
      setHistoryList(getHistoryItems('bijoy'));
    } catch {
      // fallback
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (conversionMode === 'unicode-to-bijoy' && (e.key === ' ' || e.key === 'Enter')) {
      const target = e.target as HTMLTextAreaElement;
      const currentCursor = target.selectionStart;
      const currentText = target.value;
      
      const converted = parsePhoneticSentence(currentText);
      if (converted !== currentText) {
        setInputText(converted);
        const diff = converted.length - currentText.length;
        setTimeout(() => {
          target.setSelectionRange(currentCursor + diff, currentCursor + diff);
        }, 10);
      }
    }
  };

  const handleDownloadTxt = () => {
    downloadAsTxt(outputText, `converted-${conversionMode}-${Date.now()}.txt`);
  };

  const handleDownloadDoc = () => {
    downloadAsDoc(
      conversionMode === 'unicode-to-bijoy' ? 'বিজয় কনভার্টকৃত ডকুমেন্ট' : 'ইউনিকোড ডকুমেন্ট',
      `<p style="${conversionMode === 'unicode-to-bijoy' ? 'font-family: SutonnyMJ;' : ''}">${outputText.replace(/\n/g, '<br/>')}</p>`,
      `converted-${conversionMode}-${Date.now()}.doc`
    );
  };

  const handlePrint = () => {
    printFormattedText(
      'কনভার্টকৃত বাংলা টেক্সট',
      `<p style="${conversionMode === 'unicode-to-bijoy' ? 'font-family: SutonnyMJ;' : ''}">${outputText.replace(/\n/g, '<br/>')}</p>`
    );
  };

  const handleTextFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(ttf|otf|woff|woff2)$/i)) {
      setUploadStatus(language === 'bn' ? 'অনুগ্রহ করে সঠিক ফন্ট ফাইল নির্বাচন করুন (.ttf, .otf)' : 'Please upload a valid font file (.ttf, .otf)');
      e.target.value = '';
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const fontFace = new FontFace('SutonnyMJ', buffer);
      await fontFace.load();
      document.fonts.add(fontFace);

      await saveCustomFont('SutonnyMJ', file.name, buffer);

      setFontLoaded(true);
      setFontName(file.name);
      setUploadStatus(language === 'bn' ? `ফন্ট "${file.name}" সফলভাবে যুক্ত হয়েছে!` : `Font "${file.name}" loaded successfully!`);
      setTimeout(() => setUploadStatus(''), 4000);
    } catch {
      setUploadStatus(language === 'bn' ? 'ফন্ট লোড করতে সমস্যা হয়েছে।' : 'Failed to load font file.');
    }
    e.target.value = '';
  };

  const samples = conversionMode === 'bijoy-to-unicode' ? [
    { label: 'আমি তোমাকে ভালোবাসি', text: 'Avwg †Zvgv‡K fv‡jvevwm' },
    { label: 'সোনার বাংলা', text: 'Avgvi †mvbvi evsjv Avwg †Zvgvq fvjevwm|' },
    { label: 'বাংলাদেশ', text: 'MYcÖRvZš¿x evsjv‡`k miKvi|' },
    { label: 'মাতৃভাষা', text: 'evsjv Avgv‡`i cÖv‡Yi fvlv|' },
  ] : [
    { label: 'আমি তোমাকে ভালোবাসি', text: 'আমি তোমাকে ভালোবাসি' },
    { label: 'সোনার বাংলা', text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাসি।' },
    { label: 'বাংলাদেশ', text: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার।' },
    { label: 'মাতৃভাষা', text: 'বাংলা আমাদের প্রাণের ভাষা।' },
  ];

  return (
    <section id="bijoy-unicode-converter-container" className="space-y-4 sm:space-y-6">
      {/* Tool Header & Mode Selector */}
      <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[1rem] bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold shadow-sm shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('bijoyToolTitle')}
                </h2>
                <span className="text-[11px] bg-emerald-50 text-[#006B54] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ANSI & Unicode 100% Accurate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('bijoyToolSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-[1rem] border border-slate-200">
              <button
                onClick={() => {
                  setConversionMode('unicode-to-bijoy');
                  setInputText('আমি তোমাকে ভালোবাসি');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  conversionMode === 'unicode-to-bijoy'
                    ? 'bg-[#006B54] text-white shadow-pill-green shadow-sm'
                    : 'text-slate-600 hover:text-[#006B54]'
                }`}
              >
                {t('unicodeToBijoyTab')}
              </button>
              <button
                onClick={() => {
                  setConversionMode('bijoy-to-unicode');
                  setInputText('Avwg †Zvgv‡K fv‡jvevwm');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  conversionMode === 'bijoy-to-unicode'
                    ? 'bg-[#006B54] text-white shadow-pill-green shadow-sm'
                    : 'text-slate-600 hover:text-[#006B54]'
                }`}
              >
                {t('bijoyToUnicodeTab')}
              </button>
            </div>

            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] border transition-all ${
                showHistory
                  ? 'bg-[#006B54] text-white shadow-pill-green border-emerald-600'
                  : 'bg-slate-100 hover:bg-emerald-50 hover:text-[#006B54] text-slate-700 border-slate-200'
              }`}
              title="পূর্ববর্তী রূপান্তরের ইতিহাস"
            >
              <History className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ইতিহাস' : 'History'}</span>
            </button>
          </div>
        </div>

        {/* Font Status & Custom Font Uploader Strip */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">{t('fontStatusLabel')}</span>
            <span className="bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {fontName}
            </span>

            {/* Text File Upload */}
            <button
              onClick={() => textFileInputRef.current?.click()}
              className="text-slate-600 hover:text-[#006B54] bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-medium"
            >
              <Upload className="w-3 h-3" />
              <span>{language === 'bn' ? 'ফাইল কনভার্ট (.txt)' : 'Convert File'}</span>
            </button>
            <input
              type="file"
              ref={textFileInputRef}
              onChange={handleTextFileUpload}
              accept=".txt"
              className="hidden"
            />

            {/* Custom font upload trigger */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-slate-600 hover:text-[#006B54] bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              <span>{t('uploadFontBtn')}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFontUpload}
              accept=".ttf,.otf,.woff,.woff2"
              className="hidden"
            />
          </div>

          {/* Quick Samples */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500">{t('samples')}</span>
            {samples.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(s.text)}
                className="bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200 hover:border-emerald-200 px-2 py-0.5 rounded transition-all font-medium text-xs"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {uploadStatus && (
          <div className="mt-3 p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-[1rem] text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{uploadStatus}</span>
          </div>
        )}
      </div>

      {/* History Drawer */}
      {showHistory && (
        <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-6 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-purple-600" />
              <span>{language === 'bn' ? 'সাম্প্রতিক কনভার্ট করা টেক্সট' : 'Recent Conversions History'}</span>
            </h3>
            {historyList.length > 0 && (
              <button
                onClick={() => {
                  clearHistory('bijoy');
                  setHistoryList([]);
                }}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>{language === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
              </button>
            )}
          </div>

          {historyList.length === 0 ? (
            <p className="text-xs text-slate-500 py-3 text-center">
              {language === 'bn' ? 'কোনো পূর্ববর্তী কনভার্ট রেকর্ড পাওয়া যায়নি।' : 'No saved conversion records found.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {historyList.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 hover:bg-purple-50/50 rounded-[1rem] border border-slate-300/60 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block mb-1">{item.title}</span>
                    <p className="text-xs font-semibold text-slate-900 line-clamp-2">{item.content}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-300/60/60 text-[11px]">
                    <span className="text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setOutputText(item.content)}
                        className="text-slate-900 font-bold hover:underline"
                      >
                        {language === 'bn' ? 'লোড' : 'Load'}
                      </button>
                      <button
                        onClick={() => {
                          deleteHistoryItem(item.id);
                          setHistoryList(getHistoryItems('bijoy'));
                        }}
                        className="text-slate-500 hover:text-rose-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info helper guide */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-[2rem] p-3.5 sm:p-4 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-bold text-emerald-950">
            {conversionMode === 'unicode-to-bijoy' 
              ? (language === 'bn' ? '💡 ইউনিকোড থেকে বিজয়ে রূপান্তরের পর ব্যবহার পদ্ধতি:' : '💡 How to use converted Bijoy text:')
              : (language === 'bn' ? '💡 বিজয় থেকে ইউনিকোডে রূপান্তরের সুবিধা:' : '💡 Benefits of Bijoy to Unicode conversion:')}
          </p>
          <p className="text-emerald-900/90 text-xs sm:text-sm">
            {conversionMode === 'unicode-to-bijoy'
              ? (language === 'bn' ? 'নিচের ডানপাশের আউটপুট কপি করে মাইক্রোসফট ওয়ার্ড (MS Word), ফটোশপ (Photoshop) বা ইলাস্ট্রেটরে পেস্ট করুন এবং টেক্সট সিলেক্ট করে ফন্ট হিসেবে SutonnyMJ বেছে নিন।' : 'Copy the output on the right, paste it into MS Word, Photoshop, or Illustrator, select the text, and choose SutonnyMJ font.')
              : (language === 'bn' ? 'বিজয় বা সুতন্বী ফন্টে টাইপ করা যেকোনো পুরনো টেক্সট বা ফাইল পেস্ট করলেই আধুনিক ওয়েব-সম্মত স্ট্যান্ডার্ড ইউনিকোডে রূপান্তরিত হবে।' : 'Paste any legacy text typed in SutonnyMJ/Bijoy to convert it into standard web-compatible Unicode.')}
          </p>
        </div>
      </div>

      {/* Dual Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 relative">
        {/* Swap Button for desktop & mobile */}
        <div className="flex lg:hidden justify-center my-1">
          <button
            onClick={handleSwapModes}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] bg-white text-slate-900 border border-slate-200 shadow-sm active:scale-95"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? 'দিক পরিবর্তন করুন' : 'Swap Modes'}</span>
          </button>
        </div>

        <button
          onClick={handleSwapModes}
          title="ইনপুট ও আউটপুট অদলবদল করুন"
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#006B54] border border-emerald-200 shadow-md items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
        </button>

        {/* Input Panel */}
        <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-6 shadow-sm flex flex-col justify-between focus-within:border-emerald-400 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <label htmlFor="bijoy-converter-input" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {conversionMode === 'unicode-to-bijoy' 
                  ? (language === 'bn' ? 'ইউনিকোড টেক্সট ইনপুট (Avro / Unicode)' : 'Unicode Input (Avro / Web)')
                  : (language === 'bn' ? 'বিজয় টেক্সট ইনপুট (SutonnyMJ ANSI)' : 'Bijoy Input (SutonnyMJ ANSI)')}
              </label>
              <span className="text-xs text-slate-500">
                {inputText.length} {t('characters')}
              </span>
            </div>
            <textarea
              id="bijoy-converter-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={handleInputKeyUp}
              placeholder={conversionMode === 'unicode-to-bijoy' 
                ? (language === 'bn' ? 'এখানে ইউনিকোড বাংলা টেক্সট লিখুন বা পেস্ট করুন (ফোনেটিক লিখতে পারেন)...' : 'Type or paste Bengali Unicode text here...') 
                : (language === 'bn' ? 'এখানে বিজয় টেক্সট পেস্ট করুন (যেমন: Avwg †Zvgv‡K fv‡jvevwm)...' : 'Paste Bijoy ANSI text here...')}
              rows={8}
              className={`w-full text-sm sm:text-base text-slate-900 bg-slate-50/50 p-3.5 sm:p-4 rounded-[1rem] border border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 outline-none resize-none transition-all ${
                conversionMode === 'unicode-to-bijoy' ? 'font-bangla' : 'font-mono'
              }`}
            />
          </div>
          <div className="pt-2.5 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 mt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClear}
                className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('clear')}</span>
              </button>
              
              {conversionMode === 'unicode-to-bijoy' && (
                <button 
                  onClick={() => setInputText(parsePhoneticSentence(inputText))}
                  className="text-[#FF8A3D] hover:text-[#FF9B58] transition-colors flex items-center gap-1 font-bold bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200"
                  title={language === 'bn' ? 'ইংরেজিতে লেখা বাংলিশকে বাংলায় রূপান্তর করুন' : 'Convert English phonetic text to Bengali'}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'বাংলিশ ⇄ বাংলা' : 'Phonetic ⇄ Bangla'}</span>
                </button>
              )}
            </div>
            <span className="font-mono text-[11px]">
              {conversionMode === 'unicode-to-bijoy' ? 'Input: Unicode' : 'Input: Bijoy ANSI'}
            </span>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-emerald-50/20 rounded-[2rem] border border-emerald-100 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#006B54] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {conversionMode === 'unicode-to-bijoy' 
                  ? (language === 'bn' ? 'রূপান্তরিত বিজয় আউটপুট (SutonnyMJ)' : 'Converted Bijoy Output (SutonnyMJ)')
                  : (language === 'bn' ? 'রূপান্তরিত ইউনিকোড বাংলা আউটপুট' : 'Converted Unicode Output')}
              </label>
              
              {/* View mode toggle for Bijoy output */}
              {conversionMode === 'unicode-to-bijoy' && (
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                  <button
                    onClick={() => setViewMode('font')}
                    className={`px-2 py-0.5 rounded flex items-center gap-1 font-medium transition-all ${
                      viewMode === 'font' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="সুতন্বী ফন্টে প্রদর্শন"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{t('fontPreview')}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('ansi')}
                    className={`px-2 py-0.5 rounded flex items-center gap-1 font-medium transition-all ${
                      viewMode === 'ansi' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="রিয়েল ANSI টেক্সট কোড"
                  >
                    <Code2 className="w-3 h-3" />
                    <span>{t('ansiCode')}</span>
                  </button>
                </div>
              )}
            </div>

            <textarea
              readOnly
              value={outputText}
              placeholder={language === 'bn' ? 'রূপান্তরিত ফলাফল এখানে প্রদর্শিত হবে...' : 'Converted results will appear here...'}
              rows={8}
              className={`w-full text-sm sm:text-base text-slate-900 bg-white p-3.5 sm:p-4 rounded-[1rem] border border-emerald-200 shadow-inner outline-none resize-none select-all transition-all ${
                conversionMode === 'bijoy-to-unicode' 
                  ? 'font-bangla' 
                  : (viewMode === 'font' ? 'font-sutonny' : 'font-mono')
              }`}
            />
          </div>

          {/* Action Toolbar */}
          <div className="pt-3.5 mt-3 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleDownloadDoc}
                disabled={!outputText}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-[1rem] bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006B54] border border-slate-200 disabled:opacity-40 transition-all"
                title="ওয়ার্ড ফাইল (.doc) ডাউনলোড"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">.doc</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                disabled={!outputText}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-[1rem] bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006B54] border border-slate-200 disabled:opacity-40 transition-all"
                title="ডাউনলোড .txt"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('download')}</span>
                <span className="sm:hidden">.txt</span>
              </button>

              <button
                onClick={handlePrint}
                disabled={!outputText}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-[1rem] bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006B54] border border-slate-200 disabled:opacity-40 transition-all"
                title="প্রিন্ট করুন"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              disabled={!outputText}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-[1rem] shadow-sm transition-all active:scale-95 ${
                copied
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-600 hover:bg-[#005B48] text-white disabled:opacity-40'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('copied') : t('copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
