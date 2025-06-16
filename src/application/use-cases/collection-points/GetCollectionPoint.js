import { NotFoundError } from "../../../errors/HttpErrors.js";

export default function makeGetCollectionPoint(collectionRepository) {
  return async function getCollectionPoint(id) {
    const collectionPoint = await collectionRepository.findById(id);
    
    if (!collectionPoint) {
      throw new NotFoundError("Ponto de coleta não encontrado");
    }

    const { 
      userId: _,
      ...collectionPointData 
    } = collectionPoint;

    return collectionPointData;
  };
}
