import { prisma } from "./prisma.js";
import AdminRepository from "../../domain/ports/AdminRepository.js";

export default class AdminPrismaRepository extends AdminRepository{
    async validateCollectionPoint(id){
        const validated = await prisma.colectionPoints.update({
            where: {
                id: id,
                validated: false,
            },
            data: {
                validated: true,
                updatedAt: new Date()
            }
        })
        return validated
    }
}