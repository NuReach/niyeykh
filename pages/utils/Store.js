import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
