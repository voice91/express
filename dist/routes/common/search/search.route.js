"use strict";

var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
var _validate = _interopRequireDefault(require("../../../middlewares/validate"));
var _common = require("../../../controllers/common");
var _common2 = require("../../../validations/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.get('/universal-search', (0, _auth["default"])(), (0, _validate["default"])(_common2.searchValidation.search), _common.searchController.getDealsAndLendersForUniversalSearch);
module.exports = router;