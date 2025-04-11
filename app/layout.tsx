// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "./supabase-provider";
import LogoutButton from "@/components/LogoutButton"; // Import the new LogoutButton component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CleverMathematics",
  description: "Educational platform for teachers and students",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="bg-gray-100 px-6 py-4 shadow flex items-center justify-between text-sm">
          <div className="flex gap-4 items-center">
            <a href="/" className="text-blue-600 font-bold hover:underline">🏠 Home</a>
            <a href="/profiles" className="text-blue-600 hover:underline">👥 Profiles</a>
          </div>
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
