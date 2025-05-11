export default function makeLoginUser(userRepository) {
  return async function loginUser(email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return await userRepository.loginUser(email, password)
    }
    throw new Error("Senha e email nao coincidem");
  };
} 