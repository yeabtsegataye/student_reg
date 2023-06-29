const express = require("express");
const Router = express.Router();
const {
  handle_Check,
  handle_Courses,
  handle_Department,
  handle_Students,
  handle_getDepartment,
  handle_getcourse,
  handle_allStudent,
  handle_StudUpdate,
  handle_getstudID,
} = require("../controller/controller");

Router.get("/", handle_Check);
Router.post("/api/student", handle_Students);
Router.post("/api/department", handle_Department);
Router.post("/api/coures", handle_Courses);
//
Router.get("/api/department", handle_getDepartment);
Router.get("/api/coures", handle_getcourse);
Router.get("/api", handle_allStudent);
Router.get(`/api/student/:id`, handle_getstudID);
//
Router.put("/api/student/:id", handle_StudUpdate);
//

module.exports = Router;
