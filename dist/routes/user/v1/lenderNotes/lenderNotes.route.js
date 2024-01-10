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
 * createLenderNotes
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderNotesValidation.createLenderNotes), _user.lenderNotesController.create)
/**
 * getLenderNotes
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderNotesValidation.getLenderNotes), _user.lenderNotesController.list);
router.route('/paginated')
/**
 * getLenderNotesPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderNotesValidation.paginatedLenderNotes), _user.lenderNotesController.paginate);
router.route('/:lenderNotesId')
/**
 * getLenderNotesById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderNotesValidation.getLenderNotesById), _user.lenderNotesController.get)
/**
 * updateLenderNotes
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderNotesValidation.updateLenderNotes), _user.lenderNotesController.update)
/**
 * deleteLenderNotesById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderNotesValidation.deleteLenderNotesById), _user.lenderNotesController.remove);
var _default = exports["default"] = router;