// import axios from "axios"
import { useState, useEffect } from "react";

const useStudDetail = (api) => {
  const [studInfo, setStudInfo] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(api, config)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStudInfo(data);
      })
      .catch((error) => {
        return console.log(error.message);
      });
  }, [api]);
  // const studInfo = axios.get(api, config);
  return { studInfo };
};
export default useStudDetail;
