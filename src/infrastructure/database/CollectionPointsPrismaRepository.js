import { PrismaClient } from "../../../generated/client/index.js";
import CollectionPointsRepository from "../../domain/ports/CollectionPointsRepository.js";

export const prisma = new PrismaClient();

export default class CollectionPointsPrismaRepository extends CollectionPointsRepository {
  async create(dto) {
    try {
      const createdCollectionPoint = await prisma.colectionPoints.create({
        data: {
          ...dto,
          userId: dto.userId,
        },
      });
      return createdCollectionPoint;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByAddress(address) {
    try {
      return await prisma.colectionPoints.findFirst({
        where: { address },
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
