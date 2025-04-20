const Contact = require("../Model/contact-model");

const contactFrom = async (req, res) => {
  try {
    const response = req.body;
     await Contact.create(response);
    //  console.log(response)
  return  res.status(200).json({ message: "message send successfully" });
  } catch (error) {
    return res.status(401).json({message:"something is wrong"})
  }
};

module.exports = contactFrom;
