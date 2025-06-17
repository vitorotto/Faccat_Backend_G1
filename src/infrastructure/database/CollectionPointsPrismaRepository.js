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

  async findById(id) {
    try {
      return await prisma.colectionPoints.findUnique({
        where: {
          id: id,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteById(id) {
    try {
      return await prisma.colectionPoints.delete({
        where: {
          id: id,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  }

  async listAll(limite) {
    try {
      const list = await prisma.colectionPoints.findMany({
        where: {
          validated: true,
        }
      })
      return list;
    } finally {
      await prisma.$disconnect()
    }
  }
}
