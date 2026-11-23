# Read Before Anything Else

Read in this exact order before any implementation:

1. context/project-overview.md
2. context/architecture.md
3. context/ui-tokens.md
4. context/ui-rules.md
5. context/ui-registry.md
6. context/code-standards.md
7. context/library-docs.md
8. context/build-plan.md
9. context/progress-tracker.md

---

# Rules That Never Change

- Never use hardcoded hex values or raw Tailwind color classes
- Update `progress-tracker.md` and `ui-registry.md` after every feature
- Before any third party library — load its installed skill first, then read `context/library-docs.md` for project-specific rules
- If the same problem persists after one corrective prompt — stop immediately and run `/recover`

---

# Available Skills

- `infer-conventions` — use when detecting, documenting, or standardizing project conventions and coding style.
- `migrate-radix-to-base` — use when migrating React components or a shadcn project from Radix UI to Base UI.
- `shadcn` — use when adding, fixing, or composing shadcn/ui components. Covers Base UI vs Radix APIs, `cn()` styling, semantic tokens, form layout (FieldGroup/Field), and component composition rules.
- `tailwindcss-development` — invoke for Tailwind utility classes, responsive layouts, and styling UI components.
- `testing-best-practices` — use for test design, coverage, assertions, and frontend testing patterns.
- `supabase` — use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues); client libraries and SSR integrations (@supabase/supabase-js, @supabase/ssr) in Next.js, React; auth issues (login, logout, sessions, JWT, cookies); RLS; Supabase CLI; schema changes; Postgres extensions.
- `supabase-postgres-best-practices` — Postgres performance optimization and best practices from Supabase. Use when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations.
- `nextjs` — Next.js 16 App Router documentation from Context7. Covers server components, routing, data fetching, caching, and Next.js best practices.
- `tailwindcss` — Tailwind CSS documentation from Context7. Covers utility classes, v4 @theme directives, responsive layouts, and styling patterns.
- `shadcn-docs` — shadcn/ui component documentation from Context7. Covers component APIs, CLI commands, registry patterns, and Tailwind v4 configuration.
