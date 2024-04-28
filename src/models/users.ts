import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({
      required_error: "Username es requerido",
      invalid_type_error: "Username debe ser un string",
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email debe ser un string",
    })
    .email({ message: "El correo electrónico debe ser valido" })
    .optional(),
  firstname: z
    .string({
      invalid_type_error: "firstName debe ser un string",
    })
    .optional(),
  lastname: z
    .string({
      invalid_type_error: "lastName debe ser un string",
    })
    .optional(),
  createdat: z.string().optional(),
  updatedat: z.string().optional(),
});

export type UserParams = z.infer<typeof userSchema>;

export type User = UserParams & { id: number };

export interface UpdateUserParams {
    id: number;
    fieldsToUpdate: User;
    email?: string;
    username?: string;
  }
