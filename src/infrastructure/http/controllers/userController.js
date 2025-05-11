import makeCreateUser from "../../../application/use-cases/CreateUsers.js";
import makeLoginUser from "../../../application/use-cases/LoginUser.js";
import makeEdituser from "../../../application/use-cases/EditUser.js";
import UserPrismaRepository from "../../database/UserPrismaRepository.js";

const repository = new UserPrismaRepository();

export const handleCreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.validatedData;
    const createUserUseCase = makeCreateUser(repository);
    const user = await createUserUseCase({ name, email, password });

    res.status(201).json(userWithoutPassword(user));
  } catch (err) {
    if (err.message === "Usuário já registrado com este email.") {
      res.status(409).json({ error: err.message });
    } else {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
    }
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const loginUserCase = makeLoginUser(repository);
    const user = await loginUserCase(email, password);

    res.status(200).json(userWithoutPassword(user));
  } catch (err) {
    console.error("Error ao fazer Login:", err);
    res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
  }
};

export const handleEditUser = async (req, res) => {
  try {
    const { name, email, password } = req.validatedData;
    const userId = req.userId;
    
    const editUserCase = makeEdituser(repository);
    const user = await editUserCase(userId, { name, email, password });

    res.status(200).json(userWithoutPassword(user));
  } catch (err) {
    console.error("Erro ao editar usuário:", err);
    res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
  }
};
function userWithoutPassword(user) {
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
