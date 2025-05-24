import {ProductCategory } from "../enums/ProductCategory";
import { ICreateProductRequest, IUpdateProductRequest, IProductFilter } from "../interfaces/IProduct";
import { ProductDTO } from "../dtos/product.dto";
import { getProductRepository } from "../repositories/products/product.repo";
import { NotFoundError } from "../middlewares/errors/error.types";

export class ProductService {
    private static instance: ProductService;

    private constructor() {}

    public static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    async getAllProducts() {
        const products = await getProductRepository().findAll();
        return ProductDTO.toResponseList(products);
    }

    async getProductById(id: number) {
        const product = await getProductRepository().findById(id);
        if (!product) {
            throw new NotFoundError(`ID: ${id} olan ürün bulunamadı`);
        }
        return ProductDTO.toResponse(product);
    }

    async getProductsByCategory(category: ProductCategory) {
        const products = await getProductRepository().findByCategory(category);
        return ProductDTO.toResponseList(products);
    }

    async getProductsWithFilters(filters: IProductFilter) {
        const products = await getProductRepository().findWithFilters(filters);
        return ProductDTO.toResponseList(products);
    }

    async createProduct(productData: ICreateProductRequest) {
        const productEntity = ProductDTO.toEntity(productData);
        const savedProduct = await getProductRepository().create(productEntity);
        return ProductDTO.toResponse(savedProduct);
    }

    async updateProduct(id: number, productData: IUpdateProductRequest) {
        const existingProduct = await getProductRepository().findById(id);
        if (!existingProduct) {
            throw new NotFoundError(`ID: ${id} olan ürün bulunamadı`);
        }

        const updatedProductEntity = ProductDTO.toUpdateEntity(existingProduct, productData);
        const updatedProduct = await getProductRepository().update(id, updatedProductEntity);
        return ProductDTO.toResponse(updatedProduct);
    }

    async deleteProduct(id: number) {
        const productExists = await getProductRepository().findById(id);
        if (!productExists) {
            throw new NotFoundError(`ID: ${id} olan ürün bulunamadı`);
        }

        const isDeleted = await getProductRepository().delete(id);
        if (!isDeleted) {
            throw new Error(`ID: ${id} olan ürün silinirken bir hata oluştu`);
        }

        return { message: 'Ürün başarıyla silindi' };
    }
}

// Singleton instance oluşturmak için export edilen fonksiyon
export const getProductService = () => ProductService.getInstance();
