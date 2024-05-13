import { z } from "zod";

export const postSchema = z.object({
  content: z.string(),
  createdat: z.string(),
  updatedat: z.string(),
  username: z.string(),
});

export type PostParams = z.infer<typeof postSchema>;

export type Post = PostParams & { id?: number };

export type PostFilters = {
  username?: string;
};
export interface UpdatePostParams {
  id: number;
  fieldsToUpdate: Record<string, any>;
}