const serviceModel = require("../Model/services-model");

const service = async (req, res) => {
  try {
    const response = await serviceModel.find();

    if (!response) {
      res.status(404).json({ message: "no service found" });
    }
    return res.status(200).json({ message: response });
  } catch (error) {
    return res.status(401).json({ message: "service data not found" });
  }
};

module.exports = service;
