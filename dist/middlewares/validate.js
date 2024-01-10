"use strict";

var _joi = _interopRequireDefault(require("joi"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _pick = require("../utils/pick");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validate = function validate(schema) {
  return function (req, res, next) {
    var validSchema = (0, _pick.pick)(schema, ['params', 'query', 'body']);
    var object = (0, _pick.pick)(req, Object.keys(validSchema));
    var _Joi$compile$prefs$va = _joi["default"].compile(validSchema).prefs({
        errors: {
          label: 'key'
        }
      }).validate(object),
      value = _Joi$compile$prefs$va.value,
      error = _Joi$compile$prefs$va.error;
    if (error) {
      var errorMessage = error.details.map(function (details) {
        return details.message;
      }).join(', ');
      return next(new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };
};
module.exports = validate;