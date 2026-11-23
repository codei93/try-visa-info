import { supabase } from "@/lib/supabase/server";
import { t, tArray, flagFromIso } from "@/lib/localized";
import {
  formatFee,
  formatFeeRange,
  formatProcessingDays,
  formatMaxStay,
  formatValidity,
} from "@/lib/format";
import type {
  Country,
  VisaType,
  VisaRequirement,
  BlogPost,
  BlogPostWithTranslation,
  FeeItem,
} from "@/types/database";
import type { Locale } from "@/types/database";

/**
 * Popular routes — curated featured list (kept static).
 * These are the routes shown on the homepage.
 */
export const popularRoutes: [string, string][] = [
  ["uganda", "usa"],
  ["nigeria", "uk"],
  ["ghana", "canada"],
  ["kenya", "germany"],
  ["philippines", "japan"],
  ["india", "uae"],
  ["pakistan", "saudi-arabia"],
  ["egypt", "france"],
  ["bangladesh", "switzerland"],
  ["south-africa", "poland"],
  ["ethiopia", "china"],
  ["tanzania", "japan"],
];

/**
 * Fetch all origin countries from Supabase.
 * Returns raw data with locale-keyed `name` jsonb — client localizes via `t()`.
 * Flag emoji is derived from `iso_code` in the client via `flagFromIso()`.
 */
export async function getOrigins(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("is_origin", true)
    .order("name->>en");

  if (error) throw error;
  return (data ?? []) as Country[];
}

/**
 * Fetch all destination countries from Supabase.
 */
export async function getDestinations(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("is_destination", true)
    .order("name->>en");

  if (error) throw error;
  return (data ?? []) as Country[];
}

/**
 * Fetch a single country by slug.
 */
export async function getDestination(slug: string): Promise<Country | null> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return (data ?? null) as Country | null;
}

/**
 * Fetch a single country by slug.
 */
export async function getCountry(slug: string): Promise<Country | null> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return (data ?? null) as Country | null;
}

/**
 * Fetch all visa types for a destination country.
 * Returns raw data with locale-keyed `name`/`description` jsonb,
 * including default_mandatory_docs, default_supporting_docs, default_steps
 * that serve as template defaults for visa_requirements overrides.
 */
export async function getVisaTypes(dest: string): Promise<VisaType[]> {
  const destCountry = await getCountry(dest);
  if (!destCountry) return [];

  const { data, error } = await supabase
    .from("visa_types")
    .select("*")
    .eq("destination_id", destCountry.id)
    .order("code");

  if (error) throw error;
  return (data ?? []) as VisaType[];
}

/**
 * Fetch the visa requirement for an origin/destination route, optionally filtered by visa type code.
 * Implements the template + override model:
 *   - If a visa_requirements row exists with non-NULL detail columns, those values are used.
 *   - If a column is NULL, the corresponding visa_types default is used instead.
 *   - If no visa_requirements row exists at all, a generic fallback is generated from visa_types.
 *
 * Returns a VisaRequirement with all detail columns resolved (no NULLs).
 * Falls back to generic guidance when no detailed record exists in the database.
 */
export async function getRequirement(
  origin: string,
  destination: string,
  typeCode?: string
): Promise<VisaRequirement | null> {
  const o = await getCountry(origin);
  const d = await getCountry(destination);
  if (!o || !d) return null;

  let query = supabase
    .from("visa_requirements")
    .select("*")
    .eq("origin_id", o.id)
    .eq("destination_id", d.id);

  if (typeCode) {
    query = query.eq("type_code", typeCode);
  }

  const { data: reqRow, error } = await query.single();

  // No requirement row at all — generate generic fallback from visa_types
  if (error || !reqRow) {
    return getGenericRequirement(o, d, typeCode);
  }

  // Fetch visa_types defaults for fallback when req columns are NULL
  const types = await getVisaTypes(d.slug);
  const type = types.find((t) => t.code === (reqRow.type_code ?? typeCode ?? types[0]?.code)) ?? types[0];

  if (!type) return null;

  // Resolve each field: use req value if non-NULL, otherwise fall back to visa_types default
  const resolved: VisaRequirement = {
    id: reqRow.id,
    origin_id: o.id,
    destination_id: d.id,
    type_code: reqRow.type_code ?? undefined,
    visa_required: reqRow.visa_required,
    visa_type: reqRow.visa_type ?? type.name,
    entry_type: reqRow.entry_type ?? "multiple",
    validity_days: reqRow.validity_days ?? null,
    max_stay_days: reqRow.max_stay_days ?? type.stay_days_max ?? null,
    processing_days_min: reqRow.processing_days_min ?? type.processing_days_min,
    processing_days_max: reqRow.processing_days_max ?? type.processing_days_max,
    official_fee_amount: reqRow.official_fee_amount ?? type.fee_amount,
    official_fee_currency: reqRow.official_fee_currency ?? type.fee_currency,
    mandatory_docs: reqRow.mandatory_docs ?? type.default_mandatory_docs,
    supporting_docs: reqRow.supporting_docs ?? type.default_supporting_docs,
    steps: reqRow.steps ?? type.default_steps,
    fees: reqRow.fees ?? [],
    fee_total_min: reqRow.fee_total_min ?? null,
    fee_total_max: reqRow.fee_total_max ?? null,
    apply_url: reqRow.apply_url ?? type.apply_url,
    embassy_url: reqRow.embassy_url ?? type.embassy_url,
    source_url: reqRow.source_url ?? type.source_url,
    last_verified: reqRow.last_verified ?? type.last_verified ?? new Date().toISOString().split("T")[0],
    detailed: reqRow.detailed,
    created_at: reqRow.created_at,
    updated_at: reqRow.updated_at,
  };

  return resolved as VisaRequirement;
}

