import { notFound } from "next/navigation";
import {
  getRequirement,
  getCountry,
  SITE_URL,
  getAllOriginDestinationPairs,
  getDestinations,
  getBlogPosts,
  getVisaTypes,
  hydrateBlogPost,
} from "@/lib/data";
import { VisaResultPageContent } from "@/components/visa/VisaResultPageContent";

export const dynamic = "force-dynamic";

export interface ResultPageProps {
  params: Promise<{ locale: string; origin: string; destination: string }>;
  searchParams: { type?: string };
}

export async function generateMetadata({
  params,
  searchParams,
}: ResultPageProps) {
  const { locale: localeStr, origin, destination } = await params;
  const req = await getRequirement(origin, destination, searchParams.type);
  if (!req) {
    return {
      title: "Route unavailable | TryVisaInfo",
      robots: "noindex",
    };
  }
  const o = await getCountry(origin);
  const d = await getCountry(destination);
  if (!o || !d) {
    return {
      title: "Route unavailable | TryVisaInfo",
      robots: "noindex",
    };
  }
  const oName = (o.name as Record<string, string>)[localeStr] ?? o.name;
  const dName = (d.name as Record<string, string>)[localeStr] ?? d.name;
  const title = `${dName} Visa for ${oName} Citizens — Documents, Fees & Process | TryVisaInfo`;
  const description = `Complete guide to getting a ${dName} visa from ${oName}. Required documents, official fees, processing time and step-by-step application process. Last verified ${req.last_verified}.`;
  const url = `${SITE_URL}/${localeStr}/${origin}/${destination}`;
  return {
    title,
    description,
    keywords: `${dName} visa, ${oName} to ${dName} visa, visa requirements 2026, ${dName} visa fee, how to apply ${dName} visa from ${oName}`,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const pairs = await getAllOriginDestinationPairs();
  const locales = ["en", "fr", "es", "ar"];
  return locales.flatMap((locale) =>
    pairs.map((p) => ({
      locale,
      origin: p.origin,
      destination: p.destination,
    }))
  );
}

export default async function ResultPage({
  params,
  searchParams,
}: ResultPageProps) {
  const { locale, origin, destination } = await params;
  const req = await getRequirement(origin, destination, searchParams.type);
  if (!req) {
    notFound();
  }
  const o = await getCountry(origin);
  const d = await getCountry(destination);
  if (!o || !d) {
    notFound();
  }
  const [destinationsList, postsList, visaTypesList] = await Promise.all([
    getDestinations(),
    getBlogPosts(locale as any),
    getVisaTypes(destination),
  ]);
  const countries = [...destinationsList];
  const hydratedPosts = postsList.map((p) =>
    hydrateBlogPost(p, locale as any, countries)
  );
  return (
    <VisaResultPageContent
      req={req}
      origin={o}
      destination={d}
      destinations={destinationsList}
      blogPosts={hydratedPosts}
      visaTypes={visaTypesList}
    />
  );
}
