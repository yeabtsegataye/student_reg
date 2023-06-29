import React from "react";
import UpdateStudent from "./Update_Student";
import Addstudent from "./Add_student";

const Admin = () => {
  return (
    <div className="admin">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-AddStud"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Add student
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-UpdateStud"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Update student
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-AddStud"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          tabindex="0"
        >
          {<Addstudent />}
        </div>
        <div
          class="tab-pane fade"
          id="pills-UpdateStud"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
          tabindex="0"
        >
          {<UpdateStudent />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
