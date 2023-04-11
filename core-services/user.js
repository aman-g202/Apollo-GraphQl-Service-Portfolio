import {
  successResponse,
  failureResponse,
  hashPassword,
  comparePassword,
  generateToken,
  generateRandom,
} from "../generics/utilities.js";
import HTTP_STATUS_CODE from "../constants/http-status.js";
import * as API_MESSAGES from "../constants/api-messages.js";
import APP_CONSTANTS from "../constants/app-constants.js";
import UsersData from "../models/users/queries.js";

export default class UserService {
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
      if (!result) {
        throw failureResponse({
          message: API_MESSAGES.USER_NOT_FOUND,
          statusCode: HTTP_STATUS_CODE.not_found,
          responseCode: 'CLIENT_ERROR'
        })
      }
      return successResponse({
        message: API_MESSAGES.USER_FETCHED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODE.ok,
        result,
      });
    } catch (error) {
      throw error;
    }
  }
}
