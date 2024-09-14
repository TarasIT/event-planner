import { useStore } from "../mobX/useStore";

interface QueryParams {
  page?: number | null;
  search?: string | null;
  category?: string | null;
  sort?: string | null;
  ascending?: boolean | null;
}

export const createQueryString = (): string => {
  const { paginationStore, eventsSearch, eventsSorter, categoryFilter } =
    useStore();

  const { searchQuery } = eventsSearch;
  const { currentPage, lastPage } = paginationStore;
  const { currentCategory } = categoryFilter;
  const { currentSorter, isSorterIncreased } = eventsSorter;

  let page =
    (searchQuery || currentCategory) && lastPage !== currentPage
      ? 1
      : currentPage;
  let sorter =
    currentSorter === "A-Z" || currentSorter === "Z-A"
      ? "title"
      : currentSorter;
  let isSorterAscending = !sorter ? null : isSorterIncreased;

  const params: QueryParams = {
    page: page,
    search: searchQuery,
    category: currentCategory,
    sort: sorter,
    ascending: isSorterAscending,
  };

  const filteredQuery = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  const queryString = new URLSearchParams(filteredQuery);
  return `?${queryString.toString().toLowerCase()}`;
};
