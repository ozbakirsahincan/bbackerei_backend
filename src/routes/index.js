// src/routes/index.js
import { Router } from 'express';
import userRoutes from './users/userRoutes.js';
import authRoutes from './auth/authRoutes.js';
import categoryRoutes from './categories/categoryRoutes.js';
import productRoutes from './products/productRoutes.js'; 
import healthRoutes from './health/healthCheckRoutes.js';

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/health', healthRoutes); // ✅ buraya app değil, router kullanılır

export default router;
