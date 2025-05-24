import { BaseRepository } from "../base.repository.impl";
import { Product } from "../../entities/Product";
import { ProductCategory } from "../../enums/ProductCategory";
import { IProductFilter } from "../../interfaces/IProduct";
import { IProductRepository } from "./product.repo.interface";
import { AppDataSource } from "../../config/data-source";

export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
    private static instance: ProductRepository;

    private constructor() {
        super(Product, AppDataSource);
    }

    public static getInstance(): ProductRepository {
        if (!ProductRepository.instance) {
            ProductRepository.instance = new ProductRepository();
        }
        return ProductRepository.instance;
    }

    async findByCategory(category: ProductCategory): Promise<Product[]> {
        return this.repository.find({ where: { category } });
    }

    async findWithFilters(filters: IProductFilter): Promise<Product[]> {
        const queryBuilder = this.repository.createQueryBuilder("product");

        if (filters.category) {
            queryBuilder.andWhere("product.category = :category", { category: filters.category });
        }

        if (filters.isAvailable !== undefined) {
            queryBuilder.andWhere("product.isAvailable = :isAvailable", { isAvailable: filters.isAvailable });
        }

        if (filters.minPrice !== undefined) {
            queryBuilder.andWhere("product.price >= :minPrice", { minPrice: filters.minPrice });
        }

        if (filters.maxPrice !== undefined) {
            queryBuilder.andWhere("product.price <= :maxPrice", { maxPrice: filters.maxPrice });
        }

        return queryBuilder.getMany();
    }
}

// Singleton instance oluşturmak için export edilen fonksiyon
export const getProductRepository = () => ProductRepository.getInstance();
