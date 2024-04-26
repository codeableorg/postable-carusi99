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
