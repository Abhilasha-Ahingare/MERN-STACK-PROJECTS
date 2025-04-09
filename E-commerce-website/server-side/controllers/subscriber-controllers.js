const sub = require("../model/subscriber-model");

const subscription = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    // check if the email is already subscribed
    let subscriber = await sub.findOne({ email });
    if (subscriber) {
      return res.status(404).json({ message: "Email is already subscriber" });
    }

    //create a new subscriber
    subscriber = new sub({ email });
    await subscriber.save();
    return res
      .status(201)
      .json({ message: "successfully subscribed to the newsletter !" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = { subscription };
