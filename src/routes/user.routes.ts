import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { asyncHandler } from '../middlewares/errors/error.middleware';

export class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', asyncHandler(UserController.getAllUsers));
        this.router.get('/:id', asyncHandler(UserController.getUserById));
        this.router.post('/', asyncHandler(UserController.createUser));
        this.router.put('/:id', asyncHandler(UserController.updateUser));
        this.router.delete('/:id', asyncHandler(UserController.deleteUser));
    }
}

export const userRoutes = new UserRoutes();
