let multer = require("multer");

let storage1 = multer.diskStorage({
  destination: "employee_Image",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let empImageUpload = multer({
  storage: storage1,
}).fields([{ name: "empImage" }]);

module.exports = empImageUpload;
