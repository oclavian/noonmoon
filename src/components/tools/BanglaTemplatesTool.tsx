import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  Scale, 
  Home, 
  RotateCcw,
  Search
} from 'lucide-react';
import { BANGLA_TEMPLATES, BanglaTemplate } from '../../data/banglaTemplatesData';
import { useLanguage } from '../../context/LanguageContext';
import { downloadAsDoc, downloadAsTxt, printFormattedText, downloadAsPdf } from '../../utils/documentExport';
import { saveHistoryItem } from '../../utils/historyStorage';

export const BanglaTemplatesTool: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('office-leave');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedTemplate = useMemo(() => {
    return BANGLA_TEMPLATES.find((t) => t.id === selectedTemplateId) || BANGLA_TEMPLATES[0];
  }, [selectedTemplateId]);

  // Dynamic field values state map initialized with default values
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    BANGLA_TEMPLATES.forEach((tpl) => {
      tpl.fields.forEach((f) => {
        initial[`${tpl.id}_${f.key}`] = f.defaultValue;
      });
    });
    return initial;
  });

  const handleFieldChange = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [`${selectedTemplate.id}_${key}`]: value,
    }));
  };

  const currentValues = useMemo(() => {
    const vals: Record<string, string> = {};
    selectedTemplate.fields.forEach((f) => {
      vals[f.key] = formValues[`${selectedTemplate.id}_${f.key}`] ?? f.defaultValue;
    });
    return vals;
  }, [selectedTemplate, formValues]);

  const generated = useMemo(() => {
    return selectedTemplate.generateContent(currentValues);
  }, [selectedTemplate, currentValues]);

  const filteredTemplates = useMemo(() => {
    return BANGLA_TEMPLATES.filter((tpl) => {
      const matchCat = categoryFilter === 'all' || tpl.category === categoryFilter;
      const matchSearch =
        !searchQuery ||
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [categoryFilter, searchQuery]);

  const handleCopy = async () => {
    if (!generated.bodyText) return;
    try {
      await navigator.clipboard.writeText(generated.bodyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      saveHistoryItem({
        tool: 'template',
        title: selectedTemplate.title,
        content: generated.bodyText,
        preview: generated.bodyText.substring(0, 80) + '...',
      });
    } catch {
      // fallback
    }
  };

  const handleDownloadDoc = () => {
    downloadAsDoc(
      selectedTemplate.title,
      generated.bodyHtml,
      `${selectedTemplate.id}-${Date.now()}.doc`
    );
  };

  const handleDownloadTxt = () => {
    downloadAsTxt(
      generated.bodyText,
      `${selectedTemplate.id}-${Date.now()}.txt`
    );
  };

  const handleDownloadPdf = async () => {
    try {
      await downloadAsPdf(
        selectedTemplate.title,
        generated.bodyHtml,
        `${selectedTemplate.id}-${Date.now()}.pdf`
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrint = () => {
    printFormattedText(selectedTemplate.title, generated.bodyHtml);
  };

  const handleResetDefaults = () => {
    const updated = { ...formValues };
    selectedTemplate.fields.forEach((f) => {
      updated[`${selectedTemplate.id}_${f.key}`] = f.defaultValue;
    });
    setFormValues(updated);
  };

  const categories = [
    { id: 'all', labelBn: 'সকল টেমপ্লেট', labelEn: 'All Templates', icon: FileText },
    { id: 'office', labelBn: 'চাকরি ও অফিস', labelEn: 'Office & Job', icon: Briefcase },
    { id: 'academic', labelBn: 'শিক্ষা ও স্কুল', labelEn: 'School & College', icon: GraduationCap },
    { id: 'bank', labelBn: 'ব্যাংক ও অর্থ', labelEn: 'Bank & Finance', icon: Building2 },
    { id: 'legal', labelBn: 'আইনি ও জিডি', labelEn: 'Legal & GD', icon: Scale },
    { id: 'civic', labelBn: 'চুক্তিপত্র ও নাগরিক', labelEn: 'Civic & Contracts', icon: Home },
  ];

  return (
    <section id="bangla-templates-tool-container" className="space-y-4 sm:space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-[2rem] card-elevation p-5 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[1rem] bg-purple-50 text-slate-900 border border-purple-200 flex items-center justify-center font-bold shadow-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {language === 'bn' ? 'সরকারি ও প্রাতিষ্ঠানিক বাংলা আবেদন ও ফরম টেমপ্লেট' : 'Official Bengali Application & Form Templates'}
                </h2>
                <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full">
                  MS Word & Print Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {language === 'bn' 
                  ? 'প্রমিত বাংলায় ছুটির দরখাস্ত, চাকরির কভার লেটার, ব্যাংক আবেদন, জিডি ও চুক্তিপত্র তৈরি ও ডাউনলোড করুন।' 
                  : 'Generate standard official Bengali leave letters, job applications, bank requests, police GDs and contracts.'}
              </p>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full lg:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'টেমপ্লেট খুঁজুন...' : 'Search templates...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300/60 rounded-[1rem] outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="pt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[1rem] border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-300/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Template Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {filteredTemplates.map((tpl) => {
          const isSelected = tpl.id === selectedTemplate.id;
          return (
            <button
              key={tpl.id}
              onClick={() => setSelectedTemplateId(tpl.id)}
              className={`p-3 text-left rounded-[1rem] border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-50/80 border-slate-900 ring-2 ring-purple-500/20 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-300/60 text-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block mb-1">
                  {language === 'bn' ? tpl.categoryLabelBn : tpl.categoryLabelEn}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                  {language === 'bn' ? tpl.title : tpl.titleEn}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {tpl.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Workbench: Form Inputs (Left) & Live Document Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Customized Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] card-elevation p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>{language === 'bn' ? 'তথ্য পূরণ করুন' : 'Fill Document Details'}</span>
                </h3>
                <span className="text-xs text-slate-500">
                  {language === 'bn' ? 'নিচের তথ্য পরিবর্তন করলেই ডানপাশে আবেদনপত্র আপডেট হবে' : 'Live updates as you edit fields'}
                </span>
              </div>
              <button
                onClick={handleResetDefaults}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                title="ডিফল্ট মান ফিরিয়ে আনুন"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'bn' ? 'রিসেট' : 'Reset'}</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {selectedTemplate.fields.map((field) => {
                const val = currentValues[field.key] ?? field.defaultValue;
                return (
                  <div key={field.key} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {language === 'bn' ? field.label : field.labelEn}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={2}
                        value={val}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300/60 px-3 py-1.5 rounded-[1rem] text-slate-900 focus:border-slate-900 focus:bg-white outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300/60 px-3 py-1.5 rounded-[1rem] text-slate-900 focus:border-slate-900 focus:bg-white outline-none"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Document Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] border border-purple-200 p-4 sm:p-6 shadow-sm flex flex-col justify-between bg-gradient-to-b from-purple-50/20 to-white">
          <div>
            <div className="flex items-center justify-between border-b border-purple-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold text-purple-950 font-bangla">
                  {selectedTemplate.title}
                </h3>
              </div>
              <span className="text-[11px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                {language === 'bn' ? 'লাইভ প্রিভিউ' : 'Live Preview'}
              </span>
            </div>

            {/* Document Paper Preview Box */}
            <div className="bg-white border border-slate-300/60 rounded-[1rem] p-5 sm:p-7 shadow-inner text-slate-900 font-bangla text-xs sm:text-sm leading-relaxed min-h-[380px] max-h-[500px] overflow-y-auto whitespace-pre-wrap select-all">
              {generated.bodyText}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="pt-4 mt-4 border-t border-purple-100 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadDoc}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-[1rem] bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-all"
                title="মাইক্রোসফট ওয়ার্ড (.doc) ফাইল ডাউনলোড"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ওয়ার্ড ফাইল (.doc)' : 'Word (.doc)'}</span>
              </button>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-[1rem] bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 transition-all"
                title="পিডিএফ (.pdf) ফাইল ডাউনলোড"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পিডিএফ (.pdf)' : 'PDF'}</span>
              </button>
              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-[1rem] bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                title="টেক্সট ফাইল ডাউনলোড"
              >
                <Download className="w-3.5 h-3.5" />
                <span>.txt</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-[1rem] bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                title="প্রিন্ট প্রিভিউ ও প্রিন্ট"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-[1rem] shadow-sm transition-all active:scale-95 ${
                copied
                  ? 'bg-purple-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'সম্পূর্ণ কপি করুন' : 'Copy All')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
