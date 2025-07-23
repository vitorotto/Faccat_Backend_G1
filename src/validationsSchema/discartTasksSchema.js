import { z } from "zod";

const nameSchema = z.string().min(3, "O nome é obrigatório");
const descriptionSchema = z.string().min(3, "A descrição é obrigatória");
const typesSchema = z.array(z.string()).min(1, "Pelo menos um tipo é obrigatório");
const execDateSchema = z.date().describe("A data de execução deve ser uma data válida");

export const discardTaskUUIDSchema = z.object({
    id: z.string().uuid("ID inválido")
});

export const discardTasksSchema = z.object({
    name: nameSchema,
    description: descriptionSchema,
    types: typesSchema,
    execDate: execDateSchema
});

export const discardTasksSchemaEdit = z.object({
    name: nameSchema.optional(),
    description: descriptionSchema.optional(),
    types: typesSchema.optional(),
    execDate: execDateSchema.optional()
});

export const getAllDiscardTasksSchema = z.object({
    cursor: z.string().uuid("Cursor é obrigatório para paginação acima de 4").optional(),
    limit: z.number().min(1).max(100).optional()
});
