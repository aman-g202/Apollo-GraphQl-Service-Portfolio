import {
  successResponse,
  failureResponse
} from "../generics/utilities.js";
import HTTP_STATUS_CODE from "../constants/http-status.js";
import * as API_MESSAGES from "../constants/api-messages.js";
import APP_CONSTANTS from "../constants/app-constants.js";
import ServiceData from "../models/services/queries.js";

export default class ServicesHelper {
  static async create(bodyData) {
    try {
      await ServiceData.create(bodyData);
      return successResponse({
        message: API_MESSAGES.SERVICE_CREATED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODE.created,
      });
    } catch (error) {
      throw error;
    }
  }

  static async list() {
    try {
      const result = await ServiceData.find({ query: {} });
      return successResponse({
        message: API_MESSAGES.SERVICES_FETCHED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODE.ok,
        result,
      });
    } catch (error) {
      throw error;
    }
  }
}
