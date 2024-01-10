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
 * createLenderContact
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderContactValidation.createLenderContact), _advisor.lenderContactController.create)
/**
 * getLenderContact
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderContactValidation.getLenderContact), _advisor.lenderContactController.list);
router.route('/paginated')
/**
 * getLenderContactPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderContactValidation.paginatedLenderContact), _advisor.lenderContactController.paginate);
router.route('/:lenderContactId')
/**
 * getLenderContactById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderContactValidation.getLenderContactById), _advisor.lenderContactController.get)
/**
 * updateLenderContact
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderContactValidation.updateLenderContact), _advisor.lenderContactController.update)
/**
 * deleteLenderContactById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderContactValidation.deleteLenderContactById), _advisor.lenderContactController.remove);
var _default = exports["default"] = router;