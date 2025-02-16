const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/test", (req, res, next) => {
  console.log("Server handler 1");
  next();
});

app.use(
  "/test",
  (req, res, next) => {~
    console.log("Server handler 2");
    next();
  },
  (req, res) => {
    console.log("Server handler 3");
    res.send("Response 3!!");
  }
);
