import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;
import User from "../users/schema.js";

const ServiceSchema = new Schema({
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

export default Service;
