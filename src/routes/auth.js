const express = require("express");
const User = require("../models/user");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User is added successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Please Enter Valid EmailId");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie({ expires: new Date(Date.now()) });
});

module.exports = authRouter;
