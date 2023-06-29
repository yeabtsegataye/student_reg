// App.js or your main component file
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalPage from "./pages/student";
import Main from "./main";
import { useEffect } from "react";
import { Usedep } from "./hook/usedep";

const App = () => {
  const api = "http://localhost:8000/api/department";
  const { dispatch } = Usedep();
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "get_dep", payload: data });
      })
      .catch((error) => console.error(error));
  }, [api, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/student/:id" element={<ModalPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
