"use strict";

var _socket = _interopRequireDefault(require("socket.io"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _require = require("./subscriptions"),
  initSubscription = _require.initSubscription;
var io = (0, _socket["default"])();
var socketAPI = {};
/**
 * This is used for the Authentication purpose and this can be added the conditionally
 */
io.use(initSubscription).on('connection', function (socket) {
  // Connection now authenticated to receive further events
  socket.on('message', function (message) {
    io.emit('message', message);
  });
});
// Your socket logic here
socketAPI.io = io;
module.exports = socketAPI;