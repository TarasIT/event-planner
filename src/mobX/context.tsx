import React, { FC, ReactNode } from "react";
import { StoreContext } from "../hooks/useStore";
import categoryFilter from "./stores/categoryFilter";
import eventsStore from "./stores/eventsStore";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const store = { eventsStore, categoryFilter };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
