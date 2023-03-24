const {
  successResponse,
  failureResponse,
  hashPassword,
  comparePassword,
  generateToken,
  generateRandom,
} = require("../generics/utilities");
const HTTP_STATUS_CODE = require("../constants/http-status");
const API_MESSAGES = require("../constants/api-messages");
const APP_CONSTANTS = require("../constants/app-constants");
const UsersData = require("../models/users/queries");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class AccountService {
  static async create(bodyData) {
    try {
      await UsersData.create(bodyData);
      return successResponse({
        message: API_MESSAGES.USER_CREATED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODE.created,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findUser(userId) {
    try {
      const result = await UsersData.findById(userId);
      return successResponse({
        message: API_MESSAGES.USER_FETCHED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODE.ok,
        result,
      });
    } catch (error) {
      throw error;
    }
  }
};
