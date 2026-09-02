// Curated High-Utility Official Bengali Application and Form Templates

export interface TemplateField {
  key: string;
  label: string;
  labelEn: string;
  placeholder: string;
  defaultValue: string;
  type?: 'text' | 'date' | 'textarea' | 'number';
}

export interface BanglaTemplate {
  id: string;
  title: string;
  titleEn: string;
  category: 'office' | 'academic' | 'bank' | 'legal' | 'civic';
  categoryLabelBn: string;
  categoryLabelEn: string;
  description: string;
  fields: TemplateField[];
  generateContent: (values: Record<string, string>) => {
    title: string;
    bodyHtml: string;
    bodyText: string;
  };
}

export const BANGLA_TEMPLATES: BanglaTemplate[] = [
  {
    id: 'office-leave',
    title: 'কর্মক্ষেত্রে ছুটির আবেদন পত্র',
    titleEn: 'Office Leave Application',
    category: 'office',
    categoryLabelBn: 'চাকরি ও অফিস',
    categoryLabelEn: 'Office & Job',
    description: 'অফিসে অসুস্থতা, পারিবারিক বা জরুরি কারণে নৈমিত্তিক ছুটির প্রমিত আবেদন।',
    fields: [
      { key: 'recipientTitle', label: 'প্রাপকের পদবি', labelEn: 'Recipient Designation', placeholder: 'ব্যবস্থাপনা পরিচালক / বিভাগীয় প্রধান', defaultValue: 'বিভাগীয় প্রধান' },
      { key: 'companyName', label: 'প্রতিষ্ঠানের নাম', labelEn: 'Company/Organization Name', placeholder: 'যেমন: এবিসি সফটওয়্যার লিমিটেড', defaultValue: 'এবিসি টেকনোলজিস লিমিটেড' },
      { key: 'companyAddress', label: 'প্রতিষ্ঠানের ঠিকানা', labelEn: 'Office Address', placeholder: 'যেমন: মতিঝিল, ঢাকা', defaultValue: 'মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০' },
      { key: 'applicantName', label: 'আবেদনকারীর নাম', labelEn: 'Applicant Name', placeholder: 'আপনার পূর্ণ নাম', defaultValue: 'মোহাম্মদ রফিকুল ইসলাম' },
      { key: 'applicantDesignation', label: 'আবেদনকারীর পদবি', labelEn: 'Designation & Dept', placeholder: 'যেমন: সিনিয়র অফিসার', defaultValue: 'সিনিয়র এক্সিকিউটিভ (অপারেশনস)' },
      { key: 'leaveDays', label: 'ছুটির সংখ্যা (দিন)', labelEn: 'Number of Days', placeholder: 'যেমন: ৩', defaultValue: '৩' },
      { key: 'fromDate', label: 'শুরুর তারিখ', labelEn: 'From Date', placeholder: 'যেমন: ০১ মার্চ ২০২৬', defaultValue: '০১ মার্চ ২০২৬' },
      { key: 'toDate', label: 'শেষের তারিখ', labelEn: 'To Date', placeholder: 'যেমন: ০৩ মার্চ ২০২৬', defaultValue: '০৩ মার্চ ২০২৬' },
      { key: 'reason', label: 'ছুটির কারণ', labelEn: 'Reason for Leave', placeholder: 'যেমন: শারীরিক অসুস্থতার কারণে', defaultValue: 'হঠাৎ তীব্র জ্বর ও শারীরিক অসুস্থতার কারণে' },
      { key: 'date', label: 'আবেদনের তারিখ', labelEn: 'Application Date', placeholder: 'যেমন: ২৮ ফেব্রুয়ারি ২০২৬', defaultValue: '২৮ ফেব্রুয়ারি ২০২৬' },
    ],
    generateContent: (vals) => {
      const text = `বরাবর,
${vals.recipientTitle || 'বিভাগীয় প্রধান'}
${vals.companyName || 'প্রতিষ্ঠানের নাম'}
${vals.companyAddress || 'ঠিকানা'}

বিষয়: ${vals.leaveDays || '৩'} দিনের নৈমিত্তিক ছুটির জন্য আবেদন।

মহোদয়,
যথাবিহিত সম্মান প্রদর্শন পূর্বক নিবেদন এই যে, আমি আপনার প্রতিষ্ঠানে '${vals.applicantDesignation || 'কর্মকর্তা'}' হিসেবে কর্মরত আছি। ${vals.reason || 'জরুরি ব্যক্তিগত কারণে'} আগামী ${vals.fromDate || '...'} থেকে ${vals.toDate || '...'} তারিখ পর্যন্ত মোট ${vals.leaveDays || '৩'} দিন আমার পক্ষে অফিসে উপস্থিত থাকা সম্ভব হবে না।

অতএব, বিনীত প্রার্থনা এই যে, উপর্যুক্ত বিষয়টি বিবেচনা করে আমাকে উক্ত ${vals.leaveDays || '৩'} দিনের ছুটি মঞ্জুর করে বাধিত করবেন।

বিনীত নিবেদক,
${vals.applicantName || 'আবেদনকারী'}
${vals.applicantDesignation || 'পদবি'}
তারিখ: ${vals.date || '...'}`;

      const html = `
        <div style="font-family: inherit; line-height: 1.8;">
          <p><strong>তারিখ:</strong> ${vals.date || '...'}</p>
          <p>
            <strong>বরাবর,</strong><br/>
            ${vals.recipientTitle || 'বিভাগীয় প্রধান'}<br/>
            ${vals.companyName || 'প্রতিষ্ঠানের নাম'}<br/>
            ${vals.companyAddress || 'ঠিকানা'}
          </p>
          <p><strong>বিষয়: ${vals.leaveDays || '৩'} দিনের নৈমিত্তিক ছুটির জন্য আবেদন।</strong></p>
          <p>জনাব,</p>
          <p>
            যথাবিহিত সম্মান প্রদর্শন পূর্বক নিবেদন এই যে, আমি আপনার স্বনামধন্য প্রতিষ্ঠানে <strong>${vals.applicantDesignation || 'কর্মকর্তা'}</strong> পদে সততা ও নিষ্ঠার সাথে দায়িত্ব পালন করে আসছি। ${vals.reason || 'জরুরি প্রয়োজনে'} আগামী <strong>${vals.fromDate || '...'}</strong> হতে <strong>${vals.toDate || '...'}</strong> তারিখ পর্যন্ত মোট <strong>${vals.leaveDays || '৩'}</strong> দিন আমার পক্ষে অফিসে উপস্থিত থাকা সম্ভব হবে না।
          </p>
          <p>
            অতএব, মহোদয়ের নিকট আকুল প্রার্থনা, উক্ত বিষয়সমূহ সদয় বিবেচনাপূর্বক আমাকে বর্ণিত ${vals.leaveDays || '৩'} দিনের ছুটি মঞ্জুর করে কৃতজ্ঞতাপাশে আবদ্ধ করবেন।
          </p>
          <br/>
          <div style="margin-top: 40px; display: flex; justify-content: flex-end;">
            <div style="text-align: left; min-width: 200px;">
              <p>
                <strong>বিনীত নিবেদক,</strong><br/>
                ${vals.applicantName || 'আবেদনকারী'}<br/>
                ${vals.applicantDesignation || 'পদবি'}<br/>
                ${vals.companyName || 'প্রতিষ্ঠান'}
              </p>
            </div>
          </div>
        </div>
      `;

      return { title: 'ছুটির আবেদন পত্র', bodyHtml: html, bodyText: text };
    }
  },
  {
    id: 'school-leave',
    title: 'শিক্ষা প্রতিষ্ঠানে ছুটির দরখাস্ত',
    titleEn: 'Academic Leave Application',
    category: 'academic',
    categoryLabelBn: 'শিক্ষা ও স্কুল-কলেজ',
    categoryLabelEn: 'School & College',
    description: 'প্রধান শিক্ষক / অধ্যক্ষের নিকট অগ্রিম বা অনুপস্থিতির ছুটির আবেদন পত্র।',
    fields: [
      { key: 'headTitle', label: 'প্রধানের পদবি', labelEn: 'Head Title', placeholder: 'প্রধান শিক্ষক / অধ্যক্ষ', defaultValue: 'প্রধান শিক্ষক' },
      { key: 'schoolName', label: 'শিক্ষা প্রতিষ্ঠানের নাম', labelEn: 'School/College Name', placeholder: 'যেমন: ঢাকা আইডিয়াল স্কুল', defaultValue: 'মতিঝিল সরকারি উচ্চ বিদ্যালয়' },
      { key: 'schoolAddress', label: 'প্রতিষ্ঠানের ঠিকানা', labelEn: 'Location', placeholder: 'যেমন: মতিঝিল, ঢাকা', defaultValue: 'মতিঝিল, ঢাকা' },
      { key: 'studentName', label: 'শিক্ষার্থীর নাম', labelEn: 'Student Name', placeholder: 'আপনার পূর্ণ নাম', defaultValue: 'তানভীর হাসান' },
      { key: 'studentClass', label: 'শ্রেণি ও রোল', labelEn: 'Class & Roll', placeholder: 'যেমন: ৯ম শ্রেণি, রোল: ০৫', defaultValue: '১০ম শ্রেণি, শাখা: ক, রোল: ০৩' },
      { key: 'leaveDays', label: 'ছুটির পরিমাণ (দিন)', labelEn: 'Days', placeholder: 'যেমন: ২', defaultValue: '২' },
      { key: 'fromDate', label: 'শুরুর তারিখ', labelEn: 'From Date', placeholder: 'যেমন: ১০ মার্চ ২০২৬', defaultValue: '১০ মার্চ ২০২৬' },
      { key: 'toDate', label: 'শেষের তারিখ', labelEn: 'To Date', placeholder: 'যেমন: ১১ মার্চ ২০২৬', defaultValue: '১১ মার্চ ২০২৬' },
      { key: 'reason', label: 'অনুপস্থিতির কারণ', labelEn: 'Reason', placeholder: 'যেমন: পারিবারিক জরুরি অনুষ্ঠান / অসুস্থতা', defaultValue: 'আমার বড় বোনের বিবাহ উপলক্ষ্যে গ্রামের বাড়ি যাওয়ার কারণে' },
      { key: 'date', label: 'তারিখ', labelEn: 'Date', placeholder: 'যেমন: ০৮ মার্চ ২০২৬', defaultValue: '০৮ মার্চ ২০২৬' },
    ],
    generateContent: (vals) => {
      const text = `তারিখ: ${vals.date}
বরাবর,
${vals.headTitle}
${vals.schoolName}
${vals.schoolAddress}

বিষয়: ছুটির জন্য আবেদন।

মহোদয়,
বিনীত নিবেদন এই যে, আমি আপনার বিদ্যালয়ের ${vals.studentClass}-এর একজন নিয়মিত শিক্ষার্থী। ${vals.reason} আগামী ${vals.fromDate} থেকে ${vals.toDate} পর্যন্ত মোট ${vals.leaveDays} দিন বিদ্যালয়ে উপস্থিত থাকতে পারব না।

অতএব, বিনীত প্রার্থনা এই যে, আমাকে উক্ত ${vals.leaveDays} দিনের ছুটি মঞ্জুর করতে আপনার সদয় মর্জি হয়।

বিনীত নিবেদক,
আপনার একান্ত অনুগত ছাত্র/ছাত্রী,
${vals.studentName}
${vals.studentClass}`;

      const html = `
        <div style="font-family: inherit; line-height: 1.8;">
          <p><strong>তারিখ:</strong> ${vals.date}</p>
          <p>
            <strong>বরাবর,</strong><br/>
            ${vals.headTitle}<br/>
            ${vals.schoolName}<br/>
            ${vals.schoolAddress}
          </p>
          <p><strong>বিষয়: ${vals.leaveDays} দিনের ছুটির জন্য আবেদন।</strong></p>
          <p>জনাব,</p>
          <p>
            বিনীত নিবেদন এই যে, আমি আপনার স্বনামধন্য শিক্ষা প্রতিষ্ঠানের <strong>${vals.studentClass}</strong>-এর একজন নিয়মিত শিক্ষার্থী। ${vals.reason} আগামী <strong>${vals.fromDate}</strong> হতে <strong>${vals.toDate}</strong> পর্যন্ত মোট <strong>${vals.leaveDays}</strong> দিন আমার পক্ষে বিদ্যালয়ে উপস্থিত থাকা সম্ভব হবে না।
          </p>
          <p>
            অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা, আমাকে উক্ত দিনগুলোর জন্য ছুটি মঞ্জুর করে বাধিত করবেন।
          </p>
          <br/>
          <div style="margin-top: 30px;">
            <p>
              <strong>বিনীত নিবেদক,</strong><br/>
              আপনার একান্ত অনুগত শিক্ষার্থী,<br/>
              <strong>${vals.studentName}</strong><br/>
              ${vals.studentClass}<br/>
              ${vals.schoolName}
            </p>
          </div>
        </div>
      `;
      return { title: 'শিক্ষা প্রতিষ্ঠানে ছুটির আবেদন', bodyHtml: html, bodyText: text };
    }
  },
  {
    id: 'job-application',
    title: 'চাকরির আবেদন পত্র ও কভার লেটার',
    titleEn: 'Job Application & Cover Letter',
    category: 'office',
    categoryLabelBn: 'চাকরি ও ক্যারিয়ার',
    categoryLabelEn: 'Job & Career',
    description: 'সরকারি বা বেসরকারি প্রতিষ্ঠানে চাকরির বিজ্ঞপ্তির প্রেক্ষিতে প্রমিত আবেদনপত্র।',
    fields: [
      { key: 'authorityTitle', label: 'কর্তৃপক্ষের পদবি', labelEn: 'Authority Designation', placeholder: 'যেমন: মানবসম্পদ বিভাগ প্রধান / ব্যবস্থাপনা পরিচালক', defaultValue: 'মানবসম্পদ বিভাগ প্রধান' },
      { key: 'orgName', label: 'প্রতিষ্ঠানের নাম', labelEn: 'Organization Name', placeholder: 'যেমন: স্কয়ার ফার্মাসিউটিক্যালস লিমিটেড', defaultValue: 'স্কয়ার গ্রুপ লিমিটেড' },
      { key: 'orgAddress', label: 'প্রতিষ্ঠানের ঠিকানা', labelEn: 'Address', placeholder: 'যেমন: গুলশান-২, ঢাকা', defaultValue: 'গুলশান-২, ঢাকা-১২১২' },
      { key: 'postName', label: 'পদের নাম', labelEn: 'Applied Post Name', placeholder: 'যেমন: সফটওয়্যার ইঞ্জিনিয়ার / হিসাবরক্ষক', defaultValue: 'অ্যাসিস্ট্যান্ট ম্যানেজার (মার্কেটিং)' },
      { key: 'sourceNotice', label: 'বিজ্ঞপ্তির সূত্র', labelEn: 'Circular Source & Date', placeholder: 'যেমন: গত ১৫ ফেব্রুয়ারি ২০২৬ তারিখে দৈনিক প্রথম আলো পত্রিকায় প্রকাশিত', defaultValue: 'গত ১৫ ফেব্রুয়ারি ২০২৬ তারিখে প্রথম আলো পত্রিকায় প্রকাশিত' },
      { key: 'applicantName', label: 'আবেদনকারীর নাম', labelEn: 'Your Full Name', placeholder: 'আপনার নাম', defaultValue: 'ফারহানা আহমেদ' },
      { key: 'educationSummary', label: 'শিক্ষাগত যোগ্যতা', labelEn: 'Educational Summary', placeholder: 'যেমন: ঢাকা বিশ্ববিদ্যালয় থেকে বিবিএ ও এমবিএ', defaultValue: 'ঢাকা বিশ্ববিদ্যালয় থেকে বিবিএ এবং এমবিএ (মার্কেটিং)' },
      { key: 'contactInfo', label: 'মোবাইল ও ইমেইল', labelEn: 'Contact Info', placeholder: 'ফোন ও ইমেইল ঠিকানা', defaultValue: '০১৭১১-XXXXXX, farhana@example.com' },
      { key: 'date', label: 'আবেদনের তারিখ', labelEn: 'Date', placeholder: 'যেমন: ২০ ফেব্রুয়ারি ২০২৬', defaultValue: '২০ ফেব্রুয়ারি ২০২৬' },
    ],
    generateContent: (vals) => {
      const text = `তারিখ: ${vals.date}
বরাবর,
${vals.authorityTitle}
${vals.orgName}
${vals.orgAddress}

বিষয়: '${vals.postName}' পদের জন্য আবেদন।

মহোদয়,
বিনীত নিবেদন এই যে, ${vals.sourceNotice} বিজ্ঞপ্তির মাধ্যমে অবগত হলাম যে আপনার স্বনামধন্য প্রতিষ্ঠানে '${vals.postName}' পদে লোকবল নিয়োগ করা হবে। আমি উক্ত পদের একজন আগ্রহী প্রার্থী হিসেবে আমার জীবনবৃত্তান্ত ও প্রয়োজনীয় তথ্যাদি আপনার সদয় বিবেচনার জন্য নিচে উপস্থাপন করছি।

আমি ${vals.educationSummary} সফলতার সাথে সম্পন্ন করেছি এবং সংশ্লিষ্ট ক্ষেত্রে সততা ও দক্ষতার সাথে দায়িত্ব পালনে অঙ্গীকারবদ্ধ।

অতএব, বিনীত প্রার্থনা এই যে, আমার শিক্ষাগত যোগ্যতা ও অভিজ্ঞতার বিষয়সমূহ পর্যালোচনাপূর্বক আমাকে উক্ত পদের জন্য বিবেচনা করে সাক্ষাৎকার প্রদানের সুযোগদানে বাধিত করবেন।

বিনীত নিবেদক,
${vals.applicantName}
যোগাযোগ: ${vals.contactInfo}`;

      const html = `
        <div style="font-family: inherit; line-height: 1.8;">
          <p><strong>তারিখ:</strong> ${vals.date}</p>
          <p>
            <strong>বরাবর,</strong><br/>
            ${vals.authorityTitle}<br/>
            ${vals.orgName}<br/>
            ${vals.orgAddress}
          </p>
          <p><strong>বিষয়: '${vals.postName}' পদের জন্য আবেদন।</strong></p>
          <p>জনাব,</p>
          <p>
            যথাযথ সম্মান প্রদর্শনপূর্বক নিবেদন এই যে, ${vals.sourceNotice} বিজ্ঞপ্তির মাধ্যমে আমি জানতে পেরেছি আপনার মর্যাদাপূর্ণ প্রতিষ্ঠানে <strong>'${vals.postName}'</strong> পদে দক্ষ জনবল নিয়োগ করা হবে। আমি উক্ত পদের জন্য একজন আগ্রহী প্রার্থী হিসেবে আমার জীবনবৃত্তান্ত ও প্রাসঙ্গিক সনদপত্রসমূহ মহোদয়ের সদয় বিবেচনার জন্য পেশ করছি।
          </p>
          <p>
            আমি <strong>${vals.educationSummary}</strong> কৃতিত্বের সাথে সম্পন্ন করেছি। আমার মেধা, পরিশ্রম ও পেশাগত দক্ষতার মাধ্যমে আপনার প্রতিষ্ঠানের লক্ষ্য অর্জনে সক্রিয় অবদান রাখতে আমি দৃঢ়প্রতিজ্ঞ।
          </p>
          <p>
            অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা, আমার শিক্ষাগত যোগ্যতা ও জীবনবৃত্তান্ত পর্যালোচনা করে নিয়োগ পরীক্ষায় অথবা সাক্ষাৎকারে অংশগ্রহণের সুযোগ প্রদানে আপনার সদয় মর্জি হয়।
          </p>
          <br/>
          <div style="margin-top: 30px;">
            <p>
              <strong>বিনীত নিবেদক,</strong><br/>
              <strong>${vals.applicantName}</strong><br/>
              মোবাইল: ${vals.contactInfo}<br/>
              সংযুক্তি: পূর্ণাঙ্গ জীবনবৃত্তান্ত (CV) ও সনদপত্র
            </p>
          </div>
        </div>
      `;
      return { title: 'চাকরির আবেদন পত্র', bodyHtml: html, bodyText: text };
    }
  },
  {
    id: 'bank-statement',
    title: 'ব্যাংক স্টেটমেন্ট ও চেক বইয়ের আবেদন',
    titleEn: 'Bank Statement & Cheque Book Request',
    category: 'bank',
    categoryLabelBn: 'ব্যাংক ও অর্থায়ন',
    categoryLabelEn: 'Bank & Finance',
    description: 'ব্যাংক ব্যবস্থাপকের নিকট অ্যাকাউন্ট স্টেটমেন্ট বা নতুন চেক বই ইস্যু করার আনুষ্ঠানিক আবেদন।',
    fields: [
      { key: 'bankName', label: 'ব্যাংকের নাম', labelEn: 'Bank Name', placeholder: 'যেমন: সোনালী ব্যাংক পিএলসি', defaultValue: 'সোনালী ব্যাংক পিএলসি' },
      { key: 'branchName', label: 'শাখার নাম', labelEn: 'Branch Name', placeholder: 'যেমন: দিলকুশা শাখা, ঢাকা', defaultValue: 'দিলকুশা কর্পোরেট শাখা, ঢাকা' },
      { key: 'accHolderName', label: 'হিসাবধারীর নাম', labelEn: 'Account Holder Name', placeholder: 'আপনার নাম', defaultValue: 'কাজী মাহমুদুল হাসান' },
      { key: 'accountNumber', label: 'অ্যাকাউন্ট নম্বর', labelEn: 'Account Number', placeholder: 'যেমন: ১২৩৪৫৬৭৮৯০১২', defaultValue: '২০৫১০০৯৮৭৬৫০' },
      { key: 'requestItem', label: 'আবেদনের বিষয়', labelEn: 'Requested Item', placeholder: 'যেমন: ব্যাংক স্টেটমেন্ট ও নতুন চেক বই', defaultValue: 'বিগত ১ (এক) বছরের ব্যাংক স্টেটমেন্ট' },
      { key: 'purpose', label: 'প্রয়োজনের কারণ', labelEn: 'Purpose', placeholder: 'যেমন: ভিসা প্রসেসিং / ট্যাক্স রিটার্ন', defaultValue: 'আয়কর রিটার্ন দাখিল ও ব্যক্তিগত কাজের প্রয়োজনে' },
      { key: 'phone', label: 'মোবাইল নম্বর', labelEn: 'Mobile Number', placeholder: '০১৭১১-XXXXXX', defaultValue: '০১৭০০-১১২২৩৩' },
      { key: 'date', label: 'তারিখ', labelEn: 'Date', placeholder: 'যেমন: ২৫ ফেব্রুয়ারি ২০২৬', defaultValue: '২৫ ফেব্রুয়ারি ২০২৬' },
    ],
    generateContent: (vals) => {
      const text = `তারিখ: ${vals.date}
বরাবর,
শাখা ব্যবস্থাপক
${vals.bankName}
${vals.branchName}

বিষয়: অ্যাকাউন্ট নম্বর ${vals.accountNumber}-এর ${vals.requestItem} প্রাপ্তির আবেদন।

মহোদয়,
বিনীত নিবেদন এই যে, আমি আপনার ব্যাংকের ${vals.branchName}-এর একজন নিয়মিত হিসাবধারী। আমার অ্যাকাউন্ট নম্বর: ${vals.accountNumber} (হিসাবের নাম: ${vals.accHolderName})। ${vals.purpose} আমার উল্লিখিত অ্যাকাউন্টের ${vals.requestItem} জরুরি প্রয়োজন।

অতএব, বিনীত প্রার্থনা এই যে, উপর্যুক্ত তথ্যাদি যাচাই করে আমার অনুকূলে উক্ত ${vals.requestItem} সরবরাহ করে বাধিত করবেন।

বিনীত নিবেদক,
${vals.accHolderName}
অ্যাকাউন্ট নং: ${vals.accountNumber}
মোবাইল: ${vals.phone}`;

      const html = `
        <div style="font-family: inherit; line-height: 1.8;">
          <p><strong>তারিখ:</strong> ${vals.date}</p>
          <p>
            <strong>বরাবর,</strong><br/>
            শাখা ব্যবস্থাপক<br/>
            ${vals.bankName}<br/>
            ${vals.branchName}
          </p>
          <p><strong>বিষয়: অ্যাকাউন্ট নং ${vals.accountNumber}-এর ${vals.requestItem} সরবরাহের আবেদন।</strong></p>
          <p>জনাব,</p>
          <p>
            যথাবিহিত সম্মানপূর্বক নিবেদন এই যে, আমি আপনার শাখার একজন নিয়মিত সঞ্চয়ী/চলতি হিসাবধারী। আমার অ্যাকাউন্ট নম্বর: <strong>${vals.accountNumber}</strong>, হিসাবের শিরোনাম: <strong>${vals.accHolderName}</strong>। ${vals.purpose} আমার এই হিসাবের <strong>${vals.requestItem}</strong> অতীব জরুরি।
          </p>
          <p>
            অতএব, মহোদয়ের নিকট বিনীত অনুরোধ, উল্লিখিত অ্যাকাউন্ট হতে প্রয়োজনীয় সার্ভিস চার্জ (প্রযোজ্য ক্ষেত্রে) কর্তনপূর্বক আমাকে উক্ত ${vals.requestItem} প্রদান করে উপকৃত করবেন।
          </p>
          <br/>
          <div style="margin-top: 30px;">
            <p>
              <strong>বিনীত নিবেদক,</strong><br/>
              <strong>${vals.accHolderName}</strong><br/>
              হিসাব নম্বর: ${vals.accountNumber}<br/>
              মোবাইল: ${vals.phone}
            </p>
          </div>
        </div>
      `;
      return { title: 'ব্যাংক স্টেটমেন্টের আবেদন', bodyHtml: html, bodyText: text };
    }
  },
  {
    id: 'police-gd',
    title: 'থানায় সাধারণ ডায়েরি (GD) আবেদন ফরম',
    titleEn: 'Police Station General Diary (GD)',
    category: 'legal',
    categoryLabelBn: 'আইনি ও জিডি',
    categoryLabelEn: 'Legal & Police GD',
    description: 'জাতীয় পরিচয়পত্র, সার্টিফিকেট, পাসপোর্ট বা মূল্যবান মালামাল হারানোর সাধারণ ডায়েরি (জিডি)।',
    fields: [
      { key: 'thanaName', label: 'থানার নাম', labelEn: 'Thana Name', placeholder: 'যেমন: ধানমন্ডি থানা, ডিএমপি, ঢাকা', defaultValue: 'ধানমন্ডি মডেল থানা, ডিএমপি, ঢাকা' },
      { key: 'applicantName', label: 'আবেদনকারীর নাম', labelEn: 'Applicant Name', placeholder: 'আপনার পূর্ণ নাম', defaultValue: 'সাকিব আল হাসান' },
      { key: 'fatherName', label: 'পিতার নাম', labelEn: "Father's Name", placeholder: 'পিতার নাম', defaultValue: 'মোঃ রফিকুল ইসলাম' },
      { key: 'address', label: 'বর্তমান ঠিকানা', labelEn: 'Current Address', placeholder: 'বাসা, রোড, এলাকা', defaultValue: 'বাড়ি-১২, রোড-৪, ধানমন্ডি, ঢাকা' },
      { key: 'lostItem', label: 'হারানো জিনিস', labelEn: 'Lost Item Details', placeholder: 'যেমন: জাতীয় পরিচয়পত্র (NID)', defaultValue: 'জাতীয় পরিচয়পত্র (NID) ও একাডেমিক মূল সার্টিফিকেট' },
      { key: 'lostPlaceDate', label: 'হারানোর স্থান ও সময়', labelEn: 'Place & Time of Loss', placeholder: 'যেমন: ধানমন্ডি ২৭ নম্বর এলাকায় আনুমানিক বিকাল ৪টায়', defaultValue: 'ধানমন্ডি ২৭ নম্বর এলাকায় রাস্তা দিয়ে যাওয়ার সময় আনুমানিক বিকাল ৪:৩০ ঘটিকায়' },
      { key: 'phone', label: 'মোবাইল নম্বর', labelEn: 'Mobile', placeholder: 'ফোন নম্বর', defaultValue: '০১৭১২-৩৪৫৬৭৮' },
      { key: 'date', label: 'তারিখ', labelEn: 'Date', placeholder: 'যেমন: ০১ মার্চ ২০২৬', defaultValue: '০১ মার্চ ২০২৬' },
    ],
    generateContent: (vals) => {
      const text = `তারিখ: ${vals.date}
বরাবর,
ভারপ্রাপ্ত কর্মকর্তা (OC)
${vals.thanaName}

বিষয়: সাধারণ ডায়েরি (GD) করার জন্য আবেদন।

মহোদয়,
আমি নিম্নস্বাক্ষরকারী ${vals.applicantName}, পিতা: ${vals.fatherName}, বর্তমান ঠিকানা: ${vals.address}। এই মর্মে জানাচ্ছি যে, গত ${vals.lostPlaceDate} আমার ${vals.lostItem} অসাবধানতাবশত হারিয়ে গেছে। অনেক খোঁজাখুঁজি করেও তা পাওয়া যায়নি।

ভবিষ্যতে কোনো প্রকার আইনি জটিলতা এড়াতে এবং নতুন ডকুমেন্ট উত্তোলনের সুবিধার্থে বিষয়টি আপনার থানায় সাধারণ ডায়েরি (জিডি) হিসেবে লিপিবদ্ধ করার জন্য অনুরোধ জানাচ্ছি।

অতএব, মহোদয় বিষয়টি সাধারণ ডায়েরিভুক্ত করতে সদয় মর্জি করবেন।

বিনীত নিবেদক,
${vals.applicantName}
পিতা: ${vals.fatherName}
মোবাইল: ${vals.phone}`;

      const html = `
        <div style="font-family: inherit; line-height: 1.8;">
          <p><strong>তারিখ:</strong> ${vals.date}</p>
          <p>
            <strong>বরাবর,</strong><br/>
            ভারপ্রাপ্ত কর্মকর্তা (Officer-in-Charge)<br/>
            ${vals.thanaName}
          </p>
          <p><strong>বিষয়: সাধারণ ডায়েরি (GD) করার আবেদন।</strong></p>
          <p>জনাব,</p>
          <p>
            আমি নিম্নস্বাক্ষরকারী <strong>${vals.applicantName}</strong>, পিতা: <strong>${vals.fatherName}</strong>, বর্তমান ঠিকানা: <strong>${vals.address}</strong>—এই মর্মে জানাচ্ছি যে, ${vals.lostPlaceDate} আমার <strong>${vals.lostItem}</strong> অসাবধানতাবশত হারিয়ে গেছে। পরবর্তীতে সম্ভাব্য সকল স্থানে খোঁজাখুঁজি করেও উক্ত মালামাল উদ্ধার করা সম্ভব হয়নি।
          </p>
          <p>
            ভবিষ্যৎ নিরাপত্তা ও নতুন ডকুমেন্ট সংগ্রহের স্বার্থে বিষয়টি আপনার থানায় একটি সাধারণ ডায়েরি (জিডি) হিসেবে অন্তর্ভুক্ত করার প্রার্থনা জানাচ্ছি।
          </p>
          <br/>
          <div style="margin-top: 30px;">
            <p>
              <strong>বিনীত নিবেদক,</strong><br/>
              <strong>${vals.applicantName}</strong><br/>
              পিতা: ${vals.fatherName}<br/>
              ঠিকানা: ${vals.address}<br/>
              মোবাইল নং: ${vals.phone}
            </p>
          </div>
        </div>
      `;
      return { title: 'থানায় সাধারণ ডায়েরি (GD) ফরম', bodyHtml: html, bodyText: text };
    }
  },
  {
    id: 'house-rent-agreement',
    title: 'বাসা / ফ্ল্যাট ভাড়া চুক্তিপত্র',
    titleEn: 'House / Flat Rental Agreement',
    category: 'civic',
    categoryLabelBn: 'নাগরিক ও চুক্তিপত্র',
    categoryLabelEn: 'Civic & Contract',
    description: 'বাড়িওয়ালা ও ভাড়াটিয়ার মধ্যকার দ্বিপাক্ষিক প্রমিত ভাড়ার চুক্তিপত্রের খসড়া।',
    fields: [
      { key: 'ownerName', label: 'মালিকের নাম (১ম পক্ষ)', labelEn: "Owner's Name (1st Party)", placeholder: 'বাড়িওয়ালার নাম', defaultValue: 'আলহাজ্ব মোঃ আবদুল করিম' },
      { key: 'tenantName', label: 'ভাড়াটিয়ার নাম (২য় পক্ষ)', labelEn: "Tenant's Name (2nd Party)", placeholder: 'ভাড়াটিয়ার নাম', defaultValue: 'মাহমুদুল হক' },
      { key: 'flatDetails', label: 'ফ্ল্যাট ও বাসার বিবরণ', labelEn: 'Flat/Property Details', placeholder: 'যেমন: ফ্ল্যাট ৪/বি, বাড়ি-১২, মিরপুর-১০', defaultValue: 'ফ্ল্যাট-৫এ (৪র্থ তলা), বাড়ি-৭২, ব্লক-সি, মিরপুর-২, ঢাকা' },
      { key: 'monthlyRent', label: 'মাসিক ভাড়া (টাকা)', labelEn: 'Monthly Rent (BDT)', placeholder: 'যেমন: ২০,০০০/-', defaultValue: '২২,০০০/- (বাইশ হাজার টাকা)' },
      { key: 'advanceAmount', label: 'অগ্রিম/জামানত (টাকা)', labelEn: 'Security Advance (BDT)', placeholder: 'যেমন: ৫০,০০০/-', defaultValue: '৫০,০০০/- (পঞ্চাশ হাজার টাকা)' },
      { key: 'effectiveDate', label: 'চুক্তি কার্যকরের তারিখ', labelEn: 'Start Date', placeholder: 'যেমন: ০১ মার্চ ২০২৬', defaultValue: '০১ মার্চ ২০২৬' },
      { key: 'duration', label: 'চুক্তির মেয়াদ', labelEn: 'Agreement Period', placeholder: 'যেমন: ১ (এক) বছর', defaultValue: '১ (এক) বছর' },
    ],
    generateContent: (vals) => {
      const text = `বাসা / ফ্ল্যাট ভাড়ার দ্বিপাক্ষিক চুক্তিপত্র

১ম পক্ষ (মালিক): ${vals.ownerName}
২য় পক্ষ (ভাড়াটিয়া): ${vals.tenantName}
বাসার ঠিকানা: ${vals.flatDetails}

শর্তাবলী:
১. মাসিক ভাড়া: ${vals.monthlyRent}, প্রতি মাসের ১০ তারিখের মধ্যে পরিশোধযোগ্য।
২. অগ্রিম জামানত: ${vals.advanceAmount}, যা চুক্তি শেষে ফেরতযোগ্য।
৩. চুক্তির মেয়াদ: ${vals.effectiveDate} তারিখ হতে ${vals.duration}।
৪. বিদ্যুৎ, গ্যাস ও পানি বিল প্রচলিত নিয়ম অনুযায়ী প্রদেয় হবে।
৫. কোনো পক্ষ চুক্তি বাতিল করতে চাইলে ন্যূনতম ২ (দুই) মাস পূর্বে লিখিত নোটিশ প্রদান করতে হবে।`;

      const html = `
        <div style="font-family: inherit; line-height: 1.8;">
          <h2 style="text-align: center; margin-bottom: 20px; color: #064e3b;">বাসা / ফ্ল্যাট ভাড়ার দ্বিপাক্ষিক চুক্তিপত্র</h2>
          <p>
            <strong>১ম পক্ষ (বাড়িওয়ালা / মালিক):</strong> ${vals.ownerName}<br/>
            <strong>২য় পক্ষ (ভাড়াটিয়া):</strong> ${vals.tenantName}<br/>
            <strong>ভাড়াকৃত বাসার বিবরণ:</strong> ${vals.flatDetails}
          </p>
          <p>উভয় পক্ষ স্বেচ্ছায়, সজ্ঞানে নিম্নলিখিত শর্তে এই চুক্তিপত্রে সম্মত হইলেন:</p>
          <ol style="margin-left: 20px; line-height: 1.8;">
            <li><strong>ভাড়ার হার:</strong> মাসিক বাড়ি ভাড়া <strong>${vals.monthlyRent}</strong> ধার্য করা হইল। ২য় পক্ষ প্রতি ইংরেজি মাসের ০১ হতে ১০ তারিখের মধ্যে ১ম পক্ষকে ভাড়া পরিশোধ করিবেন।</li>
            <li><strong>জামানত / অগ্রিম:</strong> ২য় পক্ষ ১ম পক্ষকে নগদ <strong>${vals.advanceAmount}</strong> জামানত বাবদ প্রদান করিলেন, যাহা ফ্ল্যাট ত্যাগের সময় ফেরতযোগ্য হইবে।</li>
            <li><strong>মেয়াদ:</strong> এই চুক্তির মেয়াদ আগামী <strong>${vals.effectiveDate}</strong> তারিখ হইতে <strong>${vals.duration}</strong> বলবৎ থাকিবে।</li>
            <li><strong>ইউটিলিটি বিল:</strong> গ্যাস, বিদ্যুৎ ও সার্ভিস চার্জ প্রতি মাসে নির্ধারিত সময়ে ২য় পক্ষ বহন করিবেন।</li>
            <li><strong>নোটিশ:</strong> যেকোনো পক্ষ বাসা ছাড়িতে বা ছাড়াইতে চাহিলে ন্যূনতম ২ (দুই) মাস পূর্বে লিখিতভাবে নোটিশ প্রদান করিতে হইবে।</li>
          </ol>
          <br/>
          <div style="margin-top: 50px; display: flex; justify-content: space-between;">
            <div>
              <p>____________________<br/><strong>১ম পক্ষের স্বাক্ষর (মালিক)</strong></p>
            </div>
            <div>
              <p>____________________<br/><strong>২য় পক্ষের স্বাক্ষর (ভাড়াটিয়া)</strong></p>
            </div>
          </div>
        </div>
      `;
      return { title: 'বাসা ভাড়ার চুক্তিপত্র', bodyHtml: html, bodyText: text };
    }
  }
];
