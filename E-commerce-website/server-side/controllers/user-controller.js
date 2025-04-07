const User = require("../model/user-model");
const jwt = require("jsonwebtoken");

//registration

const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Check if user was created successfully
    if (!newUser) {
      return res.status(400).json({
        message: "Failed to create user",
      });
    }

    // create jwt palyload
    const palyload = { user: { _id: newUser._id, role: newUser.role } };

    jwt.sign(
      palyload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "6h" },
      (err, token) => {
        if (err) throw err;

        // send the user token as respons
        res.status(201).json({
          message: "User registered successfully",
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: error.message || "Internal server error during registration",
    });
  }
};

// login

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const comparePassword = await userExists.matchPassword(password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // create jwt payload
    const palyload = { user: { _id: userExists._id, role: userExists.role } };

    jwt.sign(
      palyload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "6h" },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          message: "User login successfully",
          user: {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            role: userExists.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({
      message: error.message || "Internal server error during registration",
    });
  }
};

//user profile
const profile = async (req, res) => {
  res.json(req.User);
};





// Export as an object with named functions
module.exports = { registration, login, profile };
