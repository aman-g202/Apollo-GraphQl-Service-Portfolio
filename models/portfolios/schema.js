import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;
import User from "../users/schema.js";

const PortFolioSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: User,
  },
  title: String,
  subTitle: String,
  bannerImagePath: String,
  heading: String,
  description: String,
  clientName: String,
  category: String,
  endDate: Date,
  galleryMedia: [
    {
      type: {
        type: String,
      },
      path: {
        type: String,
      },
    },
  ],
});

const PortFolio = db.model("portfolios", PortFolioSchema);

export default PortFolio;
