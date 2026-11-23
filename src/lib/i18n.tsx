"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const locales = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
] as const;
export type Locale = (typeof locales)[number]["code"];

const en = {
  "nav.home": "Home",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.privacy": "Privacy Policy",
  "hero.title": "Find Visa Requirements Instantly",
  "hero.subtitle":
    "Select your origin and destination country to get documents, fees, processing time and step-by-step guidance",
  "search.origin": "I'm a citizen of",
  "search.destination": "Travelling to",
  "search.pick": "Select a country",
  "search.cta": "Check requirements",
  "search.allTypes": "See all visa types",
  "how.title": "How it works",
  "how.1": "Choose your origin country",
  "how.2": "Choose your destination country",
  "how.3": "Get instant visa requirements",
  "popular.title": "Popular routes",
  "why.title": "Why travelers use us",
  "why.1": "Regularly verified data",
  "why.2": "Covers 50+ countries",
  "why.3": "Official fee estimates",
  "why.4": "Step-by-step process",
  "footer.tagline": "Clear visa requirements for every journey.",
  "footer.disclaimer":
    "Information is for guidance only. Always verify with official embassy sources before applying.",
  "footer.rights": "All rights reserved.",
  "visa.required": "Visa required",
  "visa.yes": "Yes",
  "visa.no": "No",
  "visa.onArrival": "On arrival",
  "visa.type": "Visa type",
  "visa.entry": "Entry type",
  "visa.validity": "Validity",
  "visa.maxStay": "Max stay",
  "visa.processing": "Processing time",
  "visa.fee": "Official fee",
  "visa.verified": "Last verified",
  "visa.mandatory": "Mandatory documents",
  "visa.supporting": "Supporting documents (recommended)",
  "visa.process": "Application process",
  "visa.fees": "Fee breakdown",
  "visa.item": "Item",
  "visa.cost": "Cost (USD)",
  "visa.total": "Estimated total",
  "visa.feeNote": "Fee estimates only. Confirm current fees on the official embassy website.",
  "visa.apply": "Apply on official website",
  "visa.embassy": "Find nearest embassy",
  "visa.disclaimer":
    "This information is for guidance only and may change without notice. Always verify requirements directly with the official embassy or consulate before submitting your application. TryVisaInfo is not responsible for visa decisions or outcomes.",
  "visa.otherFrom": "Other popular visas from",
  "visa.articles": "Related articles",
  "visa.overview": "Visa overview",
  "visa.generic": "General guidance — detailed data for this route is being verified.",
  "visa.checked": "gathered",
  "types.title": "All {country} visa types",
  "types.subtitle": "Select the visa type that matches your purpose of travel",
  "types.tap": "Select a visa type to see its exact documents, fees and steps.",
  "types.stay": "Typical stay",
  "types.check": "Check requirements",
  "types.chooseOrigin": "Choose your nationality",
  "blog.title": "Visa guides & travel tips",
  "blog.read": "Read more",
  "blog.min": "min read",
  "blog.related": "Related posts",
  "common.prev": "Previous",
  "common.next": "Next",
  "common.visaTypes": "Visa types",
  "ad.label": "Advertisement",
};
type Dict = typeof en;
export type TKey = keyof Dict;

