import fs from 'fs';
import path from 'path';

const toolsDir = 'src/components/tools';
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
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
  
  content = content.replace(/teal-500/g, 'pink-500');
  content = content.replace(/teal-400/g, 'pink-400');
  content = content.replace(/teal-300/g, 'pink-300');
  content = content.replace(/teal-200/g, 'pink-200');
  content = content.replace(/teal-100/g, 'pink-100');
  content = content.replace(/teal-50/g, 'pink-50');
  content = content.replace(/teal-600/g, 'pink-600');
  content = content.replace(/teal-700/g, 'pink-700');
  content = content.replace(/teal-800/g, 'pink-800');
  
  fs.writeFileSync(filePath, content);
}
console.log('Fixed tools to Salbuta purple/pink theme');
