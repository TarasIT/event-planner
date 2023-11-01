import { createContext, useContext } from "react";
import eventsStore from "../mobX/stores/eventsStore";
import categoryFilter from "../mobX/stores/categoryFilter";

interface StoreContextProps {
  eventsStore: typeof eventsStore;
  categoryFilter: typeof categoryFilter;
}

const store: StoreContextProps = {
  eventsStore,
  categoryFilter,
};

export const StoreContext = createContext<StoreContextProps>(store);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
