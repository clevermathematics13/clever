import './globals.css'
import type { ReactNode } from 'react'
import Providers from './providers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export const metadata = {
  title: 'CleverMathematics',
  description: 'PDF assignments for students',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="p-6">
        <Providers>
          <header className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">
              <Link href="/">📘 CleverMathematics</Link>
            </div>
            <LogoutButton />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