const fr: Partial<Dict> = {
  "nav.home": "Accueil",
  "nav.blog": "Blog",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "nav.privacy": "Confidentialité",
  "hero.title": "Trouvez les exigences de visa instantanément",
  "hero.subtitle":
    "Choisissez votre pays d'origine et de destination pour obtenir documents, frais, délais et étapes",
  "search.origin": "Je suis citoyen de",
  "search.destination": "Je voyage vers",
  "search.pick": "Choisir un pays",
  "search.cta": "Voir les exigences",
  "search.allTypes": "Tous les types de visa",
  "how.title": "Comment ça marche",
  "how.1": "Choisissez votre pays d'origine",
  "how.2": "Choisissez votre destination",
  "how.3": "Obtenez les exigences",
  "popular.title": "Itinéraires populaires",
  "why.title": "Pourquoi nous choisir",
  "why.1": "Données vérifiées régulièrement",
  "why.2": "Plus de 50 pays",
  "why.3": "Estimation des frais officiels",
  "why.4": "Processus étape par étape",
  "footer.tagline": "Des exigences de visa claires pour chaque voyage.",
  "footer.disclaimer":
    "Informations à titre indicatif. Vérifiez toujours auprès de l'ambassade officielle.",
  "footer.rights": "Tous droits réservés.",
  "visa.required": "Visa requis",
  "visa.yes": "Oui",
  "visa.no": "Non",
  "visa.onArrival": "À l'arrivée",
  "visa.type": "Type de visa",
  "visa.entry": "Type d'entrée",
  "visa.validity": "Validité",
  "visa.maxStay": "Séjour max",
  "visa.processing": "Délai de traitement",
  "visa.fee": "Frais officiels",
  "visa.verified": "Vérifié le",
  "visa.mandatory": "Documents obligatoires",
  "visa.supporting": "Documents complémentaires (recommandés)",
  "visa.process": "Procédure de demande",
  "visa.fees": "Détail des frais",
  "visa.item": "Élément",
  "visa.cost": "Coût (USD)",
  "visa.total": "Total estimé",
  "visa.feeNote": "Estimations uniquement. Confirmez les frais sur le site officiel.",
  "visa.apply": "Postuler sur le site officiel",
  "visa.embassy": "Trouver l'ambassade",
  "visa.disclaimer":
    "Ces informations sont indicatives et peuvent changer. Vérifiez toujours auprès de l'ambassade ou du consulat officiel. TryVisaInfo n'est pas responsable des décisions de visa.",
  "visa.otherFrom": "Autres visas populaires depuis",
  "visa.articles": "Articles liés",
  "visa.overview": "Aperçu du visa",
  "visa.generic": "Indications générales — données détaillées en cours de vérification.",
  "visa.checked": "rassemblés",
  "types.title": "Tous les visas {country}",
  "types.subtitle": "Choisissez le visa correspondant au but de votre voyage",
  "types.tap": "Sélectionnez un type de visa pour voir ses documents, frais et étapes.",
  "types.stay": "Séjour typique",
  "types.check": "Voir les exigences",
  "types.chooseOrigin": "Choisissez votre nationalité",
  "blog.title": "Guides visa et conseils",
  "blog.read": "Lire la suite",
  "blog.min": "min de lecture",
  "blog.related": "Articles similaires",
  "common.prev": "Précédent",
  "common.next": "Suivant",
  "common.visaTypes": "Types de visa",
  "ad.label": "Publicité",
};
const es: Partial<Dict> = {
  "nav.home": "Inicio",
  "nav.blog": "Blog",
  "nav.about": "Acerca de",
  "nav.contact": "Contacto",
  "nav.privacy": "Privacidad",
  "hero.title": "Encuentra los requisitos de visa al instante",
  "hero.subtitle":
    "Elige tu país de origen y destino para ver documentos, tarifas, plazos y pasos a seguir",
  "search.origin": "Soy ciudadano de",
  "search.destination": "Viajo a",
  "search.pick": "Elige un país",
  "search.cta": "Ver requisitos",
  "search.allTypes": "Todos los tipos de visa",
  "how.title": "Cómo funciona",
  "how.1": "Elige tu país de origen",
  "how.2": "Elige tu destino",
  "how.3": "Obtén los requisitos al instante",
  "popular.title": "Rutas populares",
  "why.title": "Por qué elegirnos",
  "why.1": "Datos verificados con frecuencia",
  "why.2": "Más de 50 países",
  "why.3": "Tarifas oficiales estimadas",
  "why.4": "Proceso paso a paso",
  "footer.tagline": "Requisitos de visa claros para cada viaje.",
  "footer.disclaimer":
    "Información orientativa. Verifica siempre con la embajada oficial antes de solicitar.",
  "footer.rights": "Todos los derechos reservados.",
  "visa.required": "Visa requerida",
  "visa.yes": "Sí",
  "visa.no": "No",
  "visa.onArrival": "A la llegada",
  "visa.type": "Tipo de visa",
  "visa.entry": "Tipo de entrada",
  "visa.validity": "Validez",
  "visa.maxStay": "Estancia máx.",
  "visa.processing": "Tiempo de trámite",
  "visa.fee": "Tarifa oficial",
  "visa.verified": "Verificado",
  "visa.mandatory": "Documentos obligatorios",
  "visa.supporting": "Documentos de apoyo (recomendados)",
  "visa.process": "Proceso de solicitud",
  "visa.fees": "Desglose de tarifas",
  "visa.item": "Concepto",
  "visa.cost": "Costo (USD)",
  "visa.total": "Total estimado",
  "visa.feeNote": "Solo estimaciones. Confirma las tarifas en el sitio oficial.",
  "visa.apply": "Solicitar en el sitio oficial",
  "visa.embassy": "Buscar embajada",
  "visa.disclaimer":
    "Esta información es orientativa y puede cambiar. Verifica siempre con la embajada o consulado oficial. TryVisaInfo no se responsabiliza de las decisiones de visa.",
  "visa.otherFrom": "Otras visas populares desde",
  "visa.articles": "Artículos relacionados",
  "visa.overview": "Resumen de la visa",
  "visa.generic": "Guía general — los datos detallados de esta ruta se están verificando.",
  "visa.checked": "reunidos",
  "types.title": "Todos los visados de {country}",
  "types.subtitle": "Elige el visado que corresponde a tu viaje",
  "types.tap": "Selecciona un tipo de visa para ver sus documentos, tarifas y pasos.",
  "types.stay": "Estancia típica",
  "types.check": "Ver requisitos",
  "types.chooseOrigin": "Elige tu nacionalidad",
  "blog.title": "Guías de visa y consejos",
  "blog.read": "Leer más",
  "blog.min": "min de lectura",
  "blog.related": "Artículos relacionados",
  "common.prev": "Anterior",
  "common.next": "Siguiente",
  "common.visaTypes": "Tipos de visa",
  "ad.label": "Publicidad",
};
const ar: Partial<Dict> = {
  "nav.home": "الرئيسية",
  "nav.blog": "المدونة",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  "nav.privacy": "سياسة الخصوصية",
  "hero.title": "اعرف متطلبات التأشيرة فوراً",
  "hero.subtitle": "اختر بلدك ووجهتك للحصول على المستندات والرسوم ومدة المعالجة والخطوات",
  "search.origin": "أنا مواطن من",
  "search.destination": "مسافر إلى",
  "search.pick": "اختر دولة",
  "search.cta": "عرض المتطلبات",
  "search.allTypes": "كل أنواع التأشيرات",
  "how.title": "كيف يعمل",
  "how.1": "اختر بلدك",
  "how.2": "اختر وجهتك",
  "how.3": "احصل على المتطلبات فوراً",
  "popular.title": "مسارات شائعة",
  "why.title": "لماذا نحن",
  "why.1": "بيانات يتم التحقق منها بانتظام",
  "why.2": "أكثر من 50 دولة",
  "why.3": "تقديرات الرسوم الرسمية",
  "why.4": "خطوات واضحة",
  "footer.tagline": "متطلبات تأشيرة واضحة لكل رحلة.",
  "footer.disclaimer": "المعلومات للإرشاد فقط. تحقق دائماً من السفارة الرسمية قبل التقديم.",
  "footer.rights": "جميع الحقوق محفوظة.",
  "visa.required": "التأشيرة مطلوبة",
  "visa.yes": "نعم",
  "visa.no": "لا",
  "visa.onArrival": "عند الوصول",
  "visa.type": "نوع التأشيرة",
  "visa.entry": "نوع الدخول",
  "visa.validity": "الصلاحية",
  "visa.maxStay": "أقصى إقامة",
  "visa.processing": "مدة المعالجة",
  "visa.fee": "الرسوم الرسمية",
  "visa.verified": "آخر تحقق",
  "visa.mandatory": "المستندات الإلزامية",
  "visa.supporting": "مستندات داعمة (موصى بها)",
  "visa.process": "خطوات التقديم",
  "visa.fees": "تفاصيل الرسوم",
  "visa.item": "البند",
  "visa.cost": "التكلفة (دولار)",
  "visa.total": "الإجمالي التقديري",
  "visa.feeNote": "تقديرات فقط. تأكد من الرسوم على الموقع الرسمي.",
  "visa.apply": "قدّم عبر الموقع الرسمي",
  "visa.embassy": "أقرب سفارة",
  "visa.disclaimer":
    "هذه المعلومات للإرشاد فقط وقد تتغير دون إشعار. تحقق دائماً من السفارة أو القنصلية الرسمية قبل التقديم. TryVisaInfo غير مسؤول عن قرارات التأشيرة.",
  "visa.otherFrom": "تأشيرات شائعة أخرى من",
  "visa.articles": "مقالات ذات صلة",
  "visa.overview": "نظرة عامة",
  "visa.generic": "إرشادات عامة — يجري التحقق من البيانات التفصيلية لهذا المسار.",
  "visa.checked": "تم جمعها",
  "types.title": "كل تأشيرات {country}",
  "types.subtitle": "اختر التأشيرة المناسبة لغرض سفرك",
  "types.tap": "اختر نوع التأشيرة لعرض المستندات والرسوم والخطوات الخاصة بها.",
  "types.stay": "مدة الإقامة",
  "types.check": "عرض المتطلبات",
  "types.chooseOrigin": "اختر جنسيتك",
  "blog.title": "أدلة التأشيرات ونصائح السفر",
  "blog.read": "اقرأ المزيد",
  "blog.min": "دقائق قراءة",
  "blog.related": "مقالات مشابهة",
  "common.prev": "السابق",
  "common.next": "التالي",
  "common.visaTypes": "أنواع التأشيرات",
  "ad.label": "إعلان",
};

const dicts: Record<Locale, Partial<Dict>> = { en, fr, es, ar };

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: TKey, vars?: Record<string, string>) => string;
}
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    (initialLocale as Locale) || "en"
  );

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && saved in dicts) setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = (l: Locale) => {
    localStorage.setItem("locale", l);
    setLocaleState(l);
  };

  const t = (k: TKey, vars?: Record<string, string>) => {
    let s = dicts[locale][k] ?? en[k];
    if (vars) for (const [key, v] of Object.entries(vars)) s = s.replace(`{${key}}`, v);
    return s;
  };

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

/**
 * Server-side translation helper. Looks up a translation key in the given
 * locale dictionary, falling back to "en" when the key is missing.
 */
export function t(locale: Locale, key: TKey, vars?: Record<string, string>): string {
  let s = dicts[locale][key] ?? en[key];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}
