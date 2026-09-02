import { TextMetrics } from '../types';

export function analyzeBanglaText(text: string): TextMetrics {
  if (!text) {
    return {
      charactersWithSpaces: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      vowels: 0,
      consonants: 0,
      modifiers: 0,
      juktaborno: 0,
      digits: 0,
      readingTimeMinutes: 0,
      topWords: [],
    };
  }

  const charactersWithSpaces = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Words count
  const wordsArray = text
    .trim()
    .split(/[\s,।!?;:"'()[\]{}<>«»—–\/\\]+/)
    .filter(w => w.length > 0);
  const words = wordsArray.length;

  // Sentences count (splitting by ।, !, ?, .)
  const sentences = text
    .split(/[।!?\n]+/)
    .filter(s => s.trim().length > 0).length;

  // Paragraphs
  const paragraphs = text
    .split(/\n+/)
    .filter(p => p.trim().length > 0).length;

  // Vowels (স্বরবর্ণ: অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ)
  const vowelsMatch = text.match(/[অআইঈউঊঋএঐওঔ]/g);
  const vowels = vowelsMatch ? vowelsMatch.length : 0;

  // Consonants (ব্যঞ্জনবর্ণ: ক-হ, ড়, ঢ়, য়, ৎ)
  const consonantsMatch = text.match(/[ক-হড়ঢ়য়ৎ]/g);
  const consonants = consonantsMatch ? consonantsMatch.length : 0;

  // Modifiers (কার ও সংকেত: া, ি, ী, ু, ূ, ৃ, ে, ৈ, ো, ৌ, ং, ঃ, ঁ, ্)
  const modifiersMatch = text.match(/[া-ৌংঃঁ্]/g);
  const modifiers = modifiersMatch ? modifiersMatch.length : 0;

  // Juktaborno (যুগ্ম বর্ণ: consonant + hosonto + consonant)
  const juktaMatch = text.match(/[ক-হ][্][ক-হ]/g);
  const juktaborno = juktaMatch ? juktaMatch.length : 0;

  // Digits (০-৯ or 0-9)
  const digitsMatch = text.match(/[০-৯0-9]/g);
  const digits = digitsMatch ? digitsMatch.length : 0;

  // Average reading speed in Bangla is ~150-180 words per minute
  const readingTimeMinutes = Math.max(0.1, Number((words / 160).toFixed(1)));

  // Word frequency analysis
  const wordFreq: Record<string, number> = {};
  for (const w of wordsArray) {
    const cleanWord = w.replace(/[^\u0980-\u09FFa-zA-Z]/g, '');
    if (cleanWord.length > 1) {
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    }
  }

  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  return {
    charactersWithSpaces,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    vowels,
    consonants,
    modifiers,
    juktaborno,
    digits,
    readingTimeMinutes,
    topWords,
  };
}
