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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createLenderNotes
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderNotesValidation.createLenderNotes), _advisor.lenderNotesController.create)
/**
 * getLenderNotes
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderNotesValidation.getLenderNotes), _advisor.lenderNotesController.list);
router.route('/paginated')
/**
 * getLenderNotesPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderNotesValidation.paginatedLenderNotes), _advisor.lenderNotesController.paginate);
router.route('/:lenderNotesId')
/**
 * getLenderNotesById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderNotesValidation.getLenderNotesById), _advisor.lenderNotesController.get)
/**
 * updateLenderNotes
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderNotesValidation.updateLenderNotes), _advisor.lenderNotesController.update)
/**
 * deleteLenderNotesById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderNotesValidation.deleteLenderNotesById), _advisor.lenderNotesController.remove);
var _default = exports["default"] = router;