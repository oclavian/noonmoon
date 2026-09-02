import fs from 'fs';

const imgTagHeader = `<img src="/noon-moon-logo.png" alt="Noon-Moon Logo" className="w-full h-full object-cover drop-shadow-sm select-none" />`;
const imgTagApp = `<img src="/noon-moon-logo.png" alt="Noon-Moon Logo" className="w-full h-full object-cover drop-shadow-sm select-none" />`;

let headerContent = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');
headerContent = headerContent.replace(/<svg viewBox="[^"]+" fill="[^"]+" stroke="[^"]+" strokeWidth="[^"]+" strokeLinecap="[^"]+" strokeLinejoin="[^"]+" className="[^"]+" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/, imgTagHeader);
fs.writeFileSync('src/components/HeaderNav.tsx', headerContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/<svg viewBox="[^"]+" fill="[^"]+" stroke="[^"]+" strokeWidth="[^"]+" strokeLinecap="[^"]+" strokeLinejoin="[^"]+" className="[^"]+" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/, imgTagApp);
fs.writeFileSync('src/App.tsx', appContent);

console.log("Replaced SVG with image tag!");
