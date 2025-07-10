import { ConflictError, UnauthorizedError } from "../../../errors/HttpErrors.js";

export default function makeEditCollectionPoint(collectionRepository) {
  return async function editCollectionPoint({data, userId, collectionId}) {
    const existingCollectionPoint = await collectionRepository.findById(collectionId);
    
    if (!existingCollectionPoint) {
      throw new ConflictError("Ponto de coleta não encontrado com o id fornecido.");
    }

    if (existingCollectionPoint.userId !== userId) {
      throw new UnauthorizedError("Você não tem permissão para editar este ponto de coleta.");
    }

    const editCollectionPoint = await collectionRepository.edit({data, userId, collectionId});
    const { userId: _, ...editData } = editCollectionPoint;
    return editData;
  };
}