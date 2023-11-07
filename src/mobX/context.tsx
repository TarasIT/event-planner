import React, { FC, ReactNode, createContext } from "react";
import categoryFilter from "./stores/categoryFilter";
import eventsStore from "./stores/eventsStore";
import eventsSorter from "./stores/eventsSorter";
import eventsSearch from "./stores/eventsSearch";

interface StoreContextProps {
  eventsStore: typeof eventsStore;
  categoryFilter: typeof categoryFilter;
  eventsSorter: typeof eventsSorter;
  eventsSearch: typeof eventsSearch;
}

interface StoreProviderProps {
  children: ReactNode;
}

const store: StoreContextProps = {
  eventsStore,
  categoryFilter,
  eventsSorter,
  eventsSearch,
};

export const StoreContext = createContext<StoreContextProps>(store);

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
