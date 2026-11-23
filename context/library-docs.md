# Library Docs

Project-specific usage patterns for every third party library and service in this project. Read the relevant section before implementing any feature that touches these libraries.

---

## Authority Order

```
AGENTS.md (what we use) → code-standards.md (how we use it) → This file (patterns)
```

---

## Before Using Any Library

Before implementing any feature that uses a third party library or service:

1. **Read AGENTS.md** — verify the library exists in the approved stack
2. **Read code-standards.md** — check approved packages list before installing anything new
3. **Read this file** — follow the project-specific patterns below exactly

---

## Next.js 16 (App Router, React 19)

**Install:**
```bash
npm install next@16 react@19 react-dom@19
```

**App Router structure:**
- Flat routes (no locale prefix) — `/`, `/about`, `/contact`, `/blog`, `/blog/[slug]`, `/[origin]/[destination]`, `/visa-types/[country]`, `/privacy-policy`, `/sitemap.xml`
- Pure server components are the default. Add `'use client'` only when the file uses hooks (`useState`, `useRouter`, `useI18n`, `useTheme`, etc.) or browser APIs.
- `generateMetadata` for SEO on pages that need dynamic titles/descriptions.
- `generateStaticParams` for pre-rendering dynamic routes with known params.
- `dynamic = "force-dynamic"` on pages that must always be server-rendered.
- `sitemap.ts` exports an async `sitemap()` function for dynamic XML sitemap.

**Static vs dynamic:**
- Country/result pages and visa type pages are static-friendly — use `generateStaticParams`.
- Reading `searchParams` opts a route into dynamic rendering — expected and acceptable.

---

## Tailwind CSS v4 (via `@tailwindcss/postcss`)

**Install:**
```bash
npm install tailwindcss @tailwindcss/postcss
```

**Configuration:**
- Custom tokens live in `src/styles.css` via `@theme inline {}`.
- `tailwind.config.ts` is intentionally minimal — do not add tokens there.
- PostCSS uses `@tailwindcss/postcss`, not the legacy `tailwindcss` plugin.
- Semantic tokens (`--background`, `--primary`, `--card`, …) are defined as oklch values and re-exported via `@theme inline {}` so Tailwind utilities like `bg-background` work.

**Usage:**
- Prefer semantic tokens when adding new surfaces; match the existing inline oklch palette when editing pages that already use it.
- Use Tailwind utility classes for layout, spacing, and typography.
- Do not use `style={{}}` for anything Tailwind already handles cleanly.

---

## shadcn/ui + Radix Primitives

**Package:** `shadcn` (CLI) + Radix primitives
**Icons:** `lucide-react`
**CSS:** Tailwind v4 with `@theme` in `src/styles.css`

### Installation

```bash
npx shadcn@latest add button card input select badge dialog sheet tabs avatar skeleton separator
```

Check `src/components/ui/` before installing — don't re-add existing components.

### Component Selection

