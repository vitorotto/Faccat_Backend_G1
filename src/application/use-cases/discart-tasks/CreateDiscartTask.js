import { ConflictError } from "../../../errors/HttpErrors";

export default function makeCreateDiscartTask(discartTaskRepository) {
  return async function createDiscartTask(discartTaskDTO) {
    // Check if a discart task with the same userId and type already exists
    const existingDiscartTask = await discartTaskRepository.findById(discartTaskDTO.id);
    if (existingDiscartTask) {
      throw new ConflictError("Tarefa de descarte já registrada com este ID");
    }

    // Create the new discart task
    const newDiscartTask = await discartTaskRepository.create(discartTaskDTO);
    return newDiscartTask;
  };
}