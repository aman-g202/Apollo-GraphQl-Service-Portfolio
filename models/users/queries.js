import { ObjectId } from "mongodb";
import User from "./schema.js";
export default class UserData {
  static findOne(filter, projection = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await User.findOne(filter, projection);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findById(_id, projection = {}) {
    _id = new ObjectId(_id);
    return new Promise(async (resolve, reject) => {
      try {
        const data = await User.findById(_id, projection);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByIdAndUpdate(_id, data) {
    _id = new ObjectId(_id);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await User.findByIdAndUpdate(_id, data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByIdAndDelete(_id) {
    _id = new ObjectId(_id);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await User.findByIdAndDelete(_id);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByAggregate(query = []) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await User.aggregate(query);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new User(data).save();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static find({ query, skip = 0, limit = 0 }, projection = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await User.find(query, projection);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static count(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await User.countDocuments(query).exec();
        resolve(count);
      } catch (error) {
        reject(error);
      }
    });
  }

  static update(filter, update, option = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await User.updateOne(filter, update, option);
        if (
          (res.n === 1 && res.nModified === 1) ||
          (res.matchedCount === 1 && res.modifiedCount === 1)
        ) {
          resolve("ENTITY UPDATED");
        }
        if (
          (res.n === 1 && res.nModified === 0) ||
          (res.matchedCount === 1 && res.modifiedCount === 0)
        ) {
          resolve("ENTITY ALREADY EXISTS");
        } else {
          resolve("ENTITY NOT FOUND");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  static bulkUpdate(filter, update, option = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await User.updateMany(filter, update, option);
        if (
          (res.n >= 1 && res.nModified >= 1) ||
          (res.matchedCount >= 1 && res.modifiedCount >= 1)
        ) {
          resolve("ENTITY UPDATED");
        }
        if (
          (res.n >= 1 && res.nModified === 0) ||
          (res.matchedCount >= 1 && res.modifiedCount === 0)
        ) {
          resolve("ENTITY ALREADY EXISTS");
        } else {
          resolve("ENTITY NOT FOUND");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  static deleteMany(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await User.deleteMany(query);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
};
