const user = require("../Model/user-model");

const HomePage = async (req, res) => {
  try {
    res.status(200).json({ message: "welcome to my page" });
  } catch (error) {
    console.log(error);
  }
};

// registration

const Registration = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await user.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user is already exist" });
    }

    const userCreated = await user.create({ username, email, phone, password });

    res.status(201).json({
      message: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(404).json({ message: "page not found" });
  }
};

// login from

const LoginFrom = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await user.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isValidPassword = await userExist.comparePassword(password);
    if (isValidPassword) {
      return res.status(200).json({
        message: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// user logic

const User = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({ message: userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { HomePage, Registration, LoginFrom, User };
