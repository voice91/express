"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _lender = require("../../../../controllers/lender");
var _lender2 = require("../../../../validations/lender");
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createUser
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.userValidation.createUser), _lender.userController.create)
/**
 * getUser
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.userValidation.getUser), _lender.userController.list)
/**
 * updateUser
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.userValidation.updateUser), _lender.userController.update);
router.route('/paginated')
/**
 * getUserPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.userValidation.paginatedUser), _lender.userController.paginate);
router.route('/:userId')
/**
 * getUserById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.userValidation.getUserById), _lender.userController.get)
/**
 * deleteUserById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.userValidation.deleteUserById), _lender.userController.remove);
var _default = exports["default"] = router;