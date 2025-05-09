// userRoutes.js
import express from 'express';
import { handleCreateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', handleCreateUser);

export default router;