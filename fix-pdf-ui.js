import fs from 'fs';

let content = fs.readFileSync('src/components/tools/PdfToolsHub.tsx', 'utf8');

// Add options UI for pdf-to-image
const optionsUI = `            {activeMode === 'pdf-to-image' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t('পিডিএফের প্রতিটি পেজকে আলাদা ছবিতে রূপান্তর করে একটি জিপ (ZIP) ফাইলে ডাউনলোড করা হবে।', 'Each page of the PDF will be converted to an image and downloaded as a ZIP file.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {t('ইমেজ ফরম্যাট', 'Image Format')}
                    </label>
                    <select 
                      value={imageFormat} 
                      onChange={(e) => setImageFormat(e.target.value as 'png' | 'jpeg')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 outline-none focus:border-purple-500"
                    >
                      <option value="png">PNG (Best Quality, Transparent bg)</option>
                      <option value="jpeg">JPEG (Smaller file size, White bg)</option>
                    </select>
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {t('কোয়ালিটি / স্কেল', 'Quality / Scale')}
                    </label>
                    <select 
                      value={imageScale} 
                      onChange={(e) => setImageScale(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 outline-none focus:border-purple-500"
                    >
                      <option value={1.5}>Standard (1.5x)</option>
                      <option value={2}>High (2x)</option>
                      <option value={3}>Ultra High (3x - Best for Print)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}`;

content = content.replace("{activeMode === 'image-to-pdf' && (", optionsUI + "\n\n            {activeMode === 'image-to-pdf' && (");

// Change button text dynamically
content = content.replace("{isProcessing ? t('প্রসেসিং হচ্ছে...', 'Processing...') : t('পিডিএফ তৈরি করুন', 'Process PDF')}", "{isProcessing ? t('প্রসেসিং হচ্ছে...', 'Processing...') : (activeMode === 'pdf-to-image' ? t('ছবিতে কনভার্ট করুন', 'Convert to Images') : t('পিডিএফ তৈরি করুন', 'Process PDF'))}");

// Fix 5 icons in a grid of 4
content = content.replace("grid grid-cols-2 md:grid-cols-4 gap-3", "grid grid-cols-2 md:grid-cols-5 gap-3");

fs.writeFileSync('src/components/tools/PdfToolsHub.tsx', content);
