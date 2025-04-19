// utils/supabase-server.ts
import { cookies as nextCookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

/** 
 * A Supabase client for App‑Router server components 
 * that can read (but not write) your auth cookies 
 */
export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // only read cookies here—no set() or delete()
      cookies: {
        get(name: string) {
          return nextCookies().get(name)?.value
        },
        getAll() {
          return nextCookies()
            .getAll()
            .map(({ name, value }) => ({ name, value }))
        },
      },
      // disable any automatic session‑persistence or refresh
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  )
