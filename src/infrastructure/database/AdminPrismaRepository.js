import { PrismaClient } from "../../../generated/client/index.js";
import AdminRepository from "../../domain/ports/AdminRepository.js";

const prisma = new PrismaClient()

export default class AdminPrismaRepository extends AdminRepository{
    async validateCollectionPoint(id){
        try {
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
        } finally {
            await prisma.$disconnect()
        }
    }
}