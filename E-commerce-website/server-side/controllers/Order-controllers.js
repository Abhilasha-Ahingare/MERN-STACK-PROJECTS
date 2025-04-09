const cart = require("../model/cart");
const Checkout = require("../model/CheckOut-model");
const ProductModel = require("../model/Product-model");
const order = require("../model/Order-model");

const MyOrders = async (req, res) => {
  try {
    // find orders for the auth user
    const Orders = await order.find({ user: req.user?.id }).sort({
      createdAt: -1,
    }); //sort by most react orders
    return res.status(201).json(Orders);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

// full order details by id

const OrderDetails = async (req, res) => {
  try {
    const Orders = await order
      .findById(req.params?.id)
      .populate("user", "name email");
    if (!Orders) {
      return res.status(404).json({ message: "order not found" });
    }
    return res.status(201).json(Orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

module.exports = { MyOrders, OrderDetails };
