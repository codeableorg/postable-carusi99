import { Migration } from "../scripts/dbMigrate";
import { faker } from  "@faker-js/faker";

export type User = {
  username: string;
  password: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export function generateUser(): User {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  const email = faker.internet.email();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const role = faker.helpers.arrayElement(["user", "admin"]);
  const createdAt = faker.date.past();
  const updatedAt = faker.date.recent();

  return {
    username,
    password,
    email,
    firstName,
    lastName,
    role,
    createdAt,
    updatedAt,
  };
}

export const up: Migration = async (params) => {
  const users: User[] = [];
  for (let i = 0; i < 50; i++) {
    users.push(generateUser());
  }

  const values = users
    .map(
      (user) =>
        `('${user.username}', '${user.password}', '${user.email}', ${
          user.firstName ? `'${user.firstName}'` : "NULL"
        }, ${
          user.lastName ? `'${user.lastName}'` : "NULL"
        }, '${user.role}', '${user.createdAt.toISOString()}', '${user.updatedAt.toISOString()}')`
    )
    .join(", ");
  const sqlQuery = `INSERT INTO Users (username, password, email, firstName, lastName, role, createdAt, updatedAt) VALUES ${values};`;

  return await params.context.query(sqlQuery);
};

export const down: Migration = async (params) => {
  return params.context.query(`DELETE FROM users;`);
};
