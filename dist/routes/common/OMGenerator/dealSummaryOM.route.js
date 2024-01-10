"use strict";

var _express = _interopRequireDefault(require("express"));
var _common = require("../../../controllers/common");
var _internalToken = _interopRequireDefault(require("../../../middlewares/internalToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();

/**
 * @deprecated
 * This route is no longer in use as we are creating the OM from FE.
 */
router.get('/OM/:dealId', _internalToken["default"], _common.dealSummaryOMController.dealSummaryOM);
module.exports = router;