/**
 * name : index.js.
 * author : Aman Gupta.
 * created-date : 17-Dec-2021.
 * Description : Health check Root file.
*/

import { healthCheckStatus, health_check } from "./health-check.js";

export default function (app) {
    app.get("/healthCheckStatus",healthCheckStatus);
    app.get("/health",health_check);
}