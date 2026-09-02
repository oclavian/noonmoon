import fs from 'fs';

let headerContent = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');
headerContent = headerContent.replace(/<!-- Outer Pill -->/g, '{/* Outer Pill */}');
headerContent = headerContent.replace(/<!-- Dots -->/g, '{/* Dots */}');
headerContent = headerContent.replace(/<!-- Outer Track -->/g, '{/* Outer Track */}');
headerContent = headerContent.replace(/<!-- Inner Track -->/g, '{/* Inner Track */}');
fs.writeFileSync('src/components/HeaderNav.tsx', headerContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/<!-- Outer Pill -->/g, '');
appContent = appContent.replace(/<!-- Dots -->/g, '');
appContent = appContent.replace(/<!-- Outer Track -->/g, '');
appContent = appContent.replace(/<!-- Inner Track -->/g, '');
fs.writeFileSync('src/App.tsx', appContent);

console.log("Fixed JSX comments!");
