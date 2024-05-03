import { PostFilters } from "../models/posts";

export function pagination(page: number, limit: number): string {
  const offset = (page - 1) * limit;
  return `LIMIT ${limit} OFFSET ${offset}`;
}


export function sorting(query: string, sort?: string): string {
  if (sort) {
    const [sortCol, sortDir] = sort.split("_");
    query += ` ORDER BY "${sortCol}" ${sortDir.toUpperCase() || "ASC"}`;
  }
  return query;
}

export function filtering(
  query: string,
  filters: PostFilters,
  queryParams: (string | boolean | number)[]
): string {
  let updatedQuery = query;
  Object.entries(filters).forEach(([key, value], index) => {
    if (value) {
      queryParams.push(value);
      if (index === 0) {
        updatedQuery += ` WHERE "${key}" = $${queryParams.length}`;
      } else {
        updatedQuery += ` AND "${key}" = $${queryParams.length}`;
      }
    }
  });

  return updatedQuery;
}

