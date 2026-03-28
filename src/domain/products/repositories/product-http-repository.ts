import httpClient from "@/core/lib/http-client";
import { Product, ProductsPageResult } from "@/domain/products/models/product";
import {
  PRODUCT_ENDPOINTS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";
import { IProductRepository } from "./product-repository.interface";

const PRODUCTS_CACHE_TTL_MS = 1000 * 60 * 5;

export class ProductHttpRepository implements IProductRepository {
  private productsCache: Array<Product> | null = null;

  private productsCacheExpiresAt = 0;

  private pendingProductsRequest: Promise<Array<Product>> | null = null;

  async getAll(): Promise<Array<Product>> {
    const now = Date.now();

    if (this.productsCache && now < this.productsCacheExpiresAt) {
      return this.productsCache;
    }

    if (this.pendingProductsRequest) {
      return this.pendingProductsRequest;
    }

    this.pendingProductsRequest = httpClient
      .get<Array<Product>>(PRODUCT_ENDPOINTS.list)
      .then((response) => {
        this.productsCache = response.data;
        this.productsCacheExpiresAt = Date.now() + PRODUCTS_CACHE_TTL_MS;
        return response.data;
      })
      .finally(() => {
        this.pendingProductsRequest = null;
      });

    return this.pendingProductsRequest;
  }

  async getPage(
    page: number,
    perPage: number = PRODUCTS_PER_PAGE,
  ): Promise<ProductsPageResult> {
    const products = await this.getAll();
    const safePage = Math.max(1, page);
    const startIndex = (safePage - 1) * perPage;
    const items = products.slice(startIndex, startIndex + perPage);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      items,
      page: safePage,
      perPage,
      totalItems,
      totalPages,
    };
  }

  async getById(id: number): Promise<Product> {
    const { data } = await httpClient.get<Product>(
      PRODUCT_ENDPOINTS.detail(id),
    );
    return data;
  }
}

export const productRepository = new ProductHttpRepository();
