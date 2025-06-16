export default function makeCreateUser(userRepository) {
  return async function createUser({ name, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Usuário já registrado com este email.");
    }

    const newUser = await userRepository.create({ name, email, password });
    return newUser;
  };
}
