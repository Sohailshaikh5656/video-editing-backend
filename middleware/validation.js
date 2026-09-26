const jwt = require("jsonwebtoken");
const responseCode = require("../utilities/responseCode");

let bypassMethods = [
    "signup", "signin", "login", "verifyOTP", "resendOTP",
    "forgetPassword", "resetPassword", "adminLogin", "tokenCheck",
    "upload-profile", "checkMail"
];
require("dotenv").config();

/**
 * Sends a consistent API response, handling circular references safely.
 * If a circular structure is detected, returns a generic error message.
 */
function sendResponse(req, res, data) {
    // Fix: Ensure that data sent to res.send() is always safe for JSON.stringify
    try {
        // Support legacy usage
        if (!res || typeof res.status !== "function" || typeof res.send !== "function") {
            res = arguments[0];
            data = arguments[1];
        }
        // New usage: sendResponse(req, res, { ... })
        if (typeof data === 'object' && data !== null && !Array.isArray(data) && 'code' in data && 'keyword' in data) {
            // Test if data is safely serializable
            JSON.stringify(data);
            res.status(data.code === responseCode.SUCCESS ? 200 : 400).send(data);
        } else {
            // Old style: sendResponse(res, status, code, keyword)
            res.status(arguments[1] || 400).send({
                code: arguments[2],
                keyword: arguments[3]
            });
        }
    } catch (err) {
        // Specifically catch circular reference errors
        res.status(500).send({
            code: responseCode.OPERATION_FAILED || 500,
            keyword: "internal_server_error",
            error: "A circular structure was encountered in response data."
        });
    }
}

let middleware = {

    validateApiKey: function (req, res, callback) {
        let pathData = req.path.split("/");
        if (pathData[1] === "uploads") {
            return callback();
        }
        let api_key = (req.headers['x-api-key'] != undefined && req.headers['x-api-key'] != "") ? req.headers["x-api-key"] : '';
        if (api_key != "") {
            try {
                if (api_key == process.env.API_KEY) {
                    callback();
                } else {
                    sendResponse(req, res, {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "Invalid_Api_Key"
                    });
                }
            } catch (error) {
                sendResponse(req, res, {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "Invalid_Api_Key"
                });
            }
        } else {
            sendResponse(req, res, {
                code: responseCode.OPERATION_FAILED,
                keyword: "Invalid_Api_Key"
            });
        }
    },

    validateHeaderToken: function (req, res, callback) {
        let headerToken = (req.headers['authorization'] && req.headers['authorization'] !== "") ? req.headers['authorization'] : '';
        console.log("Header Token", headerToken)
        let pathData = req.path.split("/");

        if (pathData[1] === "uploads") {
            return callback();
        }
        else if(pathData[1] === "user" || pathData[2] === "user") return callback();
        else if (bypassMethods.indexOf(pathData[3]) === -1 && pathData[1] !== "uploads") {
            if (headerToken !== "") {
                try {
                    const decoded = jwt.verify(headerToken, process.env.SECRET_KEY);
                    let roleId;
                    if (decoded.hasOwnProperty('user_id')) {
                        roleId = decoded.user_id;
                    } else if (decoded.hasOwnProperty('admin_id')) {
                        roleId = decoded.admin_id;
                    } else if (decoded.hasOwnProperty('driver_id')) {
                        roleId = decoded.driver_id;
                    }
                    if (pathData[2] === "user") {
                        req.user_id = roleId;
                        callback();
                    } else if (pathData[2] === "admin") {
                        req.admin_id = roleId;
                        callback();
                    } else if (pathData[2] === "driver") {
                        req.driver_id = roleId;
                        callback();
                    } else {
                        return sendResponse(req, res, {
                            code: responseCode.OPERATION_FAILED,
                            keyword: "Invalid_Role"
                        });
                    }
                } catch (error) {
                    sendResponse(req, res, {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "Invalid_Token_Provided"
                    });
                }
            } else {
                sendResponse(req, res, {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "Token_Missing"
                });
            }
        }
        else {
            callback();
        }
    },

    sendResponse: sendResponse
};

module.exports = middleware;
