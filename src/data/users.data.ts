import { User} from "../models/auth";
import { Userupdate } from "../models/auth";
import * as db from "../db";

export async function getUser(id: number): Promise<User | undefined> {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id])
  return result.rows[0];
  }
  

  export async function updateUser({
    id,
    fieldsToUpdate,
  }: Userupdate): Promise<User> {
    if (!id || Object.keys(fieldsToUpdate).length === 0) {
      throw new Error("No se proporcionaron datos para actualizar");
    }
  const fields = ["email", "firstname", "lastname"]
  const validFields = Object.keys(fieldsToUpdate).filter(
    (field) => fields.includes(field)
  )
    const setClauses = validFields.map((field, index) => `${field} = $${index + 1}`)
    const updateQuery = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${
      validFields.length + 1
    } RETURNING *`;
  
    const params = [...validFields.map((field) => fieldsToUpdate[field]), id];
    const result = await db.query(updateQuery, params);
    return result.rows[0]; // Devuelve el usuario actualizado
  }
  
  export async function deleteUser(id: number): Promise<User | undefined> {
    return (await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])).rows[0];
  }