| Need | Component |
|---|---|
| Buttons | `Button` (variants: default, outline, secondary, ghost, destructive, link) |
| Form inputs | `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, `Slider` |
| Cards | `Card` / `CardHeader` / `CardContent` / `CardFooter` |
| Badges | `Badge` (variants: default, secondary, destructive, outline) |
| Modals | `Dialog` / `DialogTrigger` / `DialogContent` / `DialogTitle` |
| Side panels | `Sheet` / `SheetTrigger` / `SheetContent` |
| Tabs | `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` |
| Avatars | `Avatar` / `AvatarImage` / `AvatarFallback` |
| Loading | `Skeleton`, `Spinner` |
| Dividers | `Separator` |
| Empty states | `Empty` |
| Tooltips | `Tooltip` |

**Import form:** `import { Button } from "@/components/ui/button"`

**Rules:**
- Always install via `npx shadcn@latest add` — never copy-paste component source from docs.
- Check installed components before adding — don't re-add existing ones.
- Use `cn()` for conditional/merged classes — never template literal ternaries in `className`.
- Use `gap-*` for spacing — never `space-x-*` / `space-y-*`.
- Use `size-*` when width and height are equal — never `w-10 h-10`.
- Use `truncate` — never `overflow-hidden text-ellipsis whitespace-nowrap`.
- Use built-in variants first — never override component colors in `className`.
- Icons in buttons use `data-icon="inline-start"` or `data-icon="inline-end"`.
- No manual `z-index` on overlay components (Dialog, Sheet, Popover handle their own).

---

## TanStack Query v5

**Package:** `@tanstack/react-query`

**Install:**
```bash
npm install @tanstack/react-query
```

**Query client:**
- `QueryProvider` in `src/components/providers/query-provider.tsx` — mounted once in `src/app/layout.tsx`.
- Don't double-mount providers per page.

**Rules:**
- All query hooks live in a central location and are prefixed `use`.
- Fetchers call API endpoints, never import server-only modules into client code.
- Mutations use `useMutation` — never POST/PUT/DELETE inline in components.
- Show skeleton states while `isLoading`; show an error state when `isError`.

---

## Custom Dictionary i18n (no next-intl / next-i18next)

**Files:**
- `src/lib/i18n.tsx` — `I18nProvider`, `useI18n`, `locales`, `TKey` type

**Rules:**
- All UI strings must come from the dictionary — never hardcode user-facing English, French, Spanish, or Arabic in components.
- Client: `const { t, locale, setLocale } = useI18n()` from `@/lib/i18n`.
- Interpolation: use `vars` parameter — `t("types.title", { country: "France" })` — never string-concatenate with translated text.
- Adding a key means adding it to the `en` dict first, then `fr`, `es`, `ar` dicts.
- `locale === "ar"` sets RTL (`dir="rtl"` on `<html>`) — handled in `Layout.tsx` via `useEffect`.
- Routes are flat (no locale prefix) — no locale-aware path building needed.

**Available keys (subset):**
- `nav.home`, `nav.blog`, `nav.about`, `nav.contact`, `nav.privacy`
- `hero.title`, `hero.subtitle`
- `search.origin`, `search.destination`, `search.pick`, `search.cta`, `search.allTypes`
- `how.title`, `how.1`, `how.2`, `how.3`
- `popular.title`, `why.title`, `why.1`–`why.4`
- `footer.tagline`, `footer.disclaimer`, `footer.rights`
- `visa.required`, `visa.yes`, `visa.no`, `visa.onArrival`
- `visa.type`, `visa.entry`, `visa.validity`, `visa.maxStay`, `visa.processing`, `visa.fee`
- `visa.verified`, `visa.mandatory`, `visa.supporting`, `visa.process`, `visa.fees`
- `visa.item`, `visa.cost`, `visa.total`, `visa.feeNote`
- `visa.apply`, `visa.embassy`, `visa.disclaimer`
- `visa.otherFrom`, `visa.articles`, `visa.overview`
- `visa.generic`, `visa.checked`
- `types.title`, `types.subtitle`, `types.tap`, `types.stay`, `types.check`, `types.chooseOrigin`
- `blog.title`, `blog.read`, `blog.min`, `blog.related`
- `common.prev`, `common.next`, `common.visaTypes`
- `ad.label`

---

## lucide-react

**Package:** `lucide-react`

**Usage:**
- Use `lucide-react` for all icons.
- Size every lucide icon explicitly (`size={4}` / `size={5}`) — never rely on default stroke sizing.
- Icons in buttons: `data-icon="inline-start"` or `data-icon="inline-end"`.

**Commonly used icons:** `ArrowRight`, `BadgeCheck`, `Building2`, `ExternalLink`, `Globe2`, `Languages`, `Menu`, `Moon`, `Sun`, `X`, `AlertTriangle`, `CalendarDays`, `Clock`.

---

## sonner

**Package:** `sonner`

**Usage:**
- Use `sonner` for toast notifications.
- Show success/error toasts for mutations (form submissions, etc.).

---

## react-hook-form + zod

**Package:** `react-hook-form`, `zod`

**Usage:**
- Use react-hook-form for form state management.
- Use zod for schema validation.
- Never mix validation logic inline in components — define zod schemas and pass to `useForm({ resolver: zodResolver(schema) })`.

---

## Environment Variables

| Variable | Purpose | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL for sitemap canonical links and OG image URLs | Browser-safe (`NEXT_PUBLIC_*` prefix, inlined at build time) |

`NEXT_PUBLIC_*` variables are inlined into the browser bundle — only non-secret values belong there.

No Supabase, no database credentials, no API keys required.
