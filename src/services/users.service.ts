import { User} from "../models/users";
import * as userDB from "../data/users.data";

export async function getUsers(id: number): Promise<User> {
  const user = await userDB.getUser(id);
  return user; // getUser ya devuelve undefined si no se encuentra ningún usuario
}


export async function updateUsers(id: number, user: User) {
  const dataUser = {
    id,
    fieldsToUpdate: user,
  };
  const updateProfile: User = await userDB.editUser(dataUser);
  return updateProfile;
}

export async function deleteUsers(id: number): Promise<User | undefined> {
  return await userDB.deleteUser(id);
}