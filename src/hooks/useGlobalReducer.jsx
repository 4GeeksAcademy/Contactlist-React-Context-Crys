import { createContext, useContext, useReducer } from "react";
import { initialStore, storeReducer } from "../store";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function useGlobalReducer() {
  return useContext(StoreContext);
}
