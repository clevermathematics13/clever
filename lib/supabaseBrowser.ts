import { createBrowserClient } from '@supabase/ssr'

// This runs ONCE when the file is first imported.
export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
