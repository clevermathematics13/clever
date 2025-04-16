// utils/supabase-server.ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Server‑side Supabase client bound to the current request’s cookies.
 * Compatible with @supabase/ssr 0.6.x API.
 */
export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /* read a cookie */
        get(name: string) {
          return cookies().get(name)?.value
        },

        /* set / update a cookie */
        set(
          name: string,
          value: string,
          options?: Parameters<ReturnType<typeof cookies>["set"]>[1]
        ) {
          cookies().set(name, value, options)
        },

        /* delete a cookie */
        remove(
          name: string,
          options?: Parameters<ReturnType<typeof cookies>["delete"]>[1]
        ) {
          cookies().delete(name, options)
        },
      },
    }
  )
