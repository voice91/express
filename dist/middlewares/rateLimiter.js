"use strict";

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// If we don't have a Redis client or don't need to persist rate limiting data in Redis, we can remove the store configuration, and the rate limiting will work with in-memory storage.
var globalLimiter = (0, _expressRateLimit["default"])({
  keyGenerator: function keyGenerator(request) {
    // You can customise the Global Rate Limiter as well
    return "".concat(request.ip);
  },
  windowMs: 3600000,
  // 1 Hour
  max: 3600,
  // Limit each IP to 3600 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  // Disable the `X-RateLimit-*` headers
  handler: function handler(request, response, next) {
    next(new _ApiError["default"](_httpStatus["default"].TOO_MANY_REQUESTS, 'Error Limit is Reached'));
  }
});
module.exports = {
  globalLimiter: globalLimiter
};