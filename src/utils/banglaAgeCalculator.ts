// Bengali Age & Date Calculation Engine
import { getBengaliDate, toBengaliNumerals } from './bengaliCalendar';

export interface AgeCalculationResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  
  // Bengali numerals representation
  yearsBn: string;
  monthsBn: string;
  daysBn: string;
  totalDaysBn: string;
  totalWeeksBn: string;
  totalMonthsBn: string;
  totalHoursBn: string;

  // Next Birthday Info
  nextBirthdayDate: Date;
  daysToNextBirthday: number;
  daysToNextBirthdayBn: string;
  nextAgeYears: number;
  nextAgeYearsBn: string;
  nextBirthdayDayBn: string;

  // Bengali Date of Birth info
  bengaliDob: {
    day: number;
    dayBn: string;
    month: string;
    monthBn: string;
    year: number;
    yearBn: string;
    seasonBn: string;
    weekdayBn: string;
  };

  // Fun / Educational Lifespan estimates in Bengali
  approxHeartbeats: number;
  approxHeartbeatsBn: string;
  approxBreaths: number;
  approxBreathsBn: string;
  approxSleepHours: number;
  approxSleepHoursBn: string;
}

export interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  yearsBn: string;
  monthsBn: string;
  daysBn: string;
  totalDaysBn: string;
}

export function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      return new Date(y, m, d, 12, 0, 0);
    }
  }
  return new Date(dateStr);
}

export function calculateBanglaAge(birthDate: Date, asOfDate: Date = new Date()): AgeCalculationResult | null {
  if (isNaN(birthDate.getTime()) || isNaN(asOfDate.getTime())) return null;
  if (birthDate > asOfDate) return null;

  const bYear = birthDate.getFullYear();
  const bMonth = birthDate.getMonth();
  const bDay = birthDate.getDate();

  const cYear = asOfDate.getFullYear();
  const cMonth = asOfDate.getMonth();
  const cDay = asOfDate.getDate();

  let years = cYear - bYear;
  let months = cMonth - bMonth;
  let days = cDay - bDay;

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonthLastDay = new Date(cYear, cMonth, 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = asOfDate.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Next Birthday Calculation
  let nextBdayYear = cYear;
  const thisYearBday = new Date(nextBdayYear, bMonth, bDay);
  if (thisYearBday < asOfDate) {
    nextBdayYear += 1;
  }
  const nextBirthdayDate = new Date(nextBdayYear, bMonth, bDay);
  const daysToNextBirthday = Math.ceil((nextBirthdayDate.getTime() - asOfDate.getTime()) / (1000 * 60 * 60 * 24));
  const nextAgeYears = years + 1;

  const weekdaysBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const nextBirthdayDayBn = weekdaysBn[nextBirthdayDate.getDay()];

  // Bengali Date of Birth
  const bnDateOfBirth = getBengaliDate(birthDate);

  // Lifespan fun stats (Average 80 bpm heart rate, 16 breaths/min, 8 hrs sleep/day)
  const approxHeartbeats = Math.floor(totalMinutes * 75);
  const approxBreaths = Math.floor(totalMinutes * 16);
  const approxSleepHours = Math.floor(totalDays * 8);

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    yearsBn: toBengaliNumerals(years),
    monthsBn: toBengaliNumerals(months),
    daysBn: toBengaliNumerals(days),
    totalDaysBn: toBengaliNumerals(totalDays),
    totalWeeksBn: toBengaliNumerals(totalWeeks),
    totalMonthsBn: toBengaliNumerals(totalMonths),
    totalHoursBn: toBengaliNumerals(totalHours),
    nextBirthdayDate,
    daysToNextBirthday: Math.max(0, daysToNextBirthday),
    daysToNextBirthdayBn: toBengaliNumerals(Math.max(0, daysToNextBirthday)),
    nextAgeYears,
    nextAgeYearsBn: toBengaliNumerals(nextAgeYears),
    nextBirthdayDayBn,
    bengaliDob: {
      day: bnDateOfBirth.day,
      dayBn: bnDateOfBirth.dayBn,
      month: bnDateOfBirth.month,
      monthBn: bnDateOfBirth.monthBn,
      year: bnDateOfBirth.year,
      yearBn: bnDateOfBirth.yearBn,
      seasonBn: bnDateOfBirth.seasonBn,
      weekdayBn: bnDateOfBirth.weekdayBn,
    },
    approxHeartbeats,
    approxHeartbeatsBn: toBengaliNumerals(approxHeartbeats),
    approxBreaths,
    approxBreathsBn: toBengaliNumerals(approxBreaths),
    approxSleepHours,
    approxSleepHoursBn: toBengaliNumerals(approxSleepHours),
  };
}

export function calculateDateDifference(startDate: Date, endDate: Date): DateDifferenceResult | null {
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return null;
  const start = startDate < endDate ? startDate : endDate;
  const end = startDate < endDate ? endDate : startDate;

  const sYear = start.getFullYear();
  const sMonth = start.getMonth();
  const sDay = start.getDate();

  const eYear = end.getFullYear();
  const eMonth = end.getMonth();
  const eDay = end.getDate();

  let years = eYear - sYear;
  let months = eMonth - sMonth;
  let days = eDay - sDay;

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(eYear, eMonth, 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    yearsBn: toBengaliNumerals(years),
    monthsBn: toBengaliNumerals(months),
    daysBn: toBengaliNumerals(days),
    totalDaysBn: toBengaliNumerals(totalDays),
  };
}
