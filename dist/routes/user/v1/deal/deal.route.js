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
var _checkUserOfDeal = _interopRequireDefault(require("../../../../middlewares/checkUserOfDeal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * getDeal
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealValidation.getDeal), _user.dealController.list);
router.route('/paginated')
/**
 * getDealPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealValidation.paginatedDeal), _user.dealController.paginate);
router.route('/:dealId')
/**
 * getDealById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealValidation.getDealById), _user.dealController.get)
/**
 * deleteDealById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealValidation.deleteDealById), _user.dealController.remove);
router.route('/invitation')
/**
 * @deprecated
 * This route is no longer in use as borrowers don't have access to send invitation to other borrowers in the deal anymore.
 */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealValidation.invitationToDeal), _checkUserOfDeal["default"], _user.dealController.dealInvitation);
var _default = exports["default"] = router;