import * as db from "../db";
import { ApiError } from "../middlewares/error";
import { UserParams, User } from "../models/auth";


//CREA UN NUEVO USUARIO
export async function createUsers(user: UserParams): Promise<User> {
  const now = new Date();
  const query =
  `INSERT INTO users 
  (username, password, email, firstname, lastname, role, createdat, updatedat) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
  RETURNING id, username, role, firstname, lastname, createdat, updatedat`;

  // Reemplazar los valores null por un valor por defecto
  const queryParams = [
    user.username,
    user.password,
    user.email || '',
    user.firstname || '', 
    user.lastname || '', 
    user.role,
    now.toISOString(), 
    now.toISOString(), 
  ];

  try {
    const result = await db.query(query, queryParams);

    // Verificar si se insertó correctamente y si se devolvieron los campos esperados
    if (result.rows.length === 0) {
      throw new ApiError('No se pudo insertar el usuario', 400);
    }

    // Devolver el usuario insertado con todos los campos
    return {
      id: result.rows[0].id,
      username: result.rows[0].username,
      password: '',
      firstname: result.rows[0].firstName,
      lastname: result.rows[0].lastName,
      role: result.rows[0].role,
      createdat: result.rows[0].createdat,
      updatedat: result.rows[0].updatedat
    };
  } catch (error) {
    throw new ApiError('Error al insertar el usuario', 400);
  }
}


//OBTIENE EL USUARIO POR SU NOMBRE DE USERNAME
export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  return (
    await db.query("SELECT * FROM users WHERE username=$1", [username])
  ).rows[0];
}
