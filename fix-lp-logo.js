import fs from 'fs';

function replaceSvg(filePath, isHeader) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const oldSvgRegex = /<svg viewBox="0 0 [0-9]+ [0-9]+"[\s\S]*?<\/svg>/;
  
  const className = isHeader 
    ? 'w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm select-none' 
    : 'w-5 h-5 drop-shadow-sm select-none';
    
  const newSvg = `<svg viewBox="0 0 100 100" fill="currentColor" className="${className}" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 10 10 V 90 H 45 V 75 H 25 V 10 Z" />
                    <path d="M 55 10 H 90 V 60 H 70 V 90 H 55 Z M 70 25 H 75 V 45 H 70 Z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>`;

  content = content.replace(oldSvgRegex, newSvg);
  fs.writeFileSync(filePath, content);
}

replaceSvg('src/components/HeaderNav.tsx', true);
replaceSvg('src/App.tsx', false);
console.log('Fixed LP logo to clear L and P separate shapes');
