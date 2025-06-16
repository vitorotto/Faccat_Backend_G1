import makeCreateUser from "../../../application/use-cases/user/CreateUsers.js";
import makeEdituser from "../../../application/use-cases/user/EditUser.js";
import makeLoginUser from "../../../application/use-cases/user/LoginUser.js";
import UserPrismaRepository from "../../database/UserPrismaRepository.js";

const repository = new UserPrismaRepository();

export const handleCreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.validatedData;
    const createUserUseCase = makeCreateUser(repository);
    await createUserUseCase({ name, email, password });

    res.status(201).json({ code: 201, message: "Usuário criado com sucesso"});
  } catch (err) {
    if (err.message === "Usuário já registrado com este email.") {
      res.status(409).json({ code: 409, message: err.message });
    } else {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ code: 500, message: "Ocorreu um erro interno no servidor." });
    }
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const loginUserCase = makeLoginUser(repository);
    const user = await loginUserCase(email, password);

    res.status(200).json({code: 200, message: "Login realizado com sucesso", data: user});
  } catch (err) {
    console.error("Error ao fazer Login:", err);
    res.status(500).json({ code: 500, message: "Ocorreu um erro interno no servidor." });
  }
};

export const handleEditUser = async (req, res) => {
  try {
    const { name, email, password } = req.validatedData;
    const userId = req.userId;
    
    const editUserCase = makeEdituser(repository);
    await editUserCase(userId, { name, email, password });

    res.status(200).json({code: 200, message: "Dados editados com sucesso"});
  } catch (err) {
    console.error("Erro ao editar usuário:", err);
    res.status(500).json({ code: 500, message: "Ocorreu um erro interno no servidor." });
  }
};
function userWithoutPassword(user) {
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
