'use client';

import { useEffect, useState } from 'react';

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Until mounted (i.e. on client) return nothing
  if (!mounted) return null;
  
  return <>{children}</>;
}
