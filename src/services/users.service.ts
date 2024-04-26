import { User} from "../models/auth";
import * as userDB from "../data/users.data";

export async function getUsers(id: number): Promise<User | undefined> {
  return await userDB.getUser(id); 
}

export async function updateUsers(id: number, user: User){
  const updatedUser = {
    id, 
    fieldsToUpdate: user
  }
const result: User = await userDB.updateUser(updatedUser);
return result
}

export async function deleteUsers(id: number): Promise<User | undefined> {
  return await userDB.deleteUser(id);
}