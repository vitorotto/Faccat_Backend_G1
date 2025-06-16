import { NotFoundError, UnauthorizedError } from "../../../errors/HttpErrors.js";

export default function makeDeleteCollectionPoint(collectionRepository) {
  return async function deleteCollectionPoint(id, userId) {
    const collectionPoint = await collectionRepository.findById(id);
    
    if (!collectionPoint) {
      throw new NotFoundError("Ponto de coleta não encontrado");
    }

    if (collectionPoint.userId !== userId) {
      throw new UnauthorizedError("Você não tem permissão para deletar este ponto de coleta");
    }

    await collectionRepository.deleteById(id);
  };
}
