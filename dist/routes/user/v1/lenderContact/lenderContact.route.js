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
 * getLenderContact
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderContactValidation.getLenderContact), _user.lenderContactController.list);
router.route('/paginated')
/**
 * getLenderContactPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderContactValidation.paginatedLenderContact), _user.lenderContactController.paginate);
router.route('/:lenderContactId')
/**
 * getLenderContactById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderContactValidation.getLenderContactById), _user.lenderContactController.get)
/**
 * updateLenderContact
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderContactValidation.updateLenderContact), _user.lenderContactController.update)
/**
 * deleteLenderContactById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderContactValidation.deleteLenderContactById), _user.lenderContactController.remove);
var _default = exports["default"] = router;