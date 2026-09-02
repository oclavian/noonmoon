import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');

// Update import
app = app.replace("import { WaveTop } from './components/Waves';", "import { WaveFooter } from './components/Waves';");

// Update JSX and padding
app = app.replace('<footer id="app-global-footer" className="relative bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white mt-24 pt-16 sm:pt-24 pb-8 sm:pb-10">', '<footer id="app-global-footer" className="relative bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white mt-24 pt-8 sm:pt-10 pb-8 sm:pb-10">');
app = app.replace('<WaveTop />', '<WaveFooter />');

fs.writeFileSync('src/App.tsx', app);
console.log('Fixed App.tsx Footer');
