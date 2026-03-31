import httpClient from "@/core/lib/http-client";
import { Product, ProductsPageResult } from "@/domain/products/models/product";
import {
  PRODUCT_ENDPOINTS,
  PRODUCTS_PER_PAGE,
} from "@/domain/products/constants";
import { IProductRepository } from "./product-repository.interface";

interface ProductApiDto {
  _id: number;
  title?: string;
  isNew?: boolean;
  oldPrice?: string;
  price?: number;
  discountedPrice?: number;
  description?: string;
  category?: string;
  type?: string;
  brand?: string;
  size?: Array<string>;
  image?: string;
  rating?: number;
  stock?: number;
}

interface ProductListApiResponseDto {
  data: Array<ProductApiDto>;
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

const toNumber = (value: unknown, fallback: number): number => {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
};

const toString = (value: unknown): string => {
  return typeof value === "string" ? value : "";
};

export class ProductHttpRepository implements IProductRepository {
  private mapDtoToProduct(dto: ProductApiDto): Product {
    return {
      id: toNumber(dto._id, 0),
      title: toString(dto.title),
      price: toNumber(dto.price, 0),
      description: toString(dto.description),
      category: toString(dto.category),
      image: toString(dto.image),
      rating: {
        rate: toNumber(dto.rating, 0),
        count: toNumber(dto.stock, 0),
      },
    };
  }

  private getProductsFromPayload(
    payload: ProductListApiResponseDto,
  ): Array<ProductApiDto> {
    return Array.isArray(payload.data) ? payload.data : [];
  }

  private mapDtoListToProducts(dtos: Array<ProductApiDto>): Array<Product> {
    return dtos.map((dto) => this.mapDtoToProduct(dto));
  }

  async getPage(
    page: number,
    perPage: number = PRODUCTS_PER_PAGE,
  ): Promise<ProductsPageResult> {
    const data = await httpClient
      .get<ProductListApiResponseDto>(PRODUCT_ENDPOINTS.list, {
        params: { page, perPage },
      })
      .then((response) => {
        const products = this.getProductsFromPayload(response.data);
        const mappedProducts = this.mapDtoListToProducts(products);
        return {
          items: mappedProducts,
          page: toNumber(response.data.currentPage, 0),
          totalItems: toNumber(response.data.totalProducts, 0),
          totalPages: toNumber(response.data.totalPages, 0),
          perPage: toNumber(response.data.perPage, 0),
        };
      });

    return data;
  }

  async getById(id: number): Promise<Product> {
    const { data } = await httpClient.get<ProductApiDto>(
      PRODUCT_ENDPOINTS.detail(id),
    );
    return this.mapDtoToProduct(data);
  }
}

export const productRepository = new ProductHttpRepository();
