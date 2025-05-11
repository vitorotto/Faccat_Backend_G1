import { encodePassword } from "../../utils/bcrypt.js";
import { PrismaClient } from "../../generated/prisma/index.js";
import { decodePassword } from '../../utils/bcrypt.js'

export const prisma = new PrismaClient();

export default class UserPrismaRepository {
  async create({ name, email, password }) {
    try {
      const hashPassword = encodePassword(password);
      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });
      return createdUser;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async loginUser(email, plainPassword) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("O usuário não foi encontrado");
    }

    const isPasswordvalid = decodePassword(user.password, plainPassword);

    if (!isPasswordvalid) {
      throw new Error("Senha invalida.");
    }

    return user
  }
}

// export function findByName(name) {
//     // todo
// }

// export function findById(id) {
//     // todo
// }
