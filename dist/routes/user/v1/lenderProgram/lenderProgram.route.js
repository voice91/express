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
 * getLenderProgram
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderProgramValidation.getLenderProgram), _user.lenderProgramController.list);
router.route('/paginated')
/**
 * getLenderProgramPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderProgramValidation.paginatedLenderProgram), _user.lenderProgramController.paginate);
router.route('/listProgram/:lenderInstitute')
/**
 * getLenderProgramByLenderInstitute
 * */
/**
 * @deprecated
 * This route is no longer in use as borrower don't have access to programs.
 */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderProgramValidation.listLenderProgramByInstitute), _user.lenderProgramController.listLenderProgramByInstitute);
router.route('/:lenderProgramId')
/**
 * getLenderProgramById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderProgramValidation.getLenderProgramById), _user.lenderProgramController.get)
/**
 * updateLenderProgram
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderProgramValidation.updateLenderProgram), _user.lenderProgramController.update)
/**
 * deleteLenderProgramById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lenderProgramValidation.deleteLenderProgramById), _user.lenderProgramController.remove);
var _default = exports["default"] = router;