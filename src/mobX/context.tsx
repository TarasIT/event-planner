import React, { FC, ReactNode, createContext } from "react";
import categoryFilter from "./stores/categoryFilter";
import eventsStore from "./stores/eventsStore";
import eventsSorter from "./stores/eventsSorter";

interface StoreContextProps {
  eventsStore: typeof eventsStore;
  categoryFilter: typeof categoryFilter;
  eventsSorter: typeof eventsSorter;
}

interface StoreProviderProps {
  children: ReactNode;
}

const store: StoreContextProps = {
  eventsStore,
  categoryFilter,
  eventsSorter,
};

export const StoreContext = createContext<StoreContextProps>(store);

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
