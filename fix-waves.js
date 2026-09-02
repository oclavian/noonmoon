import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');
let header = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');

// 1. Fix Footer Wave
const newFooterWave = `
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] sm:h-[60px] md:h-[80px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-slate-950" />
          </svg>
        </div>
`;

// Replace the old footer wave
app = app.replace(
  /<div className="absolute bottom-full[^>]+>[\s\S]*?<\/svg>\s*<\/div>/,
  newFooterWave.trim()
);
// Make sure footer has enough top padding to account for the wave
app = app.replace(
  /<footer id="app-global-footer" className="relative bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white mt-24 pt-12 pb-8 sm:pb-10">/,
  '<footer id="app-global-footer" className="relative bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white mt-24 pt-20 sm:pt-28 pb-8 sm:pb-10">'
);

// 2. Fix Header Wave
const newHeaderWave = `
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[30px] sm:h-[40px] md:h-[50px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-slate-950" />
        </svg>
      </div>
`;

header = header.replace(
  /<div className="absolute top-full[^>]+>[\s\S]*?<\/svg>\s*<\/div>/,
  newHeaderWave.trim()
);
// We also need to give the header some extra padding at the bottom so content doesn't get cut off by the wave.
// Let's add pb-8 sm:pb-12 to the main header container.
header = header.replace(
  /<header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white shadow-xl transition-all">/,
  '<header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white shadow-xl transition-all pb-6 sm:pb-10">'
);


fs.writeFileSync('src/App.tsx', app);
fs.writeFileSync('src/components/HeaderNav.tsx', header);
console.log('Fixed waves');
