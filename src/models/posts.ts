export interface Post {
  content: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  nextPage: number | null; // Cambiado de 'null' a 'number | null'
  previousPage: number | null; // Cambiado de 'null' a 'number | null'
}

// post-filter.ts
export interface PostFilters {
  username?: string;
}

export interface UpdatePostParams {
  id: number;
  fieldsToUpdate: Record<string, any>;
}