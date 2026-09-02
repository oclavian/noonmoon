import fs from 'fs';
import path from 'path';

const toolsDir = 'src/components/tools';
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // Heavy green cards -> neutral premium cards
  {
    from: /bg-gradient-to-br from-\[#064e3b\] via-\[#065f46\] to-\[#042f2e\] text-\[#ffffff\]/g,
    to: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800'
  },
  {
    from: /bg-gradient-to-br from-\[#06231c\] via-\[#09352a\] to-\[#041d17\] text-white/g,
    to: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800'
  },
  {
    from: /border border-\[#065f46\]\/40 shadow-xl/g,
    to: 'shadow-sm border border-slate-200 dark:border-slate-800'
  },
  {
    from: /border border-\[#047857\]\/60 shadow-md/g,
    to: 'shadow-sm border border-slate-200 dark:border-slate-800'
  },
  // Sub-cards (often bg-white inside tools)
  {
    from: /bg-white rounded-2xl border border-slate-300\/60/g,
    to: 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800'
  },
  {
    from: /bg-white rounded-2xl border border-emerald-200\/80/g,
    to: 'bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700'
  },
  // Text colors
  {
    from: /text-slate-800/g,
    to: 'text-slate-900 dark:text-white'
  },
  {
    from: /text-slate-700/g,
    to: 'text-slate-700 dark:text-slate-300'
  },
  {
    from: /text-slate-600/g,
    to: 'text-slate-600 dark:text-slate-400'
  },
  {
    from: /text-emerald-700/g,
    to: 'text-slate-900 dark:text-white'
  },
  // Buttons
  {
    from: /bg-emerald-600 hover:bg-emerald-700 text-white/g,
    to: 'bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900'
  },
  {
    from: /bg-emerald-600 text-white/g,
    to: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
  },
  {
    from: /focus:border-emerald-500/g,
    to: 'focus:border-slate-900 dark:focus:border-white'
  },
  {
    from: /focus:ring-emerald-500\/20/g,
    to: 'focus:ring-slate-900/10 dark:focus:ring-white/10'
  },
  {
    from: /focus:ring-emerald-500\/10/g,
    to: 'focus:ring-slate-900/10 dark:focus:ring-white/10'
  },
  {
    from: /bg-emerald-50\/30/g,
    to: 'bg-slate-50 dark:bg-slate-900/50'
  },
  {
    from: /border-emerald-500/g,
    to: 'border-slate-900 dark:border-white'
  }
];

for (const file of files) {
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  for (const {from, to} of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(filePath, content);
}
console.log('Fixed tools');
