import express from 'express';
import { getAllProducts } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Tüm ürünleri getir
router.get('/', getAllProducts);

export const productRoutes = router;