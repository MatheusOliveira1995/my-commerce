import { Product, ProductsPageResult } from "@/domain/products/models/product";

export interface IProductRepository {
  getAll(): Promise<Array<Product>>;
  getPage(page: number, perPage: number): Promise<ProductsPageResult>;
  getById(id: number): Promise<Product>;
}
