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
 * createLenderProgram
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderProgramValidation.createLenderProgram), _lender.lenderProgramController.create)
/**
 * getLenderProgram
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderProgramValidation.getLenderProgram), _lender.lenderProgramController.list);
router.route('/paginated')
/**
 * getLenderProgramPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderProgramValidation.paginatedLenderProgram), _lender.lenderProgramController.paginate);
router.route('/:lenderProgramId')
/**
 * getLenderProgramById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderProgramValidation.getLenderProgramById), _lender.lenderProgramController.get)
/**
 * updateLenderProgram
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderProgramValidation.updateLenderProgram), _lender.lenderProgramController.update)
/**
 * deleteLenderProgramById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lenderProgramValidation.deleteLenderProgramById), _lender.lenderProgramController.remove);
var _default = exports["default"] = router;