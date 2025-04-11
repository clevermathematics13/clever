// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Mono } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "./supabase-provider";
import LogoutButton from "@/components/LogoutButton";

// Import Inter font with specific weights
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"], // Use valid weights for Inter (adjust as needed)
});

// Import Fira_Mono font with valid weights
const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Valid weights for Fira Mono
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
