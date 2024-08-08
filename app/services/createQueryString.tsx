import { useStore } from "../mobX/useStore";

interface QueryParams {
  page?: number | null;
  search?: string | null;
  category?: string | null;
  sort?: string | null;
}

export const createQueryString = (): string => {
  const { paginationStore, eventsSearch, eventsStore } = useStore();
  eventsStore.setLoading(true);

  const { searchQuery } = eventsSearch;
  const { currentPage, lastPage } = paginationStore;

  let page: number | null = null;

  if (currentPage && lastPage) {
    page = searchQuery && lastPage !== currentPage ? 1 : currentPage;
  }

  const params: QueryParams = {
    page: page,
    search: searchQuery,
    // category: null,
    // sort: null,
  };

  const filteredQuery = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  const queryString = new URLSearchParams(filteredQuery);
  return queryString.toString();
};
