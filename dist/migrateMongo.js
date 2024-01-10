"use strict";

var _migrateMongo = _interopRequireDefault(require("migrate-mongo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logger = require("./config/winston");
function migrate() {
  _migrateMongo["default"].database.connect().then(function (_ref) {
    var db = _ref.db;
    return _migrateMongo["default"].up(db);
  })["catch"](function (error) {
    logger.error('error in migrate database: ', error);
  }).then(function (migratedItems) {
    logger.info("migrated items= ".concat(migratedItems.length));
  });
}
module.exports = migrate;