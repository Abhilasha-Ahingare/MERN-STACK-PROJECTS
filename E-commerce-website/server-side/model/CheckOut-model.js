const { Schema, model } = require("mongoose");

const CheckoutItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sizes: String,
    color: String,
  },
  { _id: false }
);

const CheckoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CheckoutItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      county: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: "PENDING",
    },
    paymentDetails: {
      type: Schema.Types.Mixed,
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    isFinalizedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Checkout", CheckoutSchema);
