import { ProductCategory } from "../enums/ProductCategory";

export interface IProductResponse {
    id: number;
    name: string;
    description?: string;
    price: number;
    category: ProductCategory;
    isAvailable: boolean;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateProductRequest {
    name: string;
    description?: string;
    price: number;
    category: ProductCategory;
    isAvailable?: boolean;
    imageUrl?: string;
}

export interface IUpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    category?: ProductCategory;
    isAvailable?: boolean;
    imageUrl?: string;
}

export interface IProductFilter {
    category?: ProductCategory;
    isAvailable?: boolean;
    minPrice?: number;
    maxPrice?: number;
}
