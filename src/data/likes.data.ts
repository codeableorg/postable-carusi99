import { Post } from '../models/posts';
import * as db from "../db";

export async function likePost(postId: number): Promise<Post> {
    try {
      // Verificar si el post existe
      const postExistsQuery = 'SELECT * FROM posts WHERE id = $1';
      const postExistsParams = [postId];
      const { rows: existingPosts } = await db.query(postExistsQuery, postExistsParams);
      
      if (existingPosts.length === 0) {
        throw new Error('El post especificado no existe');
      }
      
      // Actualizar el recuento de likes
      const query = 'UPDATE posts SET likes_count = likes_count + 1 WHERE id = $1 RETURNING *';

      const params = [postId];
      const { rows } = await db.query(query, params);
      return rows[0];
    } catch (error) {
      throw error;
    }
}

export async function unlikePost(postId: number): Promise<Post> {
    try {
      // Verificar si el post existe
      const postExistsQuery = 'SELECT * FROM posts WHERE id = $1';
      const postExistsParams = [postId];
      const { rows: existingPosts } = await db.query(postExistsQuery, postExistsParams);
      
      if (existingPosts.length === 0) {
        throw new Error('El post especificado no existe');
      }
      
      // Actualizar el recuento de likes
      const query = 'UPDATE posts SET likes_count = likes_count - 1 WHERE id = $1 RETURNING *';
      const params = [postId];
      const { rows } = await db.query(query, params);
      return rows[0];
    } catch (error) {
      throw error;
    }
}
