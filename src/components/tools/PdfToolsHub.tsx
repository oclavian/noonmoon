import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, Image as ImageIcon, Layers, SplitSquareHorizontal, Download, Trash2, Plus, Type, FileOutput } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

type PdfToolMode = 'merge' | 'split' | 'watermark' | 'image-to-pdf' | 'pdf-to-image';

export const PdfToolsHub: React.FC = () => {
  const { language } = useLanguage();
  const [activeMode, setActiveMode] = useState<PdfToolMode>('merge');
  
  // File state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [watermarkText, setWatermarkText] = useState('Confidential');
  const [splitRange, setSplitRange] = useState('1'); // e.g., "1-3, 5"
  const [imageFormat, setImageFormat] = useState<'png' | 'jpeg'>('png');
  const [imageScale, setImageScale] = useState<number>(2);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputFilename, setOutputFilename] = useState<string>('output.pdf');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = (bn: string, en: string) => language === 'bn' ? bn : en;

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setSuccessMessage(null);
    } else {
      setSuccessMessage(msg);
      setErrorMessage(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (activeMode === 'merge' || activeMode === 'image-to-pdf') {
        setSelectedFiles(prev => [...prev, ...files]);
      } else {
        setSelectedFiles([files[0]]); // Only one file for split/watermark
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    if (selectedFiles.length <= 1) {
      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }
      setOutputUrl(null);
    }
  };

  const processMerge = async () => {
    if (selectedFiles.length < 2) {
      showNotification(t('কমপক্ষে দুটি পিডিএফ ফাইল নির্বাচন করুন।', 'Select at least two PDF files.'), true);
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of selectedFiles) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }
      
      const pdfBytes = await mergedPdf.save();
      createDownloadUrl(pdfBytes, 'Merged_Document.pdf');
      showNotification(t('পিডিএফ সফলভাবে মার্জ হয়েছে!', 'PDF merged successfully!'));
    } catch (err) {
      console.error(err);
      showNotification(t('ফাইল মার্জ করতে সমস্যা হয়েছে। ফাইলের বৈধতা যাচাই করুন।', 'Failed to merge files. Please verify PDF integrity.'), true);
    }
    setIsProcessing(false);
  };

  const processSplit = async () => {
    if (selectedFiles.length !== 1) return;
    
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const fileBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);
      const totalPages = pdf.getPageCount();
      
      // Parse split range (simple implementation: "1-3, 5")
      let pagesToExtract: number[] = [];
      const ranges = splitRange.split(',').map(s => s.trim());
      for (const r of ranges) {
        if (r.includes('-')) {
          const [start, end] = r.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) pagesToExtract.push(i - 1);
          }
        } else {
          const num = Number(r);
          if (num >= 1 && num <= totalPages) pagesToExtract.push(num - 1);
        }
      }
      
      pagesToExtract = [...new Set(pagesToExtract)].sort((a,b) => a-b);
      
      if (pagesToExtract.length === 0) {
        showNotification(t('সঠিক পেজ নম্বর দিন। (যেমন: 1-3, 5)', 'Enter valid page numbers. (e.g., 1-3, 5)'), true);
        setIsProcessing(false);
        return;
      }
      
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);
      copiedPages.forEach(page => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      createDownloadUrl(pdfBytes, 'Split_Document.pdf');
      showNotification(t('পিডিএফ সফলভাবে স্প্লিট হয়েছে!', 'PDF split successfully!'));
    } catch (err) {
      console.error(err);
      showNotification(t('ফাইল স্প্লিট করতে সমস্যা হয়েছে।', 'Failed to split file.'), true);
    }
    setIsProcessing(false);
  };

  const processWatermark = async () => {
    if (selectedFiles.length !== 1 || !watermarkText) return;
    
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const fileBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);
      const helveticaFont = await pdf.embedFont(StandardFonts.HelveticaBold);
      
      const pages = pdf.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText(watermarkText, {
          x: width / 4,
          y: height / 2,
          size: 50,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: 0.3,
          rotate: degrees(45),
        });
      }
      
      const pdfBytes = await pdf.save();
      createDownloadUrl(pdfBytes, 'Watermarked_Document.pdf');
      showNotification(t('ওয়াটারমার্ক সফলভাবে যুক্ত হয়েছে!', 'Watermark added successfully!'));
    } catch (err) {
      console.error(err);
      showNotification(t('ওয়াটারমার্ক যুক্ত করতে সমস্যা হয়েছে।', 'Failed to add watermark.'), true);
    }
    setIsProcessing(false);
  };

  const processImageToPdf = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const newPdf = await PDFDocument.create();
      
      for (const file of selectedFiles) {
        const fileBuffer = await file.arrayBuffer();
        let pdfImage;
        
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          pdfImage = await newPdf.embedJpg(fileBuffer);
        } else if (file.type === 'image/png') {
          pdfImage = await newPdf.embedPng(fileBuffer);
        } else {
          continue; // Skip unsupported
        }
        
        const dims = pdfImage.scale(1);
        const page = newPdf.addPage([dims.width, dims.height]);
        page.drawImage(pdfImage, {
          x: 0,
          y: 0,
          width: dims.width,
          height: dims.height,
        });
      }
      
      const pdfBytes = await newPdf.save();
      createDownloadUrl(pdfBytes, 'Images_Document.pdf');
      showNotification(t('ছবিগুলো দিয়ে সফলভাবে পিডিএফ তৈরি হয়েছে!', 'PDF successfully created from images!'));
    } catch (err) {
      console.error(err);
      showNotification(t('পিডিএফ তৈরি করতে সমস্যা হয়েছে।', 'Failed to create PDF from images.'), true);
    }
    setIsProcessing(false);
  };

  const processPdfToImage = async () => {
    if (selectedFiles.length !== 1) return;
    setIsProcessing(true);
    setErrorMessage(null);
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
        
        await page.render({ canvasContext: ctx, viewport } as any).promise;
        
        const blob = await new Promise<Blob | null>(resolve => {
          canvas.toBlob(resolve, `image/${imageFormat}`, 0.95);
        });
        
        if (blob) {
          const extension = imageFormat === 'jpeg' ? 'jpg' : 'png';
          zip.file(`page-${i}.${extension}`, blob);
        }
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      createDownloadUrl(new Uint8Array(await zipBlob.arrayBuffer()), `${file.name.replace('.pdf', '')}_images.zip`, 'application/zip');
      showNotification(t('পিডিএফ সফলভাবে ছবিতে কনভার্ট হয়েছে!', 'PDF converted to images successfully!'));
    } catch (err) {
      console.error(err);
      showNotification(t('পিডিএফ থেকে ছবি তৈরি করতে সমস্যা হয়েছে।', 'Failed to convert PDF to images.'), true);
    }
    setIsProcessing(false);
  };

  const createDownloadUrl = (bytes: Uint8Array, filename: string, mimeType: string = 'application/pdf') => {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }
    const blob = new Blob([bytes], { type: mimeType });
    const url = URL.createObjectURL(blob);
    setOutputUrl(url);
    setOutputFilename(filename.startsWith('Noon-Moon_') ? filename : `Noon-Moon_${filename}`);
  };

  const handleProcess = () => {
    if (activeMode === 'merge') processMerge();
    else if (activeMode === 'split') processSplit();
    else if (activeMode === 'watermark') processWatermark();
    else if (activeMode === 'image-to-pdf') processImageToPdf();
    else if (activeMode === 'pdf-to-image') processPdfToImage();
  };

  const modes = [
    { id: 'merge', icon: <Layers className="w-5 h-5" />, labelBn: 'পিডিএফ মার্জ', labelEn: 'Merge PDF' },
    { id: 'split', icon: <SplitSquareHorizontal className="w-5 h-5" />, labelBn: 'পিডিএফ স্প্লিট', labelEn: 'Split PDF' },
    { id: 'image-to-pdf', icon: <ImageIcon className="w-5 h-5" />, labelBn: 'ইমেজ থেকে পিডিএফ', labelEn: 'Image to PDF' },
    { id: 'pdf-to-image', icon: <ImageIcon className="w-5 h-5" />, labelBn: 'পিডিএফ থেকে ইমেজ', labelEn: 'PDF to Image' },
    { id: 'watermark', icon: <Type className="w-5 h-5" />, labelBn: 'ওয়াটারমার্ক যুক্ত করুন', labelEn: 'Add Watermark' },
  ] as const;

  const handleModeSwitch = (mode: PdfToolMode) => {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }
    setActiveMode(mode);
    setSelectedFiles([]);
    setOutputUrl(null);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('পিডিএফ এডিটর ও টুলস', 'Free PDF Editor & Tools')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          {t(
            'ব্রাউজার থেকেই সম্পূর্ণ ফ্রিতে যেকোনো পিডিএফ ফাইল জোড়া লাগানো, আলাদা করা, বা জলছাপ দেওয়া যায়। কোনো ফাইল সার্ভারে আপলোড হয় না, তাই এটি ১০০% সুরক্ষিত।',
            'Merge, split, add watermarks, and modify any PDF directly from your browser. No files are uploaded to servers, ensuring 100% privacy.'
          )}
        </p>
      </div>

      {/* Tool Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => handleModeSwitch(mode.id as PdfToolMode)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-[2rem] border transition-all ${
              activeMode === mode.id
                ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
            }`}
          >
            {mode.icon}
            <span className="font-semibold text-sm">{language === 'bn' ? mode.labelBn : mode.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Notifications Banner */}
      {errorMessage && (
        <div role="alert" className="p-4 rounded-[1.5rem] bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center justify-between animate-in fade-in duration-200">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-rose-600 hover:text-rose-800 text-xs font-bold underline ml-4">
            {t('বন্ধ করুন', 'Dismiss')}
          </button>
        </div>
      )}

      {successMessage && (
        <div role="status" className="p-4 rounded-[1.5rem] bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center justify-between animate-in fade-in duration-200">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-800 text-xs font-bold underline ml-4">
            {t('বন্ধ করুন', 'Dismiss')}
          </button>
        </div>
      )}

      <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-8">
        
        {/* Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-slate-300 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 hover:border-purple-400 transition-all text-slate-500"
        >
          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <Plus className="w-7 h-7" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700">
              {t('ফাইল নির্বাচন করুন বা ড্র্যাগ করে আনুন', 'Click to browse or drag files here')}
            </p>
            <p className="text-xs mt-1">
              {activeMode === 'image-to-pdf' ? 'JPG, PNG formats supported' : 'Only PDF files supported'}
            </p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            multiple={activeMode === 'merge' || activeMode === 'image-to-pdf'}
            accept={activeMode === 'image-to-pdf' ? "image/png, image/jpeg" : ".pdf"}
          />
        </div>

        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <FileOutput className="w-4 h-4 text-purple-600" />
              {t('নির্বাচিত ফাইলসমূহ:', 'Selected Files:')}
            </h3>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {selectedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-[1rem] border border-slate-200">
                  <div className="flex items-center gap-3 overflow-hidden">
                    {activeMode === 'image-to-pdf' ? <ImageIcon className="w-5 h-5 text-blue-500 shrink-0" /> : <FileText className="w-5 h-5 text-rose-500 shrink-0" />}
                    <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                  </div>
                  <button onClick={() => removeFile(i)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tool Specific Options */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-[1rem] border border-slate-200">
            {activeMode === 'split' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  {t('কোন্‌ কোন্‌ পেজ আলাদা করতে চান?', 'Which pages to extract?')}
                </label>
                <input 
                  type="text" 
                  value={splitRange} 
                  onChange={(e) => setSplitRange(e.target.value)}
                  placeholder="e.g., 1-3, 5, 8-10"
                  className="w-full px-4 py-2.5 rounded-[1rem] border border-slate-300 bg-white text-slate-900 outline-none focus:border-purple-500"
                />
                <p className="text-xs text-slate-500">{t('উদাহরণ: ১-৩, ৫ (শুধুমাত্র ১ থেকে ৩ নম্বর এবং ৫ নম্বর পেজ)', 'Example: 1-3, 5 (Pages 1 to 3, and 5)')}</p>
              </div>
            )}
            
            {activeMode === 'watermark' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  {t('ওয়াটারমার্ক টেক্সট', 'Watermark Text')}
                </label>
                <input 
                  type="text" 
                  value={watermarkText} 
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Confidential"
                  className="w-full px-4 py-2.5 rounded-[1rem] border border-slate-300 bg-white text-slate-900 outline-none focus:border-purple-500"
                />
              </div>
            )}

            {activeMode === 'merge' && (
              <p className="text-sm text-slate-600">
                {t('উপরের ফাইলগুলো জোড়া লাগিয়ে একটি পিডিএফ ফাইল তৈরি করা হবে।', 'The above files will be merged into a single PDF document.')}
              </p>
            )}

                        {activeMode === 'pdf-to-image' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  {t('পিডিএফের প্রতিটি পেজকে আলাদা ছবিতে রূপান্তর করে একটি জিপ (ZIP) ফাইলে ডাউনলোড করা হবে।', 'Each page of the PDF will be converted to an image and downloaded as a ZIP file.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-bold text-slate-700">
                      {t('ইমেজ ফরম্যাট', 'Image Format')}
                    </label>
                    <select 
                      value={imageFormat} 
                      onChange={(e) => setImageFormat(e.target.value as 'png' | 'jpeg')}
                      className="w-full px-4 py-2.5 rounded-[1rem] border border-slate-300 bg-white text-slate-900 outline-none focus:border-purple-500"
                    >
                      <option value="png">PNG (Best Quality, Transparent bg)</option>
                      <option value="jpeg">JPEG (Smaller file size, White bg)</option>
                    </select>
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-bold text-slate-700">
                      {t('কোয়ালিটি / স্কেল', 'Quality / Scale')}
                    </label>
                    <select 
                      value={imageScale} 
                      onChange={(e) => setImageScale(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-[1rem] border border-slate-300 bg-white text-slate-900 outline-none focus:border-purple-500"
                    >
                      <option value={1.5}>Standard (1.5x)</option>
                      <option value={2}>High (2x)</option>
                      <option value={3}>Ultra High (3x - Best for Print)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'image-to-pdf' && (
              <p className="text-sm text-slate-600">
                {t('উপরের ছবিগুলো দিয়ে একটি পিডিএফ ফাইল তৈরি করা হবে।', 'The above images will be converted into a single PDF document.')}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleProcess}
              disabled={isProcessing}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-[1rem] transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isProcessing ? t('প্রসেসিং হচ্ছে...', 'Processing...') : (activeMode === 'pdf-to-image' ? t('ছবিতে কনভার্ট করুন', 'Convert to Images') : t('পিডিএফ তৈরি করুন', 'Process PDF'))}
            </button>

            {outputUrl && (
              <a 
                href={outputUrl} 
                download={outputFilename}
                className="flex-1 bg-emerald-600 hover:bg-[#005B48] text-white font-bold py-3 px-6 rounded-[1rem] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-center"
              >
                <Download className="w-5 h-5" />
                {t('ডাউনলোড করুন', 'Download Result')}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
