const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require("../users/schema");

const PortFolioSchema = new mongoose.Schema({
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
      type: String,
      path: String,
    },
    {
      type: String,
      path: String,
    },
  ],
});

const PortFolio = db.model("portfolios", PortFolioSchema);

module.exports = PortFolio;
