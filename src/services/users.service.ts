import { User} from "../models/users";
import * as userDB from "../data/users.data";

export async function getUsers(id: number): Promise<User> {
  const user = await userDB.getUser(id);
  return user; // getUser ya devuelve undefined si no se encuentra ningún usuario
}


export async function updateUsers(id: number, user: User){
  const updatedUser = {
    id, 
    fieldsToUpdate: user
  }
const result: User = await userDB.updateUser(id,updatedUser);
return result;
}

export async function deleteUsers(id: number): Promise<User | undefined> {
  return await userDB.deleteUser(id);
}