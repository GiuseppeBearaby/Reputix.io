import { createClient } from '@supabase/supabase-js'

// Browser client (anon key) — safe to use in React components
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
)

// Server-side client (service role) — only use in server.ts / Express routes.
// Importing this in browser code will throw because the env var is not exposed.
export function createSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars')
  }
  return createClient(url, key)
}
