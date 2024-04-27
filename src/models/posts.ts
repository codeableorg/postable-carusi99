export interface Post {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  likesCount: number;
  nextPage: number | null; // Cambiado de 'null' a 'number | null'
  previousPage: number | null; // Cambiado de 'null' a 'number | null'
}

// post-filter.ts
export interface PostFilters {
  username?: string;
}
