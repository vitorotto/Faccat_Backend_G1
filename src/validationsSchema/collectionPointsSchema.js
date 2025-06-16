import { z } from 'zod';

const nameSchema = z.string().min(3, "O nome é obrigatório");
const descriptionSchema = z.string().min(3, "A descrição é obrigatória");
const latitudeSchema = z.string().min(3, "A latitude é obrigatória");
const longitudeSchema = z.string().min(3, "A longitude é obrigatória");
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