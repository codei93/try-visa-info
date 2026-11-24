"use client";

import { Clock, CalendarDays } from "lucide-react";
import { Fragment } from "react";
import type { Country, VisaType } from "@/types/database";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/types/database";
import { hydrateCountry, hydrateVisaType } from "@/lib/hydrate";
import { AdBanner } from "@/components/site/Ads";
import { Breadcrumbs, Disclaimer } from "@/components/site/Layout";
import { SearchWidget } from "@/components/site/SearchWidget";

interface VisaTypesPageContentProps {
  country: Country;
  types: VisaType[];
  origins: Country[];
  destinations: Country[];
}

export function VisaTypesPageContent({
  country,
  types,
  origins,
  destinations,
}: VisaTypesPageContentProps) {
  const { t, locale } = useI18n();
  const hydratedCountry = hydrateCountry(country, locale as Locale);
  const hydratedTypes = types.map((vt) => hydrateVisaType(vt, locale as Locale));
  const hydratedOrigins = origins.map((o) => hydrateCountry(o, locale as Locale));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: t("nav.home"), to: `/${locale}` },
          { label: hydratedCountry.name },
          { label: t("common.visaTypes") },
        ]}
      />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {hydratedCountry.flag} {t("types.title", { country: hydratedCountry.name })}
      </h1>
      <p className="mt-2 text-muted-foreground">{t("types.subtitle")}</p>
      <AdBanner slot="visatypes-top" format="leaderboard" />

      <div className="mb-8">
        <p className="mb-2 font-semibold">{t("types.chooseOrigin")}</p>
        <SearchWidget
          initialDestination={country.slug}
          lockDestination
          origins={hydratedOrigins}
          destinations={destinations.map((d) => hydrateCountry(d, locale as Locale))}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {hydratedTypes.map((v, i) => (
          <Fragment key={v.code}>
            <article className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{v.icon}</span>
                <div>
                  <h2 className="text-lg font-bold">{v.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" />
                  <span>{v.stay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-primary" />
                  <span>{v.processing}</span>
                </div>
              </dl>
            </article>
            {(i + 1) % 4 === 0 && i < hydratedTypes.length - 1 && (
              <div className="flex justify-center md:col-span-2">
                <AdBanner slot="visatypes-inline" format="rectangle" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
