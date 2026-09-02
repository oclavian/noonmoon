import fs from 'fs';

let content = fs.readFileSync('src/components/tools/PdfToolsHub.tsx', 'utf8');

const oldFunc = `  const createDownloadUrl = (pdfBytes: Uint8Array, filename: string) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setOutputUrl(url);
    setOutputFilename(filename);
  };`;

const newFunc = `  const createDownloadUrl = (bytes: Uint8Array, filename: string, mimeType: string = 'application/pdf') => {
    const blob = new Blob([bytes], { type: mimeType });
    const url = URL.createObjectURL(blob);
    setOutputUrl(url);
    setOutputFilename(filename);
  };`;

content = content.replace(oldFunc, newFunc);

content = content.replace(
  "createDownloadUrl(new Uint8Array(await zipBlob.arrayBuffer()), `${file.name.replace('.pdf', '')}_images.zip`);",
  "createDownloadUrl(new Uint8Array(await zipBlob.arrayBuffer()), `${file.name.replace('.pdf', '')}_images.zip`, 'application/zip');"
);

fs.writeFileSync('src/components/tools/PdfToolsHub.tsx', content);
