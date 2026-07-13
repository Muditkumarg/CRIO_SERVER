let express = require("express");
let employee_router = express.Router();

let empImageUpload = require("../Files/EmployeeProfile");

let {
  PostEmployeeAPI,
  GetEmployeeApi,
  UpdateEmployeeApi,
  UpdateEmployeeApiById,
  DeleteEmployeeApiById,
} = require("../Controller/Employee_controller");

employee_router.post("/api/post/employee", PostEmployeeAPI);
employee_router.get("/api/get/employee", GetEmployeeApi);
employee_router.put("/api/update/byemail", empImageUpload, UpdateEmployeeApi);

employee_router.put("/api/update/byid/:id", UpdateEmployeeApiById);
employee_router.delete("/api/delete/byid/:id", DeleteEmployeeApiById);

module.exports = employee_router;
