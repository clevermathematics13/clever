// utils/supabase-server.ts
import { cookies as nextCookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

/** server‑side Supabase client that can read/write Next.js cookies */
export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /** read a cookie */
        get(name: string) {
          return nextCookies().get(name)?.value
        },
        /** list all cookies */
        getAll() {
          return nextCookies()
            .getAll()
            .map(({ name, value }) => ({ name, value }))
        },
        /** set/update a cookie */
        set(
          name: string,
          value: string,
          options?: Parameters<(typeof nextCookies)['set']>[1]
        ) {
          nextCookies().set(name, value, options)
        },
        /** delete a cookie */
        remove(name: string, options?: Parameters<(typeof nextCookies)['delete']>[1]) {
          nextCookies().delete(name, options)
        },
      },
    }
  )
