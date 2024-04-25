import { query } from "../db";
import { User } from "../models/auth";

export async function createUser(
  username: string,
  password: string,
  role: string
): Promise<User> {
  return (
    await query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, password, role]
    )
  ).rows[0];
}

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE username=$1", [username]))
    .rows[0];
}
