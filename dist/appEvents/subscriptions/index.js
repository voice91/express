"use strict";

var _httpStatus = _interopRequireDefault(require("http-status"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _services = require("../../services");
var _ApiError = _interopRequireDefault(require("../../utils/ApiError"));
var _config = _interopRequireDefault(require("../../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
module.exports = {
  /**
   *  we get the socket and from that we get the Query parameter and that should be the token so that we can verify that user exist and valid
   *  and if it is valid then we are calling the next function and otherwise call the next function with the Error
   * @param socket
   * @param next
   * @returns {*}
   */
  initSubscription: function initSubscription(socket, next) {
    var token = socket.handshake.query.token;
    if (!token) {
      return next(new _ApiError["default"](_httpStatus["default"].UNAUTHORIZED, 'Please authenticate'));
    }
    return _jsonwebtoken["default"].verify(token, _config["default"].jwt.secret, {}, function (err, decoded) {
      if (err || !decoded || !decoded.sub) {
        return next(new _ApiError["default"](_httpStatus["default"].UNAUTHORIZED, 'Bad token', true));
      }
      return _services.userService.getUserById(decoded.sub).then(function (user) {
        if (user) {
          // TODO: Add the user Session Init Code he if you have any condition on connection
          // eslint-disable-next-line no-param-reassign
          socket.user = {
            _id: user._id
          };
          // eslint-disable-next-line no-param-reassign
          socket.startedAt = new Date();
          socket.join("user.".concat(decoded.sub));
          socket.on('disconnect', function () {
            // TODO: Add the User Disconnect Cleanup Code here
          });
          return next();
        }
        return next(new _ApiError["default"](_httpStatus["default"].UNAUTHORIZED, 'Please authenticate'));
      });
    });
  }
};