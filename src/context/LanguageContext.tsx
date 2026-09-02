import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation } from '../locales/translations';

export type Language = 'bn' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default is 'bn' (Bengali) as explicitly requested
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lipik_app_lang');
      if (saved === 'en' || saved === 'bn') {
        return saved;
      }
    }
    return 'bn';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lipik_app_lang', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const t = (key: string, fallback?: string): string => {
    const translated = getTranslation(key, language);
    if (translated !== key) {
      return translated;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

