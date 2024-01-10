"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.enumerateErrorFormat = void 0;
var _winston = _interopRequireDefault(require("winston"));
var _config = _interopRequireDefault(require("./config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var enumerateErrorFormat = exports.enumerateErrorFormat = _winston["default"].format(function (info) {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.stack
    });
  }
  return info;
});
var logger = exports.logger = _winston["default"].createLogger({
  level: _config["default"].env === 'development' ? 'debug' : 'info',
  format: _winston["default"].format.combine(enumerateErrorFormat(), _config["default"].env === 'development' ? _winston["default"].format.colorize() : _winston["default"].format.uncolorize(), _winston["default"].format.splat(), _winston["default"].format.timestamp(), _winston["default"].format.printf(function (_ref) {
    var level = _ref.level,
      message = _ref.message,
      timestamp = _ref.timestamp;
    return "".concat(timestamp, " ").concat(level, ": ").concat(message, " ");
  })),
  transports: [new _winston["default"].transports.Console({
    stderrLevels: ['error']
  })]
});
// module.exports = logger;