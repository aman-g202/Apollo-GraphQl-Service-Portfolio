/**
 * name : healthCheckService.js.
 * author : Aman Karki.
 * created-date : 17-Dec-2021.
 * Description : Health check helper functionality.
 */

// Dependencies

import { v1 as uuidv1 } from "uuid";
import { health_check as _health_check } from "./mongodb.js";

const obj = {
  MONGO_DB: {
    NAME: "Mongo.db",
    FAILED_CODE: "MONGODB_HEALTH_FAILED",
    FAILED_MESSAGE: "Mongo db is not connected",
  },
  NAME: "CrowdKuberaServiceHealthCheck",
  API_VERSION: "1.0",
};

export const health_check = async function (req, res) {
  let checks = [];
  let mongodbConnection = await _health_check();

  checks.push(checkResult("MONGO_DB", mongodbConnection));

  let checkServices = checks.filter((check) => check.healthy === false);

  let result = {
    name: obj.NAME,
    version: obj.API_VERSION,
    healthy: checkServices.length > 0 ? false : true,
    checks: checks,
  };

  let responseData = response(req, result);
  res.status(200).json(responseData);
};

let checkResult = function (serviceName, isHealthy) {
  return {
    name: obj[serviceName].NAME,
    healthy: isHealthy,
    err: !isHealthy ? obj[serviceName].FAILED_CODE : "",
    errMsg: !isHealthy ? obj[serviceName].FAILED_MESSAGE : "",
  };
};

export const healthCheckStatus = function (req, res) {
  const result = {
    name: obj.NAME,
    version: obj.API_VERSION,
    healthy: true,
  };
  const responseData = response(req, result);
  res.status(200).json(responseData);
};

let response = function (req, result = {}) {
  return {
    id: "DigitalKey.API",
    ver: "1.0",
    ts: new Date(),
    params: {
      resmsgid: uuidv1(),
      msgid: req.headers["msgid"] || req.headers.msgid || uuidv1(),
      status: "successful",
      err: "null",
      errMsg: "null",
    },
    status: 200,
    result: result,
  };
};
