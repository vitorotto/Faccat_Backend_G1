import generateToken from "../../../utils/generateToken.js";

export default function makeLoginUser(userRepository) {
  return async function loginUser(email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const userData = await userRepository.login(email, password);
      const userToken = generateToken(existingUser.id);
      const data = {
        name: userData.name,
        email: userData.email,
        token: userToken,
      };
      return data;
    }
    throw new Error("Senha e email nao coincidem");
  };
}
