import { Router } from 'express';
import { getProductController } from '../controllers/product.controller';

class ProductRoutes {
    public router: Router;
    private productController = getProductController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // GET /api/products - Tüm ürünleri listele
        this.router.get('/', this.productController.getAllProducts);
        
        // GET /api/products/filter - Filtrelere göre ürünleri listele
        this.router.get('/filter', this.productController.getProductsWithFilters);
        
        // GET /api/products/category/:category - Kategoriye göre ürünleri listele
        this.router.get('/category/:category', this.productController.getProductsByCategory);
        
        // GET /api/products/:id - ID'ye göre ürün getir
        this.router.get('/:id', this.productController.getProductById);
        
        // POST /api/products - Yeni ürün oluştur
        this.router.post('/', this.productController.createProduct);
        
        // PUT /api/products/:id - Ürün güncelle
        this.router.put('/:id', this.productController.updateProduct);
        
        // DELETE /api/products/:id - Ürün sil
        this.router.delete('/:id', this.productController.deleteProduct);
    }
}

export const productRoutes = new ProductRoutes();
