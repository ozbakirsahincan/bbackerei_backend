import express from 'express';
import { getAllCategories } from '../controllers/categoryController.js';

const router = express.Router();

// GET /api/categories - Tüm kategorileri getir
router.get('/', getAllCategories);

export const categoryRoutes = router;