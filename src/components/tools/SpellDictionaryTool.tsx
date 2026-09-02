import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Sparkles, 
  ArrowRight, 
  RotateCcw
} from 'lucide-react';
import { BANGLA_DICTIONARY, checkBanglaSpelling } from '../../utils/dictionaryAndSpell';
import { useLanguage } from '../../context/LanguageContext';

export const SpellDictionaryTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [spellInput, setSpellInput] = useState<string>(
    'সম্মেলনে আপনাকে আন্তরিক স্বাগতম। দেশের এই দূরাবস্থা দেখে শহিদ মুক্তিযোদ্ধাদের কথা মনে পড়ছে। গীতাঞ্জলী একটি অমর সৃষ্টি।'
  );
  const [dictQuery, setDictQuery] = useState<string>('');

  const spellResult = checkBanglaSpelling(spellInput);

  const applyCorrection = (wrongWord: string, suggestedWord: string) => {
    setSpellInput(prev => prev.replace(new RegExp(wrongWord, 'g'), suggestedWord));
  };

  const applyAllCorrections = () => {
    let corrected = spellInput;
    spellResult.mistakes.forEach(m => {
      corrected = corrected.replace(new RegExp(m.wrongWord, 'g'), m.suggestedWord);
    });
    setSpellInput(corrected);
  };

  const filteredDict = BANGLA_DICTIONARY.filter(item => {
    if (!dictQuery) return true;
    const q = dictQuery.toLowerCase().trim();
    return (
      item.word.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.synonyms.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <section id="bangla-spell-dictionary-container" className="space-y-4 sm:space-y-6">
      {/* 1. Live Spell Checker Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-3.5 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-xs shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t('spellDictTitle')}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  {language === 'bn' ? 'একাডেমি প্রমিত' : 'Academy Standard'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('spellDictSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {spellResult.hasMistakes && (
              <button
                onClick={applyAllCorrections}
                className="flex items-center gap-1.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>{language === 'bn' ? 'সব ভুল শুদ্ধ করুন' : 'Fix All Mistakes'}</span>
              </button>
            )}
            <button
              onClick={() => setSpellInput('')}
              className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-slate-300/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('clear')}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="spell-text-input" className="font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            {language === 'bn' ? 'বানান পরীক্ষা করতে বাক্য বা অনুচ্ছেদ লিখুন:' : 'Enter sentence or paragraph to check spelling:'}
          </label>
          <textarea
            id="spell-text-input"
            value={spellInput}
            onChange={(e) => setSpellInput(e.target.value)}
            rows={4}
            className="w-full bg-slate-50 text-slate-900 border border-slate-300/60 focus:border-slate-900 focus:bg-white rounded-xl p-3.5 sm:p-4 text-sm sm:text-base leading-relaxed font-bangla outline-none focus:ring-2 focus:ring-slate-900/10 transition-all resize-y"
          />
        </div>

        {/* Spell Check Results */}
        {spellResult.hasMistakes ? (
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-amber-900 font-bold text-xs sm:text-sm gap-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {language === 'bn' 
                    ? `${spellResult.mistakes.length}টি সম্ভাব্য বানান অসঙ্গতি সনাক্ত হয়েছে:`
                    : `${spellResult.mistakes.length} possible spelling inconsistencies detected:`}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-amber-700 font-medium">{language === 'bn' ? 'ক্লিক করে প্রতিস্থাপন করুন' : 'Click to replace in text'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
              {spellResult.mistakes.map((m, idx) => (
                <div key={idx} className="bg-white p-3 sm:p-3.5 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="line-through text-rose-600 font-bold text-sm sm:text-base font-bangla truncate">{m.wrongWord}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-slate-900 font-bold text-sm sm:text-base font-bangla truncate">{m.suggestedWord}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500">{m.rule}</p>
                  </div>

                  <button
                    onClick={() => applyCorrection(m.wrongWord, m.suggestedWord)}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg border border-purple-200 transition-all whitespace-nowrap shrink-0"
                  >
                    {language === 'bn' ? 'শুদ্ধ করুন' : 'Replace'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-purple-800 font-semibold text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
            <span>{language === 'bn' ? 'কোনো সাধারণ বানান ভুল পাওয়া যায়নি। লেখাটি প্রমিত নিয়মানুযায়ী সঠিক।' : 'No common spelling errors found. Text conforms to standard spelling rules.'}</span>
          </div>
        )}
      </div>

      {/* 2. Dictionary & Thesaurus Lookup */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-3.5 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-xs shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'bn' ? 'বাংলা একাডেমি প্রমিত শব্দকোষ ও সমার্থক শব্দ' : 'Bengali Lexicon & Thesaurus'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {language === 'bn' ? 'অর্থ, ব্যুৎপত্তি, পদ পরিচয়, সমার্থক শব্দ ও বাক্যে প্রয়োগের দৃষ্টান্ত।' : 'Definitions, parts of speech, synonyms and usage examples.'}
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={dictQuery}
              onChange={(e) => setDictQuery(e.target.value)}
              placeholder={language === 'bn' ? 'অভিধানে শব্দ খুঁজুন...' : 'Search lexicon...'}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300/60 rounded-xl outline-none focus:border-slate-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Dictionary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredDict.map((item, idx) => (
            <div key={idx} className="bg-slate-50/70 p-3.5 sm:p-4 rounded-2xl border border-slate-300/60 hover:border-purple-300 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-bangla">{item.wordBn || item.word}</h3>
                  <span className="text-[11px] sm:text-xs bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-md">
                    {item.posBn || item.pos}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono-code">{item.word}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-bangla">
                <span className="font-bold text-slate-900">{language === 'bn' ? 'অর্থ: ' : 'Meaning: '}</span>{item.meaningBn || item.meaning}
              </p>

              {item.synonyms && item.synonyms.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'সমার্থক:' : 'Synonyms:'}</span>
                  {item.synonyms.map((syn, sIdx) => (
                    <span key={sIdx} className="text-xs bg-white text-purple-800 border border-purple-200 px-2 py-0.5 rounded-md font-bangla">
                      {syn}
                    </span>
                  ))}
                </div>
              )}

              {item.exampleSentence && (
                <div className="text-xs text-slate-500 italic pt-1 border-t border-slate-300/60/60 font-bangla">
                  "{item.exampleSentence}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
