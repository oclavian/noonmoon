import React, { useState, useEffect, useRef } from 'react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Download, 
  Keyboard, 
  Sparkles, 
  HelpCircle, 
  Search, 
  Mic, 
  MicOff, 
  Upload, 
  Printer, 
  History, 
  Trash2,
  FileText
} from 'lucide-react';
import { parsePhoneticSentence } from '../../utils/phoneticConverter';
import { useLanguage } from '../../context/LanguageContext';
import { BanglaSpeechRecognizer, isSpeechRecognitionSupported } from '../../utils/speechToText';
import { downloadAsDoc, downloadAsTxt, printFormattedText } from '../../utils/documentExport';
import { getHistoryItems, saveHistoryItem, deleteHistoryItem, clearHistory, HistoryItem } from '../../utils/historyStorage';

export const PhoneticTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [englishInput, setEnglishInput] = useState<string>('ami banglay gan gai, ami banglar gan gai');
  const [banglaOutput, setBanglaOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceStatus, setVoiceStatus] = useState<string>('');
  const [cheatFilter, setCheatFilter] = useState<string>('');
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognizerRef = useRef<BanglaSpeechRecognizer | null>(null);

  const toBnDigits = (str: string | number) => 
    String(str).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  const formatNum = (num: number) => language === 'bn' ? toBnDigits(num) : String(num);

  useEffect(() => {
    setBanglaOutput(parsePhoneticSentence(englishInput));
  }, [englishInput]);

  useEffect(() => {
    setHistoryList(getHistoryItems('phonetic'));
  }, [showHistory]);

  // Initialize Speech Recognizer
  useEffect(() => {
    if (isSpeechRecognitionSupported()) {
      recognizerRef.current = new BanglaSpeechRecognizer({
        lang: 'bn-BD',
        continuous: true,
        interimResults: true,
        onStart: () => {
          setIsListening(true);
          setVoiceStatus(language === 'bn' ? '🎙️ শুনছি... পরিষ্কার বাংলায় কথা বলুন' : '🎙️ Listening... Speak clearly in Bengali');
        },
        onResult: (transcript, isFinal) => {
          if (isFinal) {
            setBanglaOutput((prev) => (prev ? prev + ' ' + transcript : transcript));
            setVoiceStatus(language === 'bn' ? 'সফলভাবে রূপান্তর হয়েছে' : 'Transcribed successfully');
          }
        },
        onError: (err) => {
          setIsListening(false);
          setVoiceStatus(`ত্রুটি: ${err}`);
        },
        onEnd: () => {
          setIsListening(false);
        },
      });
    }

    return () => {
      recognizerRef.current?.stop();
    };
  }, [language]);

  const toggleVoiceTyping = () => {
    if (!recognizerRef.current) {
      alert(language === 'bn' ? 'আপনার ব্রাউজারে ভয়েস টাইপিং সমর্থিত নয়। ক্রোম বা এজ ব্যবহার করুন।' : 'Speech recognition not supported in this browser.');
      return;
    }
    if (isListening) {
      recognizerRef.current.stop();
      setIsListening(false);
      setVoiceStatus('');
    } else {
      recognizerRef.current.start();
    }
  };

  const handleCopy = async () => {
    if (!banglaOutput) return;
    try {
      await navigator.clipboard.writeText(banglaOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Save to recent history
      saveHistoryItem({
        tool: 'phonetic',
        title: banglaOutput.substring(0, 30) + '...',
        content: banglaOutput,
        preview: englishInput.substring(0, 40) + '...',
      });
      setHistoryList(getHistoryItems('phonetic'));
    } catch {
      // fallback
    }
  };

  const handleClear = () => {
    setEnglishInput('');
    setBanglaOutput('');
    setVoiceStatus('');
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    }
    textareaRef.current?.focus();
  };

  const handleDownloadTxt = () => {
    downloadAsTxt(banglaOutput, `bangla-phonetic-${Date.now()}.txt`);
  };

  const handleDownloadDoc = () => {
    downloadAsDoc(
      'অভ্র ফোনেটিক টেক্সট',
      `<p>${banglaOutput.replace(/\n/g, '<br/>')}</p>`,
      `bangla-phonetic-${Date.now()}.doc`
    );
  };

  const handlePrint = () => {
    printFormattedText('বাংলা ফোনেটিক ড্রাফট', `<p>${banglaOutput.replace(/\n/g, '<br/>')}</p>`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setEnglishInput(content);
      }
    };
    reader.readAsText(file);
  };

  const handleSpeak = () => {
    if (!banglaOutput || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(banglaOutput);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const quickSamples = [
    { label: language === 'bn' ? 'সোনার বাংলা' : 'Sonar Bangla', text: 'amar shonar bangla ami tomay bhalobashi' },
    { label: language === 'bn' ? 'মাতৃভাষা' : 'Mother Tongue', text: 'bangla amader priyo matrivasha' },
    { label: language === 'bn' ? 'স্বাগতম' : 'Welcome', text: 'apnake ontorik dhonnobad o shagotom' },
    { label: language === 'bn' ? 'শুভ সকাল' : 'Good Morning', text: 'shuvo shokal, apnar din-ti shundor katuk' },
  ];

  const cheatRules = [
    { key: 'a, aa', bn: 'অ, আ (া)', ex: 'ami -> আমি' },
    { key: 'i, ee', bn: 'ই, ঈ (ি, ী)', ex: 'kichu -> কিছু' },
    { key: 'u, oo', bn: 'উ, ঊ (ু, ূ)', ex: 'tumi -> তুমি' },
    { key: 'e, oi', bn: 'এ, ঐ (ে, ৈ)', ex: 'desh -> দেশ' },
    { key: 'o, ou', bn: 'ও, ঔ (ো, ৌ)', ex: 'koushol -> কৌশল' },
    { key: 'k, kh, g, gh', bn: 'ক, খ, গ, ঘ', ex: 'khobor -> খবর' },
    { key: 'c, ch, j, jh', bn: 'চ, ছ, জ, ঝ', ex: 'chokh -> চোখ' },
    { key: 'T, Th, D, Dh', bn: 'ট, ঠ, ড, ঢ', ex: 'Taka -> টাকা' },
    { key: 't, th, d, dh', bn: 'ত, থ, দ, ধ', ex: 'dhonno -> ধন্য' },
    { key: 'p, f/ph, b, bh, m', bn: 'প, ফ, ব, ভ, ম', ex: 'bhalo -> ভালো' },
    { key: 'sh, Sh, s, h', bn: 'শ, ষ, স, হ', ex: 'shonar -> সোনার' },
    { key: 'kkh, ggh, cch, jjh', bn: 'ক্ষ, জ্ঞ, চ্ছ, জ্জ্ব', ex: 'shikkha -> শিক্ষা' },
  ];

  const filteredCheatRules = cheatRules.filter(
    r => !cheatFilter || r.key.toLowerCase().includes(cheatFilter.toLowerCase()) || r.bn.includes(cheatFilter) || r.ex.includes(cheatFilter)
  );

  const wordCount = banglaOutput.trim() ? banglaOutput.trim().split(/\s+/).length : 0;
  const charCount = banglaOutput.length;

  return (
    <section id="phonetic-typing-tool-container" className="space-y-4 sm:space-y-6">
      {/* Tool Header Card */}
      <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[1rem] bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-sm shrink-0">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('phoneticTitle')}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  {language === 'bn' ? 'রিয়েল-টাইম + ভয়েস টাইপিং' : 'Real-time & Voice'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('phoneticSubtitle')}
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Voice Typing Button */}
            <button
              onClick={toggleVoiceTyping}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[1rem] border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse shadow-sm'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-300'
              }`}
              title="কথা বলে বাংলায় টাইপ করুন"
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isListening ? (language === 'bn' ? 'শুনছি...' : 'Listening...') : (language === 'bn' ? 'ভয়েস টাইপিং' : 'Voice Typing')}</span>
            </button>

            {/* File Upload Trigger */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/60 transition-all"
              title="টেক্সট ফাইল আপলোড করুন"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ফাইল আপলোড' : 'Upload .txt'}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt"
              className="hidden"
            />

            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] border transition-all ${
                showHistory
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/60'
              }`}
              title="পূর্ববর্তী ড্রাফট ইতিহাস"
            >
              <History className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ইতিহাস' : 'History'}</span>
            </button>

            {/* Cheat Sheet Toggle */}
            <button
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] border transition-all ${
                showCheatSheet
                  ? 'bg-slate-900 text-white border-purple-600 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showCheatSheet ? (language === 'bn' ? 'গাইড লুকান' : 'Hide Guide') : (language === 'bn' ? 'চিটশিট' : 'Guide')}</span>
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-600 border border-slate-300/60 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('clear')}</span>
            </button>
          </div>
        </div>

        {/* Voice status banner */}
        {voiceStatus && (
          <div className="mt-3 p-2.5 bg-purple-50 text-purple-800 border border-purple-200 rounded-[1rem] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span>{voiceStatus}</span>
          </div>
        )}

        {/* Quick Sample Prompts */}
        <div className="pt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs text-slate-500 font-medium">{t('samples')}</span>
          {quickSamples.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setEnglishInput(sample.text)}
              className="text-xs bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-800 border border-slate-300/60 hover:border-purple-300 px-2.5 py-1 rounded-lg transition-all"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Drawer */}
      {showHistory && (
        <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-6 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-purple-600" />
              <span>{language === 'bn' ? 'সাম্প্রতিক ড্রাফট ও রূপান্তরের ইতিহাস' : 'Recent Draft History'}</span>
            </h3>
            {historyList.length > 0 && (
              <button
                onClick={() => {
                  clearHistory('phonetic');
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
              {language === 'bn' ? 'কোনো পূর্ববর্তী ড্রাফট পাওয়া যায়নি। কপি করলে স্বয়ংক্রিয়ভাবে সেভ হবে।' : 'No saved history found yet.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {historyList.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 hover:bg-purple-50/50 rounded-[1rem] border border-slate-300/60 flex flex-col justify-between space-y-2">
                  <div className="font-bangla text-xs font-semibold text-slate-900 line-clamp-2">
                    {item.content}
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-300/60/60 text-[11px]">
                    <span className="text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBanglaOutput(item.content)}
                        className="text-slate-900 font-bold hover:underline"
                      >
                        {language === 'bn' ? 'লোড করুন' : 'Load'}
                      </button>
                      <button
                        onClick={() => {
                          deleteHistoryItem(item.id);
                          setHistoryList(getHistoryItems('phonetic'));
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

      {/* Dual Pane Interactive Typing Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* English Phonetic Input Panel */}
        <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-6 flex flex-col justify-between focus-within:border-slate-900 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <label htmlFor="phonetic-english-input" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {t('phoneticInputLabel')}
              </label>
              <span className="text-xs text-slate-500">
                {formatNum(englishInput.length)} {t('characters')}
              </span>
            </div>
            <textarea
              id="phonetic-english-input"
              ref={textareaRef}
              value={englishInput}
              onChange={(e) => setEnglishInput(e.target.value)}
              placeholder={language === 'bn' ? 'এখানে ইংরেজিতে টাইপ করুন (যেমন: ami banglay gan gai)...' : 'Type in English phonetics here (e.g. ami banglay gan gai)...'}
              rows={7}
              className="w-full text-sm sm:text-base font-mono-code text-slate-900 bg-slate-50/50 p-3.5 sm:p-4 rounded-[1rem] border border-slate-300/60/80 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 outline-none resize-none transition-all"
            />
          </div>
          <div className="pt-2.5 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200/60 mt-2">
            <span>{language === 'bn' ? '💡 টিপস: যুক্তাক্ষরের জন্য kkh, ggh, sh, T (ক্যাপিটাল) ব্যবহার করুন' : '💡 Tip: Use kkh, ggh, sh, capital T for conjuncts'}</span>
          </div>
        </div>

        {/* Bengali Output Panel */}
        <div className="bg-slate-50/50 rounded-[2rem] border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col justify-between bg-gradient-to-b from-purple-50/30 to-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                {t('phoneticOutputLabel')}
              </label>
              <div className="flex items-center gap-2.5 text-xs text-slate-900 font-medium">
                <span>{formatNum(wordCount)} {t('words')}</span>
                <span>•</span>
                <span>{formatNum(charCount)} {t('characters')}</span>
              </div>
            </div>
            <div className="w-full min-h-[160px] sm:min-h-[190px] text-base sm:text-xl font-bangla font-medium text-slate-900 bg-white p-3.5 sm:p-4 rounded-[1rem] border border-purple-200/80 shadow-inner leading-relaxed select-all">
              {banglaOutput || (
                <span className="text-slate-300 font-normal italic text-sm sm:text-base">
                  {language === 'bn' ? 'বামপাশে টাইপ করলেই এখানে বাংলা রূপান্তর দেখা যাবে...' : 'Realtime Bengali rendering will appear here as you type...'}
                </span>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="pt-3.5 mt-3 border-t border-purple-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleSpeak}
                disabled={!banglaOutput}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-[1rem] transition-all ${
                  isSpeaking
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-purple-100/80 hover:bg-purple-200 text-purple-800 disabled:opacity-40'
                }`}
                title="উচ্চারণ শুনুন"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? (language === 'bn' ? 'থামান' : 'Stop') : (language === 'bn' ? 'শুনুন' : 'Listen')}</span>
              </button>

              <button
                onClick={handleDownloadDoc}
                disabled={!banglaOutput}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-[1rem] bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 disabled:opacity-40 transition-all"
                title="ওয়ার্ড ফাইল (.doc) ডাউনলোড"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">.doc</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                disabled={!banglaOutput}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-[1rem] bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-all"
                title="টেক্সট ফাইল ডাউনলোড"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('download')}</span>
                <span className="sm:hidden">.txt</span>
              </button>

              <button
                onClick={handlePrint}
                disabled={!banglaOutput}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-[1rem] bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-all"
                title="প্রিন্ট করুন"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              disabled={!banglaOutput}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-[1rem] shadow-sm transition-all active:scale-95 ${
                copied
                  ? 'bg-purple-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800:bg-slate-200 text-white disabled:opacity-40'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('copied') : t('copy')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Phonetic Cheat Sheet Drawer */}
      {showCheatSheet && (
        <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                {t('phoneticRuleRef')}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn' ? 'কী প্রেস করার নিয়ম এবং উদাহরণ সহ দ্রুত রেফারেন্স তালিকা' : 'Quick reference keystroke combinations with Bengali letters and examples'}
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={cheatFilter}
                onChange={(e) => setCheatFilter(e.target.value)}
                placeholder={language === 'bn' ? 'চিটশিটে খুঁজুন...' : 'Search guide...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300/60 rounded-lg outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {filteredCheatRules.map((rule, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 sm:p-3 rounded-[1rem] border border-slate-300/60/80 space-y-1 hover:border-purple-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code font-bold text-slate-900 text-xs bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                    {rule.key}
                  </span>
                  <span className="font-bangla font-bold text-slate-900 text-sm">
                    {rule.bn}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono-code">
                  {rule.ex}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
