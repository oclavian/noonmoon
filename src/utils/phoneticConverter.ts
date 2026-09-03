/**
 * English to Bangla Phonetic (Avro-Style) Typing Parser
 */

const phoneticRules: [RegExp, string][] = [
  // Numbers
  [/0/g, '০'],
  [/1/g, '১'],
  [/2/g, '২'],
  [/3/g, '৩'],
  [/4/g, '৪'],
  [/5/g, '৫'],
  [/6/g, '৬'],
  [/7/g, '৭'],
  [/8/g, '৮'],
  [/9/g, '৯'],

  // Special Words
  [/\bami\b/gi, 'আমি'],
  [/\btumi\b/gi, 'তুমি'],
  [/\btumi\b/gi, 'তুমি'],
  [/\bapni\b/gi, 'আপনি'],
  [/\bbangla\b/gi, 'বাংলা'],
  [/\bbangladesh\b/gi, 'বাংলাদেশ'],
  [/\bshonar\b/gi, 'সোনার'],
  [/\bkemon\b/gi, 'কেমন'],
  [/\bachhen\b/gi, 'আছেন'],
  [/\bachho\b/gi, 'আছো'],
  [/\bdhonnobad\b/gi, 'ধন্যবাদ'],
  [/\bshagotom\b/gi, 'স্বাগতম'],
  [/\bshurjo\b/gi, 'সূর্য'],
  [/\bprothom\b/gi, 'প্রথম'],

  // Four-letter conjuncts & sequences
  [/kkh/gi, 'ক্ষ'],
  [/ggh/gi, 'জ্ঞ'],
  [/cch/gi, 'চ্ছ'],
  [/ssh/gi, 'শ'],
  [/ng/gi, 'ং'],
  [/OI/g, 'ঐ'],
  [/OU/g, 'ঔ'],

  // Triple letters
  [/bndh/gi, 'ব্ধ'],
  [/shk/gi, 'ষ্ক'],
  [/sht/gi, 'ষ্ট'],
  [/shth/gi, 'ষ্ঠ'],
  [/shn/gi, 'ষ্ণ'],
  [/shp/gi, 'ষ্প'],
  [/shf/gi, 'স্ফ'],
  [/sk/gi, 'স্ক'],
  [/skh/gi, 'স্খ'],
  [/st/gi, 'স্ত'],
  [/sth/gi, 'স্থ'],
  [/sn/gi, 'স্ন'],
  [/sp/gi, 'স্প'],
  [/sph/gi, 'স্ফ'],
  [/sm/gi, 'স্ম'],
  [/bd/gi, 'ব্দ'],
  [/dhw/gi, 'ধ্ব'],
  [/khw/gi, 'খ্ব'],
  [/ghw/gi, 'ঘ্ব'],
  [/chw/gi, 'ছ্ব'],
  [/jw/gi, 'জ্ব'],
  [/jhw/gi, 'ঝ্ব'],
  [/tw/gi, 'ত্ব'],
  [/thw/gi, 'থ্ব'],
  [/dw/gi, 'দ্ব'],

  // Compound consonants & sounds
  [/kh/gi, 'খ'],
  [/gh/gi, 'ঘ'],
  [/ch/gi, 'চ'],
  [/Ch/gi, 'ছ'],
  [/jh/gi, 'ঝ'],
  [/Th/g, 'ঠ'],
  [/Dh/g, 'ঢ'],
  [/th/gi, 'থ'],
  [/dh/gi, 'ধ'],
  [/ph/gi, 'ফ'],
  [/bh/gi, 'ভ'],
  [/sh/gi, 'শ'],
  [/Sh/g, 'ষ'],
  [/rh/gi, 'ঢ়'],
  [/r\^/gi, 'ড়'],
  [/t`/g, 'ৎ'],

  // Single consonants
  [/k/gi, 'ক'],
  [/g/gi, 'গ'],
  [/c/gi, 'চ'],
  [/j/gi, 'জ'],
  [/T/g, 'ট'],
  [/D/g, 'ড'],
  [/N/g, 'ণ'],
  [/t/gi, 'ত'],
  [/d/gi, 'দ'],
  [/n/gi, 'ন'],
  [/p/gi, 'প'],
  [/f/gi, 'ফ'],
  [/b/gi, 'ব'],
  [/v/gi, 'ভ'],
  [/m/gi, 'ম'],
  [/z/gi, 'য'],
  [/y/gi, 'য়'],
  [/r/gi, 'র'],
  [/l/gi, 'ল'],
  [/s/gi, 'স'],
  [/h/gi, 'হ'],
  [/w/gi, 'ও'],

  // Vowel sequences
  [/aI/g, 'াঈ'],
  [/ai/gi, 'াই'],
  [/aU/g, 'াঊ'],
  [/au/gi, 'াউ'],
  [/ao/gi, 'াও'],
  [/eI/g, 'েঈ'],
  [/ei/gi, 'েই'],
  [/eU/g, 'েঊ'],
  [/eu/gi, 'েউ'],
  [/eo/gi, 'েও'],
  [/iU/g, 'িঊ'],
  [/iu/gi, 'িউ'],
  [/io/gi, 'িও'],
  [/uI/g, 'ুঈ'],
  [/ui/gi, 'ুই'],
  [/uo/gi, 'ুও'],
  [/ua/gi, 'ুয়া'],

  // Vowels and Kar
  [/aa/gi, 'া'],
  [/ee/gi, 'ী'],
  [/oo/gi, 'ূ'],
  [/oi/gi, 'ৈ'],
  [/ou/gi, 'ৌ'],
  [/a/gi, 'া'],
  [/i/gi, 'ি'],
  [/I/g, 'ী'],
  [/u/gi, 'ু'],
  [/U/g, 'ূ'],
  [/e/gi, 'ে'],
  [/E/g, 'এ'],
  [/o/gi, 'ো'],
  [/O/g, 'ও'],
];

export function parsePhoneticWord(word: string): string {
  if (!word) return '';
  
  let clean = word;
  
  // Check exact special words first
  for (const [regex, replacement] of phoneticRules) {
    if (regex.source.includes('\\b')) {
      if (clean.match(regex)) {
        clean = clean.replace(regex, replacement);
        if (/[অ-য়]/.test(clean)) return clean;
      }
    }
  }
  
  // Independent vowel at the start of a word
  const initialVowels: Record<string, string> = {
    'a': 'অ',
    'aa': 'আ',
    'A': 'আ',
    'i': 'ই',
    'I': 'ঈ',
    'ee': 'ঈ',
    'u': 'উ',
    'U': 'ঊ',
    'oo': 'ঊ',
    'e': 'এ',
    'E': 'এ',
    'oi': 'ঐ',
    'o': 'ও',
    'O': 'ও',
    'ou': 'ঔ',
    'rri': 'ঋ',
  };

  // Check if starts with independent vowel
  for (const [key, val] of Object.entries(initialVowels).sort((a, b) => b[0].length - a[0].length)) {
    if (clean.toLowerCase().startsWith(key.toLowerCase())) {
      const rest = clean.slice(key.length);
      return val + parsePhoneticBody(rest);
    }
  }

  return parsePhoneticBody(clean);
}

function parsePhoneticBody(text: string): string {
  let result = text;
  for (const [regex, replacement] of phoneticRules) {
    result = result.replace(regex, replacement);
  }
  return result;
}

export function parsePhoneticSentence(text: string): string {
  if (!text) return '';
  return text.split(/(\s+|[.,!?;:'"()[\]{}])/).map(segment => {
    if (/^\s+$/.test(segment) || /^[.,!?;:'"()[\]{}]+$/.test(segment)) {
      return segment;
    }
    return parsePhoneticWord(segment);
  }).join('');
}
