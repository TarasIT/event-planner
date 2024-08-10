interface QueryParams {
  page?: number;
  searchQuery?: string;
  category?: string;
  sortParam?: string;
}

export const createApiURL = (params: QueryParams = {}): string => {
  const baseUrl = "https://event-planner-api.onrender.com/api/events";
  const queryString = new URLSearchParams({ per_page: "8" });

  const { page, searchQuery, category, sortParam } = params;

  if (page) queryString.append("page", page.toString());
  if (searchQuery) queryString.append("search", searchQuery);
  if (category) queryString.append("category", category);
  if (sortParam) queryString.append("sort", sortParam);

  return `${baseUrl}?${queryString.toString()}`;
};
