import { z } from "zod";

export const userSchema = z.object({
  username: z.string({
    required_error: "Username es requerido",
    invalid_type_error: "Username debe ser un string",
  }),

  password: z
    .string({
      required_error: "Password es requerido",
      invalid_type_error: "Password debe ser un string",
    })
    .min(6, "Password debe tener al menos 6 caracteres"),

  email: z.string({
    required_error: "Email es requerido",
    invalid_type_error: "Email debe ser un string",
  }).email({ message: "El formato del correo electrónico es inválido" }).optional(),

  firstname: z.string({
    invalid_type_error: "Nombre debe ser un string",
  }).optional(),

  lastname: z.string({
    invalid_type_error: "Apellido debe ser un string",
  }).optional(),

  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "El rol debe ser admin o user" }),
  }).default("user"),

  createdat: z.date({
    required_error: "CreatedAt es requerido",
    invalid_type_error: "CreatedAt debe ser una fecha",
  }).default(() => new Date()),

  updatedat: z.date({
    required_error: "UpdatedAt es requerido",
    invalid_type_error: "UpdatedAt debe ser una fecha",
  }).default(() => new Date()),
});

export type UserParams = z.infer<typeof userSchema>;

export type User = UserParams & { id: number };

