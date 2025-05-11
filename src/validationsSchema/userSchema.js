import { z } from "zod";

// Defina as mensagens de erro aqui
const minLengthErrorMessage = "A senha deve ter no mínimo 8 caracteres.";
const maxLengthErrorMessage = "A senha deve ter no máximo 20 caracteres.";
const uppercaseErrorMessage = "A senha deve conter pelo menos uma letra maiúscula.";
const lowercaseErrorMessage = "A senha deve conter pelo menos uma letra minúscula.";
const numberErrorMessage = "A senha deve conter pelo menos um número.";
const specialCharacterErrorMessage = "A senha deve conter pelo menos um caractere especial (!@#$%^&*).";

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export const userSchema = z.object({
    name: z.string().min(2, { message: 'Nome é obrigatório e deve ter pelo menos 2 caracteres.'}),
    email: z.string().email({ message: 'Email inválido.'}),
    password: passwordSchema
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Email inválido'}),
    password: z.string()
});