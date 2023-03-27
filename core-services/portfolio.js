import {
    successResponse,
    failureResponse
  } from "../generics/utilities.js";
  import HTTP_STATUS_CODE from "../constants/http-status.js";
  import * as API_MESSAGES from "../constants/api-messages.js";
  import APP_CONSTANTS from "../constants/app-constants.js";
  import PortfolioData from "../models/portfolios/queries.js";
  
  export default class PortfolioHelper {
    static async create(bodyData) {
      try {
        await PortfolioData.create(bodyData);
        return successResponse({
          message: API_MESSAGES.PORTFOLIO_CREATED_SUCCESSFULLY,
          statusCode: HTTP_STATUS_CODE.created,
        });
      } catch (error) {
        throw error;
      }
    }
  
    static async list() {
      try {
        const result = await PortfolioData.find({ query: {} });
        return successResponse({
          message: API_MESSAGES.PORTFOLIOS_FETCHED_SUCCESSFULLY,
          statusCode: HTTP_STATUS_CODE.ok,
          result,
        });
      } catch (error) {
        throw error;
      }
    }
  }
  