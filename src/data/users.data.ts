import { User} from "../models/users";
import { UpdateUserParams  } from "../models/users";
import * as db from "../db";
import { ApiError } from "../middlewares/error";


//OBTIENE EL USUARIO POR EL TOKEN
export async function getUser(id: number): Promise<User> {
  const result = await db.query("SELECT * FROM users WHERE id=$1", [id]);
  return result.rows[0];
}
  
//ACTUALIZA UN USUARIO

export async function editUser({
  id,
  fieldsToUpdate,
}: UpdateUserParams): Promise<User> {
  if (!id || Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No se proporcionaron datos para actualizar");
  }
  const allowedFields = ["email", "firstname", "lastname"]; // Lista de campos permitidos para actualizar
  const validFieldsToUpdate = Object.keys(fieldsToUpdate).filter((field) =>
    allowedFields.includes(field)
  );
  const setClauses = validFieldsToUpdate.map(
    (field, index) => `${field} = $${index + 1}`
  );
  const updateQuery = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${
    validFieldsToUpdate.length + 1
  } RETURNING *`;

  const params = [
    ...validFieldsToUpdate.map((field) => fieldsToUpdate[field]),
    id,
  ];
  const result = await db.query(updateQuery, params);

  return result.rows[0]; // Devuelve el usuario actualizado
}



  
  //ELIMINA UN USUARIO
  export async function deleteUser(id: number): Promise<User | undefined> {
    return (await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])).rows[0];
  }