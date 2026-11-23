# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following `ui-rules.md` and `ui-tokens.md`, then add it here after building

After building any component — update this file with the component name, file path, and exact classes used.

---

## Design System Entry Points

| What | File |
|---|---|
| All tokens, `@theme`, custom utilities | `src/styles.css` |
| Token reference | `context/ui-tokens.md` |
| Usage rules | `context/ui-rules.md` |
| Layout wrapper | `src/components/site/Layout.tsx` |
| `cn()` helper | `src/lib/utils.ts` |

---

## shadcn UI Components

All public UI uses shadcn/ui components. Install via CLI:

```bash
npx shadcn@latest add <component>
```

| Component | File |
|---|---|
| `alert` | `src/components/ui/alert.tsx` |
| `alert-dialog` | `src/components/ui/alert-dialog.tsx` |
| `avatar` | `src/components/ui/avatar.tsx` |
| `badge` | `src/components/ui/badge.tsx` |
| `button` | `src/components/ui/button.tsx` |
| `card` | `src/components/ui/card.tsx` |
| `checkbox` | `src/components/ui/checkbox.tsx` |
| `collapsible` | `src/components/ui/collapsible.tsx` |
| `context-menu` | `src/components/ui/context-menu.tsx` |
| `dialog` | `src/components/ui/dialog.tsx` |
| `dropdown-menu` | `src/components/ui/dropdown-menu.tsx` |
| `empty` | `src/components/ui/empty.tsx` |
| `field` | `src/components/ui/field.tsx` |
| `hover-card` | `src/components/ui/hover-card.tsx` |
| `input` | `src/components/ui/input.tsx` |
| `input-otp` | `src/components/ui/input-otp.tsx` |
| `label` | `src/components/ui/label.tsx` |
| `menubar` | `src/components/ui/menubar.tsx` |
| `navigation-menu` | `src/components/ui/navigation-menu.tsx` |
| `pagination` | `src/components/ui/pagination.tsx` |
| `popover` | `src/components/ui/popover.tsx` |
| `progress` | `src/components/ui/progress.tsx` |
| `radio-group` | `src/components/ui/radio-group.tsx` |
| `scroll-area` | `src/components/ui/scroll-area.tsx` |
| `select` | `src/components/ui/select.tsx` |
| `separator` | `src/components/ui/separator.tsx` |
| `sheet` | `src/components/ui/sheet.tsx` |
| `skeleton` | `src/components/ui/skeleton.tsx` |
| `slider` | `src/components/ui/slider.tsx` |
| `switch` | `src/components/ui/switch.tsx` |
| `tabs` | `src/components/ui/tabs.tsx` |
| `textarea` | `src/components/ui/textarea.tsx` |
| `tooltip` | `src/components/ui/tooltip.tsx` |
| `toggle` | `src/components/ui/toggle.tsx` |
| `toggle-group` | `src/components/ui/toggle-group.tsx` |

**Import form:** `import { Button } from "@/components/ui/button"`

**Rules:**
- Always install via `npx shadcn@latest add` — never copy-paste component source.
- Check `src/components/ui/` before installing — don't re-add existing components.
- Pipe `printf 'n\n' |` into the CLI so overwrite prompts don't hang.
- Don't install components that pull a new dependency without approval (`chart`, `calendar`, `sonner`, `command`, `input-otp`).
- Use `cn()` for conditional/merged classes — never template literal ternaries in `className`.
- This project uses shadcn/ui with Radix primitives.

---

## Shared App Components

