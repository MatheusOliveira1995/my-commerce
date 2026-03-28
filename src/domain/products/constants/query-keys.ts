export const PRODUCT_QUERY_KEYS = {
  all: ["products"] as const,
  page: (page: number, perPage: number) =>
    ["products", "page", page, perPage] as const,
  detail: (id: number) => ["products", id] as const,
};
