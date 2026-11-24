// src/lib/hydrate.ts
// Pure helpers that turn raw database rows into display-ready values for a
// locale. No Supabase import here, so client components can use it safely.

import { t, tArray, flagFromIso } from "@/lib/localized";
import { translate } from "@/lib/messages";
import {
  formatFee,
  formatFeeRange,
  formatProcessingDays,
  formatDays,
} from "@/lib/format";
import type {
  Country,
  VisaType,
  VisaRequirement,
  VisaStatus,
  BlogPost,
  BlogPostWithTranslation,
  FeeItem,
  Locale,
} from "@/types/database";

export function hydrateRequirement(req: VisaRequirement, locale: Locale) {
  const varies = translate(locale, "visa.varies");
  const hasFeeTotal = req.fee_total_min != null || req.fee_total_max != null;
  return {
    status: req.status as VisaStatus,
    visaFreeDays: req.visa_free_days,
    typeCode: req.type_code ?? undefined,
    visaType: t(req.visa_type, locale) ?? "",
    entryType: req.entry_type
      ? translate(locale, `visa.entryType.${req.entry_type}` as never)
      : varies,
    validity: formatDays(req.validity_days, locale, varies),
    maxStay: formatDays(req.max_stay_days, locale, varies),
    processingTime: formatProcessingDays(
      req.processing_days_min,
      req.processing_days_max,
      locale,
      varies
    ),
    officialFee: formatFee(req.fee_amount, req.fee_currency, locale, varies),
    mandatoryDocs: tArray(req.mandatory_docs, locale),
    supportingDocs: tArray(req.supporting_docs, locale),
    steps: tArray(req.steps, locale),
    fees: ((req.fees ?? []) as FeeItem[]).map((f) => ({
      item: t(f.label, locale) ?? f.key,
      cost: formatFeeRange(f.min, f.max, f.currency, locale, varies),
    })),
    feeTotal: hasFeeTotal
      ? formatFeeRange(req.fee_total_min, req.fee_total_max, req.fee_currency, locale, varies)
      : null,
    applyUrl: req.apply_url || null,
    embassyUrl: req.embassy_url || null,
    lastVerified: req.last_verified,
    detailed: req.detailed,
  };
}

export function hydrateCountry(country: Country, locale: Locale) {
  return {
    id: country.id,
    slug: country.slug,
    name: (t(country.name, locale) ?? "Unknown") as string,
    flag: flagFromIso(country.iso_code),
  };
}

export function hydrateVisaType(visaType: VisaType, locale: Locale) {
  const varies = translate(locale, "visa.varies");
  return {
    code: visaType.code,
    name: (t(visaType.name, locale) ?? "") as string,
    icon: visaType.icon,
    description: (t(visaType.description, locale) ?? "") as string,
    stay: formatDays(visaType.stay_days_max, locale, varies),
    processing: formatProcessingDays(
      visaType.processing_days_min,
      visaType.processing_days_max,
      locale,
      varies
    ),
  };
}

export function hydrateBlogPost(
  post: BlogPostWithTranslation,
  locale: Locale,
  countries?: Country[]
): BlogPost {
  void locale;
  const countryById = countries
    ? Object.fromEntries(countries.map((c) => [c.id, c.slug]))
    : {};
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    cover: post.blog_posts.cover_url,
    tags: post.blog_posts.tags,
    date: post.blog_posts.date,
    readTime: post.blog_posts.read_time,
    author: post.blog_posts.author,
    related: {
      origin: post.blog_posts.related_origin_id
        ? countryById[post.blog_posts.related_origin_id]
        : undefined,
      destination: post.blog_posts.related_destination_id
        ? countryById[post.blog_posts.related_destination_id]
        : undefined,
    },
    content: post.content.split("\n\n").filter(Boolean),
    published: post.blog_posts.published,
    created_at: post.blog_posts.created_at,
    updated_at: post.blog_posts.updated_at,
  };
}
