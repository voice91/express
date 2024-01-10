"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.errorConverter = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _config = _interopRequireDefault(require("../config/config"));
var _logger = require("../config/logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var errorConverter = exports.errorConverter = function errorConverter(err, req, res, next) {
  var error = err;
  if (!(error instanceof _ApiError["default"])) {
    var statusCode = error.statusCode || _httpStatus["default"].INTERNAL_SERVER_ERROR;
    var message = error.message || _httpStatus["default"][statusCode];
    error = new _ApiError["default"](statusCode, message, false, err.stack);
  }
  next(error);
};
// eslint-disable-next-line no-unused-vars
var errorHandler = exports.errorHandler = function errorHandler(err, req, res, next) {
  var statusCode = err.statusCode,
    message = err.message;
  if (_config["default"].env === 'production' && !err.isOperational) {
    statusCode = _httpStatus["default"].INTERNAL_SERVER_ERROR;
    message = _httpStatus["default"][_httpStatus["default"].INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;
  var response = _objectSpread({
    error: true,
    code: statusCode,
    message: message
  }, _config["default"].env === 'development' && {
    stack: err.stack
  });
  if (_config["default"].env === 'development') {
    _logger.logger.error(err);
  }
  res.status(statusCode).send(response);
};