export const PRODUCT_ENDPOINTS = {
  list: "/products",
  detail: (id: number) => `/products/${id}`,
} as const;
