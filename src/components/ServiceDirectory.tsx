import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Check, 
  Star, 
  Zap, 
  Share2, 
  ArrowRight, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { BANGLA_SERVICES } from '../data/banglaServicesData';
import { BanglaServiceItem, ServiceCategory, TabType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServiceDirectoryProps {
  onSelectTab: (tab: TabType) => void;
}

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({ onSelectTab }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['s-1', 's-2', 's-3', 's-4']);

  const toBnDigits = (str: string | number) => 
    String(str).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  const formatNumber = (num: number) => {
    return language === 'bn' ? toBnDigits(num) : String(num);
  };

  const categories: { id: ServiceCategory | 'all'; labelKey: string; labelBn: string; labelEn: string; count: number }[] = [
    { id: 'all', labelKey: 'allCategories', labelBn: 'সকল সেবা', labelEn: 'All Services', count: BANGLA_SERVICES.length },
    { id: 'text-typing', labelKey: 'categoryTextTyping', labelBn: 'টাইপিং ও কনভার্টার', labelEn: 'Typing & Converters', count: BANGLA_SERVICES.filter(s => s.category === 'text-typing').length },
    { id: 'language-lexicon', labelKey: 'categoryLanguageLexicon', labelBn: 'ভাষা ও অভিধান', labelEn: 'Language & Lexicon', count: BANGLA_SERVICES.filter(s => s.category === 'language-lexicon').length },
    { id: 'dates-numbers', labelKey: 'categoryDatesNumbers', labelBn: 'তারিখ ও সংখ্যা', labelEn: 'Dates & Numbers', count: BANGLA_SERVICES.filter(s => s.category === 'dates-numbers').length },
    { id: 'fonts-unicode', labelKey: 'categoryFontsUnicode', labelBn: 'ফন্ট ও ইউনিকোড', labelEn: 'Fonts & Unicode', count: BANGLA_SERVICES.filter(s => s.category === 'fonts-unicode').length },
    { id: 'audio-speech', labelKey: 'categoryAudioSpeech', labelBn: 'ভয়েস ও অডিও', labelEn: 'Audio & Speech', count: BANGLA_SERVICES.filter(s => s.category === 'audio-speech').length },
    { id: 'gov-public', labelKey: 'categoryGovPublic', labelBn: 'নাগরিক সেবা', labelEn: 'Gov & Citizen Services', count: BANGLA_SERVICES.filter(s => s.category === 'gov-public').length },
    { id: 'media-literature', labelKey: 'categoryMediaLiterature', labelBn: 'সাহিত্য ও জ্ঞানকোষ', labelEn: 'Literature & Media', count: BANGLA_SERVICES.filter(s => s.category === 'media-literature').length },
    { id: 'operator-api', labelKey: 'categoryOperatorApi', labelBn: 'এপিআই ও ডেভেলপার', labelEn: 'APIs & Developer', count: BANGLA_SERVICES.filter(s => s.category === 'operator-api').length },
    { id: 'pdf-tools', labelKey: 'categoryPdfTools', labelBn: 'পিডিএফ এডিটর', labelEn: 'PDF Editor', count: BANGLA_SERVICES.filter(s => s.category === 'pdf-tools').length },
  ];

  const filteredServices = BANGLA_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      service.name.toLowerCase().includes(q) ||
      service.nameBn.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.descriptionBn.toLowerCase().includes(q) ||
      service.url.toLowerCase().includes(q)
    );
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCopyLink = async (service: BanglaServiceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(service.url);
      setCopiedId(service.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const getInternalTab = (service: BanglaServiceItem): TabType | null => {
    if (service.internalTab) return service.internalTab;
    return null;
  };

  return (
    <section id="bangla-services-directory-container" className="space-y-4 sm:space-y-6">
      {/* Hero Showcase Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white p-6 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden mb-6">
        {/* Subtle background glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white backdrop-blur-sm text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border border-white/30">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                {t('directoryHeroBadge')}
              </span>
              <span className="text-[11px] sm:text-xs text-white/70">
                {language === 'bn' ? '৪৫+ টি প্রিমিয়াম বাংলা অনলাইন সেবা ও টুলস' : '45+ Curated Bangla Online Services & Tools'}
              </span>
            </div>
            
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              {t('directoryHeroTitle')}
            </h1>
            
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t('directoryHeroDesc')}
            </p>

            {/* Quick launch interactive chips */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] sm:text-xs text-white/70 mr-1 font-medium">
                {language === 'bn' ? 'জনপ্রিয় টুলস:' : 'Popular Tools:'}
              </span>
              {[
                { label: language === 'bn' ? 'অভ্র ফোনেটিক' : 'Avro Phonetic', tab: 'phonetic' as TabType },
                { label: language === 'bn' ? 'বিজয় ⇄ ইউনিকোড' : 'Bijoy ⇄ Unicode', tab: 'bijoy-unicode' as TabType },
                { label: language === 'bn' ? 'বঙ্গাব্দ পঞ্জিকা' : 'Bengali Calendar', tab: 'calendar' as TabType },
                { label: language === 'bn' ? 'কথায় সংখ্যা (টাকা)' : 'Number to Words', tab: 'number-words' as TabType },
                { label: language === 'bn' ? 'বানান ও অভিধান' : 'Spell & Lexicon', tab: 'spell-dict' as TabType },
              ].map(chip => (
                <button
                  key={chip.tab}
                  onClick={() => onSelectTab(chip.tab)}
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white/90 hover:text-slate-900 dark:text-white dark:hover:text-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 transition-all flex items-center gap-1 hover:scale-105 active:scale-95"
                >
                  <Zap className="w-3 h-3 text-purple-400" />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border-white/20 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20 text-center min-w-[120px] sm:min-w-[140px] shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans-ui leading-none">
                {formatNumber(BANGLA_SERVICES.length)}+
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 mt-1 font-medium">
                {language === 'bn' ? 'তালিকাভুক্ত সেবা' : 'Listed Services'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border-white/20 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20 text-center min-w-[120px] sm:min-w-[140px] shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans-ui leading-none">
                {language === 'bn' ? '১০০%' : '100%'}
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 mt-1 font-medium">
                {language === 'bn' ? 'ফ্রি ও ওপেন অ্যাক্সেস' : 'Free & Open Access'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-300/60 shadow-xs space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              id="directory-service-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchServicePlaceholder')}
              className="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 text-xs sm:text-sm border border-slate-300/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-600 dark:text-slate-400 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium px-1 flex items-center justify-between sm:justify-end gap-2">
            <span>{language === 'bn' ? 'মোট ফলাফল:' : 'Total Results:'}</span>
            <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-md border border-purple-200">
              {formatNumber(filteredServices.length)} {language === 'bn' ? 'টি' : 'items'}
            </span>
          </div>
        </div>

        {/* Category Pills (Touch friendly horizontal scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const label = language === 'bn' ? cat.labelBn : cat.labelEn;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 dark:text-white shadow-sm scale-102'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-white border border-white/20'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-600 dark:text-slate-400'
                }`}>
                  {formatNumber(cat.count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service Cards Grid - Responsive from mobile 1-col to tablet 2-col and desktop 3-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {filteredServices.map((service) => {
          const internalTab = getInternalTab(service);
          const isFavorited = favorites.includes(service.id);
          const isCopied = copiedId === service.id;
          const name = language === 'bn' ? service.nameBn : service.name;
          const subName = language === 'bn' ? service.name : service.nameBn;
          const description = language === 'bn' 
            ? (service.descriptionBn || service.description)
            : (service.description || service.descriptionBn);

          return (
            <article
              key={service.id}
              id={`service-card-${service.id}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:-translate-y-1 p-5 sm:p-6 shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/80">
                      {service.category}
                    </span>
                    {(!service.isExternal || service.popular) && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-600" />
                        {language === 'bn' ? 'লাইভ টুল' : 'Live Tool'}
                      </span>
                    )}
                  </div>

                  {/* Favorite & Copy Button */}
                  <div className="flex items-center gap-1 text-slate-500">
                    <button
                      onClick={(e) => handleCopyLink(service, e)}
                      title={language === 'bn' ? 'লিঙ্ক কপি করুন' : 'Copy link'}
                      className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-purple-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={(e) => toggleFavorite(service.id, e)}
                      title={isFavorited ? (language === 'bn' ? 'পছন্দ তালিকা থেকে সরান' : 'Remove favorite') : (language === 'bn' ? 'পছন্দ তালিকায় রাখুন' : 'Add favorite')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFavorited ? 'text-amber-500 hover:text-amber-600' : 'hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-700 transition-colors flex items-center gap-1.5 flex-wrap">
                  <span>{name}</span>
                  <span className="text-xs text-slate-500 font-normal">({subName})</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                  {description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3.5 mt-3.5 border-t border-slate-200/60 flex items-center justify-between gap-2">
                {internalTab ? (
                  <button
                    onClick={() => onSelectTab(internalTab)}
                    className="flex-1 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs sm:text-sm py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                    <span>{t('launchInternalTool')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-slate-900 dark:text-white font-medium text-xs sm:text-sm py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>{t('visitExternalWebsite')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-300/60 p-8 sm:p-12 text-center">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">{t('noServicesFound')}</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {t('noServicesFoundDesc')}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700 transition-all"
          >
            {t('resetSearch')}
          </button>
        </div>
      )}
    </section>
  );
};