/**
 * Build a generic visa requirement fallback when no detailed DB record exists.
 * Uses the destination's visa types for type-specific info.
 */
async function getGenericRequirement(
  o: Country,
  d: Country,
  typeCode?: string
): Promise<VisaRequirement | null> {
  const types = await getVisaTypes(d.slug);
  if (types.length === 0) return null;

  const type = types.find((t) => t.code === typeCode) ?? types[0];

  const dName = t(d.name, "en") ?? d.name;
  const oName = t(o.name, "en") ?? o.name;

  return {
    id: "",
    origin_id: o.id,
    destination_id: d.id,
    type_code: type.code,
    visa_required: "yes",
    visa_type: {
      en: type.name.en,
      fr: type.name.fr,
      es: type.name.es,
      ar: type.name.ar,
    },
    entry_type: "multiple",
    validity_days: null,
    max_stay_days: type.stay_days_max ?? null,
    processing_days_min: type.processing_days_min,
    processing_days_max: type.processing_days_max,
    official_fee_amount: type.fee_amount,
    official_fee_currency: type.fee_currency,
    mandatory_docs: type.default_mandatory_docs,
    supporting_docs: type.default_supporting_docs,
    steps: type.default_steps,
    fees: [],
    fee_total_min: null,
    fee_total_max: null,
    apply_url: type.apply_url ?? `https://www.google.com/search?q=${encodeURIComponent(`${dName} official visa application`)}`,
    embassy_url: type.embassy_url ?? `https://www.google.com/search?q=${encodeURIComponent(`${dName} embassy in ${oName}`)}`,
    source_url: type.source_url,
    last_verified: type.last_verified ?? new Date().toISOString().split("T")[0],
    detailed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetch all origin/destination pairs that have detailed (hand-verified) requirements.
 * Used for sitemap generation — only detailed routes get individual static pages.
 */
export async function getAllDetailedRoutePairs(): Promise<{
  origin: string;
  destination: string;
  typeCode?: string;
}[]> {
  const { data } = await supabase
    .from("visa_requirements")
    .select("origin_id, destination_id, type_code")
    .eq("detailed", true);

  if (!data) return [];

  // Resolve UUIDs to slugs
  const { data: countries } = await supabase.from("countries").select("id, slug");
  if (!countries) return [];

  const idToSlug = new Map(countries.map((c) => [c.id, c.slug]));

  return data
    .map((row) => ({
      origin: idToSlug.get(row.origin_id)!,
      destination: idToSlug.get(row.destination_id)!,
      typeCode: row.type_code ?? undefined,
    }))
    .filter((p) => p.origin && p.destination);
}

/**
 * Return every origin/destination pair for static pre-rendering.
 * Computes the cartesian product of all countries × all countries.
 */
export async function getAllOriginDestinationPairs(): Promise<{
  origin: string;
  destination: string;
}[]> {
  const { data: origins } = await supabase.from("countries").select("slug");
  const { data: destinations } = await supabase.from("countries").select("slug");

  const pairs: { origin: string; destination: string }[] = [];
  for (const o of origins ?? []) {
    for (const d of destinations ?? []) {
      pairs.push({ origin: o.slug, destination: d.slug });
    }
  }
  return pairs;
}

/**
 * Return all destination slugs for visa-types static pre-rendering.
 */
export async function getAllDestinationSlugs(): Promise<string[]> {
  const { data } = await supabase.from("countries").select("slug");
  return (data ?? []).map((c) => c.slug);
}

/**
 * Return all published blog post slugs (en locale) for sitemap generation.
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from("blog_post_translations")
    .select("slug")
    .eq("locale", "en");
  return (data ?? []).map((p) => p.slug);
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Client-side hydration helper: converts a raw VisaRequirement into a
 * client-ready object with localized, formatted values for the given locale.
 * Used by client components that receive raw Supabase data from server pages.
 *
 * Implements override resolution: if req columns are NULL, falls back to
 * visa_types defaults (already resolved in getRequirement).
 */
export function hydrateRequirement(
  req: VisaRequirement,
  locale: Locale
): {
  origin: string;
  destination: string;
  typeCode?: string;
  visaRequired: string;
  visaType: string;
  entryType: string;
  validity: string;
  maxStay: string;
  processingTime: string;
  officialFee: string;
  mandatoryDocs: string[];
  supportingDocs: string[];
  steps: string[];
  fees: { item: string; cost: string }[];
  feeTotal: string;
  applyUrl: string;
  embassyUrl: string;
  lastVerified: string;
  detailed: boolean;
} {
  return {
    origin: req.origin_id,
    destination: req.destination_id,
    typeCode: req.type_code ?? undefined,
    visaRequired: t(
      { en: req.visa_required, fr: req.visa_required, es: req.visa_required, ar: req.visa_required },
      locale
    ) ?? req.visa_required,
    visaType: t(req.visa_type, locale) ?? "",
    entryType: req.entry_type,
    validity: formatValidity(req.validity_days),
    maxStay: formatMaxStay(req.max_stay_days),
    processingTime: formatProcessingDays(req.processing_days_min, req.processing_days_max),
    officialFee: formatFee(req.official_fee_amount, req.official_fee_currency, locale),
    mandatoryDocs: tArray(req.mandatory_docs, locale),
    supportingDocs: tArray(req.supporting_docs, locale),
    steps: tArray(req.steps, locale),
    fees: (req.fees as FeeItem[]).map((f) => ({
      item: t(f.label, locale) ?? f.key,
      cost: formatFeeRange(f.min, f.max, f.currency, locale),
    })),
    feeTotal: formatFeeRange(req.fee_total_min, req.fee_total_max, req.official_fee_currency, locale),
    applyUrl: req.apply_url,
    embassyUrl: req.embassy_url,
    lastVerified: req.last_verified,
    detailed: req.detailed,
  };
}

/**
 * Client-side hydration helper: converts a raw Country into a client-ready
 * object with localized name and flag emoji for the given locale.
 */
export function hydrateCountry(country: Country, locale: Locale): {
  id: string;
  slug: string;
  name: string;
  flag: string;
} {
  return {
    id: country.id,
    slug: country.slug,
    name: (t(country.name, locale) ?? (country.name as Record<string, string>).en ?? "Unknown") as string,
    flag: flagFromIso(country.iso_code),
  };
}

/**
 * Client-side hydration helper: converts a raw VisaType into a client-ready
 * object with localized name/description for the given locale.
 */
export function hydrateVisaType(
  visaType: VisaType,
  locale: Locale
): {
  code: string;
  name: string;
  icon: string;
  description: string;
  stay: string;
  processing: string;
} {
  return {
    code: visaType.code,
    name: (t(visaType.name, locale) ?? (visaType.name as Record<string, string>).en ?? "") as string,
    icon: visaType.icon,
    description: (t(visaType.description, locale) ?? (visaType.description as Record<string, string>).en ?? "") as string,
    stay: formatMaxStay(visaType.stay_days_max),
    processing: formatProcessingDays(visaType.processing_days_min, visaType.processing_days_max),
  };
}

/**
 * Client-side hydration helper: converts a raw BlogPostWithTranslation into
 * a client-ready BlogPost object.
 * Optionally accepts a list of countries to resolve related_origin_id /
 * related_destination_id UUIDs into slugs for client-side comparison.
 */
export function hydrateBlogPost(
  post: BlogPostWithTranslation,
  locale: Locale,
  countries?: Country[]
): BlogPost {
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

/**
 * Fetch a single published blog post with its translation for the given locale.
 * Defaults to "en" when locale is omitted (server-side fallback).
 */
export async function getPost(
  slug: string,
  locale: Locale = "en"
): Promise<BlogPostWithTranslation | null> {
  const { data, error } = await supabase
    .from("blog_post_translations")
    .select(`
      *,
      blog_posts (
        id,
        cover_url,
        tags,
        date,
        read_time,
        author,
        related_origin_id,
        related_destination_id,
        published,
        created_at,
        updated_at
      )
    `)
    .eq("slug", slug)
    .eq("locale", locale)
    .single();

  if (error) return null;
  return data as BlogPostWithTranslation;
}

/**
 * Fetch all published blog posts with translations for the given locale.
 * Defaults to "en" when locale is omitted (server-side fallback).
 */
export async function getBlogPosts(locale: Locale = "en"): Promise<BlogPostWithTranslation[]> {
  const { data, error } = await supabase
    .from("blog_post_translations")
    .select(`
      *,
      blog_posts (
        id,
        cover_url,
        tags,
        date,
        read_time,
        author,
        related_origin_id,
        related_destination_id,
        published,
        created_at,
        updated_at
      )
    `)
    .eq("locale", locale);

  if (error) throw error;
  return (data ?? [])
    .sort(
      (a, b) =>
        new Date(b.blog_posts.date).getTime() -
        new Date(a.blog_posts.date).getTime()
    ) as BlogPostWithTranslation[];
}
