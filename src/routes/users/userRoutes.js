// src/routes/users/userRoutes.js
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles
} from '../../controllers/users/userController.js';
import { authenticateToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.use(authenticateToken); // tüm /users altı token ister

router.get('/', getAllUsers);
router.get('/roles', getRoles);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
// Bu kod, kullanıcı işlemleri için bir Express.js yönlendiricisi tanımlar.
// Tüm kullanıcıları listeleme, belirli bir kullanıcıyı alma, yeni kullanıcı oluşturma,
// kullanıcı güncelleme ve silme işlemlerini içerir.
// Ayrıca, tüm bu işlemler için JWT tabanlı kimlik doğrulama gerektirir.