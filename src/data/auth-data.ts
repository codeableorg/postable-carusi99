import * as db from "../db";
import { UserParams, User } from "../models/auth";

export async function createUsers(user: UserParams): Promise<User> {
  const now = new Date();
  const query =
    "INSERT INTO users (username, password, email, firstName, lastName, role, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
  const queryParams: (string | Date | undefined)[] = [
    user.username,
    user.password,
    user.email,
    user.firstName,
    user.lastName,
    user.role,
    now,
    now,
  ];

  const result = await db.query(query, queryParams); 
  return result.rows[0];
}

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  return (
    await db.query("SELECT * FROM users WHERE username=$1", [username])
  ).rows[0];
}
