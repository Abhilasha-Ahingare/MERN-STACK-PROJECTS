const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    name: String,
    images: String,
    price: Number,
    sizes: String,
    color: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema);
