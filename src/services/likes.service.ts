import { Post } from "../models/posts";
import { createLikePost, unlikePost } from "../data/likes.data";
import { Like } from "../models/like";

export async function likePostInPostsData(like: Like): Promise<Post> {
  
      const likedPost = await createLikePost(like);
      return likedPost;
    } 
  
  
  // Eliminar like de un post
  export async function unlikePostInPostsData(
    postId: number,
    userId: number
  ): Promise<Post | null> {
    const unlikedPost = await unlikePost(postId, userId);
      return unlikedPost;
    }
  
