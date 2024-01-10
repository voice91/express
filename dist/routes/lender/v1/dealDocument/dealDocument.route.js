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
var _checkUserOfDeal = _interopRequireDefault(require("../../../../middlewares/checkUserOfDeal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * getDealDocument
 * */
/**
 * @deprecated
 * This route is no longer in use instead we are using '/v2/deal/:dealId'.
 */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealDocumentValidation.getDealDocument), _lender.dealDocumentController.list);
router.route('/v2/deal/:dealId')
/**
 * getDealDocuments list by deal
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealDocumentValidation.getDealDocument), _checkUserOfDeal["default"], _lender.dealDocumentController.getDealDocumentByDealV2);
router.route('/paginated')
/**
 * getDealDocumentPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealDocumentValidation.paginatedDealDocument), _lender.dealDocumentController.paginate);
router.route('/:dealDocumentId')
/**
 * getDealDocumentById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealDocumentValidation.getDealDocumentById), _lender.dealDocumentController.get);
var _default = exports["default"] = router;