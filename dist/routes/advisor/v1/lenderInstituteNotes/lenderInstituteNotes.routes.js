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
 * createLenderInstituteNotes
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderInstituteNotesValidation.createLenderInstituteNotes), _advisor.lenderInstituteNotesController.create);
router.route('/:lenderInstitute')
/**
 * getLenderInstituteNotes
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderInstituteNotesValidation.getLenderInstituteNotes), _advisor.lenderInstituteNotesController.list);
router.route('/:lenderInstituteNotesId')
/**
 * updateLenderInstituteNotes
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderInstituteNotesValidation.updateLenderInstituteNotes), _advisor.lenderInstituteNotesController.update)
/**
 * deleteLenderInstituteNotesById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderInstituteNotesValidation.deleteLenderInstituteNotesById), _advisor.lenderInstituteNotesController.remove);
var _default = exports["default"] = router;