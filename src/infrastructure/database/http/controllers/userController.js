import { createUserSchema } from '../../../validationSchemas/userSchema';
import CreateUser from '../../../application/use-cases/createUser';
import UserPrismaRepository from '../../database/UserPrismaRepository';

const repository = new UserPrismaRepository();
const createUser = CreateUser(repository);

export const handleCreateUser = async (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body); 

    const { name, email, password } = validatedData;
    const user = await createUser({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.errors[0].message });
  }
};