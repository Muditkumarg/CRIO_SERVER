let employee_data = require("../Model/Employee_schema");

let PostEmployeeAPI = async (req, res) => {
  console.log(req.body);

  let {
    empId,
    empName,
    empEmail,
    empPhone,
    empDateOfBirth,
    empAddress,
    empDateOfJoinig,
    empDepartment,
    empDesignation,
  } = req.body;

  try {
    let existing_user = await employee_data.findOne({ empEmail: empEmail });
    if (existing_user) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }

    let data = await employee_data({
      empId: empId,
      empName: empName,
      empEmail: empEmail,
      empPhone: empPhone,
      empDateOfBirth: empDateOfBirth,
      empAddress: empAddress,
      empDateOfJoinig: empDateOfJoinig,
      empDepartment: empDepartment,
      empDesignation: empDesignation,
    }).save();
    return res
      .status(201)
      .json({ success: true, message: "Record created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

let GetEmployeeApi = async (req, res) => {
  try {
    let data = await employee_data.find();
    return res
      .status(200)
      .json({ success: true, message: "Data get successfully", data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

let UpdateEmployeeApi = async (req, res) => {
  // console.log(req.body);

  let empImage = req.files.empImage[0].filename;
  let {
    empId,
    empName,
    empEmail,
    empPhone,
    empDateOfBirth,
    empAddress,
    empDateOfJoinig,
    empDepartment,
    empDesignation,
  } = req.body;

  try {
    let existing_employee = await employee_data.findOne({ empEmail: empEmail });

    if (!existing_employee) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    if (req.files) {
      let update_employee = await employee_data.updateOne(
        { empEmail: empEmail },
        {
          $set: {
            empImage: empImage,
          },
        },
      );
      return res
        .status(200)
        .json({ success: true, message: "Profile pic update successfully" });
    }

    let update_employee = await employee_data.updateOne(
      { empEmail: empEmail },
      {
        $set: {
          empId: empId,
          empName: empName,
          empEmail: empEmail,
          empPhone: empPhone,
          empDateOfBirth: empDateOfBirth,
          empAddress: empAddress,
          empDateOfJoinig: empDateOfJoinig,
          empDepartment: empDepartment,
          empDesignation: empDesignation,
        },
      },
    );
    return res
      .status(200)
      .json({ success: true, message: "record update successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

let UpdateEmployeeApiById = async (req, res) => {
  console.log(req.body);
  console.log(req.params);

  let { id } = req.params;
  let {
    empId,
    empName,
    empEmail,
    empPhone,
    empDateOfBirth,
    empAddress,
    empDateOfJoinig,
    empDepartment,
    empDesignation,
  } = req.body;

  try {
    let update_employee = await employee_data.findByIdAndUpdate(id, {
      empId: empId,
      empName: empName,
      empEmail: empEmail,
      empPhone: empPhone,
      empDateOfBirth: empDateOfBirth,
      empAddress: empAddress,
      empDateOfJoinig: empDateOfJoinig,
      empDepartment: empDepartment,
      empDesignation: empDesignation,
    });

    if (!update_employee) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    return res.status(200).json({ success: true, message: "Record updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};

let DeleteEmployeeApiById = async (req, res) => {
  let { id } = req.params;

  console.log(id);

  try {
    let delete_data = await employee_data.findByIdAndDelete(id);

    if (!delete_data) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  PostEmployeeAPI,
  GetEmployeeApi,
  UpdateEmployeeApi,
  UpdateEmployeeApiById,
  DeleteEmployeeApiById,
};
