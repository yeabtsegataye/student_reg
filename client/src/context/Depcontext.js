import { createContext } from "react";
import { useReducer } from "react";

export const depContext = createContext();

export const depReducer = (state, action) => {
  switch (action.type) {
    case "get_dep":
      return { departments: action.payload };
    default:
      return state;
  }
};
export const DepProvider = ({ children }) => {
  const [state, dispatch] = useReducer(depReducer, { departments: null });
  return (
    <depContext.Provider value={{ ...state, dispatch }}>
      {children}
    </depContext.Provider>
  );
};
