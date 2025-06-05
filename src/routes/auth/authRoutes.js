import { Router } from 'express';
import { login } from '../../controllers/auth/authController.js';

const router = Router();

router.post('/login', login);

export default router;
// src/routes/auth/authRoutes.js
// This file defines the routes for authentication-related operations.