| Component | File | Notes |
|---|---|---|
| Layout | `src/components/site/Layout.tsx` | Canonical public wrapper: `Navbar` (sticky top), `<main>` content, `Footer`. Exports `Navbar`, `Footer`, `Disclaimer`, `Breadcrumbs`, `Logo`. |
| Navbar | `src/components/site/Layout.tsx` | Sticky dark navbar with logo, nav links, LanguageSwitcher, ThemeToggle, mobile hamburger. |
| Footer | `src/components/site/Layout.tsx` | Footer with logo, tagline, nav links, privacy link, disclaimer, copyright. |
| Disclaimer | `src/components/site/Layout.tsx` | Warning-style disclaimer card with AlertTriangle icon. |
| Breadcrumbs | `src/components/site/Layout.tsx` | Breadcrumb navigation with links and separators. |
| SearchWidget | `src/components/site/SearchWidget.tsx` | Origin/destination country search with Select dropdowns and navigation. |
| Ads | `src/components/site/Ads.tsx` | `AdBanner` (leaderboard/rectangle placeholders) and `AdSidebar`. AdSense placeholders, not live. |
| BlogCard | `src/components/site/BlogCard.tsx` | Blog post card with image, tags, title, excerpt, date, read time. |
| QueryProvider | `src/components/providers/query-provider.tsx` | TanStack Query `QueryClientProvider` wrapper. Mounted once in root layout. |
| HomePageContent | `src/components/home/HomePageContent.tsx` | Homepage client component: hero, SearchWidget, popular routes, why-us section. |
| VisaTypesPageContent | `src/components/visa/VisaTypesPageContent.tsx` | Visa types page client component: displays visa types for a destination country with SearchWidget. |
| VisaResultPageContent | `src/components/visa/VisaResultPageContent.tsx` | Visa result page client component: detailed visa requirements page client component. |
| ContactFormContent | `src/components/contact/ContactFormContent.tsx` | Contact form client component: contact form with name, email, subject, message fields. |

---

## shadcn Rules

- Always install shadcn components via `npx shadcn@latest add <name>` — never copy-paste from docs.
- Use `cn()` for conditional/merged classes — never template literal ternaries in `className`.
- Use `gap-*` for spacing — never `space-x-*` / `space-y-*`.
- Use `size-*` when width and height are equal — never `w-10 h-10`.
- Use `truncate` shorthand — never `overflow-hidden text-ellipsis whitespace-nowrap`.
- Use semantic colors (`bg-primary`, `text-muted-foreground`) — never raw Tailwind colors.
- Use built-in variants first (`variant="outline"`, `size="sm"`) — never override component colors manually.

---

## Supabase Client Layer

| File | Purpose |
|------|---------|
| `src/lib/supabase/server.ts` | Server Supabase client using `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` for SSR/build-time data fetching. Never exposed to browser. |
| `src/lib/supabase/client.ts` | Browser Supabase client factory using `NEXT_PUBLIC_SUPABASE_ANON_KEY` for future client-side interactivity. |

## Supabase Seed Files

| File | Rows | Purpose |
|------|------|---------|
| `supabase/seed/01_countries.sql` | 32 | 21 origins + 11 destinations (all is_origin=true, 11 also is_destination=true). Upsert on `slug`. FK lookups via `iso_code`. |
| `supabase/seed/02_visa_types.sql` | 12 | One verified main visa per destination (DE/FR/CH/PL share SCHENGEN_C). Upsert on `(destination_id, code)`. `last_verified` NULL. `default_mandatory_docs`/`default_supporting_docs`/`default_steps` filled in en/fr/es/ar for all 12 rows. fee_amount/fee_currency populated; NULL stay/processing use 0 placeholder (NOT NULL columns). |
| `supabase/seed/03_visa_requirements.sql` | 329 + 48 detailed | 329 baseline status rows from Passport Index CSV matrix (type_code NULL). 48 detailed override rows: China (31 origins → China with nationality-dependent fees), Saudi Arabia (24 origins → Saudi Arabia with eVisa details), Mexico→USA (B1/B2). All detail columns NULL for baseline rows; detailed rows have full docs/steps/fees in 4 languages with `detailed = true`. Upsert on `(origin_id, destination_id, type_code)`. Schengen-internal pairs (DE/FR/CH/PL × each other) skipped. |

## Supabase Schema — Template + Override Model

