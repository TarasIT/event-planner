import categoryFilter from "./stores/categoryFilter";
import eventsStore from "./stores/eventsStore";
import eventsSorter from "./stores/eventsSorter";
import eventsSearch from "./stores/eventsSearch";
import setFormValues from "./stores/setFormValues";
import paginationStore from "./stores/paginationStore";

interface StoreProps {
  eventsStore: typeof eventsStore;
  categoryFilter: typeof categoryFilter;
  eventsSorter: typeof eventsSorter;
  eventsSearch: typeof eventsSearch;
  setFormValues: typeof setFormValues;
  paginationStore: typeof paginationStore;
}

const store: StoreProps = {
  eventsStore,
  categoryFilter,
  eventsSorter,
  eventsSearch,
  setFormValues,
  paginationStore,
};

export const useStore = (): StoreProps => store;
