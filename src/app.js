const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


app.get("/test", (req, res) => {
  res.send({ firstName: "Shreyash", lastName: "Mehta" });
});

app.post("/test", (req, res) => {
  res.send("Data saved successfully");
});

app.delete("/test", (req, res) => {
  res.send("Data deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("Hello 10000 times from the test server!");
});



// app.use("/", (req, res) => {
//     res.send("Hello from the server!");
//   });

app.use("/demo", (req, res) => {
  res.send("Hello from the demo server!");
});
