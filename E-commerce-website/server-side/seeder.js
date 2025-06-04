const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ProductMdole = require("./model/Product-model");
const UserMdole = require("./model/user-model");
const cartMdole = require("./model/cart");
const products = require("./data/products");
const User = require("./model/user-model");

dotenv.config();

//connect to mongoDb
mongoose.connect(process.env.MONOGDB_URL);

// function to send data

const seedData = async () => {
  try {
    // clear existing data
    await ProductMdole.deleteMany();
    await UserMdole.deleteMany();
    await cartMdole.deleteMany();


    // create a default admin user

    const createUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "1234567",
      role: "admin",
    });

    // assign the default user id to each product
    const userId = createUser._id;

    const simpleProducts = products.map((products) => {
      return { ...products, userId };
    });

    //insert the product into the database

    await ProductMdole.insertMany(simpleProducts);
    console.log("product data seeded successfuly");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data");
    process.exit(1);
  }
};

seedData();
