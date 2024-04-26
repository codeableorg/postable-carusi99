import * as db from "../db";
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
    throw new Error('Error al obtener el total de posts desde la base de datos');
  }
}