| Table | Role |
|-------|------|
| `countries` | Unified origins + destinations. `iso_code` drives flag emoji in app. `name` is locale-keyed jsonb. |
| `visa_types` | Default template per destination + visa type. Holds default values (`default_mandatory_docs`, `default_supporting_docs`, `default_steps`, `fee_amount`, `apply_url`, etc.) that `visa_requirements` falls back to when its columns are NULL. |
| `visa_requirements` | One row per origin/destination pair (+ optional `type_code`). All detail columns are NULLABLE overrides — NULL means "use `visa_types` default". `status` replaces `visa_required` (`visa-free\|visa-required\|e-visa\|eta\|on-arrival\|not-admitted`). `data_source` (`passport-index\|manual`). `detailed` = hand-verified (drives sitemap/indexing). Baseline rows have `type_code IS NULL`. |
| `blog_posts` | Metadata only (cover_url, tags, date, author, published). Translations in separate table. |
| `blog_post_translations` | Locale-keyed content (slug, title, excerpt, content). `UNIQUE (post_id, locale)` and `UNIQUE (locale, slug)`. RLS exposes only rows whose parent post is `published`. |

RLS: public read-only SELECT on all 5 tables for `anon` + `authenticated`. No insert/update/delete policies.

## Data Layer — Override Resolution

`src/lib/data.ts` implements the template + override model:
- `getRequirement()` fetches a `visa_requirements` row, then falls back to `visa_types` defaults for any NULL column (override model).
- `getGenericRequirement()` generates a fallback from `visa_types` when no requirement row exists.
- `getAllDetailedRoutePairs()` returns pairs with `detailed = true` for sitemap generation.
- `hydrateRequirement()` converts raw DB rows to client-ready objects with localized, formatted values.
- `hydrateCountry()`, `hydrateVisaType()`, `hydrateBlogPost()` provide client-side hydration helpers.


## Page Route Map

| Page | File | Route |
|---|---|---|
| Home | `src/app/page.tsx` | `/` |
| About | `src/app/about/page.tsx` | `/about` |
| Contact | `src/app/contact/page.tsx` | `/contact` |
| Blog index | `src/app/blog/page.tsx` | `/blog` |
| Blog post | `src/app/blog/[slug]/page.tsx` | `/blog/[slug]` |
| Visa result | `src/app/[origin]/[destination]/page.tsx` | `/[origin]/[destination]` |
| Visa types | `src/app/visa-types/[country]/page.tsx` | `/visa-types/[country]` |
| Privacy Policy | `src/app/privacy-policy/page.tsx` | `/privacy-policy` |
| Sitemap | `src/app/sitemap.ts` | `/sitemap.xml` |
| 404 | `src/app/not-found.tsx` | `/404` |
| Error | `src/app/error.tsx` | Global error boundary |
| Root Layout | `src/app/layout.tsx` | All routes |

**Patterns:**
- Home: hero + SearchWidget + popular routes + why-us section.
- About: data sourcing and verification explanation.
- Contact: mailto form with name, email, subject, message fields.
- Blog: paginated index (10 per page) with prev/next navigation.
- Visa result: requirement details, checklists, process steps, fees, apply/embassy buttons, related visas. Route format: `/[origin]/[destination]` (hyphenated country slugs like `south-africa` are supported because they are separate path segments)
- Visa types: all visa types for a destination country with search widget.
- All pages wrap content in `Layout` (via root layout).

---

## Shared Props (i18n)

Typed through `src/lib/i18n.tsx` context provider:

| Prop | Shape | Source |
|---|---|---|
| `t` | `(key: TKey, vars?) => string` | `useI18n()` from `@/lib/i18n` |
| `locale` | `"en" \| "fr" \| "es" \| "ar"` | `useI18n()` from `@/lib/i18n` |
| `setLocale` | `(l: Locale) => void` | `useI18n()` from `@/lib/i18n` |

All UI strings must come through `t("key")` — never hardcode English/French/Spanish/Arabic text in components.
