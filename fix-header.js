import fs from 'fs';

let content = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');

// Replace dark green header with clean premium header
content = content.replace(
  'bg-[#091513]/95 backdrop-blur-md text-[#ffffff] border-b border-[#064e3b]/40',
  'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-slate-800/60'
);

// Fix Lipik Logo box
content = content.replace(
  'bg-gradient-to-br from-[#10b981] via-teal-600 to-[#065f46] text-[#ffffff]',
  'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
);
content = content.replace('border-[#34d399]/40', 'border-transparent');
content = content.replace('shadow-md shadow-[#022c22]/60', 'shadow-sm');

// Fix "Lipik" text
content = content.replace(
  'text-[#ffffff] tracking-tight font-sans-ui group-hover:text-[#6ee7b7]',
  'text-slate-900 dark:text-white tracking-tight font-sans-ui group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
);
content = content.replace(
  'text-[#34d399] font-medium text-sm',
  'text-emerald-600 dark:text-emerald-400 font-medium text-sm'
);

// Fix WCAG Badge
content = content.replace(
  'bg-[#064e3b]/60 text-[#6ee7b7] px-2.5 py-0.5 rounded-full border border-[#047857]/40',
  'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50'
);
content = content.replace(
  'text-[#34d399]',
  'text-emerald-600 dark:text-emerald-400'
);

// Fix Top Utility Buttons (Search, Theme, Lang, Mobile Menu)
content = content.replace(
  /bg-\[#022c22\]\/90 text-\[#6ee7b7\] hover:text-\[#ffffff\] border border-\[#047857\]\/60 hover:bg-\[#065f46\]\/80/g,
  'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
);

content = content.replace(
  /bg-\[#064e3b\]\/40 hover:bg-\[#065f46\]\/60 text-\[#a7f3d0\] hover:text-\[#ffffff\] border border-\[#047857\]\/40/g,
  'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
);

// Fix active/inactive tab buttons
content = content.replace(
  /bg-gradient-to-r from-\[#10b981\] to-teal-600 text-\[#ffffff\] shadow-md border border-\[#34d399\]\/40/g,
  'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm border border-transparent'
);
content = content.replace(
  /text-\[#d1fae5\]\/80 hover:bg-\[#064e3b\]\/60 hover:text-\[#ffffff\] bg-\[#022c22\]\/40 border border-\[#065f46\]\/30/g,
  'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
);

// Scroll Gradients
content = content.replace(
  /bg-gradient-to-r from-\[#091513\] via-\[#091513\]\/90 to-transparent text-\[#6ee7b7\] hover:text-\[#ffffff\]/g,
  'bg-gradient-to-r from-white via-white/90 dark:from-slate-950 dark:via-slate-950/90 to-transparent text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white'
);
content = content.replace(
  /bg-gradient-to-l from-\[#091513\] via-\[#091513\]\/90 to-transparent text-\[#6ee7b7\] hover:text-\[#ffffff\]/g,
  'bg-gradient-to-l from-white via-white/90 dark:from-slate-950 dark:via-slate-950/90 to-transparent text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white'
);

// Text colors inside buttons
content = content.replace(/text-\[#6ee7b7\] hover:text-\[#ffffff\]/g, 'text-slate-600 dark:text-slate-300');

fs.writeFileSync('src/components/HeaderNav.tsx', content);
console.log('Fixed Header');
