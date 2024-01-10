"use strict";

var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
var _common = require("../../../controllers/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.get('/', (0, _auth["default"])(), _common.ratesController.rates);
module.exports = router;