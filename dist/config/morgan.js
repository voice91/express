"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successHandler = exports.errorHandler = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _config = _interopRequireDefault(require("./config"));
var _logger = require("./logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_morgan["default"].token('message', function (req, res) {
  return res.locals.errorMessage || '';
});
var getIpFormat = function getIpFormat() {
  return _config["default"].env === 'production' ? ':remote-addr - ' : '';
};
var successResponseFormat = "".concat(getIpFormat(), ":method :url :status - :response-time ms");
var errorResponseFormat = "".concat(getIpFormat(), ":method :url :status - :response-time ms - message: :message");
var successHandler = exports.successHandler = (0, _morgan["default"])(successResponseFormat, {
  skip: function skip(req, res) {
    return res.statusCode >= 400;
  },
  stream: {
    write: function write(message) {
      return _logger.logger.info(message.trim());
    }
  }
});
var errorHandler = exports.errorHandler = (0, _morgan["default"])(errorResponseFormat, {
  skip: function skip(req, res) {
    return res.statusCode < 400;
  },
  stream: {
    write: function write(message) {
      return _logger.logger.error(message.trim());
    }
  }
});