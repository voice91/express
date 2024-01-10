"use strict";

var _express = _interopRequireDefault(require("express"));
var _common = require("../../../controllers/common");
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
/**
 * Export Database to Excel
 * */
router.get('/', (0, _auth["default"])('advisor'), _common.exportDBController.exportToExcel);
module.exports = router;