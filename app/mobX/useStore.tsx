import categoryFilter from "./stores/categoryFilter";
import eventsStore from "./stores/eventsStore";
import eventsSorter from "./stores/eventsSorter";
import eventsSearch from "./stores/eventsSearch";
import setFormValues from "./stores/setFormValues";
import authCredentials from "./stores/authCredentials";
import paginationStore from "./stores/paginationStore";
import authStore from "./stores/authStore";

interface StoreProps {
  authStore: typeof authStore;
  authCredentials: typeof authCredentials;
  eventsStore: typeof eventsStore;
  categoryFilter: typeof categoryFilter;
  eventsSorter: typeof eventsSorter;
  eventsSearch: typeof eventsSearch;
  setFormValues: typeof setFormValues;
  paginationStore: typeof paginationStore;
}

const store: StoreProps = {
  authStore,
  authCredentials,
  eventsStore,
  categoryFilter,
  eventsSorter,
  eventsSearch,
  setFormValues,
  paginationStore,
};

export const useStore = (): StoreProps => store;
