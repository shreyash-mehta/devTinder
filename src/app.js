const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  
  const user = new User(req.body);
  try{
    await user.save();
    res.send("User is added successfully!");
  }
  catch(err){
    res.status(500).send("Error saving the user:", + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connected to the Database");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database");
  });
