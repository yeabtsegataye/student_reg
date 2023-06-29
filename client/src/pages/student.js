// ModalPage.js
import useStudDetail from "../hook/studDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Usedep } from "../hook/usedep";
import axios from "axios";

const ModalPage = () => {
  const { departments } = Usedep();
  const [stdName, setStdName] = useState("");
  const [stdDepartment, setStdDepartment] = useState("");
  const [stdID, setStdID] = useState("");
  ////////////////////////
  const history = useNavigate();
  const { id } = useParams();
  const api = `http://localhost:8000/api/student/${id}`;
  const { studInfo } = useStudDetail(api);
  /////////////////////
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  ////////////////////////
  const handleCloseModal = () => {
    history("/");
  };
  //////////////
  const handle_edit = () => {
    const elements = document.getElementById("scripteble");
    elements.style.display = "block";
  };
  /////////
  const handle_submit = async () => {
    console.log("thedatas", stdName, stdDepartment, stdID);
    try {
      const data = await axios.put(
        api,
        { name: stdName, ID: stdID, department: stdDepartment },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////
  return (
    <div className="container">
      <div className="student_detail row borders">
        <div className="col">
          <div className="lists">
            <h3>Name : </h3>
            {studInfo.name}
          </div>
          <div className="lists">
            <h3>Stud ID : </h3>
            {studInfo.ID}
          </div>
          {studInfo.department && studInfo.department.length > 0 && (
            <>
              <div className="lists">
                <h3>Department :</h3>
                <p>{studInfo.department[0].name} </p>
              </div>
            </>
          )}

          {studInfo.department &&
            studInfo.department.length > 0 &&
            studInfo.department[0].courses &&
            studInfo.department[0].courses.length > 0 && (
              <>
                <div>
                  <h3>Courses :</h3>
                  {studInfo.department[0].courses.map((cor) => (
                    <ul key={cor._id}>
                      <li>{cor.name}</li>
                    </ul>
                  ))}
                </div>
              </>
            )}
        </div>
        {/* for editing name */}
        <div className="col borders" id="scripteble">
          <a name="show"></a>
          <div className="lists">
            <h3>Name : </h3>
            <input
              type="text"
              defaultValue={studInfo.name}
              onChange={(e) => setStdName(e.target.value)}
            />
          </div>
          <div className="lists">
            <h3>Stud ID : </h3>
            <input
              type="text"
              defaultValue={studInfo.ID}
              onChange={(e) => setStdID(e.target.value)}
            />
          </div>

          <div class="btn-group custum_dropdown">
            <span>
              <h3>Department : </h3>
            </span>

            <button
              class="btn btn-secondary dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              Department
            </button>
            <ul class="dropdown-menu">
              {departments &&
                departments.map((deps) => (
                  <div className="form-check" key={deps._id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="departmentsList"
                      id="flexRadioDefault1"
                      value={deps._id}
                      onChange={(e) => setStdDepartment(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="departmentsList"
                    >
                      {deps.name}
                    </label>
                  </div>
                ))}
            </ul>
          </div>
          <div>
            <button className="btn btn-outline-success" onClick={handle_submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <button className="btn btn-outline-success" onClick={handleCloseModal}>
        back
      </button>
      <a href="#show">
        <button className="btn btn-outline-success" onClick={handle_edit}>
          Edit
        </button>
      </a>
    </div>
  );
};

export default ModalPage;
