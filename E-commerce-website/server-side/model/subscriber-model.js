const { Schema, model } = require("mongoose");

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribeAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Subscriber", subscriberSchema);
