const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shreyashmehta001:dKH1YS3l7PQFDl7b@node.4kgay.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };


