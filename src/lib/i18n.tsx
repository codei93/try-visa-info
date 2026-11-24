"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  locales,
  translate,
  isLocale,
  type Locale,
  type TKey,
} from "@/lib/messages";

// Re-exported so existing imports from "@/lib/i18n" keep working.
export { locales };
export type { Locale, TKey };

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: TKey, vars?: Record<string, string>) => string;
  /** Prefix an app path (e.g. "/blog") with the current locale. */
  href: (path: string) => string;
}
const I18nContext = createContext<Ctx | null>(null);

/**
 * The locale comes from the URL (/en, /fr, /es, /ar) and nothing else.
 * Switching language navigates to the same page under the new locale, so every
 * language has its own crawlable URL.
 */
export function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    const parts = pathname.split("/");
    // parts[0] is "", parts[1] is the current locale segment
    if (parts[1] && isLocale(parts[1])) parts[1] = next;
    else parts.splice(1, 0, next);
    const target =
      parts.join("/") + window.location.search + window.location.hash;
    router.push(target);
  };

  const t = (k: TKey, vars?: Record<string, string>) => translate(locale, k, vars);
  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, href }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
