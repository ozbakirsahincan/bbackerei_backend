import { Router } from 'express';
import { userRoutes } from '../routes/userRoutes.js';
import { productRoutes } from '../routes/productRoutes.js';
import { categoryRoutes } from '../routes/categoryRoutes.js';
// Diğer route'ları da ekleyebilirsin

export class Routes {
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.use('/api/users', userRoutes);
        this.router.use('/api/products', productRoutes);
        this.router.use('/api/categories', categoryRoutes);
        // Diğer route grupları...
    }

    getRouter() {
        return this.router;
    }
}

const routes = new Routes();
export default routes.getRouter();