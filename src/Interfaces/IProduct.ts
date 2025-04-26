import { ProductCategory } from "../Entity/Products";

export interface IProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  pictureUrl: string;
}

export interface IProductInfo {
  id: string
  name: string
}