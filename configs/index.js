/**
 * name : configs
 * author : Aman Kumar Gupta
 * Date : 27-Oct-2022
 * Description : Contains connections of all configs
 */

//Dependencies
import CreateMongoInstance from "./mongodb.js";
CreateMongoInstance();

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* __dirname is avilable only on common js module so written the polyfil to support es6 module */
global.__dirname = __dirname;
global.PROJECT_ROOT_DIRECTORY = path.join(__dirname, "..");

export default {};
