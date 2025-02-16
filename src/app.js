const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/getData", (req, res, next) => {
  // try {
    throw new Error("dgfjfkdkddm");
  // } catch (err) {
    res.status(500).send("User Data sent");
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something last went wrong");
  }
});
