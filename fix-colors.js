import fs from 'fs';

function fixColors(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/\btext-white\b/g, 'text-[#ffffff]');
  content = content.replace(/\btext-white\/([0-9]+)\b/g, 'text-[#ffffff]/$1');
  
  content = content.replace(/\bbg-white\b/g, 'bg-[#ffffff]');
  content = content.replace(/\bbg-white\/([0-9]+)\b/g, 'bg-[#ffffff]/$1');
  
  content = content.replace(/\bborder-white\b/g, 'border-[#ffffff]');
  content = content.replace(/\bborder-white\/([0-9]+)\b/g, 'border-[#ffffff]/$1');

  fs.writeFileSync(filePath, content);
}

fixColors('src/components/HeaderNav.tsx');
fixColors('src/App.tsx');
console.log('Fixed HeaderNav and App colors to absolute white');
