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
 * createLenderNotes
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderNotesValidation.createLenderNotes), _lender.lenderNotesController.create);
router.route('/lenderInstitute/:lenderInstituteId')
/**
 * getLenderNotes
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderNotesValidation.getLenderNotes), _lender.lenderNotesController.list);
router.route('/deal/:dealId/paginated')
/**
 * getLenderNotesPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderNotesValidation.paginatedLenderNotes), _lender.lenderNotesController.paginate);
router.route('/:lenderNotesId')
/**
 * getLenderNotesById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderNotesValidation.getLenderNotesById), _lender.lenderNotesController.get)
/**
 * updateLenderNotes
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderNotesValidation.updateLenderNotes), _lender.lenderNotesController.update)
/**
 * deleteLenderNotesById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderNotesValidation.deleteLenderNotesById), _lender.lenderNotesController.remove);
var _default = exports["default"] = router;