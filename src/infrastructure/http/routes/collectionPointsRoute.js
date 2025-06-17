import express from 'express'
import { validateToken } from '../../../middlewares/authMiddleware.js'
import { validateRequest } from '../../../middlewares/validateRequestMiddleware.js'
import {
    collectionPointsSchema,
    collectionPointsSchemaEdit,
    collectionPointUUIDSchema,
    collectionPointsListSchema
} from '../../../validationsSchema/collectionPointsSchema.js'
import {
    handleCreateCollectionPoint,
    handleDeleteCollectionPoint,
    // handleEditCollectionPoint,
    handleGetAllCollectionPoints,
    handleGetCollectionPointById,
    // handleValidateCollectionPoint
} from '../controllers/collectionPointsController.js'

const router = express.Router()

router.post('/create', validateToken, validateRequest(collectionPointsSchema), handleCreateCollectionPoint);
router.get('/list', validateToken, validateRequest(collectionPointsListSchema), handleGetAllCollectionPoints);
router.get('/detail/:id', validateToken, validateRequest(collectionPointUUIDSchema, 'params'), handleGetCollectionPointById);
// router.put('/update/:id', validateToken, validateRequest(collectionPointsSchemaEdit, 'body'), handleEditCollectionPoint);
router.delete('/delete/:id', validateToken, validateRequest(collectionPointUUIDSchema, 'params'), handleDeleteCollectionPoint);
// router.patch('/validate/:id', validateToken, validateRequest(collectionPointUUIDSchema, 'params'), handleValidateCollectionPoint);

export default router;