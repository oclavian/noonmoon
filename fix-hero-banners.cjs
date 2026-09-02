const fs = require('fs');

function processFile(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // We only want to replace inside the hero banners which have hardcoded gradients
  // Since it's tricky to parse HTML with regex, we can just replace the specific classes 
  // that we know are in the hero section.

  const replacements = [
    { from: 'bg-emerald-950/70', to: 'bg-[#022c22]/70' },
    { from: 'bg-emerald-950/60', to: 'bg-[#022c22]/60' },
    { from: 'border-emerald-700/50', to: 'border-[#047857]/50' },
    { from: 'border-emerald-700/40', to: 'border-[#047857]/40' },
    { from: 'border-emerald-800/40', to: 'border-[#065f46]/40' },
    { from: 'bg-emerald-500/20', to: 'bg-[#10b981]/20' },
    { from: 'border-emerald-500/30', to: 'border-[#10b981]/30' },
    
    // For text colors inside the hero banner
    { from: 'text-white', to: 'text-[#ffffff]' },
    { from: 'text-emerald-100', to: 'text-[#d1fae5]' },
    { from: 'text-emerald-300', to: 'text-[#6ee7b7]' },
    { from: 'text-emerald-400', to: 'text-[#34d399]' },
    
    // Also age calculator
    { from: 'from-emerald-900', to: 'from-[#064e3b]' },
    { from: 'via-emerald-800', to: 'via-[#065f46]' },
    { from: 'to-teal-950', to: 'to-[#042f2e]' },
    { from: 'border-emerald-700/60', to: 'border-[#047857]/60' },
  ];

  // We need to be careful not to replace text-white everywhere.
  // Let's do a targeted replacement block.
  // First, find the block with the hero banner.
  let startIdx = content.indexOf('bg-gradient-to-br from-[');
  if (startIdx === -1) startIdx = content.indexOf('bg-gradient-to-br from-emerald-900');
  
  if (startIdx !== -1) {
    let endIdx = content.indexOf('</div>', startIdx);
    // Find the matching closing div for the hero banner.
    // It's safer to just replace inside a string chunk.
    let chunk = content.substring(startIdx, startIdx + 3000); // 3000 chars should cover the banner
    
    for (const {from, to} of replacements) {
      // replace all occurrences in the chunk
      chunk = chunk.split(from).join(to);
    }
    
    content = content.substring(0, startIdx) + chunk + content.substring(startIdx + 3000);
    fs.writeFileSync(filename, content);
    console.log(`Fixed ${filename}`);
  } else {
    console.log(`Hero banner not found in ${filename}`);
  }
}

processFile('src/components/ServiceDirectory.tsx');
processFile('src/components/tools/BengaliCalendarTool.tsx');
processFile('src/components/tools/BanglaAgeCalculatorTool.tsx');
