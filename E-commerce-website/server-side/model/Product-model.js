const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
      require: true,
    },
    color: {
      type: [String],
      require: true,
    },
    productCollection: {
      type: String,
      require: true,
    },
    material: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Other"],
    },
    images: [
      {
        url: {
          type: String,
          require: true,
        },
        altTex: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

module.exports = model("product", productSchema);
