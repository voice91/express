"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../../../../controllers/user");
var _user2 = require("../../../../validations/user");
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createBugReport
 * */
/**
 * @deprecated
 * This route is no longer in use as it's been removed from the UI.
 */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.bugReportValidation.createBugReport), _user.bugReportController.create);
var _default = exports["default"] = router;