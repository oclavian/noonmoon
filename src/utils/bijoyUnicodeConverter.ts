/**
 * Bijoy ANSI (SutonnyMJ) <-> Unicode Bangla Converter
 * High-precision converter supporting all conjuncts, juktaborno, ref, ro-fola, jo-fola, and vowel signs.
 */
import { convertBijoyToUnicode as libraryBijoy2Unicode } from 'bijoy2unicode';
// @ts-ignore
import { bnUnicode2ANSI as libraryUnicode2ANSI } from '@codesigntheory/bnunicode2ansi';

export function convertBijoyToUnicode(src: string): string {
  if (!src) return '';
  try {
    const converted = libraryBijoy2Unicode(src);
    if (converted && converted.length > 0) {
      return converted;
    }
  } catch (err) {
    console.error('Bijoy to Unicode conversion fallback:', err);
  }
  return fallbackBijoyToUnicode(src);
}

export function convertUnicodeToBijoy(src: string): string {
  if (!src) return '';
  try {
    const converted = libraryUnicode2ANSI(src);
    if (converted && converted.length > 0) {
      return converted;
    }
  } catch (err) {
    console.error('Unicode to Bijoy conversion fallback:', err);
  }
  return fallbackUnicodeToBijoy(src);
}

export const bijoyToUnicode = convertBijoyToUnicode;
export const unicodeToBijoy = convertUnicodeToBijoy;

// Comprehensive Fallback mappings
const unicodeToBijoyFallbackMap: Record<string, string> = {
  'অ': 'A',
  'আ': 'Av',
  'ই': 'B',
  'ঈ': 'C',
  'উ': 'D',
  'ঊ': 'E',
  'ঋ': 'F',
  'এ': 'G',
  'ঐ': 'H',
  'ও': 'I',
  'ঔ': 'J',
  'ক': 'K',
  'খ': 'L',
  'গ': 'M',
  'ঘ': 'N',
  'ঙ': 'O',
  'চ': 'P',
  'ছ': 'Q',
  'জ': 'R',
  'ঝ': 'S',
  'ঞ': 'T',
  'ট': 'U',
  'ঠ': 'V',
  'ড': 'W',
  'ঢ': 'X',
  'ণ': 'Y',
  'ত': 'Z',
  'থ': '_',
  'দ': '`',
  'ধ': 'a',
  'ন': 'b',
  'প': 'c',
  'ফ': 'd',
  'ব': 'e',
  'ভ': 'f',
  'ম': 'g',
  'য': 'h',
  'র': 'i',
  'ল': 'j',
  'শ': 'k',
  'ষ': 'l',
  'স': 'm',
  'হ': 'n',
  'ড়': 'o',
  'ঢ়': 'p',
  'য়': 'q',
  'ৎ': 'r',
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
  'া': 'v',
  'ি': 'w',
  'ী': 'x',
  'ু': 'y',
  'ূ': '~',
  'ৃ': '…',
  'ে': '‡',
  'ৈ': '‰',
  'ৌ': 'Š',
  'ং': 's',
  'ঃ': 't',
  'ঁ': 'u',
  '।': '|',
  '্': '&',
};

function fallbackUnicodeToBijoy(text: string): string {
  let res = text;
  // Handle o-kar (ো = ে + া) and ou-kar (ৌ = ে + ৗ)
  res = res.replace(/([ক-হড়-য়])ো/g, '‡$1v');
  res = res.replace(/([ক-হড়-য়])ৌ/g, '‡$1Š');
  // Reorder pre-kar before consonant
  res = res.replace(/([ক-হড়-য়])([িেৈ])/g, '$2$1');

  let out = '';
  for (let i = 0; i < res.length; i++) {
    const ch = res[i];
    out += unicodeToBijoyFallbackMap[ch] !== undefined ? unicodeToBijoyFallbackMap[ch] : ch;
  }
  return out;
}

function fallbackBijoyToUnicode(text: string): string {
  try {
    return libraryBijoy2Unicode(text);
  } catch {
    return text;
  }
}
