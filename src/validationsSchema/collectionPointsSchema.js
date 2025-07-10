import { z } from 'zod';

const nameSchema = z.string().min(3, "O nome é obrigatório");
const descriptionSchema = z.string().min(3, "A descrição é obrigatória");
const latitudeSchema = z.number().min(-90).max(90).describe("A latitude deve estar entre -90 e 90");
const longitudeSchema = z.number().min(-180).max(180).describe("A longitude deve estar entre -180 e 180");
const citySchema = z.string().min(3, "A cidade é obrigatória");
const ufSchema = z.string().length(2, "A UF deve ter exatamente 2 caracteres");
const addressSchema = z.string().min(3, "O endereço é obrigatório");
const typesSchema = z.array(z.string()).min(1, "Pelo menos um tipo é obrigatório");

const operatingHoursSchema = z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional(),
}).optional();

const contactSchema = z.object({
    phone: z.string().optional(),
    email: z.string().email("Email inválido").optional(),
    website: z.string().url("URL inválida").optional(),
}).optional();

export const collectionPointUUIDSchema = z.object({
    id: z.string().uuid("ID inválido")
}).strict();

export const collectionPointsSchema = z.object({
    name: nameSchema,
    description: descriptionSchema,
    latitude: latitudeSchema,
    longitude: longitudeSchema,
    city: citySchema,
    uf: ufSchema,
    address: addressSchema,
    types: typesSchema,
    operating_hours: operatingHoursSchema,
    contact: contactSchema,
}).strict();

export const getAllCollectionsSchema = z.object({
    cursor: z.string().uuid("Cursor é obrigatório para paginação acima de 4").optional(),
    limit: z.number({
        required_error: "Limit é um parâmetro obrigatório",
        invalid_type_error: "Limit deve ser um número"
    }),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    radius: z.number().optional(),
    types: z.array(z.string()).optional()
}).strict()

export const collectionPointsSchemaEdit = z.object({
    name: nameSchema.optional(),
    description: descriptionSchema.optional(),
    latitude: latitudeSchema.optional(),
    longitude: longitudeSchema.optional(),
    city: citySchema.optional(),
    uf: ufSchema.optional(),
    address: addressSchema.optional(),
    types: typesSchema.optional(),
    operating_hours: operatingHoursSchema,
    contact: contactSchema,
}).strict();

export const collectionPointsListSchema = z.object({
    latitude: latitudeSchema.optional(),
    longitude: longitudeSchema.optional(),
    radius: z.number().max(50).optional(),
    types: z.array(z.string()).optional(),
    page: z.number().int().min(1).optional(),
    limit: z.number().int().max(50).optional()
}).strict();

