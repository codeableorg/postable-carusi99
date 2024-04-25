import bcrypt from "bcrypt";
import { User, UserParams } from "../models/auth.ts";
import * as userDB from "../data/auth-data";
import { ApiError } from "../middlewares/error.ts";

export async function createUser(data: UserParams): Promise<User> {
  const { username, password, role } = data;

  // Verifica si el usuario ya existe después de hashear la contraseña
  const costFactor = 10;
  const hashedPassword = await bcrypt.hash(password, costFactor);
  const user = await userDB.getUserByUsername(username);
  if (user) {
    throw new ApiError("El username ya está registrado", 400);
  }

  const newUser = await userDB.createUsers({ ...data, password: hashedPassword });
  return newUser;
}

export async function validateCredentials(
  credentials: UserParams
): Promise<User> {
  const { username, password } = credentials;
  const user = await userDB.getUserByUsername(username);
  if (!user) {
    throw new ApiError("Credenciales incorrectas", 400);
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError("Credenciales incorrectas", 400);
  }
  return user;
}