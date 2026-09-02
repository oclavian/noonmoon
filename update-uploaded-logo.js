import fs from 'fs';

// This SVG attempts to recreate the geometric shape from the uploaded image.
// It features an outer pill shape, and interlocking S-curves with central dots inside.
const logoSvg = `<svg viewBox="0 0 100 150" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
  {/* Outer pill shape */}
  <rect x="10" y="10" width="80" height="130" rx="40" ry="40" />
  
  {/* Top circle/curve */}
  <path d="M50 40 A20 20 0 1 0 30 60 C30 80, 70 70, 70 90 A20 20 0 1 1 50 110" />
  
  {/* Center dots */}
  <circle cx="50" cy="40" r="4" fill="currentColor" stroke="none" />
  <circle cx="50" cy="110" r="4" fill="currentColor" stroke="none" />
  
  {/* Diagonal connecting lines simulating the overlap */}
  <path d="M30 75 Q50 65 70 55" />
  <path d="M30 95 Q50 85 70 75" />
</svg>`;

const logoSvgApp = `<svg viewBox="0 0 100 150" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="130" rx="40" ry="40" />
  <path d="M50 40 A20 20 0 1 0 30 60 C30 80, 70 70, 70 90 A20 20 0 1 1 50 110" />
  <circle cx="50" cy="40" r="4" fill="currentColor" stroke="none" />
  <circle cx="50" cy="110" r="4" fill="currentColor" stroke="none" />
  <path d="M30 75 Q50 65 70 55" />
  <path d="M30 95 Q50 85 70 75" />
</svg>`;


let headerContent = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');
headerContent = headerContent.replace(
  /<svg viewBox="0 0 134 100" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm select-none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/,
  logoSvg
);
fs.writeFileSync('src/components/HeaderNav.tsx', headerContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /<svg viewBox="0 0 134 100" fill="currentColor" className="w-5 h-5 drop-shadow-sm select-none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/,
  logoSvgApp
);
fs.writeFileSync('src/App.tsx', appContent);

console.log("Uploaded logo updated");
