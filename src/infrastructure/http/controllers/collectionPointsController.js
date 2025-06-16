import makeCreateCollectionPoint from "../../../application/use-cases/collection-points/CreateCollectionPoint.js";
import { CollectionPointDTO } from '../../../domain/dtos/CollectionPointDTO.js';
import CollectionPointsPrismaRepository from '../../database/CollectionPointsPrismaRepository.js';

const repository = new CollectionPointsPrismaRepository();

export const handleCreateCollectionPoint = async (req, res) => {
    try {
        const collectionPointData = {
            ...req.validatedData,
            userId: req.userId
        };
        
        const collectionPointDTO = new CollectionPointDTO(collectionPointData);
        const createCollectionPointUseCase = makeCreateCollectionPoint(repository);
        const collectionPoint = await createCollectionPointUseCase(collectionPointDTO);

        return res.status(201).json({ code: 201, message: `Ponto ${collectionPoint.name} criado com sucesso`});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error interno no servidor" });
    }
};
