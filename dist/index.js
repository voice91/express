"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config/config"));
var _logger = require("./config/logger");
var _app = _interopRequireDefault(require("./app"));
var _seed = require("./seed");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// TODO: implement in the future

// import socketAPI from 'appEvents/socketAPI';

// const { initSockets } = require('appEvents/handler');

var server;
_mongoose["default"].connect(_config["default"].mongoose.url, _config["default"].mongoose.options).then(function () {
  _logger.logger.info('Connected to MongoDB');
  // eslint-disable-next-line global-require
  // require('./migrateMongo')();
  server = _app["default"].listen(_config["default"].port, function () {
    _logger.logger.info("Listening to port ".concat(_config["default"].port));
  });
  (0, _seed.seedDatabase)().then()["catch"]();
  // check whether Socket is enabled or not TODO: implement in the future
  // socketAPI.io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));
  // socketAPI.io.attach(server);
  // initSockets();
});
var db = _mongoose["default"].connection;
// reconnecting the server if the mongoose got disconnected
db.on('disconnected', function () {
  _logger.logger.info('Database Disconnected');
  setTimeout(function () {
    _mongoose["default"].connect(_config["default"].mongoose.url, _config["default"].mongoose.options);
    _logger.logger.info('Successfully reconnected to the mongoDB database');
  }, 1000); // Retry connection after 1 seconds
});

// reconnecting the server if we get mongoose error
db.on('error', function (error) {
  _logger.logger.info('MongoDB connection error');
  console.error('MongoDB connection error:', error);
  setTimeout(function () {
    _mongoose["default"].connect(_config["default"].mongoose.url, _config["default"].mongoose.options);
    _logger.logger.info('Successfully reconnected to the mongoDB database');
  }, 1000); // Retry connection after 1 seconds
});
var exitHandler = function exitHandler() {
  if (server) {
    server.close(function () {
      _logger.logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
var unexpectedErrorHandler = function unexpectedErrorHandler(error) {
  _logger.logger.error(error);
  exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', function () {
  _logger.logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});