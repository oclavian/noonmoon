import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ShieldAlert } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('lipik_cookie_consent');
    if (!hasConsented) {
      // Small delay to not immediately block view on first load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lipik_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-300/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-in slide-in-from-bottom-8 duration-500">
          
          <div className="flex-1 flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-1">
              {language === 'bn' 
                ? 'আমরা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং প্রাসঙ্গিক বিজ্ঞাপন (Google AdSense) প্রদর্শন করতে কুকিজ ব্যবহার করি। আমাদের সাইট ব্যবহার চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের কুকি নীতিতে সম্মতি দিচ্ছেন।' 
                : 'We use cookies to enhance your browsing experience and serve personalized ads (Google AdSense). By continuing to use our site, you consent to our use of cookies.'}
            </p>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsVisible(false)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-medium text-sm transition-colors"
            >
              {language === 'bn' ? 'পরে' : 'Later'}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm"
            >
              {language === 'bn' ? 'সম্মত আছি' : 'I Accept'}
            </button>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="hidden sm:flex absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-300/60 rounded-full items-center justify-center text-slate-500 hover:text-slate-600 shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
