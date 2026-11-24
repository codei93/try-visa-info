import type { MetadataRoute } from "next";
import {
  getAllDetailedRoutePairs,
  getAllDestinationSlugs,
  getAllBlogTranslations,
  SITE_URL,
} from "@/lib/data";
import { LOCALE_CODES } from "@/lib/messages";

export const revalidate = 86400;

type Entry = MetadataRoute.Sitemap[number];

/** One entry per locale, each pointing at all language alternates. */
function localized(
  path: (locale: string) => string,
  extra: Pick<Entry, "changeFrequency" | "priority" | "lastModified">
): Entry[] {
  const languages = Object.fromEntries(
    LOCALE_CODES.map((l) => [l, `${SITE_URL}${path(l)}`])
  );
  languages["x-default"] = `${SITE_URL}${path("en")}`;
  return LOCALE_CODES.map((l) => ({
    url: `${SITE_URL}${path(l)}`,
    alternates: { languages },
    ...extra,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destSlugs, pairs, blogRows] = await Promise.all([
    getAllDestinationSlugs(),
    getAllDetailedRoutePairs(), // only hand-verified pairs are indexable
    getAllBlogTranslations(),
  ]);

  const entries: Entry[] = [];

  for (const p of ["", "/blog", "/about", "/contact", "/privacy-policy"]) {
    entries.push(
      ...localized((l) => `/${l}${p}`, {
        changeFrequency: "monthly",
        priority: p === "" ? 1 : 0.8,
      })
    );
  }

  for (const slug of destSlugs) {
    entries.push(
      ...localized((l) => `/${l}/visa-types/${slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
      })
    );
  }

  for (const pair of pairs) {
    entries.push(
      ...localized((l) => `/${l}/${pair.origin}/${pair.destination}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      })
    );
  }

  // Blog slugs differ per language, so alternates are grouped by post id.
  const byPost = new Map<string, Record<string, string>>();
  for (const row of blogRows) {
    const langs = byPost.get(row.post_id) ?? {};
    langs[row.locale] = `${SITE_URL}/${row.locale}/blog/${row.slug}`;
    byPost.set(row.post_id, langs);
  }
  for (const row of blogRows) {
    const languages = { ...byPost.get(row.post_id)! };
    if (languages.en) languages["x-default"] = languages.en;
    entries.push({
      url: `${SITE_URL}/${row.locale}/blog/${row.slug}`,
      lastModified: row.updated_at,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    });
  }

  return entries;
}
