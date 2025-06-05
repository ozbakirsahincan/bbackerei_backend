// src/routes/health/healthCheckRoutes.js

import { Router } from 'express';
import {healthCheck} from '../../controllers/health/healthController.js';

const router = Router();
// Health check route
router.get('/', healthCheck);

export default router;