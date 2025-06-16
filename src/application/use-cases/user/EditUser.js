import { NotFoundError } from "../../../errors/HttpErrors.js";

export default function makeEdituser(userRepository) {
  return async function editUser(userId, { name, email, password }) {
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundError("Usuário não encontrado");
    }
    await userRepository.edit(userId, {
      name,
      email,
      password,
    });
  };
}
