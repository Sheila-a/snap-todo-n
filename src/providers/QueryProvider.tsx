// 'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactNode, useState } from 'react';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// export default function QueryProvider({ children }: { children: ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// }
'use client';

import { ReactNode, useState } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import localforage from 'localforage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { queryClient } from '@/lib/queryClient';

export const persister = createAsyncStoragePersister({
  storage: localforage.createInstance({
    name: 'nextjs-cache',
    storeName: 'react-query',
  }),
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  // Only render PersistQueryClientProvider on client
  if (!hasMounted) {
    if (typeof window !== 'undefined') {
      setHasMounted(true);
    }
    return null;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }} // 24 hours
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
