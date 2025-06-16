import { UnauthorizedError } from "../../../errors/HttpErrors.js";
import generateToken from "../../../utils/generateToken.js";

export default function makeLoginUser(userRepository) {
  return async function loginUser(email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) {
      throw new UnauthorizedError("Email ou senha inválidos");
    }

    const userData = await userRepository.login(email, password);
    const userToken = generateToken(existingUser.id);

    return {
      name: userData.name,
      email: userData.email,
      token: userToken,
    };
  };
}
