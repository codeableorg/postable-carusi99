import express from "express";
import { getPosts, getTotalPosts, getPostsByUsernameFromDatabase, createPost, editPost, checkIfUserExists, getPostById } from "../data/posts.data";
import { pagination } from "../data/utils";
import { PostFilters } from "../models/posts";
import { authenticateHandler } from "../middlewares/authenticate";

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

postsRouter.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { page = 1, limit = 10, orderBy = 'createdAt', order = 'asc' } = req.query;
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);

    // Verificar si el usuario existe
    const userExists = await checkIfUserExists(username);

    if (userExists) {
      const posts = await getPostsByUsernameFromDatabase(username);

      if (posts) { // Verificar si se devolvieron posts
        res.status(200).json({
          ok: true,
          data: posts,
          pagination: {
            page: pageInt,
            pageSize: limitInt,
            nextPage: posts.length === limitInt ? pageInt + 1 : null,
            previousPage: pageInt > 1 ? pageInt - 1 : null
          }
        });
      } else {
        res.status(404).json({ ok: false, message: 'No se encontraron posts para el usuario especificado' });
      }
    } else {
      res.status(404).json({ ok: false, message: 'El usuario especificado no existe' });
    }
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ ok: false, message: 'Error al obtener los posts' });
  }
});


postsRouter.post("/posts", authenticateHandler, async (req, res) => {
  try {
    const { content } = req.body;

    // Verificar si el usuario está autenticado
    if (!req.userId) {
      return res.status(401).json({ ok: false, message: "Usuario no autenticado" });
    }

    // Verificar si se proporciona el contenido del post
    if (!content || content.trim() === "") {
      return res.status(400).json({ ok: false, message: "El contenido del post no puede estar vacío" });
    }

    // Crear el nuevo post si el usuario está autenticado
    const newPost = await createPost(req.userId, content);

    // Responder con el nuevo post creado
    res.status(201).json({ ok: true, data: newPost });
  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({ ok: false, message: "Error al crear el post" });
  }
});


postsRouter.patch("/:id", authenticateHandler, async (req, res) => {
  const postId = parseInt(req.params.id);
  const { content } = req.body;

  try {
    // Verificar si el post existe
    const existingPost = await getPostById(postId);
    if (!existingPost) {
      return res.status(404).json({ ok: false, message: "El post no existe" });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ ok: false, message: "El contenido actualizado del post no puede estar vacío" });
    }

    const updatedPost = await editPost(postId, content);

    res.status(200).json({ ok: true, data: updatedPost });
  } catch (error) {
    console.error("Error al editar el post:", error);
    res.status(500).json({ ok: false, message: "Error al editar el post" });
  }
});

export default postsRouter;
