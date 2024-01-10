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
 * createLenderInstituteNotes
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderInstituteNotesValidation.createLenderInstituteNotes), _user.lenderInstituteNotesController.create);
router.route('/:lenderInstitute')
/**
 * getLenderInstituteNotes
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderInstituteNotesValidation.getLenderInstituteNotes), _user.lenderInstituteNotesController.list);
router.route('/:lenderInstituteNotesId')
/**
 * updateLenderInstituteNotes
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderInstituteNotesValidation.updateLenderInstituteNotes), _user.lenderInstituteNotesController.update)
/**
 * deleteLenderInstituteNotesById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderInstituteNotesValidation.deleteLenderInstituteNotesById), _user.lenderInstituteNotesController.remove);
var _default = exports["default"] = router;