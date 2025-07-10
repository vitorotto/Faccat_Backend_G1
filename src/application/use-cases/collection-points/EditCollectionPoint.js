import { ConflictError } from "../../../errors/HttpErrors.js";

export default function makeEditCollectionPoint(collectionRepository) {
  return async function editCollectionPoint({data, userId, collectionId}) {
    const existingCollectionPoint = await collectionRepository.findById(collectionId);
    if (!existingCollectionPoint) {
      throw new ConflictError("Ponto de coleta não encontrado com o id fornecido.");
    }

    const editCollectionPoint = await collectionRepository.edit({data, userId, collectionId});
    return editCollectionPoint;
  };
}