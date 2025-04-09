require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conncetDB = require("./utlit/db.js");
const userRouter = require("./router/user-Router.js");
const productRouter = require("./router/product-router.js");
const CartRouter = require("./router/cart-router.js");
const checkoutRouter = require("./router/checkout-router.js");
const orderRouter = require("./router/order-router.js");
const uploadRouter = require("./router/UpLoad-router.js");
const subscriberRouter = require("./router/subscriber-router.js");
const adminRouter = require("./router/admin-router.js");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", CartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/subsctiber", subscriberRouter);

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
