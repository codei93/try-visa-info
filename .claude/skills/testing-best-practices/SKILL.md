---
name: testing-best-practices
description: "Use for test design, coverage, assertions, and frontend testing patterns."
license: MIT
metadata:
  author: local
---

# Testing Best Practices

Use this skill when designing, writing, or reviewing tests for the DutyPricing frontend (Next.js 16 + React 19).

## Scope

- Test design patterns for React components, hooks, and Next.js pages
- Coverage goals and thresholds
- Assertion patterns and best practices
- Frontend testing tools: Vitest, React Testing Library, Playwright

## When to Invoke

Trigger when the user's message includes:
- "test", "testing", "tests", "vitest", "playwright", "testing-library"
- "coverage", "assert", "assertion", "mock", "spy"
- "unit test", "component test", "e2e test", "integration test"
- Any request to write tests for Next.js pages, React components, or custom hooks

## Frontend Testing Patterns

### Unit Tests (Vitest + React Testing Library)

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    const onClick = vi.fn()
    render(<ComponentName onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

### Rules

1. **One behavior per test** — each `it()` block tests exactly one thing
2. **Test through user-facing behavior** — query by role, label, or text, not implementation details
3. **Mock external dependencies** — mock Supabase, TanStack Query, `fetch`, etc. at the module boundary
4. **Clean up between tests** — use `vi.clearAllMocks()` or `vi.resetAllMocks()` in `beforeEach`
5. **Coverage target** — aim for 80%+ line coverage on critical paths (calculator, data layer, i18n)
6. **No implementation details** — avoid testing internal state, private methods, or component structure

### Next.js Specific

- Test Server Components separately from Client Components
- Mock `next/navigation` (`useRouter`, `usePathname`) when testing pages
- Test data fetching with mocked `getQueryClient()` and `dehydrate`/`HydrationBoundary` patterns
- Test i18n by providing mock dictionary values via `getDictionary()` or `useTranslations()`

### Do Nots

- Don't test third-party library internals (Supabase, TanStack Query, shadcn/ui)
- Don't write tests that depend on specific DOM class names
- Don't skip `waitFor` for async state updates
- Don't leave `console.error` or `console.warn` unchecked in test output