import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
