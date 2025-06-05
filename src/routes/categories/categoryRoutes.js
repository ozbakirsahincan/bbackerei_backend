import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../controllers/categories/categoryController.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
// src/routes/categories/categoryRoutes.js
// Bu dosya, kategori ile ilgili tüm rotaları içerir.
// Kategori ile ilgili CRUD işlemleri için gerekli rotaları tanımlar.
// Bu rotalar, kategori verilerini almak, oluşturmak, güncellemek ve silmek için kullanılır.