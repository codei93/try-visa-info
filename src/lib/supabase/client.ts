import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase browser client for Client Components.
 *
 * Reserved for future client-side interactivity (e.g., user-specific data,
 * auth). Currently not used by any page — all data fetching happens in
 * Server Components via `src/lib/supabase/server.ts`.
 *
 * Only `NEXT_PUBLIC_*` keys are used here, which are safe to expose to the browser.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
