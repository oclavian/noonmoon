import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replacements
  content = content.replace(/লিপিক/g, 'নুন-মুন');
  content = content.replace(/Lipik/g, 'Noon-Moon');
  content = content.replace(/lipik/g, 'noon-moon');
  
  fs.writeFileSync(filePath, content);
}

const files = [
  'metadata.json',
  'index.html',
  'src/App.tsx',
  'src/components/HeaderNav.tsx',
  'src/components/LegalModal.tsx',
  'src/components/SEO.tsx',
  'src/components/tools/BanglaAgeCalculatorTool.tsx',
  'src/utils/documentExport.ts',
  'src/locales/translations.ts'
];

files.forEach(replaceInFile);
console.log("Renamed successfully!");
