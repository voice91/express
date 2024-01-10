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
 * createUser
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.userValidation.createUser), _user.userController.create)
/**
 * getUser
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.userValidation.getUser), _user.userController.list)
/**
 * updateUser
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.userValidation.updateUser), _user.userController.update);
router.route('/paginated')
/**
 * getUserPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.userValidation.paginatedUser), _user.userController.paginate);
router.route('/:userId')
/**
 * getUserById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.userValidation.getUserById), _user.userController.get)
/**
 * deleteUserById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.userValidation.deleteUserById), _user.userController.remove);
var _default = exports["default"] = router;