const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require("../users/schema");

const ServiceSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: User,
  },
  title: String,
  subTitle: String,
  imagePath: String,
  heading: String,
  description: String,
});

const Service = db.model("services", ServiceSchema);

module.exports = Service;
