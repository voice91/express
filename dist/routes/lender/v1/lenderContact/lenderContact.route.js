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
 * createLenderContact
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderContactValidation.createLenderContact), _lender.lenderContactController.create)
/**
 * getLenderContact
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderContactValidation.getLenderContact), _lender.lenderContactController.list);
router.route('/paginated')
/**
 * getLenderContactPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderContactValidation.paginatedLenderContact), _lender.lenderContactController.paginate);
router.route('/:lenderContactId')
/**
 * getLenderContactById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderContactValidation.getLenderContactById), _lender.lenderContactController.get)
/**
 * updateLenderContact
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderContactValidation.updateLenderContact), _lender.lenderContactController.update)
/**
 * deleteLenderContactById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderContactValidation.deleteLenderContactById), _lender.lenderContactController.remove);
var _default = exports["default"] = router;