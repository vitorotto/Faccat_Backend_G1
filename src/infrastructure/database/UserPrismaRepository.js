import { prisma } from "./prisma.js";
import UserRepository from "../../domain/ports/UserRepository.js";
import { decodePassword, encodePassword } from "../../utils/bcrypt.js";

export default class UserPrismaRepository extends UserRepository {
  async create({ name, email, password }) {
    const hashedPassword = encodePassword(password);
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return createdUser;
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async login(email, password) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error("O usuário não foi encontrado");
    }

    const isPasswordvalid = decodePassword(user.password, password);

    if (!isPasswordvalid) {
      throw new Error("Senha invalida.");
    }

    return user;
  }

  async edit(userId, userData) {
    const existingUser = await this.findById(userId);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    const updateData = {};
    if (userData.name) updateData.name = userData.name;
    if (userData.password) updateData.password = encodePassword(userData.password);
    
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await this.findByEmail(userData.email);
      if (emailExists && emailExists.id !== userId) {
        throw new Error("Email já está em uso");
      }
      updateData.email = userData.email;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    return updatedUser;
  }

  async findById(userId) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

}