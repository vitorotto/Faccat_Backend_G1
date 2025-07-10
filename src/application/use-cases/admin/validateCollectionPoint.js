import { NotFoundError } from "../../../errors/HttpErrors.js";

export default function makeValidateCollectionPoint(adminRepository) {
  return async function validateCollectionPoint(id) {
    const validated = await adminRepository.validateCollectionPoint(id)
      .catch(() => {
        throw new NotFoundError('Ponto de coleta não encontrado ou já foi validado');
      });

    return validated;
  };
}