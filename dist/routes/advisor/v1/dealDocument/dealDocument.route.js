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
 * createDealDocument
 * */
/**
 * @deprecated
 * This route is no longer in use instead we are using '/v2/add' as we now have functionality of 'add recommended file' also we can add comment with the docs.
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.createDealDocument), _checkUserOfDeal["default"], _advisor.dealDocumentController.create);
router.route('/v2/add')
/**
 * createDealDocument updated flow
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.createDealDocumentV2), _checkUserOfDeal["default"], _advisor.dealDocumentController.createV2);
router.route('/deal/:dealId')
/**
 * getDealDocument
 * */
/**
 * @deprecated
 * This route is no longer in use instead we are using '/v2/deal/:dealId'.
 */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.getDealDocument), _checkUserOfDeal["default"], _advisor.dealDocumentController.getDealDocumentByDeal);
router.route('/v2/deal/:dealId')
/**
 * getDealDocuments list by deal
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.getDealDocument), _checkUserOfDeal["default"], _advisor.dealDocumentController.getDealDocumentByDealV2);
router.route('/paginated')
/**
 * getDealDocumentPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.paginatedDealDocument), _advisor.dealDocumentController.paginate);
router.route('/:dealDocumentId')
/**
 * getDealDocumentById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.getDealDocumentById), _advisor.dealDocumentController.get)
/**
 * updateDealDocument
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.updateDealDocument), _checkUserOfDeal["default"], _advisor.dealDocumentController.update)["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.removeDealDocument), _advisor.dealDocumentController.remove);
router.route('/documents/:documentId')["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealDocumentValidation.deleteDocument), _advisor.dealDocumentController.removeDocument);
var _default = exports["default"] = router;