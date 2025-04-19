// app/page.tsx
import { redirect } from 'next/navigation'
import { supabaseServer } from '@/utils/supabase-server'

export default async function Home() {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession()

  if (session) {
    redirect('/student/dashboard')
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">👋 Welcome to CleverMathematics</h1>
      <p>A simple, secure platform for managing PDF‑based assignments.</p>
      <p>Log in to get started.</p>
    </main>
  )
}
