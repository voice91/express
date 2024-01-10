"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _path = _interopRequireDefault(require("path"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));
var _xssClean = _interopRequireDefault(require("xss-clean"));
var _helmet = _interopRequireDefault(require("helmet"));
var _express = _interopRequireDefault(require("express"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _expressWinston = _interopRequireDefault(require("express-winston"));
var _winston = _interopRequireDefault(require("./config/winston"));
var _passport = _interopRequireDefault(require("passport"));
var _passport2 = _interopRequireDefault(require("./config/passport"));
var _rateLimiter = require("./middlewares/rateLimiter");
var _routes = _interopRequireDefault(require("./routes"));
var _ApiError = _interopRequireDefault(require("./utils/ApiError"));
var _error = require("./middlewares/error");
var _sendResponse = _interopRequireDefault(require("./middlewares/sendResponse"));
var _config = _interopRequireDefault(require("./config/config"));
var _morgan = require("./config/morgan");
var _encryptDecryptText = require("./utils/encrypt-decrypt-text");
var _lodash = require("lodash");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// eslint-disable-next-line import/named

// require('newrelic');
var actuator = require('express-actuator');
require("./utils/rates-cronJob");
_mongoosePaginateV["default"].paginate.options = {
  customLabels: {
    docs: 'results',
    totalDocs: 'totalResults'
  }
};
var app = (0, _express["default"])();
app.use(actuator());
if (_config["default"].env !== 'test') {
  app.use(_morgan.successHandler);
  app.use(_morgan.errorHandler);
}
app.use((0, _cors["default"])());

// set security HTTP headers
app.use((0, _helmet["default"])());
// parse json request body
// we need to set limit to 50 mb bcs in webhook when attachment is attached than it will give error like request entity too large
app.use(_express["default"].json({
  limit: '50mb'
}));
// decrypt the req body and parse to Json format.
app.use(function (req, res, next) {
  if (_config["default"].dataEncryption && !(0, _lodash.isEmpty)(req.body) && !req.url.includes('/v1/webhook')) {
    if (!req.body.reqBody) {
      throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Request body must be encrypted');
    }
    req.body = JSON.parse((0, _encryptDecryptText.decryptRequestData)(req.body.reqBody, _config["default"].encryptionPassword));
  }
  next();
});
app.use((0, _expressFileupload["default"])());
// parse urlencoded request body
app.use(_express["default"].urlencoded({
  extended: true
}));
// sanitize request data
app.use((0, _xssClean["default"])());
app.use((0, _expressMongoSanitize["default"])());
// gzip compression
app.use((0, _compression["default"])());
// set api response
app.use(_sendResponse["default"]);
// enable cors
app.options('*', (0, _cors["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
// jwt authentication
app.use(_passport["default"].initialize());
_passport["default"].use('jwt', _passport2["default"]);
// limit repeated failed requests to auth endpoints
if (_config["default"].env !== 'development') {
  app.use('/v1', _rateLimiter.globalLimiter);
}
// v1 api routes
app.use('/v1', _routes["default"]);
// send back a 404 error for any unknown api request
app.use(function (req, res, next) {
  next(new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(_error.errorConverter);
// handle error
app.use(_error.errorHandler);
if (_config["default"].env === 'development') {
  _expressWinston["default"].requestWhitelist.push('body');
  _expressWinston["default"].responseWhitelist.push('body');
  app.use(_expressWinston["default"].logger({
    winstonInstance: _winston["default"],
    meta: true,
    // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}
var _default = exports["default"] = app;