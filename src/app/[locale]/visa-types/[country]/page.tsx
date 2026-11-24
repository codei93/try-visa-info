import { notFound } from "next/navigation";
import {
  getDestination,
  getVisaTypes,
  getAllDestinationSlugs,
  getOrigins,
  getDestinations,
} from "@/lib/data";
import { LOCALE_CODES, isLocale } from "@/lib/messages";
import { VisaTypesPageContent } from "@/components/visa/VisaTypesPageContent";

export const revalidate = 86400;

export interface VisaTypesPageProps {
  params: Promise<{ locale: string; country: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return LOCALE_CODES.flatMap((locale) =>
    slugs.map((country) => ({ locale, country }))
  );
}

export default async function VisaTypesPage({
  params,
}: VisaTypesPageProps) {
  const { locale, country: countrySlug } = await params;
  if (!isLocale(locale)) notFound();
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
