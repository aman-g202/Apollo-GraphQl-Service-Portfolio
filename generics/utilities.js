/**
 * name : utility.js
 * author : Aman Gupta
 * created-date : 27-Oct-2022
 * Description : Utils helper function.
 */

const bcryptJs = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const path = require("path");
const CryptoJS = require("crypto-js");
const APP_CONSTANTS = require("../constants/app-constants");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

const successResponse = ({
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

const failureResponse = ({
  message = "Oops! Something Went Wrong.",
  statusCode = 500,
  responseCode,
}) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.responseCode = responseCode;
  return error;
};

const generateToken = (tokenData, secretKey, expiresIn) => {
  return jwt.sign(tokenData, secretKey, { expiresIn });
};

const hashPassword = (password) => {
  const salt = bcryptJs.genSaltSync(10);
  return bcryptJs.hashSync(password, salt);
};

const comparePassword = (password1, password2) => {
  return bcryptJs.compareSync(password1, password2);
};

const clearFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
};

const getDateTime = (dateTime) => {
  return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
};

const getFutureDateTime = (dateTime, days) => {
  return moment(dateTime.setDate(dateTime.getDate() + days)).format(
    "YYYY-MM-DD HH:mm:ss"
  );
};

const generateRandom = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const fileSystem = (dirPath) => {
  try {
    let file = path.join(__dirname, `../${ dirPath}`);
    if (!fs.existsSync(file)) {
      fs.mkdirSync(file);
    }
  } catch (error) {
    throw error;
  }
}

const cryptoJS = {
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

const reverseNum = (n) => {
  const r = n.toString().split("").reverse().join("");
  return Math.sign(n) * parseInt(r);
};

const validatePayment = (body = {}, signature) => {
  return validatePaymentVerification(body, signature, APP_CONSTANTS.razorPaySecret);
};

module.exports = {
  successResponse,
  failureResponse,
  generateToken,
  hashPassword,
  comparePassword,
  clearFile,
  getDateTime,
  getFutureDateTime,
  generateRandom,
  fileSystem,
  cryptoJS,
  reverseNum,
  validatePayment,
};
