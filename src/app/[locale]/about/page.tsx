import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/site/Layout";

export const metadata = {
  title: "About TryVisaInfo — How We Source Visa Data",
  description:
    "TryVisaInfo helps travelers worldwide navigate visa requirements. Learn how our data is sourced and verified.",
  openGraph: {
    title: "About TryVisaInfo",
    description: "Helping travelers worldwide navigate visa requirements.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function About({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Helping travelers worldwide navigate visa requirements
      </h1>
      <p className="text-lg text-muted-foreground">
        Visa rules are scattered across dozens of embassy, consulate and immigration websites.
        TryVisaInfo brings them together in one clear page per route — documents, fees, timelines
        and steps.
      </p>
      <h2 className="text-2xl font-bold">How our data is sourced</h2>
      <p>
        We collect requirements from official embassy, consulate and immigration websites, then
        cross-check them against recent applicant experiences.
      </p>
      <h2 className="text-2xl font-bold">How it is verified</h2>
      <p>
        Each route shows a "Last verified" date. We review popular routes regularly and update fees
        and documents when official sources change.
      </p>
      <Disclaimer>
        Rules can change without notice. Information was last reviewed in October 2026 — always
        confirm with the official embassy before applying.
      </Disclaimer>
      <Button asChild size="lg">
        <Link href="/contact">Contact us</Link>
      </Button>
    </div>
  );
}
