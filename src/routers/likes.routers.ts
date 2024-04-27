
import express from "express";
import {likePostInPostsData , unlikePostInPostsData } from "../services/likes.service";
import { authenticateHandler } from "../middlewares/authenticate";
const likeRouter = express.Router();

likeRouter.post('/posts/:postId/like', authenticateHandler, async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const likedPost = await likePostInPostsData(postId);
      res.status(200).json({ ok: true, data: likedPost });
    } catch (error) {
      console.error('Error al dar like al post:', error);
      res.status(400).json({ ok: false, message: 'Error al dar like al post' });
    }
  });
  
  // Eliminar like de un post
  likeRouter.delete('/posts/:postId/like', authenticateHandler, async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const unlikedPost = await unlikePostInPostsData(postId);
      res.status(200).json({ ok: true, data: unlikedPost });
    } catch (error) {
      console.error('Error al eliminar like del post:', error);
      res.status(400).json({ ok: false, message: 'Error al eliminar like del post' });
    }
  });

  export default likeRouter;