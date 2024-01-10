"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _advisor = require("../../../../controllers/advisor");
var _advisor2 = require("../../../../validations/advisor");
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/sendMail-to-support')
/**
 * send Email to Support Team
 * */
/**
 * @deprecated
 * This route is no longer in use as it's been removed from the UI.
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.FAQValidation.sendMail), _advisor.FAQController.sendMail);
var _default = exports["default"] = router;