// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Mono } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "./supabase-provider";
import LogoutButton from "@/components/LogoutButton"; // Example import

// Replace Geist with Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Replace Geist_Mono with Fira_Mono
const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CleverMathematics",
  description: "Educational platform for teachers and students",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaMono.variable} antialiased`}>
        <nav className="bg-gray-100 px-6 py-4 shadow flex items-center justify-between text-sm">
          {/* your nav links */}
          <LogoutButton />
        </nav>
        <SupabaseProvider>
          <main className="p-6">
            {children}
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
