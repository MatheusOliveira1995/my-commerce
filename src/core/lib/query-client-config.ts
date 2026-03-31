import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
      retry: 2,
      retryDelay: 2000,
      refetchOnWindowFocus: false,
    },
  },
};
