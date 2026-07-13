let mongoose = require("mongoose");

let dotenv = require("dotenv");
dotenv.config();

// let mongo_db_url = process.env.mongo_db_url;
console.log(process.env.mongo_db_url);

mongoose
  .connect(process.env.mongo_db_url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database not connected>......");
    console.log(err);
  });

module.exports = mongoose;
