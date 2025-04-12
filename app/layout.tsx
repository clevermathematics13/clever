import "./globals.css"
import Header from "@/components/Header"   // ← change

import type { ReactNode } from "react"

export const metadata = {
  title: "CleverMathematics",
  description: "Educational platform",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />            {/* ← new header that auto‑switches */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
