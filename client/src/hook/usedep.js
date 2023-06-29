import { useContext } from "react";
import { depContext } from "../context/Depcontext";
export const Usedep = () => {
  const context = useContext(depContext);
  if (!context) {
    console.log("depContext is out of the scop of this component");
  }
  return context;
};
