import { IProductResponse, ICreateProductRequest, IUpdateProductRequest } from '../interfaces/IProduct';
import { Product } from '../entities/Product';

export class ProductDTO {
    static toResponse(product: Product): IProductResponse {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            isAvailable: product.isAvailable,
            imageUrl: product.imageUrl,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }

    static toResponseList(products: Product[]): IProductResponse[] {
        return products.map(product => this.toResponse(product));
    }

    static toEntity(dto: ICreateProductRequest): Product {
        const product = new Product();
        product.name = dto.name;
        product.description = dto.description || '';
        product.price = dto.price;
        product.category = dto.category;
        product.isAvailable = dto.isAvailable !== undefined ? dto.isAvailable : true;
        product.imageUrl = dto.imageUrl || null;
        return product;
    }

    static toUpdateEntity(entity: Product, dto: IUpdateProductRequest): Product {
        if (dto.name !== undefined) entity.name = dto.name;
        if (dto.description !== undefined) entity.description = dto.description;
        if (dto.price !== undefined) entity.price = dto.price;
        if (dto.category !== undefined) entity.category = dto.category;
        if (dto.isAvailable !== undefined) entity.isAvailable = dto.isAvailable;
        if (dto.imageUrl !== undefined) entity.imageUrl = dto.imageUrl;
        return entity;
    }
}
