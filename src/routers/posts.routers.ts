import express from "express";
import { getPosts, getTotalPosts } from "../data/posts.data";
import { pagination } from "../data/utils";
import { PostFilters } from "../models/posts";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, username, orderBy = 'createdAt', order = 'asc' } = req.query;
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    // Aplicar paginación
    const totalItems = await getTotalPosts(username as string);
    const totalPages = Math.ceil(totalItems / limitInt);
    const paginationInfo = pagination(pageInt, limitInt);

    let filters: PostFilters = {};
    if (typeof username === 'string' && username !== '') {
      filters.username = username;
    }

    const posts = await getPosts(
      pageInt,
      limitInt,
      filters,
      orderBy as string,
      order as string
    );

    res.status(200).json({
      ok: true,
      data: posts,
      pagination: {
        page: pageInt,
        pageSize: limitInt,
        totalItems: totalItems,
        totalPages: totalPages,
        nextPage: posts.length === limitInt ? pageInt + 1 : null,
        previousPage: pageInt > 1 ? pageInt - 1 : null
      }
    });
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ ok: false, message: 'Error al obtener los posts' });
  }
});

export default postsRouter;
