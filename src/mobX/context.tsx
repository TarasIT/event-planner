import React, { FC, ReactNode, createContext } from "react";
import categoryFilter from "./stores/categoryFilter";
import eventsStore from "./stores/eventsStore";
import eventsSorter from "./stores/eventsSorter";
import eventsSearch from "./stores/eventsSearch";
import setFormValues from "./stores/setFormValues";
import paginationStore from "./stores/paginationStore";

interface StoreContextProps {
  eventsStore: typeof eventsStore;
  categoryFilter: typeof categoryFilter;
  eventsSorter: typeof eventsSorter;
  eventsSearch: typeof eventsSearch;
  setFormValues: typeof setFormValues;
  paginationStore: typeof paginationStore;
}

interface StoreProviderProps {
  children: ReactNode;
}

const store: StoreContextProps = {
  eventsStore,
  categoryFilter,
  eventsSorter,
  eventsSearch,
  setFormValues,
  paginationStore,
};

export const StoreContext = createContext<StoreContextProps>(store);

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
