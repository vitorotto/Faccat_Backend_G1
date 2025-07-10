import AdminPrismaRepository from "../../database/AdminPrismaRepository.js"
import makeValidateCollectionPoint from "../../../application/use-cases/admin/validateCollectionPoint.js"

const repository = new AdminPrismaRepository()

export const handleValidateCollectionPoint = async (req, res, next) => {
    try {
        const { id } = req.validatedData

        const validateCollectionPointUseCase = makeValidateCollectionPoint(repository)
        await validateCollectionPointUseCase(id)

        res.status(200).json({ code: 200, message: "Ponto de coleta validado com sucesso"})
    } catch (err) {
        next(err)
    }
}