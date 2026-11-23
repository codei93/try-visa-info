"use client";

import Link from "next/link";
import { BadgeCheck, Building2, ExternalLink } from "lucide-react";
import { useState } from "react";
import type {
  VisaRequirement,
  Country,
  BlogPost,
  VisaType,
} from "@/types/database";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/types/database";
import {
  hydrateRequirement,
  hydrateCountry,
  hydrateVisaType,
} from "@/lib/data";
import { AdBanner, AdSidebar } from "@/components/site/Ads";
import { Breadcrumbs, Disclaimer } from "@/components/site/Layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VisaResultPageContentProps {
  req: VisaRequirement;
  origin: Country;
  destination: Country;
  destinations: Country[];
  blogPosts: BlogPost[];
  visaTypes: VisaType[];
}

export function VisaResultPageContent({
  req,
  origin: o,
  destination: d,
  destinations,
  blogPosts,
  visaTypes,
}: VisaResultPageContentProps) {
  const { t, locale } = useI18n();
  const hydrated = hydrateRequirement(req, locale as Locale);
  const hydratedOrigin = hydrateCountry(o, locale as Locale);
  const hydratedDest = hydrateCountry(d, locale as Locale);
  const hydratedTypes = visaTypes.map((vt) => hydrateVisaType(vt, locale as Locale));
  const hydratedDestinations = destinations.map((c) =>
    hydrateCountry(c, locale as Locale)
  );

  const tileConfigs: {
    key: string;
    label: string;
    badge?: string;
    value?: string;
  }[] = [
    { key: "visa.required", label: t("visa.required"), badge: hydrated.visaRequired },
    { key: "visa.type", label: t("visa.type"), value: hydrated.visaType },
    { key: "visa.entry", label: t("visa.entry"), value: hydrated.entryType },
    { key: "visa.validity", label: t("visa.validity"), value: hydrated.validity },
    { key: "visa.maxStay", label: t("visa.maxStay"), value: hydrated.maxStay },
    { key: "visa.processing", label: t("visa.processing"), value: hydrated.processingTime },
    { key: "visa.fee", label: t("visa.fee"), value: hydrated.officialFee },
  ];
  const related = hydratedDestinations.filter((x) => x.slug !== hydratedDest.slug).slice(0, 5);
  const allTypes = hydratedTypes;
  const posts = [...blogPosts].sort(
    (a, b) =>
      Number(b.related.origin === hydratedOrigin.slug || b.related.destination === hydratedDest.slug) -
      Number(a.related.origin === hydratedOrigin.slug || a.related.destination === hydratedDest.slug),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: t("nav.home"), to: `/${locale}` },
          { label: hydratedOrigin.name },
          { label: `${hydratedDest.name} visa requirements` },
        ]}
      />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {hydratedOrigin.flag} {hydratedOrigin.name} → {hydratedDest.flag} {hydratedDest.name} Visa Requirements
      </h1>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
        <BadgeCheck className="size-4" /> {t("visa.verified")}: {hydrated.lastVerified}
      </div>
      {!hydrated.detailed && <p className="mt-3 text-sm text-muted-foreground">{t("visa.generic")}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title={t("visa.overview")}>
            <div className="grid gap-3 sm:grid-cols-2">
              {tileConfigs.map((tile) => (
                <div key={tile.key} className="rounded-lg bg-muted p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {tile.label}
                  </p>
                  <div className="mt-1 font-semibold">
                    {tile.badge ? (
                      <RequiredBadge v={tile.badge} />
                    ) : (
                      tile.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <AdBanner slot="result-inline" format="leaderboard" />

          <Card className="space-y-6">
            <Checklist title={`📋 ${t("visa.mandatory")}`} items={hydrated.mandatoryDocs} />
            <Checklist title={`📎 ${t("visa.supporting")}`} items={hydrated.supportingDocs} />
          </Card>

          <Card title={t("visa.process")}>
            <ol className="relative space-y-5 border-s-2 border-border ps-6">
              {hydrated.steps.map((s, i) => (
                <li key={i} className="relative">
                  <span className="absolute -start-[37px] grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm">{s}</p>
                </li>
              ))}
            </ol>
          </Card>

          <Card title={t("visa.fees")}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-start text-muted-foreground">
                  <th className="py-2 text-start font-medium">{t("visa.item")}</th>
                  <th className="py-2 text-end font-medium">{t("visa.cost")}</th>
                </tr>
              </thead>
              <tbody>
                {hydrated.fees.map((f) => (
                  <tr key={f.item} className="border-b border-border">
                    <td className="py-2">{f.item}</td>
                    <td className="py-2 text-end">{f.cost}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-3 uppercase">{t("visa.total")}</td>
                  <td className="py-3 text-end">{hydrated.feeTotal}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <Disclaimer>{t("visa.feeNote")}</Disclaimer>
            </div>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="flex-1">
              <a href={hydrated.applyUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink /> {t("visa.apply")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="flex-1">
              <a href={hydrated.embassyUrl} target="_blank" rel="noopener noreferrer">
                <Building2 /> {t("visa.embassy")}
              </a>
            </Button>
          </div>

          <Card title={t("types.title", { country: hydratedDest.name })}>
            <p className="mb-4 text-sm text-muted-foreground">{t("types.tap")}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {allTypes.map((v) => {
                const active = (hydrated.typeCode ?? allTypes[0]!.code) === v.code;
                return (
                  <Link
                    key={v.code}
                    href={`/${locale}/${hydratedOrigin.slug}/${hydratedDest.slug}?type=${v.code}`}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "rounded-lg border p-4 transition hover:border-primary hover:bg-muted",
                      active
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-muted",
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl">{v.icon}</span>
                      <div>
                        <h3 className="font-semibold leading-snug">{v.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {v.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>🕐 {v.processing}</span>
                      <span>📅 {v.stay}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link
              href={`/visa-types/${hydratedDest.slug}`}
              className="mt-4 inline-block text-sm font-medium text-primary"
            >
              {t("common.visaTypes")}: {hydratedDest.name} →
            </Link>
          </Card>

          <Disclaimer />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <AdSidebar slot="result-sidebar-1" />
          <Card title={`${t("visa.otherFrom")} ${hydratedOrigin.name}`}>
            <ul className="space-y-1">
              {related.map((x) => (
                <li key={x.slug}>
                  <Link
                    href={`/${locale}/${hydratedOrigin.slug}/${x.slug}`}
                    className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted hover:text-primary"
                  >
                    → {hydratedOrigin.name} to {x.flag} {x.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/visa-types/${hydratedDest.slug}`}
              className="mt-3 block text-sm font-medium text-primary"
            >
              {t("common.visaTypes")}: {hydratedDest.name} →
            </Link>
          </Card>
          <Card title={`📖 ${t("visa.articles")}`}>
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${locale}/blog/${p.slug}`}
                    className="text-sm hover:text-primary"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          <AdSidebar slot="result-sidebar-2" />
        </aside>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("rounded-xl border border-border bg-card p-5 shadow-card sm:p-6", className)}
    >
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      {children}
    </section>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  const { t } = useI18n();
  const [done, setDone] = useState<Set<number>>(new Set());
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-muted-foreground">
          {done.size}/{items.length} {t("visa.checked")}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-muted">
              <Checkbox
                className="mt-0.5"
                checked={done.has(i)}
                onCheckedChange={() => {
                  const n = new Set(done);
                  if (n.has(i)) {
                    n.delete(i);
                  } else {
                    n.add(i);
                  }
                  setDone(n);
                }}
              />
              <span className={cn("text-sm", done.has(i) && "text-muted-foreground line-through")}>
                {it}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RequiredBadge({ v }: { v: string }) {
  const { t } = useI18n();
  const map: Record<string, [string, string]> = {
    yes: ["bg-destructive text-destructive-foreground", t("visa.yes")],
    no: ["bg-secondary text-secondary-foreground", t("visa.no")],
    "on-arrival": ["bg-accent text-accent-foreground", t("visa.onArrival")],
  };
  const [cls, label] = map[v] ?? map["yes"];
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-sm font-bold", cls)}>
      {label}
    </span>
  );
}
