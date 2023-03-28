import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;
import User from "../users/schema.js";

const ContactSchema = new Schema({
  forUser: {
    type: ObjectId,
    ref: User,
  },
  name: String,
  email: String,
  message: String,
});

const Contact = db.model("contacts", ContactSchema);

export default Contact;
