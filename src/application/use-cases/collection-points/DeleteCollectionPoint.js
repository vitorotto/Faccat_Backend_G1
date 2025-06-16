import { ConflictError } from "../../../errors/HttpErrors.js";

export default function makeDeleteCollectionPoint(collectionRepository) {
  return async function deleteCollectionPoint(id) {
    const existingCollectionPoint = await collectionRepository.findById(id);
    if (!existingCollectionPoint) {
      throw new ConflictError("Ponto de coleta não existe");
    }

    const newCollectionPoint = await collectionRepository.deleteById(id);
    return newCollectionPoint;
  };
}
