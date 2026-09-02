import fs from 'fs';

let content = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');

// Fix remaining hardcoded greens
content = content.replace(/bg-\[#022c22\]\/70/g, 'bg-slate-100 dark:bg-slate-800');
content = content.replace(/border-\[#10b981\]\/30/g, 'border-slate-200 dark:border-slate-700');
content = content.replace(/bg-\[#022c22\]\/80/g, 'bg-slate-50 dark:bg-slate-900');
content = content.replace(/text-\[#6ee7b7\]/g, 'text-slate-600 dark:text-slate-300');
content = content.replace(/text-\[#a7f3d0\]\/70/g, 'text-slate-500 dark:text-slate-400');
content = content.replace(/bg-\[#022c22\]\/50/g, 'bg-slate-100 dark:bg-slate-800');
content = content.replace(/border-\[#065f46\]\/40/g, 'border-slate-200 dark:border-slate-700');
content = content.replace(/text-\[#a7f3d0\]/g, 'text-slate-600 dark:text-slate-300');
content = content.replace(/text-\[#34d399\]/g, 'text-slate-500 dark:text-slate-400');
content = content.replace(/bg-\[#10b981\]\/50/g, 'bg-slate-300 dark:bg-slate-600');
content = content.replace(/bg-\[#022c22\]\/90/g, 'bg-slate-100 dark:bg-slate-800');
content = content.replace(/border-\[#047857\]\/60/g, 'border-slate-200 dark:border-slate-700');
content = content.replace(/border-\[#064e3b\]\/40/g, 'border-slate-200 dark:border-slate-700');
content = content.replace(/bg-\[#064e3b\]\/80/g, 'bg-slate-200 dark:bg-slate-700');
content = content.replace(/border-\[#059669\]\/40/g, 'border-slate-300 dark:border-slate-600');
content = content.replace(/group-hover:bg-\[#047857\]\/90/g, 'group-hover:bg-slate-300 dark:group-hover:bg-slate-600');
content = content.replace(/text-\[#34d399\]/g, 'text-slate-500 dark:text-slate-400');
content = content.replace(/border-t border-\[#064e3b\]\/50/g, 'border-t border-slate-200 dark:border-slate-700');
content = content.replace(/bg-gradient-to-r from-\[#34d399\] via-teal-300 to-\[#34d399\]/g, 'bg-slate-900 dark:bg-white');
content = content.replace(/shadow-\[0_0_8px_rgba\(52,211,153,0\.8\)\]/g, 'shadow-sm');
content = content.replace(/bg-\[#0a1815\]/g, 'bg-white dark:bg-slate-950');
content = content.replace(/border-\[#064e3b\]\/60/g, 'border-slate-200 dark:border-slate-800');
content = content.replace(/text-\[#10b981\]\/60/g, 'text-slate-400 dark:text-slate-500');

fs.writeFileSync('src/components/HeaderNav.tsx', content);
console.log('Fixed HeaderNav remnants');
