const Product = require("../model/Product-model"); // Capitalize model name
const User = require("../model/user-model");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      counIsStock,
      category,
      brand,
      sizes,
      color,
      productCollection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      dimension,
      weight,
      sku,
    } = req.body;

    // Create new product using capitalized Product model
    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      counIsStock,
      category,
      brand,
      sizes,
      color,
      productCollection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      dimension,
      weight,
      sku,
      user: req.user.id
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ 
      message: "Product created successfully",
      product: savedProduct 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

module.exports = { createProduct };