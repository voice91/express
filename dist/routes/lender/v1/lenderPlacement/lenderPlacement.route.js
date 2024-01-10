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
 * createLenderPlacement
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.createLenderPlacement), _lender.lenderPlacementController.create)
/**
 * getLenderPlacement
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.getLenderPlacement), _lender.lenderPlacementController.list);
router.route('/paginated')
/**
 * getLenderPlacementPaginated
 * */
/**
 * From now on have to use this route for showing deal, status and timeline for the placement.
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.paginatedLenderPlacement), _lender.lenderPlacementController.paginate);
router.route('/message/:lenderPlacementId')
/**
 * email lender
 * */
/**
 * @deprecated
 * This route is no longer in use as lender can't send messages anymore.
 */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.sendMessage), _lender.lenderPlacementController.sendMessage).get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.getMessages), _lender.lenderPlacementController.getMessages);
router.route('/:lenderPlacementId/document/:documentId')
/**
 * remove document from message
 * */
/**
 * @deprecated
 * This route is no longer in use as lender don't have access to messages anymore.
 */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.removeDocument), _lender.lenderPlacementController.removeDocument);
router.route('/:lenderPlacementId')
/**
 * getLenderPlacementById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.getLenderPlacementById), _lender.lenderPlacementController.get)
/**
 * updateLenderPlacement
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.updateLenderPlacement), _lender.lenderPlacementController.update)
/**
 * deleteLenderPlacementById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderPlacementValidation.deleteLenderPlacementById), _lender.lenderPlacementController.remove);
var _default = exports["default"] = router;