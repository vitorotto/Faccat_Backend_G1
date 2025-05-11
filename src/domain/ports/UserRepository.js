export default class UserRepository {
  async create({ name, email, password }) {
    throw new Error("Metodo 'this.create()' precisa ser implementado");
  }

  async findByEmail(email) {
    throw new Error("Metodo 'this.findByEmail()' precisa ser implementado");
  }

  async login(email, password) {
    throw new Error("Metodo 'this.login' precisa ser implementado");
  }

  async edit(userId, userdata) {
    throw new Error("Metodo 'this.edit()' precisa ser implementado");
  }

  async findById(userId) {
    throw new Error("Metodo 'this.findById()' precisa ser implementado");
  }
}
