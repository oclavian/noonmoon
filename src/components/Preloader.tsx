import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';

interface StageText {
  phase: string;
  taglineBn: string;
  taglineEn: string;
}

const STAGES: StageText[] = [
  {
    phase: 'অক্ষর বিন্যাস',
    taglineBn: 'বাংলা টাইপোগ্রাফি ও ফন্ট ইঞ্জিন সক্রিয় হচ্ছে...',
    taglineEn: 'Initializing Bangla typography & font engines...',
  },
  {
    phase: 'কনভার্সন ইঞ্জিন',
    taglineBn: 'ইউনিকোড, বিজয় ও ফোনেটিক মেকানিজম প্রস্তুত হচ্ছে...',
    taglineEn: 'Loading Unicode, Bijoy & phonetic converters...',
  },
  {
    phase: 'টুলস পোর্টাল',
    taglineBn: 'ক্যালেন্ডার, বয়স গণনা ও স্মার্ট সরঞ্জাম লোড হচ্ছে...',
    taglineEn: 'Preparing calendar, age calculators & utilities...',
  },
  {
    phase: 'পরিপূর্ণ রূপ',
    taglineBn: 'স্বাগতম নুন-মুন ডিজিটাল প্ল্যাটফর্মে!',
    taglineEn: 'Welcome to Noon-Moon Digital Platform!',
  },
];

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const { language } = useLanguage();
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const duration = 5000; // 5.0 seconds total

  const handleFinish = () => {
    if (isClosing) return;
    setIsClosing(true);
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsMounted(false);
    }, 850);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Custom smooth luxury bezier-like curve: fast start, thoughtful middle, triumphant landing
      // cubic-bezier approximation
      const easedProgress = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      setProgress(Math.round(easedProgress * 100));

      if (rawProgress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(handleFinish, 300);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isMounted) return null;

  // Active Stage determination
  const stageIndex = Math.min(Math.floor((progress / 100) * STAGES.length), STAGES.length - 1);
  const currentStage = STAGES[stageIndex];

  // SVG Circular Math
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      id="noon-moon-luxury-preloader"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-between bg-[#020C09] text-white overflow-hidden select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClosing ? 'opacity-0 scale-105 filter blur-md pointer-events-none' : 'opacity-100 scale-100 filter-none'
      }`}
    >
      {/* Dynamic Ambient Celestial Aurora & Stardust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Emerald Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full opacity-35 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #00A878 0%, #064E3B 35%, transparent 70%)',
          }}
        />

        {/* Subtle Warm Moonlight Gold Accent Glow */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #F59E0B 0%, #B45309 30%, transparent 70%)',
          }}
        />

        {/* Micro Star Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #ffffff 1.5px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating Constellation Stardust Sparks */}
        <div className="absolute inset-0">
          {[
            { top: '18%', left: '22%', size: 'w-1 h-1', delay: '0s', duration: '3s' },
            { top: '28%', left: '78%', size: 'w-1.5 h-1.5', delay: '1s', duration: '4s' },
            { top: '72%', left: '16%', size: 'w-1 h-1', delay: '0.5s', duration: '3.5s' },
            { top: '80%', left: '82%', size: 'w-1.5 h-1.5', delay: '1.5s', duration: '4.5s' },
            { top: '48%', left: '10%', size: 'w-1 h-1', delay: '2s', duration: '3s' },
            { top: '55%', left: '90%', size: 'w-1 h-1', delay: '0.8s', duration: '4s' },
          ].map((star, idx) => (
            <div
              key={idx}
              className={`absolute ${star.size} rounded-full bg-emerald-300 shadow-[0_0_8px_#34D399] animate-pulse`}
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Bar: Brand Monogram & Luxury Skip Button */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.28em] text-emerald-300/80 uppercase font-semibold">
            {language === 'bn' ? 'নুন-মুন সিস্টেম' : 'NOON-MOON CORE'}
          </span>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleFinish}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-400/30 text-[11px] sm:text-xs font-medium text-emerald-200/80 hover:text-white transition-all duration-300 backdrop-blur-md cursor-pointer active:scale-95"
          title={language === 'bn' ? 'সরাসরি ওয়েবসাইটে যান' : 'Skip into website'}
        >
          <span>{language === 'bn' ? 'সরাসরি যান' : 'Skip Intro'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 text-emerald-400" />
        </button>
      </header>

      {/* Central Majestic Orbit & Brand Core */}
      <main className="relative z-20 flex flex-col items-center justify-center my-auto px-4">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Outer Astrolabe Dial - Rotating subtle dashed ring */}
          <div 
            className="absolute inset-0 rounded-full border border-emerald-500/20 border-dashed pointer-events-none animate-spin-slow"
          />

          {/* Secondary Counter-rotating fine track */}
          <div 
            className="absolute inset-3 rounded-full border border-white/[0.08] pointer-events-none animate-spin-reverse-slow"
          />

          {/* Golden Tick Markers at 4 Cardinal Points */}
          <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
            <div className="w-1.5 h-0.5 bg-amber-400/60 rounded-full" />
            <div className="w-1.5 h-0.5 bg-amber-400/60 rounded-full" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-between py-1 pointer-events-none">
            <div className="w-0.5 h-1.5 bg-amber-400/60 rounded-full" />
            <div className="w-0.5 h-1.5 bg-amber-400/60 rounded-full" />
          </div>

          {/* Primary Precision Progress SVG */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 200 200"
          >
            <defs>
              <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="2.5"
              fill="transparent"
            />

            {/* Dynamic Animated Progress Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="url(#orbitGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              filter="url(#glow)"
              style={{
                transition: 'stroke-dashoffset 80ms linear',
              }}
            />
          </svg>

          {/* Central Glassmorphic Floating Orb with Logo */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-white/[0.09] via-emerald-950/40 to-black/60 backdrop-blur-2xl border border-white/15 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center overflow-hidden group">
            {/* Glossy top highlight reflection */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none" />

            {/* Core Logo Image */}
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-700 ease-out transform group-hover:scale-105">
              <img
                src="/noon-moon-logo.png"
                alt="Noon-Moon Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* Brand Name & Typographic Flourish */}
        <div className="mt-8 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase mb-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{currentStage.phase}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[0.15em] font-sans-ui flex items-center justify-center gap-2">
            <span>{language === 'bn' ? 'নুন-মুন' : 'NOON-MOON'}</span>
            <span className="text-amber-400 font-light text-xl">✦</span>
          </h1>

          {/* Morphing Stage Subtitle */}
          <p className="text-xs sm:text-[13px] text-emerald-200/70 font-medium tracking-wide max-w-sm mx-auto h-6 transition-all duration-300">
            {language === 'bn' ? currentStage.taglineBn : currentStage.taglineEn}
          </p>
        </div>
      </main>

      {/* Bottom Counter & Multi-Segment Progress Strip */}
      <footer className="relative z-20 w-full max-w-md mx-auto px-6 pb-8 sm:pb-12 flex flex-col items-center gap-4">
        {/* Minimal Monospace Percentage Counter with Glowing Digits */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-amber-300">
            {progress.toString().padStart(2, '0')}
          </span>
          <span className="text-xs font-mono font-semibold text-emerald-400/80">%</span>
        </div>

        {/* Segmented Milestone Progress Dots */}
        <div className="flex items-center gap-2.5">
          {STAGES.map((_, idx) => {
            const isCompleted = idx <= stageIndex;
            const isCurrent = idx === stageIndex;
            return (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isCurrent
                    ? 'w-7 bg-gradient-to-r from-emerald-400 to-amber-400 shadow-[0_0_10px_#34D399]'
                    : isCompleted
                    ? 'w-3.5 bg-emerald-500'
                    : 'w-2 bg-white/10'
                }`}
              />
            );
          })}
        </div>

        {/* Subtle Security & Freedom Notice */}
        <p className="text-[10px] font-mono tracking-widest text-emerald-400/40 uppercase text-center">
          ১০০% উন্মুক্ত • অফলাইন সুরক্ষিত • বাংলা ডিজিটাল সেবা
        </p>
      </footer>
    </div>
  );
};
