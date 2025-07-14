import makeCreateDiscartTask from "../../../application/use-cases/discart-tasks/CreateDiscartTask";

import { DiscartTaskDTO } from "../../../domain/dtos/DiscartTaskDTO.js";
import DiscartTaskPrismaRepository from "../../database/DiscartTaskPrismaRepository";

const repository = new DiscartTaskPrismaRepository();

export const handleCreateDiscartTask = async (req, res, next) => {
  try {
    const discartTaskData = {
      ...req.validatedData,
      userId: req.user.id,
    };

    const discartTaskDTO = new DiscartTaskDTO(discartTaskData);
    const createDiscartTaskUseCase = makeCreateDiscartTask(repository);
    const discartTask = await createDiscartTaskUseCase(discartTaskDTO);

    return res.status(201).json({
      code: 201,
      message: `Tarefa de descarte criada com sucesso.`,
      data: discartTask,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};