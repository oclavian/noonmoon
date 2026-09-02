import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');
let header = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');
let dir = fs.readFileSync('src/components/ServiceDirectory.tsx', 'utf8');

// 1. App.tsx Footer Makeover (Salbuta Style)
// Replace footer classes
app = app.replace(
  /footer id="app-global-footer" className="[^"]+"/g,
  'footer id="app-global-footer" className="relative bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white mt-20 pt-16 pb-8 sm:pb-10"'
);

// Add the wavy divider at the top of the footer
const footerWave = `
      <footer id="app-global-footer" className="relative bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white mt-24 pt-12 pb-8 sm:pb-10">
        <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] sm:h-[60px]">
            <defs>
              <linearGradient id="footer-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="url(#footer-wave-grad)" />
          </svg>
        </div>
`;
app = app.replace(/<footer id="app-global-footer"[^>]+>/, footerWave.trim());

// Clean up footer text colors that were slate-something
app = app.replace(/text-slate-900 dark:text-white/g, 'text-white');
app = app.replace(/bg-slate-900 dark:bg-white text-white dark:text-slate-900/g, 'bg-white text-purple-600');
app = app.replace(/border-slate-200 dark:border-slate-800/g, 'border-white/20');
app = app.replace(/bg-slate-100 dark:bg-slate-900/g, 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20');
app = app.replace(/text-slate-700 dark:text-slate-300/g, 'text-white');
app = app.replace(/text-slate-500 dark:text-slate-400/g, 'text-white/70');
app = app.replace(/text-slate-400 dark:text-slate-500/g, 'text-white/60');
// Special text color cleanup
app = app.replace(/<span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">/g, '<span className="text-white/90 font-medium text-sm">');
app = app.replace(/<span className="text-emerald-600 dark:text-emerald-400">/g, '<span className="text-white">');


// 2. HeaderNav Makeover
header = header.replace(
  /<header className="[^"]+"/g,
  '<header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white shadow-xl transition-all">'
);
header = header.replace(/bg-white\/80 dark:bg-slate-950\/80 backdrop-blur-xl/g, '');
header = header.replace(/text-slate-900 dark:text-white/g, 'text-white');
header = header.replace(/border-b border-slate-200\/60 dark:border-slate-800\/60/g, 'border-b border-white/10');
// Fix Logo box in header
header = header.replace(/bg-slate-900 dark:bg-white text-white dark:text-slate-900/g, 'bg-white text-purple-600');
// Fix text in logo
header = header.replace(/text-emerald-600 dark:text-emerald-400/g, 'text-white/90');
header = header.replace(/text-emerald-600 dark:group-hover:text-emerald-400/g, 'text-white');
header = header.replace(/group-hover:text-emerald-600/g, 'group-hover:text-white');
header = header.replace(/bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/g, 'bg-white/20 border-white/30 text-white');
header = header.replace(/text-slate-600 dark:text-slate-300/g, 'text-white/90');
header = header.replace(/bg-slate-50 dark:bg-slate-900/g, 'bg-white/10');
header = header.replace(/text-slate-500 dark:text-slate-400/g, 'text-white/70');
// Center Date Widget
header = header.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-white/10 border-white/20');
header = header.replace(/bg-slate-300 dark:bg-slate-600/g, 'bg-white/30');
// Action Controls (Theme, Lang)
header = header.replace(/bg-white dark:bg-slate-900/g, 'bg-white/10');
header = header.replace(/hover:text-slate-900 dark:hover:text-white/g, 'hover:text-white');
header = header.replace(/border border-slate-200 dark:border-slate-800/g, 'border border-white/20');
header = header.replace(/hover:bg-slate-50 dark:hover:bg-slate-800/g, 'hover:bg-white/20');
// Sub-nav (tabs)
header = header.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-white/10 border-white/20');
header = header.replace(/border-t border-slate-200 dark:border-slate-700/g, 'border-t border-white/10');
header = header.replace(/bg-gradient-to-r from-white via-white\/90 dark:from-slate-950 dark:via-slate-950\/90 to-transparent/g, 'bg-gradient-to-r from-blue-700 to-transparent');
header = header.replace(/bg-gradient-to-l from-white via-white\/90 dark:from-slate-950 dark:via-slate-950\/90 to-transparent/g, 'bg-gradient-to-l from-pink-500 to-transparent');
// Active tab styling
header = header.replace(/bg-slate-900 dark:bg-white/g, 'bg-white');
header = header.replace(/text-slate-950/g, 'text-purple-700');
header = header.replace(/text-white dark:text-slate-900/g, 'text-purple-700');
header = header.replace(/text-white/g, 'text-white'); // restore if needed
header = header.replace(/bg-slate-300 dark:bg-slate-600/g, 'bg-white/20');
header = header.replace(/group-hover:bg-slate-300 dark:group-hover:bg-slate-600/g, 'group-hover:bg-white/30');
// Fix mobile menu colors
header = header.replace(/bg-white dark:bg-slate-950/g, 'bg-blue-800');
header = header.replace(/bg-slate-200 dark:bg-slate-700/g, 'bg-white/20');

// Add SVG wave to the bottom of Header
const headerWave = `
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white shadow-xl transition-all">
      <div className="absolute top-full left-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[20px] sm:h-[30px]">
          <defs>
            <linearGradient id="header-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z" fill="url(#header-wave-grad)" />
        </svg>
      </div>
`;
header = header.replace(/<header className="sticky top-0 z-50 bg-gradient-[^>]+>/, headerWave.trim());


// 3. ServiceDirectory Hero Banner
// Replace Hero Banner to use the same gradient but with a wavy bottom.
dir = dir.replace(
  /bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden/g,
  'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white p-6 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden mb-6'
);
// Fix Hero texts inside ServiceDirectory
dir = dir.replace(/text-slate-900 dark:text-white dark:text-white/g, 'text-white');
dir = dir.replace(/text-slate-600 dark:text-slate-400 dark:text-slate-300/g, 'text-white/90');
dir = dir.replace(/text-slate-500 dark:text-slate-400/g, 'text-white/70');
dir = dir.replace(/bg-emerald-50 dark:bg-emerald-900\/30 text-emerald-600 dark:text-emerald-400/g, 'bg-white/20 text-white backdrop-blur-sm');
dir = dir.replace(/border-emerald-200 dark:border-emerald-800\/50/g, 'border-white/30');
dir = dir.replace(/text-emerald-600 dark:text-emerald-400/g, 'text-white');
dir = dir.replace(/bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/g, 'bg-white/10 hover:bg-white/20 border-white/20');
dir = dir.replace(/text-slate-700 dark:text-slate-300/g, 'text-white/90');
dir = dir.replace(/bg-slate-50 dark:bg-slate-800\/50 backdrop-blur-md/g, 'bg-white/10 backdrop-blur-md border-white/20');
dir = dir.replace(/border-slate-200 dark:border-slate-700/g, 'border-white/20');
// Cards inside ServiceDirectory body
dir = dir.replace(/bg-slate-100 dark:bg-slate-800\/50 text-slate-600 dark:text-slate-400/g, 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300');
dir = dir.replace(/bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm/g, 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md border-transparent');
// Service Cards hover effect
dir = dir.replace(/hover:border-slate-400 dark:hover:border-slate-600 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all/g, 'hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:-translate-y-1 p-5 sm:p-6 shadow-md transition-all');


fs.writeFileSync('src/App.tsx', app);
fs.writeFileSync('src/components/HeaderNav.tsx', header);
fs.writeFileSync('src/components/ServiceDirectory.tsx', dir);
console.log('Applied Salbuta Theme Design');
