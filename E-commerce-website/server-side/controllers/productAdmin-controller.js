const ProductModel = require("../model/Product-model");

//get admin products

const getAllAdminProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(201).json(products);
  } catch (error) {
    return res.status(201).json({ message: "server error" });
  }
};

module.exports = { getAllAdminProducts };
