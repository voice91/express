"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var internalToken = _config["default"].internalToken;
var validateInternalToken = function validateInternalToken(req, res, next) {
  var token = req.headers.internaltoken;
  if (!token || token !== internalToken) {
    return next(new _ApiError["default"](_httpStatus["default"].UNAUTHORIZED, 'Please Authenticate'));
  }
  next();
};
var _default = exports["default"] = validateInternalToken;