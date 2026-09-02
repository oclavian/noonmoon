export type TabType = 
  | 'overview'
  | 'phonetic'
  | 'bijoy-unicode'
  | 'calendar'
  | 'age-calculator'
  | 'templates'
  | 'number-words'
  | 'analyzer'
  | 'spell-dict'
  | 'fonts'
  | 'directory'
  | 'pdf-tools';

export type ServiceCategory = 
  | 'text-typing'
  | 'language-lexicon'
  | 'dates-numbers'
  | 'fonts-unicode'
  | 'audio-speech'
  | 'gov-public'
  | 'media-literature'
  | 'operator-api'
  | 'pdf-tools';

export interface BanglaServiceItem {
  id: string;
  name: string;
  nameBn: string;
  category: ServiceCategory;
  description: string;
  descriptionBn: string;
  url: string;
  isExternal: boolean;
  internalTab?: TabType;
  badge?: string;
  popular?: boolean;
  status: 'active' | 'beta' | 'official';
}

export type ComponentState = 
  | 'default'
  | 'hover'
  | 'focus-visible'
  | 'active'
  | 'disabled'
  | 'loading'
  | 'error';

export interface TokenSpec {
  category: string;
  tokenName: string;
  tokenValue: string;
  cssVariable: string;
  description: string;
  exampleUse: string;
}

export interface BengaliDateResult {
  day: number;
  dayBn: string;
  month: string;
  monthBn: string;
  year: number;
  yearBn: string;
  season: string;
  seasonBn: string;
  weekday: string;
  weekdayBn: string;
  era: string;
  gregorianDateStr: string;
}

export interface DictionaryEntry {
  word: string;
  wordBn: string;
  pos: string;
  posBn: string;
  meaning: string;
  meaningBn: string;
  synonyms: string[];
  antonyms: string[];
  exampleSentence: string;
  commonMistakes?: string[];
}

export interface TextMetrics {
  charactersWithSpaces: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  vowels: number;
  consonants: number;
  modifiers: number;
  juktaborno: number;
  digits: number;
  readingTimeMinutes: number;
  topWords: { word: string; count: number }[];
}

export interface QAChecklistItem {
  id: string;
  category: string;
  requirement: string;
  tokenOrRule: string;
  wcagLevel: string;
  passed: boolean;
  notes: string;
}
