import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// App background
content = content.replace(
  'bg-slate-100/90 text-slate-800',
  'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'
);

// Footer wrapper
content = content.replace(
  'bg-[#091513] text-[#ffffff] border-t border-[#022c22]/80',
  'bg-white dark:bg-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800'
);

// Footer logo box
content = content.replace(
  'bg-gradient-to-br from-[#10b981] via-teal-600 to-[#065f46] text-[#ffffff] flex items-center justify-center font-bangla font-black text-xl shadow-sm border border-[#34d399]/30',
  'bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bangla font-black text-xl shadow-sm border border-transparent'
);

// Footer title
content = content.replace(
  'text-[#ffffff] tracking-tight',
  'text-slate-900 dark:text-white tracking-tight'
);

// Footer links box
content = content.replace(
  /bg-\[#1e293b\]\/80 hover:bg-\[#064e3b\]\/80 text-\[#e2e8f0\] hover:text-\[#ffffff\] border border-\[#334155\]\/60/g,
  'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
);

// Bottom texts
content = content.replace(
  /text-\[#94a3b8\]/g,
  'text-slate-500 dark:text-slate-400'
);
content = content.replace(
  /text-\[#64748b\]/g,
  'text-slate-400 dark:text-slate-500'
);
content = content.replace(
  /border-\[#064e3b\]\/30/g,
  'border-slate-200 dark:border-slate-800'
);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed App and Footer');
