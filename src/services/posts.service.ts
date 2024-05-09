import {
  createPostDB,
  getPostsByUsernameFromDB,
  getPostsCountFromDB,
  getPostsFromDB,
  updatePostDB,
} from "../data/posts.data";
import { Post, PostFilters } from "../models/posts";

//POST/posts:
export async function createPost(id: number, post: Post) {
  const newPost: Post = await createPostDB(id, post);
  return newPost;
}

//PATCH/posts/:id:
export async function updatePost(id: number, post: Post) {
  const dataPost = {
    id,
    fieldsToUpdate: post,
  };
  const updatePost: Post = await updatePostDB(dataPost);
  return updatePost;
}

//GET/posts
export async function getPosts(
  filters: PostFilters = {},
  sort?: string,
  page: number = 1,
  limit: number = 10
): Promise<Post[]> {
  return await getPostsFromDB(filters, sort, page, limit);
}

export async function getPostsCount(
  filters: PostFilters = {}
): Promise<number> {
  return getPostsCountFromDB(filters);
}

//GET/posts/:username:
export async function getPostsByUsername(username: string) {
  const posts = await getPostsByUsernameFromDB(username);
  return posts;
}