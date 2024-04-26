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

export interface PostWithPagination extends Post {
  // nextPage y previousPage ahora son definidos como 'number | null'
  nextPage: number | null;
  previousPage: number | null;
}
