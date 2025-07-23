import { Router } from 'express';
import { validateToken } from '../../../middlewares/authMiddleware.js';
import { validateRequest } from '../../../middlewares/validateRequestMiddleware.js';
import { createDiscartTask, getDiscartTasks, updateDiscartTask, deleteDiscartTask } from '../../controllers/discartTasksController.js';

const discartTasksRoutes = Router();

discartTasksRoutes.post('/create', validateToken, createDiscartTask);
discartTasksRoutes.get('/list', getDiscartTasks);
discartTasksRoutes.put('/update/:id', updateDiscartTask);
discartTasksRoutes.delete('/delete/:id', deleteDiscartTask);

export default discartTasksRoutes;


