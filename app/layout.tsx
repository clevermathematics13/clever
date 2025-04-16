// app/layout.tsx
import "./globals.css"
import type { ReactNode } from "react"
import Link from "next/link"
import { supabaseServer } from "@/utils/supabase-server"     // ⬅️ add this import

export const metadata = {
  title: "CleverMathematics",
  description: "PDF assignments for students",
}

/**
 * Root layout (Server Component).
 * It checks the Supabase session on every request and
 *   – shows the user's email + Logout button if logged in
 *   – shows a Login link if not.
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  // ─── 1. get the current session on the server ──────────────────────────────
  const { data } = await supabaseServer().auth.getSession()
  const user = data.session?.user

  // ─── 2. render the layout ──────────────────────────────────────────────────
  return (
    <html lang="en">
      <body className="p-6">
        <header className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-xl font-bold">
            📘 CleverMathematics
          </Link>

          {/* push everything else to the right */}
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                {/* show who is logged in */}
                <span className="text-sm text-gray-600">
                  Signed in as <b>{user.email}</b>
                </span>

                {/* Logout POST form (no client JS needed) */}
                <form action="/auth/signout" method="post">
                  <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </header>

        {children}
      </body>
    </html>
  )
}
