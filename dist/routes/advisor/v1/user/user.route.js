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
 * createUser
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.userValidation.createUser), _advisor.userController.create)
/**
 * getUser
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.userValidation.getUser), _advisor.userController.list)
/**
 * updateUser
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.userValidation.updateUser), _advisor.userController.update);
router.route('/paginated')
/**
 * getUserPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.userValidation.paginatedUser), _advisor.userController.paginate);
router.route('/:userId')
/**
 * getUserById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.userValidation.getUserById), _advisor.userController.get)
/**
 * deleteUserById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.userValidation.deleteUserById), _advisor.userController.remove);
var _default = exports["default"] = router;