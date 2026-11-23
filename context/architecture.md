# Architecture

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

Do not introduce new major libraries without a strong reason.

---

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx              <- Root layout (ThemeProvider, I18nProvider, QueryProvider)
│   ├── not-found.tsx           <- 404 page
│   ├── error.tsx               <- Error boundary (client)
│   ├── page.tsx                <- Homepage (client, useI18n)
│   ├── about/page.tsx          <- About page (server)
│   ├── contact/page.tsx        <- Contact form (server metadata, client form)
│   ├── blog/page.tsx           <- Blog index (server metadata, client list)
│   ├── blog/[slug]/page.tsx    <- Blog post (server metadata, client content)
│   ├── [origin]/[destination]/page.tsx <- Visa result (server metadata, client result)
│   ├── visa-types/[country]/page.tsx   <- Visa types (server metadata, client list)
│   ├── privacy-policy/page.tsx <- Privacy policy (server)
│   └── sitemap.ts              <- Dynamic XML sitemap (server)
├── components/
│   ├── providers/
│   │   └── query-provider.tsx  <- TanStack Query client provider
│   ├── site/
│   │   ├── Layout.tsx          <- Navbar, Footer, Disclaimer, Breadcrumbs (client)
│   │   ├── SearchWidget.tsx    <- Country search (client, useRouter)
│   │   ├── Ads.tsx             <- AdBanner, AdSidebar (client, useEffect)
│   │   └── BlogCard.tsx        <- Blog post card (client, next/link)
│   └── ui/                     <- shadcn/ui primitives
├── hooks/
│   └── use-mobile.tsx          <- Mobile breakpoint (client)
├── lib/
│   ├── data.ts                 <- Hardcoded countries, visa requirements, blog posts
│   ├── theme.tsx               <- ThemeProvider (client, localStorage)
│   ├── i18n.tsx                <- I18nProvider (client, localStorage)
│   ├── utils.ts                <- cn() helper
│   ├── error-capture.ts        <- SSR error capture utility
│   └── error-page.ts           <- Server error HTML renderer
└── assets/
    ├── blog-us-visa.jpg
    ├── blog-schengen.jpg
    └── blog-easy-visa.jpg
```

---

## System Boundaries

| Module | Owns | Constraints |
|---|---|---|
| `src/lib/data.ts` | All hardcoded data (countries, destinations, visa requirements, visa types, blog posts, SITE_URL) | Server-safe; no database imports; `SITE_URL` from `process.env.NEXT_PUBLIC_SITE_URL` |
| `src/lib/theme.tsx` | Light/dark theme state | Client-only (`'use client'`); uses `localStorage` and `document.documentElement.classList` |
| `src/lib/i18n.tsx` | Locale state and translations | Client-only (`'use client'`); uses `localStorage`; 4 locales, RTL for Arabic |
| `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) | Pure utility |
| `src/lib/error-capture.ts` | SSR error capture for h3 swallowed errors | Utility for server error handling |
| `src/lib/error-page.ts` | Static HTML error page renderer | Returns HTML string for server error responses |
| `src/components/providers/query-provider.tsx` | TanStack Query `QueryClientProvider` | Client-only (`'use client'`); mounted once in root layout |
| `src/components/site/Layout.tsx` | Navbar, Footer, Disclaimer, Breadcrumbs | Client-only (`'use client'`); uses `useI18n`, `useTheme`, `next/link` |
| `src/components/site/SearchWidget.tsx` | Origin/destination country search | Client-only (`'use client'`); uses `useRouter` from `next/navigation` |
| `src/components/site/Ads.tsx` | AdSense banner/sidebar placeholders | Client-only (`'use client'`); uses `useEffect` |
| `src/components/site/BlogCard.tsx` | Blog post card link | Client component; uses `next/link` |

---

## Routing

All routes are flat (no locale prefix):

| Route | Pattern | Rendering |
|---|---|---|
| `/` | `src/app/page.tsx` | Client component (`useI18n`, `SearchWidget`) |
| `/about` | `src/app/about/page.tsx` | Server component (metadata export) |
| `/contact` | `src/app/contact/page.tsx` | Server metadata + client form (`'use client'` child) |
| `/blog` | `src/app/blog/page.tsx` | Server metadata + client list (`'use client'` child) |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Server metadata + client content (`'use client'` child) |
| `/[origin]/[destination]` | `src/app/[origin]/[destination]/page.tsx` | Server metadata + static params + client result (`'use client'` child, `dynamic = "force-dynamic"`) |
| `/visa-types/[country]` | `src/app/visa-types/[country]/page.tsx` | Server metadata + static params + client list (`'use client'` child, `dynamic = "force-dynamic"`) |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | Server component |
| `/sitemap.xml` | `src/app/sitemap.ts` | Server-side `sitemap()` export, `dynamic = "force-dynamic"` |

---

## Data Flow

All data originates from `src/lib/data.ts` (hardcoded, no database):

1. **Server Components** import `getRequirement`, `getOrigin`, `getDestination`, `getVisaTypes`, `getPost`, `blogPosts`, `SITE_URL` directly from `src/lib/data.ts`.
2. **Server Components** generate `metadata` (title, description, Open Graph) and pass data to client components as props.
3. **Client Components** (`'use client'`) handle interactivity: theme toggle, language switcher, search navigation, checklist state, form submission.
4. **TanStack Query** is available via `QueryProvider` in root layout for any future client-side data fetching needs.

---

## Server-Side Rendering (SSR)

- Server Components are the default. No `'use client'` unless hooks or browser APIs are needed.
- `generateMetadata` is used on dynamic routes for SEO (title, description, Open Graph, canonical URL).
- `generateStaticParams` is used on `[$origin]/[$destination]` and `visa-types/[$country]` for pre-rendering known origin/destination and country combinations.
- `dynamic = "force-dynamic"` is set on pages that must always be server-rendered (result pages, visa types, sitemap).
- `src/app/sitemap.ts` exports an async `sitemap()` function that returns URL entries for all routes.

---

## Error Handling

- `src/app/error.tsx` — Client error boundary for unexpected runtime errors.
- `src/app/not-found.tsx` — Client 404 page.
- `src/lib/error-page.ts` — `renderErrorPage()` returns static HTML string for server-level 500 errors.
- `src/lib/error-capture.ts` — Captures errors out-of-band for SSR error recovery (h3 swallowed errors).

---

## Environment Variables

| Variable | Purpose | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL for sitemap canonical links and OG image URLs | Browser-safe (`NEXT_PUBLIC_*` prefix, inlined at build time) |

No Supabase, no database credentials, no API keys required.

---

## Invariants

- All Next.js commands run from the repo root.
- Server Components are the default; add `'use client'` only when using hooks (`useState`, `useRouter`, `useI18n`, `useTheme`) or browser APIs (`localStorage`, `window`, `document`).
- `SITE_URL` must come from `process.env.NEXT_PUBLIC_SITE_URL` with fallback to `"http://localhost:3000"` — never hardcode a production URL.
- All UI strings must go through `useI18n().t()` — never hardcode English/French/Spanish/Arabic text in components.
- `next/link` is used for all internal navigation — never `<a href>` for internal routes.
- `cn()` from `@/lib/utils` is used for conditional/merged Tailwind classes.
- Dark mode via `class` strategy; `dark` class on `<html>` when theme is dark.
