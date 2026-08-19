"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Lock } from "lucide-react";
import { useCookieConsent } from "@/context/CookieConsentContext";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const LANGUAGES = [
  { code: "ab", name: "Abkhaz" },
  { code: "ace", name: "Acehnese" },
  { code: "ach", name: "Acholi" },
  { code: "aa", name: "Afar" },
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "alz", name: "Alur" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "as", name: "Assamese" },
  { code: "av", name: "Avar" },
  { code: "awa", name: "Awadhi" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "ban", name: "Balinese" },
  { code: "bal", name: "Baluchi" },
  { code: "bm", name: "Bambara" },
  { code: "bci", name: "Baoulé" },
  { code: "ba", name: "Bashkir" },
  { code: "eu", name: "Basque" },
  { code: "btx", name: "Batak Karo" },
  { code: "bts", name: "Batak Simalungun" },
  { code: "bbc", name: "Batak Toba" },
  { code: "be", name: "Belarusian" },
  { code: "bem", name: "Bemba" },
  { code: "bn", name: "Bengali" },
  { code: "bew", name: "Betawi" },
  { code: "bho", name: "Bhojpuri" },
  { code: "bik", name: "Bikol" },
  { code: "bs", name: "Bosnian" },
  { code: "br", name: "Breton" },
  { code: "bg", name: "Bulgarian" },
  { code: "bua", name: "Buryat" },
  { code: "yue", name: "Cantonese" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "ch", name: "Chamorro" },
  { code: "ce", name: "Chechen" },
  { code: "ny", name: "Chichewa" },
  { code: "zh-CN", name: "Chinese" },
  { code: "chk", name: "Chuukese" },
  { code: "cv", name: "Chuvash" },
  { code: "co", name: "Corsican" },
  { code: "crh", name: "Crimean Tatar (Cyrillic)" },
  { code: "crh-Latn", name: "Crimean Tatar (Latin)" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "fa-AF", name: "Dari" },
  { code: "dv", name: "Dhivehi" },
  { code: "din", name: "Dinka" },
  { code: "doi", name: "Dogri" },
  { code: "dov", name: "Dombe" },
  { code: "nl", name: "Dutch" },
  { code: "dyu", name: "Dyula" },
  { code: "dz", name: "Dzongkha" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "ee", name: "Ewe" },
  { code: "fo", name: "Faroese" },
  { code: "fj", name: "Fijian" },
  { code: "tl", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fon", name: "Fon" },
  { code: "fr", name: "French" },
  { code: "fr-CA", name: "French (Canada)" },
  { code: "fy", name: "Frisian" },
  { code: "fur", name: "Friulian" },
  { code: "ff", name: "Fulani" },
  { code: "gaa", name: "Ga" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "cnh", name: "Hakha Chin" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hil", name: "Hiligaynon" },
  { code: "hi", name: "Hindi" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "hrx", name: "Hunsrik" },
  { code: "iba", name: "Iban" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "ilo", name: "Ilocano" },
  { code: "id", name: "Indonesian" },
  { code: "iu-Latn", name: "Inuktut (Latin)" },
  { code: "iu", name: "Inuktut (Syllabics)" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "jam", name: "Jamaican Patois" },
  { code: "ja", name: "Japanese" },
  { code: "jw", name: "Javanese" },
  { code: "kac", name: "Jingpo" },
  { code: "kl", name: "Kalaallisut" },
  { code: "kn", name: "Kannada" },
  { code: "kr", name: "Kanuri" },
  { code: "pam", name: "Kapampangan" },
  { code: "kk", name: "Kazakh" },
  { code: "kha", name: "Khasi" },
  { code: "km", name: "Khmer" },
  { code: "cgg", name: "Kiga" },
  { code: "kg", name: "Kikongo" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "ktu", name: "Kituba" },
  { code: "trp", name: "Kokborok" },
  { code: "kv", name: "Komi" },
  { code: "gom", name: "Konkani" },
  { code: "ko", name: "Korean" },
  { code: "kri", name: "Krio" },
  { code: "ku", name: "Kurdish (Kurmanji)" },
  { code: "ckb", name: "Kurdish (Sorani)" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "ltg", name: "Latgalian" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "lij", name: "Ligurian" },
  { code: "li", name: "Limburgish" },
  { code: "ln", name: "Lingala" },
  { code: "lt", name: "Lithuanian" },
  { code: "lmo", name: "Lombard" },
  { code: "lg", name: "Luganda" },
  { code: "luo", name: "Luo" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mad", name: "Madurese" },
  { code: "mai", name: "Maithili" },
  { code: "mak", name: "Makassar" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ms-Arab", name: "Malay (Jawi)" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mam", name: "Mam" },
  { code: "gv", name: "Manx" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mh", name: "Marshallese" },
  { code: "mwr", name: "Marwadi" },
  { code: "mfe", name: "Mauritian Creole" },
  { code: "chm", name: "Meadow Mari" },
  { code: "mni-Mtei", name: "Meiteilon (Manipuri)" },
  { code: "min", name: "Minang" },
  { code: "lus", name: "Mizo" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "nhe", name: "Nahuatl (Eastern Huasteca)" },
  { code: "ndc-ZW", name: "Ndau" },
  { code: "nr", name: "Ndebele (South)" },
  { code: "new", name: "Nepalbhasa (Newari)" },
  { code: "ne", name: "Nepali" },
  { code: "bm-Nkoo", name: "NKo" },
  { code: "no", name: "Norwegian" },
  { code: "nus", name: "Nuer" },
  { code: "oc", name: "Occitan" },
  { code: "or", name: "Odia (Oriya)" },
  { code: "om", name: "Oromo" },
  { code: "os", name: "Ossetian" },
  { code: "pag", name: "Pangasinan" },
  { code: "pap", name: "Papiamento" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese (Brazil)" },
  { code: "pt-PT", name: "Portuguese (Portugal)" },
  { code: "pa", name: "Punjabi (Gurmukhi)" },
  { code: "pa-Arab", name: "Punjabi (Shahmukhi)" },
  { code: "qu", name: "Quechua" },
  { code: "kek", name: "Qʼeqchiʼ" },
  { code: "rom", name: "Romani" },
  { code: "ro", name: "Romanian" },
  { code: "rn", name: "Rundi" },
  { code: "ru", name: "Russian" },
  { code: "se", name: "Sami (North)" },
  { code: "sm", name: "Samoan" },
  { code: "sg", name: "Sango" },
  { code: "sa", name: "Sanskrit" },
  { code: "sat-Latn", name: "Santali (Latin)" },
  { code: "sat", name: "Santali (Ol Chiki)" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "nso", name: "Sepedi" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "crs", name: "Seychellois Creole" },
  { code: "shn", name: "Shan" },
  { code: "sn", name: "Shona" },
  { code: "scn", name: "Sicilian" },
  { code: "szl", name: "Silesian" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sus", name: "Susu" },
  { code: "sw", name: "Swahili" },
  { code: "ss", name: "Swati" },
  { code: "sv", name: "Swedish" },
  { code: "ty", name: "Tahitian" },
  { code: "tg", name: "Tajik" },
  { code: "ber-Latn", name: "Tamazight" },
  { code: "ber", name: "Tamazight (Tifinagh)" },
  { code: "ta", name: "Tamil" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu" },
  { code: "tet", name: "Tetum" },
  { code: "th", name: "Thai" },
  { code: "bo", name: "Tibetan" },
  { code: "ti", name: "Tigrinya" },
  { code: "tiv", name: "Tiv" },
  { code: "tpi", name: "Tok Pisin" },
  { code: "to", name: "Tongan" },
  { code: "lua", name: "Tshiluba" },
  { code: "ts", name: "Tsonga" },
  { code: "tn", name: "Tswana" },
  { code: "tcy", name: "Tulu" },
  { code: "tum", name: "Tumbuka" },
  { code: "tr", name: "Turkish" },
  { code: "tk", name: "Turkmen" },
  { code: "tyv", name: "Tuvan" },
  { code: "ak", name: "Twi" },
  { code: "udm", name: "Udmurt" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek" },
  { code: "ve", name: "Venda" },
  { code: "vec", name: "Venetian" },
  { code: "vi", name: "Vietnamese" },
  { code: "war", name: "Waray" },
  { code: "cy", name: "Welsh" },
  { code: "wo", name: "Wolof" },
  { code: "xh", name: "Xhosa" },
  { code: "sah", name: "Yakut" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "yua", name: "Yucatec Maya" },
  { code: "zap", name: "Zapotec" },
  { code: "zu", name: "Zulu" }
];

export default function TranslateWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { prefs, status } = useCookieConsent();
  const translateEnabled = prefs.marketing;

  useEffect(() => {
    // Hide all default Google Translate UI elements completely
    const style = document.createElement("style");
    style.innerHTML = `
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }
      #google_translate_element { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    // Parse current language from googtrans cookie if it exists
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1].toUpperCase());
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode.toUpperCase());
    setIsOpen(false);
    
    // Set the cookie for Google Translate
    if (langCode === "en") {
      document.cookie = "googtrans=/en/en; path=/";
      document.cookie = "googtrans=/en/en; domain=" + location.hostname + "; path=/";
    } else {
      document.cookie = "googtrans=/en/" + langCode + "; path=/";
      document.cookie = "googtrans=/en/" + langCode + "; domain=" + location.hostname + "; path=/";
    }
    
    // Reload the page to apply the translation immediately
    window.location.reload();
  };

  return (
    <div className="relative notranslate" ref={dropdownRef}>
      <div id="google_translate_element" className="hidden" />
      {/* Only load Google Translate if marketing cookies are consented */}
      {translateEnabled && (
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface/50 text-text/80 text-xs font-semibold hover:border-accent/40 hover:text-accent transition-all duration-300"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="uppercase">{currentLang}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-surface shadow-xl z-[999]"
          >
            {!translateEnabled ? (
              <div className="px-4 py-5 text-center">
                <Lock className="w-5 h-5 text-text/30 mx-auto mb-2" />
                <p className="text-[11px] text-text/60 leading-snug">
                  Enable <span className="text-accent font-semibold">Marketing cookies</span> in the cookie banner to use site translation.
                </p>
              </div>
            ) : (
              <div className="py-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-accent/5 hover:text-accent transition-colors ${
                      currentLang === lang.code.toUpperCase() ? "text-accent font-bold bg-accent/5" : "text-text/70"
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-[10px] uppercase font-bold text-text/40">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
