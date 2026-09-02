import fs from 'fs';

// 1. Update CSS with Parallax Wave Keyframes
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/@keyframes wave-move[\s\S]*?\.animate-wave-slowest[^}]+\}/, `
@keyframes move-forever {
  0% { transform: translate3d(-90px, 0, 0); }
  100% { transform: translate3d(85px, 0, 0); }
}
.wave-parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.wave-parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.wave-parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.wave-parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.wave-parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }
`);
fs.writeFileSync('src/index.css', css);

// 2. Create Waves Component
const wavesComponent = `
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

export const WaveTop = () => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180 -translate-y-px pointer-events-none">
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
`;
fs.writeFileSync('src/components/Waves.tsx', wavesComponent);

// 3. Update HeaderNav.tsx
let header = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');
header = `import { WaveBottom } from './Waves';\n` + header;
header = header.replace(/bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500/g, 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500');
header = header.replace(/pb-6 sm:pb-10/g, 'pb-10 sm:pb-14'); // Add padding for wave
// Remove old wave
header = header.replace(/<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none h-\[40px\] sm:h-\[50px\] md:h-\[60px\] translate-y-px">[\s\S]*?<\/svg>\s*<\/div>/, '<WaveBottom />');
fs.writeFileSync('src/components/HeaderNav.tsx', header);

// 4. Update App.tsx Footer
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = `import { WaveTop } from './components/Waves';\n` + app;
app = app.replace(/bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500/g, 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500');
app = app.replace(/pt-20 sm:pt-28/g, 'pt-16 sm:pt-24'); // Adjust padding
// Remove old wave
app = app.replace(/<div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 h-\[50px\] sm:h-\[70px\] md:h-\[90px\] pointer-events-none -translate-y-px">[\s\S]*?<\/svg>\s*<\/div>/, '<WaveTop />');
fs.writeFileSync('src/App.tsx', app);

// 5. Update ServiceDirectory Hero Gradient
let dir = fs.readFileSync('src/components/ServiceDirectory.tsx', 'utf8');
dir = dir.replace(/bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500/g, 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500');
fs.writeFileSync('src/components/ServiceDirectory.tsx', dir);

console.log('Successfully upgraded waves and colors!');
