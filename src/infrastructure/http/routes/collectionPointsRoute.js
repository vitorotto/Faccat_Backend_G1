import express from "express";
import { validateToken } from "../../../middlewares/authMiddleware.js";
import { validateRequest } from "../../../middlewares/validateRequestMiddleware.js";
import {
    collectionPointsSchema,
    collectionPointsSchemaEdit,
    collectionPointUUIDSchema,
    getAllCollectionsSchema,
} from "../../../validationsSchema/collectionPointsSchema.js";
import {
    handleCreateCollectionPoint,
    handleDeleteCollectionPoint,
    handleEditCollectionPoint,
    handleGetAllCollectionPoints,
    handleGetCollectionPointById,
} from "../controllers/collectionPointsController.js";

const router = express.Router();

router.post(
    "/create",
    validateToken,
    validateRequest(collectionPointsSchema),
    handleCreateCollectionPoint
);
router.get(
    "/list",
    validateToken,
    validateRequest(getAllCollectionsSchema),
    handleGetAllCollectionPoints
);
router.get(
    "/detail/:id",
    validateToken,
    validateRequest(collectionPointUUIDSchema, "params"),
    handleGetCollectionPointById
);
router.put(
    "/update/:id",
    validateToken,
    validateRequest(collectionPointUUIDSchema, "params"),
    validateRequest(collectionPointsSchemaEdit, "body"),
    handleEditCollectionPoint
);
router.delete(
    "/delete/:id",
    validateToken,
    validateRequest(collectionPointUUIDSchema, "params"),
    handleDeleteCollectionPoint
);

export default router;
