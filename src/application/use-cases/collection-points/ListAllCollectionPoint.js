import { NotFoundError } from "../../../errors/HttpErrors.js";

export default function makeGetAllCollectionPoint(collectionRepository) {
  return async function getAllCollectionPoint(filters) {
    const collectionPoints = await collectionRepository.listAllValidated(filters);

    if (!collectionPoints || collectionPoints.length === 0) {
      throw new NotFoundError("Pontos de coleta não encontrados");
    }

    return collectionPoints.map(({ userId, ...rest }) => rest);
  };
}