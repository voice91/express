"use strict";

var _express = _interopRequireDefault(require("express"));
var _common = require("../../../controllers/common");
var _common2 = require("../../../validations/common");
var _validate = _interopRequireDefault(require("../../../middlewares/validate"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.post('/', (0, _auth["default"])(), (0, _validate["default"])(_common2.addUserValidation.addUser), _common.addUserController.addUser);
module.exports = router;