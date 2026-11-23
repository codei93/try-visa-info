# UI Tokens

Design tokens for try-visa-info. All colors, typography, spacing, and component values. Use these exact values throughout the codebase — never hardcode colors or use raw Tailwind color classes in components.

> **Source of truth:** `src/styles.css`. Every value in this document lives in that file. If they ever disagree, `src/styles.css` wins.

---

## How to Use

Tokens are declared once in `src/styles.css`:

- `@theme inline { … }` — maps CSS custom properties to Tailwind utility classes (e.g. `--color-primary` → `bg-primary`, `text-primary`).
- `:root { … }` — light theme values (oklch format).
- `.dark { … }` — dark theme values (oklch format). `<html class="dark">` is set when dark mode is active.
- `@layer base { … }` — base element styles (`*`, `body`).
- `@utility { … }` — custom utilities (`bg-hero`, `shadow-card`).

```jsx
// Correct — token-based class
<button className="btn-primary">Check requirements</button>
<div className="bg-card text-foreground border border-border" />

// Never — hardcoded hex
<button style={{ background: '#3b82f6' }}>Check</button>

// Never — raw Tailwind color
<button className="bg-blue-500">Check</button>
```

**Allowed exception:** inline `style` referencing `var(--…)` (e.g. gradients) is fine — it is still a token.

---

## Fonts

| Token | Font | Used for |
|---|---|---|
| `--font-sans` | **Inter**, **Noto Sans Arabic** fallback | Body, UI, everything by default |

Loaded via Tailwind v4 `@theme inline` in `src/styles.css`. The `font-sans` utility resolves to Inter with Noto Sans Arabic fallback for Arabic script support.

---

## Color Palette

### Light Theme (`:root`)

| Token | oklch Value | Approx Hex | Usage |
|---|---|---|---|
| `--background` | `oklch(0.985 0.002 247)` | `#fafafa` | Page background |
| `--foreground` | `oklch(0.21 0.03 265)` | `#1e1e2e` | Headings, primary content |
| `--card` | `oklch(1 0 0)` | `#ffffff` | Card surfaces |
| `--card-foreground` | `oklch(0.21 0.03 265)` | `#1e1e2e` | Text on cards |
| `--popover` | `oklch(1 0 0)` | `#ffffff` | Popover backgrounds |
| `--primary` | `oklch(0.52 0.2 262)` | `#4f46e5` | Primary buttons, active nav |
| `--primary-foreground` | `oklch(0.99 0 0)` | `#ffffff` | Text on primary backgrounds |
| `--secondary` | `oklch(0.63 0.14 160)` | `#10b981` | Secondary buttons |
| `--muted` | `oklch(0.96 0.004 265)` | `#f3f4f6` | Muted surfaces |
| `--muted-foreground` | `oklch(0.55 0.02 264)` | `#6b7280` | Labels, secondary text |
| `--accent` | `oklch(0.77 0.16 70)` | `#d97706` | Accent elements |
| `--accent-foreground` | `oklch(0.25 0.05 60)` | `#78350f` | Text on accent backgrounds |
| `--destructive` | `oklch(0.64 0.21 25)` | `#dc2626` | Delete/error actions |
| `--border` | `oklch(0.93 0.006 265)` | `#e5e7eb` | Default borders |
| `--input` | `oklch(0.87 0.01 265)` | `#d1d5db` | Input field borders |
| `--ring` | `oklch(0.52 0.2 262)` | `#4f46e5` | Focus rings |
| `--nav` | `oklch(1 0 0 / 85%)` | `rgba(255,255,255,0.85)` | Navbar background |
| `--footer` | `oklch(0.985 0.002 247)` | `#fafafa` | Footer background |

### Dark Theme (`.dark`)

| Token | oklch Value | Approx Hex | Usage |
|---|---|---|---|
| `--background` | `oklch(0.21 0.04 266)` | `#1e1e2e` | Page background |
| `--foreground` | `oklch(0.97 0.007 248)` | `#fafafa` | Headings, primary content |
| `--card` | `oklch(0.28 0.04 260)` | `#2d2d3a` | Card surfaces |
| `--muted` | `oklch(0.32 0.04 258)` | `#3d3d4a` | Muted surfaces |
| `--muted-foreground` | `oklch(0.71 0.035 257)` | `#a1a1aa` | Labels, secondary text |
| `--border` | `oklch(0.37 0.04 257)` | `#4b4b5a` | Default borders |
| `--ring` | `oklch(0.62 0.19 260)` | `#6366f1` | Focus rings |

### Warning Tokens (both themes)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--warning-surface` | `oklch(0.987 0.022 95)` | `oklch(0.47 0.12 46 / 20%)` | Disclaimer card backgrounds |
| `--warning-border` | `oklch(0.92 0.08 90)` | `oklch(0.55 0.13 46)` | Disclaimer card borders |
| `--warning-foreground` | `oklch(0.47 0.12 46)` | `oklch(0.88 0.15 90)` | Disclaimer text |

