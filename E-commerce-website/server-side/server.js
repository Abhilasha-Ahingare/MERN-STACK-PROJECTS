require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conncetDB = require("./utlit/db.js");
const userRouter = require("./router/user-Router.js");
const productRouter = require("./router/product-router.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await conncetDB(); // Call the database connection function
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
