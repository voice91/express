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
 * createLenderPlacement
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.createLenderPlacement), _user.lenderPlacementController.create)
/**
 * getLenderPlacement
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.getLenderPlacement), _user.lenderPlacementController.list);
router.route('/paginated')
/**
 * getLenderPlacementPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.paginatedLenderPlacement), _user.lenderPlacementController.paginate);
router.route('/documents/:lenderPlacementId')
/**
 * getDocumentsUploadedInMessages
 * */
/**
 * @deprecated
 * This route is no longer in use as borrower don't have access to messages.
 */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.getDocumentsOfMessages), _user.lenderPlacementController.getDocumentsOfMessages);
router.route('/remove')
/**
 * removeLenderPlacement
 * */
/**
 * @deprecated
 * This route is no longer in use as borrower don't have access to remove placements from the deal.
 */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.removeLenderPlacement), _user.lenderPlacementController.removeByDealAndLendingInstitution);
router.route('/update')
/**
 * updateManyLenderPlacements
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.updateManyLenderPlacement), _user.lenderPlacementController.updateMany);
router.route('/:lenderPlacementId')
/**
 * getLenderPlacementById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.getLenderPlacementById), _user.lenderPlacementController.get)
/**
 * deleteLenderPlacementById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderPlacementValidation.deleteLenderPlacementById), _user.lenderPlacementController.remove);
var _default = exports["default"] = router;