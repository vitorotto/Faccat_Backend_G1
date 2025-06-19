import makeCreateCollectionPoint from "../../../application/use-cases/collection-points/CreateCollectionPoint.js";
import makeDeleteCollectionPoint from "../../../application/use-cases/collection-points/DeleteCollectionPoint.js";
import makeGetCollectionPoint from "../../../application/use-cases/collection-points/GetCollectionPoint.js";
import makeGetAllCollectionPoint from "../../../application/use-cases/collection-points/ListAllCollectionPoint.js";
import { CollectionPointDTO } from "../../../domain/dtos/CollectionPointDTO.js";
import CollectionPointsPrismaRepository from "../../database/CollectionPointsPrismaRepository.js";

const repository = new CollectionPointsPrismaRepository();

export const handleCreateCollectionPoint = async (req, res, next) => {
  try {
    const collectionPointData = {
      ...req.validatedData,
      userId: req.userId,
    };

    const collectionPointDTO = new CollectionPointDTO(collectionPointData);
    const createCollectionPointUseCase = makeCreateCollectionPoint(repository);
    const collectionPoint = await createCollectionPointUseCase(
      collectionPointDTO
    );

    return res.status(201).json({
      code: 201,
      message: `Ponto ${collectionPoint.name} criado com sucesso. Aguarde a validacao do ponto para utilizar`,
    });
  } catch (err) {
    next(err);
  }
};

export const handleDeleteCollectionPoint = async (req, res, next) => {
  try {
    const { id } = req.validatedData;
    const userId = req.userId;

    const deleteCollectionPointUseCase = makeDeleteCollectionPoint(repository);
    await deleteCollectionPointUseCase(id, userId);

    return res.status(200).json({
      code: 200,
      message: "Ponto de coleta deletado com sucesso",
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetCollectionPointById = async (req, res, next) => {
  try {
    const { id } = req.validatedData;

    const getCollectionPointUseCase = makeGetCollectionPoint(repository);
    const collectionPoint = await getCollectionPointUseCase(id);

    return res
      .status(200)
      .json({
        code: 200,
        message: "Ponto de coleta encontrado",
        data: collectionPoint,
      });
  } catch (err) {
    next(err);
  }
};

export const handleGetAllCollectionPoints = async (req, res, next) => {
  try {
    const { cursor, limit, latitude, longitude, radius, types } = req.validatedData;

    const getAllCollectionsPointsUseCase = makeGetAllCollectionPoint(repository);
    const collectionPoints = await getAllCollectionsPointsUseCase({ cursor, limit, latitude, longitude, radius, types });

    return res.status(200).json({ code: 200, message: "Pontos de coleta retornados com sucesso", data: collectionPoints });
  } catch (err) {
    next(err);
  }
}
