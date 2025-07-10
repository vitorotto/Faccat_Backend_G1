import { prisma } from "./prisma.js";
import CollectionPointsRepository from "../../domain/ports/CollectionPointsRepository.js";

export default class CollectionPointsPrismaRepository extends CollectionPointsRepository {
  async create(dto) {
    const createdCollectionPoint = await prisma.colectionPoints.create({
      data: {
        ...dto,
        userId: dto.userId,
      },
    });
    return createdCollectionPoint;
  }

  async findByAddress(address) {
    return await prisma.colectionPoints.findFirst({
      where: { address },
    });
  }

  async findById(id) {
    return await prisma.colectionPoints.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteById(id) {
    return await prisma.colectionPoints.delete({
      where: {
        id: id,
      },
    });
  }

  async listAllValidated({ cursor, limit, latitude, longitude, radius, types }) {
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
  }

  async listAllNonValidated({ cursor, limit, latitude, longitude, radius, types }) {
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
  }

  async findByUserId(userId) {
    const userCollections = prisma.colectionPoints.findMany({
      where: {
        userId: userId,
      }
    })
    return userCollections
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

  async edit({data, collectionId, userId}) {
    return await prisma.colectionPoints.update({
      where: { id: collectionId, userId: userId },
      data: {
        ...data
      }
    });
  }
}
