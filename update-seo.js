import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const updatedGetSeoData = `const getSeoData = (tab: TabType, lang: 'en' | 'bn') => {
  const baseUrl = 'https://lipik.tools';
  const urlPath = tab === 'directory' ? '' : \`/\${tab}\`;
  const canonicalUrl = \`\${baseUrl}\${urlPath}\`;

  const data: Record<string, any> = {
    directory: {
      title: lang === 'bn' ? 'লিপিক (Lipik) | বাংলা ভাষার ডিজিটাল টুলস ও সেবা হাব' : 'Lipik | Bengali Digital Tools & Service Hub',
      desc: lang === 'bn' ? 'লিপিক - বাংলা কিবোর্ড কনভার্টার, পঞ্জিকা, বয়স ক্যালকুলেটর ও সকল ডিজিটাল সেবার একটি আধুনিক হাব।' : 'Lipik - A modern hub for Bengali keyboard converters, calendar, age calculator and digital services.',
      schemaType: 'WebSite'
    },
    phonetic: {
      title: lang === 'bn' ? 'অভ্র ফোনেটিক থেকে বাংলা (Avro to Bangla) | লিপিক' : 'Avro Phonetic to Bangla Converter | Lipik',
      desc: lang === 'bn' ? 'ইংরেজিতে (Banglish) লিখলে সরাসরি সঠিক বাংলা ইউনিকোড টেক্সটে রূপান্তরিত হবে। সাথে ভয়েস টাইপিং সুবিধা।' : 'Type in Banglish (English) to convert automatically to standard Bengali Unicode text. Includes Voice Typing.',
      schemaType: 'WebApplication'
    },
    'bijoy-unicode': {
      title: lang === 'bn' ? 'বিজয় থেকে ইউনিকোড কনভার্টার (Bijoy to Unicode) | লিপিক' : 'Bijoy to Unicode Converter | Lipik',
      desc: lang === 'bn' ? 'সুতন্বী এমজে (SutonnyMJ) বা বিজয় থেকে ইউনিকোডে এবং ইউনিকোড থেকে বিজয়ে নির্ভুল কনভার্টার।' : '100% accurate SutonnyMJ/Bijoy to Unicode and Unicode to Bijoy text converter.',
      schemaType: 'WebApplication'
    },
    'calendar': {
      title: lang === 'bn' ? 'বাংলা ক্যালেন্ডার ও পঞ্জিকা | লিপিক' : 'Bengali Calendar & Panjika | Lipik',
      desc: lang === 'bn' ? 'আজকের বাংলা তারিখ, বঙ্গাব্দ সন, ঋতু ও সরকারি ছুটির দিনের সম্পূর্ণ তালিকা ও পঞ্জিকা।' : 'Today\\'s Bengali date, Bongabdo, seasons, and complete list of government holidays.',
      schemaType: 'WebApplication'
    },
    'age-calculator': {
      title: lang === 'bn' ? 'বাংলা বয়স ও জন্মতারিখ ক্যালকুলেটর | লিপিক' : 'Bangla Age Calculator | Lipik',
      desc: lang === 'bn' ? 'আপনার জন্মতারিখ দিয়ে নির্ভুল বছর, মাস, দিন, বঙ্গাব্দ এবং পরবর্তী জন্মদিনের হিসাব বের করুন।' : 'Calculate accurate age in years, months, days, Bongabdo, and track upcoming birthdays.',
      schemaType: 'WebApplication'
    },
    'templates': {
      title: lang === 'bn' ? 'বাংলা টেমপ্লেট ও ফরম | লিপিক' : 'Bengali Templates & Forms | Lipik',
      desc: lang === 'bn' ? 'বিভিন্ন উৎসব, শুভেচ্ছা বার্তা বা সাধারণ মেসেজ পাঠানোর জন্য চমৎকার সব রেডিমেড বাংলা টেমপ্লেট।' : 'Ready-made Bengali templates for festivals, greetings, and official forms.',
      schemaType: 'WebApplication'
    },
    'number-words': {
      title: lang === 'bn' ? 'সংখ্যা থেকে কথায় রূপান্তর | লিপিক' : 'Number to Words Converter | Lipik',
      desc: lang === 'bn' ? 'যেকোনো বড় সংখ্যা বা টাকার পরিমাণ লিখলে সেটি স্বয়ংক্রিয়ভাবে কথায় (বাংলা টেক্সটে) রূপান্তর করে দেওয়ার টুল।' : 'Convert any large number or currency amount automatically into Bengali text (words).',
      schemaType: 'WebApplication'
    },
    'analyzer': {
      title: lang === 'bn' ? 'বাংলা টেক্সট অ্যানালাইজার | লিপিক' : 'Bengali Text Analyzer | Lipik',
      desc: lang === 'bn' ? 'বাংলা টেক্সটের শব্দ সংখ্যা, অক্ষর সংখ্যা, পড়ার সময় এবং বিস্তারিত পরিসংখ্যান বের করুন।' : 'Analyze Bengali text for word count, character count, reading time, and detailed statistics.',
      schemaType: 'WebApplication'
    },
    'spell-dict': {
      title: lang === 'bn' ? 'বাংলা বানান ও অভিধান | লিপিক' : 'Bengali Spelling & Dictionary | Lipik',
      desc: lang === 'bn' ? 'শুদ্ধ বাংলা বানান যাচাই, সমার্থক শব্দ ও বাংলা ডিকশনারি বা অভিধান।' : 'Check correct Bengali spelling, find synonyms, and use the Bengali dictionary.',
      schemaType: 'WebApplication'
    },
    'fonts': {
      title: lang === 'bn' ? 'বাংলা ফন্ট গ্যালারি | লিপিক' : 'Bengali Font Gallery | Lipik',
      desc: lang === 'bn' ? 'আকর্ষণীয় ও জনপ্রিয় সব বাংলা ফন্টের লাইভ প্রিভিউ ও শোকেস।' : 'Live preview and showcase of popular and attractive Bengali fonts.',
      schemaType: 'WebApplication'
    },
    'pdf-tools': {
      title: lang === 'bn' ? 'ফ্রি পিডিএফ এডিটর ও টুলস | লিপিক' : 'Free PDF Editor & Tools | Lipik',
      desc: lang === 'bn' ? 'ব্রাউজার থেকেই সম্পূর্ণ ফ্রিতে পিডিএফ জোড়া লাগানো, আলাদা করা বা এডিট করার টুলস।' : 'Merge, split, watermark, and modify any PDF file directly from the browser for free.',
      schemaType: 'WebApplication'
    }
  };

  const item = data[tab] || data.directory;
  
  // Generate Schema.org JSON-LD dynamically
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": item.schemaType,
    "name": item.title,
    "description": item.desc,
    "url": canonicalUrl,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return {
    title: item.title,
    desc: item.desc,
    canonicalUrl,
    schemaMarkup: JSON.stringify(schemaObj)
  };
};`;

// Regex to replace the old getSeoData block
content = content.replace(/const getSeoData = \(tab: TabType, lang: 'en' \| 'bn'\) => \{[\s\S]*?return data\[tab\] \|\| data\.directory;\n\};/, updatedGetSeoData);

// Now update `<SEO title={seoData.title} description={seoData.desc} />`
content = content.replace(
  /<SEO title=\{seoData\.title\} description=\{seoData\.desc\} \/>/,
  `<SEO 
        title={seoData.title} 
        description={seoData.desc} 
        canonicalUrl={seoData.canonicalUrl}
        schemaMarkup={seoData.schemaMarkup}
      />`
);

fs.writeFileSync('src/App.tsx', content);
