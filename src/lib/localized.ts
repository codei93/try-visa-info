// src/lib/localized.ts
// Helpers for reading locale-keyed jsonb columns with fallback to "en".

import type { Locale } from '@/types/database';

export const locales: Locale[] = ['en', 'fr', 'es', 'ar'];

/**
 * Pick a localized value from a locale-keyed jsonb object with fallback to "en".
 * Returns undefined if neither the requested locale nor "en" exists.
 */
export function t<T>(obj: Record<string, T> | null | undefined, locale: Locale): T | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  return obj[locale] ?? obj['en'] ?? undefined;
}

/**
 * Pick a localized array of strings (e.g. mandatory_docs[locale]) with fallback to "en".
 */
export function tArray(
  obj: Record<string, unknown> | null | undefined,
  locale: Locale
): string[] {
  const val = t(obj, locale);
  return Array.isArray(val) ? (val as string[]) : [];
}

/**
 * Derive a flag emoji from an ISO 3166-1 alpha-2 country code.
 * Regional indicator symbols: 'A' = U+1F1E6, so offset = code.charCodeAt(0) - 'A'.charCodeAt(0) + 0x1F1E6.
 */
export function flagFromIso(isoCode: string | null | undefined): string {
  if (!isoCode || isoCode.length !== 2) return '🏳️';
  const cp1 = isoCode.charCodeAt(0) - 'A'.charCodeAt(0) + 0x1f1e6;
  const cp2 = isoCode.charCodeAt(1) - 'A'.charCodeAt(0) + 0x1f1e6;
  return String.fromCodePoint(cp1, cp2);
}
