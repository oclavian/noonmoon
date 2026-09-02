import fs from 'fs';

let content = fs.readFileSync('src/components/tools/PdfToolsHub.tsx', 'utf8');

// The error is at page.render({ canvasContext: ctx, viewport }).promise;
// Let's cast to any or add canvas? Let's just cast to any.
content = content.replace(
  "await page.render({ canvasContext: ctx, viewport }).promise;",
  "await page.render({ canvasContext: ctx, viewport } as any).promise;"
);

fs.writeFileSync('src/components/tools/PdfToolsHub.tsx', content);
