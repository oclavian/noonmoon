import fs from 'fs';

let content = fs.readFileSync('src/components/tools/PdfToolsHub.tsx', 'utf8');

const imports = `import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

pdfjsLib.GlobalWorkerOptions.workerSrc = \`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/\${pdfjsLib.version}/pdf.worker.min.mjs\`;`;

content = content.replace("import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';", imports);

content = content.replace(
  "type PdfToolMode = 'merge' | 'split' | 'watermark' | 'image-to-pdf';",
  "type PdfToolMode = 'merge' | 'split' | 'watermark' | 'image-to-pdf' | 'pdf-to-image';"
);

// Add state for pdf to image
//   const [imageFormat, setImageFormat] = useState<'png' | 'jpeg'>('png');
const stateVars = `const [splitRange, setSplitRange] = useState('1'); // e.g., "1-3, 5"
  const [imageFormat, setImageFormat] = useState<'png' | 'jpeg'>('png');
  const [imageScale, setImageScale] = useState<number>(2);`;

content = content.replace("const [splitRange, setSplitRange] = useState('1'); // e.g., \"1-3, 5\"", stateVars);


const processPdfToImage = `  const processPdfToImage = async () => {
    if (selectedFiles.length !== 1) return;
    setIsProcessing(true);
    try {
      const file = selectedFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      
      const zip = new JSZip();
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: imageScale });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        // Draw white background for jpeg
        if (imageFormat === 'jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        const blob = await new Promise<Blob | null>(resolve => {
          canvas.toBlob(resolve, \`image/\${imageFormat}\`, 0.95);
        });
        
        if (blob) {
          const extension = imageFormat === 'jpeg' ? 'jpg' : 'png';
          zip.file(\`page-\${i}.\${extension}\`, blob);
        }
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      createDownloadUrl(new Uint8Array(await zipBlob.arrayBuffer()), \`\${file.name.replace('.pdf', '')}_images.zip\`);
      
    } catch (err) {
      console.error(err);
      alert(t('পিডিএফ থেকে ছবি তৈরি করতে সমস্যা হয়েছে।', 'Failed to convert PDF to images.'));
    }
    setIsProcessing(false);
  };`;

content = content.replace("const createDownloadUrl", processPdfToImage + "\n\n  const createDownloadUrl");

content = content.replace(
  "else if (activeMode === 'image-to-pdf') processImageToPdf();",
  "else if (activeMode === 'image-to-pdf') processImageToPdf();\n    else if (activeMode === 'pdf-to-image') processPdfToImage();"
);

const newMode = `{ id: 'image-to-pdf', icon: <ImageIcon className="w-5 h-5" />, labelBn: 'ইমেজ থেকে পিডিএফ', labelEn: 'Image to PDF' },
    { id: 'pdf-to-image', icon: <ImageIcon className="w-5 h-5" />, labelBn: 'পিডিএফ থেকে ইমেজ', labelEn: 'PDF to Image' },`;

content = content.replace(
  `{ id: 'image-to-pdf', icon: <ImageIcon className="w-5 h-5" />, labelBn: 'ইমেজ থেকে পিডিএফ', labelEn: 'Image to PDF' },`,
  newMode
);

const acceptFix = `multiple={activeMode === 'merge' || activeMode === 'image-to-pdf'}
            accept={activeMode === 'image-to-pdf' ? "image/png, image/jpeg" : ".pdf"}`;

// Let's replace the UI elements carefully
fs.writeFileSync('src/components/tools/PdfToolsHub.tsx', content);
