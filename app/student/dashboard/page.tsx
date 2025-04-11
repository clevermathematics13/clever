"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";

export default function StudentDashboard() {
  const { session } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    // If no active session, redirect to login page
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  // If session exists, render the dashboard content
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {/* Insert more dashboard content/components here */}
    </div>
  );
}
