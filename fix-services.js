import fs from 'fs';
let content = fs.readFileSync('src/data/banglaServicesData.ts', 'utf8');
const newService = `
  {
    id: 'pdf-tools',
    name: 'Free PDF Tools & Editor',
    nameBn: 'ফ্রি পিডিএফ এডিটর ও টুলস',
    category: 'pdf-tools',
    description: 'Merge, split, watermark, and modify any PDF file directly from the browser for free.',
    descriptionBn: 'ব্রাউজার থেকেই সম্পূর্ণ ফ্রিতে পিডিএফ জোড়া লাগানো, আলাদা করা, ইমেজ থেকে পিডিএফ তৈরি ও অন্যান্য টুলস।',
    url: '#',
    isExternal: false,
    internalTab: 'pdf-tools',
    badge: 'New',
    popular: true,
    status: 'active',
  },
];
`;
content = content.replace('];', newService);
fs.writeFileSync('src/data/banglaServicesData.ts', content);
