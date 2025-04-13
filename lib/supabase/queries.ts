// lib/supabase/queries.ts
'use client';

import { createBrowserClient } from '@supabase/ssr';

export const fetchQuestions = async () => {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data;
};
