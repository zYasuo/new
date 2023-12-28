import { z } from "zod";

export const CreateUser = z.object({
  id: z.string().min(3).max(255),
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(50, "O nome não deve exceder 50 caracteres.")
    .regex(/^[A-Za-z\s]+$/, "O nome deve conter apenas letras e espaços."),
  sobrenome: z
    .string()
    .min(3)
    .max(255)
    .regex(/^[A-Za-z\s]+$/, "O nome deve conter apenas letras e espaços."),
  email: z.string().email("Email inválido. Por favor, insira um email válido."),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).*$/,
      "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial."
    ),
});
