const User = require("../Model/user-model");
const Contact = require("../Model/contact-model");
const Service = require("../Model/services-model");

// get all user data
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "user data not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//single user by id
const SingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

//update user
const UpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const UpdateUserData = req.body;

    const UpdateUser = await User.updateOne(
      { _id: id },
      { $set: UpdateUserData }
    );
    return res.status(201).json(UpdateUser);
  } catch (error) {
    next(error);
  }
};

//delete user data
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(201).json({ message: "user deleted successfuly" });
  } catch (error) {
    next(error);
  }
};

// get contact data
const getAllContact = async (req, res, next) => {
  try {
    const UserContact = await Contact.find();

    if (!UserContact || UserContact.length === 0) {
      return res.status(404).json({ message: "user data not found" });
    }

    return res.status(200).json(UserContact);
  } catch (error) {
    next(error);
  }
};

//delete contact
const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    res.status(201).json({ message: "contact deleted successfuly" });
  } catch (error) {
    next(error);
  }
};

// get services data
const getAllService = async (req, res, next) => {
  try {
    const UserService = await Service.find();

    if (!UserService || UserService.length === 0) {
      return res.status(404).json({ message: "user data not found" });
    }

    return res.status(200).json(UserService);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContact,
  getAllService,
  deleteUser,
  SingleUser,
  UpdateUser,
  deleteContact,
};
