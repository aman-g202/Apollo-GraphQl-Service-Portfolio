const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require("../users/schema");

const ContactSchema = new mongoose.Schema({
  forUser: {
    type: ObjectId,
    ref: User,
  },
  name: String,
  email: String,
  message: String,
});

const Contact = db.model("contacts", ContactSchema);

module.exports = Contact;
