/**
 * name : utility.js
 * author : Aman Gupta
 * created-date : 27-Oct-2022
 * Description : Utils helper function.
 */

import bcryptJs from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";
import moment from "moment";
import path from "path";
import CryptoJS from "crypto-js";
import APP_CONSTANTS from "../constants/app-constants.js";

export const successResponse = ({
  statusCode = 500,
  responseCode = "OK",
  message,
  result = [],
}) => {
  return {
    statusCode,
    responseCode,
    message,
    result,
  };
};

export const failureResponse = ({
  message = "Oops! Something Went Wrong.",
  statusCode = 500,
  responseCode,
}) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.responseCode = responseCode;
  return error;
};

export const generateToken = (tokenData, secretKey, expiresIn) => {
  return jwt.sign(tokenData, secretKey, { expiresIn });
};

export const hashPassword = (password) => {
  const salt = bcryptJs.genSaltSync(10);
  return bcryptJs.hashSync(password, salt);
};

export const comparePassword = (password1, password2) => {
  return bcryptJs.compareSync(password1, password2);
};

export const clearFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
};

export const getDateTime = (dateTime) => {
  return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
};

export const getFutureDateTime = (dateTime, days) => {
  return moment(dateTime.setDate(dateTime.getDate() + days)).format(
    "YYYY-MM-DD HH:mm:ss"
  );
};

export const generateRandom = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const dirExists = (dirPath) => {
  try {
    const file = path.join(__dirname, `../${dirPath}`);
    if (!fs.existsSync(file)) {
      fs.mkdirSync(file);
    }
  } catch (error) {
    throw error;
  }
};

export const cryptoJS = {
  encrypt: (data) => {
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      APP_CONSTANTS.cryptoKey,
      { iv: CryptoJS.enc.Base64.parse(APP_CONSTANTS.cryptoIvKey) }
    );
    return encryptedToken.toString();
  },
  decrypt: (paramToken) => {
    const decryptedParamToken = CryptoJS.AES.decrypt(
      paramToken.toString(),
      APP_CONSTANTS.cryptoKey,
      { iv: CryptoJS.enc.Base64.parse(APP_CONSTANTS.cryptoIvKey) }
    );
    return JSON.parse(decryptedParamToken.toString(CryptoJS.enc.Utf8));
  },
};

export const reverseNum = (n) => {
  const r = n.toString().split("").reverse().join("");
  return Math.sign(n) * parseInt(r);
};
