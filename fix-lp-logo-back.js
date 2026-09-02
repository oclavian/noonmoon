import fs from 'fs';

function replaceSvg(filePath, isHeader) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const oldSvgRegex = /<svg viewBox="0 0 100 100"[\s\S]*?<\/svg>/;
  
  const className = isHeader 
    ? 'w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm select-none' 
    : 'w-5 h-5 drop-shadow-sm select-none';
    
  const newSvg = `<svg viewBox="0 0 70 70" fill="currentColor" className="${className}" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M0,0 H10 V60 H60 V50 H20 V0 H70 V30 H40 V10 H50 V20 H60 V10 H30 V40 H70 V70 H0 Z" />\n                  </svg>`;

  if (content.match(oldSvgRegex)) {
    content = content.replace(oldSvgRegex, newSvg);
    fs.writeFileSync(filePath, content);
    console.log(`Replaced in ${filePath}`);
  } else {
    console.log(`Regex not matched in ${filePath}`);
  }
}

replaceSvg('src/components/HeaderNav.tsx', true);
replaceSvg('src/App.tsx', false);
