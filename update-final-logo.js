import fs from 'fs';

const logoSvg = `<svg viewBox="0 0 100 180" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="h-6 sm:h-7 w-auto drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Pill -->
  <rect x="6" y="6" width="88" height="168" rx="44" ry="44" />
  
  <!-- Dots -->
  <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
  <circle cx="50" cy="130" r="5" fill="currentColor" stroke="none" />
  
  <!-- Outer Track -->
  <path d="M 78 50 
           A 28 28 0 1 0 22 50
           C 22 90, 78 90, 78 130
           A 28 28 0 1 1 22 130" />
           
  <!-- Inner Track -->
  <path d="M 64 50 
           A 14 14 0 1 0 36 50
           C 36 90, 64 90, 64 130
           A 14 14 0 1 1 36 130" />
</svg>`;

const logoSvgApp = `<svg viewBox="0 0 100 180" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-auto drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="6" width="88" height="168" rx="44" ry="44" />
  <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
  <circle cx="50" cy="130" r="5" fill="currentColor" stroke="none" />
  <path d="M 78 50 A 28 28 0 1 0 22 50 C 22 90, 78 90, 78 130 A 28 28 0 1 1 22 130" />
  <path d="M 64 50 A 14 14 0 1 0 36 50 C 36 90, 64 90, 64 130 A 14 14 0 1 1 36 130" />
</svg>`;

let headerContent = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');
headerContent = headerContent.replace(/<svg viewBox="[^"]+" fill="[^"]+" stroke="[^"]+" strokeWidth="[^"]+" strokeLinecap="[^"]+" strokeLinejoin="[^"]+" className="[^"]+" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/, logoSvg);
fs.writeFileSync('src/components/HeaderNav.tsx', headerContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/<svg viewBox="[^"]+" fill="[^"]+" stroke="[^"]+" strokeWidth="[^"]+" strokeLinecap="[^"]+" strokeLinejoin="[^"]+" className="[^"]+" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/, logoSvgApp);
fs.writeFileSync('src/App.tsx', appContent);

console.log("Updated to final geometric logo!");
