/**
 * name : configs/mongodb
 * author : Aman Gupta
 * Date : 22-Oct-2022
 * Description : Mongodb connections configurations
 */

//Dependencies
import mongoose from "mongoose";
import mongoose_autopopulate from 'mongoose-autopopulate'
import mongoose_timestamp from 'mongoose-timestamp'

export default function () {
  const db = mongoose.createConnection("mongodb://127.0.0.1:27017/portfolio", {
    useNewUrlParser: true,
  });

  db.on("error", function () {
    console.log("Database connection error:");
  });

  db.once("open", function () {
    console.log("Connected to DB");
  });

  mongoose.plugin(mongoose_timestamp, {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  });

  mongoose.plugin(mongoose_autopopulate);
  global.db = db;
};
