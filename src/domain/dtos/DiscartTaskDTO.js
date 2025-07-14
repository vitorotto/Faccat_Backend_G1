export class DiscartTaskDTO {
    constructor({
        userId,
        collectionPointId,
        description,
        status,
        createdAt = new Date(),
        updatedAt = new Date()
    }) {
        this.userId = userId;
        this.collectionPointId = collectionPointId;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}