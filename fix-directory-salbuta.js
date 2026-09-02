import fs from 'fs';

let content = fs.readFileSync('src/components/ServiceDirectory.tsx', 'utf8');

// Replace remaining emeralds with purple/blue
content = content.replace(/emerald-500/g, 'purple-500');
content = content.replace(/emerald-400/g, 'purple-400');
content = content.replace(/emerald-300/g, 'purple-300');
content = content.replace(/emerald-200/g, 'purple-200');
content = content.replace(/emerald-100/g, 'purple-100');
content = content.replace(/emerald-50/g, 'purple-50');
content = content.replace(/emerald-600/g, 'purple-600');
content = content.replace(/emerald-700/g, 'purple-700');
content = content.replace(/emerald-800/g, 'purple-800');
content = content.replace(/emerald-900/g, 'purple-900');
content = content.replace(/emerald-950/g, 'purple-950');

fs.writeFileSync('src/components/ServiceDirectory.tsx', content);
console.log('Fixed ServiceDirectory to Salbuta purple/pink theme');
