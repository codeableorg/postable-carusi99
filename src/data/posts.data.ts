import * as db from "../db";
import { ApiError } from "../middlewares/error";
import { Post } from "../models/posts";
import { PostFilters } from "../models/posts";

export async function getPosts(page: number, limit: number, filters: PostFilters = {}, orderBy: string = 'createdAt', order: string = 'asc'): Promise<Post[]> {
  try {
    let query = 'SELECT * FROM posts';
    const queryParams: any[] = [];
  
    if (filters.username) {
      query += ' WHERE username = $1';
      queryParams.push(filters.username);
    }
  
    query += ` ORDER BY ${orderBy} ${order}`;
    query += ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
  
    const { rows } = await db.query(query, queryParams);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener los posts desde la base de datos');
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
    throw new Error('Error al obtener el total de posts desde la base de datos');
  }
}


export async function getPostsByUsernameFromDatabase(username?: string): Promise<Post[]> {
  try {
    let query = `
      SELECT posts.*
      FROM posts
      JOIN users ON posts.userid = users.id
      WHERE users.username = $1
    `;
    const queryParams: any[] = [username];
  
    const { rows } = await db.query(query, queryParams);
    return rows; // Devuelve los posts encontrados
  } catch (error) {
    throw new ApiError('Error al obtener los posts desde la base de datos', 401);
  }
}


export async function createPost(userId: number, content: string): Promise<Post> {
  try {
    const query = `INSERT INTO posts (userid, content, createdat, updatedat) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`;
    const params = [userId, content];
    const { rows } = await db.query(query, params);

    return rows[0];
  } catch (error) {
    throw new Error("Error al crear el post en la base de datos");
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
    return userCount > 0; // Devuelve true si el contador es mayor que 0, indicando que el usuario existe
  } catch (error) {
    console.error('Error al verificar si el usuario existe:', error);
    throw new Error('Error al verificar si el usuario existe');
  }
}

export async function getPostById(postId: number) {
  try {
    const query = 'SELECT * FROM posts WHERE id = $1';
    const queryParams = [postId];
    const { rows } = await db.query(query, queryParams);
    return rows[0]; // Devuelve el primer post encontrado, si existe
  } catch (error) {
    throw new Error('Error al obtener el post desde la base de datos');
  }
}

