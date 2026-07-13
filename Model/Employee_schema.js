let mongoose = require("mongoose");

let employee_schema = mongoose.Schema({
  empId: {
    type: String,
    require: true,
  },
  empName: {
    type: String,
    require: true,
  },
  empEmail: {
    type: String,
    require: true,
  },
  empPhone: {
    type: String,
    require: true,
  },
  empId: {
    type: String,
    require: true,
  },
  empDateOfBirth: {
    type: String,
    require: true,
  },
  empAddress: {
    type: String,
    require: true,
  },
  empDateOfJoinig: {
    type: String,
    require: true,
  },
  empDepartment: {
    type: String,
    require: true,
  },
  empDesignation: {
    type: String,
    require: true,
  },
  empImage: {
    type: String,
    require: true,
  },
});

let employee_data = mongoose.model("employee_data", employee_schema);

module.exports = employee_data;
