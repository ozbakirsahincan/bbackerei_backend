import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users - Tüm kullanıcıları getir
router.get('/', getAllUsers);

// POST /api/users - Yeni kullanıcı oluştur
router.post('/', createUser);

export const userRoutes = router;