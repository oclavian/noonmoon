import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');
const oldFooterWaveRegex = /<div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 [^>]+>[\s\S]*?<\/svg>\s*<\/div>/;

const newFooterWave = `
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 h-[50px] sm:h-[70px] md:h-[90px] pointer-events-none -translate-y-px">
          <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="absolute top-0 block w-[200%] h-full animate-wave-slowest opacity-30 dark:opacity-20">
            <path d="M0,60 C150,120 450,0 600,60 C750,120 1050,0 1200,60 C1350,120 1650,0 1800,60 C1950,120 2250,0 2400,60 V0 H0 Z" className="fill-white dark:fill-slate-950" />
          </svg>
          <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="absolute top-0 block w-[200%] h-full animate-wave-slow opacity-50 dark:opacity-40">
            <path d="M0,60 C300,140 900,-20 1200,60 C1500,140 2100,-20 2400,60 V0 H0 Z" className="fill-white dark:fill-slate-950" />
          </svg>
          <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="absolute top-0 block w-[200%] h-full animate-wave-fast">
            <path d="M0,60 C100,100 300,20 400,60 C500,100 700,20 800,60 C900,100 1100,20 1200,60 C1300,100 1500,20 1600,60 C1700,100 1900,20 2000,60 C2100,100 2300,20 2400,60 V0 H0 Z" className="fill-white dark:fill-slate-950" />
          </svg>
        </div>
`.trim();

app = app.replace(oldFooterWaveRegex, newFooterWave);
fs.writeFileSync('src/App.tsx', app);
console.log('Fixed Footer');
