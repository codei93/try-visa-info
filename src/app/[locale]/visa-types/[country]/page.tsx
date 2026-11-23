import { notFound } from "next/navigation";
import {
  getDestination,
  getVisaTypes,
  getAllDestinationSlugs,
  getOrigins,
  getDestinations,
} from "@/lib/data";
import { VisaTypesPageContent } from "@/components/visa/VisaTypesPageContent";

export const dynamic = "force-dynamic";

export interface VisaTypesPageProps {
  params: Promise<{ locale: string; country: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return slugs.map((country) => ({
    locale: "en",
    country,
  }));
}

export default async function VisaTypesPage({
  params,
}: VisaTypesPageProps) {
  const { locale, country: countrySlug } = await params;
  const country = await getDestination(countrySlug);
  if (!country) {
    notFound();
  }
  const [types, originsList, destinationsList] = await Promise.all([
    getVisaTypes(countrySlug),
    getOrigins(),
    getDestinations(),
  ]);
  return (
    <VisaTypesPageContent
      country={country}
      types={types}
      origins={originsList}
      destinations={destinationsList}
    />
  );
}
