import httpClient from "@/core/lib/http-client";
import { Product, ProductsPageResult } from "@/domain/products/models/product";
import { PRODUCT_ENDPOINTS, PRODUCTS_PER_PAGE } from "@/domain/products/constants";
import { IProductRepository } from "./product-repository.interface";

export class ProductHttpRepository implements IProductRepository {
  async getAll(): Promise<Array<Product>> {
    const { data } = await httpClient.get<Array<Product>>(
      PRODUCT_ENDPOINTS.list,
    );
    return data;
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
