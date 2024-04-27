
import { Post, PostFilters } from '../models/posts';
import { ApiError } from '../middlewares/error';
import * as postData from '../data/posts.data';
import { createPost, getPostById, getPostsByUsernameFromDatabase} from '../data/posts.data';

export async function getPostsbyUsername(filters: PostFilters = {}, orderBy: string = 'createdAt', order: string = 'asc', page: number = 1, limit: number = 10): Promise<Post[]> {
  try {
    const posts = await postData.getPosts(page, limit, filters, orderBy, order);
    return posts;
  } catch (error) {
    throw new ApiError('Error al obtener los posts desde la base de datos', 400);
  }
}

export async function getPostsUsername(username: string): Promise<Post[]>  {
  try {
    const posts = await getPostsByUsernameFromDatabase(username);
    return posts;
  } catch (error) {
    throw new ApiError('Error al obtener los posts desde la base de datos', 400);
  }
}

export async function createNewPost(userId: number, content: string): Promise<Post> {
  try {
    const newPost = await createPost(userId, content);
    return newPost;
  } catch (error) {
    throw new Error("Error al crear el nuevo post");
  }
}

// Editar un post existente
export async function getPost(postId: number) {
  try {
    const post = await getPostById(postId);
    if (!post) {
      throw new Error('El post no existe');
    }
    return post;
  } catch (error) {
    throw new Error('Error al obtener el post');
  }
}
