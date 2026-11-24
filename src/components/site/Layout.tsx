"use client";

import Link from "next/link";
import { Languages, Menu, Moon, Sun, X, AlertTriangle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useI18n, locales, type TKey } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks: { to: "/" | "/blog" | "/about" | "/contact"; key: TKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/blog", key: "nav.blog" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

function Logo() {
  const { theme } = useTheme();
  const { href } = useI18n();
  const isDark = theme === "dark";
  return (
    <Link href={href("/")} className="flex items-center gap-2">
      <img
        src={isDark ? "/assets/logo-dark-mode.png" : "/assets/logo-light-mode.png"}
        alt="TryVisaInfo"
        width={200}
        className="block h-auto"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid size-9 place-items-center rounded-md border border-border hover:bg-muted"
    >
      {theme === "dark" ? <Sun className="size-4 text-accent" /> : <Moon className="size-4" />}
    </button>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        className="flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 text-sm font-medium hover:bg-muted"
      >
        <Languages className="size-4" /> {locale.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            className={cn(l.code === locale && "font-semibold text-primary")}
          >
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const { t, href } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-nav shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              href={href(l.to)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="grid size-9 place-items-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border px-4 py-2 lg:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              href={href(l.to)}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { t, href } = useI18n();
  return (
    <footer className="mt-16 border-t border-border bg-footer text-muted-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2 text-foreground">
          <Logo />
          <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm md:col-span-2 md:justify-end">
          {navLinks.map((l) => (
            <Link key={l.to} href={href(l.to)} className="hover:text-foreground">
              {t(l.key)}
            </Link>
          ))}
          <Link href={href("/privacy-policy")} className="hover:text-foreground">
            {t("nav.privacy")}
          </Link>
        </nav>
        <p className="flex items-start gap-2 text-xs md:col-span-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" /> {t("footer.disclaimer")}
        </p>
        <p className="text-xs md:col-span-3">© 2026 TryVisaInfo. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}

export function Disclaimer({ children }: { children?: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="flex gap-3 rounded-lg border border-warning-border bg-warning-surface p-4 text-sm text-warning-foreground">
      <AlertTriangle className="size-5 shrink-0" />
      <p>{children ?? t("visa.disclaimer")}</p>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
    >
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="opacity-50">/</span>}
          {it.to ? (
            <a href={it.to} className="hover:text-foreground">
              {it.label}
            </a>
          ) : (
            <span className="text-foreground">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
