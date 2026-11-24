import "server-only";
import { cache } from "react";
import { supabase } from "@/lib/supabase/server";
import type {
  Country,
  VisaType,
  VisaRequirement,
  BlogPostWithTranslation,
  Locale,
} from "@/types/database";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Featured routes shown on the homepage (every pair must exist in the database). */
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

export async function getOrigins(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("is_origin", true)
    .order("name->>en");
  if (error) throw error;
  return (data ?? []) as Country[];
}

export async function getDestinations(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("is_destination", true)
    .order("name->>en");
  if (error) throw error;
  return (data ?? []) as Country[];
}

/** Fetch one country by slug (deduplicated per request via React cache). */
export const getCountry = cache(async (slug: string): Promise<Country | null> => {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) return null;
  return (data ?? null) as Country | null;
});

export const getDestination = getCountry;

/** All visa types of a destination (the templates), ordered by code. */
export const getVisaTypes = cache(async (dest: string): Promise<VisaType[]> => {
  const destCountry = await getCountry(dest);
  if (!destCountry) return [];
  const { data, error } = await supabase
    .from("visa_types")
    .select("*")
    .eq("destination_id", destCountry.id)
    .order("code");
  if (error) throw error;
  return (data ?? []) as VisaType[];
});

/**
 * The baseline requirement for an origin -> destination pair, merged with the
 * destination's visa_types template: a non-null value on the visa_requirements
 * row wins, otherwise the template default is used. Unknown values stay null.
 *
 * Returns null when the pair has no row, so the page can return a real 404
 * instead of inventing a "generic" page for a route we have no data for.
 */
export const getRequirement = cache(
  async (origin: string, destination: string): Promise<VisaRequirement | null> => {
    const [o, d] = await Promise.all([getCountry(origin), getCountry(destination)]);
    if (!o || !d) return null;

    const { data: row, error } = await supabase
      .from("visa_requirements")
      .select("*")
      .eq("origin_id", o.id)
      .eq("destination_id", d.id)
      .is("type_code", null)
      .maybeSingle();
    if (error || !row) return null;

    const types = await getVisaTypes(d.slug);
    const type = types.find((x) => x.code === row.type_code) ?? types[0];

    const resolved: VisaRequirement = {
      id: row.id,
      origin_id: o.id,
      destination_id: d.id,
      type_code: row.type_code ?? null,
      status: row.status,
      visa_free_days: row.visa_free_days ?? null,
      visa_type: row.visa_type ?? type?.name ?? ({ en: "" } as VisaType["name"]),
      entry_type: row.entry_type ?? null,
      validity_days: row.validity_days ?? null,
      max_stay_days: row.max_stay_days ?? type?.stay_days_max ?? null,
      processing_days_min: row.processing_days_min ?? type?.processing_days_min ?? null,
      processing_days_max: row.processing_days_max ?? type?.processing_days_max ?? null,
      fee_amount: row.fee_amount ?? type?.fee_amount ?? null,
      fee_currency: row.fee_currency ?? type?.fee_currency ?? null,
      mandatory_docs: row.mandatory_docs ?? type?.default_mandatory_docs ?? { en: [] },
      supporting_docs: row.supporting_docs ?? type?.default_supporting_docs ?? { en: [] },
      steps: row.steps ?? type?.default_steps ?? { en: [] },
      fees: row.fees ?? [],
      fee_total_min: row.fee_total_min ?? null,
      fee_total_max: row.fee_total_max ?? null,
      apply_url: row.apply_url || type?.apply_url || null,
      embassy_url: row.embassy_url || type?.embassy_url || null,
      source_url: row.source_url ?? type?.source_url ?? null,
      last_verified: row.last_verified ?? null,
      detailed: row.detailed,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    return resolved;
  }
);

type Pair = { origin: string; destination: string };

async function loadPairs(onlyDetailed: boolean): Promise<Pair[]> {
  let q = supabase
    .from("visa_requirements")
    .select("origin_id, destination_id, detailed")
    .is("type_code", null);
  if (onlyDetailed) q = q.eq("detailed", true);
  const [{ data: rows, error }, { data: countries }] = await Promise.all([
    q,
    supabase.from("countries").select("id, slug"),
  ]);
  if (error || !rows || !countries) return [];
  const slug = new Map(countries.map((c) => [c.id as string, c.slug as string]));
  return rows
    .map((r) => ({
      origin: slug.get(r.origin_id) as string,
      destination: slug.get(r.destination_id) as string,
    }))
    .filter((p) => p.origin && p.destination);
}

/** Every origin/destination pair that has a row: used for static generation. */
export async function getAllOriginDestinationPairs(): Promise<Pair[]> {
  return loadPairs(false);
}

/** Only hand-verified pairs: used for the sitemap. */
export async function getAllDetailedRoutePairs(): Promise<Pair[]> {
  return loadPairs(true);
}

/** Destinations that actually have a requirement row for this origin. */
export async function getDestinationsForOrigin(origin: string): Promise<Country[]> {
  const o = await getCountry(origin);
  if (!o) return [];
  const [{ data: rows }, destinations] = await Promise.all([
    supabase
      .from("visa_requirements")
      .select("destination_id")
      .eq("origin_id", o.id)
      .is("type_code", null),
    getDestinations(),
  ]);
  const ids = new Set((rows ?? []).map((r) => r.destination_id as string));
  return destinations.filter((d) => ids.has(d.id));
}

export async function getAllDestinationSlugs(): Promise<string[]> {
  const destinations = await getDestinations();
  return destinations.map((c) => c.slug);
}

/** Blog translations (one row per post and locale) for the sitemap. */
export async function getAllBlogTranslations(): Promise<
  { post_id: string; locale: Locale; slug: string; updated_at: string }[]
> {
  const { data } = await supabase
    .from("blog_post_translations")
    .select("post_id, locale, slug, updated_at");
  return (data ?? []) as {
    post_id: string;
    locale: Locale;
    slug: string;
    updated_at: string;
  }[];
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
