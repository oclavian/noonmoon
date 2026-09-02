import { Language } from '../context/LanguageContext';

export interface TranslationDictionary {
  [key: string]: {
    bn: string;
    en: string;
  };
}

export const translations: TranslationDictionary = {
  // Brand
  brandName: {
    bn: 'নুন-মুন',
    en: 'Noon-Moon',
  },
  brandEnglishSubtitle: {
    bn: 'Noon-Moon',
    en: 'Bengali Tools Hub',
  },
  brandBadge: {
    bn: 'স্মার্ট বাংলা হাব',
    en: 'Smart Bengali Hub',
  },
  brandTagline: {
    bn: 'বাংলা ভাষার ডিজিটাল টুলস, কিবোর্ড কনভার্টার ও সেবা সম্ভার',
    en: 'Comprehensive Suite of Bengali Digital Tools, Converters & Services',
  },
  footerDescription: {
    bn: 'বাংলা ভাষার সর্বাধিক ব্যবহৃত অনলাইন সেবা, ফন্ট রূপান্তর, অভ্র ফোনেটিক টাইপিং ও টোকেনাইজড ডিজাইন সিস্টেম প্ল্যাটফর্ম।',
    en: 'The most comprehensive platform for Bengali typing, font conversion, calendar tools, dictionary, and digital language services.',
  },
  footerCopyright: {
    bn: 'নুন-মুন (Noon-Moon) • মাতৃভাষায় ডিজিটাল উৎকর্ষ সাধন',
    en: 'Noon-Moon • Advancing Digital Bengali Excellence',
  },
  footerTag: {
    bn: 'বাংলা ভাষার ডিজিটাল টুলস ও সার্বিক সেবা প্ল্যাটফর্ম',
    en: 'Universal Digital Bengali Tools & Online Services Platform',
  },
  wcagVerified: {
    bn: 'WCAG 2.2 AA ভেরিফাইড',
    en: 'WCAG 2.2 AA Verified',
  },

  // Nav Tabs
  navDirectory: {
    bn: 'সকল সেবা (৪৫+)',
    en: 'All Services (45+)',
  },
  navPhonetic: {
    bn: 'অভ্র ফোনেটিক',
    en: 'Avro Phonetic',
  },
  navBijoyUnicode: {
    bn: 'বিজয় কনভার্টার',
    en: 'Bijoy Converter',
  },
  navCalendar: {
    bn: 'বঙ্গাব্দ ও পঞ্জিকা',
    en: 'Bengali Calendar',
  },
  navAgeCalculator: {
    bn: 'বাংলা বয়স গণক',
    en: 'Age & Date Calculator',
  },
  navTemplates: {
    bn: 'আবেদন ও ফরম',
    en: 'Bangla Templates',
  },
  navNumberWords: {
    bn: 'কথায় রূপান্তর',
    en: 'Number to Words',
  },
  navAnalyzer: {
    bn: 'টেক্সট অ্যানালাইজার',
    en: 'Text Analyzer',
  },
  navSpellDict: {
    bn: 'বানান ও অভিধান',
    en: 'Spelling & Dictionary',
  },
  navFonts: {
    bn: 'ফন্ট স্পেসিমেন',
    en: 'Typography Spec',
  },
  navDesignSystem: {
    bn: 'ডিজাইন টোকেন',
    en: 'Design Tokens',
  },
  navQaChecklist: {
    bn: 'চেকলিস্ট',
    en: 'QA Checklist',
  },

  // Header Actions
  searchPlaceholder: {
    bn: 'সেবা খুঁজুন...',
    en: 'Search services...',
  },
  tokenBtn: {
    bn: 'টোকেন',
    en: 'Tokens',
  },
  langToggle: {
    bn: 'English',
    en: 'বাংলা',
  },
  switchLangTip: {
    bn: 'ইংরেজিতে দেখুন',
    en: 'Switch to Bengali',
  },
  am: {
    bn: 'পূর্বাহ্ন',
    en: 'AM',
  },
  pm: {
    bn: 'অপরাহ্ন',
    en: 'PM',
  },
  banglaEra: {
    bn: 'বঙ্গাব্দ',
    en: 'BS',
  },

  // Common Actions
  copy: {
    bn: 'কপি করুন',
    en: 'Copy',
  },
  copied: {
    bn: 'কপি হয়েছে!',
    en: 'Copied!',
  },
  clear: {
    bn: 'মুছে ফেলুন',
    en: 'Clear',
  },
  download: {
    bn: 'ডাউনলোড (.txt)',
    en: 'Download (.txt)',
  },
  close: {
    bn: 'বন্ধ করুন',
    en: 'Close',
  },
  input: {
    bn: 'ইনপুট',
    en: 'Input',
  },
  output: {
    bn: 'ফলাফল',
    en: 'Output',
  },
  characters: {
    bn: 'অক্ষর',
    en: 'Characters',
  },
  words: {
    bn: 'শব্দ',
    en: 'Words',
  },
  samples: {
    bn: 'নমুনা টেক্সট:',
    en: 'Quick Samples:',
  },

  // Service Directory
  directoryHeroBadge: {
    bn: 'বাংলা অনলাইন সার্ভিস হাব',
    en: 'Bangla Online Services Hub',
  },
  directoryHeroCount: {
    bn: '৪৫+ টি প্রিমিয়াম বাংলা অনলাইন সেবা ও টুলস',
    en: '45+ Curated Bangla Online Services & Tools',
  },
  directoryHeroTitle: {
    bn: 'বাংলা ভাষার সকল ডিজিটাল সেবা ও প্রয়োজনীয় টুলস এক ছাদের নিচে',
    en: 'All Bengali Digital Services & Essential Tools Under One Roof',
  },
  directoryHeroDesc: {
    bn: 'কিবোর্ড রূপান্তর, ফন্ট কনভার্টার, বাংলা পঞ্জিকা, ব্যাকরণ, সরকারি সেবা ও ডেভেলপার এপিআই সমৃদ্ধ আধুনিক ডিরেক্টরি।',
    en: 'Explore modern typing converters, Bengali calendar, grammar, public services, dictionaries, and developer APIs.',
  },
  searchServicePlaceholder: {
    bn: 'যেকোনো সেবা বা টুলস খুঁজুন (যেমন: অভ্র, বিজয়, ক্যালেন্ডার, সরকারি সেবা)...',
    en: 'Search any service or tool (e.g. Avro, Bijoy, Calendar, Gov portal)...',
  },
  allCategories: {
    bn: 'সকল ক্যাটাগরি',
    en: 'All Categories',
  },
  categoryTextTyping: {
    bn: 'টাইপিং ও কনভার্টার',
    en: 'Typing & Converters',
  },
  categoryLanguageLexicon: {
    bn: 'ভাষা, অভিধান ও ব্যাকরণ',
    en: 'Language & Lexicon',
  },
  categoryDatesNumbers: {
    bn: 'তারিখ, সময় ও সংখ্যা',
    en: 'Dates & Numerals',
  },
  categoryFontsUnicode: {
    bn: 'ফন্ট ও টাইপোগ্রাফি',
    en: 'Fonts & Typography',
  },
  categoryAudioSpeech: {
    bn: 'ভয়েস ও অডিও সেবা',
    en: 'Voice & Speech',
  },
  categoryGovPublic: {
    bn: 'সরকারি ও নাগরিক সেবা',
    en: 'Gov & Public Services',
  },
  categoryMediaLiterature: {
    bn: 'সাহিত্য ও সংবাদ মাধ্যম',
    en: 'Literature & Media',
  },
  categoryOperatorApi: {
    bn: 'ডেভেলপার টুলস ও এপিআই',
    en: 'Developer Tools & API',
  },
  launchInternalTool: {
    bn: 'টুল ব্যবহার করুন',
    en: 'Open Tool',
  },
  visitExternalWebsite: {
    bn: 'ওয়েবসাইট ভিজিট করুন',
    en: 'Visit Website',
  },
  noServicesFound: {
    bn: 'কোনো সেবা পাওয়া যায়নি',
    en: 'No services found',
  },
  noServicesFoundDesc: {
    bn: 'অন্য কোনো কি-ওয়ার্ড দিয়ে অনুসন্ধান করুন অথবা ক্যাটাগরি পরিবর্তন করুন।',
    en: 'Try searching with a different keyword or change category filter.',
  },
  resetSearch: {
    bn: 'অনুসন্ধান রিসেট করুন',
    en: 'Reset Search',
  },
  featuredBadge: {
    bn: 'জনপ্রিয়',
    en: 'Popular',
  },
  officialBadge: {
    bn: 'অফিসিয়াল',
    en: 'Official',
  },

  // Phonetic Tool
  phoneticTitle: {
    bn: 'অভ্র ফোনেটিক বাংলা টাইপিং ইঞ্জিন (English ➔ বাংলা)',
    en: 'Avro Phonetic Bengali Typing Engine (English ➔ Bangla)',
  },
  phoneticSubtitle: {
    bn: 'ইংরেজি হরফে টাইপ করুন (যেমন: "ami banglay gan gai"), সাথে সাথে বাংলায় রূপান্তরিত হবে।',
    en: 'Type Romanized phonetics (e.g. "ami banglay gan gai") to instantly render Bengali script.',
  },
  phoneticInputLabel: {
    bn: 'ইংরেজি ফোনেটিক ইনপুট (Romanized)',
    en: 'Romanized English Input',
  },
  phoneticOutputLabel: {
    bn: 'স্বয়ংক্রিয় বাংলা ফলাফল (Unicode)',
    en: 'Realtime Bengali Output (Unicode)',
  },
  phoneticRuleRef: {
    bn: 'ফোনেটিক নিয়মাবলী নির্দেশিকা',
    en: 'Phonetic Keystroke Guide',
  },
  autoCopyLabel: {
    bn: 'টাইপ করার পর সরাসরি কপি করুন বা ডাউনলোড করুন',
    en: 'Copy or download your converted text instantly',
  },

  // Bijoy Unicode Tool
  bijoyToolTitle: {
    bn: 'বিজয় ⇄ ইউনিকোড দ্বিমুখী রূপান্তরক (SutonnyMJ)',
    en: 'Bijoy ⇄ Unicode Bidirectional Converter (SutonnyMJ)',
  },
  bijoyToolSubtitle: {
    bn: 'বিজয় (SutonnyMJ ANSI) থেকে প্রমিত ইউনিকোড এবং ইউনিকোড থেকে বিজয়ে নির্ভুল রূপান্তর।',
    en: '100% accurate conversion between legacy SutonnyMJ ANSI and modern Web Unicode.',
  },
  unicodeToBijoyTab: {
    bn: 'ইউনিকোড ➔ বিজয় (SutonnyMJ)',
    en: 'Unicode ➔ Bijoy (SutonnyMJ)',
  },
  bijoyToUnicodeTab: {
    bn: 'বিজয় ➔ ইউনিকোড',
    en: 'Bijoy ➔ Unicode',
  },
  fontStatusLabel: {
    bn: 'বিজয় ফন্ট:',
    en: 'Bijoy Font:',
  },
  uploadFontBtn: {
    bn: 'ফন্ট ফাইল দিন (.ttf)',
    en: 'Upload Font (.ttf)',
  },
  fontPreview: {
    bn: 'ফন্ট প্রিভিউ',
    en: 'Font Preview',
  },
  ansiCode: {
    bn: 'ANSI কোড',
    en: 'ANSI Code',
  },
  bijoyHelperNotice: {
    bn: '💡 ইউনিকোড থেকে বিজয়ে রূপান্তরের পর ফলাফল কপি করে MS Word বা Photoshop-এ পেস্ট করুন এবং টেক্সট সিলেক্ট করে ফন্ট হিসেবে SutonnyMJ বেছে নিন।',
    en: '💡 After converting Unicode to Bijoy, copy the ANSI code, paste into MS Word/Photoshop, and set font to SutonnyMJ.',
  },

  // Bengali Calendar Tool
  calendarTitle: {
    bn: 'বঙ্গাব্দ ক্যালেন্ডার ও বাংলা পঞ্জিকা',
    en: 'Bengali San Calendar & Panjika',
  },
  calendarSubtitle: {
    bn: 'বাংলা একাডেমি প্রমিত সংশোধিত পঞ্জিকা অনুযায়ী ইংরেজি থেকে বাংলা সন, মাস, ঋতু ও তিথি নির্ণয়।',
    en: 'Convert Gregorian dates to official revised Bengali calendar, seasons, and tithi.',
  },
  todayBengaliDate: {
    bn: 'আজকের বাংলা তারিখ:',
    en: "Today's Bengali Date:",
  },
  gregorianPickerLabel: {
    bn: 'ইংরেজি তারিখ নির্বাচন করুন:',
    en: 'Select Gregorian Date:',
  },
  seasonLabel: {
    bn: 'ঋতু:',
    en: 'Season:',
  },
  weekdayLabel: {
    bn: 'বার:',
    en: 'Day:',
  },

  // Number to Words
  numWordsTitle: {
    bn: 'সংখ্যা থেকে বাংলা কথায় রূপান্তরক',
    en: 'Number to Bengali Words Converter',
  },
  numWordsSubtitle: {
    bn: 'যেকোনো ইংরেজি বা বাংলা সংখ্যা এবং আর্থিক পরিমাণকে চেক ও দলিলের জন্য কথায় রূপান্তর।',
    en: 'Convert numeric numbers & financial amounts into formal Bengali written words.',
  },
  numberInputLabel: {
    bn: 'সংখ্যা লিখুন (ইংরেজি বা বাংলায়):',
    en: 'Enter number (English or Bengali digits):',
  },
  wordResultLabel: {
    bn: 'কথায় লিখিত রূপ:',
    en: 'In Written Words:',
  },
  takaPaisaResultLabel: {
    bn: 'টাকা ও পয়সায় লিখিত রূপ (চেক ও ভাউচারের জন্য):',
    en: 'Currency Amount in Words (For Checks & Vouchers):',
  },

  // Text Analyzer
  analyzerTitle: {
    bn: 'বাংলা টেক্সট ও শব্দ অ্যানালাইজার',
    en: 'Bangla Text & Word Frequency Analyzer',
  },
  analyzerSubtitle: {
    bn: 'বাংলা লেখার মোট অক্ষর, শব্দ, স্বরবর্ণ, ব্যঞ্জনবর্ণ, কার, যুক্তবর্ণ ও পড়ার সময় বিশ্লেষণ।',
    en: 'Analyze character count, words, vowels, consonants, modifiers, ligatures, and reading time.',
  },

  // Spelling & Dictionary
  dictTitle: {
    bn: 'বাংলা প্রমিত বানানরীতি ও সমার্থক শব্দকোষ',
    en: 'Bengali Standard Spelling & Lexicon Dictionary',
  },
  dictSubtitle: {
    bn: 'বাংলা একাডেমি প্রমিত বানান নির্দেশিকা, ভুল বানানের সঠিক রূপ ও শব্দার্থ অনুসন্ধান।',
    en: 'Bangla Academy spelling rules, common error corrections, and rich dictionary lookups.',
  },

  // Typography Showcase
  typographyTitle: {
    bn: 'বাংলা ফন্ট ও টাইপোগ্রাফি স্পেসিমেন',
    en: 'Bangla Font Showcase & Typography Specimen',
  },
  typographySubtitle: {
    bn: 'জনপ্রিয় বাংলা ফন্টের লাইভ রেন্ডারিং টেস্ট ও স্টাইলিং প্রিভিউ।',
    en: 'Live rendering test bench and specimen for popular Bengali typefaces.',
  },

  // Design Tokens Spec
  tokenSpecTitle: {
    bn: 'নুন-মুন ডিজাইন সিস্টেম ও টোকেন স্পেসিফিকেশন',
    en: 'Noon-Moon Design System & Token Specifications',
  },
  tokenSpecSubtitle: {
    bn: 'টোকেনাইজড UI নির্দেশিকা, WCAG 2.2 AA অ্যাক্সেসিবিলিটি এবং সার্বিক কম্পোনেন্ট আর্কিটেকচার।',
    en: 'Tokenized UI guide, WCAG 2.2 AA accessibility matrix, and modular architecture.',
  },

  // QA Checklist
  qaTitle: {
    bn: 'WCAG 2.2 AA ও ডিজাইন সিস্টেম কোয়ালিটি চেকলিস্ট',
    en: 'WCAG 2.2 AA & Design System QA Checklist',
  },
  qaSubtitle: {
    bn: 'অ্যাক্সেসিবিলিটি, কালার কনট্রাস্ট, ফোকাস স্টেট এবং কিবোর্ড নেভিগেশন কমপ্লায়েন্স অডিট।',
    en: 'Accessibility, color contrast, focus states, and keyboard navigation compliance audit.',
  },
};

export const getTranslation = (key: string, lang: Language): string => {
  const item = translations[key];
  if (!item) return key;
  return item[lang] || item['bn'] || key;
};
