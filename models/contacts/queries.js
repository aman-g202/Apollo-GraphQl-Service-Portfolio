import { ObjectId } from "mongodb";
import Contact from "./schema.js";
export default class UserData {
  static findOne(filter, projection = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Contact.findOne(filter, projection);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findById(_id, projection = {}) {
    _id = ObjectId(_id);
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Contact.findById(_id, projection);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByIdAndUpdate(_id, data) {
    _id = ObjectId(_id);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Contact.findByIdAndUpdate(_id, data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByIdAndDelete(_id) {
    _id = ObjectId(_id);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Contact.findByIdAndDelete(_id);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByAggregate(query = []) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Contact.aggregate(query);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new Contact(data).save();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static find({ query, skip = 0, limit = 0 }, projection = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Contact.find(query, projection);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static count(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await Contact.countDocuments(query).exec();
        resolve(count);
      } catch (error) {
        reject(error);
      }
    });
  }

  static update(filter, update, option = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Contact.updateOne(filter, update, option);
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
        const res = await Contact.updateMany(filter, update, option);
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
        const data = await Contact.deleteMany(query);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
};
