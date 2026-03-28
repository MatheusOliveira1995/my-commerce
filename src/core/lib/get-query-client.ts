import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { queryClientConfig } from "@/core/lib/query-client-config";

const getQueryClient = cache(() => new QueryClient(queryClientConfig));

export default getQueryClient;
