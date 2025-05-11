import { validateRequest } from '../../../middlewares/validateRequestMiddleware.js';
import { userSchema, loginSchema } from '../../../validationsSchema/userSchema.js';
import { handleCreateUser, login } from '../controllers/userController.js';
import express from 'express'

const router = express.Router()

router.post('/create', validateRequest(userSchema), handleCreateUser);
router.post('/login', validateRequest(loginSchema), login);

export default router;