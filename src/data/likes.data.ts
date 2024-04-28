import { query } from '../db'; // Ajusta la ruta de tu módulo de base de datos
import { Like } from '../models/like';
import { Post } from '../models/posts'; // Ajusta la importación según la ruta correcta

// DAR LIKE A UN POST
export async function createLikePost(like: Like): Promise<Post> {
  const { userid, postid, createdat } = like;
  const likeResult = await query(
    "INSERT INTO likes (userId, postId, createdat) VALUES ($1, $2, $3)",
    [userid, postid, createdat]
  );

  const postResult = await query(
    "SELECT p.id, p.content, p.createdat, p.updatedat, u.username, COALESCE(COUNT(pl.*), 0) AS likesCount FROM posts AS p JOIN users AS u ON u.id = p.userid LEFT JOIN likes AS pl ON pl.postid = p.id WHERE p.id = $1 GROUP BY p.id, u.username",
    [postid]
  );

  return {
    ...postResult.rows[0],
    like: likeResult.rows[0],
  };
}

// ELIMINAR LIKE
export async function unlikePost(
  postId: number,
  userId: number
): Promise<Post | null> {
  await query("DELETE FROM likes WHERE postid = $1 AND userid = $2", [
    postId,
    userId,
  ]);

  const postResult = await query(
    "SELECT p.id, p.content, p.createdat, p.updatedat, u.username, COALESCE(COUNT(pl.*), 0) AS likesCount FROM posts AS p JOIN users AS u ON u.id = p.userid LEFT JOIN likes AS pl ON pl.postid = p.id WHERE p.id = $1 GROUP BY p.id, u.username",
    [postId]
  );

  return postResult.rows[0] || null;
}
