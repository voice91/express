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
 * getDeal
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealValidation.getDeal), _lender.dealController.list);
router.route('/paginated')
/**
 * getDealPaginated
 * */
/**
 * @deprecated
 * Not using this route anymore, as per the latest requirement we need placement stage and timeline on lender page
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealValidation.paginatedDeal), _lender.dealController.paginate);
router.route('/:dealId')
/**
 * getDealById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealValidation.getDealById), _lender.dealController.get)
/**
 * deleteDealById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealValidation.deleteDealById), _lender.dealController.remove);
var _default = exports["default"] = router;