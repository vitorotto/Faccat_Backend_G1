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

  async listAllValidated({ cursor, limit, latitude, longitude, radius, types }) {
    try {
      const query = {
        where: {
          validated: false,
          ...(types && types.length > 0 ? { types: { hasEvery: types } } : {})
        },
        orderBy: {
          createdAt: 'desc'
        }
      };

      if (cursor) {
        query.skip = 1;
        query.cursor = { id: cursor };
      }

      let points = await prisma.colectionPoints.findMany(query);

      if (latitude && longitude && radius) {
        points = points.filter(p => {
          const dist = this.haversine(
            parseFloat(latitude),
            parseFloat(longitude),
            parseFloat(p.latitude),
            parseFloat(p.longitude)
          );
          return dist <= radius;
        });
      }

      return points.slice(0, limit);
    } finally {
      await prisma.$disconnect();
    }
  }

  async listAllNonValidated({ cursor, limit, latitude, longitude, radius, types }) {
    try {
      const query = {
        take: limit,
        where: {
          validated: false,
          ...(types && types.length > 0 ? { types: { hasEvery: types } } : {})
        },
        orderBy: {
          createdAt: 'desc'
        }
      };

      if (cursor) {
        query.skip = 1;
        query.cursor = { id: cursor };
      }

      let points = await prisma.colectionPoints.findMany(query);

      if (latitude && longitude && radius) {
        points = points.filter(p => {
          const dist = this.haversine(
            parseFloat(latitude),
            parseFloat(longitude),
            parseFloat(p.latitude),
            parseFloat(p.longitude)
          );
          return dist <= radius;
        });
      }

      return points;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByUserId(userId) {
    try {
      const userCollections = prisma.colectionPoints.findMany({
        where: {
          userId: userId,
        }
      })
      return userCollections
    } finally {
      await prisma.$disconnect()
    }
  }

  /**
   * @private 
   */
  haversine(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