### Hero Tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--hero-from` | `oklch(0.97 0.014 255)` | `oklch(0.21 0.04 266)` | Hero gradient start |
| `--hero-via` | `oklch(1 0 0)` | `oklch(0.28 0.04 260)` | Hero gradient middle |
| `--hero-to` | `oklch(0.979 0.021 166)` | `oklch(0.21 0.04 266)` | Hero gradient end |
| `--dot` | `oklch(0.52 0.2 262 / 12%)` | `oklch(0.62 0.19 260 / 18%)` | Hero dot pattern |

### Shadow Tokens

| Token | Light | Dark |
|---|---|---|
| `--shadow-card` | `0 1px 2px oklch(0 0 0 / 5%), 0 8px 24px -12px oklch(0.52 0.2 262 / 18%)` | `0 1px 2px oklch(0 0 0 / 30%), 0 12px 32px -16px oklch(0 0 0 / 60%)` |

---

## Radius

| Token | Value | Typical Use |
|---|---|---|
| `--radius-sm` | `calc(var(--radius) - 4px)` | Small rounded elements |
| `--radius-md` | `calc(var(--radius) - 2px)` | Inputs, buttons |
| `--radius-lg` | `var(--radius)` | Cards, dialogs |
| `--radius-xl` | `calc(var(--radius) + 4px)` | Larger surfaces |
| `--radius-2xl` | `calc(var(--radius) + 8px)` | Even larger surfaces |
| `--radius-3xl` | `calc(var(--radius) + 12px)` | Auth cards |
| `--radius-4xl` | `calc(var(--radius) + 16px)` | Full-width cards |
| `--radius` | `0.75rem` | Base radius |

---

## Spacing

Always use `gap-*`, `p-*`, `m-*` Tailwind utilities. Never use `space-x-*` or `space-y-*`.

| Scale | Tailwind | Usage |
|---|---|---|
| 4px | `gap-1` | Tight inline gaps |
| 8px | `gap-2` | Badge and tag gaps |
| 12px | `gap-3` | Form field inner gaps |
| 16px | `gap-4` | Section internal gaps |
| 20px | `gap-5` | Card padding mobile |
| 24px | `gap-6` | Between sections |
| 32px | `gap-8` | Page section gaps |

---

## Component Utilities

Defined in `src/styles.css`:

| Utility | Description |
|---|---|
| `bg-hero` | Hero section background with dot pattern and gradient |
| `shadow-card` | Card box-shadow (theme-aware) |

---

## shadcn CSS Variable Mapping

shadcn/ui components use the same CSS variables as the design system:

| shadcn Variable | Maps To | Usage |
|---|---|---|
| `--primary` / `--primary-foreground` | Indigo-600 / white | `Button variant="default"`, active nav |
| `--secondary` / `--secondary-foreground` | Emerald-500 / white | Secondary buttons |
| `--muted` / `--muted-foreground` | Gray-100 / gray-500 | Disabled states, placeholders |
| `--accent` / `--accent-foreground` | Amber-500 / amber-900 | Hover states, dropdown active rows |
| `--destructive` / `--destructive-foreground` | Red-600 / white | Delete/error actions |
| `--background` / `--foreground` | Light gray / dark slate | Page background, default text |
| `--card` / `--card-foreground` | White / dark slate | Card surfaces |
| `--popover` / `--popover-foreground` | White / dark slate | Dialog, DropdownMenu, Select popups |
| `--border` | Light gray | Default borders |
| `--input` | Gray-300 | Input field borders |
| `--ring` | Indigo-600 | Focus rings |

**Usage in components:**
```tsx
// shadcn components resolve these automatically
<Button variant="default">Uses --primary</Button>
<Button variant="destructive">Uses --destructive</Button>
<Card>Uses --card background</Card>

// Custom components use token utilities
<div className="bg-primary text-primary-foreground">…</div>
<div className="text-muted-foreground">…</div>
```

---

## Invariants

- All colors MUST use oklch format in `src/styles.css`.
- No hardcoded hex values in `.tsx` files — use Tailwind semantic utilities.
- No raw Tailwind color classes (`bg-blue-500`, `text-gray-600`) — use semantic tokens.
- Never use `text-white` / `bg-white` — use `text-foreground`, `bg-card`, or tokens.
- Use `gap-*` for rhythm — never `space-x-*` / `space-y-*`.
- Use `size-*` when width and height are equal — never `w-10 h-10`.
- All borders use `--border` utility (`border-border`).
- Dark mode via `class` strategy; `<html class="dark">` when active.
