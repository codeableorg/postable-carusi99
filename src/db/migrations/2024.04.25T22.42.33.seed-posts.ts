import { Migration } from "../scripts/dbMigrate";
import { faker } from "@faker-js/faker";

export type Post = {
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export function generatePost(userId: number): Post {
  const now = new Date();
  const content = faker.lorem.paragraph();
  return {
    userId,
    content,
    createdAt: now,
    updatedAt: now,
  };
}

export const up: Migration = async (params) => {
  // Obtener la lista de usuarios de la base de datos
  const usersResult = await params.context.query("SELECT id FROM users;");
  const users = usersResult.rows;

  // Crear un post para cada usuario
  const posts: Post[] = users.map((user: { id: number }) => {
    return generatePost(user.id);
  });

  // Insertar los posts en la base de datos
  const values = posts
    .map(
      (post) =>
        `(${post.userId}, '${post.content}', '${post.createdAt.toISOString()}', '${post.updatedAt.toISOString()}')`
    )
    .join(", ");
  const sqlQuery = `INSERT INTO posts (userId, content, createdAt, updatedAt) VALUES ${values};`;

  return await params.context.query(sqlQuery);
};

export const down: Migration = async (params) => {
  return await params.context.query(`DELETE FROM posts;`);
};
