import { validateToken } from '../../../middlewares/authMiddleware.js';
import { validateRequest } from '../../../middlewares/validateRequestMiddleware.js';
import { userSchema, loginSchema, editSchema } from '../../../validationsSchema/userSchema.js';
import { handleCreateUser, handleEditUser, handleLogin } from '../controllers/userController.js';
import express from 'express'

const router = express.Router()

router.post('/create', validateRequest(userSchema), handleCreateUser);
router.post('/login', validateRequest(loginSchema), handleLogin);
router.put('/edit', validateToken, validateRequest(editSchema), handleEditUser)

export default router;