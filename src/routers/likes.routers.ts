import express from "express";
import {likePostInPostsData } from "../services/likes.service";
import { unlikePostInPostsData as unlikePostInPostsDataService } from "../services/likes.service";
import { authenticateHandler } from "../middlewares/authenticate";
import { unlikePost } from "../data/likes.data";
import { Post } from "../models/posts";

const likeRouter = express.Router();

//DAR LIKE A UN POST
likeRouter.post('/posts/:postId/like', authenticateHandler, async (req, res) => {
    try {
      const userId = req.userId;
      const { postId } = req.params;
      const createdat = new Date().toISOString();
      const like = {
        postid: Number(postId),
        userid: Number(userId),
        createdat
        
      }
      const likedPost = await likePostInPostsData(like);
      res.status(200).json({ 
        ok: true,
        data: likedPost
       });
    } catch (error) {
      console.error('Error al dar like al post:', error);
      res.status(400).json({ ok: false, message: 'Error al dar like al post' });
    }
  });
  
  //ELIMINAR LIKE
  export async function unlikePostInPostsData(
    postId: number,
    userId: number
  ): Promise<Post | null> {
    return unlikePost(postId, userId);
  }
  
  likeRouter.delete('/posts/:postId/like', authenticateHandler, async (req, res) => {
    try {
      const userId = req.userId;
      const { postId } = req.params;
      const unlikedPost = await unlikePostInPostsDataService (Number(postId), Number(userId));
      
      if (!unlikedPost) {
        // Si no se encontró el post, devuelve un error 404
        res.status(404).json({ ok: false, message: 'Post not found' });
        return;
      }
  
      res.status(200).json({
        ok: true,
        data: unlikedPost,
      });
    } catch (error) {
      console.error('Error al eliminar like del post:', error);
      res.status(400).json({ ok: false, message: 'Error al eliminar like del post' });
    }
  });

  export default likeRouter;