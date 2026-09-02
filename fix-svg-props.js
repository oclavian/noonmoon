import fs from 'fs';

const files = ['src/components/HeaderNav.tsx', 'src/App.tsx'];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/stroke-width/g, 'strokeWidth');
    content = content.replace(/stroke-linecap/g, 'strokeLinecap');
    content = content.replace(/stroke-linejoin/g, 'strokeLinejoin');
    fs.writeFileSync(file, content);
  }
}
console.log("Fixed SVG attributes!");
