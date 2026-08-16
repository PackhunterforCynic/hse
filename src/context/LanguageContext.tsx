"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Language {
  code: string;
  name: string;
  native: string;
  direction: "ltr" | "rtl";
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "English", direction: "ltr" },
  { code: "es", name: "Spanish", native: "Español", direction: "ltr" },
  { code: "hi", name: "Hindi", native: "हिन्दी", direction: "ltr" },
  { code: "bn", name: "Bengali", native: "বাংলা", direction: "ltr" },
  { code: "ar", name: "Arabic", native: "العربية", direction: "rtl" },
];

const dictionaries: Record<string, Record<string, string>> = {
  en: {
    "nav.productions": "Productions",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.gallery": "Gallery",
    "nav.clients": "Clients",
    "nav.academy": "Academy",
    "nav.courses": "Courses",
    "nav.lessons": "Lessons",
    "nav.internships": "Internships",
    "nav.inquire": "Inquire Now",
    "hero.tagline": "Stories that Inspire. Films that Endure. Brands that Live.",
    "home.featured": "Featured Projects",
    "home.why": "Why Havilah",
    "home.testimonials": "Client Voices",
    "about.title": "About Havilah",
    "about.team": "Meet the Crew",
    "contact.title": "Get In Touch",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.message": "Message",
    "contact.submit": "Submit Message",
    "contact.success": "Message Transmitted!",
    "chatbot.title": "Havilah AI Assistant",
  },
  es: {
    "nav.productions": "Producciones",
    "nav.projects": "Proyectos",
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.gallery": "Galería",
    "nav.clients": "Clientes",
    "nav.academy": "Academia",
    "nav.courses": "Cursos",
    "nav.lessons": "Lecciones",
    "nav.internships": "Prácticas",
    "nav.inquire": "Inquire Ahora",
    "hero.tagline": "Historias que inspiran. Películas que perduran. Marcas que viven.",
    "home.featured": "Proyectos Destacados",
    "home.why": "Por qué Havilah",
    "home.testimonials": "Voces de Clientes",
    "about.title": "Sobre Havilah",
    "about.team": "Conoce al Equipo",
    "contact.title": "Ponte en Contacto",
    "contact.name": "Nombre Completo",
    "contact.email": "Dirección de Correo",
    "contact.message": "Mensaje",
    "contact.submit": "Enviar Mensaje",
    "contact.success": "¡Mensaje Transmitido!",
    "chatbot.title": "Asistente Havilah AI",
  },
  hi: {
    "nav.productions": "उत्पादन",
    "nav.projects": "परियोजनाएं",
    "nav.services": "सेवाएं",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.gallery": "गैलरी",
    "nav.clients": "ग्राहक",
    "nav.academy": "अकादमी",
    "nav.courses": "पाठ्यक्रम",
    "nav.lessons": "सबक",
    "nav.internships": "इंटर्नशिप",
    "nav.inquire": "अभी पूछताछ करें",
    "hero.tagline": "कहानियां जो प्रेरित करती हैं। फिल्में जो स्थायी हैं। ब्रांड जो जीवित हैं।",
    "home.featured": "विशेष रुप से प्रदर्शित काम",
    "home.why": "हविलाह क्यों",
    "home.testimonials": "ग्राहकों की आवाज़",
    "about.title": "हविलाह के बारे में",
    "about.team": "क्रू से मिलें",
    "contact.title": "संपर्क में रहें",
    "contact.name": "पूरा नाम",
    "contact.email": "ईमेल पता",
    "contact.message": "संदेश",
    "contact.submit": "संदेश भेजें",
    "contact.success": "संदेश भेजा गया!",
    "chatbot.title": "हविलाह एआई सहायक",
  },
  bn: {
    "nav.productions": "প্রযোজনা",
    "nav.projects": "প্রকল্পসমূহ",
    "nav.services": "সেবাসমূহ",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.contact": "যোগাযোগ",
    "nav.gallery": "গ্যালারি",
    "nav.clients": "ক্লায়েন্ট",
    "nav.academy": "একাডেমি",
    "nav.courses": "কোর্সসমূহ",
    "nav.lessons": "পাঠসমূহ",
    "nav.internships": "ইন্টার্নশিপ",
    "nav.inquire": "যোগাযোগ করুন",
    "hero.tagline": "গল্প যা অনুপ্রাণিত করে। চলচ্চিত্র যা টিকে থাকে। ব্র্যান্ড যা বেঁচে থাকে।",
    "home.featured": "অনন্য চলচ্চিত্রসমূহ",
    "home.why": "কেন হাবিলাহ",
    "home.testimonials": "গ্রাহকের মতামত",
    "about.title": "হাবিलाহ সম্পর্কে",
    "about.team": "আমাদের দল",
    "contact.title": "যোগাযোগ করুন",
    "contact.name": "সম্পূর্ণ নাম",
    "contact.email": "ইমেল ঠিকানা",
    "contact.message": "বার্তা",
    "contact.submit": "বার্তা পাঠান",
    "contact.success": "বার্তা পাঠানো হয়েছে!",
    "chatbot.title": "হাবিলাহ এআই অ্যাসিস্ট্যান্ট",
  },
  ar: {
    "nav.productions": "الإنتاج",
    "nav.projects": "المشاريع",
    "nav.services": "الخدمات",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.gallery": "المعرض",
    "nav.clients": "العملاء",
    "nav.academy": "الأكاديمية",
    "nav.courses": "الدورات",
    "nav.lessons": "الدروس",
    "nav.internships": "التدريب",
    "nav.inquire": "استفسر الآن",
    "hero.tagline": "قصص تلهم. أفلام تدوم. علامات تجارية تعيش.",
    "home.featured": "المشاريع المميزة",
    "home.why": "لماذا هافيلاه",
    "home.testimonials": "آراء العملاء",
    "about.title": "حول هافيلاه",
    "about.team": "طاقم العمل",
    "contact.title": "تواصل معنا",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.message": "الرسالة",
    "contact.submit": "إرسال الرسالة",
    "contact.success": "تم إرسال الرسالة بنجاح!",
    "chatbot.title": "هافيلاه مساعد ذكي",
  },
};

interface LanguageContextType {
  language: string;
  t: (key: string) => string;
  changeLanguage: (code: string) => void;
  direction: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("havilah_lang");
    if (saved && dictionaries[saved]) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const langConfig = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
    if (typeof document !== "undefined") {
      document.documentElement.lang = langConfig.code;
      document.documentElement.dir = langConfig.direction;
    }
    localStorage.setItem("havilah_lang", language);
  }, [language]);

  const changeLanguage = (code: string) => {
    if (dictionaries[code]) {
      setLanguage(code);
    }
  };

  const t = (key: string): string => {
    const dict = dictionaries[language] || dictionaries.en;
    return dict[key] || dictionaries.en[key] || "";
  };

  const direction = (LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]).direction;

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
