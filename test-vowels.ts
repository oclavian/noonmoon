const text = "gai khau dheu jao khao dio shili";
const phoneticRules = [
  [/kkh/gi, 'ক্ষ'],
  [/ggh/gi, 'জ্ঞ'],
  [/kh/gi, 'খ'],
  [/gh/gi, 'ঘ'],
  [/ch/gi, 'চ'],
  [/Ch/gi, 'ছ'],
  [/jh/gi, 'ঝ'],
  [/Th/g, 'ঠ'],
  [/Dh/g, 'ঢ'],
  [/th/gi, 'থ'],
  [/dh/gi, 'ধ'],
  [/ph/gi, 'ফ'],
  [/bh/gi, 'ভ'],
  [/sh/gi, 'শ'],
  [/Sh/g, 'ষ'],
  [/rh/gi, 'ঢ়'],
  [/r\^/gi, 'ড়'],
  [/t`/g, 'ৎ'],
  [/k/gi, 'ক'],
  [/g/gi, 'গ'],
  [/c/gi, 'চ'],
  [/j/gi, 'জ'],
  [/T/g, 'ট'],
  [/D/g, 'ড'],
  [/N/g, 'ণ'],
  [/t/gi, 'ত'],
  [/d/gi, 'দ'],
  [/n/gi, 'ন'],
  [/p/gi, 'প'],
  [/f/gi, 'ফ'],
  [/b/gi, 'ব'],
  [/v/gi, 'ভ'],
  [/m/gi, 'ম'],
  [/z/gi, 'য'],
  [/y/gi, 'য়'],
  [/r/gi, 'র'],
  [/l/gi, 'ল'],
  [/s/gi, 'স'],
  [/h/gi, 'হ'],
  [/w/gi, 'ও'],
  
  // NEW RULES
  [/aI/g, 'াঈ'],
  [/ai/gi, 'াই'],
  [/aU/g, 'াঊ'],
  [/au/gi, 'াউ'],
  [/ao/gi, 'াও'],
  [/eI/g, 'েঈ'],
  [/ei/gi, 'েই'],
  [/eU/g, 'েঊ'],
  [/eu/gi, 'েউ'],
  [/eo/gi, 'েও'],
  [/iU/g, 'িঊ'],
  [/iu/gi, 'িউ'],
  [/io/gi, 'িও'],
  [/uI/g, 'ুঈ'],
  [/ui/gi, 'ুই'],
  [/uo/gi, 'ুও'],
  [/ua/gi, 'ুয়া'],

  // Vowels and Kar
  [/aa/gi, 'া'],
  [/ee/gi, 'ী'],
  [/oo/gi, 'ূ'],
  [/oi/gi, 'ৈ'],
  [/ou/gi, 'ৌ'],
  [/a/gi, 'া'],
  [/i/gi, 'ি'],
  [/I/g, 'ী'],
  [/u/gi, 'ু'],
  [/U/g, 'ূ'],
  [/e/gi, 'ে'],
  [/E/g, 'এ'],
  [/o/gi, 'ো'],
  [/O/g, 'ও'],
];

function parse(word) {
  let result = word;
  for (const [regex, repl] of phoneticRules) {
    result = result.replace(regex, repl);
  }
  return result;
}

console.log(text.split(' ').map(parse).join(' '));
