const cart = require("../model/cart");
const Checkout = require("../model/CheckOut-model");
const ProductModel = require("../model/Product-model");
const order = require("../model/Order-model");

//new checkout session

const CheckoutItem = async (req, res) => {
  const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!items || items.length === 0) {
    return res
      .status(404)
      .json({ message: "no item is present in checkout item" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user?.id,
      items: items,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });

    // console.log(`checkout created for user: ${req.user?.id}`);
    return res.status(201).json(newCheckout);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// put request

const checkoutPay = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkoutPay = await Checkout.findById(req.params?.id);
    if (!checkoutPay) {
      return res.status(404).json({ message: "checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkoutPay.isPaid = true;
      checkoutPay.paymentDetails = paymentDetails;
      checkoutPay.paidAt = Date.now();

      await checkoutPay.save();
      return res.status(200).json(checkoutPay);
    } else {
      return res.status(400).json({ message: "invalid payment status" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//check a finalize

const checkoutFinalize = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params?.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout session not found" });
    }

    // Check if already finalized
    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }

    // Check if payment is completed
    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Payment not completed yet" });
    }

    // Finalize order
    const finalOrder = await order.create({
      user: checkout.user,
      items: checkout.items,
      shippingAddress: checkout.shippingAddress,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: "paid",
      paymentDetails: checkout.paymentDetails,
      paymentMethod: checkout.paymentMethod,
      status: "PROCESSING", // Changed to match the enum values
    });

    checkout.isFinalized = true;
    checkout.isFinalizedAt = Date.now();

    await checkout.save();

    // Clear user cart
    await cart.findOneAndDelete({ user: checkout.user });

    return res.status(201).json(finalOrder);
  } catch (error) {
    console.error("Error finalizing checkout:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { CheckoutItem, checkoutPay, checkoutFinalize };
