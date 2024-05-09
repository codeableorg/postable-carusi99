import * as db from "../db";
import { ApiError } from "../middlewares/error";
import { Post, UpdatePostParams } from "../models/posts";
import { PostFilters } from "../models/posts";
import { filtering, sorting } from "./utils";

//POST/posts:
export async function createPostDB(id: number, post: Post) {
  const { content } = post;
  const result = await db.query(
    "INSERT INTO posts (userid, content) VALUES ($1,$2) RETURNING id,content,createdat,updatedat,(SELECT u.username FROM users AS u WHERE u.id =$1) AS username, 0 AS likesCount",
    [id, content]
  );
  return result.rows[0];
}

//PATCH/posts:id:
export async function updatePostDB({
  id,
  fieldsToUpdate,
}: UpdatePostParams): Promise<Post> {
  if (!id || Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No se proporcionaron datos para actualizar");
  }

  const entries = Object.entries(fieldsToUpdate);
  const setClauses = entries.map(([key, _], index) => `${key} = $${index + 1}`);

  const updateQuery = `UPDATE posts SET ${setClauses.join(
    ", "
  )}, updatedat = NOW() WHERE id = $${
    entries.length + 1
  } RETURNING *, (SELECT username FROM users WHERE id = posts.userid) AS username`;

  const params = [...entries.map(([, value]) => value), id];

  const result = await db.query(updateQuery, params);

  return result.rows[0];
}

export async function getPostsFromDB(
  filters: PostFilters = {},
  sort?: string,
  page?: number,
  limit?: number
): Promise<Post[]> {
  let query =
    "SELECT p.id,p.content,p.createdat,p.updatedat,u.username, COALESCE(SUM(CASE WHEN pl.id IS NOT NULL THEN 1 ELSE 0 END),0) AS LikesCount FROM posts AS p JOIN users AS u ON u.id=p.userid LEFT JOIN likes AS pl ON pl.postid = p.id GROUP BY p.id, u.username";
  const queryParams: (string | boolean | number)[] = [];

  //Filtering:
  query = filtering(query, filters, queryParams);

  //Sorting:
  query = sorting(query, sort);

  //Pagination:
  if (page && limit) {
    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const result = await db.query(query, queryParams);
  return result.rows;
}

export async function getPostsCountFromDB(
  filters: PostFilters = {}
): Promise<number> {
  let query = "SELECT COUNT(*) FROM posts";
  const queryParams: (string | boolean | number)[] = [];
  // Filtering
  query = filtering(query, filters, queryParams);

  const result = await db.query(query, queryParams);
  return Number(result.rows[0].count);
}

//GET/posts/:username:
export async function getPostsByUsernameFromDB(username: string) {
  const result = await db.query(
    "SELECT p.id,p.content,p.createdat,p.updatedat,u.username, COALESCE(SUM(CASE WHEN pl.id IS NOT NULL THEN 1 ELSE 0 END),0) AS LikesCount FROM posts AS p JOIN users AS u ON u.id=p.userid LEFT JOIN likes AS pl ON pl.postid = p.id WHERE username =$1 GROUP BY p.id, u.username;",
    [username]
  );
  if (result.rows.length === 0) {
    throw new Error("No posts for this user");
  }
  return result.rows;
}

