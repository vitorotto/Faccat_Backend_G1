import { NotFoundError } from "../../../errors/HttpErrors.js";

export default function makeGetAllCollectionPoint(collectionRepository) {
  return async function getAllCollectionPoint({ limit, skip }) {
    const collectionPoint = await collectionRepository.listAll({ limit, skip });
    
    if (!collectionPoint) {
      throw new NotFoundError("Pontos de coleta não encontrados");
    }

    const { 
      userId: _,
      ...collectionPointData 
    } = collectionPoint;

    return collectionPointData;
  };
}
