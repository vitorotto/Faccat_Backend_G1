import makeCreateUser from "../../../application/use-cases/user/CreateUsers.js";
import makeEdituser from "../../../application/use-cases/user/EditUser.js";
import makeLoginUser from "../../../application/use-cases/user/LoginUser.js";
import makeGetAllUserCollections from "../../../application/use-cases/user/GetAllUserCollections.js"
import UserPrismaRepository from "../../database/UserPrismaRepository.js";
import CollectionPointsPrismaRepository from "../../database/CollectionPointsPrismaRepository.js";

const repository = new UserPrismaRepository();
const collectionRepository = new CollectionPointsPrismaRepository()

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
    const userId = req.user.id;
    
    const editUserCase = makeEdituser(repository);
    await editUserCase(userId, { name, email, password });

    res.status(200).json({code: 200, message: "Dados editados com sucesso"});
  } catch (err) {
    next(err);
  }
};

export const handleGetUserCollectionPoints = async (req, res, next) => {
  try {
    const userId = req.user.id

    const getAllCollectionsPointsUseCase = makeGetAllUserCollections(repository, collectionRepository)
    const userCollections = await getAllCollectionsPointsUseCase(userId)

    res.status(200).json({ code: 200, message: "Pontos de coleta retornados com sucesso", data: userCollections })
  } catch(err) {
    next(err)
  }
}