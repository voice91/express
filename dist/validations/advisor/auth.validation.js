"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOtp = exports.verifyEmail = exports.verifyCode = exports.updateDeviceToken = exports.sendVerifyEmail = exports.resetPasswordToken = exports.resetPasswordOtpVerify = exports.resetPasswordOtp = exports.resetPassword = exports.register = exports.refreshTokens = exports.logout = exports.login = exports.googleLogin = exports.forgotPassword = exports.createDeviceToken = exports.changePassword = exports.addTokensToUser = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _enum = _interopRequireDefault(require("../../models/enum.model"));
var _config = _interopRequireDefault(require("../../config/config"));
var _Joi$string, _Joi$string2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
var register = exports.register = {
  body: _joi["default"].object().keys({
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required(),
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    role: _joi["default"].string().valid(_enum["default"].EnumRoleOfUser.ADVISOR).required(),
    companyName: _joi["default"].string().required(),
    companyAddress: _joi["default"].string(),
    city: _joi["default"].string(),
    state: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_enum["default"].EnumStatesOfDeal))),
    zipcode: _joi["default"].number().integer().min(10000).max(99999),
    phoneNumber: _joi["default"].string()
  })
};
var login = exports.login = {
  body: _joi["default"].object().keys({
    email: _joi["default"].string().required(),
    password: _joi["default"].string().required(),
    deviceToken: _joi["default"].string().allow('')
  })
};
var verifyEmail = exports.verifyEmail = {
  query: _joi["default"].object().keys({
    token: _joi["default"].string().required()
  })
};
var forgotPassword = exports.forgotPassword = {
  body: _joi["default"].object().keys({
    email: _joi["default"].string().email().required()
  })
};
var verifyOtp = exports.verifyOtp = {
  body: _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    otp: _joi["default"].number().required()
  })
};

// Token-based Verification when user select forgotPassword
var verifyCode = exports.verifyCode = {
  body: _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    code: _joi["default"].string().length(_config["default"].jwt.resetPasswordCodeSize).required()
  })
};
var addTokensToUser = exports.addTokensToUser = {
  body: _joi["default"].object().keys({
    accessToken: _joi["default"].string().required(),
    refreshToken: _joi["default"].string().required()
  })
};
var resetPassword = exports.resetPassword = {
  body: _joi["default"].object().keys({
    password: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    code: _joi["default"].string().required()
  })
};
var resetPasswordOtp = exports.resetPasswordOtp = {
  body: _joi["default"].object().keys({
    password: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    otp: _joi["default"].number().required()
  })
};
var resetPasswordOtpVerify = exports.resetPasswordOtpVerify = {
  body: _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    otp: _joi["default"].number().required()
  })
};

// Token-based resetPassword validation
var resetPasswordToken = exports.resetPasswordToken = {
  body: _joi["default"].object().keys({
    password: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    code: _joi["default"].string().length(_config["default"].jwt.resetPasswordCodeSize).required()
  })
};
var changePassword = exports.changePassword = {
  body: _joi["default"].object().keys({
    password: _joi["default"].string().required()
  })
};
var sendVerifyEmail = exports.sendVerifyEmail = {
  body: _joi["default"].object().keys({
    email: _joi["default"].string().email().required()
  })
};
var refreshTokens = exports.refreshTokens = {
  body: _joi["default"].object().keys({
    refreshToken: _joi["default"].string().required()
  })
};
var logout = exports.logout = {
  body: _joi["default"].object().keys({
    refreshToken: _joi["default"].string().required(),
    deviceToken: _joi["default"].string()
  })
};
var googleLogin = exports.googleLogin = {
  body: _joi["default"].object().keys({
    access_token: _joi["default"].string().required()
  })
};
var createDeviceToken = exports.createDeviceToken = {
  body: _joi["default"].object().keys({
    deviceToken: _joi["default"].string(),
    platform: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_enum["default"].EnumPlatformOfDeviceToken)))
  })
};
var updateDeviceToken = exports.updateDeviceToken = {
  body: _joi["default"].object().keys({
    deviceToken: _joi["default"].string().required()
  })
};