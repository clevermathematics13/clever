// app/student/layout.tsx
import { ReactNode } from 'react'
import { supabaseServer } from '@/utils/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export const metadata = {
  title: 'Student – CleverMathematics',
}

export default async function StudentLayout({
  children,
}: {
  children: ReactNode
}) {
  // fetch the session on the server
  const {
    data: { session },
  } = await supabaseServer().auth.getSession()

  // if not signed in, send them back to /login
  if (!session) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body className="p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">
            <Link href="/">📘 CleverMathematics</Link>
          </div>
          <LogoutButton />
        </header>
        {/* now render whichever student page they requested */}
        {children}
      </body>
    </html>
  )
}
