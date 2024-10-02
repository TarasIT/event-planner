import categoryFilter from "./stores/categoryFilter";
import eventsStore from "./stores/eventsStore";
import eventsSorter from "./stores/eventsSorter";
import eventsSearch from "./stores/eventsSearch";
import eventDataStore from "./stores/eventDataStore";
import authCredentials from "./stores/authCredentials";
import paginationStore from "./stores/paginationStore";
import authStore from "./stores/authStore";
import filtersStore from "./stores/filtersStore";

interface StoreProps {
  authStore: typeof authStore;
  authCredentials: typeof authCredentials;
  eventsStore: typeof eventsStore;
  categoryFilter: typeof categoryFilter;
  eventsSorter: typeof eventsSorter;
  eventsSearch: typeof eventsSearch;
  eventDataStore: typeof eventDataStore;
  paginationStore: typeof paginationStore;
  filtersStore: typeof filtersStore;
}

const store: StoreProps = {
  authStore,
  authCredentials,
  eventsStore,
  categoryFilter,
  eventsSorter,
  eventsSearch,
  eventDataStore,
  paginationStore,
  filtersStore,
};

export const useStore = (): StoreProps => store;
