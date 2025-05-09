import { userSchema } from '../../../../validationsSchema/userSchema.js';
import makeCreateUser from '../../../../application/use-cases/CreateUsers.js'; 
import UserPrismaRepository from '../../../database/UserPrismaRepository.js';

const repository = new UserPrismaRepository();
const createUserUseCase = makeCreateUser(repository);

export const handleCreateUser = async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const { name, email, password } = validatedData;

    const user = await createUserUseCase({ name, email, password });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);

  } catch (err) {
    if (err.errors && err.errors[0]) {
      res.status(400).json({ error: err.errors[0].message });
    } else if (err.message === 'Usuário já registrado com este email.') {
      res.status(409).json({ error: err.message });
    }
    else { // Outros erros
      console.error('Erro ao criar usuário:', err);
      res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
    }
  }
};