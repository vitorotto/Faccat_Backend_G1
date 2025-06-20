import { UnauthorizedError } from "../../../errors/HttpErrors.js";
import generateToken from "../../../utils/generateToken.js";

export default function makeLoginUser(userRepository) {
  return async function loginUser(email, password) {
    const currentUser = await userRepository.findByEmail(email);
    if (!currentUser) {
      throw new UnauthorizedError("Email ou senha inválidos");
    }

    const userData = await userRepository.login(email, password);
    const userToken = generateToken(currentUser.id, currentUser.role);

    return {
      name: userData.name,
      email: userData.email,
      token: userToken,
    };
  };
}
