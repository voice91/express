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
 * createNotification
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.notificationValidation.createNotification), _advisor.notificationController.create)
/**
 * getNotification
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.notificationValidation.getNotification), _advisor.notificationController.list)
/**
 * UpdateNotification
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.notificationValidation.updateNotification), _advisor.notificationController.update);
var _default = exports["default"] = router;