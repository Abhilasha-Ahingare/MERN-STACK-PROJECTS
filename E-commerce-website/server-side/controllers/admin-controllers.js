const User = require("../model/user-model");

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "sever error" });
  }
};

//new user admin
const UserAdminCreate = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let users = await User.findOne({ email });
    if (users) {
      return res.status(404).json({ message: "user already exists" });
    }

    users = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await users.save();
    return res.status(201).json({ message: "user created successfuly" });
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};

//update admin user information

const updateAdminUser = async (req, res) => {
  try {
    const users = await User.findById(req.params?.id);
    if (users) {
      users.name = req.body.name || users.name;
      users.email = req.body.email || users.email;
      users.role = req.body.role || users.role;
    }

    const updateUser = await users.save();
    return res
      .status(201)
      .json({ message: "user updated successfuly", users: updateUser });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

// remove admin user

const deleteAdminUser = async (req, res) => {
  try {
    const users = await User.findById(req.params?.id);
    if (users) {
      await users.deleteOne();
      return res.status(201).json({ message: "user deleted successfuly" });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
module.exports = {
  getAllUser,
  UserAdminCreate,
  updateAdminUser,
  deleteAdminUser,
};
