import { Product } from "../../entities/Product";
import { ProductCategory } from "../../enums/ProductCategory";
import { IProductFilter } from "../../interfaces/IProduct";
import { IBaseRepository } from "../base.repository";

export interface IProductRepository extends IBaseRepository<Product> {
    findByCategory(category: ProductCategory): Promise<Product[]>;
    findWithFilters(filters: IProductFilter): Promise<Product[]>;
}