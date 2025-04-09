const OrderModel = require("../model/Order-model");

const getAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate("user", "name email");
    return res.status(201).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "sever error" });
  }
};

//update the order details

const updateAdminOrderDetails = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    order.isDelivered = req.body.status === "DELIVERED";
    order.deliveredAt =
      req.body.status === "DELIVERED" ? Date.now() : order.deliveredAt;

    const updatedOrder = await order.save();
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// deleted order in admin user
const deleteAdminOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params?.id);
    if (order) {
      await order.deleteOne();
      return res.status(201).json({ message: "order remove" });
    } else {
      return res.status(404).json({ message: "order not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
module.exports = { getAllOrder, updateAdminOrderDetails, deleteAdminOrder };
