export default function makeCreateCollectionPoint(collectionRepository) {
  return async function createCollectionPoint(collectionPointDTO) {
    const existingCollectionPoint = await collectionRepository.findByAddress(collectionPointDTO.address);
    if (existingCollectionPoint) {
      throw new Error("Ponto de coleta já registrado com este endereço.");
    }

    const newCollectionPoint = await collectionRepository.create(collectionPointDTO);
    return newCollectionPoint;
  };
}
