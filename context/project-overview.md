# Project Overview

## About the Project

try-visa-info is a visa information website that helps travelers find visa requirements, documents, official fees, and processing times for any origin/destination country route. Users pick their nationality and destination country to see a complete visa guide including mandatory documents, supporting documents, application steps, fee breakdowns, embassy links, and official application URLs.

## The Problem It Solves

Visa rules are scattered across dozens of embassy, consulate, and immigration websites. try-visa-info brings them together in one clear page per route — documents, fees, timelines, and steps — with a "Last verified" date so travelers know how current the information is.

## Stack

| Layer | Tool | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router, React 19) | Frontend, routing, SSR, static generation |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) | Utility-first styling, design tokens |
| UI | shadcn/ui + Radix primitives | Component primitives |
| Data fetching | TanStack Query v5 | Client cache |
| Forms | react-hook-form + zod | Form state and validation |
| Notifications | sonner | Toast notifications |
| Icons | lucide-react | Icon library |
| i18n | Custom context provider (EN/FR/ES/AR) | Translations, RTL for Arabic |
| Ads | AdSense placeholders | Ad banners and sidebars |

Do not introduce new major libraries without a strong reason.

---

## Repository Structure

Single repository at the root:

```
try-visa-info/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 <- Root layout (ThemeProvider, I18nProvider, QueryProvider)
│   │   ├── not-found.tsx              <- 404 page
│   │   ├── error.tsx                  <- Error boundary
│   │   ├── page.tsx                   <- Homepage (hero + SearchWidget + popular routes)
│   │   ├── about/page.tsx             <- About page
│   │   ├── contact/page.tsx           <- Contact form
│   │   ├── blog/page.tsx              <- Blog index (paginated)
│   │   ├── blog/[slug]/page.tsx       <- Single blog post
│   │   ├── [origin]/[destination]/page.tsx <- Visa result page
│   │   ├── visa-types/[country]/page.tsx <- Visa types for a country
│   │   ├── privacy-policy/page.tsx    <- Privacy policy
│   │   └── sitemap.ts                 <- Dynamic XML sitemap
│   ├── components/
│   │   ├── providers/
│   │   │   └── query-provider.tsx     <- TanStack Query client provider
│   │   ├── site/
│   │   │   ├── Layout.tsx             <- Navbar, Footer, Disclaimer, Breadcrumbs
│   │   │   ├── SearchWidget.tsx       <- Origin/destination country search
│   │   │   ├── Ads.tsx                <- AdBanner, AdSidebar placeholders
│   │   │   └── BlogCard.tsx           <- Blog post card
│   │   └── ui/                        <- shadcn/ui primitives
│   ├── hooks/
│   │   └── use-mobile.tsx             <- Mobile breakpoint hook
│   ├── lib/
│   │   ├── data.ts                    <- Hardcoded countries, destinations, visa requirements, blog posts
│   │   ├── theme.tsx                  <- ThemeProvider (light/dark, localStorage)
│   │   ├── i18n.tsx                   <- I18nProvider (EN/FR/ES/AR, RTL for Arabic)
│   │   ├── utils.ts                   <- cn() helper
│   │   ├── error-capture.ts           <- SSR error capture utility
│   │   └── error-page.ts              <- Server error HTML renderer
│   └── assets/
│       ├── blog-us-visa.jpg
│       ├── blog-schengen.jpg
│       └── blog-easy-visa.jpg
├── next.config.ts                     <- Next.js configuration
├── postcss.config.mjs                 <- Tailwind CSS v4 postcss plugin
├── tailwind.config.ts                 <- Tailwind configuration
├── tsconfig.json                      <- TypeScript configuration
├── next-env.d.ts                      <- Next.js type references
├── package.json / package-lock.json
├── .env / .env.example                <- NEXT_PUBLIC_SITE_URL
├── styles.css                         <- Tailwind v4 entry + @theme tokens
├── components.json                    <- shadcn/ui config
├── eslint.config.js                   <- ESLint config (eslint-config-next)
├── prettier.config / .prettierrc      <- Prettier config
├── .prettierignore
├── .gitignore
└── README.md
```

---

## Pages

### Public (no login, flat routes)

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage — hero, SearchWidget, popular routes, why-us section |
| `/about` | `src/app/about/page.tsx` | About — data sourcing and verification |
| `/contact` | `src/app/contact/page.tsx` | Contact form — mailto link |
| `/blog` | `src/app/blog/page.tsx` | Blog index — paginated (10 per page) |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Single blog post with related posts |
| `/[origin]/[destination]` | `src/app/[origin]/[destination]/page.tsx` | Visa requirements result page |
| `/visa-types/[country]` | `src/app/visa-types/[country]/page.tsx` | All visa types for a destination country |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | Privacy policy |
| `/sitemap.xml` | `src/app/sitemap.ts` | Dynamic XML sitemap |

---

## Core User Flows

### Visa Requirements Flow

1. Traveler selects origin country (nationality) and destination country via SearchWidget or popular routes.
2. App navigates to `/[origin]/[destination]`.
3. Page displays visa requirements: required yes/no/on-arrival, visa type, entry type, validity, max stay, processing time, official fee.
4. Checklists for mandatory and supporting documents.
5. Application process steps.
6. Fee breakdown table with estimated total.
7. Buttons to apply on official website and find nearest embassy.
8. Related visa types and other popular visas from the same origin.

### Blog Flow

1. Traveler visits `/blog` to see paginated blog posts (10 per page).
2. Clicks a post to read `/blog/[slug]`.
3. Related posts shown at the bottom.

---

## Data

All data is hardcoded in `src/lib/data.ts`:

- **`origins`** — 20 origin countries (slug, name, flag emoji)
- **`destinations`** — 15 destination countries (slug, name, flag emoji)
- **`popularRoutes`** — 12 popular origin/destination pairs
- **`visaTypes`** — Visa types per destination country (code, name, icon, description, stay, processing)
- **`detailed`** — Detailed visa requirements for specific origin/destination pairs (documents, steps, fees, apply/embassy URLs, last verified)
- **`blogPosts`** — 3 blog posts (slug, title, excerpt, cover image, tags, date, read time, author, content blocks)
- **`getRequirement(origin, destination, typeCode?)`** — Returns visa requirement or null; falls back to generic data if no detailed record exists
- **`SITE_URL`** — `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"`

---

## i18n

Custom context provider in `src/lib/i18n.tsx`:

- **Locales:** en (English), fr (Français), es (Español), ar (العربية)
- **RTL:** Arabic (`ar`) sets `dir="rtl"` on `<html>`
- **Persistence:** Theme and locale saved to `localStorage`
- **Hook:** `useI18n()` returns `{ locale, setLocale, t }`
- **All UI strings** must go through `t("key")` — never hardcode user-facing text

---

## Environment Variables

| Variable | Purpose | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL for sitemap and canonical links | Browser-safe (`NEXT_PUBLIC_*` prefix) |

---

## Features Out of Scope

- No database (Supabase not used)
- No authentication
- No visa calculator
- No e-commerce or transactions
- No mobile app
