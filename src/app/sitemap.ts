import {
  getAllOriginDestinationPairs,
  getAllDestinationSlugs,
  getAllBlogSlugs,
  SITE_URL,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default function Sitemap() {
  return null;
}

const LOCALES = ["en", "fr", "es", "ar"] as const;

export async function sitemap() {
  const [destSlugs, pairs, blogSlugs] = await Promise.all([
    getAllDestinationSlugs(),
    getAllOriginDestinationPairs(),
    getAllBlogSlugs(),
  ]);

  const paths: Array<{
    url: string;
    lastModified: string;
    changeFreq?: string;
    priority?: number;
    alternates?: Array<{ lang: string; url: string }>;
  }> = [];

  // Static pages
  const staticPages = [
    "",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
  ];

  for (const locale of LOCALES) {
    for (const path of staticPages) {
      paths.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFreq: "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: LOCALES.map((l) => ({
          lang: l,
          url: `${SITE_URL}/${l}${path}`,
        })),
      });
    }
  }

  // Visa types pages
  for (const locale of LOCALES) {
    for (const destSlug of destSlugs) {
      paths.push({
        url: `${SITE_URL}/${locale}/visa-types/${destSlug}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFreq: "monthly",
        priority: 0.8,
        alternates: LOCALES.map((l) => ({
          lang: l,
          url: `${SITE_URL}/${l}/visa-types/${destSlug}`,
        })),
      });
    }
  }

  // Visa result pages
  for (const locale of LOCALES) {
    for (const pair of pairs) {
      paths.push({
        url: `${SITE_URL}/${locale}/${pair.origin}/${pair.destination}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFreq: "monthly",
        priority: 0.7,
        alternates: LOCALES.map((l) => ({
          lang: l,
          url: `${SITE_URL}/${l}/${pair.origin}/${pair.destination}`,
        })),
      });
    }
  }

  // Blog posts
  for (const locale of LOCALES) {
    for (const slug of blogSlugs) {
      paths.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFreq: "monthly",
        priority: 0.7,
        alternates: LOCALES.map((l) => ({
          lang: l,
          url: `${SITE_URL}/${l}/blog/${slug}`,
        })),
      });
    }
  }

  return paths.map((p) => ({
    url: p.url,
    lastModified: p.lastModified,
    changeFreq: p.changeFreq,
    priority: p.priority,
    alternates: p.alternates,
  }));
}
