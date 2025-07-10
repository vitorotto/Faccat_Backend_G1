export default class CollectionPointsRepository {
    async create(collectionPointDTO) {
        throw new Error("Metodo 'this.create()' precisa ser implementado");
    }

    async findByAddress(address) {
        throw new Error("Metodo 'this.findByAddress()' precisa ser implementado");
    }

    async findById(id) {
        throw new Error("Metodo 'this.findById()' precisa ser implementado");
    }

    async deleteById(id) {
        throw new Error("Metodo 'this.deleteById()' precisa ser implementado");
    }

    async edit(dto, userId, collectionId) {
        throw new Error("Metodo 'this.edit()' precisa ser implementado")
    }
}