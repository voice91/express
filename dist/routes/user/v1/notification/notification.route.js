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
 * createNotification
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.notificationValidation.createNotification), _user.notificationController.create)
/**
 * getNotification
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.notificationValidation.getNotification), _user.notificationController.list)
/**
 * UpdateNotification
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.notificationValidation.updateNotification), _user.notificationController.update);
var _default = exports["default"] = router;