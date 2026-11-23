# UI Rules

Concise rules for building the try-visa-info UI. These rules cover the most important patterns and constraints to keep the UI consistent without over-specifying every detail.

Tokens are documented in `context/ui-tokens.md`. The implementation of every token and component class is in `src/styles.css`.

---

## Font

One font stack loaded via Tailwind v4 `@theme inline` in `src/styles.css`:

- **Inter** with **Noto Sans Arabic** fallback (`--font-sans` / `font-sans`) — headings, body, all UI text

Use the Tailwind `font-sans` class — don't reach for raw `font-family` styles.

Never add a third font.

---

## Layout

- **One default layout:** `Layout` in `src/components/site/Layout.tsx` — sticky `Navbar` on top, `<main>` content area, `Footer` at bottom.
- **No page renders a navbar or footer** — `Layout` is the canonical public wrapper for all routes.
- Page max-width: `mx-auto max-w-6xl` with `px-4` padding.
- Main content padding: `py-8` on pages, `px-4` on containers.
- Gap between page sections: `gap-6` / `gap-8` / `space-y-6`.
- Public navbar: fixed `top-0`, sticky, with backdrop blur.
- Below `lg`, mobile menu toggles via hamburger button.
- Footer: `mt-16`, border-top, muted text, copyright.

---

## Navbar (Public)

Role-aware center nav:

- Container: `sticky top-0 z-40 border-b border-border bg-nav shadow-sm backdrop-blur-md`, height `h-16`.
- Inner: `mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4`.
- Logo: `Try<span className="text-primary">Visa</span>Info` with Globe2 icon, links to `/`.
- Nav links: Home, Blog, About, Contact, Privacy Policy. `text-sm font-medium text-muted-foreground hover:text-foreground`, active state `text-primary`.
- Right side: LanguageSwitcher (dropdown with EN/FR/ES/AR), ThemeToggle (sun/moon), mobile hamburger menu.
- Size every lucide icon explicitly (`size={4}` / `size={5}`) — never rely on default stroke sizing.
- No hamburger menu on desktop; mobile menu shows below `lg` breakpoint.
- Locale menu is shadcn `DropdownMenu` with language names.

---

## Sidebar (Ads)

Desktop ad rails — `AdSidebar` renders `AdBanner` with `format="rectangle"`. Not currently used in layout but available for sidebar placement.

---

## Cards

Every content section lives in a card:

```
rounded-xl border border-border bg-card p-5 shadow-card sm:p-6
```

or shadcn `Card` / `CardHeader` / `CardContent` / `CardFooter` where shadcn API is needed.

- Never use colored card backgrounds — color goes inside cards via pills, bars, and text.
- Tables inside cards: use `w-full text-sm` with bordered rows.

---

## Typography Hierarchy

`h1`–`h6` use Inter font automatically. Body copy is Inter.

**Page heading:**
```
text-3xl font-extrabold tracking-tight sm:text-4xl
color: var(--foreground)
```

**Section heading (card title):**
```
text-2xl font-bold
color: var(--foreground)
```

**Body / primary content:**
```
text-base
color: var(--foreground)
line-height: 1.5
```

**Secondary text:**
```
text-sm text-muted-foreground
```

**Micro / timestamp / hint:**
```
text-xs text-muted-foreground
```

**Credit amounts:**
```
text-sm font-medium
```

---

## Badges and Pills

Everything badge-like uses shadcn `Badge` or inline pill styles:

```jsx
<span className="rounded-full px-2.5 py-0.5 text-sm font-bold">…</span>
```

- **Visa required badge:** `bg-destructive text-destructive-foreground` (yes), `bg-secondary text-secondary-foreground` (no), `bg-accent text-accent-foreground` (on-arrival).
- **Tag pills:** `rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground`.

---

## Buttons

Prefer shadcn `Button` for all standard UI:

| Variant | Usage |
|---|---|
| `default` | Primary CTA (`bg-primary`, `text-primary-foreground`) |
| `outline` | Secondary actions |
| `ghost` | Neutral actions |

