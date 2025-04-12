const Product = require("../model/Product-model");
const User = require("../model/user-model");

// create product
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

// update a product  by ID
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id?.trim();

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Validate if ID is a valid MongoDB ObjectId
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

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
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished =
      isPublished !== undefined ? isPublished : product.isPublished;
    product.tags = tags || product.tags;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;
    product.sku = sku || product.sku;

    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// delete a product by ID

const deleteProduct = async (req, res) => {
  try {
    // find the product by id
    const productId = req.params.id?.trim();

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId).exec();

    if (product) {
      // remove the procdut from db
      await product.deleteOne();
      return res
        .status(200)
        .json({ message: "Product was deleted successfuly " });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// get all products with optionals query filter and sorting

const sortProducts = async (req, res) => {
  try {
    const {
      productCollection,
      sizes,
      gender,
      color,
      minPrice,
      MaxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // filter logic
    if (productCollection && productCollection.toLowerCase() !== "all") {
      query.productCollection = productCollection;
    }

    // category
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    // material
    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    // sizes
    if (sizes) {
      query.sizes = { $in: sizes.split(",") };
    }
    // colors
    if (color) {
      query.color = { $in: color.split(",") };
    }
    // gender
    if (gender) {
      query.gender = gender;
    }
    // min price maxprice
    if (minPrice || MaxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (MaxPrice) query.price.$lte = Number(MaxPrice);
    }
    // search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Enhanced sorting logic
    let sort = {};
    if (sortBy) {
      switch (sortBy.toLowerCase()) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDsc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1, numReviews: -1 };
          break;
        case "newest":
          sort = { createdAt: -1 };
          break;
        case "nameAsc":
          sort = { name: 1 };
          break;
        case "nameDsc":
          sort = { name: -1 };
          break;
        default:
          sort = { createdAt: -1 };
          break;
      }
    }

    // fetch products and apply sorting and limits
    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit || 12));
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error in sortProducts:", error);
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// new arrivals

const NewArrivals = async (req, res) => {
  try {
    // fetch latest 8 products
    const newArrivals = await Product.findOne()
      .sort({ createdAt: -1 })
      .limit(8);
    if (newArrivals) {
      return res.status(201).json(newArrivals);
    } else {
      return res.status(404).json({ message: "we not find best seller" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

//Best seler

const BestSeller = async (req, res) => {
  try {
    const bestSeller = await Product.findOne()
      .sort({ rating: -1 })
      .select("name price images color size");
    if (bestSeller) {
      return res
        .status(200)
        .json({ message: "Here are some best seller products", bestSeller });
    } else {
      return res
        .status(404)
        .json({ message: "We could not find any best seller products" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error: Best seller product not found",
      error: error.message,
    });
  }
};

//get a single product by id

const singleProduct = async (req, res) => {
  try {
    const productId = req.params.id?.trim();

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId).exec();

    if (product) {
      return res.status(200).json( product );
    } else {
      return res
        .status(404)
        .json({ message: "Product not found single proudct" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error not single product found",
    });
  }
};

// similar product  based on gender and category

const similarProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).exec();

    if (!product) {
      return res.status(404).json({ message: "Not find Similar product" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    return res.status(200).json({
      message: "similar products found successfully",
      similarProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding similar products",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  sortProducts,
  NewArrivals,
  BestSeller,
  singleProduct,
  similarProduct,
};
