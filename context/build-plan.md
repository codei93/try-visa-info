# Build Plan

## Core Principle

Full page UI built with mock data first — verified visually before any logic is written. Then functionality is built and wired to the UI step by step. Every feature must be visible and testable before moving to the next. No invisible backend phases.

**Build order: Project setup → Context files → Lint/Typecheck → Design tokens → Component registry → Polish & verify.**

---

## Phase 1 — Foundation (Complete)

### 01 Project Setup — DONE

Migrated from Vite/TanStack Start to Next.js 16 App Router.

**What was done:**
- Replaced `vite.config.ts` with `next.config.ts`
- Added `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `next-env.d.ts`
- Replaced Vite/TanStack Start deps with Next.js 16, React 19, Tailwind v4 (`@tailwindcss/postcss`)
- Created `src/app/` App Router pages (layout, page, about, contact, blog, visa result, visa types, privacy, sitemap, not-found, error)
- Replaced `@tanstack/react-router` with `next/link` and `next/navigation` in all components
- Added `'use client'` directives where hooks/browser APIs are used
- Split page exports (`metadata`, `generateStaticParams`) from client components (`_client.tsx`)
- Removed Lovable references (`@lovable.dev/vite-tanstack-config`, `lovable-error-reporting.ts`, `bun.lock`, `bunfig.toml`)
- Updated `SITE_URL` to use `process.env.NEXT_PUBLIC_SITE_URL`
- Created `.env` and `.env.example` with `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Removed `vite.config.ts`, `vitest.config.ts`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `src/routeTree.gen.ts`, `src/routes/`

**Verification:**
- `npm run build` — passes (322 static pages generated)
- `npm run dev` — starts on `http://localhost:3000`, returns HTTP 200

---

## Phase 2 — Context Files (In Progress)

### 02 Context Files Rewrite — IN PROGRESS

Rewriting all context files to match the actual `try-visa-info` project (replacing DutyPricing content).

Files to update:
- `AGENTS.md` — master instructions (done)
- `context/project-overview.md` — project purpose, stack, structure, pages, flows (done)
- `context/architecture.md` — App Router structure, data flow, server/client boundaries (done)
- `context/ui-tokens.md` — design tokens from `src/styles.css` (done)
- `context/ui-rules.md` — UI build rules (done)
- `context/ui-registry.md` — component inventory and page route map (done)
- `context/code-standards.md` — engineering rules (done)
- `context/library-docs.md` — per-library patterns (done)
- `context/build-plan.md` — this file
- `context/progress-tracker.md` — feature status tracking

---

## Phase 3 — Lint & Typecheck (Pending)

### 03 Lint Pass

- Run `npm run lint` and fix errors in source files (not `.output/` build artifacts)
- Update `eslint.config.js` to ignore `.output/` directory
- Clean up unused imports in new files

### 04 TypeScript Check

- `npm run build` already runs TypeScript checking — ensure zero errors
- Verify `@/*` path alias works consistently

---

## Phase 4 — Design System Alignment (Pending)

### 05 UI Tokens Verification

- Verify `context/ui-tokens.md` matches `src/styles.css` exactly
- Check all oklch values, radius calculations, shadow definitions

### 06 Component Registry Updates

- Update `context/ui-registry.md` after every component built
- Verify shadcn/ui component inventory matches `src/components/ui/`

---

## Phase 5 — Polish & Verify (Pending)

### 07 Final Verification

```bash
npm run build
npm run lint
npm run dev    # verify on localhost:3000
```

All pages must build without errors. `next.config.ts` does not silence TypeScript or ESLint — fix issues at the source.

---

## Feature Count

| Phase | Features | Status |
|---|---|---|
| Phase 1 — Foundation | Next.js 16 migration | Done |
| Phase 2 — Context Files | Rewrite all 9 context files | In progress |
| Phase 3 — Lint & Typecheck | Clean build, zero lint errors | Pending |
| Phase 4 — Design System | Token alignment, registry updates | Pending |
| Phase 5 — Polish & Verify | Final build/dev verification | Pending |
