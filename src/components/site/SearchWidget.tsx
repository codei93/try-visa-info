"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PublicCountry {
  slug: string;
  name: string;
  flag: string;
}

export function CountrySelect({
  label,
  countries,
  value,
  onChange,
}: {
  label: string;
  countries: PublicCountry[];
  value: string;
  onChange: (v: string) => void;
}) {
  const { t } = useI18n();
  const [filter, setFilter] = useState("");

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.slug.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="flex flex-1 flex-col gap-1.5 text-start">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 bg-card text-base" aria-label={label}>
          <SelectValue placeholder={t("search.pick")} />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <div className="relative mb-2">
              <Search className="absolute left-2 top-1/2 -mt-1.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={t("search.pick")}
                className="w-full pl-8 pr-2 py-1.5 text-sm bg-transparent border-b border-b-input focus:ring-0 focus:ring-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {filteredCountries.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.flag} {c.name}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SearchWidget({
  initialDestination = "",
  lockDestination = false,
  origins,
  destinations,
}: {
  initialDestination?: string;
  lockDestination?: boolean;
  origins: PublicCountry[];
  destinations: PublicCountry[];
}) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState(initialDestination);
  const [navigating, setNavigating] = useState(false);

  const go = async () => {
    setNavigating(true);
    if (origin && destination)
      await router.push(`/${locale}/${origin}/${destination}`);
    else if (destination)
      await router.push(`/${locale}/visa-types/${destination}`);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <CountrySelect
          label={t("search.origin")}
          countries={origins}
          value={origin}
          onChange={setOrigin}
        />
        {!lockDestination && (
          <CountrySelect
            label={t("search.destination")}
            countries={destinations}
            value={destination}
            onChange={setDestination}
          />
        )}
        <Button
          size="lg"
          className="h-12 px-6 text-base"
          disabled={!destination || navigating}
          onClick={go}
        >
          {navigating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l5-2.747z"
                ></path>
              </svg>
              {t("search.cta")}
            </>
          ) : (
            <>
              {origin || !destination ? t("search.cta") : t("search.allTypes")}{" "}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
