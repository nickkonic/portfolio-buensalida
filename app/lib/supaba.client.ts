import { createBrowserClient } from "@supabase/ssr";

/**
 * Returns a singleton Supabase browser client.
 * Safe to call from Client Components — only one instance is ever created.
 *
 * Required environment variables (add to .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
