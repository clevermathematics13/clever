// app/student/dashboard/page.tsx
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export default async function StudentDashboard() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {
          // You can implement this later if needed
        },
        remove() {
          // You can implement this later if needed
        }
      }
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>You must be logged in to view this page.</p>
      </main>
    )
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p>Welcome to your dashboard, {session.user.email}!</p>
    </main>
  )
}
