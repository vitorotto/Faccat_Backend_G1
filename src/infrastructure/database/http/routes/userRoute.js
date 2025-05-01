// userRoutes.js
import express from 'express'

const router = express.Router();
const { createUser } = require('../controllers/userController');

router.get('/users', getUsers);
router.post('create/', createUser)