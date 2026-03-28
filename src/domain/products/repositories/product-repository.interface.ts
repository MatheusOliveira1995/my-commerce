import { Product } from "@/domain/products/models/product";

export interface IProductRepository {
  getAll(): Promise<Array<Product>>;
  getById(id: number): Promise<Product>;
}
