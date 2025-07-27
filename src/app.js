const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const cors = require("cors");
const http = require("http");

require("dotenv").config();
require("./utils/cron");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter)


const server = http.createServer(app);
initializeSocket(server);


connectDB()
  .then(() => {
    console.log("Connected to the Database");
    server.listen(process.env.PORT, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database");
  });
