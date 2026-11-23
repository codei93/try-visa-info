import { getOrigins, getDestinations } from "@/lib/data";
import HomePageContent from "@/components/home/HomePageContent";

export const metadata = {
  title: "TryVisaInfo — Visa requirements, documents & fees",
  description:
    "Find visa requirements, documents, fees and processing times for any route.",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const [origins, destinations] = await Promise.all([
    getOrigins(),
    getDestinations(),
  ]);
  return <HomePageContent origins={origins} destinations={destinations} />;
}
