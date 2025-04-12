"use client"

import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export default function LogoutButton() {
  const router = useRouter()
  const supabase = supabaseBrowser

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error("Error signing out:", error.message)
    router.refresh()
    router.push("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  )
}
