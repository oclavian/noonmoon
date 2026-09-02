import fs from 'fs';

let content = fs.readFileSync('src/components/tools/PdfToolsHub.tsx', 'utf8');
content = content.replace(/    <\/div>\n  \);\n};\n/g, '    </section>\n  );\n};\n');
fs.writeFileSync('src/components/tools/PdfToolsHub.tsx', content);
