import makeCreateUser from "../../../application/use-cases/user/CreateUsers.js";
import makeEdituser from "../../../application/use-cases/user/EditUser.js";
import makeLoginUser from "../../../application/use-cases/user/LoginUser.js";
import UserPrismaRepository from "../../database/UserPrismaRepository.js";

const repository = new UserPrismaRepository();

export const handleCreateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.validatedData;
    const createUserUseCase = makeCreateUser(repository);
    await createUserUseCase({ name, email, password });

    res.status(201).json({ code: 201, message: "Usuário criado com sucesso"});
  } catch (err) {
    next(err);
  }
};

export const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.validatedData;
    const loginUserCase = makeLoginUser(repository);
    const user = await loginUserCase(email, password);

    res.status(200).json({code: 200, message: "Login realizado com sucesso", data: user});
  } catch (err) {
    next(err);
  }
};

export const handleEditUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.validatedData;
    const userId = req.userId;
    
    const editUserCase = makeEdituser(repository);
    await editUserCase(userId, { name, email, password });

    res.status(200).json({code: 200, message: "Dados editados com sucesso"});
  } catch (err) {
    next(err);
  }
};