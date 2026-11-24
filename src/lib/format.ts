// src/lib/format.ts
// Locale-aware formatters for structured values (fees, days).
// Pure functions: safe in both server and client components.

import type { Locale } from '@/types/database';

const localeToIntl: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
  ar: 'ar-SA',
};

/**
 * Format a fee amount as currency for the given locale.
 * Returns `fallback` (already translated by the caller) when the amount is unknown.
 */
export function formatFee(
  amount: number | null | undefined,
  currency: string | null | undefined,
  locale: Locale = 'en',
  fallback = ''
): string {
  if (amount === null || amount === undefined || !currency) return fallback;
  return new Intl.NumberFormat(localeToIntl[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Format a fee range (min–max). Unknown ends fall back to the translated string. */
export function formatFeeRange(
  min: number | null | undefined,
  max: number | null | undefined,
  currency: string | null | undefined,
  locale: Locale = 'en',
  fallback = ''
): string {
  if (min == null && max == null) return fallback;
  if (min == null || max == null || min === max) {
    return formatFee((min ?? max) as number, currency, locale, fallback);
  }
  return `${formatFee(min, currency, locale, fallback)}–${formatFee(max, currency, locale, fallback)}`;
}

function days(n: number, locale: Locale): string {
  return new Intl.NumberFormat(localeToIntl[locale], {
    style: 'unit',
    unit: 'day',
    unitDisplay: 'long',
  }).format(n);
}

/** "3–10 days" in the page language; fallback when unknown. */
export function formatProcessingDays(
  min: number | null | undefined,
  max: number | null | undefined,
  locale: Locale = 'en',
  fallback = ''
): string {
  if (min == null && max == null) return fallback;
  if (min == null || max == null || min === max) return days((min ?? max) as number, locale);
  const nf = new Intl.NumberFormat(localeToIntl[locale]);
  const unit = days(max, locale).replace(nf.format(max), '').trim();
  return `${nf.format(min)}–${nf.format(max)} ${unit}`;
}

/** Max stay / validity in days; fallback when unknown. */
export function formatDays(
  value: number | null | undefined,
  locale: Locale = 'en',
  fallback = ''
): string {
  if (value == null) return fallback;
  return days(value, locale);
}
