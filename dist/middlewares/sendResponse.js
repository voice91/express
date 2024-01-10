"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _encryptDecryptText = require("../utils/encrypt-decrypt-text");
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function sendResponse(req, res, next) {
  var response = res.send;
  res.send = function (originalData) {
    if (originalData.error) {
      // eslint-disable-next-line prefer-rest-params
      arguments[0] = {
        status: 'Failure',
        code: originalData.code,
        message: originalData.message,
        stack: originalData.stack
      };
    } else if (originalData.results) {
      // eslint-disable-next-line prefer-rest-params
      arguments[0] = {
        status: 'Success',
        data: originalData.results
      };
    }
    // If dataEncryption is enabled then ,encrypt the response before sending
    if (_config["default"].dataEncryption) {
      // eslint-disable-next-line prefer-rest-params
      arguments[0] = (0, _encryptDecryptText.encryptResponseData)(JSON.stringify(arguments[0]), _config["default"].encryptionPassword);
    }
    // eslint-disable-next-line prefer-rest-params
    response.apply(res, arguments);
  };
  next();
}
var _default = exports["default"] = sendResponse;