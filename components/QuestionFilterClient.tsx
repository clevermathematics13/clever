# overwrite the file in one go
cat > components/QuestionFilterClient.tsx << 'EOF'
'use client'

import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@heroicons/react/24/outline'

export default function QuestionFilterClient() {
  const supabase = useSupabaseClient()
  const [paper, setPaper] = useState<string[]>([])
  const [level, setLevel] = useState<string[]>([])
  const [section, setSection] = useState<string[]>([])
  const [sectionNumber, setSectionNumber] = useState<string[]>([])
  const [status, setStatus] = useState<string[]>([])

  const allPapers = ['Paper 1', 'Paper 2']
  const allLevels = ['Standard', 'Extended']
  const allSections = ['A', 'B']
  const allSectionNumbers = Array.from({ length: 45 }, (_, i) => {
    const major = Math.floor(i / 9) + 1
    const minor = (i % 9) + 1
    return \`\${major}.\${minor}\`
  })
  const allStatuses = ['unattempted', 'ongoing', 'finished']

  const { data: questions, error, isLoading, refetch } = useQuery(
    ['questions', { paper, level, section, sectionNumber, status }],
    async () => {
      let q = supabase.from('questions').select('*')
      if (paper.length) q = q.in('paper', paper)
      if (level.length) q = q.in('level', level)
      if (section.length) q = q.in('section', section)
      if (sectionNumber.length) q = q.in('section_number', sectionNumber)
      if (status.length) q = q.in('status', status)
      const { data, error } = await q
      if (error) throw error
      return data
    },
    { enabled: false } // only fetch when clicking generate
  )

  const toggle = (val: string, arr: string[], set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  return (
    <div className="space-y-6">
      {/* filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MultiSelect title="Paper" options={allPapers} selected={paper} setSelected={setPaper}/>
        <MultiSelect title="Level" options={allLevels} selected={level} setSelected={setLevel}/>
        <MultiSelect title="Section" options={allSections} selected={section} setSelected={setSection}/>
        <MultiSelect title="Section #" options={allSectionNumbers} selected={sectionNumber} setSelected={setSectionNumber}/>
        <MultiSelect title="Status" options={allStatuses} selected={status} setSelected={setStatus}/>
      </div>

      {/* generate button */}
      <button
        onClick={() => refetch()}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
      >
        Generate
      </button>

      {/* loading */}
      {isLoading && (
        <div className="flex items-center space-x-2">
          <Spinner className="h-6 w-6 animate-spin text-gray-600"/>
          <span>Loading…</span>
        </div>
      )}

      {/* error */}
      {error && (
        <div className="text-red-600">Error: {error.message}</div>
      )}

      {/* results */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions?.map(q => (
          <li key={q.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold mb-2">{q.title}</h2>
            <a
              href={q.pdf_url}
              target="_blank"
              rel="noopener"
              className="inline-block mt-2 px-4 py-1 bg-green-600 text-white rounded"
            >
              View PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MultiSelect({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string
  options: string[]
  selected: string[]
  setSelected: (v: string[]) => void
}) {
  return (
    <div>
      <label className="block font-medium mb-1">{title}</label>
      <div className="border rounded p-2 h-32 overflow-y-auto space-y-1">
        {options.map(opt => (
          <label key={opt} className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => setSelected(
                selected.includes(opt)
                  ? selected.filter(x => x !== opt)
                  : [...selected, opt]
              )}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}
EOF
