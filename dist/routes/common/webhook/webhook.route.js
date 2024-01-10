"use strict";

var _express = _interopRequireDefault(require("express"));
var _common = require("../../../controllers/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.post('/post-mark', _common.webhookController.processEmailMessage);
module.exports = router;