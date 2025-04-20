const mongoose = require("mongoose");

const URL = process.env.MONOGDB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("databse connection failed");
    process.exit(0);
  }
};

module.exports = connectDB;
