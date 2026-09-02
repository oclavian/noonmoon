import fs from 'fs';

let content = fs.readFileSync('src/components/ServiceDirectory.tsx', 'utf8');

// Fix Hero Banner
content = content.replace(
  /bg-gradient-to-br from-\[#06231c\] via-\[#09352a\] to-\[#041d17\] text-\[#ffffff\] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-\[#065f46\]\/40 shadow-xl/g,
  'bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden'
);

// Remove specific glows that don't fit the light theme well
content = content.replace(
  'bg-emerald-500/10 rounded-full blur-3xl pointer-events-none',
  'bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none'
);
content = content.replace(
  'bg-teal-500/10 rounded-full blur-3xl pointer-events-none',
  'bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none'
);

// Fix Hero specific texts
content = content.replace(
  /text-\[#ffffff\] tracking-tight leading-snug/g,
  'text-slate-900 dark:text-white tracking-tight leading-snug'
);
content = content.replace(
  /text-\[#d1fae5\]\/80 leading-relaxed/g,
  'text-slate-600 dark:text-slate-300 leading-relaxed'
);
content = content.replace(
  /bg-\[#10b981\]\/20 text-\[#34d399\]/g,
  'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
);
content = content.replace(
  /border-\[#10b981\]\/30/g,
  'border-emerald-200 dark:border-emerald-800/50'
);
content = content.replace(
  /text-\[#34d399\]/g,
  'text-emerald-600 dark:text-emerald-400'
);
content = content.replace(
  /text-\[#6ee7b7\]\/80/g,
  'text-slate-500 dark:text-slate-400'
);

// Fix Quick Links
content = content.replace(
  /bg-\[#022c22\]\/70 hover:bg-emerald-800 text-\[#6ee7b7\] hover:text-\[#ffffff\]/g,
  'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
);
content = content.replace(
  /border-\[#047857\]\/50/g,
  'border-slate-200 dark:border-slate-700'
);

// Fix metrics cards in Hero
content = content.replace(
  /bg-emerald-950\/60 backdrop-blur-md p-3.5/g,
  'bg-slate-50 dark:bg-slate-800/50 backdrop-blur-md p-3.5'
);
content = content.replace(
  /border-emerald-700\/40/g,
  'border-slate-200 dark:border-slate-700'
);
content = content.replace(
  /text-white font-sans-ui/g,
  'text-slate-900 dark:text-white font-sans-ui'
);
content = content.replace(
  /text-emerald-300 mt-1 font-medium/g,
  'text-slate-500 dark:text-slate-400 mt-1 font-medium'
);
content = content.replace(
  /text-emerald-400 font-sans-ui/g,
  'text-emerald-600 dark:text-emerald-400 font-sans-ui'
);

// Fix Service Category Filter Tabs (e.g. text-typing)
// These were using slate-100 for light, let's ensure dark mode works too
content = content.replace(
  /bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-300\/60\/80/g,
  'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
);

// Update active filter tab
content = content.replace(
  /bg-emerald-600 text-white shadow-sm shadow-emerald-600\/30/g,
  'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
);

// Fix individual service cards to be cleaner
content = content.replace(
  /bg-white rounded-2xl border border-slate-300\/60 hover:border-emerald-500\/50 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between/g,
  'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between'
);
content = content.replace(
  /bg-slate-50 border border-slate-200\/80/g,
  'bg-slate-100 dark:bg-slate-800 border border-transparent'
);
content = content.replace(
  /text-slate-600/g,
  'text-slate-600 dark:text-slate-400'
);
content = content.replace(
  /text-slate-900/g,
  'text-slate-900 dark:text-white'
);

// Fix Open/View Buttons on cards
content = content.replace(
  /bg-emerald-600 hover:bg-emerald-700 text-white/g,
  'bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900'
);

// External Links Button
content = content.replace(
  /bg-slate-900 hover:bg-slate-800 text-white/g,
  'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
);

fs.writeFileSync('src/components/ServiceDirectory.tsx', content);
console.log('Fixed ServiceDirectory UI');
