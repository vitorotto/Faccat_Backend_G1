import makeCreateCollectionPoint from "../../../application/use-cases/collection-points/CreateCollectionPoint.js";
import makeDeleteCollectionPoint from "../../../application/use-cases/collection-points/DeleteCollectionPoint.js";
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

    const deleteCollectionPointUseCase = makeDeleteCollectionPoint(repository);
    await deleteCollectionPointUseCase(id);

    return res.status(201).json({
      code: 201,
      message: `Ponto deletado com sucesso`,
    });
  } catch (err) {
    next(err);
  }
};
