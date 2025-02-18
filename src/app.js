const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User is added successfully!");
  } catch (err) {
    res.status(500).send("Error saving the user:", +err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const user = await User.findOne();
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } 
  // try {
  //   const users = await User.find({ emailId: userEmailId });
  //   if (users.length === 0) {
  //     res.status(404).send("User not found");
  //   } else {
  //     res.send(users);
  //   }
  // } 
  catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("Something went wrong");
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
