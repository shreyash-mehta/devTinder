const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/admin", adminAuth);

app.get("/user/data", userAuth, (req, res, next) => {
  res.send("user has sent the data");
});

app.get("/user/login",(req, res, next) => {
  res.send("User has logged in successfully!");
});

app.get("/admin/getData", (req, res, next) => {
  res.send("data is sent by the admin");
});

app.get("/admin/deleteData", (req, res, next) => {
  res.send("data is deleted by the admin");
});
