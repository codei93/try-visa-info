# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Migration from Vite/TanStack Start to Next.js 16 — **complete**

**Workstream:** Supabase integration + route restructure + seed data + template + override — **complete**

**Last completed:** Integrated Supabase as the dynamic data layer with multilingual support (en/fr/es/ar), structured values, template + override model. Migration `supabase/migrations/001_initial_schema.sql` rewritten. Seed files created and applied to Supabase: `supabase/seed/01_countries.sql` (32 rows), `02_visa_types.sql` (12 rows with full default docs/steps/fees in 4 languages), `03_visa_requirements.sql` (329 baseline + 48 detailed override rows from Passport Index CSV). Data layer `src/lib/data.ts` updated with override fallback logic, status column handling, and detailed flag for sitemap. Build passes (39 static pages). Route changed from `/[origin]/[destination]` to `/[origin]-to-[destination]` and back to `/[origin]/[destination]` (catch-all `[...slug]` failed with hyphenated country slugs).

---

## Feature Plan

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Project setup (Next.js 16, Tailwind v4, shadcn/ui, TanStack Query) | Phase 1 | done |
| 2 | Remove Vite/TanStack Start/Lovable dependencies | Phase 1 | done |
| 3 | Create App Router pages (all 9 routes) | Phase 1 | done |
| 4 | Replace `@tanstack/react-router` with `next/link` | Phase 1 | done |
| 5 | Add `'use client'` directives where needed | Phase 1 | done |
| 6 | Update `SITE_URL` to `NEXT_PUBLIC_SITE_URL` env var | Phase 1 | done |
| 7 | Context files rewrite (AGENTS.md + 9 context files) | Phase 2 | done |
| 8 | Supabase integration — `@supabase/supabase-js` + `@supabase/ssr`, server client, migration SQL, RLS | Phase 3 | done |
| 9 | Multilingual schema — locale-keyed jsonb, blog_post_translations, structured values | Phase 3 | done |
| 10 | Data layer migration — `src/lib/data.ts` hardcoded arrays → async Supabase functions + hydration helpers | Phase 3 | done |
| 11 | Route restructure — `/[origin]/[destination]` → `/[origin]-to-[destination]` → `/[origin]/[destination]` (catch-all `[...slug]` failed with hyphenated slugs) | Phase 3 | done |
| 12 | Update all pages (homepage, visa-types, blog, sitemap) for async data + localized helpers | Phase 3 | done |
| 13 | Seed data — `supabase/seed/01_countries.sql` (32), `02_visa_types.sql` (12), `03_visa_requirements.sql` (329) | Phase 3 | done |
| 14 | Visa type templates — default docs/steps/fees for all 12 visa types in 4 languages | Phase 3 | done |
| 15 | Pair-specific overrides — China nationality fees, Saudi eVisa, Mexico→USA (48 detailed rows) | Phase 3 | done |
| 16 | Data layer override fallback — `getRequirement` resolves NULL columns to visa_types defaults | Phase 3 | done |
| 17 | Refactor: Move `_client.tsx` files to `src/components/` — HomePageContent, VisaTypesPageContent, ContactFormContent, VisaResultPageContent created | Phase 3 | done |
| 17 | Lint pass — fix errors in source files | Phase 3 | pending (pre-existing only) |
| 18 | UI tokens verification against `src/styles.css` | Phase 4 | pending |
| 19 | Component registry updates | Phase 4 | pending |
| 20 | Final build/dev verification | Phase 5 | done |

---

## Context Rewrite Status

| File | Source in AGENTS.md | Status |
|---|---|---|
| `AGENTS.md` | Master instructions + skill list | done |
| `context/project-overview.md` | Project overview, stack, structure, pages, flows | done |
| `context/architecture.md` | App Router structure, data flow, server/client boundaries | done |
| `context/ui-tokens.md` | Design tokens from `src/styles.css` | done |
| `context/ui-rules.md` | UI build rules, layout, navbar, cards, typography, buttons, forms | done |
| `context/ui-registry.md` | Component inventory, page route map, shared components | done |
| `context/code-standards.md` | Code comment rules, TypeScript rules, styling rules, approved packages | done |
| `context/library-docs.md` | Per-library patterns (Next.js, Tailwind v4, shadcn, TanStack Query, i18n, lucide, sonner, env vars) | done |
| `context/build-plan.md` | Build phases, feature plan | done |
| `context/progress-tracker.md` | This file | done |

---

## Verification

```bash
npm run build
npm run lint
npm run dev      # verify on http://localhost:3000
```

All pages must build without errors. `next.config.ts` does **not** silence TypeScript or ESLint — fix issues at the source, do not flip `ignoreBuildErrors`.
