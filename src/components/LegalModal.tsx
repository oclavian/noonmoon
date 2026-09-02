import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type LegalModalType = 'privacy' | 'terms' | 'about' | 'contact' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { language } = useLanguage();

  if (!type) return null;

  const content = {
    privacy: {
      title: language === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy',
      body: language === 'bn' ? (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>নুন-মুন (Noon-Moon) আপনার গোপনীয়তাকে সম্মান করে। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার ডেটা সংগ্রহ এবং ব্যবহার করি।</p>
          <h3 className="font-bold text-slate-900 mt-4">১. তথ্য সংগ্রহ</h3>
          <p>আমরা সাধারণত কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না। আমাদের বেশিরভাগ টুল (যেমন কিবোর্ড কনভার্টার, বয়স ক্যালকুলেটর) লোকালি আপনার ব্রাউজারেই কাজ করে।</p>
          <h3 className="font-bold text-slate-900 mt-4">২. কুকিজ ও অ্যাডভারটাইজিং</h3>
          <p>আমাদের সাইটে থার্ড-পার্টি সার্ভিস (যেমন Google AdSense) ব্যবহারের ক্ষেত্রে ব্যবহারকারীর অভিজ্ঞতা উন্নয়ন এবং প্রাসঙ্গিক বিজ্ঞাপন দেখানোর জন্য কুকিজ ব্যবহৃত হতে পারে।</p>
          <h3 className="font-bold text-slate-900 mt-4">৩. ডেটা নিরাপত্তা</h3>
          <p>আপনার কোনো কনভার্ট করা টেক্সট বা ইনপুট আমাদের সার্ভারে সংরক্ষিত হয় না। ড্রাফট হিসেবে যা সেভ হয়, তা সম্পূর্ণ আপনার ব্রাউজারের লোকাল স্টোরেজে থাকে।</p>
        </div>
      ) : (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>Noon-Moon respects your privacy. This privacy policy explains how we collect and use your data.</p>
          <h3 className="font-bold text-slate-900 mt-4">1. Information Collection</h3>
          <p>We generally do not collect any personal information. Most of our tools work locally in your browser.</p>
          <h3 className="font-bold text-slate-900 mt-4">2. Cookies and Advertising</h3>
          <p>Third-party services (like Google AdSense) may use cookies to improve user experience and show relevant ads.</p>
          <h3 className="font-bold text-slate-900 mt-4">3. Data Security</h3>
          <p>None of your converted text or inputs are stored on our servers. Drafts are saved entirely in your browser's local storage.</p>
        </div>
      )
    },
    terms: {
      title: language === 'bn' ? 'শর্তাবলী (Terms of Service)' : 'Terms of Service',
      body: language === 'bn' ? (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>নুন-মুন (Noon-Moon) ব্যবহার করার মাধ্যমে আপনি নিম্নলিখিত শর্তাবলীতে সম্মতি প্রদান করছেন।</p>
          <h3 className="font-bold text-slate-900 mt-4">১. সেবার ব্যবহার</h3>
          <p>আমাদের টুলগুলো বিনামূল্যে প্রদান করা হয় এবং এগুলো ব্যবহার করে কোনো বেআইনি কাজ করা যাবে না।</p>
          <h3 className="font-bold text-slate-900 mt-4">২. দায়বদ্ধতা</h3>
          <p>নুন-মুন-এর টুলস ব্যবহার করে তৈরি করা কোনো কনটেন্টের জন্য নুন-মুন দায়ী থাকবে না। টুলসগুলো "যেমন আছে" (As is) ভিত্তিতে প্রদান করা হয়।</p>
        </div>
      ) : (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>By using Noon-Moon, you agree to the following terms and conditions.</p>
          <h3 className="font-bold text-slate-900 mt-4">1. Use of Service</h3>
          <p>Our tools are provided for free and cannot be used for any illegal activities.</p>
          <h3 className="font-bold text-slate-900 mt-4">2. Liability</h3>
          <p>Noon-Moon shall not be liable for any content generated using its tools. Tools are provided on an "as is" basis.</p>
        </div>
      )
    },
    about: {
      title: language === 'bn' ? 'আমাদের সম্পর্কে (About Us)' : 'About Us',
      body: language === 'bn' ? (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>নুন-মুন (Noon-Moon) হলো বাংলা ভাষার ডিজিটাল টুলস ও সেবার একটি অত্যাধুনিক হাব। আমাদের লক্ষ্য হলো ইন্টারনেট জগতে বাংলা ভাষার ব্যবহারকে আরও সহজ এবং সাবলীল করা।</p>
          <p>এখানে আপনি পাচ্ছেন আধুনিক কিবোর্ড কনভার্টার, ইউনিকোড থেকে বিজয় রূপান্তর, বাংলা পঞ্জিকা, বয়স ক্যালকুলেটর থেকে শুরু করে বিভিন্ন প্রয়োজনীয় প্রাতিষ্ঠানিক বাংলা ফরম।</p>
        </div>
      ) : (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>Noon-Moon is a modern hub for Bengali digital tools and services. Our goal is to make the use of the Bengali language easier and more fluent on the internet.</p>
          <p>Here you get modern keyboard converters, Unicode to Bijoy conversion, Bengali calendar, age calculator, and various necessary formal Bengali templates.</p>
        </div>
      )
    },
    contact: {
      title: language === 'bn' ? 'যোগাযোগ (Contact Us)' : 'Contact Us',
      body: language === 'bn' ? (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>যেকোনো মতামত, পরামর্শ বা ব্যবসায়িক প্রয়োজনে আমাদের সাথে যোগাযোগ করতে পারেন।</p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-300/60 mt-4">
            <p className="font-medium text-slate-900">ইমেইল: <a href="mailto:noonmoon.bd@gmail.com" className="text-emerald-600 hover:underline">noonmoon.bd@gmail.com</a></p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-sm sm:text-base text-slate-700">
          <p>You can contact us for any feedback, suggestions, or business inquiries.</p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-300/60 mt-4">
            <p className="font-medium text-slate-900">Email: <a href="mailto:noonmoon.bd@gmail.com" className="text-emerald-600 hover:underline">noonmoon.bd@gmail.com</a></p>
          </div>
        </div>
      )
    }
  };

  const current = content[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200/60 bg-slate-50/50">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{current.title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          {current.body}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200/60 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-medium transition-colors"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
