let auth_data = require("../Model/auth_schema");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let dotenv = require("dotenv");
dotenv.config();

let SECRET_KEY = process.env.SECRET_KEY;

// let SignUp = async (req, res) => {
//   console.log(req.body);

//   let { name, email, password, confirmPassword } = req.body;

//   try {
//     let existing_user = await auth_data.findOne({ email: email });
//     if (existing_user) {
//       return res
//         .status(409)
//         .json({ success: false, message: "User already exist" });
//     }

//     let data = await auth_data({
//       name: name,
//       email: email,
//       password: password,
//       confirmPassword: confirmPassword,
//     }).save();
//     return res
//       .status(201)
//       .json({ success: true, message: "Record created successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };

let SignUp = async (req, res) => {
  let { name, email, password, confirmPassword, role } = req.body;

  try {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password does'nt match" });
    }

    let existing_user = await auth_data.findOne({ email: email });

    if (existing_user) {
      return res
        .status(409)
        .json({ success: false, message: "user already exist" });
    }

    let hash_password = await bcrypt.hash(password, 10);
    let hash_confirm_password = await bcrypt.hash(confirmPassword, 10);

    let data = await auth_data({
      name: name,
      email: email,
      password: hash_password,
      confirmPassword: hash_confirm_password,
      role: role,
    }).save();

    let token = jwt.sign({ email: data.email }, SECRET_KEY);

    return res.status(201).json({
      success: true,
      message: "Registration successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

let Login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let existing_user = await auth_data.findOne({ email: email });

    if (!existing_user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    let matched_password = await bcrypt.compare(
      password,
      existing_user.password,
    );

    if (!matched_password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credential" });
    }

    let token = jwt.sign({ email: existing_user.email }, SECRET_KEY);

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token: token,
      role: existing_user.role,
      email: existing_user.email,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = { SignUp, Login };
