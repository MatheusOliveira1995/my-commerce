"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientConfig } from "@/core/lib/query-client-config";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/core/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

export default function RootProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  );
}
