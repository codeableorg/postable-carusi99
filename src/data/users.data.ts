import { User} from "../models/users";
import { UpdateUserParams  } from "../models/users";
import * as db from "../db";
import { ApiError } from "../middlewares/error";


//OBTIENE EL USUARIO POR SU ID
export async function getUser(id: number): Promise<User | undefined> {
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await db.query(query, [id]);
    
    // Verificar si se encontraron resultados
    if (rows.length > 0) {
      return rows[0];
    } else {
      return undefined; // Devolver undefined en lugar de null
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new ApiError('Error al obtener el usuario', 500);
  }
}


  
//ACTUALIZA UN USUARIO

// Función para actualizar un usuario en la base de datos
export async function updateUser(userId: number, newData: UpdateUserParams): Promise<User> {
  try {
    const query = `
      UPDATE users 
      SET username = $1, email = $2 
      WHERE id = $3
      RETURNING *;`; // Consulta SQL para actualizar el usuario y devolver los datos actualizados

      const username = newData.username ?? ''; // Si newData.username es undefined, se asigna una cadena vacía
const email = newData.email ?? ''; // Si newData.email es undefined, se asigna una cadena vacía

const params: (string | number | boolean)[] = [username, email, userId];

      // Parámetros para la consulta SQL
    const { rows } = await db.query(query, params); // Ejecuta la consulta SQL con los parámetros y obtén el resultado

    // Devuelve el usuario actualizado
    return rows[0];
  } catch (error) {
    // En caso de error, registra el error y lanza una instancia de ApiError
    console.error('Error al actualizar el usuario:', error);
    throw new ApiError('Error al actualizar el usuario', 500);
  }
}



  
  //ELIMINA UN USUARIO
  export async function deleteUser(id: number): Promise<User | undefined> {
    return (await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])).rows[0];
  }