import * as db from "../db";
import { ApiError } from "../middlewares/error";
import { Post } from "../models/posts";
import { PostFilters } from "../models/posts";

export async function getPosts(page: number, limit: number, filters: PostFilters = {}, orderBy: string = 'createdAt', order: string = 'asc'): Promise<Post[]> {
  try {
    // Utiliza getPostsByUsernameFromDatabase para obtener los posts junto con su conteo de likes
    return await getPostsByUsernameFromDatabase(filters.username as string, page, limit, orderBy, order);
  } catch (error) {
    throw new ApiError('Error al obtener los posts desde la base de datos', 401);
  }
}
export async function getTotalPosts(username?: string): Promise<number> {
  try {
    let query = 'SELECT COUNT(*) FROM posts';
    const queryParams: any[] = [];

    if (username) {
      query += ' WHERE username = $1';
      queryParams.push(username);
    }

    const { rows } = await db.query(query, queryParams);
    return parseInt(rows[0].count, 10);
  } catch (error) {
    console.error('Error al obtener el total de posts desde la base de datos:', error);
    throw new ApiError('Error al obtener el total de posts desde la base de datos', 400);
  }
}

export async function getPostsByUsernameFromDatabase(username: string, page: number, limit: number, orderBy: string = 'createdAt', order: string = 'asc'): Promise<Post[]> {
  try {
    let query = `
    SELECT p.id, p.content, p.createdat, p.updatedat, u.username, 
    COALESCE(SUM(CASE WHEN pl.id IS NOT NULL THEN 1 ELSE 0 END), 0) AS likeCount 
    FROM posts AS p 
    JOIN users AS u ON u.id=p.userid 
    LEFT JOIN likes AS pl ON pl.postid = p.id`;

    const queryParams: any[] = [];

    if (username) {
      query += ' WHERE u.username = $1';
      queryParams.push(username);
    }

    query += ` GROUP BY p.id, u.username`;
    query += ` ORDER BY ${orderBy} ${order}`;
    query += ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

    const { rows } = await db.query(query, queryParams);
    return rows;
  } catch (error) {
    throw new ApiError('Error al obtener los posts del usuario', 401);
  }
}


export async function createPost(userId: number, content: string): Promise<Post> {
  try {
    const result = await db.query(
      `INSERT INTO posts (userid, content) VALUES ($1,$2) RETURNING id,content,createdat,updatedat,(SELECT u.username FROM users AS u WHERE u.id =$1) AS username, 0 AS likesCount`,
      [userId, content]
    );

    return result.rows[0];
  } catch (error) {
    throw new ApiError("Error al crear el post en la base de datos", 400);
  }
}

export async function editPost(postId: number, content: string): Promise<Post> {
  try {
    const query = `UPDATE posts SET content = $1, updatedat = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`;
    const params = [content, postId];
    const { rows } = await db.query(query, params);

    if (rows.length === 0) {
      throw new ApiError("El post no existe", 404);
    }

    return rows[0];
  } catch (error) {
    throw new ApiError("Error al editar el post en la base de datos", 500);
  }
}

export async function checkIfUserExists(username: string): Promise<boolean> {
  try {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE username = $1';
    const params = [username];
    const { rows } = await db.query(query, params);
    const userCount = parseInt(rows[0].count, 10);
    return userCount > 0;
  } catch (error) {
    console.error('Error al verificar si el usuario existe:', error);
    throw new ApiError('Error al verificar si el usuario existe', 400);
  }
}

export async function getPostById(postId: number): Promise<Post | null> {
  try {
    const query = 'SELECT * FROM posts WHERE id = $1';
    const queryParams = [postId];
    const { rows } = await db.query(query, queryParams);
    
    if (rows.length === 0) {
      throw new ApiError('El post no existe', 404);
    }

    return rows[0];
  } catch (error) {
    throw new ApiError('Error al obtener el post desde la base de datos', 400);
  }
}
