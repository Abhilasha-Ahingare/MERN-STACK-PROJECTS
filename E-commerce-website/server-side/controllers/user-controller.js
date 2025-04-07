const User = require("../model/user-model");

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

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: error.message || "Internal server error during registration",
    });
  }
};

// Export as an object with named functions
module.exports = { 
    registration: registration 
};
