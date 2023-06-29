import { useState, useEffect } from "react";
import axios from "axios";
import { Usedep } from "../hook/usedep";

const Addstudent = () => {
  const { dispatch } = Usedep();
  // the value for student input
  const [studName, setNameStud] = useState("");
  const [studID, setStudID] = useState("");
  const [department, setdepartment] = useState("");
  // value for course post
  const [cours, setCours] = useState([]);
  //value for department to post
  const [depPost, setdepPost] = useState("");
  const [courPost, setcourPost] = useState([]);
  //value for geting the department and course
  const [getDep, setGetDep] = useState([]);
  const [getCor, setGetCor] = useState([]);

  const [loadings, setLoadings] = useState(false);
  const [loadingsstd, setLoadingsstd] = useState(false);
  const [loadingsdep, setLoadingsdep] = useState(false);

  const api = "http://localhost:8000/api/department";
  const api2 = "http://localhost:8000/api/coures";
  const api3 = "http://localhost:8000/api/student";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //////////////////////////////
  const handle_checkbox = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setcourPost([...courPost, value]);
    } else {
      setcourPost(courPost.filter((v) => v !== value));
    }
  };
  ////////////////////////////////
  const handle_StudReg = async (e) => {
    e.preventDefault();
    setLoadingsstd(true);
    try {
      const { data } = await axios.post(
        api3,
        { name: studName, ID: studID, department },
        config
      );
      if (!data) {
        setLoadingsstd(false);
        console.log("error ocured on stud Reg");
        return;
      }
      setLoadingsstd(false);
      return;
    } catch (error) {
      console.log(error.message);
      setLoadingsstd(false);
    }
  };
  /////////////////////////////////
  const hadle_depReg = async (e) => {
    e.preventDefault();
    setLoadingsdep(true);
    try {
      const { data } = await axios.post(
        api,
        { name: depPost, coursesID: courPost },
        config
      );
      if (!data) {
        setLoadingsdep(false);
        return;
      }
      setLoadingsdep(false);
      return;
    } catch (error) {
      console.log(error.message);
      setLoadingsdep(false);
    }
  };
  ////////////////////////////////
  const handle_courPost = async (e) => {
    e.preventDefault();
    setLoadings(true);
    try {
      const { data } = await axios.post(api2, { name: cours }, config);
      if (!data) {
        setLoadings(false);
        return;
      }
      setLoadings(false);
      return;
    } catch (error) {
      console.log(error.message);
      setLoadings(false);
    }
  };
  ////////////////////////////////
  const handle_department = async () => {
    await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setGetDep(data);
        dispatch({ type: "get_dep", payload: data });
      })
      .catch((error) => console.error(error));
  };
  ////////////////////////////////
  const handle_Courses = async () => {
    await fetch(api2)
      .then((response) => response.json())
      .then((data) => setGetCor(data))
      .catch((error) => console.error(error));
  };
  ////////////////////////////////
  useEffect(() => {
    handle_Courses();
    handle_department();
    console.log(getCor);
  }, [loadings, loadingsdep, loadingsstd]);

  return (
    <div className="admin">
      {/* this is form Student name */}
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">
            Student Name :
          </label>
        </div>
        <div class="col-auto">
          <input
            type="text"
            id="inputPassword6"
            class="form-control"
            value={studName}
            onChange={(e) => {
              setNameStud(e.target.value);
            }}
          />
        </div>
      </div>
      {/* this is form Student id */}
      <div class="row g-3 align-items-center ">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">
            Student ID :
          </label>
        </div>
        <div class="col-auto ">
          <input
            type="text"
            id="inputPassword6"
            class="form-control m-2"
            value={studID}
            onChange={(e) => {
              setStudID(e.target.value);
            }}
          />
        </div>
      </div>
      {/* this is for Department */}
      <div class="btn-group custum_dropdown">
        <button
          class="btn btn-secondary dropdown-toggle custom-button"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          Department
        </button>
        <ul class="dropdown-menu">
          {getDep.map((deps) => (
            <div className="form-check" key={deps._id}>
              <input
                className="form-check-input"
                type="radio"
                name="departmentsList"
                id="flexRadioDefault1"
                value={deps._id}
                onChange={(e) => setdepartment(e.target.value)}
              />
              <label className="form-check-label" for="departmentsList">
                {deps.name}
              </label>
            </div>
          ))}
        </ul>
      </div>
      {/* for the cource */}
      {loadingsstd && (
        <button
          type="button"
          class="btn btn-success custom-button2"
          onClick={handle_StudReg}
        >
          Loaddding ...
        </button>
      )}
      {!loadingsstd && (
        <button
          type="button"
          class="btn btn-success custom-button2"
          onClick={handle_StudReg}
        >
          submit
        </button>
      )}
      {/* this is for adding Department  */}
      <hr></hr>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">
            Department :
          </label>
        </div>
        <div class="col-auto">
          <input
            type="text"
            id="inputPassword6"
            class="form-control"
            value={depPost}
            onChange={(e) => setdepPost(e.target.value)}
          />
        </div>
      </div>
      {/* for adding cource */}
      <div class="btn-group">
        <button
          class="btn btn-secondary dropdown-toggle custom-button"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          Couers
        </button>
        <ul class="dropdown-menu">
          {getCor.map((cor) => (
            <li className="custem_list" key={cor._id}>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={cor._id}
                  id={`checkbox-${cor._id}`}
                  onChange={handle_checkbox}
                  checked={courPost.includes(cor._id)}
                />
                <label class="form-check-label" htmlFor={`checkbox-${cor._id}`}>
                  {cor.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {loadingsdep && (
        <button
          type="button"
          class="btn btn-success custom-button2"
          onClick={hadle_depReg}
        >
          Loadding ...
        </button>
      )}
      {!loadingsdep && (
        <button
          type="button"
          class="btn btn-success custom-button2"
          onClick={hadle_depReg}
        >
          submit
        </button>
      )}
      <hr />
      {/* this is form adding cource */}
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">
            Cource Name :
          </label>
        </div>
        <div class="col-auto">
          <input
            type="text"
            id="inputPassword6"
            class="form-control"
            value={cours}
            onChange={(e) => setCours(e.target.value)}
          />
        </div>
      </div>
      {loadings && (
        <button
          type="button"
          class="btn btn-success custom-button2"
          onClick={handle_courPost}
        >
          loadding...
        </button>
      )}
      {!loadings && (
        <button
          type="button"
          class="btn btn-success custom-button2"
          onClick={handle_courPost}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Addstudent;
