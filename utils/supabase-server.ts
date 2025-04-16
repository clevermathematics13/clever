// utils/supabase-server.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

/**
 * Returns a Supabase client configured to read/write the
 * secure auth cookies on the server.
 */
export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  )

  
