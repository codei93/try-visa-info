"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Globe2, ListChecks, Wallet } from "lucide-react";
import { SearchWidget } from "@/components/site/SearchWidget";
import { AdBanner } from "@/components/site/Ads";
import type { Country } from "@/types/database";
import { useI18n, type TKey } from "@/lib/i18n";
import type { Locale } from "@/types/database";
import { hydrateCountry } from "@/lib/data";

const why: { icon: typeof BadgeCheck; key: TKey }[] = [
  { icon: BadgeCheck, key: "why.1" },
  { icon: Globe2, key: "why.2" },
  { icon: Wallet, key: "why.3" },
  { icon: ListChecks, key: "why.4" },
];

interface HomePageContentProps {
  origins: Country[];
  destinations: Country[];
}

export default function HomePageContent({
  origins,
  destinations,
}: HomePageContentProps) {
  const { t, locale } = useI18n();
  const hydratedOrigins = origins.map((o) => hydrateCountry(o, locale as Locale));
  const hydratedDestinations = destinations.map((d) =>
    hydrateCountry(d, locale as Locale)
  );

  const getOrigin = (slug: string) => hydratedOrigins.find((c) => c.slug === slug);
  const getDestination = (slug: string) =>
    hydratedDestinations.find((c) => c.slug === slug);

  return (
    <>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10">
            <SearchWidget origins={hydratedOrigins} destinations={hydratedDestinations} />
          </div>
        </div>
      </section>

      <div className="px-4">
        <AdBanner slot="homepage-top" format="leaderboard" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold">{t("how.title")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {(["how.1", "how.2", "how.3"] as TKey[]).map((k, i) => (
            <div
              key={k}
              className="rounded-xl border border-border bg-card p-6 text-center shadow-card"
            >
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {i + 1}
              </div>
              <div className="mt-3 text-3xl">{["🌍", "✈️", "📋"][i]}</div>
              <p className="mt-2 font-semibold">{t(k)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-3xl font-bold">{t("popular.title")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map(([o, d]) => {
            const oc = getOrigin(o)!,
              dc = getDestination(d)!;
            return (
              <Link
                key={o + d}
                href={`/${locale}/${o}/${d}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 font-medium transition hover:scale-[1.02] hover:bg-muted"
              >
                <span>
                  {oc.flag} {oc.name} <span className="text-muted-foreground">→</span> {dc.flag}{" "}
                  {dc.name}
                </span>
                <ArrowRight className="size-4 text-primary transition group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-3xl font-bold">{t("why.title")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(({ icon: Icon, key }) => (
            <div key={key} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <Icon className="size-8 text-secondary" />
              <p className="mt-3 font-semibold">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-4">
        <AdBanner slot="homepage-bottom" format="leaderboard" />
      </div>
    </>
  );
}

const popularRoutes: [string, string][] = [
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
