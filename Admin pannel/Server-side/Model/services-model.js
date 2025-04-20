const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  title: { type: String, require: true },
  image: { type: String, required: true },
  price: { type: String, require: true },
});

const seriveModel = new model("Service", ServiceSchema);

module.exports = seriveModel;
