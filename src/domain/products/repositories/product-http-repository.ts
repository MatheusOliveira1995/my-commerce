import httpClient from "@/core/lib/http-client";
import { Product } from "@/domain/products/models/product";
import { PRODUCT_ENDPOINTS } from "@/domain/products/constants";
import { IProductRepository } from "./product-repository.interface";

export class ProductHttpRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const { data } = await httpClient.get<Array<Product>>(
      PRODUCT_ENDPOINTS.list,
    );
    return data;
  }

  async getById(id: number): Promise<Product> {
    const { data } = await httpClient.get<Product>(
      PRODUCT_ENDPOINTS.detail(id),
    );
    return data;
  }
}

export const productRepository = new ProductHttpRepository();
