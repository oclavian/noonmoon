import { BengaliDateResult } from '../types';

export const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumerals(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function toEnglishNumerals(str: string): string {
  return str.replace(/[০-৯]/g, (digit) => String(BENGALI_DIGITS.indexOf(digit)));
}

interface MonthInfo {
  name: string;
  nameBn: string;
  days: number;
  season: string;
  seasonBn: string;
}

export function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getBengaliDate(date: Date = new Date()): BengaliDateResult {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth(); // 0-indexed
  const gDate = date.getDate();
  const gDay = date.getDay();

  const isLeap = isGregorianLeapYear(gYear);

  // Revised Bangla Academy Calendar month structure (2019 revision)
  const monthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeap ? 30 : 29, 30];
  
  const monthNames = [
    { name: 'Baishakh', nameBn: 'বৈশাখ', season: 'Summer', seasonBn: 'গ্রীষ্ম' },
    { name: 'Jyeshtha', nameBn: 'জ্যৈষ্ঠ', season: 'Summer', seasonBn: 'গ্রীষ্ম' },
    { name: 'Ashadh', nameBn: 'আষাঢ়', season: 'Monsoon', seasonBn: 'বর্ষা' },
    { name: 'Srabon', nameBn: 'শ্রাবণ', season: 'Monsoon', seasonBn: 'বর্ষা' },
    { name: 'Bhadra', nameBn: 'ভাদ্র', season: 'Autumn', seasonBn: 'শরৎ' },
    { name: 'Ashwin', nameBn: 'আশ্বিন', season: 'Autumn', seasonBn: 'শরৎ' },
    { name: 'Kartik', nameBn: 'কার্তিক', season: 'Late Autumn', seasonBn: 'হেমন্ত' },
    { name: 'Agrahayan', nameBn: 'অগ্রহায়ণ', season: 'Late Autumn', seasonBn: 'হেমন্ত' },
    { name: 'Poush', nameBn: 'পৌষ', season: 'Winter', seasonBn: 'শীত' },
    { name: 'Magh', nameBn: 'মাঘ', season: 'Winter', seasonBn: 'শীত' },
    { name: 'Falgun', nameBn: 'ফাল্গুন', season: 'Spring', seasonBn: 'বসন্ত' },
    { name: 'Chaitra', nameBn: 'চৈত্র', season: 'Spring', seasonBn: 'বসন্ত' },
  ];

  // April 14 is 1st Baishakh
  // Calculate day difference from April 14
  const baishakhStart = new Date(gYear, 3, 14); // April 14
  
  let bYear: number;
  let dayDiff: number;

  if (date >= baishakhStart) {
    bYear = gYear - 593;
    const diffTime = date.getTime() - baishakhStart.getTime();
    dayDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } else {
    bYear = gYear - 594;
    const prevBaishakhStart = new Date(gYear - 1, 3, 14);
    const diffTime = date.getTime() - prevBaishakhStart.getTime();
    dayDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  let monthIndex = 0;
  let remainingDays = dayDiff;

  for (let i = 0; i < 12; i++) {
    if (remainingDays < monthLengths[i]) {
      monthIndex = i;
      break;
    }
    remainingDays -= monthLengths[i];
  }

  const bDay = remainingDays + 1;
  const month = monthNames[monthIndex];

  const weekdays = [
    { en: 'Sunday', bn: 'রবিবার' },
    { en: 'Monday', bn: 'সোমবার' },
    { en: 'Tuesday', bn: 'মঙ্গলবার' },
    { en: 'Wednesday', bn: 'বুধবার' },
    { en: 'Thursday', bn: 'বৃহস্পতিবার' },
    { en: 'Friday', bn: 'শুক্রবার' },
    { en: 'Saturday', bn: 'শনিবার' },
  ];

  const weekday = weekdays[gDay];

  const pad = (n: number) => (n < 10 ? '0' + n : String(n));
  const gregorianDateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  return {
    day: bDay,
    dayBn: toBengaliNumerals(bDay),
    month: month.name,
    monthBn: month.nameBn,
    year: bYear,
    yearBn: toBengaliNumerals(bYear),
    season: month.season,
    seasonBn: month.seasonBn,
    weekday: weekday.en,
    weekdayBn: weekday.bn,
    era: 'বঙ্গাব্দ',
    gregorianDateStr,
  };
}
