import fs from 'fs';
import path from 'path';

const toolsDir = 'src/components/tools';
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Fix inputs/textareas where text becomes invisible
  // The problem is `dark:text-white` makes text dark in dark mode (due to overridden --color-white)
  // And in light mode `focus:bg-white` combined with `dark:text-white` (when OS is dark) caused issues.
  
  // We'll replace the text-slate-900 dark:text-white with just text-slate-900
  // because text-slate-900 automatically becomes light in dark mode due to the custom CSS.
  
  content = content.replace(/text-slate-900 dark:text-white/g, 'text-slate-900');
  
  // Also fix focus:border-slate-900 dark:focus:border-white -> focus:border-slate-900
  content = content.replace(/focus:border-slate-900 dark:focus:border-white/g, 'focus:border-slate-900');
  
  // Also fix focus:ring-slate-900\/10 dark:focus:ring-white\/10 -> focus:ring-slate-900/10
  content = content.replace(/focus:ring-slate-900\/10 dark:focus:ring-white\/10/g, 'focus:ring-slate-900/10');
  
  // Also fix bg-slate-50/50 dark:bg-slate-800/50 etc. Wait, bg-slate-50 is automatically dark in dark mode.
  // We don't need to touch bg.

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
}
