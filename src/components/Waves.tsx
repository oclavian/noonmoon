
import React from 'react';

export const WaveBottom = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-px pointer-events-none">
    <svg className="relative block w-[calc(100%+1.3px)] h-[50px] sm:h-[70px] lg:h-[90px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g className="wave-parallax">
        <use href="#gentle-wave" x="48" y="0" className="fill-slate-50/30 dark:fill-slate-950/30" />
        <use href="#gentle-wave" x="48" y="3" className="fill-slate-50/50 dark:fill-slate-950/50" />
        <use href="#gentle-wave" x="48" y="5" className="fill-slate-50/70 dark:fill-slate-950/70" />
        <use href="#gentle-wave" x="48" y="7" className="fill-slate-50 dark:fill-slate-950" />
      </g>
    </svg>
  </div>
);

export const WaveFooter = () => (
  <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none z-10 translate-y-px pointer-events-none">
    <svg className="relative block w-[calc(100%+1.3px)] h-[50px] sm:h-[70px] lg:h-[90px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        <linearGradient id="footer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#c026d3" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <g className="wave-parallax">
        <use href="#gentle-wave" x="48" y="0" fill="url(#footer-grad)" opacity="0.3" />
        <use href="#gentle-wave" x="48" y="3" fill="url(#footer-grad)" opacity="0.5" />
        <use href="#gentle-wave" x="48" y="5" fill="url(#footer-grad)" opacity="0.7" />
        <use href="#gentle-wave" x="48" y="7" fill="url(#footer-grad)" opacity="1" />
      </g>
    </svg>
  </div>
);
