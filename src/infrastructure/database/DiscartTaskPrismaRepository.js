import { prisma } from "./prisma";
import DiscartTaskRepository from "../../domain/ports/DiscartTaskRepository.js";

export default class DiscartTaskPrismaRepository extends DiscartTaskRepository {

    async create(dto) {
        const createdDiscartTask = await prisma.discartTasks.create({
            data: {
                ...dto,
                userId: dto.userId,
            },
        });
        return createdDiscartTask;
    }

    // Método para encontrar uma tarefa de descarte pelo id
    async findById(id) {
        return await prisma.discartTasks.findUnique({
            where: {
                id: id,
            },
        });
    }

    // Método para deletar uma tarefa de descarte pelo id
    async deleteById(id) {
        return await prisma.discartTasks.delete({
            where: {
                id: id,
            },
        });
    }

    // Método para listar todas as tarefas de descarte
    async listAllById({ cursor, limit }) {
        const query = {
            orderBy: {
                createdAt: 'desc'
            }
        };

        if (cursor) {
            query.skip = 1;
            query.cursor = { id: cursor };
        }

        if (limit) {
            query.take = limit;
        }

        return await prisma.discartTasks.findMany(query);
    }

    
}