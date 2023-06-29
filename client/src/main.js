import React from "react";
import Admin from "./pages/admin";
import Home from "./pages/home";
const Main = () => {
  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col-sm">
            <Home />
          </div>
          <div className=" col-sm bord ">
            <Admin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
