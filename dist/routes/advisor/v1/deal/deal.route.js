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
var _checkUserOfDeal = _interopRequireDefault(require("../../../../middlewares/checkUserOfDeal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createDeal
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealValidation.createDeal), _advisor.dealController.create)
/**
 * getDeal
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealValidation.getDeal), _advisor.dealController.list);
router.route('/paginated')
/**
 * getDealPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealValidation.paginatedDeal), _advisor.dealController.paginate);
router.route('/:dealId')
/**
 * getDealById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealValidation.getDealById), _advisor.dealController.get)
/**
 * updateDeal
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealValidation.updateDeal), _advisor.dealController.update)
/**
 * deleteDealById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealValidation.deleteDealById), _advisor.dealController.remove);
router.route('/invitation').post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealValidation.invitationToDeal), _checkUserOfDeal["default"], _advisor.dealController.dealInvitation);
var _default = exports["default"] = router;