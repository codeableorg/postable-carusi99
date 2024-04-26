
import { Post, PostFilters } from '../models/posts';
import { ApiError } from '../middlewares/error';
import * as postData from '../data/posts.data';

export async function getPostsbyUsername(filters: PostFilters = {}, orderBy: string = 'createdAt', order: string = 'asc', page: number = 1, limit: number = 10): Promise<Post[]> {
  try {
    const posts = await postData.getPosts(page, limit, filters, orderBy, order);
    return posts;
  } catch (error) {
    throw new ApiError('Error al obtener los posts desde la base de datos', 400);
  }
}
