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
router.route('/')
/**
 * createFeedback
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.feedbackValidation.createFeedback), _advisor.feedbackController.create);
var _default = exports["default"] = router;