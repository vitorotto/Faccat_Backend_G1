import { NotFoundError } from "../../../errors/HttpErrors.js";

export default function makeGetAllUserCollections(userRepository, collectionPointsRepository) {
  return async function getAllUserCollections(userId) {
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const collectionPoints = await collectionPointsRepository.findByUserId(userId);
    if (!collectionPoints || collectionPoints.length === 0) {
      throw new NotFoundError("Nenhum ponto de coleta encontrado para este usuário");
    }

    return collectionPoints.map(finalData => ({ userId, ...finalData }));
  };
}