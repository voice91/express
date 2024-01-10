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
 * createLenderProgram
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.createLenderProgram), _advisor.lenderProgramController.create)
/**
 * getLenderProgram
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.getLenderProgram), _advisor.lenderProgramController.list);
router.route('/add-lender')
/**
 * Add Lender
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.addLender), _advisor.lenderProgramController.addLender);
router.route('/edit-lender/:lenderInstitute')
/**
 * Edit Lender
 */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.editLender), _advisor.lenderProgramController.editLender);
router.route('/paginated')
/**
 * getLenderProgramPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.paginatedLenderProgram), _advisor.lenderProgramController.paginate);
router.route('/listProgram/:lenderInstitute')
/**
 * getLenderProgramByLenderInstitute
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.listLenderProgramByInstitute), _advisor.lenderProgramController.listLenderProgramByInstitute);
router.route('/:lenderProgramId')
/**
 * getLenderProgramById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.getLenderProgramById), _advisor.lenderProgramController.get)
/**
 * updateLenderProgram
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.updateLenderProgram), _advisor.lenderProgramController.update)
/**
 * deleteLenderProgramById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderProgramValidation.deleteLenderProgramById), _advisor.lenderProgramController.remove);
var _default = exports["default"] = router;