import { Post } from "../models/posts";
import * as db from "../data/likes.data";

export async function likePostInPostsData(postId: number): Promise<Post> {
    try {
      const likedPost = await db.likePost(postId);
      return likedPost;
    } catch (error) {
      throw error;
    }
  }
  
  // Eliminar like de un post
  export async function unlikePostInPostsData(postId: number): Promise<Post> {
    try {
      const unlikedPost = await db.unlikePost(postId);
      return unlikedPost;
    } catch (error) {
      throw error;
    }
  }
