const Product = require("../model/Product-model");
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
      dimensions,
      weight,
      sku,
      tags,
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
      dimensions,
      weight,
      sku,
      tags,
      user: req.user.id,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
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
      dimensions,
      weight,
      sku,
      tags,
    } = req.body;

    //find product by ID

    const product = await Product.findById(req.params.id);

    if (product) {
      // update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = counIsStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.color = color || product.color;
      product.productCollection = productCollection || product.productCollection;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured != undefined ? isFeatured : product.isFeatured;
      product.isPublished != undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updateProducts = await product.save();
      res.status(201).json({
        message: "Product updated successfully",
        product: updateProducts,
      });
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "check update server" });
  }
};

module.exports = { createProduct, updateProduct };
