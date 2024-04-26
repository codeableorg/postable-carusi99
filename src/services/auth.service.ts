import bcrypt from "bcrypt";
import { User, UserParams } from "../models/auth";
import * as userDB from "../data/auth-data";
import { ApiError } from "../middlewares/error";

export async function createUser(data: UserParams): Promise<User> {
  const { username, password, role } = data;

  // Verificar la longitud de la contraseña
  if (password.length < 6) {
      throw new ApiError("La contraseña debe tener al menos 6 caracteres", 400);
  }

  // Verificar la existencia del usuario
  try {
      const user = await userDB.getUserByUsername(username);
      if (user) {
          throw new ApiError("El username ya está registrado", 400);
      }
  } catch (error) {
      throw new ApiError("Error al verificar la existencia del usuario", 500);
  }

  // Hashear la contraseña
  const costFactor = 10;
  const hashedPassword = await bcrypt.hash(password, costFactor);

  // Crear el nuevo usuario
  try {
      const newUser = await userDB.createUsers({ ...data, password: hashedPassword });
      return newUser;
  } catch (error) {
      throw new ApiError("Error al crear el usuario", 500);
  }
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