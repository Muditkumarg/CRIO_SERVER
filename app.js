let express = require("express");
let router = require("./Routes/Route");
let cors = require("cors");
let mongoose = require("./Database/db");
let employee_router = require("./Routes/Employee_route");

let app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hospital-crio-ant394wp2-crio4.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  console.log("HTTP: " + req.method + req.url);
  next();
});

app.use("/", router);
app.use("/", employee_router);

app.listen(5000, () => {
  console.log("port 5000 is activate");
});
