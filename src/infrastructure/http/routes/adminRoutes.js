import express from 'express';
import { validateToken } from '../../../middlewares/authMiddleware.js';
import { validateRequest } from '../../../middlewares/validateRequestMiddleware.js';
import { authorizeRole } from '../../../middlewares/authorizeRoleMiddleware.js';
import { collectionPointUUIDSchema } from '../../../validationsSchema/collectionPointsSchema.js';
import { handleValidateCollectionPoint } from '../controllers/adminController.js'

const router = express.Router()

router.post('/validateCollections', validateToken, validateRequest(collectionPointUUIDSchema, 'query'), authorizeRole(['ADMIN']), handleValidateCollectionPoint);

export default router;