"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  // Create once
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2,      // 2 minutes
        cacheTime: 1000 * 60 * 5,      // 5 minutes
        refetchOnWindowFocus: false,   // don’t refetch on tab switch
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