- Calculator CTA: `size="lg" className="w-full"`.
- Never hand-roll `text-white` on an accent background — always use shadcn variants.
- Icons in buttons: `size={4}` with `rtl:rotate-180` for Arabic RTL.

---

## Form Inputs

Use shadcn controls: `Input`, `Textarea`, `Select`, `Checkbox`, `Label`, `FieldGroup`/`Field`.

- Standard field height `h-12` for single-line inputs on full-page forms.
- Labels: `text-sm font-medium` above the field.
- Errors: human-readable text, never raw exception messages.
- Form layout pattern:
```tsx
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" type="email" />
  </Field>
</FieldGroup>
```

---

## Empty States

Every section that can be empty must have an empty state. Use shadcn `Empty` component or a minimal inline empty state:

- Icon (muted color)
- Short descriptive text in muted color
- CTA button if there's a logical next action

Examples:
- Blog with no posts: "No posts yet."
- Country with no visa types: Generic fallback visa types.

---

## Responsive Breakpoints

- Mobile: `< 768px` — single column, compact nav, hamburger menu
- Tablet: `768px–1024px` — two column where applicable
- Desktop: `> 1024px` — full layout

All layouts must be usable on mobile.

---

## shadcn Components

All public UI uses shadcn/ui components.

**Installed (in `src/components/ui/`):**
`alert`, `alert-dialog`, `avatar`, `badge`, `button`, `card`, `checkbox`, `collapsible`, `context-menu`, `dialog`, `dropdown-menu`, `empty`, `field`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `switch`, `tabs`, `textarea`, `tooltip`, `toggle`, `toggle-group`

**Core rules:**
- Always install shadcn components via `npx shadcn@latest add <component>` — never copy-paste from docs.
- Check `src/components/ui/` before installing — don't re-add existing components.
- Pipe `printf 'n\n' |` into the CLI when re-running so interactive overwrite prompts don't hang.
- Never install a component that pulls a new dependency without approval.
- Use `cn()` from `@/lib/utils` for conditional/merged classes — never template literal ternaries in `className`.
- Use `gap-*` for spacing — never `space-x-*` or `space-y-*`.
- Use `size-*` when width and height are equal — never `w-10 h-10`.
- Use `truncate` shorthand — never `overflow-hidden text-ellipsis whitespace-nowrap`.
- Use semantic colors (`bg-primary`, `text-muted-foreground`) — never raw Tailwind colors.
- Use built-in variants first (`variant="outline"`, `size="sm"`) — never override component colors manually.
- Icons in buttons use `data-icon="inline-start"` or `data-icon="inline-end"`.
- No manual `z-index` on overlay components (Dialog, Sheet, Popover handle stacking).

**Component mapping:**
| Need | shadcn Component |
|---|---|
| Buttons | `Button` with variant |
| Form inputs | `Input`, `Select`, `Textarea`, `Checkbox`, `Switch` |
| Cards | `Card` / `CardHeader` / `CardContent` / `CardFooter` |
| Badges | `Badge` |
| Modals | `Dialog` / `DialogTrigger` / `DialogContent` |
| Side panels | `Sheet` / `SheetTrigger` / `SheetContent` |
| Tabs | `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` |
| Avatars | `Avatar` / `AvatarImage` / `AvatarFallback` |
| Loading | `Skeleton` / `Spinner` |
| Dividers | `Separator` |
| Empty states | `Empty` |
| Tooltips | `Tooltip` |

**Icon pattern:**
```tsx
import { SearchIcon } from "lucide-react"

<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>
```

---

## Do Nots

- Never use raw Tailwind color classes (`bg-purple-500`, `text-gray-600`) — use project tokens only.
- Never hardcode hex in `.tsx` (the only exception is third-party brand SVG fills).
- Never use `text-white` / `bg-white` — use `text-foreground`, `bg-card`, or tokens.
- Never use `space-x-*` / `space-y-*` — use `gap-*`.
- Never add gradients to card backgrounds.
- Never show raw error messages to users — always show human-readable text.
- Never use `position: fixed` for content elements — only for navbar and mobile menu toggle.
- Never hardcode user-facing strings — always go through `useI18n().t()`.
- Never import images directly — use string paths under `/public` or import from `@/assets`.
