// app/layout.tsx
import "./globals.css"
import type { ReactNode } from "react"
import LogoutButton from "@/components/LogoutButton"
import Link from "next/link"

export const metadata = {
  title: "CleverMathematics",
  description: "PDF assignments for students",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">
            <Link href="/">📘 CleverMathematics</Link>
          </div>
          <LogoutButton />
        </header>
        {children}
      </body>
    </html>
  )
}
