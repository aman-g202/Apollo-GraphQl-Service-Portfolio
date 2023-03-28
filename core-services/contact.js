import { successResponse, failureResponse } from "../generics/utilities.js";
import HTTP_STATUS_CODE from "../constants/http-status.js";
import * as API_MESSAGES from "../constants/api-messages.js";
import APP_CONSTANTS from "../constants/app-constants.js";
import ContactData from "../models/contacts/queries.js";

export default class ContactService {
  static async create(bodyData) {
    try {
      await ContactData.create(bodyData);
      return successResponse({
        message: API_MESSAGES.CONTACT_CREATED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODE.created,
      });
    } catch (error) {
      throw error;
    }
  }

  static async list() {
    try {
      const result = await ContactData.find({ query: {} });
      return successResponse({
        message: API_MESSAGES.CONTACTS_FETCHED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODE.ok,
        result,
      });
    } catch (error) {
      throw error;
    }
  }
}
