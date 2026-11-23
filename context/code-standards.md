# Code Standards

Implementation rules and conventions for the entire project. The AI agent must follow these in every session without exception. These rules prevent pattern drift across sessions.

---

## Engineering Mindset

- **Think before implementing** — understand what is being built and why before writing a single line
- **Read context files first** — never assume, always verify against `AGENTS.md` and `context/project-overview.md`
- **Scope is sacred** — only build what the current feature requires
- **Every feature must be testable** — if it cannot be verified immediately after implementation, it is incomplete
- **Clean over clever** — simple readable code always preferred
- **One thing at a time** — complete one feature fully before touching the next
- **Failures are expected** — wrap operations in try/catch, log failures, never crash everything

---

## Repository Root

All commands run from the repo root:

```bash
# Correct
npm run dev
npm run build
npm run lint
npm run format
npm run test
```

---

## Comments — Required on All TypeScript Exports and Non-Trivial Logic

Every exported function, hook, component, and non-obvious block must have a comment. This is non-negotiable — it ensures the AI agent and future developers understand intent without reading implementation.

**File header:** every non-trivial file starts with a short header explaining its purpose.
**Exported symbol:** JSDoc-style comment explaining what it does and any non-obvious caching / SSR / RLS implications.
**Inline block:** `//` comment for every non-obvious block.
**Use `//` for inline comments; reserve `/** */` for exported symbols.**
**Comments explain WHY, not just WHAT.**

Example pattern:

```ts
// Cache key includes slug so each country detail is cached independently.
export const getRequirement = (origin: string, destination: string, typeCode?: string) => { ... }
```

Do not leave uncommented hooks, data-layer functions, or non-trivial logic blocks.

---

## TypeScript Rules

Use TypeScript strictly. Avoid `any`.

- Path alias: `@/*` maps to `./src/*` — use `@/lib/data`, `@/components/ui/button`, etc.
- `tsconfig.json` uses strict mode with `noUncheckedIndexedAccess: true` — always handle undefined array access
- `exactOptionalPropertyTypes: true` — be precise with optional properties
- Locale: `type Locale = "en" | "fr" | "es" | "ar"` from `@/lib/i18n`
- Query/hook return types come from inline types or `src/lib/data.ts` types

---

## Styling Rules

Use Tailwind CSS v4 utility classes for layout, spacing, and typography.

Acceptable exceptions for `style={{}}`:
- Dynamic values calculated at runtime (image URLs, computed widths).
- CSS variable references like `var(--radius)`.

Do not use `style={{}}` for anything Tailwind already handles cleanly (margins, paddings, flex, grid, font sizes).

- Use `cn()` from `@/lib/utils` for conditional/merged classes
- Use `gap-*` for spacing — never `space-x-*` / `space-y-*`
- Use `size-*` when width and height are equal — never `w-10 h-10`
- Use `truncate` for text overflow — never `overflow-hidden text-ellipsis whitespace-nowrap`
- Use semantic colors (`bg-primary`, `text-muted-foreground`, `border-border`) — never raw Tailwind colors
- No hardcoded hex values in `.tsx` files

---

## SSR Rules

Server Components are the default. A component is a Server Component unless it explicitly opts in with `'use client'`.

Any component using `localStorage`, `window`, browser-only APIs, or React hooks must either:
- Add `'use client'` at the top, **or**
- Be rendered inside a client subtree (e.g. inside a component that is already `'use client'`).

Providers (`QueryProvider`, `ThemeProvider`, `I18nProvider`) are mounted once in `src/app/layout.tsx`. Don't double-mount them per page.

Do **not** sprinkle `export const dynamic = 'force-dynamic'` unless you have a concrete reason — pages are intentionally static-friendly so they can be pre-rendered.

---

## Error Handling

- Never use empty catch blocks.
- User-facing errors: human readable, never raw exception messages.
- Server errors: use `src/lib/error-page.ts` `renderErrorPage()` for HTML 500 responses.
- Client errors: use `src/app/error.tsx` error boundary.

---

## i18n Rules

- All UI strings must come from the context provider — never hardcode user-facing English, French, Spanish, or Arabic in components.
- Server Components: import `useI18n` is not available in RSC — pass translated strings as props from client components or use `metadata` exports for static strings.
- Client Components: `const { t, locale, setLocale } = useI18n()` from `@/lib/i18n`.
- `isRtl(locale)` is true only for `"ar"` — the `Layout` component sets `dir` on `<html>` via `useEffect`.
- When building locale-aware links, use `next/link` with the flat route (no locale prefix — routes are flat in this project).

---

## Approved Packages

**npm — install from repo root:**
- `next@16` — App Router, React 19
- `react@19`, `react-dom@19`
- `@tanstack/react-query` — v5 data fetching
- `tailwindcss`, `@tailwindcss/postcss` — v4 styling
- `sonner` — toast notifications
- `lucide-react` — icons
- `react-hook-form`, `zod` — forms
- `clsx`, `tailwind-merge` — `cn()` helper
- `@radix-ui/*` — shadcn/ui primitives (installed via shadcn CLI)

**shadcn/ui components — install via CLI:**
```bash
npx shadcn@latest add <component>
```

Do not install any other packages without a strong reason.

---

## Frontend — shadcn/ui Conventions

All public UI uses shadcn/ui components. Follow these rules strictly.

### Installation
- Install components via `npx shadcn@latest add <component>` — never copy-paste source
- Check `src/components/ui/` before adding — don't re-install existing components
- Use `cn()` from `@/lib/utils` for conditional/merged classes

### Component Usage
- Use shadcn components for all standard UI: buttons, inputs, cards, badges, dialogs, tabs, avatars
- Use `cn()` from `@/lib/utils` for conditional/merged classes
- Use built-in variants (`variant="outline"`, `size="sm"`) before custom styles
- Use semantic color tokens (`bg-background`, `text-muted-foreground`) — never raw Tailwind colors

### Styling
- `gap-*` for spacing — never `space-x-*` / `space-y-*`
- `size-*` for equal width/height — never `w-10 h-10`
- `truncate` for text overflow — never `overflow-hidden text-ellipsis whitespace-nowrap`
- No manual `z-index` on overlay components (Dialog, Sheet, Popover handle stacking)
- Icons in buttons: `data-icon="inline-start"` or `data-icon="inline-end"`, no sizing classes

### Base UI vs Radix
This project uses shadcn/ui with Radix primitives. Follow the shadcn conventions as installed — do not fork shadcn component files.

### File Locations
- shadcn components: `src/components/ui/`
- Custom components: `src/components/`
- Site components: `src/components/site/`
- Page components: `src/app/`
- Utility functions: `src/lib/utils.ts`
- Data layer: `src/lib/data.ts`
- Theme: `src/lib/theme.tsx`
- i18n: `src/lib/i18n.tsx`
