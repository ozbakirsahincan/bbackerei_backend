import { Router } from 'express';
import { userRoutes } from '../routes/user.routes';

export class Routes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // User Routes - /api/users
        this.router.use('/api/users', userRoutes.router);


        // Buraya diğer route grupları eklenebilir
        // this.router.use('/api/auth', authRoutes.router);
        // this.router.use('/api/products', productRoutes.router);
    }

    public getRouter(): Router {
        return this.router;
    }
}

// Router instance'ı oluştur ve export et
const routes = new Routes();
export default routes.getRouter();
