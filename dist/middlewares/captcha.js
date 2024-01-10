"use strict";

var _httpStatus = _interopRequireDefault(require("http-status"));
var _lodash = _interopRequireDefault(require("lodash"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _captcha = _interopRequireDefault(require("../config/captcha"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 *
 * @param key will be which contain in the body quey or params and we will get those key value and validate the captcha
 * if it verify successfully then we will call the next function otherwise throw the Error
 * @returns {(function(*, *, *): (*))|*}
 */
var verifyCaptcha = function verifyCaptcha(key) {
  return function (req, res, next) {
    var validKey = ['params', 'query', 'body'].map(function (item) {
      return "".concat(item, ".").concat(key);
    });
    // here we get validKey in object like { params: {}, query: {}, body: {} }
    var captchaObject = _lodash["default"].pick(req, validKey);
    //  here we get validKey in array of string like ['params', 'query', 'body']
    // we use this because we get values like {body: { captcha: '' }}
    var captchaObjectKey = Object.keys(captchaObject);
    // for now, we get values only in body so that here we used object[objectKey] it returns captcha in array.
    var captchaKeys = Object.values(captchaObject[captchaObjectKey]).filter(function (item) {
      return item;
    });
    if (captchaKeys.length > 1) {
      return next(new _ApiError["default"]('Multiple key Detected', _httpStatus["default"].BAD_REQUEST));
    }
    return (0, _captcha["default"])(captchaKeys[0]).then(function (captchaVerified) {
      // if captcha verification is failed from user side or if we provide wrong secreteKey then it throws an error.
      if (!captchaVerified) {
        return next(new _ApiError["default"]('Invalid captcha', _httpStatus["default"].BAD_REQUEST));
      }
      return next();
    })["catch"](function (error) {
      return next(new _ApiError["default"](error.message, _httpStatus["default"].BAD_REQUEST));
    });
  };
};
module.exports = verifyCaptcha;