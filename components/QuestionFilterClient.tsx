'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function QuestionFilterClient() {
  const supabase = createBrowserClient();
  const [questions, setQuestions] = useState<any[]>([]);

  const [paper, setPaper] = useState<string[]>([]);
  const [level, setLevel] = useState<string[]>([]);
  const [section, setSection] = useState<string[]>([]);
  const [sectionNumber, setSectionNumber] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);

  const allPapers = ['Paper 1', 'Paper 2'];
  const allLevels = ['Standard', 'Extended'];
  const allSections = ['A', 'B'];
  const allSectionNumbers = Array.from({ length: 5 * 9 }, (_, i) => {
    const major = Math.floor(i / 9) + 1;
    const minor = (i % 9) + 1;
    return `${major}.${minor}`;
  });
  const allStatuses = ['unattempted', 'ongoing', 'finished'];

  const toggle = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const fetchFilteredQuestions = async () => {
    let query = supabase.from('questions').select('*');

    if (paper.length > 0) query = query.in('paper', paper);
    if (level.length > 0) query = query.in('level', level);
    if (section.length > 0) query = query.in('section', section);
    if (sectionNumber.length > 0) query = query.in('section_number', sectionNumber);
    if (status.length > 0) query = query.in('status', status);

    const { data, error } = await query;

    if (!error) setQuestions(data);
    else console.error(error);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MultiSelect title="Paper" options={allPapers} selected={paper} setSelected={setPaper} />
        <MultiSelect title="Level" options={allLevels} selected={level} setSelected={setLevel} />
        <MultiSelect title="Section" options={allSections} selected={section} setSelected={setSection} />
        <MultiSelect title="Section #" options={allSectionNumbers} selected={sectionNumber} setSelected={setSectionNumber} />
        <MultiSelect title="Status" options={allStatuses} selected={status} setSelected={setStatus} />
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        onClick={fetchFilteredQuestions}
      >
        Generate
      </button>

      <ul className="mt-4 space-y-3">
        {questions.map((q) => (
          <li key={q.id}>
            <div className="font-semibold">{q.title}</div>
            <a href={q.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MultiSelect({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string;
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="block font-medium mb-1">{title}</label>
      <div className="border rounded p-2 h-32 overflow-y-scroll">
        {options.map((opt) => (
          <label key={opt} className="block text-sm">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => {
                setSelected(
                  selected.includes(opt)
                    ? selected.filter((x) => x !== opt)
                    : [...selected, opt]
                );
              }}
            />{' '}
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
