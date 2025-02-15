const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/user/:userId/:name/:city", (req, res) => {
  console.log(req.params);
  res.send("Hello 10000 times from the test server!");
});



// app.use("/", (req, res) => {
//     res.send("Hello from the server!");
//   });

// app.use("/demo", (req, res) => {
//   res.send("Hello from the demo server!");
// });
