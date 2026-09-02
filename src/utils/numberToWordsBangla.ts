import { toEnglishNumerals } from './bengaliCalendar';

const ones = [
  'শূন্য', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়',
  'দশ', 'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোলো', 'সতেরো', 'আঠারো', 'উনিশ',
  'বিশ', 'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আটাশ', 'ঊনত্রিশ',
  'ত্রিশ', 'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাঁইত্রিশ', 'আটত্রিশ', 'ঊনচল্লিশ',
  'চল্লিশ', 'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'ঊনপঞ্চাশ',
  'পঞ্চাশ', 'একান্ন', 'বায়ান্ন', 'তিপ্পান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন', 'ঊনষাট',
  'ষাট', 'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'ঊনসত্তর',
  'সত্তর', 'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চৌহাত্তর', 'পঁচাত্তর', 'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'ঊনআশি',
  'আশি', 'একাশি', 'বিরাশি', 'তিরাশি', 'চুরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'আটাশি', 'ঊননব্বই',
  'নব্বই', 'একানব্বই', 'বানব্বই', 'তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
];

function convertSegment(num: number): string {
  let res = '';
  
  // Crore (কোটি) = 1,00,00,000
  if (num >= 10000000) {
    const crore = Math.floor(num / 10000000);
    res += `${convertUnderCrore(crore)} কোটি `;
    num %= 10000000;
  }

  res += convertUnderCrore(num);
  return res.trim();
}

function convertUnderCrore(num: number): string {
  let parts: string[] = [];

  // Lakh (লক্ষ) = 1,00,000
  if (num >= 100000) {
    const lakh = Math.floor(num / 100000);
    if (lakh > 0) {
      parts.push(`${ones[lakh]} লক্ষ`);
    }
    num %= 100000;
  }

  // Thousand (হাজার) = 1,000
  if (num >= 1000) {
    const thousand = Math.floor(num / 1000);
    if (thousand > 0) {
      parts.push(`${ones[thousand]} হাজার`);
    }
    num %= 1000;
  }

  // Hundred (শত) = 100
  if (num >= 100) {
    const hundred = Math.floor(num / 100);
    if (hundred > 0) {
      parts.push(`${ones[hundred]} শত`);
    }
    num %= 100;
  }

  // Remainder (< 100)
  if (num > 0) {
    parts.push(ones[num]);
  }

  return parts.join(' ');
}

export function numberToBanglaWords(input: string | number, asCurrency = false): string {
  if (input === '' || input === null || input === undefined) return '';

  const cleanStr = toEnglishNumerals(String(input).trim().replace(/,/g, ''));
  if (isNaN(Number(cleanStr))) return 'অকার্যকর সংখ্যা';

  const parts = cleanStr.split('.');
  const intVal = parseInt(parts[0], 10);
  
  if (isNaN(intVal)) return 'অকার্যকর সংখ্যা';
  if (intVal === 0 && (!parts[1] || parseInt(parts[1], 10) === 0)) {
    return asCurrency ? 'শূন্য টাকা মাত্র' : 'শূন্য';
  }

  let words = '';
  if (intVal === 0) {
    words = 'শূন্য';
  } else {
    words = convertSegment(intVal);
  }

  if (parts.length > 1 && parts[1]) {
    const decDigits = parts[1].slice(0, 2);
    const decVal = parseInt(decDigits, 10);
    if (decVal > 0) {
      if (asCurrency) {
        words += ` টাকা ও ${ones[decVal]} পয়সা মাত্র`;
      } else {
        const decWords = decDigits.split('').map(d => ones[parseInt(d, 10)]).join(' ');
        words += ` দশমিক ${decWords}`;
      }
      return words;
    }
  }

  if (asCurrency) {
    words += ' টাকা মাত্র';
  }

  return words;
}
