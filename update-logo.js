import fs from 'fs';

const logoSvg = `<svg viewBox="0 0 134 100" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="20" width="14" height="60" />
                    <rect x="42" y="20" width="14" height="60" />
                    <polygon points="10,20 30,20 56,80 36,80" />
                    <rect x="70" y="20" width="14" height="60" />
                    <rect x="110" y="20" width="14" height="60" />
                    <polygon points="70,20 90,20 102,70 88,70" />
                    <polygon points="124,20 104,20 92,70 106,70" />
                  </svg>`;

const logoSvgApp = `<svg viewBox="0 0 134 100" fill="currentColor" className="w-5 h-5 drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="20" width="14" height="60" />
                    <rect x="42" y="20" width="14" height="60" />
                    <polygon points="10,20 30,20 56,80 36,80" />
                    <rect x="70" y="20" width="14" height="60" />
                    <rect x="110" y="20" width="14" height="60" />
                    <polygon points="70,20 90,20 102,70 88,70" />
                    <polygon points="124,20 104,20 92,70 106,70" />
                  </svg>`;


let headerContent = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');
headerContent = headerContent.replace(
  /<svg viewBox="0 0 70 70" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm select-none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/,
  logoSvg
);
fs.writeFileSync('src/components/HeaderNav.tsx', headerContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /<svg viewBox="0 0 70 70" fill="currentColor" className="w-5 h-5 drop-shadow-sm select-none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/,
  logoSvgApp
);
fs.writeFileSync('src/App.tsx', appContent);

console.log("Logo updated");
