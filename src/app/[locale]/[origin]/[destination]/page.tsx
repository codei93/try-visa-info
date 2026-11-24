import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getRequirement,
  getCountry,
  getAllOriginDestinationPairs,
  getDestinationsForOrigin,
  getBlogPosts,
  getVisaTypes,
  getOrigins,
  getDestinations,
} from "@/lib/data";
import { hydrateBlogPost } from "@/lib/hydrate";
import { t as localized } from "@/lib/localized";
import { LOCALE_CODES, isLocale, translate } from "@/lib/messages";
import { VisaResultPageContent } from "@/components/visa/VisaResultPageContent";

// Rebuild each page at most once a day so edits made in Supabase show up
// without a redeploy. Pairs not generated at build time render on first request.
export const revalidate = 86400;

type Props = {
  params: Promise<{ locale: string; origin: string; destination: string }>;
};

export async function generateStaticParams() {
  const pairs = await getAllOriginDestinationPairs();
  return LOCALE_CODES.flatMap((locale) =>
    pairs.map((p) => ({ locale, origin: p.origin, destination: p.destination }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, origin, destination } = await params;
  if (!isLocale(locale)) return {};

  const [req, o, d] = await Promise.all([
    getRequirement(origin, destination),
    getCountry(origin),
    getCountry(destination),
  ]);
  if (!req || !o || !d) return { robots: { index: false, follow: false } };

  const oName = localized(o.name, locale) ?? origin;
  const dName = localized(d.name, locale) ?? destination;
  const vars = { origin: oName, destination: dName };
  const title = translate(locale, "visa.metaTitle", vars);
  const description = [
    translate(locale, "visa.metaDesc", vars),
    req.last_verified
      ? translate(locale, "visa.metaVerified", { date: req.last_verified })
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const path = (l: string) => `/${l}/${origin}/${destination}`;
  return {
    title,
    description,
    // Only hand-verified pairs are indexed; baseline pages stay out of search results.
    robots: { index: req.detailed, follow: true },
    alternates: {
      canonical: path(locale),
      languages: {
        ...Object.fromEntries(LOCALE_CODES.map((l) => [l, path(l)])),
        "x-default": path("en"),
      },
    },
    openGraph: { title, description, type: "article", url: path(locale) },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ResultPage({ params }: Props) {
  const { locale, origin, destination } = await params;
  if (!isLocale(locale)) notFound();

  const [req, o, d] = await Promise.all([
    getRequirement(origin, destination),
    getCountry(origin),
    getCountry(destination),
  ]);
  if (!req || !o || !d) notFound();

  const [availableDestinations, posts, visaTypes, origins, destinations] =
    await Promise.all([
      getDestinationsForOrigin(origin),
      getBlogPosts(locale),
      getVisaTypes(destination),
      getOrigins(),
      getDestinations(),
    ]);
  const countries = [...origins, ...destinations];
  const blogPosts = posts.map((p) => hydrateBlogPost(p, locale, countries));

  const home = translate(locale, "nav.home");
  const dName = localized(d.name, locale) ?? destination;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: `/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: translate(locale, "visa.breadcrumb", { destination: dName }),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <VisaResultPageContent
        req={req}
        origin={o}
        destination={d}
        destinations={availableDestinations}
        blogPosts={blogPosts}
        visaTypes={visaTypes}
      />
    </>
  );
}
