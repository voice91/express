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
 * createDealNotes
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealNotesValidation.createDealNotes), _checkUserOfDeal["default"], _advisor.dealNotesController.create);
router.route('/deal/:dealId')
/**
 * getDealNotes
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealNotesValidation.getDealNotes), _checkUserOfDeal["default"], _advisor.dealNotesController.list);
router.route('/deal/:dealId/paginated')
/**
 * getDealNotesPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealNotesValidation.paginatedDealNotes), _checkUserOfDeal["default"], _advisor.dealNotesController.paginate);
router.route('/:dealNotesId')
/**
 * getDealNotesById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealNotesValidation.getDealNotesById), _checkUserOfDeal["default"], _advisor.dealNotesController.get)
/**
 * updateDealNotes
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealNotesValidation.updateDealNotes), _checkUserOfDeal["default"], _advisor.dealNotesController.update)
/**
 * deleteDealNotesById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealNotesValidation.deleteDealNotesById), _advisor.dealNotesController.remove);
var _default = exports["default"] = router;