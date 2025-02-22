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
    res.status(400).send("Error saving the user:" + err.message);
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
  } catch (err) {
    // try {
    //   const users = await User.find({ emailId: userEmailId });
    //   if (users.length === 0) {
    //     res.status(404).send("User not found");
    //   } else {
    //     res.send(users);
    //   }
    // }
    res.status(400).send("Something went wrong");
  }
});

// app.get("/findById", async (req, res) => {
//   const Id = req.body._id;

//   try {
//     const idData = await User.findById({ _id: Id });
//     res.send(idData);
//   } catch (err) {
//     res.status(400).send("Id not found");
//   }
// });

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.patch("/patch/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data);

  const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "age", "gender"];

  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong: " + err.message);
  }
});

// app.patch("/patch2", async (req, res) => {
//   const userEmail = req.body.emailId;
//   const data = req.body;
//   console.log(data);
//   try {
//     const user = await User.findOneAndUpdate({ emailId: userEmail }, data, {returnDocument: "after"});
//     console.log(user);
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(404).send("Something went wrong");
//   }
// });

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
