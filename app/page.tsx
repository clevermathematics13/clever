'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Home() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('profiles').select('*')
      if (error) {
        setError(error.message)
        console.error('Supabase error:', error)
      } else {
        setProfiles(data)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Test Query</h1>

      {error && (
        <p className="text-red-500 mb-4">
          ❌ Error: {error}
        </p>
      )}

      {profiles.length > 0 ? (
        <ul className="list-disc pl-5">
          {profiles.map((profile) => (
            <li key={profile.id}>
              {JSON.stringify(profile)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading or no profiles yet...</p>
      )}
    </main>
  )
}

