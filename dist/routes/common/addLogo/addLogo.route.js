"use strict";

var _express = _interopRequireDefault(require("express"));
var _common = require("../../../controllers/common");
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.post('/', (0, _auth["default"])(), _common.addLogoController.addLogo);
module.exports = router;