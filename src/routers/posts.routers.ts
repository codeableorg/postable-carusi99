import express, { NextFunction, Request, Response } from "express";
import { authenticateHandler } from "../middlewares/authenticate";
import { ApiError } from "../middlewares/error";
import { Post, PostFilters } from "../models/posts";
import {
  createPost,
  updatePost,
  getPostsByUsername,
  getPosts,
  getPostsCount
} from "../services/posts.service";

const postsRouter = express.Router();

//POST/posts:
postsRouter.post(
  "/",
  authenticateHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.userId === undefined) {
      return next(new ApiError("Unauthorized", 401));
    }
    try {
      const postData: Post = req.body;
      const newPost = await createPost(req.userId, postData);
      res.status(201).json({
        ok: true,
        data: newPost,
      });
    } catch (error) {
      next(new ApiError("Bad Request", 400));
    }
  }
);

//PATCH/posts/:id:

postsRouter.patch(
  "/:id",
  authenticateHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: Post = req.body;
      const { id } = req.params;
      const post = await updatePost(Number(id), postData);
      res.json({
        ok: true,
        data: post,
      });
    } catch (error) {
      console.log(error);
      next(new ApiError("Bad Request", 400));
    }
  }
);

postsRouter.get("/posts", async (req: Request, res: Response) => {
  const filters: PostFilters = {
    username: req.query["username"] as string,
  };
  const sort = req.query["sort"] as string | undefined;
  const page = Number(req.query["page"]) || 1;
  const limit = Number(req.query["limit"]) || 10;

  const posts = await getPosts(filters, sort, page, limit);

  //pagination:
  const totalItems: number = await getPostsCount(filters);
  const totalPages = Math.ceil(totalItems / limit);

  res.json({
    ok: true,
    data: [{ posts: posts }],
    pagination: {
      page: 1,
      pageSize: 10,
      totalItems: 20,
      totalPages: 2,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    },
  });
});

//GET/posts/:username?page=2&limit=5

postsRouter.get("/posts/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const result = await getPostsByUsername(username);
    res.json({
      ok: true,
      result: result,
    });
  } catch (error) {
    res.status(404).json({ ok: false, message: "User doesn't exist" });
  }
});

export default postsRouter;


