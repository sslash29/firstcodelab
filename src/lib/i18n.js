"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// Translation dictionaries (extend as needed)
const dictionaries = {
  en: {
    brand: "firstcodelab",
    nav: {
      courses: "Courses",
      projects: "Projects",
      pricing: "Pricing",
      about: "About",
      contact: "Contact Us",
      login: "log in",
    },
    codingBar: {
      learnCodingWith: "learn coding with",
      anyLanguage: "any langauge",
      youChoose: "you choose",
    },
    hero: {
      line1: "Empowering the",
      line2: "Next Generation of",
      line3: "[ ...Developers... ]",
      point1: "1 : 1 Online Classes For All Ages",
      point2: "High Quality, Cheap Prices",
      point3: "For All ages, whether a toddler, teenager, adult",
      explore: "explore more",
      startCoding:
        "Start Coding by choosing your own path, Creating Games, Website and much more...",
      weAreBest: "We Are Best",
      teaching: "Teaching",
      mastering: "Mastering",
      joinCommunity: "Join A Big Community",
      stats: {
        students: "Students",
        countries: "Countries",
        courses: "Courses",
      },
    },
    tech: {
      learnModern: "Learn Modern Technology",
      frontendDev: "Frontend Development",
      frontendDesc:
        "start by learning the basics of frontend with its latest updates!.",
      frontendBullet1: "Learn Basics of Frontend",
      frontendBullet2: "Master The Modern Way Of Writing Code",
      frontendBullet3: "Learn By Practicing",
      jsLibrary: "Learn JS Library",
      upSkills: "Up your skills with React",
      writeProfessional: "Write code in a professional way",
      learnFramework: "Learn Framework",
      masterModernTech: "Master Modern Tech",
      learnNext: "Learn the framework built for React, Next.js.",
      backendLang: "Backend Language",
      serverSideLang: "Server-Side Language",
      serverSideDesc: "Widely-used language for web, data, and scripting.",
      mobileFramework: "Mobile Framework",
      crossPlatformDesc:
        "Cross-platform language for responsive and native-feeling apps.",
      backendDev: "Backend Development",
      backendDesc:
        "start by learning the basics of backend with its best security practices!.",
      backendBullet1: "Learn Basics of Backend",
      backendBullet2: "Learn SQL",
      backendBullet3: "Create Your Own Server",
    },
    pricing: {
      title1: "We’ve got the plan that’s",
      title2: "Perfect For You",
      silverPlan: "Silver Plan",
      goldPlan: "Gold Plan",
      customPlan: "Custom Plan",
      popular: "Popular",
      perMonth: "per month",
      getStarted: "Get Started",
      featuresTitle: "FEATURES",
      silverFeatures: [
        "In a Group of the least amount is 4",
        "Choose The Path You Want to follow",
        "We Can Create a custom plan for you",
      ],
      goldFeatures: [
        "Personalized 1:1 Course with Instructor",
        "Choose The Path You Want to follow",
        "We Can Create a custom plan for you",
        "12/7 Chat Support for Any Issues",
      ],
      customFeatures: [
        "Personalized 1:1 Course with Instructor",
        "Personalized Time of each session",
        "24/7 Chat Support for Any Issues",
        "Customizable Curriculum (based on skill level or goals)",
        "Dedicated Instructor (Mentor)",
      ],
    },
    footer: {
      tagline: "Making your experience better one step at a time.",
      company: "Company",
      whatsapp: "Whatsapp",
      facebook: "Facebook",
      rights: (year) => `© ${year} firstcodelab. All rights reserved.`,
    },
  },
  ar: {
    brand: "فيرست كود لاب",
    nav: {
      courses: "الدورات",
      projects: "المشاريع",
      pricing: "الأسعار",
      about: "من نحن",
      contact: "تواصل معنا",
      login: "تسجيل الدخول",
    },
    codingBar: {
      learnCodingWith: "تعلّم البرمجة",
      anyLanguage: "بأي لغة",
      youChoose: "تختارها",
    },
    hero: {
      line1: "تمكين",
      line2: "الجيل القادم من",
      line3: "[ ...المطورين... ]",
      point1: "حصص مباشرة فردية لجميع الأعمار",
      point2: "جودة عالية وأسعار مناسبة",
      point3: "لكل الأعمار سواء طفل، مراهق أو بالغ",
      explore: "اكتشف المزيد",
      startCoding:
        "ابدأ البرمجة باختيار مسارك: إنشاء الألعاب والمواقع والمزيد...",
      weAreBest: "نحن الأفضل",
      teaching: "في التعليم",
      mastering: "في الإتقان",
      joinCommunity: "انضم إلى مجتمع كبير",
      stats: { students: "طالب", countries: "دولة", courses: "دورة" },
    },
    tech: {
      learnModern: "تعلّم أحدث التقنيات",
      frontendDev: "تطوير الواجهة",
      frontendDesc: "ابدأ بتعلم أساسيات الواجهة مع آخر التحديثات!",
      frontendBullet1: "تعلّم أساسيات الواجهة",
      frontendBullet2: "أتقن الأسلوب الحديث في كتابة الكود",
      frontendBullet3: "التعلم بالممارسة",
      jsLibrary: "مكتبة جافاسكربت",
      upSkills: "طوّر مهاراتك مع React",
      writeProfessional: "اكتب كوداً باحترافية",
      learnFramework: "إطار عمل",
      masterModernTech: "أتقن التقنية الحديثة",
      learnNext: "تعلّم الإطار المبني لـ React وهو Next.js.",
      backendLang: "لغة للخلفية",
      serverSideLang: "لغة من جهة الخادم",
      serverSideDesc: "لغة منتشرة للويب والبيانات والبرمجة النصية.",
      mobileFramework: "إطار للهاتف",
      crossPlatformDesc: "لغة متعددة المنصات لتطبيقات سريعة وطبيعية.",
      backendDev: "تطوير الخلفية",
      backendDesc: "ابدأ بتعلم أساسيات الخلفية مع أفضل ممارسات الأمان!",
      backendBullet1: "تعلّم أساسيات الخلفية",
      backendBullet2: "تعلّم SQL",
      backendBullet3: "أنشئ خادمك الخاص",
    },
    pricing: {
      title1: "لدينا الخطة التي",
      title2: "تناسبك تماماً",
      silverPlan: "الخطة الفضية",
      goldPlan: "الخطة الذهبية",
      customPlan: "خطة مخصصة",
      popular: "الأكثر طلباً",
      perMonth: "شهرياً",
      getStarted: "ابدأ الآن",
      featuresTitle: "المميزات",
      silverFeatures: [
        "مجموعة بحد أدنى ٤ طلاب",
        "اختر المسار الذي تريد اتباعه",
        "ننشئ خطة مخصصة لك",
      ],
      goldFeatures: [
        "دورة فردية 1:1 مع مدرب",
        "اختر المسار الذي تريد اتباعه",
        "ننشئ خطة مخصصة لك",
        "دعم محادثة 12/7 لأي مشكلة",
      ],
      customFeatures: [
        "دورة فردية 1:1 مع مدرب",
        "توقيت مخصص لكل جلسة",
        "دعم محادثة 24/7 لأي مشكلة",
        "منهج مخصص (حسب المستوى أو الأهداف)",
        "مدرب مخصص (موجّه)",
      ],
    },
    footer: {
      tagline: "نجعل تجربتك أفضل خطوة بخطوة.",
      company: "الشركة",
      whatsapp: "واتساب",
      facebook: "فيسبوك",
      rights: (year) => `© ${year} فيرست كود لاب. جميع الحقوق محفوظة.`,
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" && localStorage.getItem("lang");
    if (stored && (stored === "en" || stored === "ar")) setLang(stored);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "ar" : "en";
      if (typeof window !== "undefined") localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (path) => {
      const parts = path.split(".");
      let cur = dictionaries[lang];
      for (const p of parts) {
        if (cur == null) return path;
        cur = cur[p];
      }
      if (typeof cur === "function") return cur(new Date().getFullYear());
      return cur ?? path;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, toggleLang, t }), [lang, toggleLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={lang === "ar" ? "font-[system-ui]" : ""}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
