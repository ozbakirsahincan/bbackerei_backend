import { Request, Response } from 'express';
import { getProductService } from '../services/product.service';
import { asyncHandler } from '../middlewares/errors/async.handler';
import { ProductCategory } from '../enums/ProductCategory';

export class ProductController {
    private static instance: ProductController;

    private constructor() {}

    public static getInstance(): ProductController {
        if (!ProductController.instance) {
            ProductController.instance = new ProductController();
        }
        return ProductController.instance;
    }

    getAllProducts = asyncHandler(async (req: Request, res: Response) => {
        const products = await getProductService().getAllProducts();
        res.status(200).json(products);
    });

    getProductById = asyncHandler(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const product = await getProductService().getProductById(id);
        res.status(200).json(product);
    });

    getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
        const categoryParam = req.params.category;

        // Kategori parametre kontrolü
        if (!Object.values(ProductCategory).includes(categoryParam as ProductCategory)) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: `Geçersiz kategori. Geçerli kategoriler: ${Object.values(ProductCategory).join(', ')}`
                }
            });
        }

        const products = await getProductService().getProductsByCategory(categoryParam as ProductCategory);
        res.status(200).json(products);
    });

    getProductsWithFilters = asyncHandler(async (req: Request, res: Response) => {
        const filters = {
            category: req.query.category as ProductCategory,
            isAvailable: req.query.isAvailable === 'true',
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined
        };

        const products = await getProductService().getProductsWithFilters(filters);
        res.status(200).json(products);
    });

    createProduct = asyncHandler(async (req: Request, res: Response) => {
        const newProduct = await getProductService().createProduct(req.body);
        res.status(201).json(newProduct);
    });

    updateProduct = asyncHandler(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const updatedProduct = await getProductService().updateProduct(id, req.body);
        res.status(200).json(updatedProduct);
    });

    deleteProduct = asyncHandler(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = await getProductService().deleteProduct(id);
        res.status(200).json(result);
    });
}

// Singleton instance oluşturmak için export edilen fonksiyon
export const getProductController = () => ProductController.getInstance();
