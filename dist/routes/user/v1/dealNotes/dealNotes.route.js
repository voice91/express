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
 * createDealNotes
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealNotesValidation.createDealNotes), _checkUserOfDeal["default"], _user.dealNotesController.create);
router.route('/deal/:dealId/paginated')
/**
 * getDealNotesPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealNotesValidation.paginatedDealNotes), _checkUserOfDeal["default"], _user.dealNotesController.paginate);
router.route('/deal/:dealId')
/**
 * getDealNotes
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealNotesValidation.getDealNotes), _checkUserOfDeal["default"], _user.dealNotesController.list);
router.route('/:dealNotesId')
/**
 * getDealNotesById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealNotesValidation.getDealNotesById), _user.dealNotesController.get)
/**
 * updateDealNotes
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealNotesValidation.updateDealNotes), _checkUserOfDeal["default"], _user.dealNotesController.update)
/**
 * deleteDealNotesById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealNotesValidation.deleteDealNotesById), _user.dealNotesController.remove);
var _default = exports["default"] = router;