// src/lib/format.ts
// Formatters for structured values (fees, days) using Intl.NumberFormat.

import type { Locale } from '@/types/database';

const localeToIntl: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
  ar: 'ar-SA',
};

/**
 * Format a fee amount using Intl.NumberFormat for the given locale and currency.
 */
export function formatFee(
  amount: number | null,
  currency = 'USD',
  locale: Locale = 'en'
): string {
  if (amount === null || amount === undefined) return 'Varies';
  return new Intl.NumberFormat(localeToIntl[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a fee range (min–max) with currency.
 */
export function formatFeeRange(
  min: number | null,
  max: number | null,
  currency = 'USD',
  locale: Locale = 'en'
): string {
  if (min === null && max === null) return 'Varies';
  if (min === null) return `Up to ${formatFee(max, currency, locale)}`;
  if (max === null) return `From ${formatFee(min, currency, locale)}`;
  return `${formatFee(min, currency, locale)}–${formatFee(max, currency, locale)}`;
}

/**
 * Format processing days as a range (e.g. "3–10 days").
 */
export function formatProcessingDays(
  min: number,
  max: number
): string {
  if (min === max) return `${min} day${min !== 1 ? 's' : ''}`;
  return `${min}–${max} days`;
}

/**
 * Format max stay days (nullable).
 */
export function formatMaxStay(days: number | null): string {
  if (days === null) return 'Varies';
  return `${days} days`;
}

/**
 * Format validity days (nullable).
 */
export function formatValidity(days: number | null): string {
  if (days === null) return 'Varies';
  return `${days} days`;
}
